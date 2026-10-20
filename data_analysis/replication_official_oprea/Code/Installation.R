####################################
# Import R Libraries
####################################

# Set the date for CRAN snapshot
mran.date <- "2024-06-14"
options(repos = paste0("https://cran.microsoft.com/snapshot/", mran.date, "/"))

# Function to check and install missing packages
pkgTest <- function(x, y = "") {
  if (!require(x, character.only = TRUE)) {
    if (y == "") {
      install.packages(x, dep = TRUE)
    } else {
      if (!requireNamespace("remotes", quietly = TRUE)) {
        install.packages("remotes")
      }
      remotes::install_version(x, y)
    }
    if (!require(x, character.only = TRUE)) stop("Package not found")
  }
  return("OK")
}

# Correctly define global libraries as a vector of individual package names
global.libraries <- c("dplyr", "magrittr", "readr", "tidyverse", "scales", "jsonlite", "stringr")

# Apply pkgTest to each package in the list
results <- sapply(global.libraries, pkgTest)

# Print results
print(results)
