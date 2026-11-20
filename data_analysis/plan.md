# The goal is to analyze the data by producing multiple plots and statistical inferences


## Research question

There are two research questions:
Firstly, what does the framing of choices as mathematical (objective performance) or preference (no objective performance, choose your preffered option) changes to the valuation of an option, elicited with Multiple Price Lists (MPL). Prospect Theory predicts that under risk, the fourfold pattern of choice under risk emerges : under-valuation of prospect for gains with large probibilities and losses with small probabilities (risk-aversion) and over-valuation of prospects for gains with small probabilities and losses with large probabilities. In our experiment we elicit valuations of "mirrors" : they are the same options as standard MPL, but an option pays the expected value of the lottery, so it has a deterministic payoff. Some papers in the litterature claim that the same fourfold pattern of choice emerges in the mirrors. We want to see if this pattern is due (at least partly) to the fact that when asked to choose at each row you're preffered value (preference framing), participants don't understand that there is still a notion of performance and utility maximization, and thus are more prone to do errors that lead to the fourfold pattern. This is why we implement two treatments : one that is "preference" and the other "objective-goal". We want to compare the deviations of valuations from expected value for each type of lottery (probabilities 10%, 25%, 50%, 75%, 90%) in the preference and in the objective-goal treatment, to see if the fourfold pattern decreases in the objective-goal treatment. 

Secondly, we would like to know if the preference framing increases sensitivity to incentives. For that, in each treatment, 4 MPLs are randomly selected to be flagged as "super" MPLs (the other are said to be "classic") : they are the only ones that can be selected to be effectively paid at the end of the experiment. If people are sensitive to incentives, they will likely deviate less for those lotteries, and if this sensitivity is greater in the objective-goal treatment, then the difference in deviations will be greater in the mathematics treatment.

## Experimental design

Each participant fills some demographics. Then sees the instructions for the MPL part and answers comprehension question regarding the MPLs. Participants are either in the preference treatment first or in the objective-goal treatment first (they do one and then the other). Then answers some comprehension questions, and have four trials maximum to answers correctly, and look at the instructions again. Then the participant does a training MPL. Then the participant does all the MPLs (some of which are "super" and some "classic"). Then he or she see the instructions of the MPLs for the other treatment again, answers the comprehension questions again and do a training MPL again. Then he or she complete the MPLs for the other treatment. Then the participants answers some questions about their choices (where did they direct their attention, namely, for each treatment). Remember that here no "lotteries" are actually involving risk, they are actually deterministic mirrors of lotteries, payinf deterministally the average amount in the option. 

Then the last part of the experiment consists of 5 arithmetic questions that ask the participant to give the answer to a calculus that is used to find the expected value of the lotteries in the gain domain they had seen. The goal is to see if some MPLs were harder than others, and to see the participant's heterogeneity in arithmetic. 

## data

The data is experimentally produced.
It comes in the form of a .txt file, containing one line for each participant's data.

Meaning of the data fields and trial type
1. rt : reaction time (in ms)
2. responses : the answers provided by the participant.
3. task : 
    1. "demographics" for demographics
    2. "comprehensionSurveyMPLIncentives" for comprehension questions for the MPLs
    3. "trainingToChoose" : training MPL
    4. "mpl" : MPL trial
    5. "sliderQuestions_mirrors" : questions about the MPls in the "preferences" treatment
    6. "sliderQuestions_inequalities" : questions about the MPLs in the "objective-goal" treatment
    7. "arithmeticTest" : it is the last part of the experiment where subjects are asked to do a few calculations
4. switchRow1Choice : choice of the second row (first choice after the switch)
    1. "sure" : sure amount option chosen
    2. "lottery" : the lottery (with or without risk) option was chosen
5. switchRow2Choice : choice of the first row (last choice before the switch to the other option). Same possible values. If both switchRow1Choice and switchRow2Choice are the same, it means no switch happened, the participants selectionned only the same option.
6. switch_row1 : the first row that the participant switched
7. switch_row2 : the second row that the participant switched. If both are 0 or -1 it means that the participant did not switch
8. CU : cognitive uncertainty. But here for the test data it is reversed : high CU means high certainty. Varies between 0 and 100, integers. 
9. treatIs : "mirr" for the preference treatments or "ineq" for the objective-goal treatment
10. isSuper : 1 if mpl is in the "super" treatment, 0 if "classic"
11. block: 
    1. "mpl_incentives" for the experiment's mpl
    2. "training_span_mpl" for the training's mpl
    3. "example_span_mpl" for the example's mpl
12. subBlock : i don't remember
13. mplCounter : i don't remember
14. mplType: what type of MPL it is : if it starts by G it is gains, L losses and A mixed gain-loss. Then the number corresponds to the value of the MPL : 10 it means that 10 boxes out of 100 have $25, so EV = $2.5. It can be 10, 25, 50, 75, 90. For A mpls, it is different. The A mpls elicit loss aversion. They are comprised of the sure amount $0 option that does not vary across rows, and the lottery that changes, with on the one hand a positive sure amount indicated by the number in mplType : either $10 or $15; on the other hand an increasing amount that starts at $-24 I think to $25 I think.  So the number indicates only one of the two prizes that the lottery yields (but because they are mirrors it is only a 50% average between this amount and the increasing by row amount). mplType can also me "mpl", in this case it is training mpl, not interesting.
15. sliderArTest90 : the result that the subject find for the calculation of a EV of a lottery that yields $25 with 90% chance
16. sliderArTest75 : the result that the subject find for the calculation of a EV of a lottery that yields $25 with 75% chance
17. sliderArTest50 : the result that the subject find for the calculation of a EV of a lottery that yields $25 with 50% chance
18. sliderArTest25 : the result that the subject find for the calculation of a EV of a lottery that yields $25 with 25% chance
19. sliderArTest10 : the result that the subject find for the calculation of a EV of a lottery that yields $25 with 10% chance
20. "sliderCUIncentiveSuper" : cognitive uncertainty (reverse coded, 1 = no uncertainty) for super lotteries (in the incentivized treatment)
21. "sliderCUIncentiveSuper" : cognitive uncertainty for classic lotteries
22. "sliderInattentionPayoffs" : how much attention devoted to boxes = probabilities
23. "sliderCUIncentiveClassic" : how much attention devoted to the payoffs = prizes





## plan

The analysis is made in the analysis.r file.
1. Firstly we should turn the .txt raw data file into a csv file we can easily manipulate with R, and that a human can inspect visually (like in excel or r studio).
The .csv file should have one line per trial.

Completed: `test_16-10-2026.csv` now contains all 277 trials from all 3 participant records, with the union of every field found in the raw data.

Participant exclusion: after the CSV round-trip validation, participant records containing a trial with `task == "comprehensionFailure"` are excluded from `analysis_data` together with all of their trials. The raw-derived CSV remains unchanged for auditability. The parser reports the number of excluded participant records and trial rows and validates that no failure trial remains in `analysis_data`.

2. Secondly we should work on a R structure that enables to run tests and statistical analysis.
    1. We should see what is the best R structure to run statistical analysis and plotting and do data exploration. I suggest data frames, but you could help me confirm it is the best structure to work on.
    2. We have to create the main environment data file on which we will work thoughout the analysis, of the structure determined previously. If it is indeed a data frame we should convert the csv file into a dataframe, excluding some non-interesting columns : success, trial_type, trial_index, internal_node_id, participant_record, view_history.

Completed: `analysis_data` is the main tibble/dataframe. It is loaded from the validated CSV and excludes the six listed jsPsych metadata columns; participants who fail comprehension and all of their trial rows are excluded as documented above.

3. Thirdly we aim to make add some data of interest in the dataframe. Namely, we want to calculate for each mpl trial that is not part of the instruction what is the corresponding certainty equivalent. This depends on the swtiching point of the participant, the mplType and the choices. We also want to create a binary named "switch", which indicates whether the participant switched or not. 
    - Create a column named CE for the certainty equivalents and LE for the lottery equivalent and put the results there.
    - Select trials for which task = mpl and block == exemple_span_mpl or mpl_incentives.
    - calculate the certainty equivalents. For GO and LO mpls, there are 25 rows, with sure amount ranging from 1 in row 1 to 25 in row 25, with increments of 1, for gains mpls (GO) and from -25 to -1 in loss mpls (LO). The lottery yields 25 times it's number of percentage (e.g. GO 25 yields 25% of 25) and losses yields the negative values (e.g. LO25 yields 25% of -25). Take the certainty equivalent as the midpoint between sure amounts. For mixed tasks (gain and loss mixed, mplType starting with "A"), the sure amount is fixed at 0 and the lottery is composed of a first amount of -10 (for AO10) or -25 (for AO15) and a second amount that starts from 2 in row 1 up to 50 in row 25, increasing by 2 units for each row. We compute the lottery equivalent of the sure amount 0 by taking the midpoint between the values of the lotteries at the switching point. 
    For participants who did not switch, look at their choices, and calculate the CE or LE as follows :
        -  if the participant selected only lotteries in GO mpls, it is 25.5, only sure amouns 0.5.
        - For losses only lottery it is -0.5, only sure amount it is -25.5. 
        - For mixed mpls, only lottery it is the value of the first lottery -0.5 and only sure amount it is the highest amount +0.5.
    -  for mpls chosen in an inversed order, i.e. choosing sure amounts first and then lotteries for GO and lotteries first then sure-amounts for LO and AO mpls, ce column should indicate NA. 

Completed: `calculate_mpl_equivalents()` now adds `CE`, `LE`, and `switch` to `analysis_data` for the experimental MPL rows (`task == "mpl"` in `example_span_mpl` or `mpl_incentives`). The current test data contain 90 such rows. Gain/loss MPLs use midpoint certainty equivalents; mixed MPLs use midpoint lottery equivalents with a fixed certainty equivalent of 0. No-switch bounds, timeouts, malformed rows, and the documented inverted orders are handled explicitly.

Step 4 completed: `prepare_mpl_plot_data()` creates the validated summary input for `main_plot()`, and `main_plot()` now produces the three-panel Oprea-style deviation plot for gains, losses, and mixed MPLs. It supports treatment framing (`mirror` versus `inequalities`) and incentive status (`classic` versus `super`), with mean deviations, error bars, and pooled observations.
    

4. The next step is to plot the mean of the Certainty equivalent (CE) and Lottery equivalent (LE), grouped by probability, type of mpl (G, L or A), probability, and treatment (mirror or objective-goal). Oprea's treatments are mirrors and lotteries, just take the same graphical distinction but for ours. Then produce the same plot but with treatment isSuper. You should take as a working basis the code in analysisOprea.R, the function main_plot(). You should also understand what data the plot takes as input state it clearly and produce a function that yiedls the data that the main_plot function then uses. You should first show this function, and once i validate it, build main_plot().


# data-analysis plan

## analysis of the treatment variable instructions (`preferences` vs `inequalities` also called objective-goal treatment)
- one main plot with inequalities versus mirror.
- the same plot for order =1 and order =2 
<!-- (Cancelled) - then 2 difference main_plot : plotting the difference between preference treatment deviations and objective-goal deviations. The first plot plots the difference at the aggregate level (substract one mean deviation from the other), and the other at the subject level : plots the difference of deviation between treatment for each task by participant. If one deviation is not available for one task then counts the difference as missing (do not count the difference if one deviation misses). -->
- Then a bar plot pooling all deviations on all mpl types and graphing the mean deviation for preferences (first bar), objective goal (second bar) and difference at the subject level i.e. the difference for each identical mpl at the subject level (third bar). Each time arrows for the 95% confidence interval should be added, and also note the p-value of the difference between the preference and the objective-goal treatments. The inference should take into account the clustered data (multiple observations per participant). Exclude GO50 and LO50 mpls. Then two other bar plots similar but instead of deviations it is reaction time and cognitive uncertainty. Exclude also GO50 and LO50. 

Completed: `make_treatment_bar_data()` creates the three participant-level bars for each outcome (preference/mirror, objective-goal/inequalities, and mirror minus inequalities), excluding GO50 and LO50. The bars use participant-level means, standard errors, paired Wilcoxon tests, and +/-2 SE error bars. The figures are saved as `treatment_deviation_bars.png`, `treatment_RT_bars.png`, and `treatment_cognitive_uncertainty_bars.png` in `data/figures_pilot1&2/`.

Completed: the treatment and incentive bar plots are also generated separately
for order 1 (`subBlock` 1--14) and order 2 (`subBlock` 15--28), with
`_order1` and `_order2` object and file names. For treatment comparisons within
an order, the test is an independent Wilcoxon rank-sum test because a
participant contributes observations to only one instruction treatment in that
order. The order-specific difference bar is the difference of the two group
means with the independent-groups propagated SE.

## analysis of the treatment variable incentives (`super` vs `classic`) and the interaction with the instruction treatments
- first one main_plot pooling all data for `super` mpls and one on all data for `classic` mpls. S.d. should take into account that some participants will give two data points and so cluster the standard error (because they can do e.g. GO10 classic in the objective-goal/inequalities and in the preference treatment). 
- the same plot for order =1 and order =2 
<!-- - then 2 difference main_plot, plotting the difference between classic treatment deviations and super treatment deviations. The first plot plots the difference at the aggregate level (substract one mean deviation from the other), and the other at the subject level : plots the difference of deviation between treatment for each task by participant. If one deviation is not available for one task then counts the difference as missing (do not count the difference if one deviation misses). Take into accuont that the data is clustered at the participant level for the inference part (standard errors). -->
- a bar plot. All the inferences must be made on individual mean level in the relevant groups, not on the choice level because it could artificially underestimate the variance. All the bars should also have arrows representing two standard deviation on each (above and below). There should be the p-value of the difference between each pairs of bars : 1st against 2nd, 3rd against 4th, 5th against 6th, probably using wilcoxon tests. First do the data tables, in a second step after validation the plots. The y-axis on the left should be difference and on the right percentage difference, so the 4 first bars don't share their difference y-axis with the 5th and 6th's percentage difference.
    - first bar : mean deviation in super mpls, pooling on treatments
    - scecond bar : mean deviation in classic mpls, pooling on treatments
    - third bar : mean difference in deviation within treatment mirror (preferences)
    - fourth bar : mean difference in deviation within treatment inequalities (obj goal)
    - fifth bar : analogue of third bar but in percentage: the difference in between super and classic difference / classic difference
    - sixth bar : analogue of fourth bar but in percentage: the difference in between super and classic difference / classic difference

Completed: `make_incentive_deviation()` now creates participant-level mean, treatment-difference, and percentage-difference tables for the six bar plots. It uses `super - classic`, participant-level SEs, and paired Wilcoxon tests. `barplot_data` contains the six bar values and SEs plus the pooled and interaction p-values. The current test data produce one bar-table row from 3 participants and 90 valid MPL equivalents.

Completed: `plot_incentive_deviation_bars()` creates the six-bar ggplot2 visualization with ±2 SE error bars and paired Wilcoxon p-value annotations. Super/mirror use `#E7B800`; classic/inequalities use `#00AFBB`. The PNG is saved under `data/figures_test_14112026/`.



## additional data
<!-- (not now) - do a main plot for gain lotteries with the data of the last 5 questions (artihmeticTrials) -->
- I would like to do the same 6 bars graphics as the one for deviation differences in super and classic (and their interaction with the treatment), but instead of deviations there should be reaction time (in the mpl tasks) for the first graphic and cognitive uncertainty (in the mpl tasks) for the second. Pay attention that reverse encoded : 0 is complete uncertainty and 100 is certainty. You should not keep this sense, and instead in the plot have 100 = uncertainty.
- could you make a table with one column for each type of gain lottery (GO10 to GO90). One line for the mean CE deviation and one line for the mean result - real value calculated in the last questions of the experiment and a third line p_value between the two, wilcoxon paired. The calculations are matched with the lotteries. For intance you have calculations in sliderArTest75 corresponding to the calculation of GO75 : (25*75)/100. You have to put the mean value of arTest75 in the column GO75 of the table, and the mean deviation in the mpls on GO75 just above, in the same column. I want this table to be displayed plotted : on the x-axis the different types of mpls ranked by probabilities, and on the y-axis deviation from expected value, with one point for arithmetic deviation and one point for CE deviation.
- double all the bar-plots for order : selecting the values in first order or second order. It is already implemented for some mainPlots, (it means selecting mpl trials with subBlock in (1:14) for order 1 and (15:to 18) for order 2). The inference test cannot be paired for treatment (obj-goal or preferences) when they are compared given an order because each participant see each treatment in only one order (contrary to super vs incentives which they see both in the first and in the second treatement). 
- the same incentive bar plots of deviations/RT/cognitive uncertainty depending on incentive (super or classic), substraction and %, but at the choice level and not participant level ? For the inference, use standard errors clustered at the participant level, do not assume homoskedasticity. 

Completed: choice-level incentive plots are generated with trial observations
as the descriptive unit and participant-clustered heteroskedasticity-robust
standard errors. The same six bars are produced for deviation, reaction time,
and cognitive uncertainty, both pooled and separately for order 1 and order 2.
The figures are saved with `choice_level_` prefixes in
`data/figures_pilot1&2/`.
- compute the correlation between deviations and time, cognitive uncertainty and self-reported attention




Completed: MPL reaction time and cognitive uncertainty are now prepared with the same six-bar structure as deviations. Each metric uses all valid incentivized MPL rows, independently of whether a CE/LE deviation could be calculated. It is first averaged within subject and incentive status (and within subject, treatment, and incentive status for treatment differences), then summarized across subjects with subject-level SD/SE and paired Wilcoxon tests. Cognitive uncertainty is plotted as `100 - CU`, so higher values mean greater uncertainty. Correlation analyses remain pending.

Completed: `make_gain_arithmetic_table()` creates the requested GO10--GO90 table. It averages CE minus expected value and arithmetic answer minus expected value within participant and probability, then reports the two means, participant-level SEs, and a paired Wilcoxon p-value for each probability. The participant-level intermediate and the three-row wide table remain available as in-memory data frames in `gain_arithmetic_tables$participant_table` and `gain_arithmetic_tables$table`. `calculationVsCE` plots the two deviation series by gain MPL probability with +/-2 SE error bars and the paired p-value for each probability; it is saved as `data/figures_pilot1&2/calculationVsCE.png`.
