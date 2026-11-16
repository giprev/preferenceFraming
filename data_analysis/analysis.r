rm(list = ls())

setwd("/Users/domitilleprevost/Documents/Master E&P/Stage/coding/jatos/study_assets_root/preferenceFramingExperiment/data_analysis")
PATH_TO_DATA <- "/Users/domitilleprevost/Documents/Master E&P/Stage/coding/jatos/study_assets_root/preferenceFramingExperiment/data_analysis/data"

dir.create(file.path(PATH_TO_DATA, "figures_test_14112026"), showWarnings = FALSE, recursive = TRUE)
getwd()

library(jsonlite)
library(dplyr)
library(readr)


RAW_FILE <- file.path(PATH_TO_DATA, "test_14-11-2026.txt")
CSV_FILE <- file.path(PATH_TO_DATA, "test_14-11-2026.csv")

raw_lines <- readLines(RAW_FILE, warn = FALSE) # produce a character vector of lines from the raw data file, each line is a JSON string representing a participant record
if (any(!nzchar(trimws(raw_lines)))) { # nzchar check if the string is not empty, trimws removes leading and trailing whitespace. If any line is empty, it will return TRUE
    stop("The raw data file contains an empty participant record.")
}

participant_records <- lapply(seq_along(raw_lines), function(participant_record) {
    # seq_along generates a sequence of integers from 1 to the length of raw_lines.
    # lapply applies the function to each element of the sequence, which is the index of the participant record in raw_lines.
    # The function attempts to parse the JSON string for each participant record and returns a list of parsed records.
    # If parsing fails, it stops execution and provides an error message with the participant record index and the error message.
    tryCatch(
        fromJSON(raw_lines[[participant_record]], simplifyVector = FALSE),
        error = function(error) {
            stop(sprintf("Could not parse participant record %d: %s", participant_record, error$message))
        }
    )
})

json_cell <- function(value) {
    # function to convert a value to a character string for CSV output.
    # If the value is NULL, it returns NA_character_. If the value is atomic and of length 1, it converts it to a character string.
    # Otherwise, it converts the value to JSON format using toJSON() with auto_unbox = TRUE and null = "null", and then converts it to a character string.
    if (is.null(value)) {
        return(NA_character_)
    }

    if (is.atomic(value) && length(value) == 1L) {
        return(as.character(value))
    }

    as.character(toJSON(value, auto_unbox = TRUE, null = "null"))
}

trial_rows <- unlist(
    # it is the same as participant_records but make each trial a data_frame not a list, and adds participant_record = the number of the participant
    # unlist flattens the list of lists (1 per subject) into a single list of trial records (subject's id in each trial record).
    # first lapply applies the same function to each participant record line
    # second lapply creates a data frame for each trial record
    # vapply : applies json_cell to each trial record, and making each value a column in the data frame (character) of the trial
    lapply(seq_along(participant_records), function(participant_record) {
        lapply(participant_records[[participant_record]], function(trial) {
            trial$participant_record <- participant_record # adds participant record index to each trial record. I.e. subject number 2 has participant_record = 2
            as.data.frame(
                as.list(vapply(trial, json_cell, character(1))), # character(1) : output should ne of the same type as character(1)= character vector
                stringsAsFactors = FALSE,
                check.names = FALSE
            )
        })
    }),
    recursive = FALSE
)

trial_data <- bind_rows(trial_rows) # makes one data frame from the list of data frames (one per trial record). bind_rows is a function from dplyr that combines data frames by rows, filling in missing columns with NA.
write_csv(trial_data, CSV_FILE, na = "")

round_trip_data <- read_csv(CSV_FILE, show_col_types = FALSE)
if (nrow(round_trip_data) != nrow(trial_data)) { # round_trip_data is the data frame read from the CSV file, and trial_data is the original data frame.
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

if (n_distinct(analysis_data$subject) != n_distinct(round_trip_data$subject)) {
    stop("Analysis dataframe validation failed: the participant count changed.")
}

if (any(excluded_columns %in% names(analysis_data))) {
    stop("Analysis dataframe validation failed: an excluded column is still present.")
}








# Second part of the file : analysis of the data and plotting


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

    mpl_family <- substr(mpl_type, 1L, 1L) # extract a substring from a character string. 1L starting, 2nd one : ending position
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
    inverted_order <- (mpl_family %in% c("G", "L") && choice1 == "sure" && choice2 == "lottery") ||
        (mpl_family == "A" && choice1 == "lottery" && choice2 == "sure")
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

analysis_data <- analysis_data %>% # adds the columns that will be filled by calculate_mpl_equivalents
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
analysis_data$switchInversion[mpl_rows] <- mpl_equivalents$switchInversion
analysis_data$switch[mpl_rows
] <- mpl_equivalents$switch



# Preparation of the MPL data per group (two stages : mean per participant, then averaged per group)



summarize_mpl_by_group <- function(data, aggregationType) {
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

    if (aggregationType == "treatment") {
        plot_summary <- plot_observations %>%
            group_by(
                mpl_family,
                probability,
                treatment,
                subject
            ) %>%
            summarise(
                n = n(),
                mean_value_per_subject = mean(value),
                mean_deviation_per_subject = mean(deviation_from_expected_value), # should be equal to mean_value - pred.
                .groups = "drop"
            ) %>%
            group_by(
                mpl_family,
                probability,
                treatment
            ) %>%
            summarise(
                n = n(),
                mean_value = mean(mean_value_per_subject),
                sd_value = if (n() > 1L) sd(mean_value_per_subject) else (NA_real_),
                se_value = if (n() > 1L) sd(mean_value_per_subject) / sqrt(n()) else NA_real_,
                mean_deviation = mean(mean_deviation_per_subject), # should be equal to mean_value - pred.
                sd_value_deviation = if (n() > 1L) sd(mean_deviation_per_subject) else (NA_real_), # i put them here to check if they are equal to the previous ones, they should be equal to sd_value
                se_value_deviation = if (n() > 1L) sd(mean_deviation_per_subject) / sqrt(n()) else NA_real_,
                .groups = "drop"
            )
    } else if (aggregationType == "incentive") {
        plot_summary <- plot_observations %>%
            group_by(
                mpl_family,
                probability,
                incentive,
                subject
            ) %>%
            summarise(
                n = n(),
                mean_value_per_subject = mean(value),
                mean_deviation_per_subject = mean(deviation_from_expected_value), # should be equal to mean_value - pred.
                .groups = "drop"
            ) %>%
            group_by(
                mpl_family,
                probability,
                incentive
            ) %>%
            summarise(
                n = n(),
                mean_value = mean(mean_value_per_subject),
                sd_value = if (n() > 1L) sd(mean_value_per_subject) else (NA_real_),
                se_value = if (n() > 1L) sd(mean_value_per_subject) / sqrt(n()) else NA_real_,
                mean_deviation = mean(mean_deviation_per_subject), # should be equal to mean_value - pred.
                sd_value_deviation = if (n() > 1L) sd(mean_deviation_per_subject) else (NA_real_), # i put them here to check if they are equal to the previous ones, they should be equal to sd_value
                se_value_deviation = if (n() > 1L) sd(mean_deviation_per_subject) / sqrt(n()) else NA_real_,
                .groups = "drop"
            )
    }
    if (nrow(plot_observations) == 0L || nrow(plot_summary) == 0L) {
        stop("Plot-data preparation failed: no valid MPL observations were found.")
    }
    if (aggregationType == "treatment") {
        if (anyDuplicated(plot_summary[c(
            "mpl_family", "probability", "treatment" # , "value_type"
        )])) {
            stop("Plot-data preparation failed: summary groups are duplicated.")
        }
    } else if (aggregationType == "incentive") {
        if (anyDuplicated(plot_summary[c(
            "mpl_family", "probability", "incentive" # , "value_type"
        )])) {
            stop("Plot-data preparation failed: summary groups are duplicated.")
        }
    }

    plot_summary
}

mpl_group_summary_treatment <- summarize_mpl_by_group(analysis_data, aggregationType = "treatment")
mpl_group_summary_incentive <- summarize_mpl_by_group(analysis_data, aggregationType = "incentive")



mainPlot <- function(F, aggregationType, lab = "TEST TITRE", ylim = c(-20, 20)) {
    # we use all parameters of inequalities when aggregationType = "treatment" for classic mpls when aggregationType = "incentive"
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

    if (aggregationType == "treatment") {
        legend("top",
            legend = c("Inequalities (no preferences)", "Mirror (Simplicity Equivalents)"),
            col = c("black", "black"), pt.bg = c(colors$inequalities, colors$mirror), pch = c(21, 21),
            lty = c(1, 1), cex = 0.9, pt.cex = 1.5, bg = NA, box.lwd = NA
        )
    } else if (aggregationType == "incentive") {
        legend("top",
            legend = c("not paid", "paid"),
            col = c("black", "black"), pt.bg = c(colors$inequalities, colors$mirror), pch = c(21, 21),
            lty = c(1, 1), cex = 0.9, pt.cex = 1.5, bg = NA, box.lwd = NA
        )
    }
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
        # Inequalities/classic points
        if (aggregationType == "treatment") {
            inequalities <- data[data$treatment == "inequalities", ]
        } else if (aggregationType == "incentive") {
            inequalities <- data[data$incentive == "classic", ]
        }
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
        if (aggregationType == "treatment") {
            mirror <- data[data$treatment == "mirror", ]
        } else if (aggregationType == "incentive") {
            mirror <- data[data$incentive == "super", ]
        }
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

mainPlot(mpl_group_summary_treatment, aggregationType = "treatment", lab = "MPL deviations by treatment test", ylim = c(-20, 20))
mainPlot(mpl_group_summary_incentive, aggregationType = "incentive", lab = "MPL deviations by incentive test", ylim = c(-20, 20))



# bar plots of pooled deviation level 

make_barplot_data <- function(data, aggragationType) {
    if (aggragationType=="treatment"){
        
        barplot_data <- tibble(
            
        )
         <- data %>%

    }
}

cat("Participant records:", length(participant_records), "\n")
cat("Trial rows:", nrow(trial_data), "\n")
cat("Columns:", ncol(trial_data), "\n")
cat("Analysis dataframe rows:", nrow(analysis_data), "\n")
cat("Analysis dataframe columns:", ncol(analysis_data), "\n")
cat("MPL rows with equivalents:", length(mpl_rows), "\n")
cat("MPL plot observations:", sum(mpl_plot_data$n), "\n")
cat("MPL plot summary groups:", nrow(mpl_plot_data), "\n")
cat("CSV written to:", CSV_FILE, "\n")
