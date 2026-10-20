# In this document we write all the decisions that have been taken regarding the data analysis of the experiment.

We decided to run the analysis in R.

For the raw JSON export, every participant record and every trial is retained in the CSV. Fields that are absent from a trial remain blank, and vector- or object-valued fields are stored as JSON text so that the CSV still has one row per trial without losing information. The `participant_record` column identifies the source line for each trial.

The main analysis object is `analysis_data`, a tibble loaded from the validated CSV with `success`, `trial_type`, `trial_index`, `internal_node_id`, `participant_record`, and `view_history` excluded. The current validation preserves all 277 rows and all 3 participant subjects; the source CSV remains unchanged.
