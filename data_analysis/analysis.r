rm(list = ls())

setwd("/Users/domitilleprevost/Documents/Master E&P/Stage/coding/jatos/study_assets_root/preferenceFramingExperiment/data_analysis")
PATH_TO_DATA <- "/Users/domitilleprevost/Documents/Master E&P/Stage/coding/jatos/study_assets_root/preferenceFramingExperiment/data_analysis/data"

dir_figures <- "figures_pilot1&2"
dir.create(file.path(PATH_TO_DATA, dir_figures), showWarnings = FALSE, recursive = TRUE)
getwd()

library(jsonlite)
library(dplyr)
library(readr)
library(rstatix)
library(patchwork)
library(tidyverse)

file1 <- readLines("/Users/domitilleprevost/Documents/Master E&P/Stage/coding/dataExperiment/preferenceFraming/data_pilot1_18112026.txt")
file2 <- readLines("/Users/domitilleprevost/Documents/Master E&P/Stage/coding/dataExperiment/preferenceFraming/data_pilot2_19112026.txt")
raw_lines <- c(file1, file2)

# writeLines(test_raw_lines, "data_test_merged.txt")

# RAW_FILE <- file.path("/Users/domitilleprevost/Documents/Master E&P/Stage/coding/dataExperiment/preferenceFraming/data_test_pilot1&2.txt")
CSV_FILE <- file.path(PATH_TO_DATA, "data_pilot1&2.csv")

# raw_lines <- readLines(RAW_FILE, warn = FALSE) # produce a character vector of lines from the raw data file, each line is a JSON string representing a participant record
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

if (!all(c("task", "participant_record") %in% names(round_trip_data))) {
    stop("Participant exclusion validation failed: task or participant_record is missing.")
}

failed_participant_records <- round_trip_data %>%
    filter(task == "comprehensionFailure") %>%
    distinct(participant_record) %>%
    pull(participant_record)

analysis_source_data <- round_trip_data %>%
    filter(!participant_record %in% failed_participant_records)

excluded_columns <- c(
    "success",
    "trial_type",
    "trial_index",
    "internal_node_id",
    "participant_record",
    "view_history"
)

analysis_data <- analysis_source_data %>%
    select(-any_of(excluded_columns))

if (any(analysis_data$task == "comprehensionFailure", na.rm = TRUE)) {
    stop("Analysis dataframe validation failed: a comprehension-failure participant was retained.")
}

expected_analysis_participants <- n_distinct(round_trip_data$subject) -
    n_distinct(round_trip_data$subject[round_trip_data$participant_record %in% failed_participant_records])
if (n_distinct(analysis_data$subject) != expected_analysis_participants) {
    stop("Analysis dataframe validation failed: the participant count is not consistent with exclusions.")
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

calculate_sign_mpl <- function(type) {
    if (type %in% c("GO10", "GO25", "LO50", "LO75", "LO90")) {
        return(1)
    } else if (type %in% c("GO50", "GO75", "GO90", "LO10", "LO25", "AO10", "AO15")) {
        return(-1)
    } else {
        return(NA_real_)
    }
}

analysis_data <- analysis_data %>% # adds the columns that will be filled by calculate_mpl_equivalents
    mutate(
        CE = NA_real_,
        LE = NA_real_,
        switch = NA_integer_,
        switchInversion = NA_integer_,
        sign = NA_real_
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

signs <- bind_rows(lapply(mpl_rows, function(row_index) {
    tibble(sign = calculate_sign_mpl(analysis_data$mplType[[row_index]]))
}))

analysis_data$CE[mpl_rows] <- mpl_equivalents$CE
analysis_data$LE[mpl_rows] <- mpl_equivalents$LE
analysis_data$switchInversion[mpl_rows] <- mpl_equivalents$switchInversion
analysis_data$switch[mpl_rows
] <- mpl_equivalents$switch
analysis_data$sign[mpl_rows] <- signs$sign



# Preparation of the MPL data per group (two stages : mean per participant, then averaged per group)
plot_observations <- analysis_data %>%
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
        value = coalesce(CE, LE),
        sign = sign,
        reaction_time = suppressWarnings(as.numeric(rt)),
        cognitive_uncertainty = 100 - suppressWarnings(as.numeric(CU)),
        subBlock = subBlock # it is the number of the mpl, but excluding one in example_span_mpl and training_span_mpl. They have it but don't increment the number, and should not be analyzed.
    ) %>%
    mutate(
        expected_value = case_when(
            mpl_family == "G" ~ probability / 100 * 25,
            mpl_family == "L" ~ -probability / 100 * 25,
            mpl_family == "A" ~ 0,
            TRUE ~ NA_real_
        ),
        deviation_from_expected_value = value - expected_value,
        normalized_deviation = deviation_from_expected_value * sign
    )

if (any(!is.na(plot_observations$cognitive_uncertainty) &
    (!is.finite(plot_observations$cognitive_uncertainty) |
        plot_observations$cognitive_uncertainty < 0 |
        plot_observations$cognitive_uncertainty > 100))) {
    stop("Additional-data validation failed: cognitive uncertainty is outside the 0-100 range.")
}


summarize_mpl_by_group <- function(data, aggregationType) {
    # required_columns <- c(
    #     "task", "block", "mplType", "treatIs", "isSuper", "CE", "LE"
    # )
    # missing_columns <- setdiff(required_columns, names(data))
    # if (length(missing_columns) > 0L) {
    #     stop(sprintf(
    #         "Plot-data preparation failed: missing columns: %s",
    #         paste(missing_columns, collapse = ", ")
    #     ))
    # }

    if (aggregationType == "treatment") {
        plot_summary <- data %>%
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
        plot_summary <- data %>%
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

mpl_group_summary_treatment <- summarize_mpl_by_group(plot_observations, aggregationType = "treatment")
mpl_group_summary_incentive <- summarize_mpl_by_group(plot_observations, aggregationType = "incentive")

# now the data but filtering on block (order)
mpl_group_summary_treatment_order1 <- summarize_mpl_by_group(plot_observations %>% filter(subBlock %in% c(1:14)), aggregationType = "treatment")
mpl_group_summary_incentive_order1 <- summarize_mpl_by_group(plot_observations %>% filter(subBlock %in% c(1:14)), aggregationType = "incentive")
mpl_group_summary_treatment_order2 <- summarize_mpl_by_group(plot_observations %>% filter(subBlock %in% c(15:28)), aggregationType = "treatment")
mpl_group_summary_incentive_order2 <- summarize_mpl_by_group(plot_observations %>% filter(subBlock %in% c(15:28)), aggregationType = "incentive")

mainPlot <- function(F, aggregationType, lab = "TEST TITRE", ylim = c(-10, 10), output_file = NULL) {
    if (!is.null(output_file)) {
        dir.create(dirname(output_file), showWarnings = FALSE, recursive = TRUE)
        png(output_file, width = 10, height = 6, units = "in", res = 300)
    }

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

    if (!is.null(output_file)) {
        dev.off()
    }
}

PILOT_FIGURES_DIR <- file.path(PATH_TO_DATA, dir_figures)
# dir.create(PILOT_FIGURES_DIR, showWarnings = FALSE, recursive = TRUE)

mainPlot(
    mpl_group_summary_treatment,
    aggregationType = "treatment",
    lab = "MPL deviations by treatment test",
    ylim = c(-20, 20),
    output_file = file.path(PILOT_FIGURES_DIR, "mpl_deviations_by_treatment.png")
)
mainPlot(
    mpl_group_summary_incentive,
    aggregationType = "incentive",
    lab = "MPL deviations by incentive test",
    ylim = c(-20, 20),
    output_file = file.path(PILOT_FIGURES_DIR, "mpl_deviations_by_incentive.png")
)

# from objective goal to preferences there should be no behavioral change, maybe a slight amelioration due to learning
# from preference to objective goal there should be less deviation, if any
mainPlot(
    mpl_group_summary_treatment_order1,
    aggregationType = "treatment",
    lab = "MPL deviations by treatment order 1 test",
    ylim = c(-20, 20),
    output_file = file.path(PILOT_FIGURES_DIR, "mpl_deviations_by_treatment_order1.png")
)
mainPlot(
    mpl_group_summary_incentive_order1,
    aggregationType = "incentive",
    lab = "MPL deviations by incentive order 1 test",
    ylim = c(-20, 20),
    output_file = file.path(PILOT_FIGURES_DIR, "mpl_deviations_by_incentive_order1.png")
)
mainPlot(
    mpl_group_summary_treatment_order2,
    aggregationType = "treatment",
    lab = "MPL deviations by treatment order 2 test",
    ylim = c(-20, 20),
    output_file = file.path(PILOT_FIGURES_DIR, "mpl_deviations_by_treatment_order2.png")
)
mainPlot(
    mpl_group_summary_incentive_order2,
    aggregationType = "incentive",
    lab = "MPL deviations by incentive order 2 test",
    ylim = c(-20, 20),
    output_file = file.path(PILOT_FIGURES_DIR, "mpl_deviations_by_incentive_order2.png")
)


# bar plots of pooled deviation level

# appropriate measure to analyze sensitivity to incentive between the two groups iff deviation levels are comparable between the two groups (otherwise they the same deviation difference is not comparable between the two groups).


make_incentive_deviation <- function(data) {
    table_mean <- data %>%
        filter(!is.na(incentive), !is.na(normalized_deviation)) %>%
        group_by(subject, incentive) %>%
        summarise(
            n = n(),
            mean_deviation = mean(normalized_deviation),
            .groups = "drop"
        )

    table_test <- table_mean %>%
        pivot_wider(names_from = incentive, values_from = mean_deviation, id_cols = subject)

    wilcox_test <- if (all(c("super", "classic") %in% names(table_test))) {
        paired <- table_test %>% filter(!is.na(super), !is.na(classic))
        if (nrow(paired) > 0L) {
            wilcox.test(paired$super, paired$classic, paired = TRUE, exact = FALSE)
        } else {
            NULL
        }
    } else {
        NULL
    }

    table_mean <- table_mean %>%
        group_by(incentive) %>%
        summarise(
            n = n(),
            sd_deviation = if (n() > 1L) sd(mean_deviation) else NA_real_,
            se_deviation = if (n() > 1L) sd(mean_deviation) / sqrt(n()) else NA_real_,
            mean_deviation = mean(mean_deviation),
            .groups = "drop"
        ) %>%
        mutate(p_value = if (is.null(wilcox_test)) NA_real_ else wilcox_test$p.value)

    table_difference <- data %>%
        filter(!is.na(incentive), !is.na(treatment), !is.na(normalized_deviation)) %>%
        group_by(subject, treatment, incentive) %>%
        summarise(
            n = n(),
            mean_deviation = mean(normalized_deviation),
            .groups = "drop"
        )

    table_test_ineq <- table_difference %>%
        filter(treatment == "inequalities") %>%
        pivot_wider(names_from = incentive, values_from = mean_deviation, id_cols = subject)

    table_test_mirr <- table_difference %>%
        filter(treatment == "mirror") %>%
        pivot_wider(names_from = incentive, values_from = mean_deviation, id_cols = subject)

    wilcox_test_ineq <- if (all(c("super", "classic") %in% names(table_test_ineq))) {
        paired <- table_test_ineq %>% filter(!is.na(super), !is.na(classic))
        if (nrow(paired) > 0L) {
            wilcox.test(paired$super, paired$classic, paired = TRUE, exact = FALSE)
        } else {
            NULL
        }
    } else {
        NULL
    }

    wilcox_test_mirr <- if (all(c("super", "classic") %in% names(table_test_mirr))) {
        paired <- table_test_mirr %>% filter(!is.na(super), !is.na(classic))
        if (nrow(paired) > 0L) {
            wilcox.test(paired$super, paired$classic, paired = TRUE, exact = FALSE)
        } else {
            NULL
        }
    } else {
        NULL
    }

    participant_difference <- table_difference %>%
        pivot_wider(names_from = incentive, values_from = mean_deviation, id_cols = c(subject, treatment)) %>%
        filter(!is.na(super), !is.na(classic)) %>%
        mutate(difference_super_minus_classic = super - classic)

    table_difference <- participant_difference %>%
        group_by(treatment) %>%
        summarise(
            n = n(),
            sd_difference = if (n() > 1L) sd(difference_super_minus_classic) else NA_real_,
            se_difference = if (n() > 1L) sd(difference_super_minus_classic) / sqrt(n()) else NA_real_,
            mean_difference = mean(difference_super_minus_classic),
            .groups = "drop"
        ) %>%
        mutate(p_value = case_when(
            treatment == "inequalities" ~ if (is.null(wilcox_test_ineq)) NA_real_ else wilcox_test_ineq$p.value,
            treatment == "mirror" ~ if (is.null(wilcox_test_mirr)) NA_real_ else wilcox_test_mirr$p.value,
            TRUE ~ NA_real_
        ))

    difference_test <- participant_difference %>%
        select(subject, treatment, difference_super_minus_classic) %>%
        pivot_wider(names_from = treatment, values_from = difference_super_minus_classic)

    wilcox_test_difference <- if (all(c("mirror", "inequalities") %in% names(difference_test))) {
        paired <- difference_test %>% filter(!is.na(mirror), !is.na(inequalities))
        if (nrow(paired) > 0L) {
            wilcox.test(paired$mirror, paired$inequalities, paired = TRUE, exact = FALSE)
        } else {
            NULL
        }
    } else {
        NULL
    }

    table_percentage <- participant_difference %>%
        mutate(
            percent_super_minus_classic = ifelse(
                classic == 0,
                NA_real_,
                (super - classic) / classic * 100
            )
        ) %>%
        filter(!is.na(percent_super_minus_classic), is.finite(percent_super_minus_classic)) %>%
        group_by(treatment) %>%
        summarise(
            n = n(),
            sd_percent = if (n() > 1L) sd(percent_super_minus_classic) else NA_real_,
            se_percent = if (n() > 1L) sd(percent_super_minus_classic) / sqrt(n()) else NA_real_,
            mean_percent = mean(percent_super_minus_classic),
            .groups = "drop"
        )

    percentage_by_treatment <- participant_difference %>%
        mutate(
            percent_super_minus_classic = ifelse(
                classic == 0,
                NA_real_,
                (super - classic) / classic * 100
            )
        ) %>%
        filter(!is.na(percent_super_minus_classic), is.finite(percent_super_minus_classic)) %>%
        select(subject, treatment, percent_super_minus_classic) %>%
        pivot_wider(names_from = treatment, values_from = percent_super_minus_classic)

    wilcox_test_percent_difference <- if (all(c("mirror", "inequalities") %in% names(percentage_by_treatment))) {
        paired <- percentage_by_treatment %>% filter(!is.na(mirror), !is.na(inequalities))
        if (nrow(paired) > 0L) {
            wilcox.test(paired$mirror, paired$inequalities, paired = TRUE, exact = FALSE)
        } else {
            NULL
        }
    } else {
        NULL
    }

    table_percentage <- table_percentage %>%
        mutate(p_value = if (is.null(wilcox_test_percent_difference)) {
            NA_real_
        } else {
            wilcox_test_percent_difference$p.value
        })

    list(
        table_mean = table_mean,
        table_difference = table_difference,
        table_percentage = table_percentage,
        participant_difference = participant_difference,
        p_super_classic = if (is.null(wilcox_test)) NA_real_ else wilcox_test$p.value,
        p_difference = if (is.null(wilcox_test_difference)) NA_real_ else wilcox_test_difference$p.value,
        p_percent = if (is.null(wilcox_test_percent_difference)) NA_real_ else wilcox_test_percent_difference$p.value
    )
}

incentive_deviation_tables <- make_incentive_deviation(plot_observations)
table_incentive_deviation <- incentive_deviation_tables$table_difference

# Match each gain MPL probability with the corresponding arithmetic-test
# answer. The participant is the inferential unit: repeated MPL observations
# and repeated CSV copies of the arithmetic answers are averaged first.
make_gain_arithmetic_table <- function(mpl_data, source_data) {
    gain_data <- mpl_data %>%
        filter(mpl_family == "G", !is.na(value)) %>%
        transmute(
            subject,
            probability,
            ce_deviation = value - expected_value
        ) %>%
        group_by(subject, probability) %>%
        summarise(
            mean_ce_deviation = mean(ce_deviation),
            n_mpl = n(),
            .groups = "drop"
        )

    arithmetic_fields <- paste0("sliderArTest", c(10, 25, 50, 75, 90))
    missing_fields <- setdiff(arithmetic_fields, names(source_data))
    if (length(missing_fields) > 0L) {
        stop(sprintf(
            "Gain/arithmetic table validation failed: missing fields: %s",
            paste(missing_fields, collapse = ", ")
        ))
    }

    arithmetic_data <- source_data %>%
        select(subject, all_of(arithmetic_fields)) %>%
        pivot_longer(
            cols = all_of(arithmetic_fields),
            names_to = "arithmetic_field",
            values_to = "arithmetic_result"
        ) %>%
        mutate(
            probability = as.numeric(sub("sliderArTest", "", arithmetic_field)),
            arithmetic_result = suppressWarnings(as.numeric(arithmetic_result))
        ) %>%
        filter(!is.na(arithmetic_result)) %>%
        group_by(subject, probability) %>%
        summarise(
            mean_arithmetic_result = mean(arithmetic_result),
            n_arithmetic = n(),
            .groups = "drop"
        ) %>%
        mutate(
            expected_value = probability / 100 * 25,
            mean_arithmetic_deviation = mean_arithmetic_result - expected_value
        )

    participant_table <- full_join(
        gain_data,
        arithmetic_data,
        by = c("subject", "probability")
    ) %>%
        arrange(subject, probability)

    if (nrow(participant_table) == 0L) {
        stop("Gain/arithmetic table validation failed: no gain observations were found.")
    }
    if (nrow(arithmetic_data) == 0L) {
        stop("Gain/arithmetic table validation failed: no arithmetic answers were found.")
    }

    probabilities <- c(10, 25, 50, 75, 90)
    summary_rows <- lapply(probabilities, function(probability_value) {
        paired <- participant_table %>%
            filter(
                probability == probability_value,
                !is.na(mean_ce_deviation),
                !is.na(mean_arithmetic_deviation)
            )
        test <- if (nrow(paired) > 0L) {
            wilcox.test(
                paired$mean_ce_deviation,
                paired$mean_arithmetic_deviation,
                paired = TRUE,
                exact = FALSE
            )
        } else {
            NULL
        }

        tibble(
            probability = probability_value,
            mean_ce_deviation = if (nrow(paired) > 0L) {
                mean(paired$mean_ce_deviation)
            } else {
                NA_real_
            },
            se_ce_deviation = if (nrow(paired) > 1L) {
                sd(paired$mean_ce_deviation) / sqrt(nrow(paired))
            } else {
                NA_real_
            },
            mean_arithmetic_deviation = if (nrow(paired) > 0L) {
                mean(paired$mean_arithmetic_deviation)
            } else {
                NA_real_
            },
            se_arithmetic_deviation = if (nrow(paired) > 1L) {
                sd(paired$mean_arithmetic_deviation) / sqrt(nrow(paired))
            } else {
                NA_real_
            },
            n_ce = sum(!is.na(participant_table$mean_ce_deviation) &
                participant_table$probability == probability_value),
            n_arithmetic = sum(!is.na(participant_table$mean_arithmetic_deviation) &
                participant_table$probability == probability_value),
            n_paired = nrow(paired),
            p_value = if (is.null(test)) NA_real_ else test$p.value
        )
    }) %>%
        bind_rows()

    if (any(summary_rows$n_paired > summary_rows$n_ce) ||
        any(summary_rows$n_paired > summary_rows$n_arithmetic)) {
        stop("Gain/arithmetic table validation failed: paired counts exceed source counts.")
    }

    table_wide <- summary_rows %>%
        select(
            probability,
            mean_ce_deviation,
            mean_arithmetic_deviation,
            p_value
        ) %>%
        pivot_longer(
            cols = -probability,
            names_to = "measure",
            values_to = "value"
        ) %>%
        mutate(
            lottery = paste0("GO", probability)
        ) %>%
        select(measure, lottery, value) %>%
        pivot_wider(names_from = lottery, values_from = value) %>%
        arrange(match(measure, c(
            "mean_ce_deviation",
            "mean_arithmetic_deviation",
            "p_value"
        )))

    list(
        participant_table = participant_table,
        summary = summary_rows,
        table = table_wide
    )
}

gain_arithmetic_tables <- make_gain_arithmetic_table(
    plot_observations,
    analysis_data
)

calculation_vs_ce_data <- gain_arithmetic_tables$summary %>%
    transmute(
        probability,
        lottery = factor(
            paste0("GO", probability),
            levels = paste0("GO", c(10, 25, 50, 75, 90))
        ),
        `CE deviation` = mean_ce_deviation,
        `Arithmetic deviation` = mean_arithmetic_deviation,
        `CE deviation SE` = se_ce_deviation,
        `Arithmetic deviation SE` = se_arithmetic_deviation,
        p_value
    ) %>%
    pivot_longer(
        cols = c(`CE deviation`, `Arithmetic deviation`),
        names_to = "measure",
        values_to = "deviation"
    ) %>%
    mutate(
        se = case_when(
            measure == "CE deviation" ~ `CE deviation SE`,
            measure == "Arithmetic deviation" ~ `Arithmetic deviation SE`,
            TRUE ~ NA_real_
        )
    )

if (nrow(calculation_vs_ce_data) != 10L ||
    any(!is.finite(calculation_vs_ce_data$deviation)) ||
    any(calculation_vs_ce_data$se < 0, na.rm = TRUE)) {
    stop("Gain/arithmetic plot validation failed: invalid plotted values or SEs.")
}

calculation_vs_ce_annotations <- calculation_vs_ce_data %>%
    group_by(probability, lottery, p_value) %>%
    summarise(
        y_position = max(deviation + 2 * coalesce(se, 0), na.rm = TRUE),
        .groups = "drop"
    ) %>%
    mutate(
        y_position = y_position + max(
            0.15,
            0.05 * diff(range(calculation_vs_ce_data$deviation))
        ),
        p_label = paste0("p = ", format.pval(
            p_value,
            digits = 2,
            eps = 0.001
        ))
    )

calculationVsCE <- ggplot(
    calculation_vs_ce_data,
    aes(x = lottery, y = deviation, color = measure, group = measure)
) +
    geom_hline(yintercept = 0, linewidth = 0.4, color = "grey50") +
    geom_line(linewidth = 0.7) +
    geom_point(size = 2.8) +
    geom_errorbar(
        aes(
            ymin = deviation - 2 * se,
            ymax = deviation + 2 * se
        ),
        width = 0.08,
        linewidth = 0.5
    ) +
    geom_text(
        data = calculation_vs_ce_annotations,
        aes(x = lottery, y = y_position, label = p_label),
        inherit.aes = FALSE,
        color = "black",
        size = 3.5
    ) +
    scale_color_manual(
        values = c(
            "CE deviation" = "#E7B800",
            "Arithmetic deviation" = "#00AFBB"
        )
    ) +
    labs(
        title = "Arithmetic calculations and MPL certainty equivalents",
        x = "Gain MPL",
        y = "Deviation from expected value",
        color = NULL
    ) +
    theme_minimal(base_size = 12) +
    theme(
        legend.position = "top",
        panel.grid.minor = element_blank()
    )

calculation_vs_ce_file <- file.path(
    PATH_TO_DATA,
    dir_figures,
    "calculationVsCE.png"
)
ggsave(
    calculation_vs_ce_file,
    calculationVsCE,
    width = 8,
    height = 5,
    units = "in",
    dpi = 300
)

# Additional MPL metrics must not inherit the deviation-only CE/LE validity
# filter. Keep separate trial observations so reaction time and cognitive
# uncertainty cover every valid incentivized MPL row.
additional_mpl_observations <- analysis_data %>%
    filter(
        task == "mpl",
        block == "mpl_incentives",
        grepl("^[GLOA]O(10|15|25|75|90)$", mplType) # remove the 50% probability
    ) %>%
    transmute(
        subject,
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
        subBlock,
        reaction_time = suppressWarnings(as.numeric(rt)),
        cognitive_uncertainty = 100 - suppressWarnings(as.numeric(CU))
    )

if (nrow(additional_mpl_observations) == 0L) {
    stop("Additional-data preparation failed: no incentivized MPL rows were found.")
}

if (any(!is.na(additional_mpl_observations$cognitive_uncertainty) &
    (!is.finite(additional_mpl_observations$cognitive_uncertainty) |
        additional_mpl_observations$cognitive_uncertainty < 0 |
        additional_mpl_observations$cognitive_uncertainty > 100))) {
    stop("Additional-data validation failed: cognitive uncertainty is outside the 0-100 range.")
}

# The deviation function already implements the required subject-level
# aggregation and paired tests. Replacing normalized_deviation with one
# additional MPL metric keeps the analysis unit identical across outcomes.
make_incentive_metric <- function(data, metric_column) {
    if (!metric_column %in% names(data)) {
        stop(sprintf("Additional-data preparation failed: missing metric '%s'.", metric_column))
    }

    metric_data <- data %>%
        mutate(normalized_deviation = .data[[metric_column]])

    make_incentive_deviation(metric_data)
}

incentive_reaction_time_tables <- make_incentive_metric(
    additional_mpl_observations,
    "reaction_time"
)
incentive_cognitive_uncertainty_tables <- make_incentive_metric(
    additional_mpl_observations,
    "cognitive_uncertainty"
)

make_treatment_bar_data <- function(
    data,
    metric_column,
    metric_label,
    comparison = c("paired", "independent")
) {
    comparison <- match.arg(comparison)
    if (!metric_column %in% names(data)) {
        stop(sprintf("Treatment bar preparation failed: missing metric '%s'.", metric_column))
    }

    participant_means <- data %>%
        filter(
            !is.na(treatment),
            !is.na(.data[[metric_column]])
        ) %>%
        group_by(subject, treatment) %>%
        summarise(
            n_observations = n(),
            participant_mean = mean(.data[[metric_column]]),
            .groups = "drop"
        )

    treatment_test <- participant_means %>%
        select(subject, treatment, participant_mean) %>%
        pivot_wider(names_from = treatment, values_from = participant_mean)

    wilcox_test <- if (comparison == "paired") {
        paired <- treatment_test %>%
            filter(!is.na(mirror), !is.na(inequalities))
        if (nrow(paired) > 0L) {
            wilcox.test(
                paired$mirror,
                paired$inequalities,
                paired = TRUE,
                exact = FALSE
            )
        } else {
            NULL
        }
    } else {
        independent <- participant_means %>%
            filter(treatment %in% c("mirror", "inequalities"))
        if (n_distinct(independent$treatment) == 2L) {
            wilcox.test(
                participant_mean ~ treatment,
                data = independent,
                exact = FALSE
            )
        } else {
            NULL
        }
    }

    summary <- participant_means %>%
        group_by(treatment) %>%
        summarise(
            n = n(),
            mean_value = mean(participant_mean),
            sd_value = if (n() > 1L) sd(participant_mean) else NA_real_,
            se_value = if (n() > 1L) sd(participant_mean) / sqrt(n()) else NA_real_,
            .groups = "drop"
        )

    difference_summary <- if (comparison == "paired") {
        difference <- treatment_test %>%
            filter(!is.na(mirror), !is.na(inequalities)) %>%
            transmute(
                subject,
                treatment = "mirror - inequalities",
                participant_mean = mirror - inequalities
            )
        if (nrow(difference) > 0L) {
            difference %>%
                summarise(
                    treatment = first(treatment),
                    n = n(),
                    mean_value = mean(participant_mean),
                    sd_value = if (n() > 1L) sd(participant_mean) else NA_real_,
                    se_value = if (n() > 1L) sd(participant_mean) / sqrt(n()) else NA_real_
                )
        } else {
            tibble(
                treatment = "mirror - inequalities",
                n = 0L,
                mean_value = NA_real_,
                sd_value = NA_real_,
                se_value = NA_real_
            )
        }
    } else {
        group_summary <- summary %>%
            filter(treatment %in% c("mirror", "inequalities"))
        mirror_row <- group_summary %>% filter(treatment == "mirror")
        inequalities_row <- group_summary %>% filter(treatment == "inequalities")
        tibble(
            treatment = "mirror - inequalities",
            n = min(mirror_row$n, inequalities_row$n),
            mean_value = mirror_row$mean_value - inequalities_row$mean_value,
            sd_value = NA_real_,
            se_value = sqrt(mirror_row$se_value^2 + inequalities_row$se_value^2)
        )
    }

    bar_data <- bind_rows(
        summary,
        difference_summary
    ) %>%
        mutate(
            metric_label = metric_label,
            p_value = if (is.null(wilcox_test)) NA_real_ else wilcox_test$p.value
        ) %>%
        select(metric_label, treatment, n, mean_value, sd_value, se_value, p_value)

    if (nrow(bar_data) != 3L ||
        any(!is.finite(bar_data$mean_value)) ||
        any(!is.na(bar_data$se_value) & !is.finite(bar_data$se_value))) {
        stop("Treatment bar preparation failed: expected three finite summary bars.")
    }

    list(
        participant_means = participant_means,
        treatment_test = treatment_test,
        summary = bar_data,
        p_value = if (is.null(wilcox_test)) NA_real_ else wilcox_test$p.value
    )
}

treatment_deviation_data <- plot_observations %>%
    filter(probability != 50) %>%
    transmute(
        subject,
        treatment,
        probability,
        subBlock,
        normalized_deviation
    )

treatment_deviation_tables <- make_treatment_bar_data(
    treatment_deviation_data,
    "normalized_deviation",
    "Deviation",
    comparison = "paired"
)

treatment_reaction_time_tables <- make_treatment_bar_data(
    additional_mpl_observations,
    "reaction_time",
    "Reaction time (ms)",
    comparison = "paired"
)

treatment_cognitive_uncertainty_tables <- make_treatment_bar_data(
    additional_mpl_observations,
    "cognitive_uncertainty",
    "Cognitive uncertainty",
    comparison = "paired"
)

make_ordered_treatment_tables <- function(order_values) {
    deviation <- treatment_deviation_data %>%
        filter(subBlock %in% order_values)
    reaction_time <- additional_mpl_observations %>%
        filter(subBlock %in% order_values)

    list(
        deviation = make_treatment_bar_data(
            deviation,
            "normalized_deviation",
            "Deviation",
            comparison = "independent"
        ),
        reaction_time = make_treatment_bar_data(
            reaction_time,
            "reaction_time",
            "Reaction time (ms)",
            comparison = "independent"
        ),
        cognitive_uncertainty = make_treatment_bar_data(
            reaction_time,
            "cognitive_uncertainty",
            "Cognitive uncertainty",
            comparison = "independent"
        )
    )
}

treatment_tables_order1 <- make_ordered_treatment_tables(1:14)
treatment_tables_order2 <- make_ordered_treatment_tables(15:28)

mean_row <- function(table, incentive_name) {
    row <- table %>% filter(incentive == incentive_name)
    if (nrow(row) == 1L) row else tibble(mean_deviation = NA_real_, se_deviation = NA_real_)
}

difference_row <- function(table, treatment_name) {
    row <- table %>% filter(treatment == treatment_name)
    if (nrow(row) == 1L) row else tibble(mean_difference = NA_real_, se_difference = NA_real_)
}

percent_row <- function(table, treatment_name) {
    row <- table %>% filter(treatment == treatment_name)
    if (nrow(row) == 1L) row else tibble(mean_percent = NA_real_, se_percent = NA_real_)
}

super_row <- mean_row(incentive_deviation_tables$table_mean, "super")
classic_row <- mean_row(incentive_deviation_tables$table_mean, "classic")
inequalities_row <- difference_row(incentive_deviation_tables$table_difference, "inequalities")
mirror_row <- difference_row(incentive_deviation_tables$table_difference, "mirror")
inequalities_percent_row <- percent_row(incentive_deviation_tables$table_percentage, "inequalities")
mirror_percent_row <- percent_row(incentive_deviation_tables$table_percentage, "mirror")

barplot_data <- tibble(
    metric_label = "Deviation",
    deviation_super = super_row$mean_deviation,
    se_deviation_super = super_row$se_deviation,
    deviation_classic = classic_row$mean_deviation,
    se_deviation_classic = classic_row$se_deviation,
    p_super_classic = incentive_deviation_tables$p_super_classic,
    diff_mirror = mirror_row$mean_difference,
    se_diff_mirror = mirror_row$se_difference,
    diff_inequalities = inequalities_row$mean_difference,
    se_diff_inequalities = inequalities_row$se_difference,
    p_diff = incentive_deviation_tables$p_difference,
    percent_mirror = mirror_percent_row$mean_percent,
    se_percent_mirror = mirror_percent_row$se_percent,
    percent_inequalities = inequalities_percent_row$mean_percent,
    se_percent_inequalities = inequalities_percent_row$se_percent,
    p_percent = incentive_deviation_tables$p_percent
)

make_metric_barplot_data <- function(incentive_tables, metric_label) {
    super_row <- mean_row(incentive_tables$table_mean, "super")
    classic_row <- mean_row(incentive_tables$table_mean, "classic")
    inequalities_row <- difference_row(incentive_tables$table_difference, "inequalities")
    mirror_row <- difference_row(incentive_tables$table_difference, "mirror")
    inequalities_percent_row <- percent_row(incentive_tables$table_percentage, "inequalities")
    mirror_percent_row <- percent_row(incentive_tables$table_percentage, "mirror")

    tibble(
        metric_label = metric_label,
        deviation_super = super_row$mean_deviation,
        se_deviation_super = super_row$se_deviation,
        deviation_classic = classic_row$mean_deviation,
        se_deviation_classic = classic_row$se_deviation,
        p_super_classic = incentive_tables$p_super_classic,
        diff_mirror = mirror_row$mean_difference,
        se_diff_mirror = mirror_row$se_difference,
        diff_inequalities = inequalities_row$mean_difference,
        se_diff_inequalities = inequalities_row$se_difference,
        p_diff = incentive_tables$p_difference,
        percent_mirror = mirror_percent_row$mean_percent,
        se_percent_mirror = mirror_percent_row$se_percent,
        percent_inequalities = inequalities_percent_row$mean_percent,
        se_percent_inequalities = inequalities_percent_row$se_percent,
        p_percent = incentive_tables$p_percent
    )
}

reaction_time_barplot_data <- make_metric_barplot_data(
    incentive_reaction_time_tables,
    "Reaction time (ms)"
)
cognitive_uncertainty_barplot_data <- make_metric_barplot_data(
    incentive_cognitive_uncertainty_tables,
    "Cognitive uncertainty"
)

incentive_deviation_tables_order1 <- make_incentive_deviation(
    plot_observations %>% filter(subBlock %in% 1:14)
)
incentive_deviation_tables_order2 <- make_incentive_deviation(
    plot_observations %>% filter(subBlock %in% 15:28)
)
incentive_reaction_time_tables_order1 <- make_incentive_metric(
    additional_mpl_observations %>% filter(subBlock %in% 1:14),
    "reaction_time"
)
incentive_reaction_time_tables_order2 <- make_incentive_metric(
    additional_mpl_observations %>% filter(subBlock %in% 15:28),
    "reaction_time"
)
incentive_cognitive_uncertainty_tables_order1 <- make_incentive_metric(
    additional_mpl_observations %>% filter(subBlock %in% 1:14),
    "cognitive_uncertainty"
)
incentive_cognitive_uncertainty_tables_order2 <- make_incentive_metric(
    additional_mpl_observations %>% filter(subBlock %in% 15:28),
    "cognitive_uncertainty"
)

make_choice_level_incentive_data <- function(data, metric_column, metric_label) {
    if (!metric_column %in% names(data)) {
        stop(sprintf(
            "Choice-level preparation failed: missing metric '%s'.",
            metric_column
        ))
    }

    observations <- data %>%
        filter(
            !is.na(subject),
            incentive %in% c("super", "classic"),
            !is.na(.data[[metric_column]])
        ) %>%
        transmute(
            subject,
            treatment,
            incentive = factor(incentive, levels = c("classic", "super")),
            value = .data[[metric_column]]
        )

    if (nrow(observations) == 0L || n_distinct(observations$subject) < 2L) {
        stop("Choice-level preparation failed: insufficient clustered observations.")
    }

    fit_clustered <- function(model_data, formula) {
        model <- lm(formula, data = model_data)
        covariance <- sandwich::vcovCL(model, cluster = model_data$subject)
        list(model = model, covariance = covariance)
    }

    robust_p_value <- function(test_fit, coefficient) {
        estimate <- coef(test_fit$model)[[coefficient]]
        standard_error <- sqrt(test_fit$covariance[coefficient, coefficient])
        if (!is.finite(estimate) || !is.finite(standard_error) || standard_error == 0) {
            return(NA_real_)
        }
        2 * pnorm(abs(estimate / standard_error), lower.tail = FALSE)
    }

    mean_summary <- observations %>%
        group_by(incentive) %>%
        group_modify(~ {
            fit <- fit_clustered(.x, value ~ 1)
            estimate <- coef(fit$model)[[1]]
            standard_error <- sqrt(fit$covariance[1, 1])
            tibble(
                n = nrow(.x),
                n_subject = n_distinct(.x$subject),
                mean_value = estimate,
                se_value = standard_error
            )
        }) %>%
        ungroup()

    pooled_fit <- fit_clustered(observations, value ~ incentive)
    p_super_classic <- robust_p_value(pooled_fit, "incentivesuper")

    treatment_contrasts <- lapply(
        c("mirror", "inequalities"),
        function(treatment_name) {
            treatment_data <- observations %>%
                filter(treatment == treatment_name)
            if (nrow(treatment_data) == 0L) {
                return(tibble(
                    treatment = treatment_name,
                    mean_difference = NA_real_,
                    se_difference = NA_real_,
                    p_difference = NA_real_,
                    mean_percent = NA_real_,
                    se_percent = NA_real_,
                    p_percent = NA_real_
                ))
            }

            fit <- fit_clustered(treatment_data, value ~ incentive)
            coefficient <- "incentivesuper"
            difference <- coef(fit$model)[[coefficient]]
            variance_difference <- fit$covariance[coefficient, coefficient]
            se_difference <- sqrt(variance_difference)
            p_difference <- robust_p_value(fit, coefficient)
            classic_mean <- coef(fit$model)[[1]]
            variance_classic <- fit$covariance[1, 1]
            covariance_difference_classic <- fit$covariance[coefficient, 1]
            percent <- difference / classic_mean * 100
            gradient <- c(
                100 / classic_mean,
                -100 * difference / classic_mean^2
            )
            covariance_matrix <- fit$covariance[c(coefficient, "(Intercept)"),
                c(coefficient, "(Intercept)"),
                drop = FALSE
            ]
            variance_percent <- as.numeric(
                t(gradient) %*% covariance_matrix %*% gradient
            )

            tibble(
                treatment = treatment_name,
                mean_difference = difference,
                se_difference = se_difference,
                p_difference = p_difference,
                mean_percent = percent,
                se_percent = sqrt(max(variance_percent, 0)),
                p_percent = if (is.finite(variance_percent) && variance_percent > 0) {
                    2 * pnorm(abs(percent / sqrt(variance_percent)), lower.tail = FALSE)
                } else {
                    NA_real_
                }
            )
        }
    ) %>%
        bind_rows()

    interaction_fit <- fit_clustered(
        observations %>%
            mutate(
                treatment = factor(
                    treatment,
                    levels = c("inequalities", "mirror")
                )
            ),
        value ~ incentive * treatment
    )
    interaction_coefficient <- "incentivesuper:treatmentmirror"
    p_difference <- robust_p_value(
        interaction_fit,
        interaction_coefficient
    )

    cell_design <- expand_grid(
        incentive = factor(c("classic", "super"), levels = c("classic", "super")),
        treatment = factor(
            c("inequalities", "mirror"),
            levels = c("inequalities", "mirror")
        )
    )
    cell_matrix <- model.matrix(
        delete.response(terms(interaction_fit$model)),
        cell_design
    )
    cell_estimates <- as.numeric(
        cell_matrix %*% coef(interaction_fit$model)
    )
    cell_covariance <- cell_matrix %*%
        interaction_fit$covariance %*%
        t(cell_matrix)
    inequalities_classic <- which(
        cell_design$incentive == "classic" &
            cell_design$treatment == "inequalities"
    )
    inequalities_super <- which(
        cell_design$incentive == "super" &
            cell_design$treatment == "inequalities"
    )
    mirror_classic <- which(
        cell_design$incentive == "classic" &
            cell_design$treatment == "mirror"
    )
    mirror_super <- which(
        cell_design$incentive == "super" &
            cell_design$treatment == "mirror"
    )
    percentage_gradient <- function(classic_index, super_index) {
        classic <- cell_estimates[[classic_index]]
        difference <- cell_estimates[[super_index]] - classic
        gradient <- numeric(length(cell_estimates))
        gradient[[super_index]] <- 100 / classic
        gradient[[classic_index]] <- -100 * difference / classic^2
        gradient
    }
    mirror_percentage_gradient <- percentage_gradient(
        mirror_classic,
        mirror_super
    )
    inequalities_percentage_gradient <- percentage_gradient(
        inequalities_classic,
        inequalities_super
    )
    percentage_contrast <- mirror_percentage_gradient -
        inequalities_percentage_gradient
    percentage_variance <- as.numeric(
        t(percentage_contrast) %*%
            cell_covariance %*%
            percentage_contrast
    )
    p_percentage <- if (is.finite(percentage_variance) && percentage_variance > 0) {
        percentage_estimate <- 100 * (
            (cell_estimates[[mirror_super]] - cell_estimates[[mirror_classic]]) /
                cell_estimates[[mirror_classic]] -
                (cell_estimates[[inequalities_super]] -
                    cell_estimates[[inequalities_classic]]) /
                    cell_estimates[[inequalities_classic]]
        )
        2 * pnorm(
            abs(percentage_estimate / sqrt(percentage_variance)),
            lower.tail = FALSE
        )
    } else {
        NA_real_
    }

    summary <- mean_summary %>%
        transmute(
            incentive = as.character(incentive),
            n,
            n_subject,
            mean_value,
            se_value
        )

    list(
        metric_label = metric_label,
        observations = observations,
        means = summary,
        differences = treatment_contrasts,
        p_super_classic = p_super_classic,
        p_difference = p_difference,
        p_percentage = p_percentage
    )
}

make_choice_level_barplot_data <- function(choice_tables) {
    mirror <- choice_tables$differences %>% filter(treatment == "mirror")
    inequalities <- choice_tables$differences %>% filter(treatment == "inequalities")
    super <- choice_tables$means %>% filter(incentive == "super")
    classic <- choice_tables$means %>% filter(incentive == "classic")

    result <- tibble(
        metric_label = choice_tables$metric_label,
        deviation_super = super$mean_value,
        se_deviation_super = super$se_value,
        deviation_classic = classic$mean_value,
        se_deviation_classic = classic$se_value,
        p_super_classic = choice_tables$p_super_classic,
        diff_mirror = mirror$mean_difference,
        se_diff_mirror = mirror$se_difference,
        diff_inequalities = inequalities$mean_difference,
        se_diff_inequalities = inequalities$se_difference,
        p_diff = choice_tables$p_difference,
        percent_mirror = mirror$mean_percent,
        se_percent_mirror = mirror$se_percent,
        percent_inequalities = inequalities$mean_percent,
        se_percent_inequalities = inequalities$se_percent,
        p_percent = choice_tables$p_percentage
    )

    if (nrow(result) != 1L || any(!is.finite(unlist(result[,
        -1L
    ])))) {
        stop("Choice-level preparation failed: non-finite bar data.")
    }
    result
}

choice_level_deviation_tables <- make_choice_level_incentive_data(
    plot_observations,
    "normalized_deviation",
    "Deviation"
)
choice_level_reaction_time_tables <- make_choice_level_incentive_data(
    additional_mpl_observations,
    "reaction_time",
    "Reaction time (ms)"
)
choice_level_cognitive_uncertainty_tables <- make_choice_level_incentive_data(
    additional_mpl_observations,
    "cognitive_uncertainty",
    "Cognitive uncertainty"
)

choice_level_barplot_data <- list(
    deviation = make_choice_level_barplot_data(choice_level_deviation_tables),
    reaction_time = make_choice_level_barplot_data(choice_level_reaction_time_tables),
    cognitive_uncertainty = make_choice_level_barplot_data(
        choice_level_cognitive_uncertainty_tables
    )
)

choice_level_deviation_bars_order1 <- make_choice_level_incentive_data(
    plot_observations %>% filter(subBlock %in% 1:14),
    "normalized_deviation",
    "Deviation"
)
choice_level_deviation_bars_order2 <- make_choice_level_incentive_data(
    plot_observations %>% filter(subBlock %in% 15:28),
    "normalized_deviation",
    "Deviation"
)
choice_level_reaction_time_bars_order1 <- make_choice_level_incentive_data(
    additional_mpl_observations %>% filter(subBlock %in% 1:14),
    "reaction_time",
    "Reaction time (ms)"
)
choice_level_reaction_time_bars_order2 <- make_choice_level_incentive_data(
    additional_mpl_observations %>% filter(subBlock %in% 15:28),
    "reaction_time",
    "Reaction time (ms)"
)
choice_level_cognitive_uncertainty_bars_order1 <- make_choice_level_incentive_data(
    additional_mpl_observations %>% filter(subBlock %in% 1:14),
    "cognitive_uncertainty",
    "Cognitive uncertainty"
)
choice_level_cognitive_uncertainty_bars_order2 <- make_choice_level_incentive_data(
    additional_mpl_observations %>% filter(subBlock %in% 15:28),
    "cognitive_uncertainty",
    "Cognitive uncertainty"
)

barplot_data_order1 <- make_metric_barplot_data(
    incentive_deviation_tables_order1,
    "Deviation"
)
barplot_data_order2 <- make_metric_barplot_data(
    incentive_deviation_tables_order2,
    "Deviation"
)
reaction_time_barplot_data_order1 <- make_metric_barplot_data(
    incentive_reaction_time_tables_order1,
    "Reaction time (ms)"
)
reaction_time_barplot_data_order2 <- make_metric_barplot_data(
    incentive_reaction_time_tables_order2,
    "Reaction time (ms)"
)
cognitive_uncertainty_barplot_data_order1 <- make_metric_barplot_data(
    incentive_cognitive_uncertainty_tables_order1,
    "Cognitive uncertainty"
)
cognitive_uncertainty_barplot_data_order2 <- make_metric_barplot_data(
    incentive_cognitive_uncertainty_tables_order2,
    "Cognitive uncertainty"
)

plot_incentive_deviation_bars <- function(
    data,
    output_file = NULL,
    order_label = NULL
) {
    difference_data <- tibble(
        bar = factor(
            c("Super", "Classic", "Mirror difference", "Inequalities difference"),
            levels = c("Super", "Classic", "Mirror difference", "Inequalities difference")
        ),
        value = c(
            data$deviation_super,
            data$deviation_classic,
            data$diff_mirror,
            data$diff_inequalities
        ),
        se = c(
            data$se_deviation_super,
            data$se_deviation_classic,
            data$se_diff_mirror,
            data$se_diff_inequalities
        ),
        fill_group = c("Super", "Classic", "Mirror", "Inequalities")
    )

    percentage_data <- tibble(
        bar = factor(
            c("Mirror percentage", "Inequalities percentage"),
            levels = c("Mirror percentage", "Inequalities percentage")
        ),
        value = c(data$percent_mirror, data$percent_inequalities),
        se = c(data$se_percent_mirror, data$se_percent_inequalities),
        fill_group = c("Mirror", "Inequalities")
    )

    make_scale <- function(bar_data) {
        finite_bounds <- bar_data %>%
            filter(!is.na(value), !is.na(se), is.finite(value), is.finite(se)) %>%
            mutate(lower = value - 2 * se, upper = value + 2 * se)

        y_min <- min(c(finite_bounds$lower, 0), na.rm = TRUE)
        y_max <- max(c(finite_bounds$upper, 0), na.rm = TRUE)
        y_range <- y_max - y_min
        if (!is.finite(y_range) || y_range == 0) y_range <- 1

        list(
            y_min = y_min - 0.12 * y_range,
            y_max = y_max + 0.12 * y_range,
            bracket = y_max + 0.07 * y_range,
            text = y_max + 0.11 * y_range,
            tick = 0.015 * y_range
        )
    }

    difference_scale <- make_scale(difference_data)
    percentage_scale <- make_scale(percentage_data)

    difference_plot <- ggplot(difference_data, aes(x = bar, y = value, fill = fill_group)) +
        geom_col(width = 0.68, colour = "black", linewidth = 0.35) +
        geom_errorbar(aes(ymin = value - 2 * se, ymax = value + 2 * se), width = 0.18, linewidth = 0.55, na.rm = TRUE) +
        geom_text(aes(label = ifelse(is.na(value), "", sprintf("%.2f", value))), vjust = ifelse(difference_data$value >= 0, -0.8, 1.8), size = 3.2, na.rm = TRUE) +
        scale_fill_manual(values = c("Super" = "#E7B800", "Classic" = "#00AFBB", "Mirror" = "#E7B800", "Inequalities" = "#00AFBB")) +
        scale_x_discrete(labels = c("Super", "Classic", "Mirror\ndifference", "Inequalities\ndifference")) +
        labs(x = NULL, y = data$metric_label) +
        theme_bw(base_size = 12) +
        theme(legend.position = "none", axis.text.x = element_text(angle = 35, hjust = 1), panel.grid.major.x = element_blank()) +
        coord_cartesian(ylim = c(difference_scale$y_min, difference_scale$y_max), clip = "off")

    difference_plot <- difference_plot +
        annotate("segment", x = 1, xend = 2, y = difference_scale$bracket, yend = difference_scale$bracket, linewidth = 0.35) +
        annotate("segment", x = 1, xend = 1, y = difference_scale$bracket - difference_scale$tick, yend = difference_scale$bracket, linewidth = 0.35) +
        annotate("segment", x = 2, xend = 2, y = difference_scale$bracket - difference_scale$tick, yend = difference_scale$bracket, linewidth = 0.35) +
        annotate("text", x = 1.5, y = difference_scale$text, label = paste0("p = ", format_p_value(data$p_super_classic)), size = 3.2) +
        annotate("segment", x = 3, xend = 4, y = difference_scale$bracket, yend = difference_scale$bracket, linewidth = 0.35) +
        annotate("segment", x = 3, xend = 3, y = difference_scale$bracket - difference_scale$tick, yend = difference_scale$bracket, linewidth = 0.35) +
        annotate("segment", x = 4, xend = 4, y = difference_scale$bracket - difference_scale$tick, yend = difference_scale$bracket, linewidth = 0.35) +
        annotate("text", x = 3.5, y = difference_scale$text, label = paste0("p = ", format_p_value(data$p_diff)), size = 3.2)

    percentage_plot <- ggplot(percentage_data, aes(x = bar, y = value, fill = fill_group)) +
        geom_col(width = 0.68, colour = "black", linewidth = 0.35) +
        geom_errorbar(aes(ymin = value - 2 * se, ymax = value + 2 * se), width = 0.18, linewidth = 0.55, na.rm = TRUE) +
        geom_text(aes(label = ifelse(is.na(value), "", sprintf("%.2f", value))), vjust = ifelse(percentage_data$value >= 0, -0.8, 1.8), size = 3.2, na.rm = TRUE) +
        scale_fill_manual(values = c("Mirror" = "#E7B800", "Inequalities" = "#00AFBB")) +
        scale_x_discrete(labels = c("Mirror\npercentage", "Inequalities\npercentage")) +
        labs(x = NULL, y = paste(data$metric_label, "percentage difference")) +
        theme_bw(base_size = 12) +
        theme(legend.position = "none", axis.text.x = element_text(angle = 35, hjust = 1), panel.grid.major.x = element_blank()) +
        coord_cartesian(ylim = c(percentage_scale$y_min, percentage_scale$y_max), clip = "off")

    percentage_plot <- percentage_plot +
        annotate("segment", x = 1, xend = 2, y = percentage_scale$bracket, yend = percentage_scale$bracket, linewidth = 0.35) +
        annotate("segment", x = 1, xend = 1, y = percentage_scale$bracket - percentage_scale$tick, yend = percentage_scale$bracket, linewidth = 0.35) +
        annotate("segment", x = 2, xend = 2, y = percentage_scale$bracket - percentage_scale$tick, yend = percentage_scale$bracket, linewidth = 0.35) +
        annotate("text", x = 1.5, y = percentage_scale$text, label = paste0("p = ", format_p_value(data$p_percent)), size = 3.2)

    plot_object <- patchwork::wrap_plots(
        difference_plot,
        percentage_plot,
        nrow = 1,
        widths = c(4, 2)
    )
    plot_title <- paste("Pooled MPL", data$metric_label, "by incentive status")
    if (!is.null(order_label)) {
        plot_title <- paste(plot_title, "-", order_label)
    }
    plot_object <- plot_object +
        patchwork::plot_annotation(title = plot_title)

    if (!is.null(output_file)) {
        ggsave(output_file, plot = plot_object, width = 12, height = 6, dpi = 300)
    }

    plot_object
}

format_p_value <- function(p_value) {
    if (is.na(p_value) || !is.finite(p_value)) {
        return("NA")
    }
    if (p_value < 0.001) {
        return("<0.001")
    }
    format(round(p_value, 3), nsmall = 3)
}
plot_incentive_deviation_bars(barplot_data)

incentive_barplot <- plot_incentive_deviation_bars(
    barplot_data,
    file.path(PATH_TO_DATA, dir_figures, "incentive_deviation_bars.png")
)
plot_incentive_deviation_bars(barplot_data)

reaction_time_barplot <- plot_incentive_deviation_bars(
    reaction_time_barplot_data,
    file.path(PATH_TO_DATA, dir_figures, "incentive_reaction_time_bars.png")
)
plot_incentive_deviation_bars(reaction_time_barplot_data)

cognitive_uncertainty_barplot <- plot_incentive_deviation_bars(
    cognitive_uncertainty_barplot_data,
    file.path(PATH_TO_DATA, dir_figures, "incentive_cognitive_uncertainty_bars.png")
)
plot_incentive_deviation_bars(cognitive_uncertainty_barplot_data)

plot_treatment_bars <- function(
    data,
    output_file = NULL,
    order_label = NULL
) {
    treatment_levels <- c("mirror", "inequalities", "mirror - inequalities")
    labels <- c(
        mirror = "Preference\n(mirror)",
        inequalities = "Objective-goal\n(inequalities)",
        `mirror - inequalities` = "Difference"
    )

    plot_data <- data$summary %>%
        mutate(
            treatment = factor(treatment, levels = treatment_levels),
            label = unname(labels[as.character(treatment)])
        )

    finite_bounds <- plot_data %>%
        filter(is.finite(mean_value), is.finite(se_value)) %>%
        mutate(
            lower = mean_value - 2 * se_value,
            upper = mean_value + 2 * se_value
        )
    y_min <- min(c(finite_bounds$lower, 0), na.rm = TRUE)
    y_max <- max(c(finite_bounds$upper, 0), na.rm = TRUE)
    y_range <- y_max - y_min
    if (!is.finite(y_range) || y_range == 0) y_range <- 1

    plot_title <- paste("Treatment framing:", data$summary$metric_label[[1]])
    if (!is.null(order_label)) {
        plot_title <- paste(plot_title, "-", order_label)
    }

    plot_object <- ggplot(
        plot_data,
        aes(x = treatment, y = mean_value, fill = treatment)
    ) +
        geom_col(width = 0.65, colour = "black", linewidth = 0.35) +
        geom_errorbar(
            aes(
                ymin = mean_value - 2 * se_value,
                ymax = mean_value + 2 * se_value
            ),
            width = 0.16,
            linewidth = 0.55,
            na.rm = TRUE
        ) +
        geom_text(
            aes(
                label = sprintf("%.2f", mean_value),
                y = ifelse(mean_value >= 0, mean_value + 2 * se_value, mean_value - 2 * se_value),
                vjust = ifelse(mean_value >= 0, -0.8, 1.8)
            ),
            size = 3.2
        ) +
        scale_x_discrete(labels = labels) +
        scale_fill_manual(
            values = c(
                "mirror" = "#E7B800",
                "inequalities" = "#00AFBB",
                "mirror - inequalities" = "#7A7A7A"
            )
        ) +
        labs(
            title = plot_title,
            x = NULL,
            y = data$summary$metric_label[[1]]
        ) +
        theme_bw(base_size = 12) +
        theme(
            legend.position = "none",
            axis.text.x = element_text(angle = 20, hjust = 1),
            panel.grid.major.x = element_blank()
        ) +
        coord_cartesian(
            ylim = c(y_min - 0.12 * y_range, y_max + 0.22 * y_range),
            clip = "off"
        ) +
        annotate(
            "text",
            x = 1.5,
            y = y_max + 0.15 * y_range,
            label = paste0("paired p = ", format_p_value(data$p_value)),
            size = 3.4
        )

    if (!is.null(output_file)) {
        ggsave(output_file, plot = plot_object, width = 7, height = 6, dpi = 300)
    }

    plot_object
}

treatment_deviation_bars <- plot_treatment_bars(
    treatment_deviation_tables,
    file.path(PATH_TO_DATA, dir_figures, "treatment_deviation_bars.png")
)
treatment_RT_bars <- plot_treatment_bars(
    treatment_reaction_time_tables,
    file.path(PATH_TO_DATA, dir_figures, "treatment_RT_bars.png")
)
treatment_cognitive_uncertainty_bars <- plot_treatment_bars(
    treatment_cognitive_uncertainty_tables,
    file.path(PATH_TO_DATA, dir_figures, "treatment_cognitive_uncertainty_bars.png")
)

treatment_deviation_bars_order1 <- plot_treatment_bars(
    treatment_tables_order1$deviation,
    file.path(PATH_TO_DATA, dir_figures, "treatment_deviation_bars_order1.png"),
    order_label = "order 1"
)
treatment_deviation_bars_order2 <- plot_treatment_bars(
    treatment_tables_order2$deviation,
    file.path(PATH_TO_DATA, dir_figures, "treatment_deviation_bars_order2.png"),
    order_label = "order 2"
)
treatment_RT_bars_order1 <- plot_treatment_bars(
    treatment_tables_order1$reaction_time,
    file.path(PATH_TO_DATA, dir_figures, "treatment_RT_bars_order1.png"),
    order_label = "order 1"
)
treatment_RT_bars_order2 <- plot_treatment_bars(
    treatment_tables_order2$reaction_time,
    file.path(PATH_TO_DATA, dir_figures, "treatment_RT_bars_order2.png"),
    order_label = "order 2"
)
treatment_cognitive_uncertainty_bars_order1 <- plot_treatment_bars(
    treatment_tables_order1$cognitive_uncertainty,
    file.path(PATH_TO_DATA, dir_figures, "treatment_cognitive_uncertainty_bars_order1.png"),
    order_label = "order 1"
)
treatment_cognitive_uncertainty_bars_order2 <- plot_treatment_bars(
    treatment_tables_order2$cognitive_uncertainty,
    file.path(PATH_TO_DATA, dir_figures, "treatment_cognitive_uncertainty_bars_order2.png"),
    order_label = "order 2"
)

incentive_deviation_bars_order1 <- plot_incentive_deviation_bars(
    barplot_data_order1,
    file.path(PATH_TO_DATA, dir_figures, "incentive_deviation_bars_order1.png"),
    order_label = "order 1"
)
incentive_deviation_bars_order2 <- plot_incentive_deviation_bars(
    barplot_data_order2,
    file.path(PATH_TO_DATA, dir_figures, "incentive_deviation_bars_order2.png"),
    order_label = "order 2"
)
incentive_reaction_time_bars_order1 <- plot_incentive_deviation_bars(
    reaction_time_barplot_data_order1,
    file.path(PATH_TO_DATA, dir_figures, "incentive_reaction_time_bars_order1.png"),
    order_label = "order 1"
)
incentive_reaction_time_bars_order2 <- plot_incentive_deviation_bars(
    reaction_time_barplot_data_order2,
    file.path(PATH_TO_DATA, dir_figures, "incentive_reaction_time_bars_order2.png"),
    order_label = "order 2"
)
incentive_cognitive_uncertainty_bars_order1 <- plot_incentive_deviation_bars(
    cognitive_uncertainty_barplot_data_order1,
    file.path(PATH_TO_DATA, dir_figures, "incentive_cognitive_uncertainty_bars_order1.png"),
    order_label = "order 1"
)
incentive_cognitive_uncertainty_bars_order2 <- plot_incentive_deviation_bars(
    cognitive_uncertainty_barplot_data_order2,
    file.path(PATH_TO_DATA, dir_figures, "incentive_cognitive_uncertainty_bars_order2.png"),
    order_label = "order 2"
)

choice_level_deviation_bars <- plot_incentive_deviation_bars(
    choice_level_barplot_data$deviation,
    file.path(PATH_TO_DATA, dir_figures, "choice_level_deviation_bars.png")
)
choice_level_reaction_time_bars <- plot_incentive_deviation_bars(
    choice_level_barplot_data$reaction_time,
    file.path(PATH_TO_DATA, dir_figures, "choice_level_reaction_time_bars.png")
)
choice_level_cognitive_uncertainty_bars <- plot_incentive_deviation_bars(
    choice_level_barplot_data$cognitive_uncertainty,
    file.path(PATH_TO_DATA, dir_figures, "choice_level_cognitive_uncertainty_bars.png")
)
choice_level_deviation_bars_order1 <- plot_incentive_deviation_bars(
    make_choice_level_barplot_data(choice_level_deviation_bars_order1),
    file.path(PATH_TO_DATA, dir_figures, "choice_level_deviation_bars_order1.png"),
    order_label = "order 1"
)
choice_level_deviation_bars_order2 <- plot_incentive_deviation_bars(
    make_choice_level_barplot_data(choice_level_deviation_bars_order2),
    file.path(PATH_TO_DATA, dir_figures, "choice_level_deviation_bars_order2.png"),
    order_label = "order 2"
)
choice_level_reaction_time_bars_order1 <- plot_incentive_deviation_bars(
    make_choice_level_barplot_data(choice_level_reaction_time_bars_order1),
    file.path(PATH_TO_DATA, dir_figures, "choice_level_reaction_time_bars_order1.png"),
    order_label = "order 1"
)
choice_level_reaction_time_bars_order2 <- plot_incentive_deviation_bars(
    make_choice_level_barplot_data(choice_level_reaction_time_bars_order2),
    file.path(PATH_TO_DATA, dir_figures, "choice_level_reaction_time_bars_order2.png"),
    order_label = "order 2"
)
choice_level_cognitive_uncertainty_bars_order1 <- plot_incentive_deviation_bars(
    make_choice_level_barplot_data(choice_level_cognitive_uncertainty_bars_order1),
    file.path(PATH_TO_DATA, dir_figures, "choice_level_cognitive_uncertainty_bars_order1.png"),
    order_label = "order 1"
)
choice_level_cognitive_uncertainty_bars_order2 <- plot_incentive_deviation_bars(
    make_choice_level_barplot_data(choice_level_cognitive_uncertainty_bars_order2),
    file.path(PATH_TO_DATA, dir_figures, "choice_level_cognitive_uncertainty_bars_order2.png"),
    order_label = "order 2"
)


cat("Participant records:", length(participant_records), "\n")
cat("Trial rows:", nrow(trial_data), "\n")
cat("Columns:", ncol(trial_data), "\n")
cat("Failed participant records:", length(failed_participant_records), "\n")
cat("Excluded trial rows:", nrow(round_trip_data) - nrow(analysis_source_data), "\n")
cat("Analysis dataframe rows:", nrow(analysis_data), "\n")
cat("Analysis dataframe columns:", ncol(analysis_data), "\n")
cat("MPL rows with equivalents:", length(mpl_rows), "\n")
cat("MPL treatment observations:", sum(mpl_group_summary_treatment$n), "\n")
cat("MPL treatment summary groups:", nrow(mpl_group_summary_treatment), "\n")
cat("MPL incentive summary groups:", nrow(mpl_group_summary_incentive), "\n")
cat("Additional-data MPL rows:", nrow(additional_mpl_observations), "\n")
cat("Additional-data reaction-time rows:", sum(!is.na(additional_mpl_observations$reaction_time)), "\n")
cat("Additional-data cognitive-uncertainty rows:", sum(!is.na(additional_mpl_observations$cognitive_uncertainty)), "\n")
cat("Additional-data subjects:", n_distinct(additional_mpl_observations$subject), "\n")
cat("CSV written to:", CSV_FILE, "\n")
