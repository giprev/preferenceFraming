# The goal is to analyze the data by producing multiple plots and statistical inferences


## Research question

There are two research questions:
Firstly, what does the framing of choices as mathematical (objective performance) or preference (no objective performance, choose your preffered option) changes to the valuation of an option, elicited with Multiple Price Lists (MPL). Prospect Theory predicts that under risk, the fourfold pattern of choice under risk emerges : under-valuation of prospect for gains with large probibilities and losses with small probabilities (risk-aversion) and over-valuation of prospects for gains with small probabilities and losses with large probabilities. In our experiment we elicit valuations of "mirrors" : they are the same options as standard MPL, but an option pays the expected value of the lottery, so it has a deterministic payoff. Some papers in the litterature claim that the same fourfold pattern of choice emerges in the mirrors. We want to see if this pattern is due (at least partly) to the fact that when asked to choose at each row you're preffered value (preference framing), participants don't understand that there is still a notion of performance and utility maximization, and thus are more prone to do errors that lead to the fourfold pattern. This is why we implement two treatments : one that is "preference" and the other "inequalities". We want to compare the deviations of valuations from expected value for each type of lottery (probabilities 10%, 25%, 50%, 75%, 90%) in the preference and in the inequalities treatment, to see if the fourfold pattern decreases in the inequalities treatment. 

Secondly, we would like to know if the preference framing increases sensitivity to incentives. For that, in each treatment, 4 MPLs are randomly selected to be flagged as "super" MPLs (the other are said to be "classic") : they are the only ones that can be selected to be effectively paid at the end of the experiment. If people are sensitive to incentives, they will likely deviate less for those lotteries, and if this sensitivity is greater in the inequalities treatment, then the difference in deviations will be greater in the mathematics treatment.

## Experimental design

Each participant fills some demographics. Then sees the instructions for the MPL part and answers comprehension question regarding the MPLs. Participants are either in the preference treatment first or in the inequalities treatment first (they do one and then the other). Then answers some comprehension questions, and have four trials maximum to answers correctly, and look at the instructions again. Then the participant does a training MPL. Then the participant does all the MPLs (some of which are "super" and some "classic"). Then he or she see the instructions of the MPLs for the other treatment again, answers the comprehension questions again and do a training MPL again. Then he or she complete the MPLs for the other treatment. Then the participants answers some questions about their choices (where did they direct their attention, namely, for each treatment).

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
    6. "sliderQuestions_inequalities" : questions about the MPLs in the "inequalities" treatment
    7. "arithmeticTest" : it is the last part of the experiment where subjects are asked to do a few calculations
4. switchRow1Choice : choice of the second row (first choice after the switch)
    1. "sure" : sure amount option chosen
    2. "lottery" : the lottery (with or without risk) option was chosen
5. switchRow2Choice : choice of the first row (last choice before the switch to the other option). Same possible values. If both switchRow1Choice and switchRow2Choice are the same, it means no switch happened, the participants selectionned only the same option.
6. switch_row1 : the first row that the participant switched
7. switch_row2 : the second row that the participant switched. If both are 0 or -1 it means that the participant did not switch
8. CU : cognitive uncertainty. But here for the test data it is reversed : high CU means high certainty. Varies between 0 and 100, integers. 
9. treatIs : "mirr" for the preference treatments or "ineq" for the inequalities treatment
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

2. Secondly we should work on a R structure that enables to run tests and statistical analysis.
    1. We should see what is the best R structure to run statistical analysis and plotting and do data exploration. I suggest data frames, but you could help me confirm it is the best structure to work on.
    2. We have to create the main environment data file on which we will work thoughout the analysis, of the structure determined previously. If it is indeed a data frame we should convert the csv file into a dataframe, excluding some non-interesting columns : success, trial_type, trial_index, internal_node_id, participant_record, view_history.

Completed: `analysis_data` is the main tibble/dataframe. It is loaded from the validated CSV and excludes the six listed jsPsych metadata columns without changing the 277 trial rows or 3-participant count. The next step is to define and validate the analytic MPL subset and its variables.



