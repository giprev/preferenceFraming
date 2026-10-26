rm(list = ls())

setwd("/Users/domitilleprevost/Documents/Master E&P/Stage/coding/jatos/study_assets_root/preferenceFramingExperiment/data_analysis")
PATH_TO_DATA <- "/Users/domitilleprevost/Documents/Master E&P/Stage/coding/jatos/study_assets_root/preferenceFramingExperiment/data_analysis/data/"
dir.create(file.path(PATH_TO_DATA, "figures_test_16102026"), showWarnings = FALSE, recursive = TRUE)
getwd()

library(jsonlite)
library(dplyr)
library(readr)

RAW_FILE <- file.path(PATH_TO_DATA, "test_16-10-2026.txt")
CSV_FILE <- file.path(PATH_TO_DATA, "test_16-10-2026.csv")

raw_lines <- readLines(RAW_FILE, warn = FALSE)
if (any(!nzchar(trimws(raw_lines)))) {
    stop("The raw data file contains an empty participant record.")
}

participant_records <- lapply(seq_along(raw_lines), function(participant_record) {
    tryCatch(
        fromJSON(raw_lines[[participant_record]], simplifyVector = FALSE),
        error = function(error) {
            stop(sprintf("Could not parse participant record %d: %s", participant_record, error$message))
        }
    )
})

json_cell <- function(value) {
    if (is.null(value)) {
        return(NA_character_)
    }

    if (is.atomic(value) && length(value) == 1L) {
        return(as.character(value))
    }

    as.character(toJSON(value, auto_unbox = TRUE, null = "null"))
}

trial_rows <- unlist(
    lapply(seq_along(participant_records), function(participant_record) {
        lapply(participant_records[[participant_record]], function(trial) {
            trial$participant_record <- participant_record
            as.data.frame(
                as.list(vapply(trial, json_cell, character(1))),
                stringsAsFactors = FALSE,
                check.names = FALSE
            )
        })
    }),
    recursive = FALSE
)

trial_data <- bind_rows(trial_rows)
write_csv(trial_data, CSV_FILE, na = "")

round_trip_data <- read_csv(CSV_FILE, show_col_types = FALSE)
if (nrow(round_trip_data) != nrow(trial_data)) {
    stop("CSV validation failed: the row count changed after writing.")
}

excluded_columns <- c(
    "success",
    "trial_type",
    "trial_index",
    "internal_node_id",
    "participant_record",
    "view_history"
)

analysis_data <- round_trip_data %>%
    select(-any_of(excluded_columns))

if (nrow(analysis_data) != nrow(round_trip_data)) {
    stop("Analysis dataframe validation failed: the row count changed after column selection.")
}

if (n_distinct(analysis_data$subject) != n_distinct(round_trip_data$subject)) {
    stop("Analysis dataframe validation failed: the participant count changed.")
}

if (any(excluded_columns %in% names(analysis_data))) {
    stop("Analysis dataframe validation failed: an excluded column is still present.")
}

calculate_mpl_equivalents <- function(
    mpl_type,
    switch_row1,
    switch_row2,
    switch_row1_choice,
    switch_row2_choice) {
    result <- data.frame(CE = NA_real_, LE = NA_real_, switch = NA_integer_, switchInversion = NA_integer_)

    if (is.na(mpl_type) || !grepl("^[GLOA]O(10|15|25|50|75|90)$", mpl_type)) {
        return(result)
    }

    mpl_family <- substr(mpl_type, 1L, 1L) # extract a substring from a charaecter string. 1L starting, 2nd one : ending position
    probability <- as.numeric(sub("^[GLA]O", "", mpl_type)) # removes the prefix G or L or A followed by O. Works only for lotteries named AO, GO or LO then the probability
    row1 <- suppressWarnings(as.numeric(switch_row1))
    row2 <- suppressWarnings(as.numeric(switch_row2))
    choice1 <- as.character(switch_row1_choice)
    choice2 <- as.character(switch_row2_choice)

    if (is.na(row1) || is.na(row2) || row1 == -2 || row2 == -2) {
        return(result)
    }

    result$switch <- as.integer(row1 >= 0 && row2 >= 0)

    # These are the choice orders that contradict the monotonic MPL values.
    inverted_order <- (mpl_family == "G" && choice1 == "sure" && choice2 == "lottery") ||
        (mpl_family %in% c("L", "A") && choice1 == "lottery" && choice2 == "sure")
    if (inverted_order) {
        result$switchInversion <- 1L
        return(result)
    } else {
        result$switchInversion <- 0L
    }

    if (mpl_family %in% c("G", "L")) {
        sure_values <- if (mpl_family == "G") 1:25 else -25:-1

        if (row1 == -1 && row2 == -1) {
            if (choice1 == "lottery" && choice2 == "lottery") {
                result$CE <- if (mpl_family == "G") 25.5 else -0.5
            } else if (choice1 == "sure" && choice2 == "sure") {
                result$CE <- if (mpl_family == "G") 0.5 else -25.5
            } else {
                result$CE <- NA_real_
                result$LE <- NA_real_
            }
        } else if (result$switch == 1L) {
            result$CE <- mean(sure_values[c(row1, row2) + 1L])
        }
    } else {
        lottery_values <- (seq(2, 50, by = 2) - probability) / 2

        if (row1 == -1 && row2 == -1) {
            if (choice1 == "lottery" && choice2 == "lottery") {
                result$LE <- lottery_values[1] - 0.5
            } else if (choice1 == "sure" && choice2 == "sure") {
                result$LE <- lottery_values[length(lottery_values)] + 0.5
            } else {
                result$CE <- NA_real_
                result$LE <- NA_real_
            }
        } else if (result$switch == 1L) {
            result$LE <- mean(lottery_values[c(row1, row2) + 1L])
        }
    }

    result
}

analysis_data <- analysis_data %>%
    mutate(
        CE = NA_real_,
        LE = NA_real_,
        switch = NA_integer_,
        switchInversion = NA_integer_
    )

mpl_rows <- which(
    analysis_data$task == "mpl" &
        analysis_data$block %in% c("example_span_mpl", "mpl_incentives")
)

mpl_equivalents <- bind_rows(lapply(mpl_rows, function(row_index) {
    calculate_mpl_equivalents(
        analysis_data$mplType[[row_index]],
        analysis_data$switch_row1[[row_index]],
        analysis_data$switch_row2[[row_index]],
        analysis_data$switchRow1Choice[[row_index]],
        analysis_data$switchRow2Choice[[row_index]]
    )
}))

if (nrow(mpl_equivalents) != length(mpl_rows)) {
    stop("MPL validation failed: the number of calculated rows changed.")
}

analysis_data$CE[mpl_rows] <- mpl_equivalents$CE
analysis_data$LE[mpl_rows] <- mpl_equivalents$LE
analysis_data$switch[mpl_rows
] <- mpl_equivalents$switch
analysis_data$switchInversion[mpl_rows] <- mpl_equivalents$switchInversion

prepare_mpl_plot_data <- function(data) {
    required_columns <- c(
        "task", "block", "mplType", "treatIs", "isSuper", "CE", "LE"
    )
    missing_columns <- setdiff(required_columns, names(data))
    if (length(missing_columns) > 0L) {
        stop(sprintf(
            "Plot-data preparation failed: missing columns: %s",
            paste(missing_columns, collapse = ", ")
        ))
    }

    plot_observations <- data %>%
        filter(
            task == "mpl",
            block %in% c("mpl_incentives"), # not example_span_mpl because it is to learn, not incentivized. Keep it for possible complementary analyses
            grepl("^[GLOA]O(10|15|25|50|75|90)$", mplType),
            !is.na(CE) | !is.na(LE)
        ) %>%
        transmute(
            subject,
            treatIs,
            treatment = recode(
                treatIs,
                mirr = "mirror",
                ineq = "inequalities",
                .default = NA_character_
            ),
            isSuper,
            incentive = case_when(
                isSuper == 1 ~ "super",
                isSuper == 0 ~ "classic",
                TRUE ~ NA_character_
            ),
            mplType,
            mpl_family = substr(mplType, 1L, 1L),
            probability = as.numeric(sub("^[GLOA]O", "", mplType)),
            # value_type = if_else(!is.na(CE), "CE", "LE"),
            value = coalesce(CE, LE)
        ) %>%
        mutate(
            expected_value = case_when(
                mpl_family == "G" ~ probability / 100 * 25,
                mpl_family == "L" ~ -probability / 100 * 25,
                mpl_family == "A" ~ 0,
                TRUE ~ NA_real_
            ),
            deviation_from_expected_value = value - expected_value
        )

    plot_summary <- plot_observations %>%
        group_by(
            mpl_family,
            probability,
            # value_type, not useful because CE and LE depend on mpl_family in any case
            treatment,
            incentive
        ) %>%
        summarise(
            n = n(),
            mean_value = mean(value),
            sd_value = if (n() > 1L) sd(value) else NA_real_,
            se_value = if (n() > 1L) sd(value) / sqrt(n()) else NA_real_,
            mean_deviation = mean(deviation_from_expected_value), # should be equal to mean_value - pred.
            sd_value_deviation = if (n() > 1L) sd(deviation_from_expected_value) else NA_real_, # i put them here to check if they are equal to the previous ones, they should be equal to sd_value
            se_value_deviation = if (n() > 1L) sd(deviation_from_expected_value) / sqrt(n()) else NA_real_,
            .groups = "drop"
        )

    if (nrow(plot_observations) == 0L || nrow(plot_summary) == 0L) {
        stop("Plot-data preparation failed: no valid MPL observations were found.")
    }

    if (anyDuplicated(plot_summary[c(
        "mpl_family", "probability", "treatment", "incentive" # , "value_type"
    )])) {
        stop("Plot-data preparation failed: summary groups are duplicated.")
    }

    plot_summary
}

mpl_plot_data <- prepare_mpl_plot_data(analysis_data)


mainPlot <- function(F, lab = "TEST TITRE", ylim = c(-20, 20)) {
    cex <- 1.7
    pt.cex <- 0.8
    offset <- 1

    colors <- list(inequalities = "gray", mirror = "white")
    x <- F %>%
        filter(mpl_family == "G") %>%
        filter(probability != 50)

    plot(x$probability - 0.5, x$mean_deviation, type = "n", xlim = c(0, 100), ylim = ylim, ylab = "Deviation from Expected Value", xlab = "Probability", yaxt = "n", bty = "n", xaxt = "n", main = lab) # type='n' to create an empty plot
    axis(1, at = seq(0, 100, 10), labels = seq(0, 1, 0.1))
    mtext("Risk/Loss Seeking", at = 7, side = 4, srt = 180)
    mtext("Risk/Loss Averse", at = -7, side = 4, srt = 180)

    legend("top",
        legend = c("Inequalities (no preferences)", "Mirror (Simplicity Equivalents)"),
        col = c("black", "black"), pt.bg = c(colors$inequalities, colors$mirror), pch = c(21, 21),
        lty = c(1, 1), cex = 0.9, pt.cex = 1.5, bg = NA, box.lwd = NA
    )
    # original legend
    # legend("top",legend=c("Lottery (Certainty Equivalents)",'Mirror (Simplicity Equivalents)'),col=c('black','black'),pt.bg=c('gray','white'),pch=c(21,21),lty=c(1,1),cex=0.9,pt.cex=1.5,bg=NA,box.lwd=NA)

    major_ticks <- seq(-20, 20, 5) # original major ticks
    minor_ticks <- seq(-20, 20, 1) # additional ticks every 1 unit
    minor_ticks <- setdiff(minor_ticks, major_ticks) # avoid duplicating major ticks
    # draw minor ticks (no labels, shorter tick length)
    axis(2, at = minor_ticks, labels = FALSE, tcl = -0.25)
    # draw major ticks with labels (same as before)
    axis(2, at = major_ticks, labels = major_ticks)
    abline("h" = 0, lty = 1)

    # Helper function to plot points for a given dataset and position



    plot_points <- function(data, inequalities_color, mirror_color, pch_type = 21, show_labels = TRUE) {
        if (nrow(data) == 0) {
            cat("No data available for plotting points.\n")
            return()
        }
        # Inequalities points
        inequalities <- data[data$treatment == "inequalities", ]
        if (nrow(inequalities) > 0) {
            y_val <- if (pch_type == 25) inequalities$mean_value else inequalities$mean_deviation
            x_val <- if (pch_type == 25) rep(50, nrow(inequalities)) else inequalities$probability - 0.5
            finite_error <- is.finite(inequalities$se_value_deviation) & inequalities$se_value_deviation > 0
            if (any(finite_error)) {
                arrows(
                    x0 = x_val[finite_error],
                    y0 = y_val[finite_error] - 2 * inequalities$se_value_deviation[finite_error],
                    x1 = x_val[finite_error],
                    y1 = y_val[finite_error] + 2 * inequalities$se_value_deviation[finite_error],
                    code = 3, angle = 90, length = 0.05, col = "black", lwd = 0.5
                )
            }
            points(x_val, y_val, bg = inequalities_color, col = "black", pch = pch_type, cex = cex)
            if (show_labels) {
                text(x_val, y_val, pos = 2, labels = inequalities$mpl_family, cex = pt.cex, col = "black", offset = offset)
            }
        }

        # Mirror points
        mirror <- data[data$treatment == "mirror", ]
        if (nrow(mirror) > 0) {
            y_val <- if (pch_type == 25) mirror$mean_value else mirror$mean_deviation
            x_val <- if (pch_type == 25) rep(50, nrow(mirror)) else mirror$probability + 0.5
            finite_error <- is.finite(mirror$se_value_deviation) & mirror$se_value_deviation > 0
            if (any(finite_error)) {
                arrows(
                    x0 = x_val[finite_error],
                    y0 = y_val[finite_error] - 2 * mirror$se_value_deviation[finite_error],
                    x1 = x_val[finite_error],
                    y1 = y_val[finite_error] + 2 * mirror$se_value_deviation[finite_error],
                    code = 3, angle = 90, length = 0.05, col = "black", lwd = 0.5, lty = 1
                )
            }
            points(x_val, y_val, bg = mirror_color, col = "black", pch = pch_type, cex = cex)
            if (show_labels) {
                text(x_val, y_val, pos = 4, labels = mirror$mpl_family, cex = pt.cex, col = "black", offset = offset)
            }
        }
    }

    # Plot L types
    # first check that there is data to plot
    x <- F %>%
        filter(mpl_family == "L") %>%
        filter(probability != 50)
    cat("the number of row is: ", nrow(x), "\n")
    cat("x$mean_deviation: ", x$mean_deviation, "\n")
    x <- F %>%
        filter(mpl_family == "L") %>%
        filter(probability != 50)
    plot_points(x, inequalities_color = colors$inequalities, mirror_color = colors$mirror, pch_type = 21, show_labels = TRUE)


    # Plot G types
    # x <- F %>%
    #     filter(mpl_family == "G") %>%
    #     filter(probability != 50) %>%
    #     cat("G types rows:", nrow(x), "\n")
    x <- F %>%
        filter(mpl_family == "G") %>%
        filter(probability != 50)
    plot_points(x, inequalities_color = colors$inequalities, mirror_color = colors$mirror, pch_type = 21, show_labels = TRUE)



    # Plot A types (triangle shape)
    x <- F %>% filter(mpl_family == "A")
    plot_points(x, inequalities_color = colors$inequalities, mirror_color = colors$mirror, pch_type = 25, show_labels = TRUE)
}

mainPlot(mpl_plot_data, lab = "MPL deviations by treatment", ylim = c(-20, 20))

# main_plot <- function(
#     plot_data = mpl_plot_data,
#     # treatment refers to the framing of the task, incentive refers to the presence of a super-incentive. Experimentally speaking, both are within-subject independent treatments
#     grouping = c("treatment", "incentive"),
#     lab = "",
#     ylim = NULL,
#     error_multiplier = 2) {
#     grouping <- match.arg(grouping)
#     required_columns <- c(
#         "mpl_family", "probability", "treatment", "incentive",
#         "n", "mean_value", "sd_value", "se_value", "mean_deviation"
#     )
#     missing_columns <- setdiff(required_columns, names(plot_data))
#     if (length(missing_columns) > 0L) {
#         stop(sprintf(
#             "Plotting failed: missing columns: %s",
#             paste(missing_columns, collapse = ", ")
#         ))
#     }

#     if (grouping == "incentive") {
#         plot_data <- plot_data %>% filter(!is.na(incentive))
#     }
#     if (nrow(plot_data) == 0L) {
#         stop(sprintf("Plotting failed: no rows available for grouping '%s'.", grouping))
#     }

#     pooled_data <- plot_data %>%
#         group_by(mpl_family, probability, .data[[grouping]]) %>%
#         group_modify(~ {
#             weights <- .x$n
#             total_n <- sum(weights)
#             pooled_mean <- weighted.mean(.x$mean_value, weights)
#             pooled_deviation <- weighted.mean(.x$mean_deviation, weights)
#             within_ss <- sum(pmax(weights - 1, 0) * coalesce(.x$sd_value, 0)^2)
#             between_ss <- sum(weights * (.x$mean_value - pooled_mean)^2)
#             pooled_sd <- if (total_n > 1L) {
#                 sqrt((within_ss + between_ss) / (total_n - 1L))
#             } else {
#                 NA_real_
#             }
#             tibble(
#                 n = total_n,
#                 mean_value = pooled_mean,
#                 mean_deviation = pooled_deviation,
#                 pooled_sd = pooled_sd,
#                 se_deviation = if (total_n > 1L) pooled_sd / sqrt(total_n) else NA_real_
#             )
#         }) %>%
#         rename(group = all_of(grouping)) %>%
#         mutate(group = as.character(group))

#     if (is.null(ylim)) {
#         error_top <- pooled_data$mean_deviation + error_multiplier * pooled_data$se_deviation
#         error_bottom <- pooled_data$mean_deviation - error_multiplier * pooled_data$se_deviation
#         plot_range <- range(c(pooled_data$mean_deviation, error_top, error_bottom), na.rm = TRUE)
#         padding <- max(diff(plot_range) * 0.1, 1)
#         ylim <- plot_range + c(-padding, padding)
#     }

#     group_levels <- if (grouping == "treatment") {
#         c("mirror", "inequalities")
#     } else {
#         c("classic", "super")
#     }
#     group_levels <- group_levels[group_levels %in% pooled_data$group]
#     point_offsets <- seq(-0.8, 0.8, length.out = max(length(group_levels), 1L))
#     point_colors <- if (grouping == "treatment") {
#         c(mirror = "gray35", inequalities = "black")
#     } else {
#         c(classic = "gray35", super = "black")
#     }
#     point_symbols <- if (grouping == "treatment") {
#         c(mirror = 21, inequalities = 22)
#     } else {
#         c(classic = 21, super = 24)
#     }

#     old_par <- par(
#         mfrow = c(1, 3),
#         mar = c(4, 4, 3, 1),
#         oma = c(0, 0, 2, 0)
#     )
#     on.exit(par(old_par), add = TRUE)

#     family_titles <- c(G = "Gains", L = "Losses", A = "Mixed")
#     for (family in c("G", "L", "A")) {
#         family_data <- pooled_data %>% filter(mpl_family == family)
#         x_values <- family_data$probability
#         if (length(x_values) == 0L) {
#             x_limits <- c(0, 100)
#         } else {
#             x_limits <- range(x_values) + c(-5, 5)
#         }

#         plot(
#             NA,
#             xlim = x_limits,
#             ylim = ylim,
#             xlab = "Probability / amount",
#             ylab = "Deviation from expected value",
#             main = family_titles[[family]],
#             bty = "n",
#             xaxt = "n"
#         )
#         axis(1, at = sort(unique(x_values)))
#         abline(h = 0, lty = 2)

#         for (group_index in seq_along(group_levels)) {
#             group_name <- group_levels[[group_index]]
#             group_data <- family_data %>% filter(group == group_name)
#             if (nrow(group_data) == 0L) {
#                 next
#             }
#             x_position <- group_data$probability + point_offsets[[group_index]]
#             error <- error_multiplier * group_data$se_deviation
#             error[is.na(error)] <- 0
#             points(
#                 x_position,
#                 group_data$mean_deviation,
#                 pch = point_symbols[[group_name]],
#                 bg = if (grouping == "treatment" && group_name == "mirror") "white" else point_colors[[group_name]],
#                 col = "black",
#                 cex = 1.2
#             )
#             if (any(error > 0)) {
#                 arrows(
#                     x0 = x_position[error > 0],
#                     y0 = (group_data$mean_deviation - error)[error > 0],
#                     x1 = x_position[error > 0],
#                     y1 = (group_data$mean_deviation + error)[error > 0],
#                     code = 3,
#                     angle = 90,
#                     length = 0.05,
#                     col = point_colors[[group_name]],
#                     lwd = 0.8
#                 )
#             }
#         }

#         legend(
#             "topright",
#             legend = group_levels,
#             pch = unname(point_symbols[group_levels]),
#             pt.bg = ifelse(
#                 grouping == "treatment" & group_levels == "mirror",
#                 "white",
#                 unname(point_colors[group_levels])
#             ),
#             col = "black",
#             bty = "n",
#             title = if (grouping == "treatment") "Treatment" else "Incentive"
#         )
#     }
#     title(main = lab, outer = TRUE)

#     invisible(pooled_data)
# }

main_plot(plot_data = mpl_plot_data, grouping = "treatment", lab = "MPL deviations by treatment")


cat("Participant records:", length(participant_records), "\n")
cat("Trial rows:", nrow(trial_data), "\n")
cat("Columns:", ncol(trial_data), "\n")
cat("Analysis dataframe rows:", nrow(analysis_data), "\n")
cat("Analysis dataframe columns:", ncol(analysis_data), "\n")
cat("MPL rows with equivalents:", length(mpl_rows), "\n")
cat("MPL plot observations:", sum(mpl_plot_data$n), "\n")
cat("MPL plot summary groups:", nrow(mpl_plot_data), "\n")
cat("CSV written to:", CSV_FILE, "\n")
