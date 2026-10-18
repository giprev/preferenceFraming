const level = 3; //available levels: 0, 1, 2, 3
const fixationDuration = 50; //500ms
const letterDuration = 150; //1500ms
const feedBackDuration = 100;//1000ms
const payment = 0 // payment amount for the n-back nback task
const basePayment_hard = 7; // Payment amount: = 7 euros
const basePayment_easy = 5; // Payment amount: = 5 euros
const spanMplPayment_hard = 2;
const calibrationPayment = spanMplPayment_hard /6;  // 1/6 of the MPL payment
const spanSpanPayment_hard = spanMplPayment_hard /6
const spanMplPayment_easy = 1;
const spanSpanPayment_easy = spanMplPayment_easy /6;
const propSelecForMPL = 10; // 1 out of propSelecForMPL participants will be selected for the MPL payment
const fds_letter_presentation = 500; //500ms
const fds_post_trial_gap = 250; //250ms
// Change default language to French

const practice_duration = 30; //= 30000; // duration of practice flanker
const main_duration = 150; //= 15000; // duration of main task flanker
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


let totalFdsSpanMplTrials = 14;
let treatment = "";
if (Math.random() < 0.5) { treatment = "hard"; } else { treatment = "easy"; }
console.log("treatment is", treatment)

let totalFdsTrainingTrials = treatment === "hard" ? 12 : 3; //number of trials in the training phase: 12 if cognitive load, to determine the appropriate load, 3 if easy just to ensure they have understood the task