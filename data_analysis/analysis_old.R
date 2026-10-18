# This code parses and analyses data from the experiments with the two GOriginal tables, taken from Oprea (2024)



# install.packages("jsonlite")
library(jsonlite)
library(tidyverse)
library(dplyr)
library(sandwich)
library(ggpubr)
library(rstatix)
library(estimatr)
library(ggplot2)
library(purrr)
library(patchwork)
library(ggtext)
library(stargazer)
library(sjPlot) # to plot interaction effects
library(devtools)
library(modelsummary)
library(texreg) # to plot lm_robust regressions
library(miceadds) # to check for homoskedasticity
library(clubSandwich) # to run significance tests on small samples with clusters (not only HC but CR s.e.)
library(lmtest)
library(sandwich)
library(lme4) # to fit random effect
library(lmerTest) # like lme4 but with p-values
library(fixest) # to fit fixed effects

rm(list = ls())

setwd("/Users/domitilleprevost/Documents/Master E&P/Stage/coding/jatos/study_assets_root/preferenceFramingExperiment/data_analysis")
PATH_TO_DATA <- "/Users/domitilleprevost/Documents/Master E&P/Stage/coding/jatos/study_assets_root/preferenceFramingExperiment/data_analysis"
dir.create(file.path(PATH_TO_DATA, "figures_test_16102026"), showWarnings = FALSE, recursive = TRUE)
getwd()






#------------- Data formatting -----------#

# Path to your file
filePath1 <- paste(PATH_TO_DATA, "/test_16102026.txt", sep = "")

# filePath_pilot_3And4And5 <- "/Users/domitilleprevost/Documents/Master E&P/Stage/coding/dataExperiment/results_pilot_3&4&5.txt"


text <- readLines(filePath1)

nSub <- length(text)




# Loop through each part of the text file and write it to a separate text file
for (i in 1:nSub) {
  part <- text[i]
  writeLines(part, paste0("part", i, ".txt"))
}


accuracySpan <- function(answer, correct) {
  # Handle edge cases

  if (is.list(answer)) {
    if (length(answer) == 0) {
      return(0)
    }
    answer <- answer[[1]]
  }
  if (is.list(correct)) {
    if (length(correct) == 0) {
      return(0)
    }
    correct <- correct[[1]]
  }

  if (is.null(answer) || is.null(correct) || (length(correct) == 0) || length(answer) == 0) {
    return(0)
  }
  # Convert answer to integer vector if it's character
  if (is.character(answer)) {
    answer <- as.integer(answer)
  }
  # If correct is character vector, convert to integers
  if (is.character(correct)) {
    correct <- as.integer(correct)
  }


  totalPositions <- length(correct)
  maxPositions <- max(length(answer), length(correct))
  correctMatches <- 0

  # Compare each position up to the length of the correct array
  for (i in 1:totalPositions) {
    if (i <= length(answer) && i <= length(correct) && !is.na(answer[i]) && !is.na(correct[i])) {
      if (answer[i] == correct[i]) {
        correctMatches <- correctMatches + 1
      }
    }
  }
  # Return the ratio of correct matches to the maximum number of positions
  return(correctMatches / maxPositions)
}

roundDownToFifth <- function(number) {
  return(floor(number * 5) / 5)
}

createSequenceArray <- function(y, X, position) {
  lengthSurePayments <- 17 # One unit less
  lengthSurePaymentsGO <- 24 #

  array <- c()
  pos <- 0

  # hard code the position of the upper line of the rational switch point
  if (position == "high" & (y == 10 | y == 90) & (X == "G" | X == "L")) {
    pos <- 6
  } else if (position == "low" & (y == 10 | y == 90) & (X == "G" | X == "L")) {
    pos <- 12
  } else if (position == "high" & (y == 25 | y == 75)) {
    pos <- 5
  } else if (position == "low" & (y == 25 | y == 75)) {
    pos <- 13
  } else if (position == "high" & y == 50) {
    pos <- 4
  } else if (position == "low" & y == 50) {
    pos <- 14
  } else if (position == "high" & (y == 10 | y == 15) & X == "A") {
    pos <- 8
  } else if (position == "low" & (y == 10 | y == 15) & X == "A") {
    pos <- 10
  }

  EV <- 0
  if (X == "G") {
    EV <- roundDownToFifth(y * 0.25)
  } else if (X == "L") {
    EV <- roundDownToFifth(-y * 0.25)
  } else if (X == "A" & y == 10) {
    EV <- 9.5
  } else if (X == "A" & y == 15) {
    EV <- 14.5
  }

  if (X == "G") {
    # cat("y is", y, "X is", X, "position is", position, "\n")
    # cat("EV in G is", EV, "\n")
    # cat("pos in G is", pos, "\n")
    startValue <- EV - ((pos - 1) * 0.2)
    # cat("startValue in G is", startValue, "\n")
    for (i in 0:lengthSurePayments) {
      array <- c(array, round((startValue + (i * 0.2)) * 10) / 10)
    }
  } else if (X == "L") {
    # cat("y is", y, "X is", X, "position is", position, "\n")
    # cat("EV in L is", EV, "\n")
    # cat("pos in L is", pos, "\n")
    startValue <- EV - ((pos - 1) * 0.2)
    # cat("startValue in L is", startValue, "\n")
    for (i in 0:lengthSurePayments) {
      array <- c(array, round((startValue + (i * 0.2)) * 10) / 10)
    }
  } else if (X == "A") {
    # cat("y is", y, "X is", X, "position is", position, "\n")
    # cat("EV in A is", EV, "\n")
    # cat("pos in A is", pos, "\n")
    startValue <- EV - (pos - 1)
    # cat("startValue in A is", startValue, "\n")
    for (i in 0:lengthSurePayments) {
      array <- c(array, startValue + i)
    }
  }
  return(array)
}

make_EGEmpirical <- function(mplType, switch_row1, switch_row2, switchRow1Choice, switchRow2Choice, position) {
  y_value <- as.numeric(gsub("[^0-9]", "", mplType))
  X_value <- case_when(
    str_starts(mplType, "G") ~ "G",
    str_starts(mplType, "L") ~ "L",
    str_starts(mplType, "A") ~ "A",
    TRUE ~ NA_character_
  )
  endowment <- case_when(
    X_value == "G" ~ 5,
    X_value == "L" ~ 30,
    (X_value == "A" & y_value == 10) ~ 15,
    (X_value == "A" & y_value == 15) ~ 20
  )
  if (!(mplType == "GO10") & !(mplType == "GO90")) {
    surePayments <- createSequenceArray(y_value, X_value, position) # CAUTION if no switch sr1 = sr2 = -1 !!! Then need to see if choices only lotteries or only mirror
  } else if ((mplType == "GO10") | (mplType == "GO90")) {
    surePayments <- c(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25)
  }
  spLength <- length(surePayments)
  if (switch_row1 == -1 & switch_row2 == -1) {
    if (X_value == "G" | X_value == "L") {
      if (switchRow1Choice == "lottery") {
        if (X_value == "G") {
          EG <- 25 * y_value / 100 + endowment
        } else if (X_value == "L") {
          EG <- -25 * y_value / 100 + endowment
        }
      } else if (switchRow1Choice == "sure") {
        EG <- (surePayments[1] + surePayments[spLength]) / 2 + endowment
      } else {
        cat("Error in calculating EGEmpirical when no switch and X is G or L\n")
      }
    } else if (X_value == "A") {
      if (switchRow1Choice == "lottery") {
        EG <- ((((surePayments[1] - y_value) / 2 + (surePayments[spLength] - y_value) / 2)) / 2) + endowment
      } else if (switchRow1Choice == "sure") {
        EG <- 0 + endowment
      } else {
        cat("Error in calculating EGEmpirical when no switch and X is A\n")
      }
    }
  } else if (switch_row1 == -2 & switch_row2 == -2) {
    EG <- 0
  } else if (!(switch_row1 == -1 & switch_row2 == -1) & !(switch_row1 == -2 & switch_row2 == -2)) {
    if (X_value == "G") {
      EG <- (25 * y_value / 100) * ((switch_row1 + 1) / spLength) + ((surePayments[switch_row2 + 1] + surePayments[spLength]) / 2) * ((spLength - switch_row1 - 1) / spLength) + endowment # add +1 at indices because R initializes vectors at 0
    } else if (X_value == "L") {
      EG <- -(25 * y_value / 100) * ((switch_row1 + 1) / spLength) + ((surePayments[switch_row2 + 1] + surePayments[spLength]) / 2) * ((spLength - switch_row1 - 1) / spLength) + endowment
    } else if (X_value == "A") {
      EG <- 0 + ((((surePayments[switch_row2 + 1] - y_value) / 2) + ((surePayments[spLength] - y_value) / 2)) / 2) * ((spLength - switch_row1 - 1) / spLength) + endowment
    }
  } else {
    cat("error: switch_row 1 & 2 neither -1 and -1 nor -2 and -2 nor NORMAL \n")
  }

  if ((str_starts(mplType, "G") || str_starts(mplType, "L")) && (switchRow1Choice == "sure" && switchRow2Choice == "lottery")) {
    EG <- NA_real_
    cat("inversion detected, NA put as EG", mplType, ", switchRow1Choice is ", switchRow1Choice, " position is ", position, "\n")
  } else if (str_starts(mplType, "A") && (switchRow1Choice == "lottery" && switchRow2Choice == "sure")) {
    EG <- NA_real_
    cat("inversion detected, NA put as EG", mplType, ", switchRow1Choice is ", switchRow1Choice, " position is ", position, "\n")
  }

  # cat("EG is ", EG, " with X_value=", X_value," y=", y_value, " switch_row1=",switch_row1, "all(choices == `lottery`) is ", all(choices == "lottery"), " position is ", position, "(switch_row1+1)/spLength+(spLength-switch_row1-1)/spLength = ", (switch_row1+1)/spLength+(spLength-switch_row1-1)/spLength, "\n")
  return(EG)
}

extractMplDataframes <- function(dataPerParticipant) {
  # Filter data for the conditions you specified
  mpl_data <- dataPerParticipant %>%
    mutate(rtSpanMpl = case_when(
      (block == "span_mpl" & task == "mpl") ~ lead(rt),
      TRUE ~ NA
    )) %>%
    filter(!is.na(mplType) & !is.null(mplType) & mplType != "" & block == "span_mpl" & task == "mpl")

  # Check if we have any data
  if (nrow(mpl_data) == 0) {
    warning("No data found matching the criteria")
    return(list())
  }

  # Create modified mplType for doubled lotteries (subBlock 13 or 14)
  mpl_data <- mpl_data %>%
    mutate(
      mplType_modified = case_when(
        subBlock %in% c(13, 14) ~ paste0(substr(mplType, 1, 1), "S", substr(mplType, 2, nchar(mplType))),
        TRUE ~ mplType
      )
    )

  # Get unique combinations of mplType and statusMpl
  unique_combinations <- mpl_data %>%
    select(mplType_modified, statusMpl) %>%
    distinct()

  # Initialize list to store dataframes
  dataframes_list <- list()

  # Loop through each unique combination
  for (i in 1:nrow(unique_combinations)) {
    mpl_type <- unique_combinations$mplType_modified[i]
    status_mpl <- unique_combinations$statusMpl[i]

    # Filter data for this specific combination
    subset_data <- mpl_data %>%
      filter(mplType_modified == mpl_type & statusMpl == status_mpl)

    # Calculate ev based on mplType
    subset_data <- subset_data %>%
      rowwise() %>%
      mutate(
        ev = {
          y_value <- as.numeric(gsub("[^0-9]", "", mplType))
          X_value <- case_when(
            str_starts(mplType, "G") ~ "G", # (mplType !== "GO10") & (mplType !== "GO90")
            str_starts(mplType, "L") ~ "L",
            str_starts(mplType, "A") ~ "A",
            TRUE ~ NA_character_
          )
          if (!(mplType == "GO10") & !(mplType == "GO90")) {
            surePayments <- createSequenceArray(y_value, X_value, position) # CAUTION if no switch sr1 = sr2 = -1 !!! Then need to see if choices only lotteries or only mirror
            midPoint <- 0.1
          } else if ((mplType == "GO10") | (mplType == "GO90")) {
            surePayments <- c(1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25)
            midPoint <- 0.5
          }
          # cat("surePayments defined with position =", position)

          if (switch_row1 == -1 & switch_row2 == -1) {
            noSwitchCounter <<- noSwitchCounter + 1
            if ((isLotteryFirst == TRUE & status_mpl == "lottery") | (isLotteryFirst == FALSE & status_mpl == "mirror")) {
              noSwitchCounterFirstPart <<- noSwitchCounterFirstPart + 1
            } else if ((isLotteryFirst == FALSE & status_mpl == "lottery") | (isLotteryFirst == TRUE & status_mpl == "mirror")) {
              noSwitchCounterSecondPart <<- noSwitchCounterSecondPart + 1
            }
            if (status_mpl == "lottery") {
              noSwitchCounterLottery <<- noSwitchCounterLottery + 1
            }
            if (status_mpl == "mirror") {
              noSwitchCounterMirror <<- noSwitchCounterMirror + 1
            }

            varName <- paste0("noSwitchCounter_", mpl_type, "_", status_mpl)
            noSwitchCounters[[varName]] <<- noSwitchCounters[[varName]] + 1
            # cat("noSwitchCounters[[varName]]=", noSwitchCounters[[varName]], " for ", varName, "\n")
            # cat("noSwitchCounter updated and is now", noSwitchCounter, "\n")
            if (X_value == "A") {
              if (all(choices == "lottery")) {
                noSwitchCounterRisky <<- noSwitchCounterRisky + 1
                if (position == "high") {
                  noSwitchCounterHighRisky <<- 1 + noSwitchCounterHighRisky
                } else if (position == "low") {
                  noSwitchCounterLowRisky <<- 1 + noSwitchCounterLowRisky
                }
                ev_value <- (y_value - (surePayments[1] - 0.5)) / 2 # sure amount as if the switching point was on the line after the last line
                cat("all choices lottery in A", y_value, "position is", position, "lottery, ev is", ev_value, "\n")
              } else if (all(choices == "sure")) {
                noSwitchCounterSure <<- noSwitchCounterSure + 1
                if (position == "high") {
                  noSwitchCounterHighSure <<- 1 + noSwitchCounterHighSure
                } else if (position == "low") {
                  noSwitchCounterLowSure <<- 1 + noSwitchCounterLowSure
                }
                ev_value <- (y_value - (surePayments[length(surePayments)] + 0.5)) / 2 # sure amount as if the switching point was on the line after the last line
                # cat("all choices sure in A",y_value, "lottery, ev is", ev_value, "\n")
              } else {
                ev_value <- NA # Undefined behavior
                cat("switch_row1 = -1 and switch_row2 = -1 but calculation failed, ev is NA\n")
              }
            } else {
              if (all(choices == "lottery")) {
                noSwitchCounterRisky <<- noSwitchCounterRisky + 1
                if (!is.na(position) & position == "high") {
                  noSwitchCounterHighRisky <<- 1 + noSwitchCounterHighRisky
                } else if (!is.na(position) & position == "low") {
                  noSwitchCounterLowRisky <<- 1 + noSwitchCounterLowRisky
                }
                ev_value <- surePayments[length(surePayments)] + midPoint # sure amount as if the switching point was on the line after the last line
                # cat("all choices lottery, ev is", ev_value, "\n")
              } else if (all(choices == "sure")) {
                noSwitchCounterSure <<- noSwitchCounterSure + 1
                if (!is.na(position) & position == "high") {
                  noSwitchCounterHighSure <<- 1 + noSwitchCounterHighSure
                } else if (!is.na(position) & position == "low") {
                  noSwitchCounterLowSure <<- 1 + noSwitchCounterLowSure
                }
                ev_value <- surePayments[1] - midPoint # sure amount as if the switching point was on the line before the first line
                # cat("all choices sure, ev is", ev_value, "\n")
              } else {
                ev_value <- NA # Undefined behavior
                cat("switch_row1 = -1 and switch_row2 = -1 but calculation failed, ev is NA\n")
              }
            }
            # ev_value <- NA # if we trials without switching points
            # cat("ev_value is NA/n")
          } else if (switch_row1 == -2 & switch_row2 == -2) {
            ev_value <- NA
            cat("no choices made in time limit \n")
          } else {
            if (X_value == "A") {
              ev_value <- (y_value - ((surePayments[switch_row2 + 1] + surePayments[switch_row1 + 1]) / 2)) / 2 # 50% chance of positive amount and 50% chance of - 10
              # cat("Calculated ev for A lottery mirror, mplType is", mplType, "y_value is", y_value, "X_value is", X_value, "ev_value is", ev_value, "position is" ,position, "surePayments[switch_row2 + 1] is ", surePayments[switch_row2 + 1], "switch_row2 is",switch_row2,"\n")
            } else {
              ev_value <- (surePayments[switch_row2 + 1] + surePayments[switch_row1 + 1]) / 2
            } # last value of the function is assigned to ev in mutate. ADD 1 because R starts at 1 instead of 0 (js)
            # cat("Calculated ev for L or G lottery mirror, mplType is", mplType, "y_value is", y_value, "X_value is", X_value, "ev_value is", ev_value, "position is" ,position, "surePayments[switch_row2 + 1] is ", surePayments[switch_row2 + 1], "switch_row2 is",switch_row2,"\n")
          }
          if ((str_starts(mplType, "G") || str_starts(mplType, "L")) && (switchRow1Choice == "sure" && switchRow2Choice == "lottery")) {
            ev_value <- NA_real_
            cat("inversion detected, NA put as ev, subject ", subject, " ", mplType, ", switchRow1Choice is ", switchRow1Choice, " position is ", position, "\n")
          } else if (str_starts(mplType, "A") && (switchRow1Choice == "lottery" && switchRow2Choice == "sure")) {
            cat("inversion detected, NA put as ev, subject ", subject, " ", mplType, ", switchRow1Choice is ", switchRow1Choice, " position is ", position, "\n")
            ev_value <- NA_real_
          }
          ev_value
        },
        EGEmpirical = make_EGEmpirical(mplType, switch_row1, switch_row2, switchRow1Choice, switchRow2Choice, position),
        noSwitchSure = case_when(
          (switch_row1 == -1 & switch_row2 == -1 & all(choices == "sure")) ~ 1,
          TRUE ~ 0
        ),
        noSwitchLottery = case_when(
          (switch_row1 == -1 & switch_row2 == -1 & all(choices == "lottery")) ~ 1, # lotteries stand for "not sure amount", they can be mirrors
          TRUE ~ 0
        ),
        noSwitch = case_when(
          (switch_row1 == -1 & switch_row2 == -1) ~ 1,
          TRUE ~ 0
        )
      ) %>%
      ungroup()

    # Select and rename columns as specified
    final_subset <- subset_data %>%
      select(
        ev = ev,
        EGEmpirical = EGEmpirical,
        rtChoice = rt,
        rtSpanMpl = rtSpanMpl,
        subBlockNumber = subBlock,
        accuracy = accuracy,
        position = position,
        noSwitch = noSwitch,
        noSwitchSure = noSwitchSure,
        noSwitchLottery = noSwitchLottery
      )


    # Create dataframe name
    df_name <- paste0(mpl_type, "_", status_mpl)

    # Store in list
    dataframes_list[[df_name]] <- final_subset

    # Also assign to global environment (optional)
    # assign(df_name, final_subset, envir = .GlobalEnv)
  }

  # Print summary of created dataframes
  cat("Created", length(dataframes_list), "dataframes:\n")
  # for(name in names(dataframes_list)) {
  #  cat("- ", name, ": ", nrow(dataframes_list[[name]]), " rows\n")
  # }

  return(dataframes_list)
}



# Initialize final_data outside the loop
final_data <- data.frame()
final_data_2 <- data.frame()

# Initialize noSwitchCounter : number of MPLs where the participants never switched
noSwitchCounter <- 0
noSwitchCounterRisky <- 0
noSwitchCounterSure <- 0
noSwitchCounterHighSure <- 0
noSwitchCounterLowSure <- 0
noSwitchCounterHighRisky <- 0
noSwitchCounterLowRisky <- 0
noSwitchCounters <- list()
# Define all possible combinations
mpl_types <- c(
  "G10", "G25", "G50", "G75", "G90", "L10", "L25", "L50", "L75", "L90", "A10", "A15",
  "GS10", "GS25", "GS50", "GS75", "GS90", "LS10", "LS25", "LS50", "LS75", "LS90", "AS10", "AS15",
  "GO10", "GO90"
)
status_types <- c("mirror", "lottery")
# Initialize ALL possible MPL columns with NA values first
for (mpl_type in mpl_types) {
  for (status_type in status_types) {
    varName <- paste0("noSwitchCounter_", mpl_type, "_", status_type)
    noSwitchCounters[[varName]] <- 0
  }
}
inversionCounter <- 0



for (iSub in 1:nSub) {
  partDirectory <- paste("part", as.character(iSub), ".txt", sep = "")

  dataPerParticipant <- fromJSON(partDirectory, flatten = TRUE)

  sanitize_for_bind <- function(df, target_prefix = "detailed_results") {
    # find columns that start with the target prefix
    cols <- grep(paste0("^", target_prefix), names(df), value = TRUE)
    if (length(cols) == 0) {
      return(df)
    }
    for (col in cols) {
      df[[col]] <- vapply(
        df[[col]],
        function(x) {
          if (is.null(x)) {
            return(NA_character_)
          }
          # atomic scalar -> convert to character
          if (is.atomic(x) && length(x) == 1) {
            return(as.character(x))
          }
          # otherwise serialize vectors/lists/objects to compact JSON
          jsonlite::toJSON(x, auto_unbox = TRUE)
        },
        FUN.VALUE = character(1),
        USE.NAMES = FALSE
      )
    }
    return(df)
  }

  dataPerParticipant <- sanitize_for_bind(dataPerParticipant)
  # Check if this participant has comprehensionFailure and skip if they do
  if (any(dataPerParticipant$task == "comprehensionFailure", na.rm = TRUE)) {
    cat("Skipping participant", iSub, "due to comprehensionFailure\n")
    next # Skip to the next iteration
  }

  participant_id <- as.character(dataPerParticipant[1, "subject"])
  pilotNumber <- ifelse(participant_id %in% c(
    "cgqjsl1obkbt1vt", "73stjgl8eqajqlw", "g7mj4prb5l3m79q",
    "rngkquxtmfkk8uk", "szhx2wdjacardp8", "3qw702xoocj0eg2"
  ), 3L, 4L)

  dataPerParticipant <- dataPerParticipant %>% rename_at("statusMPL", ~"statusMpl")


  completionCountLottery <- max(dataPerParticipant$failedQuestionsCountLottery, na.rm = TRUE)
  completionCountMirror <- max(dataPerParticipant$failedQuestionsCountMirror, na.rm = TRUE)
  wrongAnswerCountLottery <- sum(dataPerParticipant$incorrectQCountLottery, na.rm = TRUE)
  wrongAnswerCountMirror <- sum(dataPerParticipant$incorrectQCountMirror, na.rm = TRUE)

  noSwitchCounterBeginning <- noSwitchCounter
  noSwitchCounterFirstPart <- 0
  noSwitchCounterSecondPart <- 0
  noSwitchCounterLottery <- 0
  noSwitchCounterMirror <- 0


  # Extract the demographics cell
  demo_values <- dataPerParticipant %>%
    filter(task == "demographics") %>%
    select(responses) %>%
    pull()

  # Create a demographics data frame
  demo_data <- fromJSON(demo_values)

  demographics_df <- data.frame(
    demo_age = as.integer(demo_data$age),
    demo_gend = as.character(demo_data$gender),
    demo_educ = as.character(demo_data$education),
    demo_occu = as.character(demo_data$work),
    demo_reve = as.character(demo_data$income),
    demo_degre = as.character(demo_data$collegeDegree),
    demo_cours = as.character(demo_data$collegeCourse),
    demo_lsat = as.character(demo_data$life),
    stringsAsFactors = TRUE # Convert to factors
  )
  # ensure we don't keep the letters used to help participants to understand
  demographics_df$demo_lsat <- case_when(
    demographics_df$demo_lsat == "10 (très)" ~ "10",
    demographics_df$demo_lsat == "0 (pas du tout)" ~ "0",
    TRUE ~ demographics_df$demo_lsat # Keep original value for all others
  )

  # extract maximal span length achieved
  maximumSpan <- dataPerParticipant %>%
    filter(!is.na(maximumSpan)) %>%
    select(maximumSpan) %>%
    pull()
  spanLength <- as.integer(maximumSpan)

  treatmentValue <- dataPerParticipant %>%
    filter(!is.na(treatment)) %>%
    select(treatment) %>%
    pull()
  treatmentValue <- as.character(treatmentValue)

  isLotteryFirst <- dataPerParticipant %>%
    filter(!is.na(versionFirst)) %>%
    select(versionFirst) %>%
    pull()

  isLotteryFirst <- ifelse(length(isLotteryFirst) > 0 & isLotteryFirst[1] == "lottery_first", TRUE, FALSE)

  #    numCorrectQuestionMirror <- dataPerParticipant %>%
  #        filter( !is.na(num_correct) & task == "comprehensionSurveyMPLMirror") %>%
  #        select(num_correct) %>%
  #        pull()

  #    numCorrectQuestionLottery <- dataPerParticipant %>%
  #        filter( !is.na(num_correct) & task == "comprehensionSurveyMPLLottery") %>%
  #        select(num_correct) %>%
  #        pull()

  payment_spanMpl <- dataPerParticipant %>%
    filter(!is.na(payment_span_mpl)) %>%
    select(payment_span_mpl) %>%
    pull()

  payment_mpl <- dataPerParticipant %>%
    filter(!is.na(payment_mpl)) %>%
    select(payment_mpl) %>%
    pull()

  payment_spanSpan <- dataPerParticipant %>%
    filter(!is.na(payment_span_span)) %>%
    select(payment_span_span) %>%
    pull()
  payment_spanSpan <- ifelse(length(payment_spanSpan) > 0, as.numeric(payment_spanSpan[1]), NA)

  payment_calibration <- dataPerParticipant %>%
    filter(!is.na(payment_calibration)) %>%
    select(payment_calibration) %>%
    pull()
  payment_calibration <- ifelse(length(payment_calibration) > 0, as.numeric(payment_calibration[1]), NA)

  payment_total <- dataPerParticipant %>%
    filter(!is.na(totalPayment)) %>%
    select(totalPayment) %>%
    pull()

  dataPerParticipant <- dataPerParticipant %>%
    # Fill down mplType for span test trials
    mutate(
      mplType = case_when(
        # Keep existing mplType values for non-span test trials
        !(block == "span_mpl" & task == "spanTest") ~ mplType,
        # For span test trials in span_mpl block, use the previous row's mplType
        block == "span_mpl" & task == "spanTest" ~ lag(mplType),
        # Default case
        TRUE ~ mplType
      )
    )

  dataPerParticipant <- dataPerParticipant %>%
    rowwise() %>%
    mutate(
      accuracy = case_when(
        task == "spanTest" ~ accuracySpan(answer, correct), # & mplType != "" & block == "span_mpl"  !is.na(answer) & !is.null(correct) &
        TRUE ~ NA_real_
      ),
      .before = was_correct
    ) %>%
    ungroup()

  dataPerParticipant <- dataPerParticipant %>%
    # Fill down accuracy for mpl trials
    mutate(
      accuracy = case_when(
        # For span test trials in span_mpl block, use the next row's accuracy
        !(block == "span_mpl" & task == "mpl") ~ accuracy,
        block == "span_mpl" & task == "mpl" ~ lead(accuracy), # lead(task)
      )
    )

  # Extract MPL dataframes
  mpl_dataframes <- extractMplDataframes(dataPerParticipant)

  # Create base participant row
  participant_row <- data.frame(
    participant_id = participant_id,
    pilotNumber = pilotNumber,
    demo_gend = demographics_df$demo_gend,
    demo_educ = demographics_df$demo_educ,
    demo_occu = demographics_df$demo_occu,
    demo_reve = demographics_df$demo_reve,
    demo_degre = demographics_df$demo_degre,
    demo_cours = demographics_df$demo_cours,
    demo_lsat = demographics_df$demo_lsat,
    demo_age = demographics_df$demo_age,
    spanLength = ifelse(length(spanLength) > 0, spanLength, NA),
    treatment = treatmentValue,
    isLotteryFirst = isLotteryFirst,
    #        numCorrectQuestionMirror = ifelse(length(numCorrectQuestionMirror) > 0, numCorrectQuestionMirror[1], NA),
    #        numCorrectQuestionLottery = ifelse(length(numCorrectQuestionLottery) > 0, numCorrectQuestionLottery[1], NA),
    completionCountLottery = ifelse(length(completionCountLottery) > 0, completionCountLottery, NA),
    completionCountMirror = ifelse(length(completionCountMirror) > 0, completionCountMirror, NA),
    wrongAnswerCountLottery = ifelse(length(wrongAnswerCountLottery) > 0, wrongAnswerCountLottery, NA),
    wrongAnswerCountMirror = ifelse(length(wrongAnswerCountMirror) > 0, wrongAnswerCountMirror, NA),
    noSwitchCounter = noSwitchCounter - noSwitchCounterBeginning,
    noSwitchCounterFirstPart = noSwitchCounterFirstPart,
    noSwitchCounterSecondPart = noSwitchCounterSecondPart,
    noSwitchCounterLottery = noSwitchCounterLottery,
    noSwitchCounterMirror = noSwitchCounterMirror,
    payment_spanMpl = payment_spanMpl,
    # payment_mpl = payment_mpl,
    payment_spanSpan = payment_spanSpan,
    payment_calibration = payment_calibration,
    payment_total = payment_total,
    stringsAsFactors = FALSE
  )
  dataPerParticipant_2 <- dataPerParticipant %>%
    mutate(
      participant_id = participant_id,
      pilotNumber = pilotNumber,
      demo_gend = demographics_df$demo_gend,
      demo_educ = demographics_df$demo_educ,
      demo_occu = demographics_df$demo_occu,
      demo_reve = demographics_df$demo_reve,
      demo_degre = demographics_df$demo_degre,
      demo_cours = demographics_df$demo_cours,
      demo_lsat = demographics_df$demo_lsat,
      demo_age = demographics_df$demo_age,
      spanLength = ifelse(length(spanLength) > 0, spanLength, NA),
      treatment = treatmentValue,
      isLotteryFirst = isLotteryFirst,
      #        numCorrectQuestionMirror = ifelse(length(numCorrectQuestionMirror) > 0, numCorrectQuestionMirror[1], NA),
      #        numCorrectQuestionLottery = ifelse(length(numCorrectQuestionLottery) > 0, numCorrectQuestionLottery[1], NA),
      completionCountLottery = ifelse(length(completionCountLottery) > 0, completionCountLottery, NA),
      completionCountMirror = ifelse(length(completionCountMirror) > 0, completionCountMirror, NA),
      wrongAnswerCountLottery = ifelse(length(wrongAnswerCountLottery) > 0, wrongAnswerCountLottery, NA),
      wrongAnswerCountMirror = ifelse(length(wrongAnswerCountMirror) > 0, wrongAnswerCountMirror, NA),
      noSwitchCounter = noSwitchCounter - noSwitchCounterBeginning,
      noSwitchCounterFirstPart = noSwitchCounterFirstPart,
      noSwitchCounterSecondPart = noSwitchCounterSecondPart,
      noSwitchCounterLottery = noSwitchCounterLottery,
      noSwitchCounterMirror = noSwitchCounterMirror,
      payment_spanMpl = payment_spanMpl,
      # payment_mpl = payment_mpl,
      payment_spanSpan = payment_spanSpan,
      payment_calibration = payment_calibration,
      payment_total = payment_total,
    )


  # Define all possible combinations
  mpl_types <- c(
    "G10", "G25", "G50", "G75", "G90", "L10", "L25", "L50",
    "L75", "L90", "A10", "A15",
    "GS10", "GS25", "GS50", "GS75", "GS90", "LS10", "LS25",
    "LS50", "LS75", "LS90", "AS10", "AS15"
  )
  status_types <- c("mirror", "lottery")
  column_types <- c(
    "ev", "rtChoice", "subBlockNumber", "accuracy",
    "position", "rtSpanMpl", "EGEmpirical", "noSwitch",
    "noSwitchSure", "noSwitchLottery"
  )

  # Initialize ALL possible MPL columns with NA values first
  for (mpl_type in mpl_types) {
    for (status_type in status_types) {
      for (col_type in column_types) {
        new_col_name <- paste0(mpl_type, "_", status_type, "_", col_type)
        participant_row[[new_col_name]] <- NA
      }
    }
  }

  # Now add MPL data columns dynamically based on actual dataframes (this will overwrite the NAs where data exists)
  for (df_name in names(mpl_dataframes)) {
    df_data <- mpl_dataframes[[df_name]]

    # Get all column names from this dataframe
    col_names <- names(df_data) # ev, rtChoice, subBlockNumber, accuracy, rtSpanMpl, EGEmpirical, noSwitch, noSwitchSure, noSwitchLottery

    # For each column in the dataframe, update the corresponding column in participant_row
    for (col_name in col_names) {
      new_col_name <- paste0(df_name, "_", col_name)

      # Update the column with the first row's value (overwriting the NA)
      if (nrow(df_data) > 0) {
        participant_row[[new_col_name]] <- df_data[[col_name]][1]
      }
      # If dataframe is empty, the NA value remains
    }
  }

  accuracyOverall <- participant_row %>%
    summarise(
      accuracyOverall = mean(c_across(ends_with("_accuracy")), na.rm = TRUE)
    ) %>%
    pull(accuracyOverall)

  # Check if this participant has accuracy less than chance level (1/9 around 0.12)
  if (accuracyOverall < 0.12) {
    cat("Skipping participant", iSub, "due to chance level accuracy\n")
    next # Skip to the next iteration
  }


  # Add to final dataset
  if (nrow(final_data) == 0) {
    final_data <- participant_row
  } else {
    final_data <- rbind(final_data, participant_row)
  }


  # Add to final dataset 2
  if (nrow(final_data_2) == 0) {
    final_data_2 <- dataPerParticipant_2
  } else {
    final_data_2 <- bind_rows(final_data_2, dataPerParticipant_2)
  }

  cat("Processed participant", iSub, "\n")
}
final_data_2 <- final_data_2 %>%
  mutate(
    switchInversion = case_when(
      block == "span_mpl" & task == "mpl" &
        ((str_starts(mplType, "G") | str_starts(mplType, "L")) &
          switchRow1Choice == "sure" & switchRow2Choice == "lottery"
        ) ~ 1L,
      block == "span_mpl" & task == "mpl" &
        (str_starts(mplType, "A") &
          switchRow1Choice == "lottery" & switchRow2Choice == "sure"
        ) ~ 1L,
      block == "span_mpl" & task == "mpl" ~ 0L,
      TRUE ~ NA_integer_
    ),
    .after = switchRow1Choice
  )

final_data_wide <- write.csv(final_data, "/Users/domitilleprevost/Documents/Master E&P/Stage/coding/jatos/study_assets_root/073bfc0a-f209-4ca9-9665-9f66dd9fd4ef/dataAnalysis/CSV pour Bastien/final_data_wide.csv", row.names = FALSE)
final_data_2_toShare <- final_data_2[] <- lapply(final_data_2, function(x) {
  if (is.list(x)) as.character(x) else x
})
data_concatenated <- write.csv(final_data_2_toShare, "/Users/domitilleprevost/Documents/Master E&P/Stage/coding/jatos/study_assets_root/073bfc0a-f209-4ca9-9665-9f66dd9fd4ef/dataAnalysis/CSV pour Bastien/data_concatenated.csv", row.names = FALSE)


# view(final_data_2)
# view(final_data)

tableNoSwitchByPosition <- data.frame(choices = c("risky", "sure", "ratio"), high = c(noSwitchCounterHighRisky, noSwitchCounterHighSure, noSwitchCounterHighRisky / noSwitchCounterHighSure), low = c(noSwitchCounterLowRisky, noSwitchCounterLowSure, noSwitchCounterLowRisky / noSwitchCounterLowSure))
tableNoSwitchByPosition


# hist(rtBetweenRoundsMpl, breaks = 100)
# meanRTHard <- mean(rtBetweenRoundsMplHard)
# medianRTHard <- median(rtBetweenRoundsMplHard)
# meanRTEasy <- mean(rtBetweenRoundsMplEasy)
# medianRTEasy <- median(rtBetweenRoundsMplEasy)

# timeRT <- tibble::tibble(treatment=c("hard", "easy"), meanRT=c(meanRTHard, meanRTEasy), medianRT=c(medianRTHard, medianRTEasy))
# timeRT

final_data_desc <- data.frame()


for (iSub in 1:nSub) {
  partDirectory <- paste("part", as.character(iSub), ".txt", sep = "")

  dataPerParticipant <- fromJSON(partDirectory)


  # Check if this participant has comprehensionFailure
  if (any(dataPerParticipant$task == "comprehensionFailure", na.rm = TRUE)) {
    understood <- FALSE
    cat("participant ", iSub, " didn't understand \n")
  } else {
    understood <- TRUE
    cat("participant ", iSub, " understood \n")
  }

  participant_id <- as.character(dataPerParticipant[1, "subject"])

  dataPerParticipant <- dataPerParticipant %>% rename_at("statusMPL", ~"statusMpl")


  # return NA when input is NULL/length 0 or all NA
  # NA-safe helpers: return NA when input is NULL/length 0 or all NA
  safe_max <- function(x) {
    if (is.null(x) || length(x) == 0) {
      return(NA_integer_)
    }
    xx <- x[!is.na(x)]
    if (length(xx) == 0) {
      return(NA_integer_)
    }
    return(max(xx))
  }
  safe_sum <- function(x) {
    if (is.null(x) || length(x) == 0) {
      return(NA_real_)
    }
    xx <- x[!is.na(x)]
    if (length(xx) == 0) {
      return(NA_real_)
    }
    return(sum(xx))
  }

  # compute these four values regardless of 'understood'; return NA if column entirely missing/NA
  completionCountLottery <- safe_max(dataPerParticipant$failedQuestionsCountLottery)
  completionCountMirror <- safe_max(dataPerParticipant$failedQuestionsCountMirror)
  wrongAnswerCountLottery <- safe_sum(dataPerParticipant$incorrectQCountLottery)
  wrongAnswerCountMirror <- safe_sum(dataPerParticipant$incorrectQCountMirror)

  # Extract the demographics cell
  demo_values <- dataPerParticipant %>%
    filter(task == "demographics") %>%
    select(responses) %>%
    pull()

  # Create a demographics data frame
  demo_data <- fromJSON(demo_values)

  demographics_df <- data.frame(
    demo_age = as.integer(demo_data$age),
    demo_gend = as.character(demo_data$gender),
    demo_educ = as.character(demo_data$education),
    demo_occu = as.character(demo_data$work),
    demo_reve = as.character(demo_data$income),
    demo_degre = as.character(demo_data$collegeDegree),
    demo_cours = as.character(demo_data$collegeCourse),
    demo_lsat = as.character(demo_data$life),
    stringsAsFactors = TRUE # Convert to factors
  )
  # ensure we don't keep the letters used to help participants to understand
  demographics_df$demo_lsat <- case_when(
    demographics_df$demo_lsat == "10 (très)" ~ "10",
    demographics_df$demo_lsat == "0 (pas du tout)" ~ "0",
    TRUE ~ demographics_df$demo_lsat # Keep original value for all others
  )

  # extract maximal span length achieved
  maximumSpan <- dataPerParticipant %>%
    filter(!is.na(maximumSpan)) %>%
    select(maximumSpan) %>%
    pull()
  spanLength <- as.integer(maximumSpan)

  # extract maximal span length achieved
  spanLength <- dataPerParticipant %>%
    filter(task == "spanTest" & block == "spanSpan" & spanCounter == 13 & letterType == 2) %>%
    select(span) %>%
    pull()
  spanLength <- as.integer(spanLength)

  treatmentValue <- dataPerParticipant %>%
    filter(!is.na(treatment)) %>%
    select(treatment) %>%
    pull()
  treatmentValue <- as.character(treatmentValue)

  isLotteryFirst <- dataPerParticipant %>%
    filter(!is.na(versionFirst)) %>%
    select(versionFirst) %>%
    pull()

  isLotteryFirst <- ifelse(length(isLotteryFirst) > 0 & isLotteryFirst[1] == "lottery_first", TRUE, FALSE)

  #    numCorrectQuestionMirror <- dataPerParticipant %>%
  #        filter( !is.na(num_correct) & task == "comprehensionSurveyMPLMirror") %>%
  #        select(num_correct) %>%
  #        pull()

  #    numCorrectQuestionLottery <- dataPerParticipant %>%
  #        filter( !is.na(num_correct) & task == "comprehensionSurveyMPLLottery") %>%
  #        select(num_correct) %>%
  #        pull()

  if (understood == TRUE) {
    payment_spanMpl <- dataPerParticipant %>%
      filter(!is.na(payment_span_mpl)) %>%
      select(payment_span_mpl) %>%
      pull()

    payment_mpl <- dataPerParticipant %>%
      filter(!is.na(payment_mpl)) %>%
      select(payment_mpl) %>%
      pull()
  } else {
    payment_spanMpl <- NA
    payment_mpl <- NA
  }

  payment_spanSpan <- dataPerParticipant %>%
    filter(!is.na(payment_span_span)) %>%
    select(payment_span_span) %>%
    pull()
  payment_spanSpan <- ifelse(length(payment_spanSpan) > 0, as.numeric(payment_spanSpan[1]), NA)

  payment_calibration <- dataPerParticipant %>%
    filter(!is.na(payment_calibration)) %>%
    select(payment_calibration) %>%
    pull()
  payment_calibration <- ifelse(length(payment_calibration) > 0, as.numeric(payment_calibration[1]), NA)

  payment_total <- dataPerParticipant %>%
    filter(!is.na(totalPayment)) %>%
    select(totalPayment) %>%
    pull()

  participant_row <- data.frame(
    participant_id = participant_id,
    demo_gend = demographics_df$demo_gend,
    demo_educ = demographics_df$demo_educ,
    demo_occu = demographics_df$demo_occu,
    demo_reve = demographics_df$demo_reve,
    demo_lsat = demographics_df$demo_lsat,
    demo_age = demographics_df$demo_age,
    understood = understood,
    spanLength = ifelse(length(spanLength) > 0, spanLength, NA),
    treatment = treatmentValue,
    isLotteryFirst = isLotteryFirst,
    #        numCorrectQuestionMirror = ifelse(length(numCorrectQuestionMirror) > 0, numCorrectQuestionMirror[1], NA),
    #        numCorrectQuestionLottery = ifelse(length(numCorrectQuestionLottery) > 0, numCorrectQuestionLottery[1], NA),
    completionCountLottery = ifelse(length(completionCountLottery) > 0, completionCountLottery, NA),
    completionCountMirror = ifelse(length(completionCountMirror) > 0, completionCountMirror, NA),
    wrongAnswerCountLottery = ifelse(length(wrongAnswerCountLottery) > 0, wrongAnswerCountLottery, NA),
    wrongAnswerCountMirror = ifelse(length(wrongAnswerCountMirror) > 0, wrongAnswerCountMirror, NA),
    payment_spanMpl = payment_spanMpl,
    # payment_mpl = payment_mpl,
    payment_spanSpan = payment_spanSpan,
    payment_calibration = payment_calibration,
    payment_total = payment_total
  )



  # Add to final dataset
  if (nrow(participant_row) == 0) {
    final_data_desc <- participant_row
  } else {
    final_data_desc <- rbind(final_data_desc, participant_row)
  }


  cat("Processed participant", iSub, "\n")
}
# view(final_data_desc)









# Create df_model for linear models from final_data - reshape from wide to long, one line per MPL type, both status on the same line
dfA <- final_data %>%
  # Keep all demographic/payment columns as-is, pivot only MPL columns
  pivot_longer(
    cols = matches("^(A|G|L)(S|O)?(10|15|25|50|75|90)_(mirror|lottery)_(ev|rtChoice|rtSpanMpl|subBlockNumber|accuracy|EGEmpirical|noSwitch|noSwitchSure|noSwitchLottery)$"), # Match MPL pattern
    names_to = c("mplType", "status", "measure"),
    names_sep = "_" # Split at the first underscore
  ) %>%
  # Combine status and measure
  unite("status_measure", status, measure, sep = "_") %>%
  # Pivot wider
  pivot_wider(
    names_from = status_measure,
    values_from = value
  ) %>%
  # add position columns separately
  left_join(
    final_data %>%
      select(participant_id, matches("^(A|G|L)(S|O)?(10|15|25|50|75|90)_(mirror|lottery)_position$")) %>%
      pivot_longer(
        cols = matches("_position$"),
        names_to = c("mplType", "status", "measure"),
        names_sep = "_"
      ) %>%
      # Combine status and measure
      unite("status_measure", status, measure, sep = "_") %>%
      pivot_wider(
        names_from = status_measure,
        values_from = value
      ),
    by = c("participant_id", "mplType")
  ) %>%
  # Remove all the original position columns that weren't pivoted
  select(-matches("^(A|G|L)(S|O)?(10|15|25|50|75|90)_(mirror|lottery)_position$")) %>%
  mutate(
    pred = case_when(
      str_starts(mplType, "G") ~ roundDownToFifth(25 * (as.numeric(str_extract(mplType, "\\d+")) / 100)) + 0.1,
      str_starts(mplType, "L") ~ roundDownToFifth((-25 * as.numeric(str_extract(mplType, "\\d+")) / 100)) + 0.1,
      str_starts(mplType, "A") ~ 0,
      TRUE ~ NA_real_
    ),
  ) %>%
  mutate(
    prob = case_when(
      str_starts(mplType, "G") ~ as.numeric(str_extract(mplType, "\\d+")),
      str_starts(mplType, "L") ~ as.numeric(str_extract(mplType, "\\d+")),
      str_starts(mplType, "A") & mplType %in% c("A10", "AS10") ~ 50,
      str_starts(mplType, "A") & mplType %in% c("A15", "AS15") ~ 50,
      TRUE ~ NA_real_
    ),
  ) %>%
  mutate(
    multiplier = case_when(
      (prob %in% c(10, 25) & str_starts(mplType, "G")) ~ 1,
      (prob %in% c(50, 75, 90) & str_starts(mplType, "G")) ~ -1,
      (prob %in% c(50, 75, 90) & str_starts(mplType, "L")) ~ 1,
      (prob %in% c(10, 25) & str_starts(mplType, "L")) ~ -1,
      (str_starts(mplType, "A")) ~ -1,
    )
  )

medRt <- dfA %>%
  pivot_longer(
    cols = c(mirror_rtChoice, lottery_rtChoice),
    names_to = "status",
    values_to = "rtChoice"
  ) %>%
  group_by(participant_id) %>%
  summarise(
    meanRtChoice = mean(rtChoice, na.rm = TRUE),
    .groups = "drop"
  ) %>%
  mutate(
    medRtChoice = median(meanRtChoice, na.rm = TRUE),
    aboveMedRtChoice = as.integer(meanRtChoice >= medRtChoice)
  ) # %>%

medCogLoadEffect <- final_data_2 %>%
  filter(
    block == "spanSpan" & task == "spanTest"
  ) %>%
  group_by(subject) %>%
  summarise(
    accuracy_mean_participant_source = mean(accuracy[letterType == 1], na.rm = TRUE),
    accuracy_mean_participant_target = mean(accuracy[letterType == 2], na.rm = TRUE),
    .groups = "drop"
  ) %>%
  mutate(
    impactCogLoad = accuracy_mean_participant_source - accuracy_mean_participant_target
  ) %>%
  mutate(
    medImpactCogLoad = median(impactCogLoad)
  ) %>%
  group_by(subject) %>%
  mutate(
    aboveMedImpactCogLoad = case_when(
      impactCogLoad < medImpactCogLoad ~ 0,
      impactCogLoad >= medImpactCogLoad ~ 1,
    )
  ) %>%
  rename(participant_id = subject)

# add median splits columns for rtChoice (MPLs) and cogLoad effect
dfA <- dfA %>%
  left_join(medRt %>% select(participant_id, aboveMedRtChoice), by = "participant_id") %>%
  left_join(medCogLoadEffect %>% select(participant_id, aboveMedImpactCogLoad), by = "participant_id")



final_data_long <- write.csv(dfA, "/Users/domitilleprevost/Documents/Master E&P/Stage/coding/jatos/study_assets_root/073bfc0a-f209-4ca9-9665-9f66dd9fd4ef/dataAnalysis/CSV pour Bastien/final_data_long.csv", row.names = FALSE)


mean(dfA %>% filter(treatment == "hard") %>% pull(mirror_rtChoice, lottery_rtChoice), na.rm = TRUE)
mean(dfA %>% filter(treatment == "easy") %>% pull(mirror_rtChoice, lottery_rtChoice), na.rm = TRUE)














#------------- Data analysis -----------#





rtCalibration <- final_data_2 %>%
  filter(task == "spanTest" & block == "calibration") %>%
  group_by(subject) %>%
  summarise(
    mean_rt_perParticipant = mean(rt),
    span_max = mean(spanLength)
  )
rtCalibration





# Cognitive load analysis (on span)
# view(dfA)

# Distribution of maximum span length
spanLengthData <- final_data %>%
  pull(spanLength)
spanLengthData
mean(spanLengthData)

df_span <- tibble::tibble(spanLength = spanLengthData)


p_span <- ggplot(df_span, aes(x = spanLength)) +
  geom_histogram(binwidth = 1, boundary = 0.5, colour = "white", fill = "#2c7fb8") +
  scale_x_continuous(breaks = seq(min(spanLengthData, na.rm = TRUE),
    max(spanLengthData, na.rm = TRUE),
    by = 1
  )) +
  labs( # title = "Distribution of maximum span length",
    x = "Span length",
    y = "Count"
  ) +
  theme_minimal(base_size = 14)
p_span <- annotate_figure(p_span, top = text_grob("Distribution of maximum span length", face = "bold", size = 14))


print(p_span)
ggsave(
  filename = file.path(PATH_TO_DATA, "Figures_pilot3&4&5", "p_span.pdf"),
  plot = p_span, device = "pdf", width = 6, height = 4
)



# Distribution of mean accuracy in source vs target span

# table of mean accuracy in source vs target span
mean_accuracy_perParticipants <- final_data_2 %>%
  filter(block == "spanSpan" & task == "spanTest") %>%
  group_by(subject, treatment, letterType) %>%
  summarise(
    mean_accuracy_pp = mean(accuracy, na.rm = TRUE),
    spanLength = unique(spanLength)[[1]],
    rt_r = mean(rt),
    .groups = "drop"
  ) %>%
  mutate(
    letterType = dplyr::recode(letterType, `1` = "source", `2` = "target"),
    treatment = dplyr::recode(treatment, `easy` = "control", `hard` = "cognitive load")
  ) %>%
  # group_by(treatment)%>%
  pivot_wider(
    names_from = letterType,
    values_from = c(mean_accuracy_pp, rt_r),
    names_glue = "{.value}_{letterType}"
  ) %>%
  ungroup() %>%
  rename(
    accuracy_source = mean_accuracy_pp_source,
    accuracy_target = mean_accuracy_pp_target,
    rt_target = rt_r_target
  ) %>%
  rowwise() %>%
  mutate(
    accuracy_difference = accuracy_source - accuracy_target,
    rt_difference = rt_r_source - rt_target
  ) %>%
  ungroup()

mean_accuracy_perParticipants

accuraciesPerParticipants <- mean_accuracy_perParticipants %>%
  group_by(treatment) %>%
  summarise(
    n = sum(!is.na(accuracy_source) & !is.na(accuracy_target)),
    mean_source = mean(accuracy_source, na.rm = TRUE),
    se_source = sd(accuracy_source) / sqrt(n),
    mean_target = mean(accuracy_target, na.rm = TRUE),
    se_target = sd(accuracy_target) / sqrt(n),
    p_value = ifelse(n >= 2, t.test(accuracy_source, accuracy_target, paired = TRUE)$p.value),
    .groups = "drop"
  )
accuraciesPerParticipants

meanAccuracyPerTargetSource <- mean_accuracy_perParticipants %>%
  summarise(
    meanAccuracySource = mean(accuracy_source, na.rm = TRUE),
    meanAccuracyTarget = mean(accuracy_target, na.rm = TRUE)
  )
meanAccuracyPerTargetSource

# impact of memory load on memory performance check

# Create the plot: accuracy source vs target in cog load vs control condition
makePlotAccuracySourceVsTarget <- function(data) {
  data <- data %>%
    group_by(treatment) %>%
    summarise(
      n = sum(!is.na(accuracy_source) & !is.na(accuracy_target)),
      mean_source = mean(accuracy_source, na.rm = TRUE),
      se_source = sd(accuracy_source) / sqrt(n),
      mean_target = mean(accuracy_target, na.rm = TRUE),
      se_target = sd(accuracy_target) / sqrt(n),
      p_value = ifelse(n >= 2, t.test(accuracy_source, accuracy_target, paired = TRUE)$p.value),
      .groups = "drop"
    )

  plots <- list()

  for (i in 1:nrow(data)) {
    row <- data[i, ]

    df_plot <- tibble::tibble(
      letterType = c("source", "target"), accuracy = c(row$mean_source, row$mean_target), se = c(row$se_source, row$se_target)
    )

    manual_p <- tibble(
      group1 = "source", group2 = "target",
      p = round(row$p_value, 3)
    )

    p_i <- ggbarplot(
      df_plot,
      x = "letterType",
      y = "accuracy",
      color = "letterType",
      fill = "letterType",
      palette = c("#00AFBB", "#E7B800"), #
      position = position_dodge(0.8),
      alpha = 0.2,
      size = 0.8,
      width = 0.6,
    ) +
      geom_errorbar(
        aes(ymin = accuracy - se, ymax = accuracy + se),
        width = 0.2,
        position = position_dodge(0.8)
      ) +
      # Add horizontal line for chance level
      geom_hline(
        yintercept = 1 / 9,
        linetype = "dashed",
        color = "red",
        linewidth = 1
      ) +
      # Add chance level annotation
      annotate(
        "text",
        x = 1.5,
        y = 1 / 9 + 0.02,
        label = paste0("Chance level = ", round(1 / 9, 3)),
        color = "red",
        size = 3.5
      ) +
      # Add statistical comparison
      stat_pvalue_manual(
        manual_p,
        label = "p = {p}",
        tip.length = -0.01,
        y.position = max(df_plot$accuracy, na.rm = TRUE) - 0.2
      ) +
      # Customize appearance
      labs(
        # title = "Accuracy in source vs target task",
        # subtitle = paste0("n = ", desc_stats$n[1], " participants"),
        x = data$treatment[[i]],
        y = "Accuracy",
        caption = "Error bars = s.e. of the mean on each side"
      ) +
      theme_pubr() +
      theme(
        legend.position = "none",
        plot.title = element_text(hjust = 0.5),
        plot.subtitle = element_text(hjust = 0.5)
      ) +
      scale_y_continuous(
        limits = c(0, 1),
        breaks = seq(0, 1, 0.1),
        labels = scales::percent_format(accuracy = 1)
      )
    plots[[i]] <- p_i
  }
  # arrange side-by-side (will handle 1 or 2 rows automatically)
  ncol <- min(2, length(plots))
  combined <- ggpubr::ggarrange(plotlist = plots, ncol = ncol, nrow = ceiling(length(plots) / ncol))
  combined <- annotate_figure(combined, top = text_grob("Accuracy (participant level) in source vs target task depending on cognitive load", face = "bold", size = 14))
  return(combined)
}
barPlotAccuracySourceVsTarget <- makePlotAccuracySourceVsTarget(mean_accuracy_perParticipants)
barPlotAccuracySourceVsTarget

ggsave(
  filename = file.path(PATH_TO_DATA, "Figures_pilot3&4&5", "barPlotAccuracySourceVsTarget.pdf"),
  plot = barPlotAccuracySourceVsTarget, device = "pdf", width = 8, height = 5
)




makeScatterPlotAccuracyOnSpan <- function(data, acc) {
  plots <- list()

  for (i in acc) {
    ac <- i

    if (!ac %in% names(data)) {
      plots[[i]] <- ggplot() +
        labs(title = paste0("variable '", ac, "' not found"))
      next
    }

    if (ac == "accuracy_difference") { # accuracy_difference = source - target
      y_limit <- c(-1, 1)
      y_break <- seq(-1, 1, 0.2)
      cat(y_limit, "is y_limit \n")
    } else {
      y_limit <- c(0, 1)
      y_break <- seq(0, 1, 0.1)
      cat(y_limit, "is y_limit \n")
    }

    p <- ggscatter(
      data,
      x = "spanLength",
      y = ac,
      # color = "letterType",
      # fill = "letterType",
      # palette = c("#00AFBB", "#E7B800"),  # Easy = blue, Hard = yellow
      add = "reg.line",
      add.params = list(color = "blue"),
      alpha = 0
    ) +
      geom_count(aes(x = spanLength, y = .data[[ac]]),
        colour = "black", fill = "#2c7fb8",
        show.legend = FALSE, alpha = 0.75
      ) +
      scale_size_area(max_size = 10) +
      # Add horizontal line
      geom_hline(
        yintercept = 0,
        linetype = "solid",
        color = "black",
        linewidth = 0.5
      ) +
      # Customize appearance
      labs(
        # title = "Accuracy depending on maxSpan",
        # subtitle = paste0("n = ", desc_stats$n[1], " participants"),
        x = "maximum span achieved at calibration",
        y = ac
      ) +
      theme_pubr() +
      theme(
        legend.position = "none",
        plot.title = element_text(hjust = 0.5),
        plot.subtitle = element_text(hjust = 0.5)
      ) +
      scale_y_continuous(
        limits = y_limit,
        breaks = y_break,
        labels = scales::percent_format(accuracy = 1)
      )
    plots[[i]] <- p
  }
  combined <- ggpubr::ggarrange(plotlist = plots, ncol = length(plots), nrow = 1)
  combined <- annotate_figure(combined, top = text_grob("Accuracies on maximum span achieved", face = "bold", size = 14)) # ))color = "red",
  return(combined)
}
scatterAccuracyOnSpan <- makeScatterPlotAccuracyOnSpan(mean_accuracy_perParticipants, c("accuracy_source", "accuracy_target", "accuracy_difference"))
scatterAccuracyOnSpan


ggsave(
  filename = file.path(PATH_TO_DATA, "Figures_pilot3&4&5", "scatterAccuracyOnSpan.pdf"),
  plot = scatterAccuracyOnSpan, device = "pdf", width = 12, height = 8
)


makeScatterRTOnCogLoad <- function(data) {
  plotFunction <- function(acc, rt) {
    p <- ggplot(
      data, aes(x = .data[[rt]], y = .data[[acc]], fill = treatment, alpha = 0.9)
    ) +
      geom_point(shape = 21, colour = "black", size = 3, stroke = 0.5) + # , position = position_jitter(width = 0.1, height = 0)
      geom_smooth(method = "lm", se = FALSE, colour = "blue", na.rm = TRUE) +
      scale_fill_manual(values = c("control" = "#00AFBB", "cognitive load" = "#E7B800"), na.value = "grey70") +
      # Customize appearance
      labs(
        # title = "accuracy on rt",
        # subtitle = paste0("n = ", desc_stats$n[1], " participants"),
        x = rt,
        y = acc,
        # caption = "Error bars = s.e. of the mean on each side"
      ) +
      theme_pubr() +
      theme(
        legend.position = "none",
        plot.title = element_text(hjust = 0.5),
        plot.subtitle = element_text(hjust = 0.5)
      ) +
      scale_y_continuous(
        limits = c(0, 1),
        breaks = seq(0, 1, 0.2),
        labels = scales::percent_format(accuracy = 1)
      )
  }

  accuracy_names <- c("accuracy_target", "accuracy_source")
  rt_names <- c("rt_r_source", "rt_target")
  plots <- vector("list", length(accuracy_names) * length(rt_names))
  counter <- 1
  for (acc in accuracy_names) {
    for (rt in rt_names) {
      plots[[counter]] <- plotFunction(acc, rt)
      counter <- counter + 1
    }
  }

  combined <- ggpubr::ggarrange(plotlist = plots, ncol = 3, nrow = 2)
  combined <- annotate_figure(combined, top = text_grob("Accuracies on RT. Red=cogload", face = "bold", size = 14))
}
scatterRTOnCogLoad <- makeScatterRTOnCogLoad(mean_accuracy_perParticipants)
scatterRTOnCogLoad
ggsave(
  filename = file.path(PATH_TO_DATA, "Figures_pilot3&4&5", "scatterRTOnCogLoad.pdf"),
  plot = scatterRTOnCogLoad, device = "pdf", width = 12, height = 6
)


mean_accuracy_perParticipants_withMPL <- final_data_2 %>% # per participant to compute easily s.e. and p-values
  filter(((block == "spanSpan" & letterType == 1) | block == "span_mpl") & task == "spanTest") %>%
  group_by(subject, treatment, block) %>%
  summarise(
    mean_accuracy_pp = mean(accuracy, na.rm = TRUE),
    spanLength = unique(spanLength)[[1]],
    rt_r = mean(rt),
    .groups = "drop"
  ) %>%
  mutate(
    treatment = dplyr::recode(treatment, `easy` = "control", `hard` = "cognitive load")
  ) %>%
  # group_by(treatment)%>%
  pivot_wider(
    names_from = block,
    values_from = c(mean_accuracy_pp, rt_r),
    names_glue = "{.value}_{block}"
  ) %>%
  ungroup() %>%
  rename(
    accuracy_span_mpl = mean_accuracy_pp_span_mpl,
    accuracy_span_span = mean_accuracy_pp_spanSpan,
  ) %>%
  rowwise() %>%
  mutate(
    accuracy_difference = accuracy_span_mpl - accuracy_span_span, # should be positive because the MPL take less cognitive capacities
    rt_difference = rt_r_span_mpl - rt_r_spanSpan
  ) %>%
  ungroup()
mean_accuracy_perParticipants_withMPL

accuraciesWithMplPerParticipants <- mean_accuracy_perParticipants_withMPL %>%
  group_by(treatment) %>%
  summarise(
    n = sum(!is.na(accuracy_span_span) & !is.na(accuracy_span_mpl)),
    mean_span_mpl = mean(accuracy_span_mpl, na.rm = TRUE),
    se_span_mpl = sd(accuracy_span_mpl) / sqrt(n),
    mean_span_span = mean(accuracy_span_span, na.rm = TRUE),
    se_span_span = sd(accuracy_span_span) / sqrt(n),
    p_value = ifelse(n >= 2, t.test(accuracy_span_span, accuracy_span_mpl, paired = TRUE)$p.value),
    .groups = "drop"
  )
accuraciesWithMplPerParticipants

makePlotAccuracySourceSpanVsMpl <- function(data) {
  data <- data %>%
    group_by(treatment) %>%
    summarise(
      n = sum(!is.na(accuracy_span_span) & !is.na(accuracy_span_mpl)),
      mean_span_mpl = mean(accuracy_span_mpl, na.rm = TRUE),
      se_span_mpl = sd(accuracy_span_mpl) / sqrt(n),
      mean_span_span = mean(accuracy_span_span, na.rm = TRUE),
      se_span_span = sd(accuracy_span_span) / sqrt(n),
      p_value = ifelse(n >= 2, t.test(accuracy_span_span, accuracy_span_mpl, paired = TRUE)$p.value),
      .groups = "drop"
    )

  plots <- list()

  for (i in 1:nrow(data)) {
    row <- data[i, ]

    df_plot <- tibble::tibble(
      block = c("span_mpl", "span_span"), accuracy = c(row$mean_span_mpl, row$mean_span_span), se = c(row$se_span_mpl, row$se_span_span)
    )

    manual_p <- tibble(
      group1 = "span_mpl", group2 = "span_span",
      p = round(row$p_value, 3)
    )

    p_i <- ggbarplot(
      df_plot,
      x = "block",
      y = "accuracy",
      color = "block",
      fill = "block",
      palette = c("#00AFBB", "#E7B800"), #
      position = position_dodge(0.8),
      alpha = 0.2,
      size = 0.8,
      width = 0.6,
    ) +
      geom_errorbar(
        aes(ymin = accuracy - se, ymax = accuracy + se),
        width = 0.2,
        position = position_dodge(0.8)
      ) +
      # Add horizontal line for chance level
      geom_hline(
        yintercept = 1 / 9,
        linetype = "dashed",
        color = "red",
        linewidth = 1
      ) +
      # Add chance level annotation
      annotate(
        "text",
        x = 1.5,
        y = 1 / 9 + 0.02,
        label = paste0("Chance level = ", round(1 / 9, 3)),
        color = "red",
        size = 3.5
      ) +
      # Add statistical comparison
      stat_pvalue_manual(
        manual_p,
        label = "p = {p}",
        tip.length = -0.01,
        y.position = max(df_plot$accuracy, na.rm = TRUE) - 0.2
      ) +
      # Customize appearance
      labs(
        # title = "Accuracy in source task, span_mpl vs span_span",
        # subtitle = paste0("n = ", desc_stats$n[1], " participants"),
        x = data$treatment[[i]],
        y = "Accuracy",
        caption = "Error bars = s.e. of the mean on each side"
      ) +
      theme_pubr() +
      theme(
        legend.position = "none",
        plot.title = element_text(hjust = 0.5),
        plot.subtitle = element_text(hjust = 0.5)
      ) +
      scale_y_continuous(
        limits = c(0, 1),
        breaks = seq(0, 1, 0.1),
        labels = scales::percent_format(accuracy = 1)
      )
    plots[[i]] <- p_i
  }
  # arrange side-by-side (will handle 1 or 2 rows automatically)
  ncol <- min(2, length(plots))
  combined <- ggpubr::ggarrange(plotlist = plots, ncol = ncol, nrow = ceiling(length(plots) / ncol))
  combined <- annotate_figure(combined, top = text_grob("Accuracy (participant level) on source task in choices vs span on span", face = "bold", size = 14))
  return(combined)
}

plotAccuracySourceSpanVsMpl <- makePlotAccuracySourceSpanVsMpl(mean_accuracy_perParticipants_withMPL)
plotAccuracySourceSpanVsMpl
ggsave(
  filename = file.path(PATH_TO_DATA, "Figures_pilot3&4&5", "plotAccuracySourceSpanVsMpl.pdf"),
  plot = plotAccuracySourceSpanVsMpl, device = "pdf", width = 12, height = 6
)




# see if people in cognitive load take more time to memorize their source span (rt_m_source)
# dataRtMSourcePerTreatment <- mean_accuracy_perParticipants %>%
#   group_by(treatment) %>%
#   summarise(
#     n = n(),
#     mean_rt_m_source = mean(rt_m_source),
#     median_rt_m_source = median(rt_m_source),
#     sd_rt_m_source = sd(rt_m_source),
#     se_rt_m_source = sd(rt_m_source)/sqrt(n())
#   ) %>%
#   ungroup()
# dataRtMSourcePerTreatment


# makeRtMSourcePerTreatment <- function(data){

# p <- ggbarplot(
#   data,
#   x = "treatment",
#   y = "median_rt_m_source",
#   color = "treatment",
#   fill = "treatment",
#   palette = c("#00AFBB", "#E7B800"),
#   position = position_dodge(0.8),
#   alpha = 0.2,
#   size = 0.8,
#   width = 0.6,
# ) +
#   geom_errorbar(
#     aes(ymin = median_rt_m_source - se_rt_m_source, ymax = median_rt_m_source + se_rt_m_source),
#     width = 0.2,
#     position = position_dodge(0.8)
#   ) +
# Add statistical comparison
# stat_pvalue_manual(
#  manual_p,
# label = "p = {p}",
#  tip.length = -0.01,
#  y.position = max(df_plot$accuracy, na.rm = TRUE) - 0.2
# ) +
# Customize appearance
# labs(
#   #title = "",
#   #subtitle = paste0("n = ", desc_stats$n[1], " participants"),
#   x = "treatment",
#   y = "median time for memorizing the source span (ms)",
#   caption = "Error bars = s.e. of the mean on each side"
# ) +
# theme_pubr() +
# theme(
#   legend.position = "none",
#   plot.title = element_text(hjust = 0.5),
#   plot.subtitle = element_text(hjust = 0.5)
# ) #+
# scale_y_continuous(
# limits = c(0, 1),
# breaks = seq(0, 1, 0.1),
# labels = scales::percent_format(accuracy = 1)
# )
# }
# rtMSourcePerTreatment <-makeRtMSourcePerTreatment(dataRtMSourcePerTreatment)
# rtMSourcePerTreatment
# ggsave(filename = file.path(PATH_TO_DATA, "Figures", "rtMSourcePerTreatment.pdf"),
#       plot = rtMSourcePerTreatment, device = "pdf", width = 12, height = 6)
# makeRtMSourcePerTreatment <- function(data){

# p <- ggbarplot(
#   data,
#   x = "treatment",
#   y = "mean_rt_m_source",
#   color = "treatment",
#   fill = "treatment",
#   palette = c("#00AFBB", "#E7B800"),
#   position = position_dodge(0.8),
#   alpha = 0.2,
#   size = 0.8,
#   width = 0.6,
# ) +
#   geom_errorbar(
#     aes(ymin = mean_rt_m_source - se_rt_m_source, ymax = mean_rt_m_source + se_rt_m_source),
#     width = 0.2,
#     position = position_dodge(0.8)
#   ) +
# Add statistical comparison
# stat_pvalue_manual(
#  manual_p,
# label = "p = {p}",
#  tip.length = -0.01,
#  y.position = max(df_plot$accuracy, na.rm = TRUE) - 0.2
# ) +
# Customize appearance
# labs(
#   #title = "",
#   #subtitle = paste0("n = ", desc_stats$n[1], " participants"),
#   x = "treatment",
#   y = "mean time for memorizing the source span (ms)",
#   caption = "Error bars = s.e. of the mean on each side"
# ) +
# theme_pubr() +
# theme(
#   legend.position = "none",
#   plot.title = element_text(hjust = 0.5),
#   plot.subtitle = element_text(hjust = 0.5)
# ) #+
# scale_y_continuous(
# limits = c(0, 1),
# breaks = seq(0, 1, 0.1),
# labels = scales::percent_format(accuracy = 1)
# )
# }
# rtMSourcePerTreatment <-makeRtMSourcePerTreatment(dataRtMSourcePerTreatment)
# rtMSourcePerTreatment
# ggsave(filename = file.path(PATH_TO_DATA, "Figures", "rtMSourcePerTreatment.pdf"),
#       plot = rtMSourcePerTreatment, device = "pdf", width = 12, height = 6)



data_plot_precision_cogload <- final_data_2 %>%
  filter(
    block == "spanSpan" & task == "spanTest" & letterType == 2
  ) %>%
  group_by(subject, treatment) %>%
  summarise(
    accuracy_mean_participant = mean(accuracy, na.rm = TRUE),
    # condition = c("Hard", "Easy")
  ) %>%
  ungroup() %>%
  mutate(
    difference = t.test(accuracy_mean_participant ~ treatment, data = .)[["p.value"]]
  ) %>%
  group_by(treatment) %>%
  summarise(
    n = n(),
    accuracy = mean(accuracy_mean_participant),
    se = sd(accuracy_mean_participant) / sqrt(n),
    p.value = difference[[1]]
  ) %>%
  ungroup()

data_plot_precision_cogload


# comparison cogload vs control on target task (span)
makeBarPlotCogLoadAccuracy <- function(data) {
  manual_p <- tibble(
    group1 = "easy", group2 = "hard",
    p = round(data$p.value[[1]], 3)
  )

  plot <- ggbarplot(
    data,
    x = "treatment",
    y = "accuracy",
    color = "treatment",
    fill = "treatment",
    palette = c("#00AFBB", "#E7B800"), # Easy = blue, Hard = yellow
    position = position_dodge(0.8),
    alpha = 0.2,
    size = 0.8,
    width = 0.6,
  ) +
    geom_errorbar(
      aes(ymin = accuracy - se, ymax = accuracy + se),
      width = 0.2,
      position = position_dodge(0.8)
    ) +
    # Add horizontal line for chance level
    geom_hline(
      yintercept = 1 / 9,
      linetype = "dashed",
      color = "red",
      linewidth = 1
    ) +
    # Add chance level annotation
    annotate(
      "text",
      x = 1.5,
      y = 1 / 9 + 0.02,
      label = paste0("Chance level = ", round(1 / 9, 3)),
      color = "red",
      size = 3.5
    ) +
    # Add statistical comparison
    stat_pvalue_manual(
      manual_p,
      label = "p = {p}",
      tip.length = -0.01,
      y.position = max(data$accuracy, na.rm = TRUE) - 0.2
    ) +
    # Customize appearance
    labs(
      # title = "Accuracy (pooled target and source tasks): cogload vs baseline treatment",
      # subtitle = paste0("n = ", desc_stats$n[1], " participants"),
      x = "Block Difficulty",
      y = "Accuracy",
      caption = "Error bars represent s.e. of the mean\nRed dashed line shows theoretical chance level"
    ) +
    theme_pubr() +
    theme(
      legend.position = "none",
      plot.title = element_text(hjust = 0.5),
      plot.subtitle = element_text(hjust = 0.5)
    ) +
    scale_y_continuous(
      limits = c(0, 1),
      breaks = seq(0, 1, 0.1),
      labels = scales::percent_format(accuracy = 1)
    )
  plot <- annotate_figure(plot, top = text_grob("Accuracy target task (span): cogload vs baseline treatment", face = "bold", size = 14))
  return(plot)
}

barPlotCogLoadAccuracy <- makeBarPlotCogLoadAccuracy(data_plot_precision_cogload)
barPlotCogLoadAccuracy
ggsave(
  filename = file.path(PATH_TO_DATA, "Figures_pilot3&4&5", "barPlotCogLoadAccuracy.pdf"),
  plot = barPlotCogLoadAccuracy, device = "pdf", width = 6, height = 5
)


# analysis of the RT of choice on accuracy
makeScatterRTOnAccuracy <- function(data) {
  plots <- list()

  makeDataForPlotFunction <- function(df, treatment_filter = NULL) { # REMOVE THE TRAINING ONES (TABLES TO SELECT AND EXAMPLE)

    newDf <- df %>%
      filter(!is.na(mplType) & !grepl("^(GS|AS|LS)", mplType)) %>% # starts_with doesn't work in filter, only for select
      {
        if (!is.null(treatment_filter)) filter(., treatment == treatment_filter) else .
      } %>%
      select(participant_id, mirror_rtChoice, lottery_rtChoice, mirror_rtSpanMpl, lottery_rtSpanMpl, mirror_accuracy, lottery_accuracy) %>%
      # Pivot RTs only
      pivot_longer(
        cols = matches("_rt"),
        names_to = c("condition", "rtType"),
        names_pattern = "(mirror|lottery)_rt(.*)",
        values_to = "rt"
      ) %>%
      # Pivot accuracy only
      pivot_longer(
        cols = ends_with("accuracy"),
        names_to = "condition_acc",
        names_pattern = "(mirror|lottery)_accuracy",
        values_to = "accuracy"
      ) %>%
      # Keep matching accuracy per condition
      filter(condition == condition_acc) %>%
      select(-condition_acc)
  }

  plotFunctionRT <- function(df, ii) {
    title_string <- {
      if (is.null(treatment_wanted) & ii == "Choice") {
        paste0("accuracy on RT memorization/choice")
      } else if (is.null(treatment_wanted) & ii == "SpanMpl") {
        paste0("accuracy on RT restitution")
      } else if (ii == "Choice" & treatment_wanted == "hard") {
        paste0("accuracy on RT memorization/choice, cognitive load")
      } else if (ii == "SpanMpl" & treatment_wanted == "hard") {
        paste0("accuracy on RT restitution, cognitive load")
      } else if (ii == "SpanMpl" & treatment_wanted == "easy") {
        paste0("accuracy on RT restitution, control")
      } else if (ii == "Choice" & treatment_wanted == "easy") {
        paste0("accuracy on RT memorization/choice, control")
      }
    }
    cat("title_string", title_string, " with treatment_wanted =", treatment_wanted, " and ii = ", ii, "\n")
    dfB <- df %>%
      filter(rtType == ii)
    cat("colnames(dfB) inside plotFunctionRT is", colnames(dfB), "\n")
    cat("nrow(dfB) inside plotFunctionRT is", nrow(dfB), "\n")
    cat("rt is", ii, "\n")
    p <- ggscatter(
      dfB,
      x = "rt",
      y = "accuracy",
      # color = "letterType",
      # fill = "letterType",
      add = "reg.line",
      add.params = list(color = "blue"),
    ) +
      # Customize appearance
      labs(
        title = title_string,
        # subtitle = paste0("n = ", desc_stats$n[1], " participants"),
        x = paste0("reaction time"),
        y = "accuracy",
        # caption = "Error bars = s.e. of the mean on each side"
      ) +
      theme_pubr() +
      theme(
        legend.position = "none",
        plot.title = element_text(hjust = 0.5),
        plot.subtitle = element_text(hjust = 0.5)
      ) +
      scale_y_continuous(
        limits = c(0, 1),
        breaks = seq(0, 1, 0.2),
        labels = scales::percent_format(accuracy = 1)
      )
  }

  accuracy_names <- c("accuracy")
  treatments_wanted <- list(NULL, "hard", "easy")
  plots <- list()
  counter <- 1
  for (treatment_wanted in treatments_wanted) {
    tidy_data <- makeDataForPlotFunction(data, treatment_wanted)
    cat("tidy_data is created with treatment", treatment_wanted, "\n")
    rt_names <- unique(tidy_data$rtType)
    for (acc in accuracy_names) {
      for (rt_name in rt_names) {
        plots[[counter]] <- plotFunctionRT(tidy_data, rt_name)
        counter <- counter + 1
      }
    }
  }

  combined <- ggpubr::ggarrange(plotlist = plots, ncol = 2, nrow = 3)
  combined <- annotate_figure(combined, top = text_grob("Accuracy on RT with MPL as target", face = "bold", size = 14))
}
scatterRTOnAccuracy <- makeScatterRTOnAccuracy(dfA)
scatterRTOnAccuracy
ggsave(
  filename = file.path(PATH_TO_DATA, "Figures_pilot3&4&5", "scatterRTOnAccuracy.pdf"),
  plot = scatterRTOnAccuracy, device = "pdf", width = 12, height = 10
)









# Choices analysis



# empirical EV of the MPL
empiricalEVMpls <- dfA %>%
  pull(mirror_EGEmpirical, lottery_EGEmpirical) %>%
  mean(., na.rm = TRUE)
empiricalEVMpls # 18.08181 # this is flawed because some inversions were not counted as NA !

accuraciesMpls <- dfA %>%
  pull(mirror_accuracy, lottery_accuracy) %>%
  mean(., na.rm = TRUE)
accuraciesMpls # 0.786255




# are inversions of switching patterns influenced by training or cognitive load?
invSubject <- final_data_2 %>%
  filter(block == "span_mpl") %>%
  # removes the training mpl ERROR in my code: I count in mplCounter the tables that train to selecet cells, but not the one of the complete example...
  # I prefer not to use mplCounter thus because I will likely modify it later
  group_by(subject) %>%
  summarise(
    inversionCount = sum(switchInversion, na.rm = TRUE), # look at why I need to put na.rm now but not in data_analysis_span_mpl_1.r
    inversionShare = mean(switchInversion, na.rm = TRUE)
  )
invSubject

invTable <- final_data_2 %>%
  filter(block == "span_mpl") %>%
  group_by(mplType) %>%
  summarise(
    inversionCount = sum(switchInversion, na.rm = TRUE),
    inversionShare = mean(switchInversion, na.rm = TRUE) # /final_data_2%>%filter((block=="span_mpl") & (mplType == final_data_2$mplType[[1]]) & (task == "mpl"))%>% nrow(.)
  )
invTable

invTreatment <- final_data_2 %>%
  filter(block == "span_mpl") %>%
  group_by(treatment) %>%
  summarise(
    n = length(unique(participant_id)),
    inversionCount = sum(switchInversion, na.rm = TRUE),
    inversionShare = mean(switchInversion, na.rm = TRUE)
  )
invTreatment

makeInversionPlots <- function(invSubject, invTable, invTreatment) {
  # compute common y limit
  max_count <- max(c(invSubject$inversionCount, invTable$inversionCount, invTreatment$inversionCount), na.rm = TRUE)
  y_max <- ifelse(is.finite(max_count), ceiling(max_count * 1.1), 1)
  y_lim <- c(0, y_max)

  p_subj <- ggplot(invSubject, aes(x = factor(subject), y = inversionCount)) +
    geom_col(fill = "#2c7fb8") +
    labs(title = "Inversions per subject", x = "Subject", y = "Inversion count") +
    theme_pubr() +
    theme(axis.text.x = element_blank()) +
    scale_y_continuous(limits = c(0, max(invSubject$inversionCount) * 1.1), expand = c(0, 0))

  p_table <- ggplot(invTable, aes(x = factor(mplType), y = inversionCount)) +
    geom_col(fill = "#E7B800") +
    labs(title = "Inversions per MPL type", x = "MPL type", y = "Inversion count") +
    theme_pubr() +
    theme(axis.text.x = element_text(angle = 45, hjust = 1)) +
    scale_y_continuous(limits = c(0, max(invTable$inversionCount) * 1.1), expand = c(0, 0))

  p_treat <- ggplot(invTreatment, aes(x = factor(treatment), y = inversionCount)) +
    geom_col(fill = "#4CAF50") +
    labs(title = "Inversions by treatment", x = "Treatment", y = "Inversion count") +
    theme_pubr() +
    theme(axis.text.x = element_text(angle = 0, vjust = 0.5)) +
    scale_y_continuous(limits = c(0, max(invTreatment$inversionCount) * 1.1), expand = c(0, 0))

  combined <- ggpubr::ggarrange(p_subj, p_table, p_treat, ncol = 1, nrow = 3, heights = c(1, 1, 0.7))

  return(combined)
}
makeInversionPlotPercentage <- function(invSubject, invTable, invTreatment) {
  # compute common y limit
  max_count <- max(c(invSubject$inversionShare, invTable$inversionShare, invTreatment$inversionShare), na.rm = TRUE)
  y_max <- ifelse(is.finite(max_count), ceiling(max_count * 1.1), 1)
  y_lim <- c(0, y_max)

  p_subj <- ggplot(invSubject, aes(x = factor(subject), y = inversionShare)) +
    geom_col(fill = "#2c7fb8") +
    labs(title = "Inversions per subject", x = "Subject", y = "Inversion share") +
    theme_pubr() +
    theme(axis.text.x = element_blank()) +
    scale_y_continuous(limits = c(0, 1), expand = c(0, 0))

  p_table <- ggplot(invTable, aes(x = factor(mplType), y = inversionShare)) +
    geom_col(fill = "#E7B800") +
    labs(title = "Inversions per MPL type", x = "MPL type", y = "Inversion share") +
    theme_pubr() +
    theme(axis.text.x = element_text(angle = 45, hjust = 1)) +
    scale_y_continuous(limits = c(0, 1), expand = c(0, 0))

  p_treat <- ggplot(invTreatment, aes(x = factor(treatment), y = inversionShare)) +
    geom_col(fill = "#4CAF50") +
    labs(title = "Inversions by treatment", x = "Treatment", y = "Inversion share") +
    theme_pubr() +
    theme(axis.text.x = element_text(angle = 0, vjust = 0.5)) +
    scale_y_continuous(limits = c(0, 1), expand = c(0, 0))

  combined <- ggpubr::ggarrange(p_subj, p_table, p_treat, ncol = 1, nrow = 3, heights = c(1, 1, 0.7))

  return(combined)
}
# Example call (after invSubject, invTable, invTreatment exist)
invPlot <- makeInversionPlots(invSubject, invTable, invTreatment)
print(invPlot)
pdf(file.path(PATH_TO_DATA, "Figures_pilot3&4&5/inversionPlot.pdf"), width = 7.41, height = 8.31)
makeInversionPlots(invSubject, invTable, invTreatment)
dev.off()
makeInversionPlotPercentage(invSubject, invTable, invTreatment)

pdf(file.path(PATH_TO_DATA, "Figures_pilot3&4&5/inversionPlotShare.pdf"), width = 7.41, height = 8.31)
makeInversionPlotPercentage(invSubject, invTable, invTreatment)
dev.off()

choiceInversionRatio <- sum(final_data_2$switchInversion, na.rm = TRUE) / (length(unique(final_data_2$subject)) * 32) # number of inversion divided by number of choices
choiceInversionRatio # 6,1%
noSwitchRatio <- sum(final_data$noSwitchCounter, na.rm = TRUE) / (length(unique(final_data$participant_id)) * 32) # number of inversion divided by number of choices
noSwitchRatio # 36,3%

# merged table: remove an "S" immediately after the first letter, then sum
noSwitchTable <- dfA %>%
  mutate(mpl_base = sub("^([A-Z])S", "\\1", mplType)) %>% # GS25 -> G25 ; AS10 -> A10 ; LS90 -> L90
  group_by(mpl_base) %>%
  summarise(
    noSwitchCount = sum(mirror_noSwitch, na.rm = TRUE) + sum(lottery_noSwitch, na.rm = TRUE),
    noSwitchShare = mean(c_across(c(mirror_noSwitch, lottery_noSwitch)), na.rm = TRUE), # inside summarise columns are already vectors
    noSwitchCountSure = sum(mirror_noSwitchSure, na.rm = TRUE) + sum(lottery_noSwitchSure, na.rm = TRUE),
    noSwitchShareSure = mean(c_across(c(mirror_noSwitchSure, lottery_noSwitchSure)), na.rm = TRUE),
    noSwitchCountLottery = sum(mirror_noSwitchLottery, na.rm = TRUE) + sum(lottery_noSwitchLottery, na.rm = TRUE),
    noSwitchShareLottery = mean(c_across(c(mirror_noSwitchLottery, lottery_noSwitchLottery)), na.rm = TRUE),
  ) %>%
  ungroup() %>%
  rename(mplType = mpl_base) %>%
  arrange(mplType)
noSwitchTable


noSwitchSubject <- dfA %>%
  group_by(participant_id) %>%
  summarise(
    noSwitchCount = sum(mirror_noSwitch, na.rm = TRUE) + sum(lottery_noSwitch, na.rm = TRUE),
    noSwitchShare = mean(c_across(c(mirror_noSwitch, lottery_noSwitch)), na.rm = TRUE),
    noSwitchCountSure = sum(mirror_noSwitchSure, na.rm = TRUE) + sum(lottery_noSwitchSure, na.rm = TRUE),
    noSwitchShareSure = mean(c_across(c(mirror_noSwitchSure, lottery_noSwitchSure)), na.rm = TRUE),
    noSwitchCountLottery = sum(mirror_noSwitchLottery, na.rm = TRUE) + sum(lottery_noSwitchLottery, na.rm = TRUE),
    noSwitchShareLottery = mean(c_across(c(mirror_noSwitchLottery, lottery_noSwitchLottery)), na.rm = TRUE),
    treatment = unique(treatment)[[1]]
  )
noSwitchSubject

noSwitchStatus <- tibble::tibble(
  status = c("mirror", "lottery"),
  noSwitchCount = c(sum(dfA$mirror_noSwitch, na.rm = TRUE), sum(dfA$lottery_noSwitch, na.rm = TRUE)),
  noSwitchShare = c(mean(dfA$mirror_noSwitch, na.rm = TRUE), mean(dfA$lottery_noSwitch, na.rm = TRUE)),
  noSwitchCountSure = c(sum(dfA$mirror_noSwitchSure, na.rm = TRUE), sum(dfA$lottery_noSwitchSure, na.rm = TRUE)),
  noSwitchShareSure = c(mean(dfA$mirror_noSwitchSure, na.rm = TRUE), mean(dfA$lottery_noSwitchSure, na.rm = TRUE)),
  noSwitchCountLottery = c(sum(dfA$mirror_noSwitchLottery, na.rm = TRUE), sum(dfA$lottery_noSwitchLottery, na.rm = TRUE)),
  noSwitchShareLottery = c(mean(dfA$mirror_noSwitchLottery, na.rm = TRUE), mean(dfA$lottery_noSwitchLottery, na.rm = TRUE))
)
noSwitchStatus

noSwitchTreatment <- dfA %>%
  group_by(treatment) %>%
  summarise(
    n = length(unique(participant_id)),
    noSwitchCount = sum(mirror_noSwitch, na.rm = TRUE) + sum(lottery_noSwitch, na.rm = TRUE),
    noSwitchShare = mean(c_across(c(mirror_noSwitch, lottery_noSwitch)), na.rm = TRUE),
    noSwitchCountSure = sum(mirror_noSwitchSure, na.rm = TRUE) + sum(lottery_noSwitchSure, na.rm = TRUE),
    noSwitchShareSure = mean(c_across(c(mirror_noSwitchSure, lottery_noSwitchSure)), na.rm = TRUE),
    noSwitchCountLottery = sum(mirror_noSwitchLottery, na.rm = TRUE) + sum(lottery_noSwitchLottery, na.rm = TRUE),
    noSwitchShareLottery = mean(c_across(c(mirror_noSwitchLottery, lottery_noSwitchLottery)), na.rm = TRUE),
  )
noSwitchTreatment


makeNoSwitchPanels <- function(noSwitchTable, noSwitchSubject, noSwitchStatus, noSwitchTreatment, valueType) {
  make_plot_two_layer <- function(df, x_col, xlab = "", value_type = c("count", "share")) {
    value_type <- match.arg(value_type)
    df2 <- df %>%
      mutate(
        x = as.character(.data[[x_col]]),
        proportion = noSwitchCountLottery / noSwitchCountSure
      ) %>%
      arrange(desc(proportion)) %>%
      mutate(x = factor(x, levels = unique(x)))

    if (value_type == "count") {
      df_long <- df2 %>%
        select(x, noSwitchCountSure, noSwitchCountLottery) %>%
        pivot_longer(
          cols = c(noSwitchCountSure, noSwitchCountLottery),
          names_to = "which",
          values_to = "value"
        ) %>%
        mutate(which = factor(which, levels = c("noSwitchCountSure", "noSwitchCountLottery")))
      fill_vals <- c("noSwitchCountSure" = "#0D47A1", "noSwitchCountLottery" = "#8B0000")
      ylab <- "No-switch count"
      scale_y <- scale_y_continuous(expand = c(0, 0))
    } else {
      df_long <- df2 %>%
        select(x, noSwitchShareSure, noSwitchShareLottery) %>%
        pivot_longer(
          cols = c(noSwitchShareSure, noSwitchShareLottery),
          names_to = "which",
          values_to = "value"
        ) %>%
        mutate(which = factor(which, levels = c("noSwitchShareSure", "noSwitchShareLottery")))
      fill_vals <- c("noSwitchShareSure" = "#0D47A1", "noSwitchShareLottery" = "#8B0000")
      ylab <- "No-switch share"
      scale_y <- scale_y_continuous(limits = c(0, 1), breaks = seq(0, 1, 0.2), labels = scales::percent_format(accuracy = 1), expand = c(0, 0))
    }

    p <- ggplot(df_long, aes(x = x, y = value, fill = which)) +
      geom_col(colour = "black", width = 0.7, position = "stack") +
      scale_fill_manual(
        values = fill_vals,
        labels = c(
          "noSwitchCountSure" = "Sure only", "noSwitchCountLottery" = "Lottery only",
          "noSwitchShareSure" = "Sure only", "noSwitchShareLottery" = "Lottery only"
        )
      ) +
      labs(x = xlab, y = ylab, fill = NULL) +
      theme_pubr() +
      theme(axis.text.x = element_text(angle = ifelse(nlevels(df2$x) > 10, 90, 45), hjust = 1))

    p <- p + scale_y
    return(p)
  }

  p1 <- make_plot_two_layer(noSwitchTable, "mplType", "MPL type", value_type = valueType)
  p2 <- make_plot_two_layer(noSwitchSubject, "participant_id", "Subject", value_type = valueType) + theme(axis.text.x = element_blank())
  p3 <- make_plot_two_layer(noSwitchStatus, "status", "Status", value_type = valueType)
  p4 <- make_plot_two_layer(noSwitchTreatment, "treatment", "Treatment", value_type = valueType)

  caption_html <- paste0(
    "Sure amounts selected : <span style='color:#0D47A1;font-weight:600;'>blue</span><br>",
    "Lotteries/mirrors selected : <span style='color:#8B0000;font-weight:600;'>red</span>"
  )
  if (valueType == "count") {
    title_string <- "noSwitch counts"
  } else if (valueType == "share") {
    title_string <- "noSwitch shares"
  }

  combined <- (p1) / (p2) / (p3 | p4) + plot_layout(heights = c(1, 1, 0.8)) + plot_annotation(
    title = title_string,
    caption = caption_html,
  ) & theme(
    plot.title = element_text(face = "bold", size = 16, hjust = 0.5),
    plot.caption = ggtext::element_markdown(size = 12, hjust = 0)
  )
  return(combined)
}
makeNoSwitchPanels(noSwitchTable, noSwitchSubject, noSwitchStatus, noSwitchTreatment, "count")
pdf(file.path(PATH_TO_DATA, "Figures_pilot3&4&5/noSwitchPanels.pdf"), width = 7.41, height = 8.31)
makeNoSwitchPanels(noSwitchTable, noSwitchSubject, noSwitchStatus, noSwitchTreatment, "count")
dev.off()

makeNoSwitchPanels(noSwitchTable, noSwitchSubject, noSwitchStatus, noSwitchTreatment, "share")
pdf(file.path(PATH_TO_DATA, "Figures_pilot3&4&5/noSwitchPanelsShares.pdf"), width = 7.41, height = 8.31)
makeNoSwitchPanels(noSwitchTable, noSwitchSubject, noSwitchStatus, noSwitchTreatment, "share")
dev.off()



pilot_lookup <- final_data %>%
  mutate(completionCount = completionCountLottery + completionCountMirror) %>%
  select(participant_id, pilotNumber, completionCount)

correlationsNoisines <- noSwitchSubject %>%
  right_join(
    invSubject %>% select(subject, inversionCount) %>%
      rename(participant_id = subject),
    by = "participant_id"
  ) %>%
  right_join(pilot_lookup,
    by = "participant_id"
  )
correlationsNoisines

makeScatterCorrelationNoisines <- function(data, noises = c("noSwitchCount", "inversionCount")) {
  plotFunction <- function(noise) {
    {
      p <- ggplot(
        data, aes(x = .data[["completionCount"]], y = .data[[noise]], fill = factor(pilotNumber))
      ) +
        geom_point(shape = 21, colour = "black", size = 3, stroke = 0.5, position = position_jitter(width = 0.1, height = 0), alpha = 0.7)
    } +
      scale_fill_manual(name = "Pilot number", values = c("3" = "#00AFBB", "4" = "#E7B800"), na.value = "grey70") +
      labs(x = "Failed comprehension pages", y = noise)
  }

  p1 <- plotFunction(noises[[1]])
  p2 <- plotFunction(noises[[2]])

  combined <- (p1) / (p2) + plot_layout(heights = c(1, 1, 0.8)) + plot_annotation(
    title = "Noisiness correlations with comprehension questions",
  ) & theme(
    plot.title = element_text(face = "bold", size = 14, hjust = 0.5),
    plot.caption = ggtext::element_markdown(size = 12, hjust = 0)
  )

  return(combined)
}
scatterCorrelationNoisines <- makeScatterCorrelationNoisines(correlationsNoisines)
print(scatterCorrelationNoisines)
ggsave(
  filename = file.path(PATH_TO_DATA, "Figures_pilot3&4&5", "scatterCorrelationNoisines.pdf"),
  plot = scatterCorrelationNoisines, device = "pdf", width = 8, height = 10
)



# rt choices analysis
makeDataForRTChoice <- function(df, treatment_filter = NULL) {
  newDf <- df %>%
    filter(!is.na(mplType) & !grepl("^(GS|AS|LS)", mplType)) %>% # starts_with doesn't work in filter, only for select
    {
      if (!is.null(treatment_filter)) filter(., treatment == treatment_filter) else .
    } %>% # REMOVE GO90/10 ?
    select(participant_id, mirror_rtChoice, lottery_rtChoice, mirror_rtSpanMpl, lottery_rtSpanMpl, mirror_accuracy, lottery_accuracy, treatment) %>%
    # Pivot RTs only
    pivot_longer(
      cols = matches("_rt"),
      names_to = c("condition", "rtType"),
      names_pattern = "(mirror|lottery)_rt(.*)",
      values_to = "rt"
    ) %>%
    # Pivot accuracy only
    pivot_longer(
      cols = ends_with("accuracy"),
      names_to = "condition_acc",
      names_pattern = "(mirror|lottery)_accuracy",
      values_to = "accuracy"
    ) %>%
    # Keep matching accuracy per condition
    filter(condition == condition_acc) %>%
    select(-condition_acc)
}
dataForRTChoice <- makeDataForRTChoice(dfA)
dataForRTChoice

# Create 4 density panels (hard/ easy × Choice / SpanMpl)
makeRTDensities <- function(data_for_rt) {
  df <- data_for_rt %>%
    mutate(
      treatment = factor(treatment, levels = c("hard", "easy")),
      rtType = factor(rtType, levels = c("Choice", "SpanMpl")),
      panel = paste(treatment, rtType, sep = " | ")
    ) %>%
    # keep only the four combinations (order ensured by factor levels)
    filter(treatment %in% c("hard", "easy") & rtType %in% c("Choice", "SpanMpl"))

  if (nrow(df) == 0) stop("No RT data available for plotting.")

  # compute summary + peak density for placing annotations
  dens_info <- df %>%
    group_by(treatment, rtType) %>%
    summarise(
      mean_rt = mean(rt, na.rm = TRUE),
      median_rt = median(rt, na.rm = TRUE),
      sd_rt = sd(rt, na.rm = TRUE),
      n = length(unique(participant_id)),
      max_dens = max(density(rt, na.rm = TRUE)$y),
      right_x = max(rt, na.rm = TRUE),
      .groups = "drop"
    ) %>%
    mutate(panel = paste(treatment, rtType, sep = " | "))

  # ensure panels appear in the requested order:
  panel_levels <- c("hard | Choice", "hard | SpanMpl", "easy | Choice", "easy | SpanMpl")
  df$panel <- factor(df$panel, levels = panel_levels)
  dens_info$panel <- factor(dens_info$panel, levels = panel_levels)

  p <- ggplot(df, aes(x = rt)) +
    geom_density(aes(y = ..density..), fill = "#2c7fb8", alpha = 0.45, colour = NA, adjust = 1) +
    # mean and ±1 sd lines (solid = mean, dashed = mean ± sd)
    geom_vline(data = dens_info, aes(xintercept = mean_rt), colour = "black", size = 0.6) +
    geom_vline(data = dens_info, aes(xintercept = mean_rt + sd_rt), linetype = "dashed", colour = "black", size = 0.4) +
    geom_vline(data = dens_info, aes(xintercept = mean_rt - sd_rt), linetype = "dashed", colour = "black", size = 0.4) +
    # annotation with n, mean and sd
    geom_text(
      data = dens_info,
      aes(
        x = Inf, y = Inf,
        label = paste0(
          "n=", n, "\nmean=", round(mean_rt, 1), " ms\nmedian=",
          round(median_rt, 1), "ms\nsd=", round(sd_rt, 1), " ms"
        )
      ),
      inherit.aes = FALSE,
      # linewidth = 3,
      hjust = 1,
      vjust = 1
    ) +
    facet_wrap(~panel, ncol = 2, scales = "free_x") +
    labs(
      x = "Reaction time (ms)", y = "Density",
      title = "RT densities by treatment and rtType\n(black solid = mean, dashed = ±1 sd)"
    ) +
    theme_minimal(base_size = 12) +
    theme(
      strip.text = element_text(face = "bold"),
      plot.title = element_text(hjust = 0.5),
      legend.position = "none"
    )
}
rtDensityPlot <- makeRTDensities(dataForRTChoice)
rtDensityPlot
print(rtDensityPlot)
ggsave(
  filename = file.path(PATH_TO_DATA, "Figures_pilot3&4&5", "rtDensityPlot.pdf"),
  plot = rtDensityPlot, device = "pdf", width = 12, height = 10
)

dataRTCalibrateChoice <- dataForRTChoice %>%
  filter(rtType == "Choice") %>%
  pull(rt)

mean(dataRTCalibrateChoice < 30000)









# MAIN : deviation from expected value plots
# isLottery : in case of order plotting, do we plot lotteries or mirrors ?
# lotteryFirst : have the subjects completed mirrors or lotteries first ?
mainPlot <- function(F, F_high, F_low, F_hard, F_easy, F_above, F_below, F_mirror, F_lottery, F_lotteryFirst_lottery, F_lotteryFirst_mirror, F_mirrorFirst_lottery, F_mirrorFirst_mirror,
                     lab = "TEST TITRE", ylim = c(-2, 2), position = 0, cogload = 0, median = 0, lotteryFirst = FALSE, isLottery = FALSE) {
  cex <- 1.7
  pt.cex <- 0.8
  offset <- 1

  colors <- if (position == 1 || cogload == 1 | median == 1) {
    list(
      lottery_high = "darkred", mirror_high = "lightcoral",
      lottery_low = "darkblue", mirror_low = "lightblue",
      lottery_hard = "darkred", mirror_hard = "lightcoral",
      lottery_easy = "darkblue", mirror_easy = "lightblue",
      lottery_above = "darkred", mirror_above = "lightcoral",
      lottery_below = "darkblue", mirror_below = "lightblue"
    )
  } else if (lotteryFirst == TRUE) {
    list(lotteryFirst = "gray", mirrorFirst = "white")
  } else {
    list(lottery = "gray", mirror = "white")
  }
  if (position == 1) {
    x <- F_high %>%
      filter(grepl("G", mplType)) %>%
      filter(prob != 50)
  } else if (cogload == 1) {
    x <- F_hard %>%
      filter(grepl("G", mplType)) %>%
      filter(prob != 50)
  } else if (median == 1) {
    x <- F_above %>%
      filter(grepl("G", mplType)) %>%
      filter(prob != 50)
  } else if (lotteryFirst == TRUE) {
    if (isLottery == TRUE) {
      x <- F_lotteryFirst_lottery %>%
        filter(grepl("G", mplType)) %>%
        filter(prob != 50)
    } else if (isLottery == FALSE) {
      x <- F_lotteryFirst_mirror %>%
        filter(grepl("G", mplType)) %>%
        filter(prob != 50)
    }
  } else {
    x <- F %>%
      filter(grepl("G", mplType)) %>%
      filter(prob != 50)
  }
  plot(x$prob - 0.5, x$lottery - x$pred, type = "n", xlim = c(0, 100), ylim = ylim, ylab = "Deviation from Expected Value", xlab = "Probability", yaxt = "n", bty = "n", xaxt = "n", main = lab) # type='n' to create an empty plot
  axis(1, at = seq(0, 100, 10), labels = seq(0, 1, 0.1))
  mtext("Risk/Loss Seeking", at = 1, side = 4, srt = 180)
  mtext("Risk/Loss Averse", at = -1, side = 4, srt = 180)

  # Legend
  if (position == 1) {
    legend("top",
      legend = c("Lottery High", "Mirror High", "Lottery Low", "Mirror Low"),
      col = c("black", "black", "black", "black"),
      pt.bg = c(colors$lottery_high, colors$mirror_high, colors$lottery_low, colors$mirror_low),
      pch = c(21, 21, 21, 21), lty = c(1, 1, 1, 1), cex = 0.9, pt.cex = 1.5, bg = NA, box.lwd = NA
    )
  } else if (cogload == 1) {
    legend("top",
      legend = c("Lottery Hard", "Mirror Hard", "Lottery Easy", "Mirror Easy"),
      col = c("black", "black", "black", "black"),
      pt.bg = c(colors$lottery_hard, colors$mirror_hard, colors$lottery_easy, colors$mirror_easy),
      pch = c(21, 21, 21, 21), lty = c(1, 1, 1, 1), cex = 0.9, pt.cex = 1.5, bg = NA, box.lwd = NA
    )
  } else if (median == 1) {
    legend("top",
      legend = c("Lottery Above", "Mirror Above", "Lottery Below", "Mirror Below"),
      col = c("black", "black", "black", "black"),
      pt.bg = c(colors$lottery_above, colors$mirror_above, colors$lottery_below, colors$mirror_below),
      pch = c(21, 21, 21, 21), lty = c(1, 1, 1, 1), cex = 0.9, pt.cex = 1.5, bg = NA, box.lwd = NA
    )
  } else if (lotteryFirst == TRUE) {
    legend("top",
      legend = c("Lottery first", "Mirror first"),
      col = c("black", "black"), pt.bg = c(colors$lotteryFirst, colors$mirrorFirst), pch = c(21, 21),
      lty = c(1, 1), cex = 0.9, pt.cex = 1.5, bg = NA, box.lwd = NA
    )
  } else {
    legend("top",
      legend = c("Lottery (Certainty Equivalents)", "Mirror (Simplicity Equivalents)"),
      col = c("black", "black"), pt.bg = c(colors$lottery, colors$mirror), pch = c(21, 21),
      lty = c(1, 1), cex = 0.9, pt.cex = 1.5, bg = NA, box.lwd = NA
    )
  }
  # original legend
  # legend("top",legend=c("Lottery (Certainty Equivalents)",'Mirror (Simplicity Equivalents)'),col=c('black','black'),pt.bg=c('gray','white'),pch=c(21,21),lty=c(1,1),cex=0.9,pt.cex=1.5,bg=NA,box.lwd=NA)

  major_ticks <- seq(-10, 10, 5) # original major ticks
  minor_ticks <- seq(-10, 10, 1) # additional ticks every 1 unit
  minor_ticks <- setdiff(minor_ticks, major_ticks) # avoid duplicating major ticks
  # draw minor ticks (no labels, shorter tick length)
  axis(2, at = minor_ticks, labels = FALSE, tcl = -0.25)
  # draw major ticks with labels (same as before)
  axis(2, at = major_ticks, labels = major_ticks)
  abline("h" = 0, lty = 1)

  # Helper function to plot points for a given dataset and position


  plot_points <- function(data, lottery_color, mirror_color, colorWhenLotteryFirstTrue, pch_type = 21, show_labels = TRUE) {
    if (nrow(data) == 0) {
      return()
    }

    if (lotteryFirst == FALSE) { # plot lotteries and mirrors
      # Lottery points
      y_val <- if (pch_type == 25) data$lottery else data$lottery - data$pred # because the values from A types are already calculated for the plot in dfA and final_data
      arrows(
        x0 = data$prob - 0.5, y0 = y_val - 2 * data$ceLotteryse,
        x1 = data$prob - 0.5, y1 = y_val + 2 * data$ceLotteryse,
        code = 3, angle = 90, length = 0.05, col = "black", lwd = 0.5
      )
      points(data$prob - 0.5, y_val, bg = lottery_color, col = "black", pch = pch_type, cex = cex)
      if (show_labels) {
        text(data$prob, y_val, pos = 2, labels = data$mplType, cex = pt.cex, col = "black", offset = offset)
      }

      # Mirror points
      y_val <- if (pch_type == 25) data$mirror else data$mirror - data$pred # because the values from A types are already calculated for the plot in dfA and final_data
      arrows(
        x0 = data$prob + 0.5, y0 = y_val - 2 * data$ceMirrorse,
        x1 = data$prob + 0.5, y1 = y_val + 2 * data$ceMirrorse,
        code = 3, angle = 90, length = 0.05, col = "black", lwd = 0.5, lty = 1
      )
      points(data$prob + 0.5, y_val, bg = mirror_color, col = "black", pch = pch_type, cex = cex)
      if (show_labels) {
        text(data$prob, y_val, pos = 4, labels = data$mplType, cex = pt.cex, col = "black", offset = offset)
      }
    } else if (lotteryFirst == TRUE) { # plot only lotteries or only mirrors
      if (isLottery == TRUE) { # plot only lotteries
        y_val <- if (pch_type == 25) data$lottery else data$lottery - data$pred # because the values from A types are already calculated for the plot in dfA and final_data
        arrows(
          x0 = data$prob - 0.5, y0 = y_val - 2 * data$ceLotteryse,
          x1 = data$prob - 0.5, y1 = y_val + 2 * data$ceLotteryse,
          code = 3, angle = 90, length = 0.05, col = "black", lwd = 0.5
        )
        points(data$prob - 0.5, y_val, bg = colorWhenLotteryFirstTrue, col = "black", pch = pch_type, cex = cex)
        if (show_labels) {
          text(data$prob, y_val, pos = 2, labels = data$mplType, cex = pt.cex, col = "black", offset = offset)
        }
      } else if (isLottery == FALSE) { # plot only mirrors
        y_val <- if (pch_type == 25) data$mirror else data$mirror - data$pred # because the values from A types are already calculated for the plot in dfA and final_data
        arrows(
          x0 = data$prob + 0.5, y0 = y_val - 2 * data$ceMirrorse,
          x1 = data$prob + 0.5, y1 = y_val + 2 * data$ceMirrorse,
          code = 3, angle = 90, length = 0.05, col = "black", lwd = 0.5, lty = 1
        )
        points(data$prob + 0.5, y_val, bg = colorWhenLotteryFirstTrue, col = "black", pch = pch_type, cex = cex)
        if (show_labels) {
          text(data$prob, y_val, pos = 4, labels = data$mplType, cex = pt.cex, col = "black", offset = offset)
        }
      }
    }
  }

  # Plot G types
  if (position == 1) {
    x_high <- F_high %>%
      filter(grepl("G", mplType)) %>%
      filter(prob != 50)
    x_low <- F_low %>%
      filter(grepl("G", mplType)) %>%
      filter(prob != 50)
    plot_points(x_high, lottery_color = colors$lottery_high, mirror_color = colors$mirror_high, pch_type = 21, show_labels = TRUE)
    plot_points(x_low, lottery_color = colors$lottery_low, mirror_color = colors$mirror_low, pch_type = 21, show_labels = TRUE)
  } else if (cogload == 1) {
    x_hard <- F_hard %>%
      filter(grepl("G", mplType)) %>%
      filter(prob != 50)
    x_easy <- F_easy %>%
      filter(grepl("G", mplType)) %>%
      filter(prob != 50)
    plot_points(x_hard, lottery_color = colors$lottery_hard, mirror_color = colors$mirror_hard, pch_type = 21, show_labels = TRUE)
    plot_points(x_easy, lottery_color = colors$lottery_easy, mirror_color = colors$mirror_easy, pch_type = 21, show_labels = TRUE)
  } else if (median == 1) {
    x_above <- F_above %>%
      filter(grepl("G", mplType)) %>%
      filter(prob != 50)
    x_below <- F_below %>%
      filter(grepl("G", mplType)) %>%
      filter(prob != 50)
    plot_points(x_above, lottery_color = colors$lottery_above, mirror_color = colors$mirror_above, pch_type = 21, show_labels = TRUE)
    plot_points(x_below, lottery_color = colors$lottery_below, mirror_color = colors$mirror_below, pch_type = 21, show_labels = TRUE)
  } else if (lotteryFirst == TRUE) {
    if (isLottery == TRUE) {
      x_lotteryFirst <- F_lotteryFirst_lottery %>%
        filter(grepl("G", mplType)) %>%
        filter(prob != 50)
      x_mirrorFirst <- F_mirrorFirst_lottery %>%
        filter(grepl("G", mplType)) %>%
        filter(prob != 50)
    } else if (isLottery == FALSE) {
      x_lotteryFirst <- F_lotteryFirst_mirror %>%
        filter(grepl("G", mplType)) %>%
        filter(prob != 50)
      x_mirrorFirst <- F_mirrorFirst_mirror %>%
        filter(grepl("G", mplType)) %>%
        filter(prob != 50)
    }
    # when we plot x_lotteryFirst there are only lotteries that are plotted
    plot_points(x_lotteryFirst, colorWhenLotteryFirstTrue = colors$lotteryFirst, pch_type = 21, show_labels = TRUE) # lottery_color and mirror_color are convenient names but both are lotteries or mirrors (I just don't change them from the other conditions)
    plot_points(x_mirrorFirst, colorWhenLotteryFirstTrue = colors$mirrorFirst, pch_type = 21, show_labels = TRUE) # lottery_color and mirror_color are convenient names but both are lotteries or mirrors (I just don't change them from the other conditions)
  } else if (position == 0 && cogload == 0 && median == 0) {
    x <- F %>%
      filter(grepl("G", mplType)) %>%
      filter(prob != 50)
    plot_points(x, lottery_color = colors$lottery, mirror_color = colors$mirror, pch_type = 21, show_labels = TRUE)
  }

  # Plot L types
  if (position == 1) {
    x_high <- F_high %>%
      filter(grepl("L", mplType)) %>%
      filter(prob != 50)
    x_low <- F_low %>%
      filter(grepl("L", mplType)) %>%
      filter(prob != 50)
    plot_points(x_high, lottery_color = colors$lottery_high, mirror_color = colors$mirror_high, pch_type = 21, show_labels = TRUE)
    plot_points(x_low, lottery_color = colors$lottery_low, mirror_color = colors$mirror_low, pch_type = 21, show_labels = TRUE)
  } else if (cogload == 1) {
    x_hard <- F_hard %>%
      filter(grepl("L", mplType)) %>%
      filter(prob != 50)
    x_easy <- F_easy %>%
      filter(grepl("L", mplType)) %>%
      filter(prob != 50)
    plot_points(x_hard, lottery_color = colors$lottery_hard, mirror_color = colors$mirror_hard, pch_type = 21, show_labels = TRUE)
    plot_points(x_easy, lottery_color = colors$lottery_easy, mirror_color = colors$mirror_easy, pch_type = 21, show_labels = TRUE)
  } else if (median == 1) {
    x_above <- F_above %>%
      filter(grepl("L", mplType)) %>%
      filter(prob != 50)
    x_below <- F_below %>%
      filter(grepl("L", mplType)) %>%
      filter(prob != 50)
    plot_points(x_above, lottery_color = colors$lottery_above, mirror_color = colors$mirror_above, pch_type = 21, show_labels = TRUE)
    plot_points(x_below, lottery_color = colors$lottery_below, mirror_color = colors$mirror_below, pch_type = 21, show_labels = TRUE)
  } else if (lotteryFirst == TRUE) {
    if (isLottery == TRUE) {
      x_lotteryFirst <- F_lotteryFirst_lottery %>%
        filter(grepl("L", mplType)) %>%
        filter(prob != 50)
      x_mirrorFirst <- F_mirrorFirst_lottery %>%
        filter(grepl("L", mplType)) %>%
        filter(prob != 50)
    } else if (isLottery == FALSE) {
      x_lotteryFirst <- F_lotteryFirst_mirror %>%
        filter(grepl("L", mplType)) %>%
        filter(prob != 50)
      x_mirrorFirst <- F_mirrorFirst_mirror %>%
        filter(grepl("L", mplType)) %>%
        filter(prob != 50)
    }
    # when we plot x_lotteryFirst there are only lotteries that are plotted
    plot_points(x_lotteryFirst, colorWhenLotteryFirstTrue = colors$lotteryFirst, pch_type = 21, show_labels = TRUE) # lottery_color and mirror_color are convenient names but both are lotteries or mirrors (I just don't change them from the other conditions)
    plot_points(x_mirrorFirst, colorWhenLotteryFirstTrue = colors$mirrorFirst, pch_type = 21, show_labels = TRUE) # lottery_color and mirror_color are convenient names but both are lotteries or mirrors (I just don't change them from the other conditions)
  } else if (position == 0 && cogload == 0 && median == 0) {
    x <- F %>%
      filter(grepl("L", mplType)) %>%
      filter(prob != 50)
    plot_points(x, lottery_color = colors$lottery, mirror_color = colors$mirror, pch_type = 21, show_labels = TRUE)
  }

  # Plot A types (triangle shape)
  if (position == 1) {
    x_high <- F_high %>% filter(grepl("A", mplType) | grepl("M", mplType))
    x_low <- F_low %>% filter(grepl("A", mplType) | grepl("M", mplType))
    plot_points(x_high, lottery_color = colors$lottery_high, mirror_color = colors$mirror_high, pch_type = 25, show_labels = TRUE)
    plot_points(x_low, lottery_color = colors$lottery_low, mirror_color = colors$mirror_low, pch_type = 25, show_labels = TRUE)
  } else if (cogload == 1) {
    x_hard <- F_hard %>% filter(grepl("A", mplType) | grepl("M", mplType))
    x_easy <- F_easy %>% filter(grepl("A", mplType) | grepl("M", mplType))
    plot_points(x_hard, lottery_color = colors$lottery_hard, mirror_color = colors$mirror_hard, pch_type = 25, show_labels = TRUE)
    plot_points(x_easy, lottery_color = colors$lottery_easy, mirror_color = colors$mirror_easy, pch_type = 25, show_labels = TRUE)
  } else if (median == 1) {
    x_above <- F_above %>% filter(grepl("A", mplType) | grepl("M", mplType))
    x_below <- F_below %>% filter(grepl("A", mplType) | grepl("M", mplType))
    plot_points(x_above, lottery_color = colors$lottery_above, mirror_color = colors$mirror_above, pch_type = 25, show_labels = TRUE)
    plot_points(x_below, lottery_color = colors$lottery_below, mirror_color = colors$mirror_below, pch_type = 25, show_labels = TRUE)
  } else if (lotteryFirst == TRUE) {
    if (isLottery == TRUE) {
      x_lotteryFirst <- F_lotteryFirst_lottery %>%
        filter(grepl("A", mplType)) %>%
        filter(prob != 50)
      x_mirrorFirst <- F_mirrorFirst_lottery %>%
        filter(grepl("A", mplType)) %>%
        filter(prob != 50)
    } else if (isLottery == FALSE) {
      x_lotteryFirst <- F_lotteryFirst_mirror %>%
        filter(grepl("A", mplType)) %>%
        filter(prob != 50)
      x_mirrorFirst <- F_mirrorFirst_mirror %>%
        filter(grepl("A", mplType)) %>%
        filter(prob != 50)
    }
    # when we plot x_lotteryFirst there are only lotteries that are plotted
    plot_points(x_lotteryFirst, colorWhenLotteryFirstTrue = colors$lotteryFirst, pch_type = 25, show_labels = TRUE) # lottery_color and mirror_color are convenient names but both are lotteries or mirrors (I just don't change them from the other conditions)
    plot_points(x_mirrorFirst, colorWhenLotteryFirstTrue = colors$mirrorFirst, pch_type = 25, show_labels = TRUE) # lottery_color and mirror_color are convenient names but both are lotteries or mirrors (I just don't change them from the other conditions)
  } else if (position == 0 && cogload == 0 && median == 0) {
    x <- F %>% filter(grepl("A", mplType) | grepl("M", mplType))
    plot_points(x, lottery_color = colors$lottery, mirror_color = colors$mirror, pch_type = 25, show_labels = TRUE)
  }
}


# dfA_plot_maker takes data on input and calculates the mean and standard deviation of the deviation of the group asked in the argument, for each mpl type
dfA_plot_maker <- function(type = NULL, med = NULL, order = NULL, data = dfA) {
  if (is.null(med)) {
    df <- data
  } else if (med == "aboveCogLoad") {
    df <- data %>% filter(aboveMedImpactCogLoad == 1)
  } else if (med == "belowCogLoad") {
    df <- data %>% filter(aboveMedImpactCogLoad == 0)
  } else if (med == "aboveRt") {
    df <- data %>% filter(aboveMedRtChoice == 1)
  } else if (med == "belowRt") {
    df <- data %>% filter(aboveMedRtChoice == 0)
  }



  dfA_plot <- df %>%
    filter(!mplType %in% c(
      "GS10", "GS25", "GS50", "GS75", "GS90",
      "LS10", "LS25", "LS50", "LS75", "LS90",
      "AS10", "AS15", "GO10", "GO90"
    )) %>%
    {
      if (!is.null(type)) {
        switch(type,
          "hard" = filter(., treatment == "hard"),
          "easy" = filter(., treatment == "easy"),
          "high" = filter(., mirror_position == "high" & lottery_position == "high"),
          "low" = filter(., mirror_position == "low" & lottery_position == "low"),
          "lotteryFirst_mirror" = filter(., isLotteryFirst == TRUE),
          "lotteryFirst_lottery" = filter(., isLotteryFirst == TRUE),
          "mirrorFirst_mirror" = filter(., isLotteryFirst == FALSE),
          "mirrorFirst_lottery" = filter(., isLotteryFirst == FALSE),
          .
        )
      } else {
        .
      }
    } %>%
    group_by(prob, mplType) %>%
    summarise( # inside summarise call vectorized functions, bc we are talking about vectors. Unlike mutate which is more line by line from what I understand. In if not vectorized : || and &&, not | and &
      n = length(unique(participant_id)),

      # Count valid observations for each measure
      n_valid_lottery = sum(!is.na(lottery_ev)),
      n_valid_mirror = sum(!is.na(mirror_ev)),
      n_valid_both = sum(!is.na(lottery_ev) & !is.na(mirror_ev)),
      n_valid_lottery_hard_high = sum(!is.na(lottery_ev) & treatment == "hard" & lottery_position == "high"),
      n_valid_lottery_hard_low = sum(!is.na(lottery_ev) & treatment == "hard" & lottery_position == "low"),
      n_valid_lottery_easy_high = sum(!is.na(lottery_ev) & treatment == "easy" & lottery_position == "high"),
      n_valid_lottery_easy_low = sum(!is.na(lottery_ev) & treatment == "easy" & lottery_position == "low"),
      n_valid_mirror_hard_high = sum(!is.na(mirror_ev) & treatment == "hard" & mirror_position == "high"),
      n_valid_mirror_hard_low = sum(!is.na(mirror_ev) & treatment == "hard" & mirror_position == "low"),
      n_valid_mirror_easy_high = sum(!is.na(mirror_ev) & treatment == "easy" & mirror_position == "high"),
      n_valid_mirror_easy_low = sum(!is.na(mirror_ev) & treatment == "easy" & mirror_position == "low"),
      ## to implement order
      # n_valid_mirrorFirst_mirror = sum(!is.na(mirror_ev) & isLotteryFirst==FALSE),
      # n_valid_lotteryFirst_mirror = sum(!is.na(mirror_ev) & isLotteryFirst==TRUE),
      # n_valid_lotteryFirst_lottery = sum(!is.na(lottery_ev) & isLotteryFirst==TRUE),
      # n_valid_mirrorFirst_lottery = sum(!is.na(lottery_ev) & isLotteryFirst==FALSE),


      medDiff = median(lottery_ev - mirror_ev),
      meanEVLoss1 = mean(abs(pred - ((lottery_ev + mirror_ev) / 2))),
      pred = mean(pred),
      # ceLotteryse=sd(lottery_ev, na.rm = TRUE)/sqrt(n_valid_lottery),
      # ceMirrorse=sd(mirror_ev, na.rm = TRUE)/sqrt(n_valid_mirror),  # uncorrect s.e. , because they are the sample s.e.
      ceLotteryse = if ((is.null(type)) && n_valid_lottery > 0) {
        (1 / n_valid_lottery) *
          sqrt((n_valid_lottery_hard_high * var(lottery_ev[lottery_position == "high" & treatment == "hard"], na.rm = TRUE) +
            n_valid_lottery_hard_low * var(lottery_ev[lottery_position == "low" & treatment == "hard"], na.rm = TRUE) +
            n_valid_lottery_easy_low * var(lottery_ev[lottery_position == "low" & treatment == "easy"], na.rm = TRUE) +
            n_valid_lottery_easy_high * var(lottery_ev[lottery_position == "high" & treatment == "easy"], na.rm = TRUE)))
      }
      ##
      else if (type == "lotteryFirst_lottery" || type == "mirrorFirst_lottery") {
        (1 / n_valid_lottery) *
          sqrt((n_valid_lottery_hard_high * var(lottery_ev[lottery_position == "high" & treatment == "hard"], na.rm = TRUE) +
            n_valid_lottery_hard_low * var(lottery_ev[lottery_position == "low" & treatment == "hard"], na.rm = TRUE) +
            n_valid_lottery_easy_low * var(lottery_ev[lottery_position == "low" & treatment == "easy"], na.rm = TRUE) +
            n_valid_lottery_easy_high * var(lottery_ev[lottery_position == "high" & treatment == "easy"], na.rm = TRUE)))
      }
      ##
      else if (type == "lotteryFirst_mirror" || type == "mirrorFirst_mirror") {
        NA
      } else if (type == "hard") {
        (1 / (n_valid_lottery_hard_low + n_valid_lottery_hard_high)) *
          sqrt((n_valid_lottery_hard_high * var(lottery_ev[lottery_position == "high" & treatment == "hard"], na.rm = TRUE) +
            n_valid_lottery_hard_low * var(lottery_ev[lottery_position == "low" & treatment == "hard"], na.rm = TRUE)))
      } else if (type == "easy") {
        (1 / (n_valid_lottery_easy_low + n_valid_lottery_easy_high)) *
          sqrt((n_valid_lottery_easy_high * var(lottery_ev[lottery_position == "high" & treatment == "easy"], na.rm = TRUE) +
            n_valid_lottery_easy_low * var(lottery_ev[lottery_position == "low" & treatment == "easy"], na.rm = TRUE)))
      } else if (type == "high") {
        (1 / (n_valid_lottery_hard_high + n_valid_lottery_easy_high)) *
          sqrt((n_valid_lottery_hard_high * var(lottery_ev[lottery_position == "high" & treatment == "hard"], na.rm = TRUE) +
            n_valid_lottery_easy_high * var(lottery_ev[lottery_position == "high" & treatment == "easy"], na.rm = TRUE)))
      } else if (type == "low") {
        (1 / (n_valid_lottery_hard_low + n_valid_lottery_easy_low)) *
          sqrt((n_valid_lottery_hard_low * var(lottery_ev[lottery_position == "low" & treatment == "hard"], na.rm = TRUE) +
            n_valid_lottery_easy_low * var(lottery_ev[lottery_position == "low" & treatment == "easy"], na.rm = TRUE)))
      } else {
        cat("type is no low or high and not null but", type, "\n")
        NA_real_
      },
      ceMirrorse = if ((is.null(type)) && n_valid_mirror > 0) {
        (1 / n_valid_mirror) *
          sqrt((n_valid_mirror_hard_high * var(mirror_ev[mirror_position == "high" & treatment == "hard"], na.rm = TRUE) +
            n_valid_mirror_hard_low * var(mirror_ev[mirror_position == "low" & treatment == "hard"], na.rm = TRUE) +
            n_valid_mirror_easy_low * var(mirror_ev[mirror_position == "low" & treatment == "easy"], na.rm = TRUE) +
            n_valid_mirror_easy_high * var(mirror_ev[mirror_position == "high" & treatment == "easy"], na.rm = TRUE)))
      } else if (type == "lotteryFirst_mirror" || type == "mirrorFirst_mirror") {
        (1 / n_valid_mirror) *
          sqrt((n_valid_lottery_hard_high * var(lottery_ev[lottery_position == "high" & treatment == "hard"], na.rm = TRUE) +
            n_valid_lottery_hard_low * var(lottery_ev[lottery_position == "low" & treatment == "hard"], na.rm = TRUE) +
            n_valid_lottery_easy_low * var(lottery_ev[lottery_position == "low" & treatment == "easy"], na.rm = TRUE) +
            n_valid_lottery_easy_high * var(lottery_ev[lottery_position == "high" & treatment == "easy"], na.rm = TRUE)))
      } else if (type == "lotteryFirst_lottery" || type == "mirrorFirst_lottery") {
        NA
      } else if (type == "hard") {
        (1 / (n_valid_mirror_hard_low + n_valid_mirror_hard_high)) *
          sqrt((n_valid_mirror_hard_high * var(mirror_ev[mirror_position == "high" & treatment == "hard"], na.rm = TRUE) +
            n_valid_mirror_hard_low * var(mirror_ev[mirror_position == "low" & treatment == "hard"], na.rm = TRUE)))
      } else if (type == "easy") {
        (1 / (n_valid_mirror_easy_low + n_valid_mirror_easy_high)) *
          sqrt((n_valid_mirror_easy_high * var(mirror_ev[mirror_position == "high" & treatment == "easy"], na.rm = TRUE) +
            n_valid_mirror_easy_low * var(mirror_ev[mirror_position == "low" & treatment == "easy"], na.rm = TRUE)))
      } else if (type == "high") {
        (1 / (n_valid_mirror_hard_high + n_valid_mirror_easy_high)) *
          sqrt((n_valid_mirror_hard_high * var(mirror_ev[mirror_position == "high" & treatment == "hard"], na.rm = TRUE) +
            n_valid_mirror_easy_high * var(mirror_ev[mirror_position == "high" & treatment == "easy"], na.rm = TRUE)))
      } else if (type == "low") {
        (1 / (n_valid_mirror_hard_low + n_valid_mirror_easy_low)) *
          sqrt((n_valid_mirror_hard_low * var(mirror_ev[mirror_position == "low" & treatment == "hard"], na.rm = TRUE) +
            n_valid_mirror_easy_low * var(mirror_ev[mirror_position == "low" & treatment == "easy"], na.rm = TRUE)))
      } else {
        cat("type is no low or high and not null but", type, "\n")
        NA_real_
      },
      #   ceLotteryse = pmax(sd(lottery_ev, na.rm = TRUE) / sqrt(n), 0.01),
      #   ceMirrorse = pmax(sd(mirror_ev, na.rm = TRUE) / sqrt(n), 0.01),
      lottery = mean(lottery_ev, na.rm = TRUE),
      mirror = mean(mirror_ev, na.rm = TRUE),


      # position-conditioned means (NA-safe)
      # lottery_high = mean(ifelse(lottery_position == "high", lottery_ev, NA_real_), na.rm = TRUE),
      # lottery_low  = mean(ifelse(lottery_position == "low",  lottery_ev, NA_real_), na.rm = TRUE),
      # mirror_high  = mean(ifelse(mirror_position  == "high", mirror_ev,  NA_real_), na.rm = TRUE),
      # mirror_low   = mean(ifelse(mirror_position  == "low",  mirror_ev,  NA_real_), na.rm = TRUE),
      .groups = "drop"
    ) %>%
    mutate(
      meanEVLoss2 = abs(abs(pred) - abs(lottery + mirror) / 2)
    )
}

dfA_plot_lotteryFirst_lottery <- dfA_plot_maker("lotteryFirst_lottery")
dfA_plot_mirrorFirst_lottery <- dfA_plot_maker("mirrorFirst_lottery")
mainPlot(
  F_lotteryFirst_lottery = dfA_plot_lotteryFirst_lottery,
  F_mirrorFirst_lottery = dfA_plot_mirrorFirst_lottery,
  isLottery = TRUE,
  lotteryFirst = TRUE,
  lab = "exemple of graph of lotteries in first round vs second round"
)

dfA_plot_lotteryFirst_mirror <- dfA_plot_maker("lotteryFirst_mirror")
dfA_plot_mirrorFirst_mirror <- dfA_plot_maker("mirrorFirst_mirror")
mainPlot(
  F_lotteryFirst_mirror = dfA_plot_lotteryFirst_mirror,
  F_mirrorFirst_mirror = dfA_plot_mirrorFirst_mirror,
  isLottery = FALSE,
  lotteryFirst = TRUE,
  lab = "exemple of graph of mirrors in first round vs second round"
)


dfA_plot <- dfA_plot_maker() # No filtering
dfA_plot_high <- dfA_plot_maker(type = "high")
dfA_plot_low <- dfA_plot_maker(type = "low")
dfA_plot_hard <- dfA_plot_maker(type = "hard")
dfA_plot_easy <- dfA_plot_maker(type = "easy")
dfA_plot_aboveCogLoad <- dfA_plot_maker(med = "aboveCogLoad")
dfA_plot_belowCogLoad <- dfA_plot_maker(med = "belowCogLoad")
dfA_plot_aboveRt <- dfA_plot_maker(med = "aboveRt")
dfA_plot_belowRt <- dfA_plot_maker(med = "belowRt")
dfA_plot_aboveCogLoad_hard <- dfA_plot_maker(med = "aboveCogLoad", type = "hard")
dfA_plot_belowCogLoad_hard <- dfA_plot_maker(med = "belowCogLoad", type = "hard")
dfA_plot_aboveCogLoad_easy <- dfA_plot_maker(med = "aboveCogLoad", type = "easy")
dfA_plot_belowCogLoad_easy <- dfA_plot_maker(med = "belowCogLoad", type = "easy")
dfA_plot_aboveRt_hard <- dfA_plot_maker(med = "aboveRt", type = "hard")
dfA_plot_belowRt_hard <- dfA_plot_maker(med = "belowRt", type = "hard")
dfA_plot_aboveRt_easy <- dfA_plot_maker(med = "aboveRt", type = "easy")
dfA_plot_belowRt_easy <- dfA_plot_maker(med = "belowRt", type = "easy")
## for order effect
dfA_plot_lotteryFirst_mirror <- dfA_plot_maker(type = "lotteryFirst_mirror")
dfA_plot_lotteryFirst_mirror
dfA_plot_mirrorFirst_mirror <- dfA_plot_maker(type = "mirrorFirst_mirror")
dfA_plot_mirrorFirst_mirror


mainPlot(F = dfA_plot, lab = "") # plot of all data, pooled
mainPlot(F_high = dfA_plot_high, F_low = dfA_plot_low, lab = "Position of the EV choice on deviation from EV", position = 1) # plot between high and low
mainPlot(F_hard = dfA_plot_hard, F_easy = dfA_plot_easy, lab = "Cognitive load on deviation from EV", cogload = 1) # plot between easy and hard
mainPlot(F_above = dfA_plot_aboveCogLoad, F_below = dfA_plot_belowCogLoad, lab = "Median split on cognitive load strength", median = 1)
mainPlot(F_above = dfA_plot_aboveRt, F_below = dfA_plot_belowRt, lab = "Median split on RT", median = 1)
mainPlot(F_above = dfA_plot_aboveCogLoad_hard, F_below = dfA_plot_belowCogLoad_hard, lab = "Median split on cognitive load strength, treatment cogload only", median = 1)
mainPlot(F_above = dfA_plot_aboveCogLoad_easy, F_below = dfA_plot_belowCogLoad_easy, lab = "Median split on cognitive load strength, treatment no-cogload only", median = 1)
mainPlot(F_above = dfA_plot_aboveRt_hard, F_below = dfA_plot_belowRt_hard, lab = "Median split on RT, treatment cogload only", median = 1)
mainPlot(F_above = dfA_plot_aboveRt_easy, F_below = dfA_plot_belowRt_easy, lab = "Median split on RT, treatment no-cogload only", median = 1)
mainPlot(F_hard = dfA_plot_belowRt_hard, F_easy = dfA_plot_belowRt_easy, lab = "Cognitive load on deviation from EV, below median RT only", cogload = 1)
mainPlot(F_hard = dfA_plot_aboveRt_hard, F_easy = dfA_plot_aboveRt_easy, lab = "Cognitive load on deviation from EV, above median RT only", cogload = 1)



pdf(file.path(PATH_TO_DATA, "Figures_pilot3&4&5/mainPlot1.pdf"), width = 7.41, height = 8.31)
mainPlot(F = dfA_plot, lab = "", position = 0)
dev.off()
pdf(file.path(PATH_TO_DATA, "Figures_pilot3&4&5/mainPlot1_position.pdf"), width = 7.41, height = 8.31)
mainPlot(F_high = dfA_plot_high, F_low = dfA_plot_low, lab = "", position = 1)
dev.off()
pdf(file.path(PATH_TO_DATA, "Figures_pilot3&4&5/mainPlot1_cogload.pdf"), width = 7.41, height = 8.31)
mainPlot(F_hard = dfA_plot_hard, F_easy = dfA_plot_easy, lab = "", cogload = 1)
dev.off()
pdf(file.path(PATH_TO_DATA, "Figures_pilot3&4&5/mainPlot1_medCogload.pdf"), width = 7.41, height = 8.31)
mainPlot(F_above = dfA_plot_aboveCogLoad, F_below = dfA_plot_belowCogLoad, lab = "Median split on cognitive load strength", median = 1)
dev.off()
pdf(file.path(PATH_TO_DATA, "Figures_pilot3&4&5/mainPlot1_medRt.pdf"), width = 7.41, height = 8.31)
mainPlot(F_above = dfA_plot_aboveRt, F_below = dfA_plot_belowRt, lab = "Median split on RT", median = 1)
dev.off()
pdf(file.path(PATH_TO_DATA, "Figures_pilot3&4&5/mainPlot1_medCogload_hard.pdf"), width = 7.41, height = 8.31)
mainPlot(F_above = dfA_plot_aboveCogLoad_hard, F_below = dfA_plot_belowCogLoad_hard, lab = "Median split on cognitive load strength, treatment cogload only", median = 1)
dev.off()
pdf(file.path(PATH_TO_DATA, "Figures_pilot3&4&5/mainPlot1_medCogload_easy.pdf"), width = 7.41, height = 8.31)
mainPlot(F_above = dfA_plot_aboveCogLoad_easy, F_below = dfA_plot_belowCogLoad_easy, lab = "Median split on cognitive load strength, treatment no-cogload only", median = 1)
dev.off()
pdf(file.path(PATH_TO_DATA, "Figures_pilot3&4&5/mainPlot1_medRt_hard.pdf"), width = 7.41, height = 8.31)
mainPlot(F_above = dfA_plot_aboveRt_hard, F_below = dfA_plot_belowRt_hard, lab = "Median split on RT, treatment cogload only", median = 1)
dev.off()
pdf(file.path(PATH_TO_DATA, "Figures_pilot3&4&5/mainPlot1_medRt_easy.pdf"), width = 7.41, height = 8.31)
mainPlot(F_above = dfA_plot_aboveRt_easy, F_below = dfA_plot_belowRt_easy, lab = "Median split on RT, treatment no-cogload only", median = 1)
dev.off()



# test if the number of NAs in dfA_plot is the same as the number of inversions of choices
inversions <- final_data_2 %>%
  filter(block == "span_mpl" & task == "mpl" & !grepl("^(GO)", mplType) & !(subBlock %in% c(13, 14))) %>%
  # removes the training mpl ERROR in my code: I count in mplCounter the tables that train to select cells, but not the one of the complete example...
  # I prefer not to use mplCounter thus because I will likely modify it later
  group_by(subject) %>%
  summarise(
    n = n(),
    inversionCount = sum(switchInversion, na.rm = TRUE), # look at why I need to put na.rm now but not in data_analysis_span_mpl_1.r
    inversionShare = mean(switchInversion, na.rm = TRUE)
  )
inversions
sum(inversions$inversionCount)
inversionsFromDfA <- dfA %>%
  filter(!grepl("^(GO|GS|LS|AS)", mplType) & (is.na(lottery_ev) | is.na(mirror_ev))) %>%
  group_by(participant_id) %>%
  summarise(
    inversionCount = sum(is.na(mirror_ev)) + sum(is.na(lottery_ev))
  )
inversionsFromDfA
sum(inversionsFromDfA$inversionCount)

# look at the number of NAs in final_data
inversionsFromFinalData <- final_data %>%
  select(!starts_with(c("GS", "AS", "LS", "GO")) & ends_with("_ev")) %>%
  pivot_longer(cols = everything(), names_to = "mplType", values_to = "ev")
inversionsFromFinalData
sum(is.na(inversionsFromFinalData$ev))

mainPlotComparisonGo <- function(F, F_hard, F_easy, lab = "", ylim = c(-14, 14), cogload = 0) {
  cex <- 1.7
  pt.cex <- 0.8
  offset <- 1

  colors <- if (cogload == 1) {
    list(
      lottery_hard = "darkred", mirror_hard = "lightcoral",
      lottery_easy = "darkblue", mirror_easy = "lightblue"
    )
  } else {
    list(lottery = "gray", mirror = "white")
  }
  if (cogload == 1) {
    x <- F_hard %>%
      filter(grepl("G", mplType)) %>%
      filter(prob != 50)
  } else {
    x <- F %>%
      filter(grepl("G", mplType)) %>%
      filter(prob != 50)
  }
  plot(x$prob - 0.5, x$lottery - x$pred, type = "n", xlim = c(0, 100), ylim = ylim, ylab = "Deviation from Expected Value", xlab = "Probability", yaxt = "n", bty = "n", xaxt = "n", main = lab) # type='n' to create an empty plot
  axis(1, at = seq(0, 100, 10), labels = seq(0, 1, 0.1))
  mtext("Risk/Loss Seeking", at = 4, side = 4, srt = 180)
  mtext("Risk/Loss Averse", at = -4, side = 4, srt = 180)

  # Legend
  if (cogload == 1) {
    legend("top",
      legend = c("Lottery Hard", "Mirror Hard", "Lottery Easy", "Mirror Easy"),
      col = c("black", "black", "black", "black"),
      pt.bg = c(colors$lottery_hard, colors$mirror_hard, colors$lottery_easy, colors$mirror_easy),
      pch = c(21, 21, 21, 21), lty = c(1, 1, 1, 1), cex = 0.9, pt.cex = 1.5, bg = NA, box.lwd = NA
    )
  } else {
    legend("top",
      legend = c("Lottery (Certainty Equivalents)", "Mirror (Simplicity Equivalents)"),
      col = c("black", "black"), pt.bg = c(colors$lottery, colors$mirror), pch = c(21, 21),
      lty = c(1, 1), cex = 0.9, pt.cex = 1.5, bg = NA, box.lwd = NA
    )
  }
  # original legend
  # legend("top",legend=c("Lottery (Certainty Equivalents)",'Mirror (Simplicity Equivalents)'),col=c('black','black'),pt.bg=c('gray','white'),pch=c(21,21),lty=c(1,1),cex=0.9,pt.cex=1.5,bg=NA,box.lwd=NA)

  axis(2, at = seq(-10, 10, 5))
  abline("h" = 0, lty = 1)

  # Helper function to plot points for a given dataset and position
  plot_points <- function(data, lottery_color, mirror_color, pch_type = 21, show_labels = TRUE) {
    if (nrow(data) == 0) {
      return(cat("no data"))
    }

    # Lottery points
    arrows(
      x0 = data$prob - 0.5, y0 = data$lottery - data$pred - 2 * data$ceLotteryse,
      x1 = data$prob - 0.5, y1 = data$lottery - data$pred + 2 * data$ceLotteryse,
      code = 3, angle = 90, length = 0.05, col = "black", lwd = 0.5
    )
    points(data$prob - 0.5, data$lottery - data$pred, bg = lottery_color, col = "black", pch = pch_type, cex = cex)
    if (show_labels) {
      text(data$prob, data$lottery - data$pred, pos = 2, labels = data$mplType, cex = pt.cex, col = "black", offset = offset)
    }

    # Mirror points
    y_val <- if (pch_type == 25) data$mirror else data$mirror - data$pred
    arrows(
      x0 = data$prob + 0.5, y0 = y_val - 2 * data$ceMirrorse,
      x1 = data$prob + 0.5, y1 = y_val + 2 * data$ceMirrorse,
      code = 3, angle = 90, length = 0.05, col = "black", lwd = 0.5, lty = 1
    )
    points(data$prob + 0.5, y_val, bg = mirror_color, col = "black", pch = pch_type, cex = cex)
    if (show_labels) {
      text(data$prob, y_val, pos = 4, labels = data$mplType, cex = pt.cex, col = "black", offset = offset)
    }
  }

  # Plot G types
  if (cogload == 1) {
    x_hard <- F_hard %>%
      filter(grepl("G", mplType)) %>%
      filter(prob != 50)
    x_easy <- F_easy %>%
      filter(grepl("G", mplType)) %>%
      filter(prob != 50)
    plot_points(x_hard, lottery_color = colors$lottery_hard, mirror_color = colors$mirror_hard, pch_type = 21, show_labels = TRUE)
    plot_points(x_easy, lottery_color = colors$lottery_easy, mirror_color = colors$mirror_easy, pch_type = 21, show_labels = TRUE)
  } else if (cogload == 0) {
    x <- F %>%
      filter(grepl("G", mplType)) %>%
      filter(prob != 50)
    plot_points(x, lottery_color = colors$lottery, mirror_color = colors$mirror, pch_type = 21, show_labels = TRUE)
  }
}

dfA_plot_maker_comparison_GO <- function(type = NULL) {
  dfA_plot <- dfA %>%
    filter(!mplType %in% c(
      "G25", "L25", "G50", "L50", "G75", "L75",
      "A10", "A15", "L10", "L90",
      "GS10", "GS25", "GS50", "GS75", "GS90",
      "LS10", "LS25", "LS50", "LS75", "LS90",
      "AS10", "AS15"
    )) %>%
    {
      if (!is.null(type)) {
        switch(type,
          "hard" = filter(., treatment == "hard"),
          "easy" = filter(., treatment == "easy"),
          .
        )
      } else {
        .
      }
    } %>%
    group_by(prob, mplType) %>%
    summarise(
      n = length(unique(participant_id)),

      # Count valid observations for each measure IF removing no switch point
      n_valid_lottery = sum(!is.na(lottery_ev)),
      n_valid_mirror = sum(!is.na(mirror_ev)),
      n_valid_both = sum(!is.na(lottery_ev) & !is.na(mirror_ev)),
      n_valid_lottery_hard = sum(!is.na(lottery_ev) & treatment == "hard"),
      n_valid_lottery_easy = sum(!is.na(lottery_ev) & treatment == "easy"),
      n_valid_mirror_hard = sum(!is.na(mirror_ev) & treatment == "hard"),
      n_valid_mirror_easy = sum(!is.na(mirror_ev) & treatment == "easy"),
      medDiff = median(lottery_ev - mirror_ev),
      meanEVLoss1 = mean(abs(pred - ((lottery_ev + mirror_ev) / 2))),
      pred = mean(pred),
      ceLotteryse = if (is.null(type)) {
        (1 / (n_valid_lottery_hard + n_valid_lottery_easy)) *
          sqrt(((n_valid_lottery_hard) * var(ifelse(treatment == "hard", lottery_ev, NA_real_), na.rm = TRUE))
          + ((n_valid_lottery_easy) * var(ifelse(treatment == "easy", lottery_ev, NA_real_), na.rm = TRUE)))
      } else if (type == "hard") {
        (1 / (n_valid_lottery_hard)) *
          sqrt(((n_valid_lottery_hard) * var(ifelse(treatment == "hard", lottery_ev, NA_real_), na.rm = TRUE)))
      } else if (type == "easy") {
        (1 / (n_valid_lottery_easy)) *
          sqrt(((n_valid_lottery_easy) * var(ifelse(treatment == "easy", lottery_ev, NA_real_), na.rm = TRUE)))
      },
      ceMirrorse = if (is.null(type)) {
        (1 / (n_valid_mirror_hard + n_valid_mirror_easy)) *
          sqrt(((n_valid_mirror_hard) * var(ifelse(treatment == "hard", mirror_ev, NA_real_), na.rm = TRUE))
          + ((n_valid_mirror_easy) * var(ifelse(treatment == "easy", mirror_ev, NA_real_), na.rm = TRUE)))
      } else if (type == "hard") {
        (1 / (n_valid_mirror_hard)) *
          sqrt(((n_valid_mirror_hard) * var(ifelse(treatment == "hard", mirror_ev, NA_real_), na.rm = TRUE)))
      } else if (type == "easy") {
        (1 / (n_valid_mirror_easy)) *
          sqrt(((n_valid_mirror_easy) * var(ifelse(treatment == "easy", mirror_ev, NA_real_), na.rm = TRUE)))
      },
      #   ceLotteryse = pmax(sd(lottery_ev, na.rm = TRUE) / sqrt(n), 0.01),
      #   ceMirrorse = pmax(sd(mirror_ev, na.rm = TRUE) / sqrt(n), 0.01),
      lottery = mean(lottery_ev, na.rm = TRUE),
      mirror = mean(mirror_ev, na.rm = TRUE),
      .groups = "drop"
    ) %>%
    mutate(
      meanEVLoss2 = abs(abs(pred) - abs(lottery + mirror) / 2)
    )
}


dfA_plot_comparison_GO <- dfA_plot_maker_comparison_GO()
dfA_plot_comparison_GO
dfA_plot_comparison_GO_hard <- dfA_plot_maker_comparison_GO("hard")
dfA_plot_comparison_GO_hard
dfA_plot_comparison_GO_easy <- dfA_plot_maker_comparison_GO("easy")
dfA_plot_comparison_GO_easy

mainPlotComparisonGo(dfA_plot_comparison_GO)

mainPlotComparisonGo(F_hard = dfA_plot_comparison_GO_hard, F_easy = dfA_plot_comparison_GO_easy, lab = "", cogload = 1)


pdf(file.path(PATH_TO_DATA, "Figures_pilot3&4&5/Figure1GO.pdf"), width = 7.41, height = 8.31)
mainPlotComparisonGo(dfA_plot_comparison_GO)
dev.off()

pdf(file.path(PATH_TO_DATA, "Figures_pilot3&4&5/Figure1GO_treatment.pdf"), width = 7.41, height = 8.31)
mainPlotComparisonGo(F_hard = dfA_plot_comparison_GO_hard, F_easy = dfA_plot_comparison_GO_easy, lab = "", cogload = 1)
dev.off()



# main tests


main_tests_rounded <- function(df) {
  print(
    df %>%
      filter(!mplType %in% c(
        "GS10", "GS25", "GS50", "GS75", "GS90",
        "LS10", "LS25", "LS50", "LS75", "LS90",
        "AS10", "AS15"
      )) %>%
      group_by(mplType) %>%
      summarise(
        lottery_p = wilcox.test(round(lottery_ev, 2), pred, paired = TRUE)$p.value,
        mirror_p = wilcox.test(round(mirror_ev, 2), pred, paired = TRUE)$p.value,
        lottery5 = wilcox.test(round(lottery_ev, 2), pred, paired = TRUE)$p.value < 0.05,
        mirror5 = wilcox.test(round(mirror_ev, 2), pred, paired = TRUE)$p.value < 0.05,
        median_difference = median(round(lottery_ev - mirror_ev, 2), na.rm = TRUE),
        difference_test_p = wilcox.test(round(lottery_ev, 2), round(mirror_ev, 2), paired = TRUE)$p.value,
        difference_test_sig = wilcox.test(round(lottery_ev, 2), round(mirror_ev, 2), paired = TRUE)$p.value < 0.05
      )
  )
}
main_t_tests_rounded <- function(df) {
  print(
    df %>%
      filter(!mplType %in% c(
        "GS10", "GS25", "GS50", "GS75", "GS90",
        "LS10", "LS25", "LS50", "LS75", "LS90",
        "AS10", "AS15"
      )) %>%
      group_by(mplType) %>%
      summarise(
        lottery_p = t.test(round(lottery_ev, 2), pred, paired = TRUE)$p.value,
        mirror_p = t.test(round(mirror_ev, 2), pred, paired = TRUE)$p.value,
        lottery5 = t.test(round(lottery_ev, 2), pred, paired = TRUE)$p.value < 0.05,
        mirror5 = t.test(round(mirror_ev, 2), pred, paired = TRUE)$p.value < 0.05,
        median_difference = median(round(lottery_ev - mirror_ev, 2), na.rm = TRUE),
        mean_difference = mean(round(lottery_ev - mirror_ev, 2), na.rm = TRUE),
        difference_test_p = t.test(round(lottery_ev, 2), round(mirror_ev, 2), paired = TRUE)$p.value,
        difference_test_sig = t.test(round(lottery_ev, 2), round(mirror_ev, 2), paired = TRUE)$p.value < 0.05,
        n = n(),
        na_lottery = length(which(is.na(lottery_ev))),
        na_mirror = length(which(is.na(mirror_ev)))
      )
  )
}
main_tests <- function(df) {
  print(
    df %>%
      filter(!mplType %in% c(
        "GS10", "GS25", "GS50", "GS75", "GS90",
        "LS10", "LS25", "LS50", "LS75", "LS90",
        "AS10", "AS15"
      )) %>%
      group_by(mplType) %>%
      summarise(
        lottery_p = wilcox.test(lottery_ev, pred, paired = TRUE)$p.value,
        mirror_p = wilcox.test(mirror_ev, pred, paired = TRUE)$p.value,
        lottery5 = wilcox.test(lottery_ev, pred, paired = TRUE)$p.value < 0.05,
        mirror5 = wilcox.test(mirror_ev, pred, paired = TRUE)$p.value < 0.05,
        median_difference = median(lottery_ev - mirror_ev),
        difference_test_p = wilcox.test(lottery_ev, mirror_ev, paired = TRUE)$p.value,
        difference_test_sig = wilcox.test(lottery_ev, mirror_ev, paired = TRUE)$p.value < 0.05
      )
  )
}

main_tests_df <- data.frame(main_tests(dfA))
main_t_tests_rounded <- data.frame(main_t_tests_rounded(dfA))
main_tests_df$lottery_p[[4]]
main_tests_rounded_df <- data.frame(main_tests_rounded(dfA))
main_tests_rounded_df$lottery_p[[4]]



G25_pred_values <- dfA %>%
  filter(mplType == "G25") %>%
  select(pred)
G25_pred_values
pred <- rep(6.3, 45)
G25_pred_values == pred

G25_mirror_ev_values <- dfA %>%
  filter(mplType == "G25") %>%
  select(mirror_ev)
G25_mirror_ev_values
vec_45 <- c(
  3.9, 3.7, 7.9, 7.3, 6.3, 6.9, 7.3, 7.5, 4.5, 6.3, 6.1, 4.5, 5.3, 6.3, 6.3,
  7.5, 3.7, 7.3, 6.7, 5.7, 8.1, 5.7, 5.9, 5.3, 6.5, 4.3, 3.7, 8.9, 6.1, 5.3,
  6.7, 6.7, 7.3, 5.5, 8.9, 8.9, 6.3, 5.3, NA, NA, 6.7, 3.7, 4.9, 5.3, 5.3
)

length(vec_45)
G25_mirror_ev_values[[1]]
G25_mirror_ev_values[[1]] == vec_45
round(G25_mirror_ev_values, 6) == vec_45

mirror <- wilcox.test(round(G25_mirror_ev_values[[1]], 3), pred, paired = TRUE)
mirror
mirror <- wilcox.test(vec_45, pred, paired = TRUE) # the same as rounded
mirror
mirror <- wilcox.test(G25_mirror_ev_values[[1]], pred, paired = TRUE, digits.rank = 7)
mirror
mirror <- wilcox.test(G25_mirror_ev_values[[1]], pred, paired = TRUE)
mirror



# Verify why G25 tasks are not in the PT direction:


dataLmChoice %>%
  group_by(mplType) %>%
  summarise(
    n = n(),
    n_high = sum(mirror_position == "high"),
    n_low = sum(mirror_position == "low"), share_high = n_high / (n_low + n_high)
  )





# Scatter plots of individual errors

s_mpl <- dfA %>%
  filter(!mplType %in% c(
    "GS10", "GS25", "GS50", "GS75", "GS90",
    "LS10", "LS25", "LS50", "LS75", "LS90",
    "AS10", "AS15", "GO10", "GO90"
  )) %>% # "A10", "A15"
  filter(!grepl("50", mplType)) %>% # G and L50 are not included because they aren't part of the fourfolf pattern
  # filter(!is.na(lottery_ev)&!is.na(mirror_ev))%>%
  group_by(isLotteryFirst, participant_id) %>%
  summarise(
    lottery_rtChoice = mean(lottery_rtChoice, na.rm = TRUE),
    mirror_rtChoice = mean(mirror_rtChoice, na.rm = TRUE),
    mean_rtChoice = (mean(lottery_rtChoice, na.rm = TRUE) + mean(mirror_rtChoice, na.rm = TRUE)) / 2,
    treatment = first(treatment),
    mirrorError = mean(abs(mirror_ev - pred), na.rm = TRUE),
    lotteryError = mean(abs(lottery_ev - pred), na.rm = TRUE),
    mirrorAndLotteryError = (mean(abs(mirror_ev - pred), na.rm = TRUE) + mean(abs(lottery_ev - pred), na.rm = TRUE)) / 2,
    wmirrorError = mean(multiplier * (mirror_ev - pred), na.rm = TRUE),
    wlotteryError = mean(multiplier * (lottery_ev - pred), na.rm = TRUE),
    wmirrorAndlotteryError = (mean(multiplier * (mirror_ev - pred), na.rm = TRUE) + mean(multiplier * (lottery_ev - pred), na.rm = TRUE)) / 2, # equal weight on lottery and mirror, bc else some NAs could cause imbalance
    aboveMedRtChoice = unique(aboveMedRtChoice)[[1]],
    aboveMedImpactCogLoad = unique(aboveMedImpactCogLoad)[[1]],
    # mean(multiplier*(((lottery_ev+mirror_ev)/2) - pred), na.rm=TRUE)
    mirror_accuracy = mean(mirror_accuracy, na.rm = TRUE),
    lottery_accuracy = mean(lottery_accuracy, na.rm = TRUE),
    mean_spanMplAccuracy = (mean(mirror_accuracy, na.rm = TRUE) + mean(lottery_accuracy, na.rm = TRUE)) / 2,
    .groups = "drop"
  ) %>%
  left_join(
    final_data_2 %>%
      group_by(subject) %>%
      summarise(
        maxSpan = maximumSpan[!is.na(maximumSpan)],
        .groups = "drop"
      ) %>%
      rename(participant_id = subject),
    by = "participant_id"
  ) %>%
  left_join(
    final_data_2 %>%
      filter(
        block == "spanSpan" & task == "spanTest"
      ) %>%
      group_by(subject) %>%
      summarise(
        accuracy_mean_participant_source = mean(accuracy[letterType == 1], na.rm = TRUE),
        accuracy_mean_participant_target = mean(accuracy[letterType == 2], na.rm = TRUE),
        accuracy_mean_participant_overallSpanSpan = mean(c(accuracy[letterType == 1], accuracy[letterType == 2]), na.rm = TRUE),
        .groups = "drop"
      ) %>%
      mutate(
        impactCogLoad = accuracy_mean_participant_source - accuracy_mean_participant_target
      ) %>%
      rename(participant_id = subject),
    by = "participant_id"
  )

print(s_mpl)





makeScatter <- function(s, lab) {
  layout(matrix(1:2, 1, 2, byrow = FALSE))

  x <- s %>% filter(isLotteryFirst == TRUE)
  cat("nrow(x) in second plot for lottery first is", nrow(x), "\n")
  # print(x$mirrorError)
  # print(x$lotteryError)
  plot(x$mirrorError, x$lotteryError, type = "n", col = rgb(0, 0, 0, 0.35), pch = 19, xlab = "Mirror", ylab = "Lottery", xlim = c(0, 6), ylim = c(0, 6), bty = "n", main = paste(lab, "Absolute  Deviations"), cex.lab = 1.6, cex.main = 1.6, cex.axis = 1.6)
  legend("topleft", legend = c("Lottery First", "Mirror First"), col = c("black", "black"), pt.bg = c("gray", "white"), pt.cex = 1.5, pch = 21, cex = 1, bg = NA, box.lwd = NA)
  points(x$mirrorError, x$lotteryError, col = "black", bg = "darkgray", pch = 21, xlab = "DPL Mean Error", ylab = "SPL Mean Error", xlim = c(0, 6), ylim = c(0, 6), bty = "n", main = "Absolute Mean Error", cex.axis = 1.6, cex = 1.6)
  x <- s %>% filter(isLotteryFirst == FALSE)
  # points(x$mirrorError,x$lotteryError,col=rgb(1,0,0,0.35),pch=19,ylab='lottery Error')
  points(x$mirrorError, x$lotteryError, col = "black", bg = "white", pch = 21, ylab = "lottery Error", cex = 1.6)
  abline("a" = 0, "b" = 1, lty = 4)

  x <- s %>% filter(isLotteryFirst == TRUE)
  plot(x$wmirrorError, x$wlotteryError, type = "n", col = rgb(0, 0, 0, 0.35), pch = 19, xlab = "Mirror", ylab = "Lottery", xlim = c(-3, 3), ylim = c(-3, 3), bty = "n", main = paste(lab, "Normalized  Deviations"), xaxt = "n", yaxt = "n", cex.lab = 1.6, cex.main = 1.6)
  axis(1, at = seq(-6, 6, 1), cex.axis = 1.6)
  axis(2, at = seq(-6, 6, 1), cex.axis = 1.6)
  abline("h" = 0)
  abline("v" = 0)
  points(x$wmirrorError, x$wlotteryError, col = "black", bg = "gray", pch = 21, xlab = "DPL Mean Error", ylab = "SPL Mean Error", xlim = c(-6, 6), ylim = c(-6, 6), bty = "n", main = "Normalized Mean Error", xaxt = "n", yaxt = "n", cex = 1.6)
  x <- s %>% filter(isLotteryFirst == FALSE)
  points(x$wmirrorError, x$wlotteryError, col = "black", bg = "white", pch = 21, ylab = "lottery Error", cex = 1.6)
  abline("a" = 0, "b" = 1, lty = 4)

  print(
    data.frame(
      "Normalized" = unlist(cor.test(s$wmirrorError, s$wlotteryError)[c("estimate", "p.value")]),
      "Absolute" = unlist(cor.test(s$mirrorError, s$lotteryError)[c("estimate", "p.value")]),
      "Mirror_First_Normalized" = unlist(cor.test(s[s$isLotteryFirst == FALSE, ]$wmirrorError, s[s$isLotteryFirst == FALSE, ]$wlotteryError)[c("estimate", "p.value")]),
      "Lottery_First_Normalized" = unlist(cor.test(s[s$isLotteryFirst == TRUE, ]$wmirrorError, s[s$isLotteryFirst == TRUE, ]$wlotteryError)[c("estimate", "p.value")]),
      "Mirror_First_Absolute" = unlist(cor.test(s[s$isLotteryFirst == FALSE, ]$mirrorError, s[s$isLotteryFirst == FALSE, ]$lotteryError)[c("estimate", "p.value")]),
      "Lottery_First_Absolute" = unlist(cor.test(s[s$isLotteryFirst == TRUE, ]$mirrorError, s[s$isLotteryFirst == TRUE, ]$lotteryError)[c("estimate", "p.value")])
    )
  )
}
cor.test(s_mpl$wmirrorError, s_mpl$wlotteryError)
makeScatter(s_mpl, "")
pdf(file.path(PATH_TO_DATA, "/Figures_pilot3&4&5/scatter.pdf"), width = 13.05, height = 7.14)
makeScatter(s_mpl, "")
dev.off()
layout(matrix(1))

t.test(s_mpl$wmirrorError, s_mpl$wlotteryError, paired = TRUE)
t.test(s_mpl$mirrorError, s_mpl$lotteryError, paired = TRUE)



s_mpl_scatterCogLoadChoiceLevel <- dfA %>%
  filter(!mplType %in% c(
    "GS10", "GS25", "GS50", "GS75", "GS90",
    "LS10", "LS25", "LS50", "LS75", "LS90",
    "AS10", "AS15", "GO10", "GO90"
  )) %>% #
  filter(!grepl("50", mplType)) %>%
  mutate(
    mean_spanMplAccuracy = (mirror_accuracy + lottery_accuracy) / 2,
    mean_rtChoice = (lottery_rtChoice + mirror_rtChoice) / 2,
    mirrorError = if_else(is.na(mirror_ev), NA, abs(mirror_ev - pred)),
    lotteryError = if_else(is.na(mirror_ev), NA, abs(lottery_ev - pred)),
    mirrorAndLotteryError = (abs(mirror_ev - pred) + abs(lottery_ev - pred)) / 2,
    wmirrorError = if_else(is.na(mirror_ev), NA, multiplier * (mirror_ev - pred)),
    wlotteryError = if_else(is.na(lottery_ev), NA, multiplier * (lottery_ev - pred)),
    wmirrorAndlotteryError = (multiplier * (mirror_ev - pred) + multiplier * (lottery_ev - pred)) / 2, # equal weight on lottery and mirror, bc else some NAs could cause imbalance. So if NA no mean
    # mean(multiplier*(((lottery_ev+mirror_ev)/2) - pred), na.rm=TRUE)
    # meanAccuracy = (mirror_accuracy + lottery_accuracy)/2
  ) %>%
  rename(maxSpan = spanLength) %>%
  left_join(
    final_data_2 %>%
      filter(
        block == "spanSpan" & task == "spanTest"
      ) %>%
      group_by(subject) %>%
      summarise(
        accuracy_mean_participant_source = mean(accuracy[letterType == 1], na.rm = TRUE),
        accuracy_mean_participant_target = mean(accuracy[letterType == 2], na.rm = TRUE),
        accuracy_mean_participant_overallSpanSpan = mean(c(accuracy[letterType == 1], accuracy[letterType == 1]), na.rm = TRUE),
        .groups = "drop"
      ) %>%
      mutate(
        impactCogLoad = accuracy_mean_participant_source - accuracy_mean_participant_target
      ) %>%
      rename(participant_id = subject),
    by = "participant_id"
  )

s_mpl_rescaled <- s_mpl %>%
  mutate(
    mirror_rtChoice = mirror_rtChoice / 30000,
    lottery_rtChoice = lottery_rtChoice / 30000,
    mean_rtChoice = mean_rtChoice / 30000
  )
s_mpl_scatterCogLoadChoiceLevel_rescaled <- s_mpl_scatterCogLoadChoiceLevel %>%
  mutate(
    mirror_rtChoice = mirror_rtChoice / 30000,
    lottery_rtChoice = lottery_rtChoice / 30000,
    mean_rtChoice = mean_rtChoice / 30000
  )


# see the impact of removing the two hard X -0.2 cognitive load participants
s_mpl_rescaled_withoutOutliers <- s_mpl_rescaled %>%
  filter(!(treatment == "hard" & impactCogLoad < (-0.1)))
s_mpl_scatterCogLoadChoiceLevel_rescaled_withoutOutliers <- s_mpl_scatterCogLoadChoiceLevel_rescaled %>%
  filter(!(treatment == "hard" & impactCogLoad < (-0.1)))


makeScatterCogLoad <- function(data, deviation, cluster = FALSE, span = c("impactCogLoad", "accuracy", "rtChoice", "maxSpan"), title) {
  # additional variables "accuracy_mean_participant_overallSpanSpan","accuracy_mean_participant_target",
  plotFunction <- function(df_plot, df_lm, sp) {
    fillValues <- setNames(c("#00AFBB", "#E7B800"), c("mirror", "lottery")) # make named vectors for scale*_manual
    fillLabels <- setNames(c("mirror", "lottery"), c("mirror", "lottery"))
    colourValues <- setNames(c("#00AFBB", "#E7B800", "chartreuse4", "purple"), c("mirror", "lottery", "mindless", "middle")) # make named vectors for scale*_manual
    colourLabels <- setNames(c("mirror", "lottery"), c("mirror", "lottery"))

    # choose reference values depending on deviation type
    if (deviation == "absolute") {
      ref_red <- 1.32
      ref_purple <- 0.72
    } else if (deviation == "normalized") {
      ref_red <- 0
      ref_purple <- 0
    }
    hlines_df <- tibble::tibble(
      label = c("Reference (full mean)", "Reference (subject mean)"),
      y = c(ref_red, ref_purple)
    )

    # color mapping for regression lines and reference lines
    colorValues <- c(
      "mirror" = fillValues["mirror"], "lottery" = fillValues["lottery"],
      "Reference (full mean)" = "chartreuse4", "Reference (subject mean)" = "purple"
    )
    # Ensure consistent order
    colorLevels <- names(colorValues)

    # df <- df %>%
    #   mutate(aboveMedImpactCogLoad = factor(aboveMedImpactCogLoad))

    # if (deviation == 'normalized'){
    #   fillValues <- setNames(c("#00AFBB","#E7B800"), c(1, 0)) # make named vectors for scale*_manual
    #   fillLabels <- setNames(c("mirror","lottery"), c(1, 0))
    # }
    # else if (deviation == 'absolute'){
    #   fillValues <- setNames(c("#00AFBB","#E7B800"), c(1, 0))
    #   fillLabels <- setNames(c("mirror","lottery"), c(1, 0))
    # }
    types_present <- unique(as.character(df_plot$type))
    p <- ggplot(
      df_plot, aes(x = .data[[sp]], y = value, fill = factor(type))
      # df, aes(x= value, y=.data[[sp]], fill = factor(type))
    ) +
      geom_point(shape = 21, size = 3, stroke = 0.5, alpha = 0.7) + # , position = position_jitter(width = 0.02 , height = 0)
      geom_smooth(aes(x = .data[[sp]], y = value), colour = "black", method = "lm", se = FALSE, size = 0.8, show.legend = FALSE, na.rm = TRUE, inherit.aes = FALSE) +
      geom_smooth(aes(colour = factor(type), group = factor(type)), method = "lm", se = FALSE, size = 0.8, show.legend = FALSE, na.rm = TRUE) +
      # geom_smooth(aes(colour = aboveMedImpactCogLoad, group = aboveMedImpactCogLoad), method = "lm", se = FALSE, size = 0.8, show.legend = FALSE, na.rm = TRUE) +
      # horizontal reference lines as a data frame mapped to colour (so they get legend entries)
      labs(
        x = if (sp == "accuracy") {
          "accuracy span mpl"
        } else if (sp == "accuracy_mean_participant_overallSpanSpan") {
          "accuracy source and target span"
        } else if (sp == "accuracy_mean_participant_target") {
          "accuracy target span"
        } else if (sp == "impactCogLoad") {
          "accuracy source minus target span"
        } else {
          sp
        },
        y = "deviation"
      ) +
      scale_fill_manual(
        name = "Status",
        values = fillValues,
        labels = fillLabels,
        guide_legend(
          override.aes = list(linetype = 0)
        ),
        na.value = "grey70",
        drop = FALSE
      ) +
      scale_colour_manual(
        name = "Lines",
        values = colourValues, # needs a named vector. left of the "=" is the name of the element
        guide = "none",
        # breaks = colorLevels,
        na.value = "grey70",
        drop = FALSE
      ) +
      guides(
        fill = guide_legend(order = 1),
        colour = guide_legend(
          order = 2,
          override.aes = list(
            linetype = c("solid", "solid", "dashed", "dashed"),
            alpha = c(1, 1, 0.35, 0.35),
            size = c(0.8, 0.8, 0.7, 0.7),
            shape = rep(NA, 4)
          )
        )
      )

    if (deviation == "absolute") {
      p <- p + geom_hline(
        data = hlines_df, aes(yintercept = y[1], colour = "mindless"),
        linetype = "dashed", size = 0.7, alpha = 0.35, show.legend = TRUE, inherit.aes = FALSE
      ) +
        geom_hline(
          data = hlines_df, aes(yintercept = y[2], colour = "middle"),
          linetype = "dashed", size = 0.7, alpha = 0.35, show.legend = TRUE, inherit.aes = FALSE
        )
    }

    # compute regression stats per type (R^2 from lm, p-value using robust/clustered SE when appropriate)
    # stats_list <- list()
    types <- unique(df_plot$type)
    types <- append(types, "all", 0)
    labels <- list()

    for (t in types) {
      sub <- df_plot[df_plot$type == t & !is.na(df_plot$value) & !is.na(df_plot[[sp]]), ]
      if (nrow(sub) < 3) {
        # stats_list[[t]] <- list(b = NA_real_, se = NA_real_, p = NA_real_)
        labels[[t]] <- paste0(t, ": b=NA  se=NA p=NA")
        next
      }
      # avoid using .data inside formula: create temporary predictor column for lm
      sub <- sub %>% mutate(.x_for_lm = .data[[sp]])
      # lm for R2
      if (cluster == TRUE) {
        lm_mod <- try(lm_robust(value ~ .x_for_lm, data = sub, clusters = participant_id), silent = FALSE)
      } else if (cluster == FALSE) {
        lm_mod <- try(lm_robust(value ~ .x_for_lm, data = sub), silent = FALSE)
      }
      # cat("lm_mode call is ", deparse(summary(lm_mod)$call), " r2 lm_mod for sp ", sp, " type ", t," is ", summary(lm_mod)$r.squared," beta is ", summary(lm_mod)$coeff[".x_for_lm", "Estimate"],"p-value is ", summary(lm_mod)$coeff[1,'Pr(>|t|)'], "\n")
      if (inherits(lm_mod, "try-error")) {
        # stats_list[[t]] <- list(b = NA_real_, se = NA_real_, p = NA_real_)
        labels[[t]] <- paste0(t, ": b=NA se= NA p=NA")
        next
      }
      b_val <- summary(lm_mod)$coeff[".x_for_lm", "Estimate"]
      p_val <- summary(lm_mod)$coeff[".x_for_lm", "Pr(>|t|)"]
      se_val <- summary(lm_mod)$coeff[".x_for_lm", "Std. Error"]
      if (inherits(b_val, "try-error")) b_val <- NA_real_
      if (inherits(p_val, "try-error")) p_val <- NA_real_
      if (inherits(se_val, "try-error")) se_val <- NA_real_
      # compute p-value for slope with robust or clustered SE
      # stats_list[[t]] <- list(b = b_val, p = p_val, se <- se_val)
      labels[[t]] <- paste0(t, ": b=", ifelse(is.na(b_val), "NA", formatC(b_val, digits = 3, format = "f")), "  se=", ifelse(is.na(se_val), "NA", formatC(se_val, digits = 3, format = "f")), "  p=", ifelse(is.na(p_val), "NA", formatC(p_val, digits = 3, format = "f")))
    }
    if (cluster == FALSE) {
      cat(".data[[sp]] is ", sp, "\n")
      lm_mod_overall <- try(lm_robust(value ~ .x_for_lm, data = df_lm %>% mutate(.x_for_lm = .data[[sp]])))
      cat(
        "lm_mod_overall called with nobs= ", summary(lm_mod_overall)$nobs,
        " data has ", nrow(df_lm), " lines \n"
      )
    } else if (cluster == TRUE) {
      lm_mod_overall <- try(lm_robust(value ~ .x_for_lm,
        clusters = participant_id,
        data = df_plot %>% mutate(.x_for_lm = .data[[sp]])
      ))
    }
    cat("cluster== ", cluster, " sp is ", sp, "beta is ", summary(lm_mod_overall)$coeff[".x_for_lm", "Estimate"], " p-value is ", summary(lm_mod_overall)$coeff[".x_for_lm", "Pr(>|t|)"], " nobs= ", summary(lm_mod_overall)$nobs, "\n")
    if (inherits(lm_mod_overall, "try-error")) {
      labels[["all"]] <- "all: b = NA_real_, se = NA_real_, p = NA_real_"
      next
    } else {
      b_val <- summary(lm_mod_overall)$coeff[".x_for_lm", "Estimate"]
      p_val <- summary(lm_mod_overall)$coeff[".x_for_lm", "Pr(>|t|)"]
      se_val <- summary(lm_mod_overall)$coeff[".x_for_lm", "Std. Error"]
      if (inherits(b_val, "try-error")) b_val <- NA_real_
      if (inherits(p_val, "try-error")) p_val <- NA_real_
      if (inherits(se_val, "try-error")) se_val <- NA_real_

      labels[["all"]] <- paste0("all: b=", ifelse(is.na(b_val), "NA", formatC(b_val, digits = 3, format = "f")), "  se=", ifelse(is.na(se_val), "NA", formatC(se_val, digits = 3, format = "f")), "  p=", ifelse(is.na(p_val), "NA", formatC(p_val, digits = 3, format = "f")))
    }
    # build labels dataframe placed bottom-right, stacked (type1 above type2)
    val_min <- ifelse(is.finite(suppressWarnings(min(df_plot$value, na.rm = TRUE))), min(df_plot$value, na.rm = TRUE), 0)
    val_max <- ifelse(is.finite(suppressWarnings(max(df_plot$value, na.rm = TRUE))), max(df_plot$value, na.rm = TRUE), val_min + 1)
    y_range <- ifelse((val_max - val_min) == 0, 1, val_max - val_min)
    n_types <- length(types)
    line_h <- 0.1 * y_range
    y_positions <- val_min + 0.02 * y_range + seq(0, by = line_h, length.out = n_types) # bottom-up
    x_pos <- if (is.numeric(df_plot[[sp]])) max(df_plot[[sp]], na.rm = TRUE) else Inf
    df_labels <- tibble::tibble(
      type = types, # reverse so first type is on top (above)
      x = x_pos,
      y = y_positions,
      label = rev(unlist(labels))
    )

    # add single rich text layer (requires ggtext loaded)

    p <- p + ggtext::geom_richtext(
      data = df_labels, aes(x = x, y = y, label = label),
      hjust = 1, vjust = 0.5, fill = NA, label.color = NA,
      size = 3, inherit.aes = FALSE
    )
    return(p)
  }
  if (deviation == "absolute") {
    data_plot <- data %>%
      pivot_longer(
        cols = c(mirrorError, lotteryError),
        names_to = "type",
        values_to = "value"
      ) %>%
      mutate(
        type = if_else(str_detect(type, "mirror"), "mirror", "lottery"),
        rtChoice = if_else(type == "mirror", mirror_rtChoice, lottery_rtChoice),
        accuracy = if_else(type == "mirror", mirror_accuracy, lottery_accuracy)
      )
  } else if (deviation == "normalized") {
    data_plot <- data %>%
      pivot_longer(
        cols = c(wmirrorError, wlotteryError),
        names_to = "type",
        values_to = "value"
      ) %>%
      mutate(
        type = if_else(str_detect(type, "mirror"), "mirror", "lottery"),
        rtChoice = if_else(type == "mirror", mirror_rtChoice, lottery_rtChoice),
        accuracy = if_else(type == "mirror", mirror_accuracy, lottery_accuracy)
      )
  }
  if (deviation == "absolute") {
    data <- data %>% rename(
      value = mirrorAndLotteryError,
      accuracy = mean_spanMplAccuracy,
      rtChoice = mean_rtChoice
    )
  } else if (deviation == "normalized") {
    data <- data %>% rename(
      value = wmirrorAndlotteryError,
      accuracy = mean_spanMplAccuracy,
      rtChoice = mean_rtChoice
    )
  }
  data_plotHard <- data_plot %>% filter(treatment == "hard")
  data_lmHard <- data %>% filter(treatment == "hard")
  data_plotEasy <- data_plot %>% filter(treatment == "easy")
  data_lmEasy <- data %>% filter(treatment == "easy")

  p1 <- plotFunction(data_plot, data, span[[1]])
  p2 <- plotFunction(data_plot, data, span[[2]])
  p3 <- plotFunction(data_plot, data, span[[3]])
  p4 <- plotFunction(data_plot, data, span[[4]])
  #    p5 <- plotFunction(data_plot, data, span[[5]])
  #   p6 <- plotFunction(data_plot, data, span[[6]])

  p7 <- plotFunction(data_plotHard, data_lmHard, span[[1]])
  p8 <- plotFunction(data_plotHard, data_lmHard, span[[2]])
  p9 <- plotFunction(data_plotHard, data_lmHard, span[[3]])
  p10 <- plotFunction(data_plotHard, data_lmHard, span[[4]])
  #    p11 <- plotFunction(data_plotHard, data_lmHard, span[[5]])
  #    p12 <- plotFunction(data_plotHard, data_lmHard, span[[6]])

  p13 <- plotFunction(data_plotEasy, data_lmEasy, span[[1]])
  p14 <- plotFunction(data_plotEasy, data_lmEasy, span[[2]])
  p15 <- plotFunction(data_plotEasy, data_lmEasy, span[[3]])
  p16 <- plotFunction(data_plotEasy, data_lmEasy, span[[4]])
  #    p17 <- plotFunction(data_plotEasy, data_lmEasy, span[[5]])
  #    p18 <- plotFunction(data_plotEasy, data_lmEasy, span[[6]])


  # small column title grobs (empty plots with centered text)
  col_left <- ggplot() +
    annotate("text", x = 0.5, y = 0.5, label = "Pooled treatments", size = 4.5, fontface = "bold") +
    theme_void()
  col_mid <- ggplot() +
    annotate("text", x = 0.5, y = 0.5, label = "Cognitive load treatment", size = 4.5, fontface = "bold") +
    theme_void()
  col_right <- ggplot() +
    annotate("text", x = 0.5, y = 0.5, label = "Control treatment", size = 4.5, fontface = "bold") +
    theme_void()
  # / (p5|p11|p17) / (p6|p12|p18)
  combined <- (col_left | col_mid | col_right) / (p1 | p7 | p13) / (p2 | p8 | p14) / (p3 | p9 | p15) / (p4 | p10 | p16) + plot_layout(heights = c(0.2, 1, 1, 1, 1), guides = "collect") + plot_annotation(
    title = title,
  ) & theme(
    plot.title = element_text(face = "bold", size = 14, hjust = 0.5),
    plot.caption = ggtext::element_markdown(size = 12, hjust = 0)
  )

  return(combined)
}

# regressions when cluster = FALSE: for the overall one it is based on the mean level by subject (mirrors and lotteries pooled)
# regression when cluster = TRUE : for the overall one each particiapant has one point per task * mirror/lottery

lm_robust(wmirrorError ~ mirror_rtChoice, data = s_mpl_rescaled %>% filter(treatment == "hard" & aboveMedRtChoice == 0))


# makeScatterCogLoad(s_mpl, deviation = "normalized", title="Normalized eviations and cognitive load, subject level")
# makeScatterCogLoad(s_mpl_scatterCogLoadChoiceLevel, deviation = "normalized", title="Normalized eviations and cognitive load, choice level")
makeScatterCogLoad(s_mpl_scatterCogLoadChoiceLevel_rescaled, cluster = TRUE, deviation = "normalized", title = "Normalized deviations and cognitive load, choice level")
makeScatterCogLoad(s_mpl_scatterCogLoadChoiceLevel_rescaled, cluster = TRUE, deviation = "absolute", title = "Absolute deviations and cognitive load, choice level")
scatterDeviationsCogLoadAbsoluteChoiceLevel <- makeScatterCogLoad(s_mpl_scatterCogLoadChoiceLevel_rescaled, cluster = TRUE, deviation = "absolute", title = "Absolute deviation and cognitive load, choice level")
scatterDeviationsCogLoadNormalizedChoiceLevel <- makeScatterCogLoad(s_mpl_scatterCogLoadChoiceLevel_rescaled, cluster = TRUE, deviation = "normalized", title = "Normalized deviation and cognitive load, choice level")


## looking at impactCogLoad, subsetting at the median rt
medMeanRtChoice <- median(s_mpl_scatterCogLoadChoiceLevel_rescaled$mean_rtChoice) # 0.4750408
makeScatterCogLoad(s_mpl_scatterCogLoadChoiceLevel_rescaled[s_mpl_scatterCogLoadChoiceLevel_rescaled$mean_rtChoice < medMeanRtChoice, ], cluster = TRUE, deviation = "normalized", title = "Normalized deviations and cognitive load, choice level, rt<13,5s (=median)")
makeScatterCogLoad(s_mpl_scatterCogLoadChoiceLevel_rescaled[s_mpl_scatterCogLoadChoiceLevel_rescaled$mean_rtChoice < medMeanRtChoice, ], cluster = TRUE, deviation = "absolute", title = "Absolute deviations and cognitive load, choice level rt<13,5s (=median)")
makeScatterCogLoad(s_mpl_scatterCogLoadChoiceLevel_rescaled[s_mpl_scatterCogLoadChoiceLevel_rescaled$mean_rtChoice > medMeanRtChoice, ], cluster = TRUE, deviation = "normalized", title = "Normalized deviations and cognitive load, choice level, rt>13,5s (=median)")

makeScatterCogLoad(s_mpl_scatterCogLoadChoiceLevel_rescaled[s_mpl_scattes_mpl_scatterCogLoadChoiceLevel_rescaledrCogLoadChoiceLevel$mean_rtChoice > medMeanRtChoice, ], cluster = TRUE, deviation = "absolute", title = "Absolute deviations and cognitive load, choice level rt>13,5s (=median)")
makeScatterCogLoad(s_mpl_rescaled[s_mpl_rescaled$aboveMedRtChoice == 0, ], cluster = FALSE, deviation = "normalized", title = "Normalized deviation and cognitive load, subject level rt<13,5s (=median)")
makeScatterCogLoad(s_mpl_rescaled[s_mpl_rescaled$aboveMedRtChoice == 1, ], cluster = FALSE, deviation = "normalized", title = "Normalized deviation and cognitive load, subject level rt>13,5s (=median)")
makeScatterCogLoad(s_mpl_rescaled[s_mpl_rescaled$aboveMedRtChoice == 0, ], cluster = FALSE, deviation = "absolute", title = "Absolute deviation and cognitive load, subject level, rt<13,5s (=median)")
makeScatterCogLoad(s_mpl_rescaled[s_mpl_rescaled$aboveMedRtChoice == 1, ], cluster = FALSE, deviation = "normalized", span = c("impactCogLoad", "accuracy", "rtChoice", "maxSpan"), title = "Normalized deviation and cognitive load, subject level, rt>13,5s (=median)")
makeScatterCogLoad(s_mpl_rescaled[s_mpl_rescaled$aboveMedRtChoice == 1, ], cluster = FALSE, deviation = "absolute", title = "Absolute deviation and cognitive load, subject level, rt>13,5s (=median)")
##

# test without outliers
# subject level
scatterDeviationsCogLoadNormalizedAboveMedRtChoiceSubjectLevel <- makeScatterCogLoad(s_mpl_rescaled_withoutOutliers[s_mpl_rescaled_withoutOutliers$aboveMedRtChoice == 1, ], cluster = FALSE, deviation = "normalized", title = "Normalized deviation and cognitive load, subject level rt>13,5s (=median), without outliers")
scatterDeviationsCogLoadNormalizedAboveMedRtChoiceSubjectLevel
scatterDeviationsCogLoadNormalizedBelowMedRtChoiceSubjectLevel <- makeScatterCogLoad(s_mpl_rescaled_withoutOutliers[s_mpl_rescaled_withoutOutliers$aboveMedRtChoice == 0, ], cluster = FALSE, deviation = "normalized", title = "Normalized deviation and cognitive load, subject level rt<13,5s (=median), without outliers")
scatterDeviationsCogLoadNormalizedBelowMedRtChoiceSubjectLevel
scatterDeviationsCogLoadAbsoluteBelowMedRtChoiceSubjectLevel <- makeScatterCogLoad(s_mpl_rescaled_withoutOutliers[s_mpl_rescaled_withoutOutliers$aboveMedRtChoice == 1, ], cluster = FALSE, deviation = "absolute", title = "Absolute deviation and cognitive load, subject level rt>13,5s (=median), without outliers")
scatterDeviationsCogLoadAbsoluteBelowMedRtChoiceSubjectLevel
scatterDeviationsCogLoadAbsoluteBelowMedRtChoiceSubjectLevel <- makeScatterCogLoad(s_mpl_rescaled_withoutOutliers[s_mpl_rescaled_withoutOutliers$aboveMedRtChoice == 0, ], cluster = FALSE, deviation = "absolute", title = "Absolute deviation and cognitive load, subject level rt<13,5s (=median), without outliers")
scatterDeviationsCogLoadAbsoluteBelowMedRtChoiceSubjectLevel
scatterDeviationsCogLoadNormalizedSubjectLevel <- makeScatterCogLoad(s_mpl_rescaled_withoutOutliers, cluster = FALSE, deviation = "normalized", title = "Normalized deviations and cognitive load, subject level, without outliers")
scatterDeviationsCogLoadNormalizedSubjectLevel
scatterDeviationsCogLoadAbsoluteSubjectLevel <- makeScatterCogLoad(s_mpl_rescaled_withoutOutliers, cluster = FALSE, deviation = "absolute", title = "Absolute deviations and cognitive load, subject level, without outliers")
scatterDeviationsCogLoadAbsoluteSubjectLevel
# choice level
scatterDeviationsCogLoadNormalizedBelowMedRtChoiceChoiceLevel <- makeScatterCogLoad(s_mpl_scatterCogLoadChoiceLevel_rescaled_withoutOutliers[s_mpl_scatterCogLoadChoiceLevel_rescaled_withoutOutliers$aboveMedRtChoice == 1, ], cluster = TRUE, deviation = "normalized", title = "Normalized deviation and cognitive load, choice level rt>13,5s (=median), without outliers")
scatterDeviationsCogLoadNormalizedBelowMedRtChoiceChoiceLevel
scatterDeviationsCogLoadNormalizedBelowMedRtChoiceChoiceLevel <- makeScatterCogLoad(s_mpl_scatterCogLoadChoiceLevel_rescaled_withoutOutliers[s_mpl_scatterCogLoadChoiceLevel_rescaled_withoutOutliers$aboveMedRtChoice == 0, ], cluster = TRUE, deviation = "normalized", title = "Normalized deviation and cognitive load, choice level rt<13,5s (=median), without outliers")
scatterDeviationsCogLoadNormalizedBelowMedRtChoiceChoiceLevel
scatterDeviationsCogLoadAbsoluteBelowMedRtChoiceChoiceLevel <- makeScatterCogLoad(s_mpl_scatterCogLoadChoiceLevel_rescaled_withoutOutliers[s_mpl_scatterCogLoadChoiceLevel_rescaled_withoutOutliers$aboveMedRtChoice == 1, ], cluster = TRUE, deviation = "absolute", title = "Absolute deviation and cognitive load, choice level rt>13,5s (=median), without outliers")
scatterDeviationsCogLoadAbsoluteBelowMedRtChoiceChoiceLevel
scatterDeviationsCogLoadAbsoluteBelowMedRtChoiceChoiceLevel <- makeScatterCogLoad(s_mpl_scatterCogLoadChoiceLevel_rescaled_withoutOutliers[s_mpl_scatterCogLoadChoiceLevel_rescaled_withoutOutliers$aboveMedRtChoice == 0, ], cluster = TRUE, deviation = "absolute", title = "Absolute deviation and cognitive load, choice level rt<13,5s (=median), without outliers")
scatterDeviationsCogLoadAbsoluteBelowMedRtChoiceChoiceLevel
scatterDeviationsCogLoadNormalizedChoiceLevel <- makeScatterCogLoad(s_mpl_scatterCogLoadChoiceLevel_rescaled_withoutOutliers, cluster = TRUE, deviation = "normalized", title = "Normalized deviations and cognitive load, choice level, without outliers")
scatterDeviationsCogLoadNormalizedChoiceLevel
scatterDeviationsCogLoadAbsoluteChoiceLevel <- makeScatterCogLoad(s_mpl_scatterCogLoadChoiceLevel_rescaled_withoutOutliers, cluster = TRUE, deviation = "absolute", title = "Absolute deviations and cognitive load, choice level, without outliers")
scatterDeviationsCogLoadAbsoluteChoiceLevel
#


scatterDeviationsCogLoadNormalizedBelowMedRtChoiceSubjectLevel <- makeScatterCogLoad(s_mpl_rescaled[s_mpl_rescaled$aboveMedRtChoice == 0, ], cluster = FALSE, deviation = "normalized", title = "Normalized deviation and cognitive load, subject level rt<13,5s (=median)")
scatterDeviationsCogLoadNormalizedBelowMedRtChoiceSubjectLevel
scatterDeviationsCogLoadAbsoluteBelowMedRtChoiceSubjectLevel <- makeScatterCogLoad(s_mpl_rescaled[s_mpl_rescaled$aboveMedRtChoice == 0, ], cluster = FALSE, deviation = "absolute", title = "Absolute deviation and cognitive load, subject level, rt<13,5s (=median)")
scatterDeviationsCogLoadAbsoluteBelowMedRtChoiceSubjectLevel
scatterDeviationsCogLoadNormalizedAboveMedRtChoiceSubjectLevel <- makeScatterCogLoad(s_mpl_rescaled[s_mpl_rescaled$aboveMedRtChoice == 1, ], cluster = FALSE, deviation = "normalized", title = "Normalized deviation and cognitive load, subject level, rt>13,5s (=median)")
scatterDeviationsCogLoadAbsoluteAboveMedRtChoiceSubjectLevel <- makeScatterCogLoad(s_mpl_rescaled[s_mpl_rescaled$aboveMedRtChoice == 1, ], cluster = FALSE, deviation = "absolute", title = "Absolute deviation and cognitive load, subject level, rt>13,5s (=median)")
scatterDeviationsCogLoadAbsoluteAboveMedRtChoiceSubjectLevel
scatterDeviationsCogLoadNormalizedBelowMedRtChoiceChoiceLevel <- makeScatterCogLoad(s_mpl_scatterCogLoadChoiceLevel_rescaled[s_mpl_scatterCogLoadChoiceLevel_rescaled$aboveMedRtChoice == 0, ], cluster = TRUE, deviation = "normalized", title = "Normalized deviation and cognitive load, choice level rt<13,5s (=median)")
scatterDeviationsCogLoadAbsoluteBelowMedRtChoiceChoiceLevel <- makeScatterCogLoad(s_mpl_scatterCogLoadChoiceLevel_rescaled[s_mpl_scatterCogLoadChoiceLevel_rescaled$aboveMedRtChoice == 0, ], cluster = TRUE, deviation = "absolute", title = "Absolute deviation and cognitive load, choice level, rt<13,5s (=median)")
scatterDeviationsCogLoadNormalizedAboveMedRtChoiceChoiceLevel <- makeScatterCogLoad(s_mpl_scatterCogLoadChoiceLevel_rescaled[s_mpl_scatterCogLoadChoiceLevel_rescaled$aboveMedRtChoice == 1, ], cluster = TRUE, deviation = "normalized", title = "Normalized deviation and cognitive load, choice level, rt>13,5s (=median)")
scatterDeviationsCogLoadAbsoluteAboveMedRtChoiceChoiceLevel <- makeScatterCogLoad(s_mpl_scatterCogLoadChoiceLevel_rescaled[s_mpl_scatterCogLoadChoiceLevel_rescaled$aboveMedRtChoice == 1, ], cluster = TRUE, deviation = "absolute", title = "Absolute deviation and cognitive load, choice level, rt>13,5s (=median)") #
scatterDeviationsCogLoadAbsoluteAboveMedRtChoiceChoiceLevel
ggsave(
  filename = file.path(PATH_TO_DATA, "Figures_pilot3&4&5", "scatterDeviationsCogLoadNormalizedBelowMedRtChoiceSubjectLevel.pdf"),
  plot = scatterDeviationsCogLoadNormalizedBelowMedRtChoiceSubjectLevel, device = "pdf", width = 12, height = 10
)
ggsave(
  filename = file.path(PATH_TO_DATA, "Figures_pilot3&4&5", "scatterDeviationsCogLoadAbsoluteBelowMedRtChoiceSubjectLevel.pdf"),
  plot = scatterDeviationsCogLoadAbsoluteBelowMedRtChoiceSubjectLevel, device = "pdf", width = 12, height = 10
)
ggsave(
  filename = file.path(PATH_TO_DATA, "Figures_pilot3&4&5", "scatterDeviationsCogLoadNormalizedAboveMedRtChoiceSubjectLevel.pdf"),
  plot = scatterDeviationsCogLoadNormalizedAboveMedRtChoiceSubjectLevel, device = "pdf", width = 12, height = 10
)
ggsave(
  filename = file.path(PATH_TO_DATA, "Figures_pilot3&4&5", "scatterDeviationsCogLoadAbsoluteAboveMedRtChoiceSubjectLevel.pdf"),
  plot = scatterDeviationsCogLoadAbsoluteAboveMedRtChoiceSubjectLevel, device = "pdf", width = 12, height = 10
)
scatterDeviationsCogLoadAbsoluteAboveMedRtChoiceSubjectLevel
ggsave(
  filename = file.path(PATH_TO_DATA, "Figures_pilot3&4&5", "scatterDeviationsCogLoadNormalizedBelowMedRtChoiceChoiceLevel.pdf"),
  plot = scatterDeviationsCogLoadNormalizedBelowMedRtChoiceChoiceLevel, device = "pdf", width = 12, height = 10
)
ggsave(
  filename = file.path(PATH_TO_DATA, "Figures_pilot3&4&5", "scatterDeviationsCogLoadAbsoluteBelowMedRtChoiceChoiceLevel.pdf"),
  plot = scatterDeviationsCogLoadAbsoluteBelowMedRtChoiceChoiceLevel, device = "pdf", width = 12, height = 10
)
ggsave(
  filename = file.path(PATH_TO_DATA, "Figures_pilot3&4&5", "scatterDeviationsCogLoadNormalizedAboveMedRtChoiceChoiceLevel.pdf"),
  plot = scatterDeviationsCogLoadNormalizedAboveMedRtChoiceChoiceLevel, device = "pdf", width = 12, height = 10
)
ggsave(
  filename = file.path(PATH_TO_DATA, "Figures_pilot3&4&5", "scatterDeviationsCogLoadAbsoluteAboveMedRtChoiceChoiceLevel.pdf"),
  plot = scatterDeviationsCogLoadAbsoluteAboveMedRtChoiceChoiceLevel, device = "pdf", width = 12, height = 10
)

s_mpl %>%
  filter(aboveMedRtChoice == 0) %>%
  group_by(treatment) %>%
  summarise(
    n = n()
  )

# are people below medrtChoice less good ?
tibble::tibble(
  rt = c("above med RT", "under med RT"),
  mean_target = c(mean_target_aboveMedRtChoice, mean_target_belowMedRtChoice),
  mean_source = c(mean_source_aboveMedRtChoice, mean_source_belowMedRtChoice),
  source_minus_target = c(mean_source_minus_target_aboveMedRtChoice, mean_source_minus_target_belowMedRtChoice),
  mean_target_and_source = c(mean_target_and_source_aboveMedRtChoice, mean_target_and_source_belowMedRtChoice),
  mean_absoluteDeviation = c(mean_absoluteDeviation_aboveMedRtChoice, mean_absoluteDeviation_belowMedRtChoice),
  mean_normalizedDeviation = c(mean_normalizedDeviation_aboveMedRtChoice, mean_normalizedDeviation_belowMedRtChoice)
)
tibble::tibble(
  rt = c("above med RT", "under med RT"),
  median_target = c(median_target_aboveMedRtChoice, median_target_belowMedRtChoice),
  median_source = c(median_source_aboveMedRtChoice, median_source_belowMedRtChoice),
  median_source_minus_target = c(median_source_minus_target_aboveMedRtChoice, median_source_minus_target_belowMedRtChoice),
  median_target_and_source = c(median_target_and_source_aboveMedRtChoice, median_target_and_source_belowMedRtChoice)
)
mean_target_and_source_belowMedRtChoice <- mean(s_mpl[s_mpl$aboveMedRtChoice == 0 & s_mpl$treatment == "hard", ]$accuracy_mean_participant_overallSpanSpan)
mean_target_and_source_aboveMedRtChoice <- mean(s_mpl[s_mpl$aboveMedRtChoice == 1 & s_mpl$treatment == "hard", ]$accuracy_mean_participant_overallSpanSpan)
mean_source_minus_target_belowMedRtChoice <- mean(s_mpl[s_mpl$aboveMedRtChoice == 0 & s_mpl$treatment == "hard", ]$accuracy_mean_participant_source - s_mpl[s_mpl$aboveMedRtChoice == 0 & s_mpl$treatment == "hard", ]$accuracy_mean_participant_target)
mean_source_minus_target_aboveMedRtChoice <- mean(s_mpl[s_mpl$aboveMedRtChoice == 1 & s_mpl$treatment == "hard", ]$accuracy_mean_participant_source - s_mpl[s_mpl$aboveMedRtChoice == 1 & s_mpl$treatment == "hard", ]$accuracy_mean_participant_target)
mean_target_aboveMedRtChoice <- mean(s_mpl[s_mpl$aboveMedRtChoice == 1 & s_mpl$treatment == "hard", ]$accuracy_mean_participant_target) # 0.277590
mean_target_belowMedRtChoice <- mean(s_mpl[s_mpl$aboveMedRtChoice == 0 & s_mpl$treatment == "hard", ]$accuracy_mean_participant_target) # 0.2113095
mean_source_aboveMedRtChoice <- mean(s_mpl[s_mpl$aboveMedRtChoice == 1 & s_mpl$treatment == "hard", ]$accuracy_mean_participant_source) # 0.5128913
mean_source_belowMedRtChoice <- mean(s_mpl[s_mpl$aboveMedRtChoice == 0 & s_mpl$treatment == "hard", ]$accuracy_mean_participant_source) # 0.4872535
mean_absoluteDeviation_belowMedRtChoice <- mean(c(s_mpl[s_mpl$aboveMedRtChoice == 0 & s_mpl$treatment == "hard", ]$mirrorError, s_mpl[s_mpl$aboveMedRtChoice == 0 & s_mpl$treatment == "hard", ]$lotteryError))
mean_absoluteDeviation_aboveMedRtChoice <- mean(c(s_mpl[s_mpl$aboveMedRtChoice == 1 & s_mpl$treatment == "hard", ]$mirrorError, s_mpl[s_mpl$aboveMedRtChoice == 1 & s_mpl$treatment == "hard", ]$lotteryError))
mean_normalizedDeviation_belowMedRtChoice <- mean(c(s_mpl[s_mpl$aboveMedRtChoice == 0 & s_mpl$treatment == "hard", ]$wmirrorError, s_mpl[s_mpl$aboveMedRtChoice == 0 & s_mpl$treatment == "hard", ]$wlotteryError))
mean_normalizedDeviation_aboveMedRtChoice <- mean(c(s_mpl[s_mpl$aboveMedRtChoice == 1 & s_mpl$treatment == "hard", ]$wmirrorError, s_mpl[s_mpl$aboveMedRtChoice == 1 & s_mpl$treatment == "hard", ]$wlotteryError))


median_target_and_source_belowMedRtChoice <- median(s_mpl[s_mpl$aboveMedRtChoice == 0 & s_mpl$treatment == "hard", ]$accuracy_mean_participant_overallSpanSpan)
median_target_and_source_aboveMedRtChoice <- median(s_mpl[s_mpl$aboveMedRtChoice == 1 & s_mpl$treatment == "hard", ]$accuracy_mean_participant_overallSpanSpan)
median_source_minus_target_belowMedRtChoice <- median(s_mpl[s_mpl$aboveMedRtChoice == 0 & s_mpl$treatment == "hard", ]$accuracy_mean_participant_source - s_mpl[s_mpl$aboveMedRtChoice == 0 & s_mpl$treatment == "hard", ]$accuracy_mean_participant_target)
median_source_minus_target_aboveMedRtChoice <- median(s_mpl[s_mpl$aboveMedRtChoice == 1 & s_mpl$treatment == "hard", ]$accuracy_mean_participant_source - s_mpl[s_mpl$aboveMedRtChoice == 1 & s_mpl$treatment == "hard", ]$accuracy_mean_participant_target)
median_target_aboveMedRtChoice <- median(s_mpl[s_mpl$aboveMedRtChoice == 1 & s_mpl$treatment == "hard", ]$accuracy_mean_participant_target) # 0.277590
median_target_belowMedRtChoice <- median(s_mpl[s_mpl$aboveMedRtChoice == 0 & s_mpl$treatment == "hard", ]$accuracy_mean_participant_target) # 0.2113095
median_source_aboveMedRtChoice <- median(s_mpl[s_mpl$aboveMedRtChoice == 1 & s_mpl$treatment == "hard", ]$accuracy_mean_participant_source) # 0.5128913
median_source_belowMedRtChoice <- median(s_mpl[s_mpl$aboveMedRtChoice == 0 & s_mpl$treatment == "hard", ]$accuracy_mean_participant_source) # 0.4872535

summary(lm_robust(wmirrorError ~ mirror_rtChoice, data = s_mpl_rescaled))
makeScatterCogLoad(s_mpl_rescaled, cluster = FALSE, deviation = "normalized", title = "Normalized deviation and cognitive load, subject level")
makeScatterCogLoad(s_mpl_rescaled, cluster = FALSE, deviation = "absolute", title = "Absolute deviation and cognitive load, subject level")
scatterDeviationsCogLoadNormalizedSubjectLevel <- makeScatterCogLoad(s_mpl_rescaled, cluster = FALSE, deviation = "normalized", title = "Normalized deviation and cognitive load, subject level")
scatterDeviationsCogLoadAbsoluteSubjectLevel <- makeScatterCogLoad(s_mpl_rescaled, cluster = FALSE, deviation = "absolute", title = "Absolute deviation and cognitive load, subject level")
scatterDeviationsCogLoadNormalizedChoiceLevel <- makeScatterCogLoad(s_mpl_scatterCogLoadChoiceLevel_rescaled, cluster = TRUE, deviation = "normalized", title = "Normalized deviation and cognitive load, choice level")
scatterDeviationsCogLoadAbsoluteChoiceLevel <- makeScatterCogLoad(s_mpl_scatterCogLoadChoiceLevel_rescaled, cluster = TRUE, deviation = "absolute", title = "Absolute deviation and cognitive load, choice level")



ggsave(
  filename = file.path(PATH_TO_DATA, "Figures_pilot3&4&5", "scatterDeviationsCogLoadAbsoluteChoiceLevel.pdf"),
  plot = scatterDeviationsCogLoadAbsoluteChoiceLevel, device = "pdf", width = 12, height = 10
)
ggsave(
  filename = file.path(PATH_TO_DATA, "Figures_pilot3&4&5", "scatterDeviationsCogLoadNormalizedChoiceLevel.pdf"),
  plot = scatterDeviationsCogLoadNormalizedChoiceLevel, device = "pdf", width = 12, height = 10
)
ggsave(
  filename = file.path(PATH_TO_DATA, "Figures_pilot3&4&5", "scatterDeviationsCogLoadNormalizedSubjectLevel.pdf"),
  plot = scatterDeviationsCogLoadNormalizedSubjectLevel, device = "pdf", width = 12, height = 10
)
ggsave(
  filename = file.path(PATH_TO_DATA, "Figures_pilot3&4&5", "scatterDeviationsCogLoadAbsoluteSubjectLevel.pdf"),
  plot = scatterDeviationsCogLoadAbsoluteSubjectLevel, device = "pdf", width = 12, height = 10
)


# plot accuracy at target span vs impactCogLoad
ggplot(
  data = s_mpl,
  aes(x = impactCogLoad, y = accuracy_mean_participant_target, fill = treatment)
) +
  geom_point(shape = 21, colour = "black", size = 3, stroke = 0.5, alpha = 0.7) +
  scale_fill_manual(
    name = "Treatment", values = c("#00AFBB", "#E7B800"),
    labels = c("Easy", "Hard"),
    na.value = "grey70",
    drop = FALSE
  )

strengthDeviationAndCogLoadTable <- tibble(
  median_split = c("above median", "under median"),
  cogLoad_strength = c(mean(s_mpl[s_mpl$aboveMedImpactCogLoad == 1, ]$wmirrorAndlotteryError, na.rm = TRUE), mean(s_mpl[s_mpl$aboveMedImpactCogLoad == 0, ]$wmirrorAndlotteryError, na.rm = TRUE)),
  rtChoice = c(mean(s_mpl[s_mpl$aboveMedRtChoice == 1, ]$wmirrorAndlotteryError, na.rm = TRUE), mean(s_mpl[s_mpl$aboveMedRtChoice == 0, ]$wmirrorAndlotteryError, na.rm = TRUE))
)
strengthDeviationAndCogLoadTable <- tibble(
  median_split = c("above median", "under median"),
  cogLoad_strength = c(mean(s_mpl[s_mpl$aboveMedImpactCogLoad == 1, ]$wmirrorError, na.rm = TRUE), mean(s_mpl[s_mpl$aboveMedImpactCogLoad == 0, ]$wmirrorError, na.rm = TRUE)),
  rtChoice = c(mean(s_mpl[s_mpl$aboveMedRtChoice == 1, ]$wmirrorError, na.rm = TRUE), mean(s_mpl[s_mpl$aboveMedRtChoice == 0, ]$wmirrorError, na.rm = TRUE))
)
strengthDeviationAndCogLoadTable <- tibble(
  median_split = c("above median", "under median"),
  cogLoad_strength = c(mean(s_mpl[s_mpl$aboveMedImpactCogLoad == 1, ]$wlotteryError, na.rm = TRUE), mean(s_mpl[s_mpl$aboveMedImpactCogLoad == 0, ]$wlotteryError, na.rm = TRUE)),
  rtChoice = c(mean(s_mpl[s_mpl$aboveMedRtChoice == 1, ]$wlotteryError, na.rm = TRUE), mean(s_mpl[s_mpl$aboveMedRtChoice == 0, ]$wlotteryError, na.rm = TRUE))
)
strengthDeviationAndCogLoadTable

strengthDeviationAndCogLoadTable_hard <- tibble(
  median_split = c("above median", "under median"),
  cogLoad_strength = c(mean(s_mpl[s_mpl$aboveMedImpactCogLoad == 1 & s_mpl$treatment == "hard", ]$wmirrorAndlotteryError, na.rm = TRUE), mean(s_mpl[s_mpl$aboveMedImpactCogLoad == 0 & s_mpl$treatment == "hard", ]$wmirrorAndlotteryError, na.rm = TRUE)),
  rtChoice = c(mean(s_mpl[s_mpl$aboveMedRtChoice == 1 & s_mpl$treatment == "hard", ]$wmirrorAndlotteryError, na.rm = TRUE), mean(s_mpl[s_mpl$aboveMedRtChoice == 0 & s_mpl$treatment == "hard", ]$wmirrorAndlotteryError, na.rm = TRUE))
)
# look if cognitive load increases variability in mirror and lottery
# variability in mirror : more noise under the median for RT and cog load
strengthDeviationAndCogLoadTable <- tibble(
  median_split = c("above median", "under median"),
  cogLoad_strength = c(sd(s_mpl[s_mpl$aboveMedImpactCogLoad == 1, ]$wmirrorError, na.rm = TRUE), sd(s_mpl[s_mpl$aboveMedImpactCogLoad == 0, ]$wmirrorError, na.rm = TRUE)),
  rtChoice = c(sd(s_mpl[s_mpl$aboveMedRtChoice == 1, ]$wmirrorError, na.rm = TRUE), sd(s_mpl[s_mpl$aboveMedRtChoice == 0, ]$wmirrorError, na.rm = TRUE))
)

# variability in lottery : more noise above median for RT and cog load
strengthDeviationAndCogLoadTable <- tibble(
  median_split = c("above median", "under median"),
  cogLoad_strength = c(sd(s_mpl[s_mpl$aboveMedImpactCogLoad == 1, ]$wlotteryError, na.rm = TRUE), sd(s_mpl[s_mpl$aboveMedImpactCogLoad == 0, ]$wlotteryError, na.rm = TRUE)),
  rtChoice = c(sd(s_mpl[s_mpl$aboveMedRtChoice == 1, ]$wlotteryError, na.rm = TRUE), sd(s_mpl[s_mpl$aboveMedRtChoice == 0, ]$wlotteryError, na.rm = TRUE))
)
strengthDeviationAndCogLoadTable







dataForBarPlot <- dfA %>%
  filter(!mplType %in% c(
    "GS10", "GS25", "GS50", "GS75", "GS90",
    "LS10", "LS25", "LS50", "LS75", "LS90",
    "AS10", "AS15", "GO10", "GO90"
  )) %>% # "A10", "A15"
  filter(!grepl("50", mplType)) %>% # G and L50 are not included because they aren't part of the fourfold pattern
  # filter(!is.na(lottery_ev)&!is.na(mirror_ev))%>%
  group_by(isLotteryFirst, participant_id) %>%
  summarise(
    rtChoice = (mean(lottery_rtChoice, na.rm = TRUE) + mean(mirror_rtChoice, na.rm = TRUE)) / 2, # equal weight on lotteries and mirrors
    treatment = first(treatment),
    absoluteDeviation = (mean(abs(mirror_ev - pred), na.rm = TRUE) + mean(abs(lottery_ev - pred), na.rm = TRUE)) / 2,
    normalizedDeviation = (mean(multiplier * (mirror_ev - pred), na.rm = TRUE) + mean(multiplier * (lottery_ev - pred), na.rm = TRUE)) / 2,
    aboveMedRtChoice = unique(aboveMedRtChoice)[[1]],
    aboveMedImpactCogLoad = unique(aboveMedImpactCogLoad)[[1]],
    accuracy = (mean(mirror_accuracy, na.rm = TRUE) + mean(lottery_accuracy, na.rm = TRUE)) / 2, ,
    .groups = "drop"
  ) %>%
  left_join(
    final_data_2 %>%
      filter(
        block == "spanSpan" & task == "spanTest"
      ) %>%
      group_by(subject) %>%
      summarise(
        accuracy_mean_participant_source = mean(accuracy[letterType == 1], na.rm = TRUE),
        accuracy_mean_participant_target = mean(accuracy[letterType == 2], na.rm = TRUE),
        .groups = "drop"
      ) %>%
      mutate(
        impactCogLoad = accuracy_mean_participant_source - accuracy_mean_participant_target
      ) %>%
      rename(participant_id = subject),
    by = "participant_id"
  )

dataForBarPlot_lotteries <- dfA %>%
  filter(!mplType %in% c(
    "GS10", "GS25", "GS50", "GS75", "GS90",
    "LS10", "LS25", "LS50", "LS75", "LS90",
    "AS10", "AS15", "GO10", "GO90"
  )) %>% # "A10", "A15"
  filter(!grepl("50", mplType)) %>% # G and L50 are not included because they aren't part of the fourfold pattern
  # filter(!is.na(lottery_ev)&!is.na(mirror_ev))%>%
  group_by(isLotteryFirst, participant_id) %>%
  summarise(
    rtChoice = mean(mirror_rtChoice, na.rm = TRUE), # equal weight on lotteries and mirrors
    treatment = first(treatment),
    absoluteDeviation = mean(abs(mirror_ev - pred), na.rm = TRUE),
    normalizedDeviation = mean(multiplier * (mirror_ev - pred), na.rm = TRUE),
    aboveMedRtChoice = unique(aboveMedRtChoice)[[1]],
    aboveMedImpactCogLoad = unique(aboveMedImpactCogLoad)[[1]],
    accuracy = mean(mirror_accuracy, na.rm = TRUE), ,
    .groups = "drop"
  ) %>%
  left_join(
    final_data_2 %>%
      filter(
        block == "spanSpan" & task == "spanTest"
      ) %>%
      group_by(subject) %>%
      summarise(
        accuracy_mean_participant_source = mean(accuracy[letterType == 1], na.rm = TRUE),
        accuracy_mean_participant_target = mean(accuracy[letterType == 2], na.rm = TRUE),
        .groups = "drop"
      ) %>%
      mutate(
        impactCogLoad = accuracy_mean_participant_source - accuracy_mean_participant_target
      ) %>%
      rename(participant_id = subject),
    by = "participant_id"
  )

dataForBarPlotWOutliers <- dataForBarPlot %>%
  filter(!(impactCogLoad < (-0.1)))
length(unique(dataForBarPlotWOutliers$participant_id)) # 43




# Plot the difference between hard and easy treatments in terms of absolute and normalized deviations
# Create the plot: accuracy source vs target in cog load vs control condition

makeBarplotDeviationsByTreatments <- function(data) {
  # helper function to compute one row per deviation type
  make_row <- function(data, deviation_var, deviation_label) {
    summary_wide <- data %>%
      group_by(treatment) %>%
      summarise(
        n = sum(!is.na(.data[[deviation_var]])),
        mean = mean(.data[[deviation_var]], na.rm = TRUE),
        se = sd(.data[[deviation_var]], na.rm = TRUE) / sqrt(n),
        .groups = "drop"
      ) %>%
      pivot_wider(
        names_from = treatment,
        values_from = c(n, mean, se),
        names_glue = "{.value}_{treatment}"
      )
    cat(
      "se_hard with deviation ", deviation_var, "is ", summary_wide$se_hard, "\n ",
      "n_hard is", summary_wide$n_hard, "\n ",
      "mean_hard is ", summary_wide$mean_hard, "\n "
    )

    # compute p-value using a safe formula (avoid .data pronoun inside formula)
    fml <- as.formula(paste0(deviation_var, " ~ treatment"))
    p_val <- tryCatch(
      {
        wilcox.test(fml, data = data, exact = FALSE)$p.value
      },
      error = function(e) NA_real_
    )


    summary_wide %>%
      mutate(
        deviation_type = deviation_label,
        p_value = p_val
      )
  }

  rowAbsolute <- make_row(
    data,
    deviation_var = "absoluteDeviation",
    deviation_label = "absolute"
  )

  rowNormalized <- make_row(
    data,
    deviation_var = "normalizedDeviation",
    deviation_label = "normalized"
  )

  dfGG <- bind_rows(rowAbsolute, rowNormalized)


  plots <- list()

  for (i in 1:nrow(dfGG)) {
    row <- dfGG[i, ]

    df_plot <- tibble::tibble(
      treatment = c("hard", "easy"), deviation = c(row$mean_hard, row$mean_easy), se = c(row$se_hard, row$se_easy)
    )

    manual_p <- tibble(
      group1 = "hard", group2 = "easy",
      p = round(row$p_value, 3)
    )

    p_i <- ggbarplot(
      df_plot,
      x = "treatment",
      y = "deviation",
      color = "treatment",
      fill = "treatment",
      palette = c("#00AFBB", "#E7B800"), #
      position = position_dodge(0.8),
      alpha = 0.2,
      size = 0.8,
      width = 0.6,
    ) +
      geom_errorbar(
        aes(ymin = deviation - se, ymax = deviation + se),
        width = 0.2,
        position = position_dodge(0.8)
      ) +
      # Add statistical comparison
      stat_pvalue_manual(
        manual_p,
        label = "p = {p}",
        tip.length = -0.01,
        y.position = max(df_plot$deviation, na.rm = TRUE) - 0.2
      ) +
      # Customize appearance
      labs(
        title = paste0(dfGG[i, ]$deviation_type, " deviation"),
        # subtitle = paste0("n = ", desc_stats$n[1], " participants"),
        y = "deviation",
      ) +
      theme_pubr() +
      theme(
        legend.position = "none",
        # plot.title = element_text(hjust = 0.5),
        # plot.subtitle = element_text(hjust = 0.5)
        plot.caption = ggtext::element_markdown(
          hjust = 0,
          lineheight = 1.1
        )
      )
    plots[[i]] <- p_i
  }
  combined <- (plots[[1]] | plots[[2]]) + plot_layout(heights = 1, guides = "collect") + plot_annotation(
    title = "Mean deviation at the subject level, depending on the treatment",
    caption = "Error bars = s.e. of the mean on each side\np-value = wilcoxon's test unpaired"
  ) & theme(
    plot.title = element_text(face = "bold", size = 14, hjust = 0.5),
    # plot.caption = ggtext::element_markdown(size = 12, hjust = 0)
  )

  return(combined)
}

barplotDeviationsByTreatments <- makeBarplotDeviationsByTreatments(dataForBarPlot)
barplotDeviationsByTreatments

ggsave(
  filename = file.path(PATH_TO_DATA, "Figures_pilot3&4&5", "barplotDeviationsByTreatments.pdf"),
  plot = barplotDeviationsByTreatments, device = "pdf", width = 8, height = 5
)






abs_tbl <- s_mpl %>%
  pivot_longer(
    cols = c(mirrorError, lotteryError),
    names_to = "type",
    values_to = "deviation_absolute"
  ) %>%
  mutate(
    type = if_else(str_detect(type, "mirror"), "mirror", "lottery"),
    rtChoice = if_else(type == "mirror", mirror_rtChoice, lottery_rtChoice), # seconds
    accuracy = if_else(type == "mirror", mirror_accuracy, lottery_accuracy),
    treatment = factor(treatment),
    treatment = relevel(treatment, ref = "easy")
  )

norm_tbl <- s_mpl %>%
  pivot_longer(
    cols = c(wmirrorError, wlotteryError),
    names_to = "type",
    values_to = "deviation_normalized"
  ) %>%
  mutate(
    type = if_else(str_detect(type, "mirror"), "mirror", "lottery"),
    rtChoice = if_else(type == "mirror", mirror_rtChoice, lottery_rtChoice), # seconds
  ) %>%
  select(participant_id, type, deviation_normalized)

dataLm <- abs_tbl %>%
  left_join(norm_tbl, by = c("participant_id", "type")) %>%
  rename(
    absoluteDeviation = deviation_absolute,
    normalizedDeviation = deviation_normalized
  )
dataLmWOutliers <- dataLm %>% filter(!impactCogLoad < (-0.1))
length(unique(dataLmWOutliers$participant_id)) # 43

s_mpl_scatterCogLoadChoiceLevel_toPivot <- s_mpl_scatterCogLoadChoiceLevel %>%
  mutate(trial = row_number())

abs_tbl_choice <- s_mpl_scatterCogLoadChoiceLevel_toPivot %>%
  pivot_longer(
    cols = c(mirrorError, lotteryError),
    names_to = "type",
    values_to = "deviation_absolute"
  ) %>%
  mutate(
    type = if_else(str_detect(type, "mirror"), "mirror", "lottery"),
    rtChoice = if_else(type == "mirror", mirror_rtChoice, lottery_rtChoice), # seconds
    accuracy = if_else(type == "mirror", mirror_accuracy, lottery_accuracy),
    treatment = factor(treatment),
    treatment = relevel(treatment, ref = "easy")
  )

norm_tbl_choice <- s_mpl_scatterCogLoadChoiceLevel_toPivot %>%
  pivot_longer(
    cols = c(wmirrorError, wlotteryError),
    names_to = "type",
    values_to = "deviation_normalized"
  ) %>%
  mutate(
    type = if_else(str_detect(type, "mirror"), "mirror", "lottery"),
    rtChoice = if_else(type == "mirror", mirror_rtChoice, lottery_rtChoice), # seconds
  ) %>%
  select(participant_id, type, deviation_normalized, trial)

dataLmChoice <- abs_tbl_choice %>%
  left_join(norm_tbl_choice, by = c("participant_id", "type", "trial")) %>%
  rename(
    absoluteDeviation = deviation_absolute,
    normalizedDeviation = deviation_normalized
  )
head(dataLmChoice$rtChoice)

dataLmChoiceWOutliers <- dataLmChoice %>% filter(!(impactCogLoad < (-0.1)))
length(unique(dataLmChoiceWOutliers$participant_id)) # 43
length(unique(dataLmChoice$participant_id)) # 45

makeScatterVariables_rt <- function(data, span = c("treatment", "accuracy", "impactCogLoad", "maxSpan"), title = NULL, cluster = FALSE) {
  # data: dataframe containing rtChoice and the variables in `span`
  # cluster: if TRUE and participant_id present, use clustered vcov for p-values
  requireNamespace("lmtest")
  requireNamespace("sandwich")

  make_panel <- function(df, sp) {
    if (!sp %in% names(df)) {
      return(ggplot() +
        annotate("text", x = 0.5, y = 0.5, label = paste0("Variable '", sp, "' not found"), size = 4) +
        theme_void())
    }
    df <- df %>% filter(!is.na(rtChoice))
    if (nrow(df) == 0) {
      return(ggplot() +
        annotate("text", x = 0.5, y = 0.5, label = "No data", size = 4) +
        theme_void())
    }

    # Categorical -> boxplot (treatment or other factor)
    if (is.character(df[[sp]]) || is.factor(df[[sp]]) || sp == "treatment") {
      p <- ggplot(df, aes_string(x = paste0("factor(", sp, ")"), y = "rtChoice", fill = sp)) +
        geom_boxplot(alpha = 0.25, outlier.shape = NA) +
        geom_jitter(width = 0.15, height = 0, size = 0.8, aes_string(colour = sp)) +
        labs(x = sp, y = "rtChoice") +
        theme_pubr() +
        theme(legend.position = "none")
      return(p)
    }

    # Numeric -> scatter: rtChoice (x) vs sp (y)
    labs_y <- tibble::tibble()
    df_num <- df %>% filter(!is.na(.data[[sp]]))
    p <- ggplot(df_num, aes(x = rtChoice, y = .data[[sp]])) +
      geom_point(shape = 21, colour = "black", fill = "#2c7fb8", size = 2.4, alpha = 0.8) +
      geom_smooth(method = "lm", se = FALSE, colour = "red", na.rm = TRUE) +
      labs(x = "rtChoice", y = paste0(ifelse(sp == "impactCogLoad", "accuracy source minus target", sp))) +
      theme_pubr() +
      theme(legend.position = "none")

    # compute lm stats (p-value for slope).
    label_text <- "nana"
    if (nrow(df_num) >= 3) {
      cat("nrow df_num >=3)")
      fml <- as.formula(paste0(sp, " ~ rtChoice"))
      lm_mod <- try(lm_robust(fml, data = df_num, clusters = participant_id), silent = FALSE)

      if (inherits(lm_mod, "try-error")) {
        label_text <- "all: b = NA_real_, se = NA_real_, p = NA_real_"
        next
      } else {
        b_val <- summary(lm_mod)$coeff["rtChoice", "Estimate"]
        p_val <- summary(lm_mod)$coeff["rtChoice", "Pr(>|t|)"]
        se_val <- summary(lm_mod)$coeff["rtChoice", "Std. Error"]
        if (inherits(b_val, "try-error")) b_val <- NA_real_
        if (inherits(p_val, "try-error")) p_val <- NA_real_
        if (inherits(se_val, "try-error")) se_val <- NA_real_

        label_text <- paste0("all: b=", ifelse(is.na(b_val), "NA", formatC(b_val, digits = 3, format = "f")), "  se=", ifelse(is.na(se_val), "NA", formatC(se_val, digits = 3, format = "f")), "  p=", ifelse(is.na(p_val), "NA", formatC(p_val, digits = 3, format = "f")))
      }
    }

    # place annotation at bottom-right of the panel
    x_pos <- ifelse(length(na.omit(df_num$rtChoice)) > 0, max(df_num$rtChoice, na.rm = TRUE), Inf)
    y_pos <- ifelse(length(na.omit(df_num[[sp]])) > 0, min(df_num[[sp]], na.rm = TRUE), Inf)
    p <- p + annotate("text", x = x_pos, y = y_pos, label = label_text, hjust = 1.02, vjust = -0.2, size = 3, colour = "black")
    return(p)
  }

  # build panels for pooled / hard / easy for each span variable
  rows <- lapply(span, function(sp) {
    p_pool <- make_panel(data, sp)
    p_hard <- make_panel(dplyr::filter(data, treatment == "hard"), sp)
    p_easy <- make_panel(dplyr::filter(data, treatment == "easy"), sp)
    p_pool | p_hard | p_easy
  })

  # stack rows vertically; each row is a 3-column patchwork
  combined <- patchwork::wrap_plots(rows, ncol = 1) +
    plot_annotation(title = title %||% "") &
    theme(plot.title = element_text(face = "bold", size = 14, hjust = 0.5, vjust = 1.5))

  return(combined)
}

makeScatterVariables_icl <- function(data, span = c("treatment", "accuracy", "rtChoice", "maxSpan"), title = NULL, cluster = FALSE) {
  # data: dataframe containing rtChoice and the variables in `span`
  # cluster: if TRUE and participant_id present, use clustered vcov for p-values
  requireNamespace("lmtest")
  requireNamespace("sandwich")

  make_panel <- function(df, sp) {
    if (!sp %in% names(df)) {
      return(ggplot() +
        annotate("text", x = 0.5, y = 0.5, label = paste0("Variable '", sp, "' not found"), size = 4) +
        theme_void())
    }
    df <- df %>% filter(!is.na(rtChoice))
    if (nrow(df) == 0) {
      return(ggplot() +
        annotate("text", x = 0.5, y = 0.5, label = "No data", size = 4) +
        theme_void())
    }

    # Categorical -> boxplot (treatment or other factor)
    if (is.character(df[[sp]]) || is.factor(df[[sp]]) || sp == "treatment") {
      p <- ggplot(df, aes_string(x = paste0("factor(", sp, ")"), y = "impactCogLoad", fill = sp)) +
        geom_boxplot(alpha = 0.25, outlier.shape = NA) +
        geom_jitter(width = 0.15, height = 0, size = 0.8, aes_string(colour = sp)) +
        labs(x = sp, y = "accuracy source minus target") +
        theme_pubr() +
        theme(legend.position = "none")
      return(p)
    }

    # Numeric -> scatter: rtChoice (x) vs sp (y)
    df_num <- df %>% filter(!is.na(.data[[sp]]))
    p <- ggplot(df_num, aes(x = impactCogLoad, y = .data[[sp]])) +
      geom_point(shape = 21, colour = "black", fill = "#2c7fb8", size = 2.4, alpha = 0.8) +
      geom_smooth(method = "lm", se = FALSE, colour = "red", na.rm = TRUE) +
      labs(x = "accuracy source minus target", y = sp) +
      theme_pubr() +
      theme(legend.position = "none")

    # compute lm stats (R2 and p-value for slope). Use clustered s.e.
    label_text <- "p=NA b=NA s.e. = NA"
    if (nrow(df_num) >= 3) {
      cat("nrow df_num >=3)")
      fml <- as.formula(paste0(sp, " ~ impactCogLoad"))
      lm_mod <- try(lm_robust(fml, data = df_num, clusters = participant_id), silent = FALSE)

      if (inherits(lm_mod, "try-error")) {
        label_text <- "all: b = NA_real_, se = NA_real_, p = NA_real_"
        next
      } else {
        b_val <- summary(lm_mod)$coeff["impactCogLoad", "Estimate"]
        p_val <- summary(lm_mod)$coeff["impactCogLoad", "Pr(>|t|)"]
        se_val <- summary(lm_mod)$coeff["impactCogLoad", "Std. Error"]
        if (inherits(b_val, "try-error")) b_val <- NA_real_
        if (inherits(p_val, "try-error")) p_val <- NA_real_
        if (inherits(se_val, "try-error")) se_val <- NA_real_

        label_text <- paste0("all: b=", ifelse(is.na(b_val), "NA", formatC(b_val, digits = 3, format = "f")), "  se=", ifelse(is.na(se_val), "NA", formatC(se_val, digits = 3, format = "f")), "  p=", ifelse(is.na(p_val), "NA", formatC(p_val, digits = 3, format = "f")))
      }
    }

    # place annotation at bottom-right of the panel
    x_pos <- ifelse(length(na.omit(df_num$impactCogLoad)) > 0, max(df_num$impactCogLoad, na.rm = TRUE), Inf)
    y_pos <- ifelse(length(na.omit(df_num[[sp]])) > 0, min(df_num[[sp]], na.rm = TRUE), Inf)
    p <- p + annotate("text", x = x_pos, y = y_pos, label = label_text, hjust = 1.02, vjust = -0.2, size = 3, colour = "black")
    return(p)
  }

  # build panels for pooled / hard / easy for each span variable
  rows <- lapply(span, function(sp) {
    p_pool <- make_panel(data, sp)
    p_hard <- make_panel(dplyr::filter(data, treatment == "hard"), sp)
    p_easy <- make_panel(dplyr::filter(data, treatment == "easy"), sp)
    p_pool | p_hard | p_easy
  })

  # stack rows vertically; each row is a 3-column patchwork
  combined <- patchwork::wrap_plots(rows, ncol = 1) +
    plot_annotation(title = title %||% "") &
    theme(plot.title = element_text(face = "bold", size = 14, hjust = 0.5, vjust = 1.5))

  return(combined)
}
dataLmRescaled <- dataLm %>%
  mutate(rtChoice = rtChoice / 30000)

scatterVariables_rt <- makeScatterVariables_rt(data = dataLmRescaled, title = "Correlation between variables related to cognitive load and rtChoice")
scatterVariables_rt
scatterVariables_icl <- makeScatterVariables_icl(data = dataLmRescaled, title = "Correlation between variables related to cognitive load and cognitive load sensitivity")
scatterVariables_icl
ggsave(
  filename = file.path(PATH_TO_DATA, "Figures_pilot3&4&5", "scatterVariables_rt.pdf"),
  plot = scatterVariables_rt, device = "pdf", width = 12, height = 11
)
ggsave(
  filename = file.path(PATH_TO_DATA, "Figures_pilot3&4&5", "scatterVariables_icl.pdf"),
  plot = scatterVariables_icl, device = "pdf", width = 12, height = 11
)




# all data points

makePpPlot <- function(data, choice_level = TRUE, deviation_type, treatment = NULL) {
  if (is.null(treatment)) {
    data <- data %>% mutate(rowNumber = row_number(), deviation = .data[[deviation_type]])
  } else if (treatment == "hard") {
    data <- data %>%
      filter(treatment == "hard") %>%
      mutate(rowNumber = row_number(), deviation = .data[[deviation_type]])
  } else if (treatment == "easy") {
    data <- data %>%
      filter(treatment == "easy") %>%
      mutate(rowNumber = row_number(), deviation = .data[[deviation_type]])
  }
  title_text <- if (is.null(treatment)) {
    paste0(deviation_type, " rtChoice and sensitivity to cognitive load")
  } else if (treatment == "hard") {
    paste0(deviation_type, ", rtChoice and sensitivity to cognitive load in treatment cognitive load")
  } else if (treatment == "easy") {
    paste0(deviation_type, ", rtChoice and sensitivity to cognitive load in treatment no cognitive load")
  }


  caption_text <- paste0(
    "<span style='color:black;'>Black lines: </span>", deviation_type, "<br>",
    ". <span style='color:Orange;'>orange lines: </span>rtChoice,<br>",
    "<span style='color:red;'>Red lines: </span>impactCogLoad.<br>",
    "<span style='color:lightblue;'>Lightblue lines: </span>span mpl accuracy.<br>",
    if (deviation_type == "normalizedDeviation") {
      "Deviations and rtChoice rescaled from -5:5 and 0:30 to 0:1"
    } else {
      "Deviations and rtChoice rescaled from 0:5 and 0:30 to 0:1."
    },
    if (choice_level == FALSE) {
      "<br> Each line is composed of the mirror (left-hand side) and lottery mean points of a participant"
    }
  )

  p <- ggplot(aes(x = rowNumber, y = deviation, group = participant_id), data = data) + # data=dataForPpPlot_choice[dataForPpPlot_choice$treatment=="hard",]
    geom_line(alpha = 1, aes(x = rowNumber, y = rtChoice), colour = "orange") +
    geom_line(alpha = 1, aes(x = rowNumber, y = impactCogLoad), colour = "red") +
    geom_line(alpha = 1, aes(x = rowNumber, y = accuracy), colour = "lightblue") +
    geom_line(alpha = 1, colour = "black") +
    labs(
      y = "",
      x = "choices",
      title = title_text,
      caption = caption_text
    ) + # adjust fonts depending on granularity: larger for choice-level, smaller for subject-level
    {
      caption_size <- ifelse(isTRUE(choice_level), 20, 10)
      base_size <- ifelse(isTRUE(choice_level), 27, 13)
      p_tmp <- theme_pubr(base_size = base_size)
      p_tmp <- p_tmp + theme(
        legend.position = "none",
        plot.caption = ggtext::element_markdown(size = caption_size, family = "sans"),
        plot.title = element_text(size = base_size + 0, face = "bold"),
        axis.title = element_text(size = base_size - 1),
        axis.text = element_text(size = base_size - 2)
      )
    }
  return(p)
}
ppPlot_p_choi_abs <- makePpPlot(data = dataForPpPlot_choice, choice_level = TRUE, deviation_type = "absoluteDeviation", treatment = NULL)
ppPlot_p_choi_abs
ppPlot_p_choi_nor <- makePpPlot(data = dataForPpPlot_choice, choice_level = TRUE, deviation_type = "normalizedDeviation", treatment = NULL)
ppPlot_p_choi_nor
ppPlot_p_subj_abs <- makePpPlot(data = dataForPpPlot, choice_level = FALSE, deviation_type = "absoluteDeviation", treatment = NULL)
ppPlot_p_subj_abs
ppPlot_p_subj_nor <- makePpPlot(data = dataForPpPlot, choice_level = FALSE, deviation_type = "normalizedDeviation", treatment = NULL)
ppPlot_p_subj_nor
ppPlot_h_choi_abs <- makePpPlot(data = dataForPpPlot_choice, choice_level = TRUE, deviation_type = "absoluteDeviation", treatment = "hard")
ppPlot_h_choi_abs
ppPlot_e_choi_abs <- makePpPlot(data = dataForPpPlot_choice, choice_level = TRUE, deviation_type = "absoluteDeviation", treatment = "easy")
ppPlot_e_choi_abs
ppPlot_h_subj_abs <- makePpPlot(data = dataForPpPlot, choice_level = FALSE, deviation_type = "absoluteDeviation", treatment = "hard")
ppPlot_h_subj_abs
ppPlot_e_subj_abs <- makePpPlot(data = dataForPpPlot, choice_level = FALSE, deviation_type = "absoluteDeviation", treatment = "easy")
ppPlot_e_subj_abs
ppPlot_h_choi_nor <- makePpPlot(data = dataForPpPlot_choice, choice_level = TRUE, deviation_type = "normalizedDeviation", treatment = "hard")
ppPlot_h_choi_nor
ppPlot_e_choi_nor <- makePpPlot(data = dataForPpPlot_choice, choice_level = TRUE, deviation_type = "normalizedDeviation", treatment = "easy")
ppPlot_e_choi_nor
ppPlot_h_subj_nor <- makePpPlot(data = dataForPpPlot, choice_level = FALSE, deviation_type = "normalizedDeviation", treatment = "hard")
ppPlot_h_subj_nor
ppPlot_e_subj_nor <- makePpPlot(data = dataForPpPlot, choice_level = FALSE, deviation_type = "normalizedDeviation", treatment = "easy")
ppPlot_e_subj_nor

ggsave(
  filename = file.path(PATH_TO_DATA, "Figures_pilot3&4&5", "ppPlot_p_choi_abs.pdf"),
  plot = ppPlot_p_choi_abs, device = "pdf", width = 18, height = 12
)
ggsave(file.path(PATH_TO_DATA, "Figures_pilot3&4&5", "ppPlot_p_choi_nor.pdf"), plot = ppPlot_p_choi_nor, device = "pdf", width = 18, height = 12)
ggsave(file.path(PATH_TO_DATA, "Figures_pilot3&4&5", "ppPlot_h_choi_abs.pdf"), plot = ppPlot_h_choi_abs, device = "pdf", width = 18, height = 12)
ggsave(file.path(PATH_TO_DATA, "Figures_pilot3&4&5", "ppPlot_e_choi_abs.pdf"), plot = ppPlot_e_choi_abs, device = "pdf", width = 18, height = 12)
ggsave(file.path(PATH_TO_DATA, "Figures_pilot3&4&5", "ppPlot_h_choi_nor.pdf"), plot = ppPlot_h_choi_nor, device = "pdf", width = 18, height = 12)
ggsave(file.path(PATH_TO_DATA, "Figures_pilot3&4&5", "ppPlot_e_choi_nor.pdf"), plot = ppPlot_e_choi_nor, device = "pdf", width = 18, height = 12)

# subject-level (small: 6 x 5)
ggsave(file.path(PATH_TO_DATA, "Figures_pilot3&4&5", "ppPlot_p_subj_abs.pdf"), plot = ppPlot_p_subj_abs, device = "pdf", width = 9, height = 5)
ggsave(file.path(PATH_TO_DATA, "Figures_pilot3&4&5", "ppPlot_p_subj_nor.pdf"), plot = ppPlot_p_subj_nor, device = "pdf", width = 9, height = 5)
ggsave(file.path(PATH_TO_DATA, "Figures_pilot3&4&5", "ppPlot_h_subj_abs.pdf"), plot = ppPlot_h_subj_abs, device = "pdf", width = 9, height = 5)
ggsave(file.path(PATH_TO_DATA, "Figures_pilot3&4&5", "ppPlot_e_subj_abs.pdf"), plot = ppPlot_e_subj_abs, device = "pdf", width = 9, height = 5)
ggsave(file.path(PATH_TO_DATA, "Figures_pilot3&4&5", "ppPlot_h_subj_nor.pdf"), plot = ppPlot_h_subj_nor, device = "pdf", width = 9, height = 5)
ggsave(file.path(PATH_TO_DATA, "Figures_pilot3&4&5", "ppPlot_e_subj_nor.pdf"), plot = ppPlot_e_subj_nor, device = "pdf", width = 9, height = 5)
# ggsave(filename = file.path(PATH_TO_DATA, "Figures_pilot3&4&5", "ppPlot_e_subj_nor.pdf"),
#        plot = ppPlot_e_subj_nor, device = "pdf", width = 6, height = 5)







# Scatter plot with a regression line
scatterRtChoiceTreatment <- ggplot(dataLm, aes(x = rtChoice, y = treatment)) +
  geom_point(alpha = 0.5) +
  geom_smooth(method = "lm", se = FALSE, color = "red") +
  labs(
    title = "Correlation between variables",
    x = "rt choice ($)",
    y = "treatment ($)"
  )
scatterRtChoiceAccuracy <- ggplot(dataLm, aes(x = rtChoice, y = accuracy)) +
  geom_point(alpha = 0.5) +
  geom_smooth(method = "lm", se = FALSE, color = "red") +
  labs(
    title = "Correlation between rtChoice and accuracy",
    x = "rt choice",
    y = "accuracy"
  )
scatterRtChoiceAccuracy
scatterRtChoiceTreatment_hard <- ggplot(dataLm[dataLm$treatment == "hard", ], aes(x = rtChoice, y = accuracy)) +
  geom_point(alpha = 0.5) +
  geom_smooth(method = "lm", se = FALSE, color = "red") +
  labs(
    title = "Correlation between rtChoice and accuracy",
    x = "rt choice",
    y = "accuracy"
  )
scatterRtChoiceTreatment_hard
ggplot(dataLm, aes(x = rtChoice, y = impactCogLoad)) +
  geom_point(alpha = 0.5) +
  geom_smooth(method = "lm", se = FALSE, color = "red") +
  labs(
    title = "Correlation between rtChoice and accuracy",
    x = "rt choice",
    y = "accuracy"
  )
ggplot(dataLm, aes(x = accuracy, y = impactCogLoad)) +
  geom_point(alpha = 0.5) +
  geom_smooth(method = "lm", se = FALSE, color = "red") +
  labs(
    title = "Correlation between variables",
    x = "accuracy",
    y = "impactCogLoad"
  )






fit_hardVsEasy_absolute <- lm_robust(absoluteDeviation ~ rtChoice * treatment * type,
  data = dataLm,
  cluster = participant_id,
  se_type = "CR2"
) # test the effect of treatment and choice, cancelling the increased/decreased RT due to treatment
fit_hardVsEasy_normalized <- lm_robust(normalizedDeviation ~ rtChoice * treatment * type,
  data = dataLm,
  cluster = participant_id,
  se_type = "CR2"
)

coeftest(fit_hardVsEasy_absolute, vcov = vcovCL, cluster = ~participant_id) # more noise in easy
coeftest(fit_hardVsEasy_normalized, vcov = vcovCL, cluster = ~participant_id) # no impact (or negative) of cog load nor interaction with RT in the direction of PT
plot_model(fit_hardVsEasy_normalized, type = "pred", terms = c("treatment", "rtChoice"), mdrt.values = "meansd", se = NULL)
plot_model(fit_hardVsEasy_absolute, type = "pred", terms = c("treatment", "rtChoice"), mdrt.values = "meansd", ci.lvl = 0.95)

# plot the regression output in Latex
extract(fit_hardVsEasy_normalized, include.adjrsquared = FALSE)
extracted_tests <- c(extract(fit_hardVsEasy_normalized), extract(fit_hardVsEasy_absolute))
texreg(extracted_tests, custom.coef.map = list("rtChoice" = "time on MPLs", "treatmenthard" = "cognitive load treatment", "rtChoice:treatmenthard" = "Interaction"))





fit_hard_absolute <- lm(absoluteDeviation ~ impactCogLoad * rtChoice, data = dataLm[dataLm$treatment == "hard", ])
fit_easy_absolute <- lm(absoluteDeviation ~ impactCogLoad * rtChoice, data = dataLm[dataLm$treatment == "easy", ]) #
fit_hard_normalized <- lm(normalizedDeviation ~ impactCogLoad * rtChoice, data = dataLm[dataLm$treatment == "hard", ])
fit_easy_normalized <- lm(normalizedDeviation ~ impactCogLoad * rtChoice, data = dataLm[dataLm$treatment == "easy", ]) #


coef_test(fit_hard_absolute, vcov = "CR2", test = "Satterthwaite", cluster = dataLm[dataLm$treatment == "hard", ]$participant_id)
testCoef_test <- coef_test(fit_hard_absolute, vcov = "CR2", test = "Satterthwaite", cluster = dataLm[dataLm$treatment == "hard", ]$participant_id) #|>
as.data.frame() |>
  rename(
    term      = Coef,
    estimate  = beta,
    std.error = SE,
    statistic = tstat,
    df        = df_Satt,
    p.value   = p_Satt
  )
class(testCoef_test)
stargazer(testCoef_test, title = "regression on absolute deviaiton", type = "text")


fit_hard_absolute <- lm_robust(absoluteDeviation ~ rtChoice * impactCogLoad * accuracy * type, data = dataLm[dataLm$treatment == "hard", ], clusters = participant_id)
summary(fit_hard_absolute)
plot_model(fit_hard_absolute, type = "pred", terms = c("impactCogLoad", "rtChoice", "accuracy"), title = "Predicted value of absolute deviation, treatment cognitive load, with regressors rtChoice, accuracy, type")

plot_model(fit_hard_normalized,
  type = "pred", terms = c("impactCogLoad", "rtChoice"),
  title = "Predicted value of normalized deviation, treatment cognitive load",
  show.data = TRUE
)
mean(dataLm[dataLm$treatment == "hard", ]$impactCogLoad) # =0.2547389
plot_model(fit_easy_normalized, type = "pred", terms = c("impactCogLoad", "rtChoice"), title = "Predicted value of normalized deviation, treatment no cognitive load ")



# Scatter plot with a regression line
heteroLmInteraction <- ggplot(dataLm, aes(x = rtChoice, y = impactCogLoad)) +
  geom_point(alpha = 0.5) +
  geom_smooth(method = "lm", se = FALSE, color = "red") +
  labs(
    title = "Heteroskedasticity",
    x = "rt choice (in s)",
    y = "impact cog load"
  )
ggsave(
  filename = file.path(PATH_TO_DATA, "Figures_pilot3&4&5", "heteroLmInteraction.pdf"),
  plot = heteroLmInteraction, device = "pdf", width = 8, height = 8
)


# Create a new dataframe for visualization
df_heteroskedasticity_hard_absolute <- data.frame(
  Value = dataLm[dataLm$treatment == "hard", ]$absoluteDeviation, # Independent variable
  Residuals = residuals(fit_h_abs_Rt_sen_acc), # Extract residuals from the regression model
  Fitted = fitted(fit_h_abs_Rt_sen_acc),
  rtChoice = dataLm[dataLm$treatment == "hard", ]$rtChoice,
  accuracy = dataLm[dataLm$treatment == "hard", ]$accuracy,
  impactCogLoad = dataLm[dataLm$treatment == "hard", ]$impactCogLoad
  # Extract fitted values from the regression model
)
# Plot of residuals against the independent variable
ggplot(df_heteroskedasticity_hard_absolute, aes(x = Value, y = Residuals)) +
  geom_point() +
  geom_smooth(method = "lm", se = FALSE, color = "red") +
  labs(title = "Plot of Residuals vs. Independent Variable", x = "absolute deviation")
# plot of fitted values against the independent variable
ggplot(df_heteroskedasticity_hard_absolute, aes(x = Value, y = Fitted)) +
  geom_point() +
  geom_smooth(method = "lm", se = FALSE, color = "red") +
  labs(title = "Plot of fitted values vs. Independent Variable", x = "absolute deviation")
# plot of fitted values against the independent variable
ggplot(df_heteroskedasticity_hard_absolute, aes(x = rtChoice, y = Residuals)) +
  geom_point() +
  geom_smooth(method = "lm", se = FALSE, color = "red") +
  labs(title = "Plot of residuals vs. rtChoice", x = "absolute deviation")
ggplot(df_heteroskedasticity_hard_absolute, aes(x = accuracy, y = Residuals)) +
  geom_point() +
  geom_smooth(method = "lm", se = FALSE, color = "red") +
  labs(title = "Plot of residuals vs. accuracy", x = "absolute deviation")
ggplot(df_heteroskedasticity_hard_absolute, aes(x = impactCogLoad, y = Residuals)) +
  geom_point() +
  geom_smooth(method = "lm", se = FALSE, color = "red") +
  labs(title = "Plot of residuals vs. accuracy", x = "absolute deviation")

bptest(fit_hard_absolute)


makeAIC <- function(model) {
  n <- nobs(model)
  k <- length(coef(model)) + 1 # +1 for sigma^2
  rss <- sum(residuals(model)^2)
  -2 * (
    -n / 2 * (log(2 * pi) + 1 + log(rss / n))
  ) + 2 * k
}
makeBIC <- function(model) {
  n <- nobs(model)
  k <- length(coef(model)) + 1
  rss <- sum(residuals(model)^2)
  -2 * (
    -n / 2 * (log(2 * pi) + 1 + log(rss / n))
  ) + k * log(n)
}
makeAICList <- function(models) {
  unlist(lapply(models, makeAIC))
}
makeBICList <- function(models) {
  unlist(lapply(models, makeBIC))
}
makeExtractedList <- function(models) {
  (lapply(models, extract))
}


makeModels <- function(treatment_value, type_value = "FALSE", level_value, deviation_value) {
  if (level_value == "subject" && type_value == "FALSE") {
    dataToUse <- subset(dataForBarPlot, treatment == treatment_value)
  } else if (level_value == "subject") {
    dataToUse <- subset(dataLm, treatment == treatment_value)
  } else if (level_value == "choice") {
    dataToUse <- subset(dataLmChoice, treatment == treatment_value)
  }

  dataToUse <- dataToUse %>%
    mutate(rtChoice = rtChoice / 30000) # 1 is 30 seconds, 0 seconds because the TIME limit is 30 seconds ! Hard coded to change if we modify the time limit

  if (type_value == "FALSE" && level_value == "subject") {
    formula_intercept <- reformulate(
      c("1"),
      response = deviation_value
    )
    formula_rt <- reformulate(
      c("rtChoice"),
      response = deviation_value
    )
    formula_sen <- reformulate(
      c("impactCogLoad"),
      response = deviation_value
    )
    formula_acc <- reformulate(
      c("accuracy"),
      response = deviation_value
    )
    formula_rt_sen <- reformulate(
      c("rtChoice", "impactCogLoad", "rtChoice:impactCogLoad"),
      response = deviation_value
    )
    formula_rt_acc <- reformulate(
      c("rtChoice", "accuracy", "rtChoice:accuracy"),
      response = deviation_value
    )
    formula_sen_acc <- reformulate(
      c("impactCogLoad", "accuracy", "impactCogLoad:accuracy"),
      response = deviation_value
    )
    formula_rt_sen_acc <- reformulate(
      c(
        "rtChoice", "impactCogLoad", "accuracy",
        "rtChoice:impactCogLoad",
        "rtChoice:accuracy",
        "impactCogLoad:accuracy",
        "rtChoice:impactCogLoad:accuracy"
      ),
      response = deviation_value
    )
  } else if (type_value == "TRUE" && level_value == "subject") {
    formula_intercept <- reformulate(
      c("type"),
      response = deviation_value
    )
    formula_rt <- reformulate(
      c("type", "rtChoice", "type:rtChoice"),
      response = deviation_value
    )
    formula_sen <- reformulate(
      c("type", "impactCogLoad", "type:impactCogLoad"),
      response = deviation_value
    )
    formula_acc <- reformulate(
      c("type", "accuracy", "type:accuracy"),
      response = deviation_value
    )
    formula_rt_sen <- reformulate(
      c(
        "type", "rtChoice", "impactCogLoad",
        "type:rtChoice", "type:impactCogLoad", "rtChoice:impactCogLoad",
        "type:rtChoice:impactCogLoad"
      ),
      response = deviation_value
    )
    formula_rt_acc <- reformulate(
      c(
        "type", "rtChoice", "accuracy",
        "type:rtChoice", "type:accuracy", "rtChoice:accuracy",
        "type:rtChoice:accuracy"
      ),
      response = deviation_value
    )
    formula_sen_acc <- reformulate(
      c(
        "type", "impactCogLoad", "accuracy",
        "type:impactCogLoad", "type:accuracy", "impactCogLoad:accuracy",
        "type:impactCogLoad:accuracy"
      ),
      response = deviation_value
    )
    formula_rt_sen_acc <- reformulate(
      c(
        "type", "rtChoice", "impactCogLoad", "accuracy",
        "type:rtChoice", "type:impactCogLoad", "type:accuracy",
        "rtChoice:impactCogLoad", "rtChoice:accuracy", "impactCogLoad:accuracy",
        "type:rtChoice:impactCogLoad",
        "type:rtChoice:accuracy",
        "type:impactCogLoad:accuracy",
        "type:rtChoice:impactCogLoad:accuracy"
      ),
      response = deviation_value
    )
  } else if (type_value == "FALSE" && level_value == "choice") {
    formula_intercept <- reformulate(
      c("1", "(1|participant_id)"),
      response = deviation_value
    )
    formula_rt <- reformulate(
      c("rtChoice", "(1|participant_id)"),
      response = deviation_value
    )
    formula_sen <- reformulate(
      c("impactCogLoad", "(1|participant_id)"),
      response = deviation_value
    )
    formula_acc <- reformulate(
      c("accuracy", "(1|participant_id)"),
      response = deviation_value
    )
    formula_rt_sen <- reformulate(
      c("rtChoice", "impactCogLoad", "rtChoice:impactCogLoad", "(1|participant_id)"),
      response = deviation_value
    )
    formula_rt_acc <- reformulate(
      c("rtChoice", "accuracy", "rtChoice:accuracy", "(1|participant_id)"),
      response = deviation_value
    )
    formula_sen_acc <- reformulate(
      c("impactCogLoad", "accuracy", "impactCogLoad:accuracy", "(1|participant_id)"),
      response = deviation_value
    )
    formula_rt_sen_acc <- reformulate(
      c(
        "rtChoice", "impactCogLoad", "accuracy",
        "rtChoice:impactCogLoad",
        "rtChoice:accuracy",
        "impactCogLoad:accuracy",
        "rtChoice:impactCogLoad:accuracy", "(1|participant_id)"
      ),
      response = deviation_value
    )
  } else if (type_value == "TRUE" && level_value == "choice") {
    formula_intercept <- reformulate(
      c("type", "(1|participant_id)"),
      response = deviation_value
    )
    formula_rt <- reformulate(
      c("type", "rtChoice", "type:rtChoice", "(1|participant_id)"),
      response = deviation_value
    )
    formula_sen <- reformulate(
      c("type", "impactCogLoad", "type:impactCogLoad", "(1|participant_id)"),
      response = deviation_value
    )
    formula_acc <- reformulate(
      c("type", "accuracy", "type:accuracy", "(1|participant_id)"),
      response = deviation_value
    )
    formula_rt_sen <- reformulate(
      c(
        "type", "rtChoice", "impactCogLoad",
        "type:rtChoice", "type:impactCogLoad", "rtChoice:impactCogLoad",
        "type:rtChoice:impactCogLoad", "(1|participant_id)"
      ),
      response = deviation_value
    )
    formula_rt_acc <- reformulate(
      c(
        "type", "rtChoice", "accuracy",
        "type:rtChoice", "type:accuracy", "rtChoice:accuracy",
        "type:rtChoice:accuracy", "(1|participant_id)"
      ),
      response = deviation_value
    )
    formula_sen_acc <- reformulate(
      c(
        "type", "impactCogLoad", "accuracy",
        "type:impactCogLoad", "type:accuracy", "impactCogLoad:accuracy",
        "type:impactCogLoad:accuracy", "(1|participant_id)"
      ),
      response = deviation_value
    )
    formula_rt_sen_acc <- reformulate(
      c(
        "type", "rtChoice", "impactCogLoad", "accuracy",
        "type:rtChoice", "type:impactCogLoad", "type:accuracy",
        "rtChoice:impactCogLoad", "rtChoice:accuracy", "impactCogLoad:accuracy",
        "type:rtChoice:impactCogLoad",
        "type:rtChoice:accuracy",
        "type:impactCogLoad:accuracy",
        "type:rtChoice:impactCogLoad:accuracy",
        "(1|participant_id)"
      ),
      response = deviation_value
    )
  }

  if (level_value == "subject" && type_value == "FALSE") {
    fit_intercept <- lm_robust(formula_intercept,
      data = dataToUse
    )
    fit_rt <- lm_robust(formula_rt,
      data = dataToUse
    )
    fit_sen <- lm_robust(formula_sen,
      data = dataToUse
    )
    fit_acc <- lm_robust(formula_acc,
      data = dataToUse
    )
    fit_rt_sen <- lm_robust(formula_rt_sen,
      data = dataToUse
    )
    fit_rt_acc <- lm_robust(formula_rt_acc,
      data = dataToUse
    )
    fit_sen_acc <- lm_robust(formula_sen_acc,
      data = dataToUse
    )
    fit_rt_sen_acc <- lm_robust(formula_rt_sen_acc,
      data = dataToUse
    )
  } else if (level_value == "subject" && type_value == "TRUE") {
    # model comparison by treatment ---- absolute, subject level
    fit_intercept <- lm_robust(formula_intercept,
      data = dataToUse,
      clusters = participant_id,
      se_type = "CR2"
    )
    fit_rt <- lm_robust(formula_rt,
      data = dataToUse,
      clusters = participant_id,
      se_type = "CR2"
    )
    fit_sen <- lm_robust(formula_sen,
      data = dataToUse,
      clusters = participant_id,
      se_type = "CR2"
    )
    fit_acc <- lm_robust(formula_acc,
      data = dataToUse,
      clusters = participant_id,
      se_type = "CR2"
    )
    fit_rt_sen <- lm_robust(formula_rt_sen,
      data = dataToUse,
      clusters = participant_id,
      se_type = "CR2"
    )
    fit_rt_acc <- lm_robust(formula_rt_acc,
      data = dataToUse,
      clusters = participant_id,
      se_type = "CR2"
    )
    fit_sen_acc <- lm_robust(formula_sen_acc,
      data = dataToUse,
      clusters = participant_id,
      se_type = "CR2"
    )
    fit_rt_sen_acc <- lm_robust(formula_rt_sen_acc,
      data = dataToUse,
      clusters = participant_id,
      se_type = "CR2"
    )
  } else if (level_value == "choice") {
    fit_intercept <- lmer(formula_intercept,
      data = dataToUse
    )
    fit_rt <- lmer(formula_rt,
      data = dataToUse
    )
    fit_sen <- lmer(formula_sen,
      data = dataToUse
    )
    fit_acc <- lmer(formula_acc,
      data = dataToUse
    )
    fit_rt_sen <- lmer(formula_rt_sen,
      data = dataToUse
    )
    fit_rt_acc <- lmer(formula_rt_acc,
      data = dataToUse
    )
    fit_sen_acc <- lmer(formula_sen_acc,
      data = dataToUse
    )
    fit_rt_sen_acc <- lmer(formula_rt_sen_acc,
      data = dataToUse
    )
  }

  models_abs <- list(fit_intercept, fit_rt, fit_sen, fit_acc, fit_rt_sen, fit_rt_acc, fit_sen_acc, fit_rt_sen_acc)

  # models_abs <- makeExtractedList(models_abs)


  if (level_value == "subject") {
    AICList <- makeAICList(models_abs)
    BICList <- makeBICList(models_abs)
  } else if (level_value == "choice") {
    AICList <- unlist(lapply(models_abs, AIC))
    BICList <- unlist(lapply(models_abs, BIC))
  }

  texreg(models_abs,
    include.ci = FALSE,
    ci.force = FALSE,
    naive = TRUE,
    # override.se = lapply(models_abs, function(m) m$std.error),
    # override.pvalues = lapply(models_abs, function(m) m$p.value),
    stars = c(0.001, 0.01, 0.05, 0.1),
    symbol = "\\circ",
    custom.gof.rows =
      if (level_value == "subject") {
        list("AIC" = AICList, "BIC" = BICList)
      },
    custom.note = if (level_value == "subject" && type_value == "FALSE") {
      "%stars Robust standard errors clustered at the participant level (se type : HC2)."
    } else if (level_value == "subject" && type_value == "TRUE") {
      "%stars Robust standard errors clustered at the participant level (se type : CR2)."
    } else if (level_value == "choice") {
      "%stars Mixed model with random intercept at the participant level. t-tests use Satterthwaite's method"
    },
    caption = paste0("Treatment: ", treatment_value, ". Mirror and lotteries separated: ", type_value, ". Level: ", level_value, ". Deviations: ", deviation_value),
  )
}


makeModels(treatment_value = "hard", level_value = "subject", type_value = "FALSE", deviation_value = "absoluteDeviation")
makeModels(treatment_value = "hard", level_value = "subject", type_value = "FALSE", deviation_value = "normalizedDeviation")
makeModels(treatment_value = "hard", level_value = "subject", type_value = "TRUE", deviation_value = "absoluteDeviation")
makeModels(treatment_value = "hard", level_value = "subject", type_value = "TRUE", deviation_value = "normalizedDeviation")
makeModels(treatment_value = "hard", level_value = "choice", type_value = "FALSE", deviation_value = "normalizedDeviation")
makeModels(treatment_value = "hard", level_value = "choice", type_value = "FALSE", deviation_value = "absoluteDeviation")
makeModels(treatment_value = "hard", level_value = "choice", type_value = "TRUE", deviation_value = "absoluteDeviation")
makeModels(treatment_value = "hard", level_value = "choice", type_value = "TRUE", deviation_value = "normalizedDeviation")

makeModels(treatment_value = "easy", level_value = "subject", type_value = "FALSE", deviation_value = "absoluteDeviation")
makeModels(treatment_value = "easy", level_value = "subject", type_value = "FALSE", deviation_value = "normalizedDeviation")
makeModels(treatment_value = "easy", level_value = "subject", type_value = "TRUE", deviation_value = "absoluteDeviation")
makeModels(treatment_value = "easy", level_value = "subject", type_value = "TRUE", deviation_value = "normalizedDeviation")
makeModels(treatment_value = "easy", level_value = "choice", type_value = "FALSE", deviation_value = "absoluteDeviation")
makeModels(treatment_value = "easy", level_value = "choice", type_value = "FALSE", deviation_value = "normalizedDeviation")
makeModels(treatment_value = "easy", level_value = "choice", type_value = "TRUE", deviation_value = "absoluteDeviation")
makeModels(treatment_value = "easy", level_value = "choice", type_value = "TRUE", deviation_value = "normalizedDeviation")


model_to_print <- lm_robust(absoluteDeviation ~ rtChoice * impactCogLoad, data = dataForBarPlot[dataForBarPlot$treatment == "hard", ])
extract(model_to_print)
texreg(extract(model_to_print), include.ci = FALSE, )
texreg(model_to_print, include.ci = FALSE, )
texreg(lm_robust(absoluteDeviation ~ rtChoice * impactCogLoad, data = dataForBarPlot[dataForBarPlot$treatment == "hard", ]),
  include.ci = FALSE,
  stars = c(0.001, 0.01, 0.05, 0.1),
  custom.note = {
    "%stars. Robust standard errors clustered at the participant level (se type : HC2)."
  }
)
summary(lm_robust(absoluteDeviation ~ rtChoice * impactCogLoad, data = dataForBarPlot[dataForBarPlot$treatment == "hard", ] %>% mutate(rtChoice = rtChoice / 30000)))



# make the models for the slides for Oprea:
# impactCogLoad only + impactCogLoad*rtChoice
# say that to test better cognitive laod manipulation we are going to control the response time, because there is an
# interaction effect
# with a hat with "normalized deviaiton
dataForBarPlot_rescaled <- dataForBarPlot %>%
  mutate(rtChoice = rtChoice / 30000)

model1_ppt <- lm_robust(
  normalizedDeviation ~ impactCogLoad,
  data = dataForBarPlot_rescaled[dataForBarPlot_rescaled$treatment == "hard", ], clusters = participant_id
)
model2_ppt <- lm_robust(
  normalizedDeviation ~ rtChoice * impactCogLoad,
  data = dataForBarPlot_rescaled[dataForBarPlot_rescaled$treatment == "hard", ], clusters = participant_id
)
summary(model1_ppt)
AICList_ppt <- list(round(makeAIC(model1_ppt), 2), round(makeAIC(model2_ppt), 2))
BICList_ppt <- list(round(makeBIC(model1_ppt), 2), round(makeBIC(model2_ppt), 2))

texreg(list(model1_ppt, model2_ppt),
  include.ci = FALSE,
  ci.force = FALSE,
  naive = TRUE,
  # override.se = lapply(models_abs, function(m) m$std.error),
  # override.pvalues = lapply(models_abs, function(m) m$p.value),
  stars = c(0.001, 0.01, 0.05, 0.1),
  symbol = "\\circ",
  custom.header = list("DV = normalized deviations" = 1:2),
  custom.gof.rows = list("AIC" = AICList_ppt, "BIC" = BICList_ppt),
  custom.coef.map = list("impactCogLoad" = "sensitivity to cognitive load", "rtChoice" = NA, "rtChoice:impactCogLoad" = "rtChoice : sensitivity to cognitive load"),
  custom.note = "%stars Robust standard errors clustered at the participant level (se type : HC2)."
)





# investigating why do we have a negative adjusted r-squared for some model for instance Treatment: hard. Mirror and lotteries separated: FALSE. Level: subject. Deviations: normalizedDeviation
fit_test <- lm(normalizedDeviation ~ accuracy, data = dataLm[dataLm$treatment == "hard", ])
make_adjRsquared <- function(model) {
  y <- model$model[[1]] # response
  rss <- sum(residuals(model)^2)
  tss <- sum((y - mean(y))^2)

  r2 <- 1 - rss / tss

  n <- nobs(model)
  k <- length(coef(model))

  1 - (1 - r2) * (n - 1) / (n - k - 1)
}

make_adjRsquared(fit_test)

summary(fit_test)$r.squared
summary(fit_test)


lm_robust(absoluteDeviation ~ rtChoice * impactCogLoad, data = dataForBarPlot)

# testing the main effect of cognitive load sensitivity (no interaction)

# long model absDev = rt + cogimpact (in hard treatment)
fit_mainEff_impactCogLoad <- lm_robust(
  absoluteDeviation ~ impactCogLoad + rtChoice,
  data = dataLm[dataLm$treatment == "hard", ],
  clusters = participant_id
)
summary(fit_mainEff_impactCogLoad)
fit_mainEff_accuracy <- lm_robust(
  absoluteDeviation ~ accuracy + rtChoice,
  data = dataLm[dataLm$treatment == "hard", ],
  clusters = participant_id
)
fit_mainEff_accuracy_impactCogLoad <- lm_robust(
  absoluteDeviation ~ accuracy + rtChoice + impactCogLoad,
  data = dataLm[dataLm$treatment == "hard", ],
  clusters = participant_id
)
fit_mainEff_accuracy
AIC_list_mainEff <- c((fit_mainEff_impactCogLoad), makeAIC(fit_mainEff_accuracy), makeAIC(fit_mainEff_accuracy_impactCogLoad))
BIC_list_mainEff <- c(makeBIC(fit_mainEff_impactCogLoad), makeBIC(fit_mainEff_accuracy), makeBIC(fit_mainEff_accuracy_impactCogLoad))
texreg(list(fit_mainEff_impactCogLoad, fit_mainEff_accuracy, fit_mainEff_accuracy_impactCogLoad),
  stars = c(0.001, 0.01, 0.05, 0.1),
  symbol = "\\circ",
  custom.gof.rows = list("AIC" = AIC_list_mainEff, "BIC" = BIC_list_mainEff),
  custom.note = "%stars. Robust standard errors clustered at the participant level (s.e. type: CR2).",
  caption = "Main effects of cognitive load sensitivity and accuracy for the cognitive load treatment"
)


cor(dataLm$impactCogLoad, dataLm$rtChoice)
cor(dataLm$impactCogLoad, dataLm$accuracy)


# comparing linear, fixed effects and mixed effects models
fit_hard_absolute_lm_robust <- lm_robust(absoluteDeviation ~ rtChoice * impactCogLoad,
  data = dataLmChoice[dataLmChoice$treatment == "hard", ],
  clusters = participant_id,
  se = "CR2"
)
summary(fit_hard_absolute_lm_robust)

fit_hard_absolute <- lm(absoluteDeviation ~ rtChoice * impactCogLoad,
  data = dataLmChoice[dataLmChoice$treatment == "hard", ]
)
summary(fit_hard_absolute)
coef_test(fit_hard_absolute, vcov = "CR2", test = "Satterthwaite", cluster = dataLmChoice[dataLmChoice$treatment == "hard", ]$participant_id) # lm then coref_test


fit_hard_absolute_FE <- feols(
  normalizedDeviation ~ rtChoice * accuracy | participant_id,
  data = dataLmChoiceWOutliers[dataLmChoiceWOutliers$treatment == "hard", ],
  cluster = ~participant_id
)
summary(fit_hard_absolute_FE)
BIC(fit_hard_absolute_FE) # 1751 # without outliers : 1605.24
AIC(fit_hard_absolute_FE) # 1646.727 # without outliers : 1510.06

fit_hard_absolute_FE_testRtCHoice <- feols(
  normalizedDeviation ~ rtChoice | participant_id,
  data = dataLmChoiceWOutliers[dataLmChoiceWOutliers$treatment == "hard", ],
  cluster = ~participant_id
)
summary(fit_hard_absolute_FE_testRtCHoice)
BIC(fit_hard_absolute_FE_testRtCHoice) # 1744 # without outliers : 1596.355
AIC(fit_hard_absolute_FE_testRtCHoice) # 1647.553 # without outliers : 1509.44

fit_hard_normalized_FE_testMirrorRt <- feols(
  normalizedDeviation ~ rtChoice * type | participant_id,
  data = dataLmChoiceWOutliers[dataLmChoiceWOutliers$treatment == "hard", ],
  cluster = ~participant_id
)
summary(fit_hard_normalized_FE_testMirrorRt)
BIC(fit_hard_normalized_FE_testMirrorRt) # 1743.869 #without outliers 1596.266
AIC(fit_hard_normalized_FE_testMirrorRt) # 1638.76 # without outliers  # 1501.45

fit_hard_normalized_FE_testMirrorRtAcc <- feols(
  normalizedDeviation ~ rtChoice * type * accuracy | participant_id,
  data = dataLmChoiceWOutliers[dataLmChoiceWOutliers$treatment == "hard", ],
  cluster = ~participant_id
)
summary(fit_hard_normalized_FE_testMirrorRtAcc)
BIC(fit_hard_normalized_FE_testMirrorRtAcc) # 1762.174 # without outliers: 1616.39
AIC(fit_hard_normalized_FE_testMirrorRtAcc) # 1640.895 # without outliers: 1505

fit_hard_absolute_FE_testMirrorRtAcc <- feols(
  absoluteDeviation ~ rtChoice * type * accuracy | participant_id,
  data = dataLmChoice[dataLmChoice$treatment == "hard", ],
  cluster = ~participant_id
)
summary(fit_hard_absolute_FE_testMirrorRtAcc)
BIC(fit_hard_absolute_FE_testMirrorRtAcc) # 1311.453
AIC(fit_hard_absolute_FE_testMirrorRtAcc) # 1191.41

fit_hard_absolute_FE_testMirrorRt <- feols(
  absoluteDeviation ~ rtChoice * type | participant_id,
  data = dataLmChoice[dataLmChoice$treatment == "hard", ],
  cluster = ~participant_id
)
summary(fit_hard_absolute_FE_testMirrorRt)
BIC(fit_hard_absolute_FE_testMirrorRt) # 1289.199
AIC(fit_hard_absolute_FE_testMirrorRt) # 1185.162

fit_hard_absolute_FE_testRt <- feols(
  absoluteDeviation ~ rtChoice | participant_id,
  data = dataLmChoice[dataLmChoice$treatment == "hard", ],
  cluster = ~participant_id
)
summary(fit_hard_absolute_FE_testRt)
BIC(fit_hard_absolute_FE_testRt) # 1287.768
AIC(fit_hard_absolute_FE_testRt) # 1191.735


formula_test_lmer <- reformulate(
  c("1", "(1|participant_id)"),
  response = "absoluteDeviation"
)
summary(lmer(formula_test_lmer, data = dataLmChoice[dataLmChoice$treatment == "hard", ]))
AIC(lmer(formula_test_lmer, data = dataLmChoice[dataLmChoice$treatment == "hard", ]))
makeAIC(lmer(formula_test_lmer, data = dataLmChoice[dataLmChoice$treatment == "hard", ]))
fit_hard_absolute_FE # cannot estimate impactCogLoad as it is a between participant variable


# look at the distribution of normalizedDeviation
dataLmChoice$normalizedDeviation
print(
  dataLmChoice %>%
    mutate(normalizedDeviation = round(normalizedDeviation, 1)) %>%
    group_by(normalizedDeviation) %>%
    summarise(n_obs = n()),
  n = 113
)
view(dataLmChoice %>%
  # select(participant_id, mplType, type, rtChoice, trial)
  filter(normalizedDeviation == (-1.5)))


dataLmChoiceRescaled_WOutliers <- dataLmChoice %>%
  mutate(rtChoice = rtChoice / 30000) # %>%
filter(!impactCogLoad < (-0.1))
length(unique(dataLmChoiceRescaled_WOutliers$participant_id))


fit_hard_absolute_RE <- lmer(absoluteDeviation ~ rtChoice * impactCogLoad + (1 | participant_id), data = dataLmChoiceRescaled[dataLmChoiceRescaled$treatment == "hard", ]) # random intercept only
summary(fit_hard_absolute_RE)
fit_hard_absolute_RE_Rt <- lmer(absoluteDeviation ~ rtChoice + (1 | participant_id), data = dataLmChoiceRescaled[dataLmChoiceRescaled$treatment == "hard", ]) # random intercept only
summary(fit_hard_absolute_RE_Rt)
makeAIC(fit_hard_absolute_RE)
texreg(fit_hard_absolute_RE)
fit_hard_normalized_RE <- lmer(normalizedDeviation ~ rtChoice * impactCogLoad + (1 | participant_id), data = dataLmChoiceRescaled[dataLmChoiceRescaled$treatment == "hard", ]) #  random intercept only
summary(fit_hard_normalized_RE)
fit_hard_normalized_RE_Rt <- lmer(normalizedDeviation ~ rtChoice + (1 | participant_id), data = dataLmChoiceRescaled[dataLmChoiceRescaled$treatment == "hard", ]) #  random intercept only
summary(fit_hard_normalized_RE_Rt)
fit_hard_absolute_RE <- lmer(absoluteDeviation ~ rtChoice * accuracy + (1 | participant_id), data = dataLmChoiceRescaled[dataLmChoiceRescaled$treatment == "hard", ]) # random intercept only
summary(fit_hard_absolute_RE)

fit_hard_normalized_RE <- lmer(normalizedDeviation ~ rtChoice * accuracy + (1 | participant_id), data = dataLmChoiceRescaled[dataLmChoiceRescaled$treatment == "hard", ]) #  random intercept only
summary(fit_hard_normalized_RE)

fit_hard_absolute_RE <- lmer(absoluteDeviation ~ rtChoice * accuracy + (1 + rtChoice + accuracy | participant_id), data = dataLmChoiceRescaled[dataLmChoiceRescaled$treatment == "hard", ]) # random intercept only
summary(fit_hard_absolute_RE) # not singular
fit_hard_absolute_RE <- lmer(absoluteDeviation ~ rtChoice * impactCogLoad * type + (1 + type | participant_id), data = dataLmChoiceRescaled[dataLmChoiceRescaled$treatment == "hard", ]) # random intercept only
summary(fit_hard_absolute_RE) # not singular

fit_hard_absolute_RE <- lmer(normalizedDeviation ~ rtChoice * impactCogLoad + (1 | participant_id), data = dataLmChoiceRescaled[dataLmChoiceRescaled$treatment == "hard", ]) # random intercept only
summary(fit_hard_absolute_RE) # not singular
AIC(fit_hard_absolute_RE)
dataLmChoiceRescaledCenteredRt <- dataLmChoiceRescaled %>%
  group_by(participant_id) %>%
  mutate(
    rtChoice_c = rtChoice - mean(rtChoice, na.rm = TRUE)
  ) %>%
  ungroup()
fit_hard_absolute_RE <- lmer(
  normalizedDeviation ~ rtChoice_c + (1 + rtChoice_c | participant_id),
  data = dataLmChoiceRescaledCenteredRt[dataLmChoiceRescaledCenteredRt$treatment == "hard", ]
)
summary(fit_hard_absolute_RE) # singular
fit_hard_absolute_RE_nc <- lmer(
  normalizedDeviation ~ rtChoice_c +
    (1 | participant_id) + (0 + rtChoice_c | participant_id),
  data = dataLmChoiceRescaledCenteredRt[
    dataLmChoiceRescaledCenteredRt$treatment == "hard",
  ]
)
AIC(fit_hard_absolute_RE)
fit_hard_absolute_RE <- lmer(absoluteDeviation ~ rtChoice * impactCogLoad * type + (1 + rtChoice | participant_id), data = dataLmChoiceRescaled[dataLmChoiceRescaled$treatment == "hard", ]) # random intercept only
summary(fit_hard_absolute_RE) # singular
fit_hard_absolute_RE <- lmer(absoluteDeviation ~ rtChoice * impactCogLoad * accuracy * type + (1 + rtChoice | participant_id), data = dataLmChoiceRescaled[dataLmChoiceRescaled$treatment == "hard", ]) # random intercept only
summary(fit_hard_absolute_RE) # not singular


summary(fit_hard_test)








# Table of the estimated EV for each task depending on typical choices strategy

# Logic of the code :
# First produce the table with the rational switching points positionsRationalsr1 , and the dataframe with the names of the different tasks with their position task_list
# Then create EVMax : sapply make_EGEmpirical on the tasks of task_list with the rational switching points of positionsRationalsr1. Convert it into a 1 row dataframe
# Add the "average" columns : mean of the high and low columns, with a for loop, and order by alphabetical order the columns


positionsRationalsr1 <- tibble::tibble(
  position = c("high", "low", "PTDirection"),
  A10 = c(7, 9, 1), # loss averse : switch to late
  A15 = c(7, 9, 1),
  G10 = c(5, 11, 1), # risk seeking : switch to late
  L10 = c(5, 11, -1), # risk averse : switch to soon
  G90 = c(5, 11, -1),
  L90 = c(5, 11, 1),
  G25 = c(4, 12, 1),
  L25 = c(4, 12, -1),
  G75 = c(4, 12, -1),
  L75 = c(4, 12, 1),
  G50 = c(3, 13, -1),
  L50 = c(3, 13, 1),
)
positionsRationalsr1 <- as.data.frame(positionsRationalsr1)
rownames(positionsRationalsr1)
rownames(positionsRationalsr1) <- positionsRationalsr1$position
positionsRationalsr1$position <- NULL
positionsRationalsr1

task_list <- data.frame(matrix(nrow = 1, ncol = length(mpl_types)))
colnames(task_list) <- mpl_types
task_list <- task_list[, 1:12] # in square brackets rows FIRST, columns SECOND
task_list <- task_list %>%
  mutate(
    across(
      everything(),
      list(
        high = ~.,
        low = ~.
      ),
      .names = "{.col}_{.fn}"
    ),
    .keep = "none"
  )

# colnamestask_list <- c()
# for (i in colnames(task_list)){
#   colnamestask_list <- c(colnamestask_list, paste0(i, "_low"), paste0(i, "_high"), paste0(i, "_average"))
# }
# colnamestask_list
# sapply(task_list[1], )
# task_list["maxEV",]

maxEV <- sapply(colnames(task_list), function(x) {{ posMPL <- sub(".*_", "", x)
  mplType <- sub("_.*", "", x)
  cat(
    "posMPL is ", posMPL, " mplType is ", mplType, "\n", " positionsRationnalsr1[posMPL, mplType] is ", positionsRationalsr1[posMPL, mplType], "\n",
    "  ifelse(str_starts(mplType, `G|L`), `lottery`, `sure`) is, ", ifelse(str_starts(mplType, "G|L"), "lottery", "sure"), "\n"
  )
  if (posMPL != "average") {
    # first line : participants choose rationally{
    make_EGEmpirical(
      mplType,
      positionsRationalsr1[posMPL, mplType],
      positionsRationalsr1[posMPL, mplType] + 1,
      ifelse(str_starts(mplType, "G|L"), "lottery", "sure"), ## test with inversed to see if the function puts EV = 0 !
      ifelse(str_starts(mplType, "A"), "sure", "lottery"),
      posMPL
    )
  } else {
    "average"
  } }})
onlyLotteries <- sapply(colnames(task_list), function(x) {{ posMPL <- sub(".*_", "", x)
  mplType <- sub("_.*", "", x)
  cat(
    "posMPL is ", posMPL, " mplType is ", mplType, "\n", " positionsRationnalsr1[posMPL, mplType] is ", positionsRationalsr1[posMPL, mplType], "\n",
    "  ifelse(str_starts(mplType, `G|L`), `lottery`, `sure`) is, ", ifelse(str_starts(mplType, "G|L"), "lottery", "sure"), "\n"
  )
  if (posMPL != "average") {
    # first line : participants choose rationally{
    make_EGEmpirical(
      mplType,
      -1,
      -1,
      "lottery", ## test with inversed to see if the function puts EV = 0 !
      "lottery",
      posMPL
    )
  } else {
    "average"
  } }})
onlySure <- sapply(colnames(task_list), function(x) {{ posMPL <- sub(".*_", "", x)
  mplType <- sub("_.*", "", x)
  cat(
    "posMPL is ", posMPL, " mplType is ", mplType, "\n", " positionsRationnalsr1[posMPL, mplType] is ", positionsRationalsr1[posMPL, mplType], "\n",
    "  ifelse(str_starts(mplType, `G|L`), `lottery`, `sure`) is, ", ifelse(str_starts(mplType, "G|L"), "lottery", "sure"), "\n"
  )
  if (posMPL != "average") {
    # first line : participants choose rationally{
    make_EGEmpirical(
      mplType,
      -1,
      -1,
      "sure", ## test with inversed to see if the function puts EV = 0 !
      "sure",
      posMPL
    )
  } else {
    "average"
  } }})
onlySureOrLotteries <- sapply(colnames(task_list), function(x) {
  posMPL <- sub(".*_", "", x)
  mplType <- sub("_.*", "", x)
  cat(
    "posMPL is ", posMPL, " mplType is ", mplType, "\n", " positionsRationnalsr1[posMPL, mplType] is ", positionsRationalsr1[posMPL, mplType], "\n",
    "  ifelse(str_starts(mplType, `G|L`), `lottery`, `sure`) is, ", ifelse(str_starts(mplType, "G|L"), "lottery", "sure"), "\n"
  )
  # first line : participants choose rationally{
  if (
    ((str_starts(mplType, "G") | str_starts(mplType, "L")) && (posMPL == "high")) |
      ((str_starts(mplType, "A") && posMPL == "low"))) {
    make_EGEmpirical(
      mplType,
      -1,
      -1,
      "sure",
      "sure",
      posMPL
    )
  } else {
    make_EGEmpirical(
      mplType,
      -1,
      -1,
      "lottery",
      "lottery",
      posMPL
    )
  }
}) # check on the full table is it equal to onlySure and onlyLotteries depending on the position
onlyCenter <- sapply(colnames(task_list), function(x) {
  posMPL <- sub(".*_", "", x)
  mplType <- sub("_.*", "", x)
  cat(
    "posMPL is ", posMPL, " mplType is ", mplType, "\n", " positionsRationnalsr1[posMPL, mplType] is ", positionsRationalsr1[posMPL, mplType], "\n",
    "  ifelse(str_starts(mplType, `G|L`), `lottery`, `sure`) is, ", ifelse(str_starts(mplType, "G|L"), "lottery", "sure"), "\n"
  )
  # first line : participants choose rationally{
  if (str_starts(mplType, "G") | str_starts(mplType, "L")) {
    make_EGEmpirical(
      mplType,
      8,
      9,
      "lottery",
      "sure",
      posMPL
    )
  } else if (str_starts(mplType, "A")) { # in A tasks it is rational to first select sure then lotteries
    make_EGEmpirical(
      mplType,
      8,
      9,
      "sure",
      "lottery",
      posMPL
    )
  }
}) #
random <- sapply(colnames(task_list), function(x) {
  posMPL <- sub(".*_", "", x)
  mplType <- sub("_.*", "", x)
  cat(
    "posMPL is ", posMPL, " mplType is ", mplType, "\n", " positionsRationnalsr1[posMPL, mplType] is ", positionsRationalsr1[posMPL, mplType], "\n",
    "  ifelse(str_starts(mplType, `G|L`), `lottery`, `sure`) is, ", ifelse(str_starts(mplType, "G|L"), "lottery", "sure"), "\n"
  )
  # first line : participants choose rationally{
  sum <- make_EGEmpirical(mplType, -1, -1, "lottery", "lottery", posMPL) + make_EGEmpirical(mplType, -1, -1, "sure", "sure", posMPL)
  if (str_starts(mplType, "G") | str_starts(mplType, "L")) {
    for (sr1 in 1:16) {
      sum <- sum + make_EGEmpirical(mplType, sr1, sr1 + 1, "lottery", "sure", posMPL)
    }
  } else if (str_starts(mplType, "A")) { # in A tasks it is rational to first select sure then lotteries
    for (sr1 in 1:16) {
      sum <- sum + make_EGEmpirical(mplType, sr1, sr1 + 1, "sure", "lottery", posMPL)
    }
  }
  sum / 18
}) # check on the full table if it is close to onlyCenter
randomAndRandomOrder <- sapply(colnames(task_list), function(x) {
  posMPL <- sub(".*_", "", x)
  mplType <- sub("_.*", "", x)
  cat(
    "posMPL is ", posMPL, " mplType is ", mplType, "\n", " positionsRationnalsr1[posMPL, mplType] is ", positionsRationalsr1[posMPL, mplType], "\n",
    "  ifelse(str_starts(mplType, `G|L`), `lottery`, `sure`) is, ", ifelse(str_starts(mplType, "G|L"), "lottery", "sure"), "\n"
  )
  # we calculate the random EG if people select the order rationnaly (e.g. lottery then sure for G and L tasks), and then calculate if they do the inverse, and we average
  sum <- 2 * (make_EGEmpirical(mplType, -1, -1, "lottery", "lottery", posMPL) + make_EGEmpirical(mplType, -1, -1, "sure", "sure", posMPL)) # wether they inverse or not doesn't change those options so they are weighted by two
  if (str_starts(mplType, "G") | str_starts(mplType, "L")) {
    for (sr1 in 1:16) {
      sum <- sum + make_EGEmpirical(mplType, sr1, sr1 + 1, "lottery", "sure", posMPL) # in the good order they get an outcome and in the other order they get €0
    }
  } else if (str_starts(mplType, "A")) {
    for (sr1 in 1:16) {
      sum <- sum + make_EGEmpirical(mplType, sr1, sr1 + 1, "sure", "lottery", posMPL) # in the good order they get an outcome and in the other order they get €0
    }
  }
  sum / (2 * 18)
}) # check on the full table if it is close to onlyCenter
randomAndRandomOrder

# maxEV <- data.frame(maxEV)
vec_EG <- list(maxEV = maxEV, onlyLotteries = onlyLotteries, onlySure = onlySure, onlySureOrLotteries = onlySureOrLotteries, onlyCenter = onlyCenter, random = random, randomAndRandomOrder = randomAndRandomOrder)
prefixes <- colnames(positionsRationalsr1)
EGSpace <- lapply(vec_EG, function(EG) {
  EG <- data.frame(t(EG))
  # cat(str(EG),"\n")

  for (p in prefixes) {
    # cat("p is", p)
    # cat(" rowMean is", rowMeans(EG%>%select(starts_with(p))))
    EG[[paste0(p, "_average")]] <- rowMeans(EG %>% select(starts_with(p))) # {{p}}
    # cat("EG[[paste0(p,'_average')]] is ", EG[[paste0(p,"_average")]], "\n")
  }
  EG
})

# vec_EG[[1]]
# data.frame(vec_EG[[1]])
# data.frame(vec_EG[[1]])%>%select(starts_with("G"))
# rowMeans(data.frame(vec_EG[[1]])%>%select(starts_with("G")))
EGSpace

EVPayoffSpace <- bind_rows(EGSpace)
rownames(EVPayoffSpace) <- names(EGSpace)
EVPayoffSpace <- EVPayoffSpace %>%
  mutate(
    mean_average = rowMeans(EVPayoffSpace %>% select(ends_with("average"))),
    .before = 1
  )
EVPayoffSpace

EVPayoffSpace_av <- EVPayoffSpace %>%
  select(ends_with("_average"))

EVPayoffSpace_av_long <- EVPayoffSpace %>%
  select(ends_with("_average")) %>%
  mutate(strategies = rownames(EVPayoffSpace)) %>%
  pivot_longer(
    cols = -all_of("strategies"),
    names_to = "task"
  ) %>%
  pivot_wider(
    names_from = "strategies",
    values_from = "value"
  )


# EG with Oprea's grid
compute_EG_random <- function(p) {
  EG <- 0

  for (i in 0:25) {
    term <- (p * 25 * i + (25 - i) * ((25 + i + 1) / 2)) / 25
    EG <- EG + term
  }

  return(EG / 25)
}
compute_EG_middle <- function(p) {
  term <- (p * 25 * 12 + (25 - 12) * ((25 + 12 + 1) / 2)) / 25

  return(term)
}
compute_EG_random(0.25)
compute_EG_middle(0.25)










# Look at the rts from Oprea

dataOprea <- read.csv("/Users/domitilleprevost/Documents/Master E&P/Stage/coding/jatos/study_assets_root/073bfc0a-f209-4ca9-9665-9f66dd9fd4ef/dataAnalysis/replication_official_oprea/Data/DATA.csv")
rts <- dataOprea %>%
  select(time_mirror, time_lottery, ID, treatment) %>%
  filter(treatment == "main") %>%
  pull(time_mirror)

rts <- rts[rts < 400]
mean(rts[rts < 400], na.rm = TRUE)
mean(rts < 35, na.rm = TRUE)
hist(rts, breaks = 1000, xlim = range(0:200))



# Overlayed density plot of time_mirror and time_lottery from rts
plot_rts_mirror_lottery_densities <- function(rts_df) {
  df_long <- rts_df %>%
    select(time_mirror, time_lottery) %>%
    pivot_longer(cols = everything(), names_to = "which", values_to = "rt") %>%
    filter(!is.na(rt))

  if (nrow(df_long) == 0) stop("No RT data available to plot.")

  means <- df_long %>%
    group_by(which) %>%
    summarise(mean_rt = mean(rt, na.rm = TRUE), .groups = "drop")

  colours <- c(time_mirror = "#2c7fb8", time_lottery = "#E7B800")

  p <- ggplot(df_long, aes(x = rt, color = which, fill = which)) +
    geom_density(alpha = 0.35, size = 0.6, bw = "nrd0") +
    geom_vline(data = means, aes(xintercept = mean_rt, color = which), linetype = "solid", size = 0.7) +
    scale_color_manual(values = colours, labels = c(time_mirror = "Mirror", time_lottery = "Lottery")) +
    scale_fill_manual(values = colours, labels = c(time_mirror = "Mirror", time_lottery = "Lottery")) +
    labs(
      title = "RT density: mirror vs lottery",
      x = "Reaction time (ms)",
      y = "Density",
      color = NULL, fill = NULL
    ) +
    theme_minimal(base_size = 13) +
    theme(plot.title = element_text(hjust = 0.5))


  return(p)
}

# Example call (uses rts from your script)
rts_density_plot <- plot_rts_mirror_lottery_densities(rts)
print(rts_density_plot)
