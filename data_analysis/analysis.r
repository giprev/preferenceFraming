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
cat("Participant records:", length(participant_records), "\n")
cat("Trial rows:", nrow(trial_data), "\n")
cat("Columns:", ncol(trial_data), "\n")
cat("Analysis dataframe rows:", nrow(analysis_data), "\n")
cat("Analysis dataframe columns:", ncol(analysis_data), "\n")
cat("MPL rows with equivalents:", length(mpl_rows), "\n")
cat("CSV written to:", CSV_FILE, "\n")
