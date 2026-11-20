# In this document we write all the decisions that have been taken regarding the data analysis of the experiment.

We decided to run the analysis in R.

For the raw JSON export, every participant record and every trial is retained in the CSV. Fields that are absent from a trial remain blank, and vector- or object-valued fields are stored as JSON text so that the CSV still has one row per trial without losing information. The `participant_record` column identifies the source line for each trial.

The main analysis object is `analysis_data`, a tibble loaded from the validated CSV with `success`, `trial_type`, `trial_index`, `internal_node_id`, `participant_record`, and `view_history` excluded. Participant records containing at least one trial with `task == "comprehensionFailure"` are excluded from `analysis_data` together with all their trials. The raw-derived CSV remains unchanged. The parser validates both the expected participant count after this exclusion and that no comprehension-failure trial remains in `analysis_data`; its printed counts are dataset-dependent.

`calculate_mpl_equivalents()` uses zero-based switch rows from the JATOS experiment and converts them to R indices when taking midpoints. `CE` is used for G/L MPLs and `LE` for A MPLs; the unused equivalent column remains `NA`. Following the current plan, GO sure-to-lottery and LO/AO lottery-to-sure orders are treated as inverted and return missing equivalents. This convention should be revisited if the intended monotonic order for losses or mixed MPLs differs from the plan wording.

`prepare_mpl_plot_data()` returns grouped summaries for valid experimental MPL equivalents. Its plotting contract is: `mpl_family`, `probability`, `treatment`, `incentive`, `n`, `mean_value`, `sd_value`, `se_value`, `mean_deviation`, `sd_value_deviation`, and `se_value_deviation`. `treatment` maps `mirr` to `mirror` and `ineq` to `inequalities`; missing `isSuper` is retained as missing rather than reclassified, so an incentive plot must explicitly filter to `classic` and `super`.

`main_plot()` pools the existing summary rows using their observation counts, computes pooled standard errors, and renders gains, losses, and mixed MPLs in separate base-R panels. The treatment view pools across incentive status; the incentive view excludes missing `isSuper` values. Validation produced warning-free treatment and incentive PNGs from the current test data.

For the pooled incentive bar plots, inferential units are participants rather than individual MPL choices. `make_incentive_deviation()` first averages `normalized_deviation` over all MPL observations within each participant and incentive status. Bars 1–2 use the participant-level super and classic means. Bars 3–4 use the participant-level difference `super - classic` within each treatment; SEs are participant SD / sqrt(participant n). Bars 5–6 use `(super - classic) / classic * 100` within each treatment, with an undefined percentage excluded when classic equals zero. The overall super-versus-classic comparison, as well as the mirror-versus-inequalities comparisons for bars 3–4 and 5–6, use paired Wilcoxon tests with asymptotic p-values (`exact = FALSE`). Missing paired participants are excluded from the corresponding paired test.

The ggplot2 incentive bar plot uses six bars: super, classic, mirror difference, inequalities difference, mirror percentage, and inequalities percentage. Bars 1–4 use an independent left Difference axis, while bars 5–6 use an independent right Percentage difference axis. Error bars span ±2 SE. Super and mirror bars use `#E7B800`; classic and inequalities bars use `#00AFBB`. Each planned pair has a paired Wilcoxon p-value annotation above the bars. The plot is written to `data/figures_test_14112026/incentive_deviation_bars.png`.

For the additional MPL metrics, reaction time is analyzed in milliseconds and cognitive uncertainty is reverse-coded as `100 - CU`, so 100 represents maximum uncertainty. These metrics use all valid incentivized MPL rows and do not inherit the CE/LE validity filter used for deviation analyses. Both use the same participant-level mean aggregation, participant-level standard errors, and paired Wilcoxon comparisons as the deviation bars. Correlations with deviations, time, uncertainty, and attention have not yet been implemented.

Treatment-framing bar plots exclude GO50 and LO50 as specified in the plan.
The inferential unit is the participant: observations are first averaged
within participant and treatment. The third bar is the paired participant
difference `mirror - inequalities`; its p-value is from a paired Wilcoxon test
comparing the two treatment means. Error bars show +/-2 participant-level SE.

Order-specific treatment and incentive plots use `subBlock` 1--14 for order 1
and 15--28 for order 2. Because instruction treatment is between participants
within a given order, order-specific treatment comparisons use independent
Wilcoxon rank-sum tests rather than paired tests. The order-specific treatment
difference is mirror minus inequalities, with SE propagated from the two
independent treatment-group SEs. Pooled treatment plots retain paired tests.

Choice-level incentive plots use individual valid MPL rows as the descriptive
unit but cluster all standard errors by participant. Means and super-minus-
classic contrasts are estimated with linear models and `sandwich::vcovCL`;
percentage-difference SEs use the delta method. This avoids treating repeated
choices from the same participant as independent while retaining the
choice-level estimand. The associated robust p-values use normal-reference
Wald tests.

For the gain/arithmetic comparison, the analysis unit is the participant. For
each GO probability, CE deviation is `CE - expected value`, and arithmetic
deviation is the arithmetic-test answer minus the same expected value
(`25 * probability / 100`). Repeated gain MPL rows and repeated CSV copies of
the arithmetic fields are averaged within participant before the means and
paired Wilcoxon tests are calculated. The output includes only participants
with both measures for a probability in the paired test; the participant-level
joined table retains unmatched rows for auditability. The tables are kept as
in-memory data frames rather than written to CSV. `calculationVsCE` displays
the mean CE and arithmetic deviations across GO10--GO90, with error bars
covering +/-2 participant-level SE and a paired Wilcoxon p-value annotation
for each probability.
