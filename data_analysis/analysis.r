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

cat("Participant records:", length(participant_records), "\n")
cat("Trial rows:", nrow(trial_data), "\n")
cat("Columns:", ncol(trial_data), "\n")
cat("Analysis dataframe rows:", nrow(analysis_data), "\n")
cat("Analysis dataframe columns:", ncol(analysis_data), "\n")
cat("CSV written to:", CSV_FILE, "\n")
