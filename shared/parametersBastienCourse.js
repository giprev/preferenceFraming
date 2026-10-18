const expIsIncentives = true; // whether the experiment is the one with incentives for the MPL (in which case some instructions and feedback are different)


const level = 3; //available levels: 0, 1, 2, 3
const fixationDuration = 500; //500ms
const letterDuration = 1500; //1500ms
const feedBackDuration = 1000;//1000ms
const basePayment_hard = 6; //
const basePayment_easy = 6; // 
const notUnderstoodPayment = 6; 
const spanMplPayment_hard = 3.3;
const calibrationPayment = 1; // 1.03€ rounded
const spanSpanPayment_hard = 1;// 1.03€ rounded
const spanMplPayment_easy = spanMplPayment_hard;
//const spanSpanPayment_easy = spanMplPayment_hard * 0.25; // NOT USED as it's the same as spanSpanPayment_hard
const propSelecForMPL = 11; // 1 out of propSelecForMPL participants will be selected for the MPL payment : that makes an EV of around 2.1€.
const fds_letter_presentation = 500; //500ms
const fds_post_trial_gap = 250; //250ms
// Change default language to French

const practice_duration = 30000; //= 30000; // duration of practice flanker
const main_duration = 15000; //= 15000; // duration of main task flanker
const arithmetic_duration = 60000; // duration of arithmetic task in ms
const mplTimeLimit = 15000; // time limit for the MPL task in ms (fixed 15s, no early submit)
const betweenSpanTimeInterval = 4500; // time interval between blue (source) and red (target) letters in ms (add 500 with post trial)
const setup_fds_trial_duration = 4500// 4500 // time interval between the answers to the span and the beginning of a new one in spanMPL + 500ms post_trial
let total_flanker = 0;
let total_flanker_easy = 0;
let total_flanker_hard = 0;
let block_trial_count = 0;
let practice_indicator = 1; // Indicator of whether the trials being shown belong to the practice phase. The first does, then it switches to 0 in after_flanker_practice. 
let timeout = 0; // Indicator whether trial was responded to when the task timed out
let block_start;
let block_time_limit;
let items_flanker = Array.from(Array(16).keys()); // Array from 0-15
let blockEasy = 0;
let nAngles = 20 ; // number of angles to generate for the angles motivation task

const arithmeticPayment = 0.15; // 0.02€ per correctly solved sum in the arithmetic task, task, 
const nRoundsArithmetic = 4; // number of rounds in the arithmetic task (each round is 1 minute long)

let totalFdsSpanMplTrials = 16; // 14 of Oprea plus two originals from Oprea
let treatment = "";
if (Math.random() < 0.5) { treatment = "hard"; } else { treatment = "easy"; }
if (jatos!==undefined && jatos.urlQueryParameters !== undefined && jatos.urlQueryParameters.label !== undefined) {
    console.log("label is", jatos.urlQueryParameters.label)
    if (["MOS", "SOF", "ROM", "HEL", "BRU", "BUD", "VAR", "PRA", "ZUR", "RIG", "LAB", "BOX1"].includes(jatos.urlQueryParameters.label)) {
        treatment = "easy"
    }
    else {treatment = "hard"}
}

let treatmentGoal = 'mirr'; // always mirr
//if (Math.random() < 0.5) { treatmentGoal = "ineq"; } else { treatmentGoal = "mirr" }; // treatment for mpl Incentives is either "inequalities" (goal is to find the highest value) or "mirror" (Oprea's mirrors)
let totalFdsTrainingTrials = 9; // number of rounds of the calibration

let setup_MPLIncentives_trialDuration = 5000 // for MPLIncentives, duration of the page that announces the round and if the next MPL is highly incentivized or not
let basePaymentMPLIncentives = 0.5;
const propSelecForMPLIncentives = 5; // 1 out of propSelecForMPLIncentives participants will be selected for the MPL payment in the incentives experiment

const baseBonusArithmeticTest = 0.5; // 0.5€ if the arithmetic question (calculate an average) is answered correctly. Otherwise it is linearly decreasing with the distance between the answer and the correct result, with a minimum of 0 and a maximum of 0.5€.

console.log("treatment is", treatment)
console.log("treatmentGoal is", treatmentGoal)
console.log("not understood payment in parameters is", notUnderstoodPayment)
