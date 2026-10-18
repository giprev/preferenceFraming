/*************** VARIABLES nback ***************/


let instruction;
let timeline = [];

const trialStructure = { type: "html-keyboard-response" };
const subjectId = jsPsych.randomization.randomID(15)

let passPractice = 0; // the counter of achieved (>= 80%) practice block
let practiceIndex = 0; // the index of the practice stimuli list
let block_order = 0;
let subBlock = 0;  // the counter of target + source task block (used for incentives)
let totSubBlocks = 12; // 6 easy and 6 hard for the nback only experiment
let lastSubBlockOfFirstBlock = 6 // the last sub-block of the first block (used for incentives), if it is selected, the first trials before the first visual nback are taken into account for the incentives

let remindDuration = 6000;
let pc = 0;

let maximumSpanCalibration = 0;

/*************** VARIABLES span ***************/
var useAudio = false; // change to false if you want this to be a visual task!

var currentDigitList; //current digit list
var totalCorrect = 0; //counter for total correct
var totalTrials = 0; //counter for total trials
var maxSpan; //value that will reflect a participant's maximum span (e.g., 6)
var folder = "digits/"; //folder name for storing the audio files
var fdsTrialNum = 1; //counter for trials
let fdsTotalTrials = 12;
let totalFdsSpanSpanTrials = 6;
var response = []; //for storing partcipants' responses
var fds_correct_ans; //for storing the correct answer on a given trial
var fds_correct_ans_first_letters; //for storing the correct answer of the fist letters in the span_span task
var staircaseChecker = []; //for assessing whether the span should move up/down/stay
var staircaseIndex = 0; //index for the current staircase
var digit_list = [1, 2, 3, 4, 5, 6, 7, 8, 9]; //digits to be used (unlikely you will want to change this)

let startingSpan = 6; //starting span for the calibration task. Then it is updated based on performance

var currentSpan; //to reference where participants currently are
var spanHistory = []; //easy logging of the participant's trajectory
var stimList; //this is going to house the ordering of the stimuli for each trial
var idx = 0; //for indexing the current letter to be presented
var exitLetters; //for exiting the letter loop
var fdb = "Not assigned"; // is the feedback displayed for the span, when it nothing has been selected

const arrSum = arr => arr.reduce((a, b) => a + b, 0) //simple variable for calculating sum of an array

let block_order_indicator_span_MPL = "";
let block_type = ""; // calibration/span_span/span_mpl
let subBlock_span_span = 0; // for incentives of span_span

let statusMPL = "none"; // at the beginning. Then it is mirror or lottery in the span_MPL phase
let actual_payment_calibration = 0;



/*************** VARIABLES span ***************/
let spanCounter = 0; // the counter for each n-back trial
let mplCounter = 0; // the counter for each mpl trial

const luckyPp = getRandomInt(1, propSelecForMPL); // determine if the participant is selected to be paid a random draw of an MPL
// let luckyPp = 1; // for testing purposes, set to 1 so that everyone is selected for MPL payment
console.log("luckyPp is ", luckyPp)

let failedQLottery = 0; // number of times lottery comprehension questions were failed
let incorrectQCountLottery = 0; // number of incorrect answers on the last lottery question trial
let missedQCountLottery = 0; // number of missed incorrect answers on the last lottery question trial
let failedQMirror = 0; // number of times mirror comprehension questions were failed
let incorrectQCountMirror = 0; // number of incorrect answers on the last mirror question trial
let missedQCountMirror = 0; // number of missed incorrect answers on the last mirror question trial

let maxQTrials = 4;
let showExplanationsQuestionsMirrors = false;
let showExplanationsQuestionsLotteries = false;

let isPaymentRulePhase = false;
let arithmeticInputBuffer = "";
let arithmeticInputHandler = null;
let arithmeticRoundTimer = null;
let arithmeticRoundCountdownInterval = null;
let arithmeticRoundStartTime = null;
const arithmeticRoundTimeoutMs = 10000; // 5 seconds
let incentivizedRound = null; // the round that will be most incentivized in the arithmetic task (2x more likely to be selected for payment than the other rounds)

/*************** VARIABLES arithmetic ***************/

let numberCorrectSums = 0; // counter for the number of correctly solved sums in the arithmetic task
let numberAttemptedSums = 0; // counter for the number of attempted sums in the arithmetic task
let arRoundIndicator = 0; // counter for the number of rounds in the arithmetic task, used for the calculation of bonuses

// take milliseconds and return a string in seconds, rounded up, e.g. "12s", to display the timer in the arithmetic task and mpl task
function formatSeconds(ms) {
    const s = Math.ceil(ms / 1000);
    return `${s}s`;
}


/************* Variables MPLIncentives ****************/
let numberTrialsMPLIncentives = 14;
let numberSuperIncentivizedMPLs = 4; // number of MPLs that are more incentivized than the others in the MPL incentives task
let superArray_ineq = generateIndexSuperMPLs(numberTrialsMPLIncentives) // indicates which MPLs are "super" (i.e. with higher incentives) in the MPL incentives task
console.log("superArray_ineq is ", superArray_ineq)
let superArray_mirr = generateIndexSuperMPLs(numberTrialsMPLIncentives) // indicates which MPLs are "super" (i.e. with higher incentives) in the MPL incentives task
console.log("superArray_mirr is ", superArray_mirr)
const luckyPpIncentives = getRandomInt(1, propSelecForMPLIncentives); // determine if the participant is selected to be paid a random draw of an MPL
console.log("luckyPpIncentives is ", luckyPpIncentives)
let treatHasChanged = false; // to indicate whether the treatment has changed (from mirror to inequalities or the inverse). It is used to shorten the instructions of the MPLs when participants see them a second time.
/*************** INSTRUCTIONS ***************/

const consentForm = {
    type: "instructions",
    pages: [`<h1>${language.welcomePage.welcome.replace("{treatment}", `${treatment}, label ${jatos.urlQueryParameters === undefined ? "---" : jatos.urlQueryParameters.label}`)}</h1>
                <p>${language.overviewPage.thanks}</p>
                <p>${language.overviewPage.anonimity}</p>
                <p>${language.overviewPage.question}</p>
                <p>${language.overviewPage.withdrawal}</p> 
                <p>${language.overviewPage.phone}</p> 
                <p>${language.overviewPage.clickNext}</p>`]
    ,
    show_clickable_nav: true,
    button_label_next: language.button.next,
    button_label_previous: language.button.previous,
    allow_backward: true,
}
const demographics = (function () {
    // build options from language object (same as before)
    const options = {
        gender: language.demographics.options.gender.slice(),
        education: language.demographics.options.education.slice(),
        work: language.demographics.options.work.slice(),
        income: language.demographics.options.income.slice(),
        collegeDegree: language.demographics.options.collegeDegree ? language.demographics.options.collegeDegree.slice() : ["Yes", "No"],
        collegeCourse: language.demographics.options.collegeCourse ? language.demographics.options.collegeCourse.slice() : ["Yes", "No"],
        life: language.demographics.options.life.slice()
    };

    // build age options 18..99
    const ageOpts = Array.from({ length: 99 - 18 + 1 }, (_, i) => 18 + i).map(y => `<option value="${y}">${y}</option>`).join("\n");
    // build final html for the form (age first)
    const htmlParts = [];
    // age question
    const agePrompt = "Quel âge avez-vous ?";

    // helper to build a <select> HTML block
    function selectHtml(name, prompt, opts, required = true) {
        const req = required ? 'required' : '';
        const optsHtml = opts.map(o => `<option value="${o}">${o}</option>`).join('\n');
        return `
        <div class="jspsych-survey-dropdown-question" style="margin-bottom:16px;">
          <label for="${name}" style="display:block; margin-bottom:6px; font-weight:600;">${prompt}</label>
          <select name="${name}" id="${name}" ${req} style="width:100%; padding:8px; font-size:14px;">
            <option value="" disabled selected>--</option>
            ${optsHtml}
          </select>
        </div>`;
    }

    // build final html for the form
    htmlParts.push(`<div style="max-width:800px; margin:0 auto;"><h2>${language.demographics.preamble}</h2>`);
    htmlParts.push(`
      <div class="jspsych-survey-dropdown-question" style="margin-bottom:16px;">
        <label for="age" style="display:block; margin-bottom:6px; font-weight:600;">${agePrompt}</label>
        <select name="age" id="age" required style="width:100%; padding:8px; font-size:14px;">
          <option value="" disabled selected>--</option>
          ${ageOpts}
        </select>
      </div>
    `);
    htmlParts.push(selectHtml('gender', language.demographics.questions[1], options.gender, true));
    htmlParts.push(selectHtml('education', language.demographics.questions[2], options.education, true));
    htmlParts.push(selectHtml('work', language.demographics.questions[3], options.work, true));
    htmlParts.push(selectHtml('income', language.demographics.questions[4], options.income, true));
    htmlParts.push(selectHtml('collegeDegree', language.demographics.questions[5], options.collegeDegree, true));
    htmlParts.push(selectHtml('collegeCourse', language.demographics.questions[6], options.collegeCourse, true));
    htmlParts.push(selectHtml('life', language.demographics.questions[7], options.life, true));
    htmlParts.push(`</div>`);

    const finalHtml = htmlParts.join('\n');

    return {
        type: "survey-html-form",
        data: { task: 'demographics' },
        html: function () {
            return finalHtml;
        },
        button_label: language.button.next,
        on_start: function (trial) {
            // copy the last validated age into this trial's data so it is saved with the rest
            const last = jsPsych.data.get().filter({ task: 'demographics_age', age_valid: true }).last(1).values()[0];
            if (last && typeof last.age !== 'undefined') {
                trial.data = trial.data || {};
                trial.data.age = last.age;
            }
        },
        on_finish: function (data) {
            // Parse form responses (survey-html-form returns a JSON string)
            let responses = {};
            try {
                responses = JSON.parse(data.responses);
            } catch (e) {
                console.warn('Could not parse demographics responses', data.responses);
            }
            // store parsed fields directly on trial data
            data.age = responses.age
            data.gender = responses.gender || null;
            data.education = responses.education || null;
            data.work = responses.work || null;
            data.income = responses.income || null;
            data.collegeDegree = responses.collegeDegree || null;
            data.collegeCourse = responses.collegeCourse || null;
            data.life = responses.life || null;

            // debug
            console.log('demographics saved', {
                age: data.age,
                gender: data.gender,
                education: data.education,
                work: data.work,
                income: data.income,
                collegeDegree: data.collegeDegree,
                collegeCourse: data.collegeCourse,
                life: data.life,
                age: data.age
            });
        }
    };
})();

const instructionsBeforeCalibration = {
    type: "instructions",
    pages: [
        `       <h2>${language.descriptionExperimentSpanMPL.title}</h2>
                <p>${language.descriptionExperimentSpanMPL.threeParts}</p>
                <p>${language.descriptionExperimentSpanMPL.payment.replace("{notUnderstoodPayment}", Math.round(notUnderstoodPayment * 100) / 100)}</p>
                <!--<p>${language.descriptionExperimentSpanMPL.warningComprehensionQuestions}</p>-->
                <p>${language.descriptionExperimentSpanMPL.descriptionSpan}</p>
                <p>${language.descriptionExperimentSpanMPL.examplePresentation}</p>
                <p>${language.descriptionExperimentSpanMPL.precision}</p>
                <p>${language.descriptionExperimentSpanMPL.examplePrecision}</p>
                <p>${language.descriptionExperimentSpanMPL.clickNext}</p>`,

        `<h2>${language.instructionCalibration.title}</h2>
                <p>${language.instructionCalibration.rounds}</p>
                <p>${language.instructionCalibration.bonus}</p>
                <p>${language.instructionCalibration.incentiveRule.replace("{partBonus}", Math.round((calibrationPayment / 2) * 100) / 100)}</p>
                <p>${language.instructionCalibration.incentiveRuleExample.replace("{partBonus}", Math.round((calibrationPayment / 2) * 100) / 100).replace("{examplePayment}", 2 * Math.round((calibrationPayment / 2) * 100) / 100)}</p>
                <p>${language.instructionCalibration.clickNext}</p>`
    ],
    show_clickable_nav: true,
    button_label_next: language.button.next,
    button_label_previous: language.button.previous,
    allow_backward: true,
}


const instructionsSpanSpan = {
    type: "instructions",
    pages: function () {
        let someBlueDigits, theBlueDigits, the;
        if (treatment == "hard") {
            someBlueDigits = language.instructionsSpanSpan.variableHard.someBlueDigits;
            theBlueDigits = language.instructionsSpanSpan.variableHard.theBlueDigits;
            the = language.instructionsSpanSpan.variableHard.the;
            displayed = language.instructionsSpanSpan.variableHard.displayed;
            theBlueWithDu = language.instructionsSpanSpan.variableHard.theBlueWithDu;
        }
        if (treatment == "easy") {
            someBlueDigits = language.instructionsSpanSpan.variableEasy.someBlueDigits;
            theBlueDigits = language.instructionsSpanSpan.variableEasy.theBlueDigits;
            the = language.instructionsSpanSpan.variableEasy.the;
            displayed = language.instructionsSpanSpan.variableEasy.displayed;
            theBlueWithDu = language.instructionsSpanSpan.variableEasy.theBlueWithDu;
        }

        // version where the red digits task is named
        return [`<h2>${language.instructionsSpanSpan.title}</h2>
        <p>${language.instructionsSpanSpan.description}</p>
        <p>${language.instructionsSpanSpan.lettersOrder.replace("{someBlueDigits}", someBlueDigits).replace("{theBlueDigits}", theBlueDigits)}</p>
        <p>${language.instructionsSpanSpan.bonus}</p>
        <p>${language.instructionsSpanSpan.bonusBlue.replace("{theBlueDigits}", theBlueDigits)}
        <p>${language.instructionsSpanSpan.bonusRed}</p>
        <p>${language.instructionsSpanSpan.incentiveRuleExample.replace("{theBlueDigits}", theBlueDigits).replace("{bonus}", spanSpanPayment_hard).replace("{examplePayment}", Math.round((spanSpanPayment_hard * ((67 / 100) + (33 / 100) * 0.1) * 100)) / 100)}</p>
        <p>${language.instructionsSpanSpan.reminder}</p>
        <p>${language.instructionsSpanSpan.remember.replace("{theBlueDigits}", theBlueDigits).replace("{theBlueWithDu}", theBlueWithDu)}</p>
        <p>${language.instructionsSpanSpan.clickNext}</p>`
        ];

    },
    show_clickable_nav: true,
    button_label_next: language.button.next,
    button_label_previous: language.button.previous,
    allow_backward: true,
}

const instructionsSpanMPLMirror = {
    type: "instructions",
    pages: function () {
        // change the goal of the task in the instructions if it is the incentives block or not
        let decisionTableSubtitle = "";
        if (block_type == "mpl_incentives" & treatmentGoal == "ineq") { decisionTableSubtitle = language.instructionsDecisionTable.subTitleInequalities }
        else { decisionTableSubtitle = language.instructionsDecisionTable.subTitle; }

        return [
            // `<h2>${language.instructionsThirdPart.title}</h2>
            // <p>${language.instructionsThirdPart.description}</p>
            // <!--<p>${language.instructionsThirdPart.freqMPL.replace('{frequency}', propSelecForMPL)}</p> --> 
            // <p>${language.instructionsThirdPart.clickNext}</p>`,

            ` <h2>${language.instructionsDecisionTable.title}</h2>
        <p>${language.instructionsDecisionTable.description}</p>
        <h3>${language.instructionsDecisionTable.subTitle}</h3>
        <p>${language.instructionsDecisionTable.descriptionBoxes}</p>
        <p>${language.instructionsDecisionTable.descriptionMoney}</p>
        <p>${language.instructionsDecisionTable.optionsDiffer}</p>
        <p>${language.instructionsDecisionTable.bonusAverageBox}</p>
        <p>${language.instructionsDecisionTable.breakDownWithExamples}</p>
         <br>
        <!-- Example 1 (separate box) -->
        <div style="border:1px solid #9f9f9f; background: #fffaf0; padding:18px; border-radius:8px; margin:12px 0; box-shadow: 0 10px 24px rgba(0,0,0,0.10);">
            <p style="font-weight:600; margin:0 0 8px 0; color:#222;">${language.instructionsDecisionTable.example1}</p>
            ${example1MPL.replace('width: 50vw; margin: auto;', 'width: 100%; margin: 0;')}
            <br><p style="margin:8px 0 0 0; color:#333;">${language.instructionsDecisionTable.example1ExplanationMirror}</p>
        </div></div>

        <!-- Example 2 (separate box, same style) -->
        <div style="border:1px solid #9f9f9f; background: #fffaf0; padding:18px; border-radius:8px; margin:12px 0; box-shadow: 0 10px 24px rgba(0,0,0,0.10);">
            <p style="font-weight:600; margin:0 0 8px 0; color:#222;">${language.instructionsDecisionTable.example2}</p>
            ${example2MPL.replace('width: 50vw; margin: auto;', 'width: 100%; margin: 0;')}
            <br><p style="margin:8px 0 0 0; color:#333;">${language.instructionsDecisionTable.example2ExplanationMirror}</p>
        </div></div><br>
        <p>${language.instructionsDecisionTable.clickNext}</p>`,

            `<!-- <h2>${language.instructionsClickToChoose.title}</h2> --> 
        <p>${language.instructionsClickToChoose.clickToChoose}</p>
        ${example1MPLSelected.replace('width: 50vw; margin: auto;', 'width: 100%; margin: 0;')}
        <p>${language.instructionsClickToChoose.clickToChooseExample}</p>
        <p>${language.instructionsClickToChoose.comprehensionQuestionsFirstAfter}</p>
        <p>${language.instructionsClickToChoose.clickNext}</p>`


        ];
    },
    show_clickable_nav: true,
    button_label_next: language.button.next,
    button_label_previous: language.button.previous,
    allow_backward: true,
}

const instructionsSpanMPLMirrorIncentives = {
    type: "instructions",
    pages: function () {
        // change the goal of the task in the instructions if it is the incentives block or not
        let decisionTableSubtitle = "";
        if (treatIs == "ineq") {
            decisionTableSubtitle = language.instructionsDecisionTable.subTitleInequalities
            exemple1Explanation = language.instructionsDecisionTable.example1ExplanationMirrorIncentivesIneq;
            exemple2Explanation = language.instructionsDecisionTable.example2ExplanationMirrorIncentivesIneq;

        }
        else if (treatIs == "mirr") {
            decisionTableSubtitle = language.instructionsDecisionTable.subTitle;
            exemple1Explanation = language.instructionsDecisionTable.example1ExplanationMirrorIncentivesMirr;
            exemple2Explanation = language.instructionsDecisionTable.example2ExplanationMirrorIncentivesMirr;
        }

        if (treatHasChanged == false) {
            return [
                ` <h2>${language.descriptionExperimentSpanMPL.title}</h2>
                    <p>${language.descriptionExperimentSpanMPL.twoPartsIncentives}</p>
                    <p>${language.descriptionExperimentSpanMPL.payment.replace("{basePaymentMPLIncentives}", Math.round(basePaymentMPLIncentives * 100) / 100)}</p>
                    <p>${language.descriptionExperimentSpanMPL.clickNext}</p>`,
                // `<h2>${language.instructionsThirdPart.title}</h2>
                // <p>${language.instructionsThirdPart.description}</p>
                // <!--<p>${language.instructionsThirdPart.freqMPL.replace('{frequency}', propSelecForMPL)}</p> --> 
                // <p>${language.instructionsThirdPart.clickNext}</p>`,

                ` <h2>${language.instructionsDecisionTable.titleIncentives}</h2>
                <p>${language.instructionsDecisionTable.descriptionIncentives}</p>
                <h3>${decisionTableSubtitle}</h3>
                <p>${language.instructionsDecisionTable.descriptionBoxes}</p>
                <p>${language.instructionsDecisionTable.descriptionMoney}</p>
                <p>${language.instructionsDecisionTable.optionsDiffer}</p>
                <p>${language.instructionsDecisionTable.bonusAverageBoxIncentives}</p>
                <p>${language.instructionsDecisionTable.breakDownWithExamples}</p>
                <br>
                <!-- Example 1 (separate box) -->
                <div style="border:1px solid #9f9f9f; background: #fffaf0; padding:18px; border-radius:8px; margin:12px 0; box-shadow: 0 10px 24px rgba(0,0,0,0.10);">
                    <p style="font-weight:600; margin:0 0 8px 0; color:#222;">${language.instructionsDecisionTable.example1}</p>
                    ${example1MPL.replace('width: 50vw; margin: auto;', 'width: 100%; margin: 0;')}
                    <br><p style="margin:8px 0 0 0; color:#333;">${exemple1Explanation}</p>
                </div></div>

                <!-- Example 2 (separate box, same style) -->
                <div style="border:1px solid #9f9f9f; background: #fffaf0; padding:18px; border-radius:8px; margin:12px 0; box-shadow: 0 10px 24px rgba(0,0,0,0.10);">
                    <p style="font-weight:600; margin:0 0 8px 0; color:#222;">${language.instructionsDecisionTable.example2}</p>
                    ${example2MPL.replace('width: 50vw; margin: auto;', 'width: 100%; margin: 0;')}
                    <br><p style="margin:8px 0 0 0; color:#333;">${exemple2Explanation}</p>
                </div></div><br>
                <p>${language.instructionsDecisionTable.clickNext}</p>`,

                `<p>${language.instructionsClickToChoose.clickToChoose}</p>
                ${example1MPLSelected.replace('width: 50vw; margin: auto;', 'width: 100%; margin: 0;')}
                <p>${language.instructionsClickToChoose.clickToChooseExample}</p>
                <!-- <p>${language.instructionsClickToChoose.comprehensionQuestionsFirstAfter}</p> -->
                <p>${language.instructionsClickToChoose.clickNext}</p>`
            ];
        }
        else if (treatHasChanged == true) {
            return [ // when participants see the second treatment of MPL, shorten some instructions
                ` <h2>${language.instructionsDecisionTable.titleIncentives}</h2>
                <!-- <p>${language.instructionsDecisionTable.descriptionIncentives}</p>-->
                <h3>${decisionTableSubtitle}</h3>
                <p>${language.instructionsDecisionTable.descriptionBoxes}</p>
                <p>${language.instructionsDecisionTable.descriptionMoney}</p>
                <p>${language.instructionsDecisionTable.optionsDiffer}</p>
                <p>${language.instructionsDecisionTable.bonusAverageBoxIncentives}</p>
                <p>${language.instructionsDecisionTable.breakDownWithExamples}</p>
                <br>
                <!-- Example 1 (separate box) -->
                <div style="border:1px solid #9f9f9f; background: #fffaf0; padding:18px; border-radius:8px; margin:12px 0; box-shadow: 0 10px 24px rgba(0,0,0,0.10);">
                    <p style="font-weight:600; margin:0 0 8px 0; color:#222;">${language.instructionsDecisionTable.example1}</p>
                    ${example1MPL.replace('width: 50vw; margin: auto;', 'width: 100%; margin: 0;')}
                    <br><p style="margin:8px 0 0 0; color:#333;">${exemple1Explanation}</p>
                </div></div>

                <!-- Example 2 (separate box, same style) -->
                <div style="border:1px solid #9f9f9f; background: #fffaf0; padding:18px; border-radius:8px; margin:12px 0; box-shadow: 0 10px 24px rgba(0,0,0,0.10);">
                    <p style="font-weight:600; margin:0 0 8px 0; color:#222;">${language.instructionsDecisionTable.example2}</p>
                    ${example2MPL.replace('width: 50vw; margin: auto;', 'width: 100%; margin: 0;')}
                    <br><p style="margin:8px 0 0 0; color:#333;">${exemple2Explanation}</p>
                </div></div><br>
                <p>${language.instructionsDecisionTable.clickNext}</p>`,

                `<p>${language.instructionsClickToChoose.clickToChoose}</p>
                ${example1MPLSelected.replace('width: 50vw; margin: auto;', 'width: 100%; margin: 0;')}
                <p>${language.instructionsClickToChoose.clickToChooseExample}</p>
                <!-- <p>${language.instructionsClickToChoose.comprehensionQuestionsFirstAfter}</p> -->
                <p>${language.instructionsClickToChoose.clickNext}</p>`
            ];
        }
    },
    show_clickable_nav: true,
    button_label_next: language.button.next,
    button_label_previous: language.button.previous,
    allow_backward: true,
}
const instructionsSpanMPLLottery = {
    type: "instructions",
    pages: function () {

        return [
            // `<h2>${language.instructionsThirdPart.title}</h2>
            //     <p>${language.instructionsThirdPart.description}</p>
            //     <p>${language.instructionsThirdPart.freqMPL.replace('{frequency}', propSelecForMPL)}</p>
            //     <p>${language.instructionsThirdPart.clickNext}</p>`,

            `<h2>${language.instructionsDecisionTable.title}</h2>
        <p>${language.instructionsDecisionTable.description}</p>
        <h3>${language.instructionsDecisionTable.subTitle}</h3>
        <p>${language.instructionsDecisionTable.descriptionBoxes}</p>
        <p>${language.instructionsDecisionTable.descriptionMoney}</p>
        <p>${language.instructionsDecisionTable.optionsDiffer}</p>
        <p>${language.instructionsDecisionTable.bonusRandomBox}</p>
        <p>${language.instructionsDecisionTable.breakDownWithExamples}</p>
         <br>
        <!-- Example 1 (separate box) -->
        <div style="border:1px solid #9f9f9f; background: #fffaf0; padding:18px; border-radius:8px; margin:12px 0; box-shadow: 0 10px 24px rgba(0,0,0,0.10);">
            <p style="font-weight:600; margin:0 0 8px 0; color:#222;">${language.instructionsDecisionTable.example1}</p>
            ${example1MPL.replace('width: 50vw; margin: auto;', 'width: 100%; margin: 0;')}
            <br><p style="margin:8px 0 0 0; color:#333;">${language.instructionsDecisionTable.example1ExplanationLottery}</p>
        </div></div><br>

        <!-- Example 2 (separate box, same style) -->
        <div style="border:1px solid #9f9f9f; background: #fffaf0; padding:18px; border-radius:8px; margin:12px 0; box-shadow: 0 10px 24px rgba(0,0,0,0.10);">
            <p style="font-weight:600; margin:0 0 8px 0; color:#222;">${language.instructionsDecisionTable.example2}</p>
            ${example2MPL.replace('width: 50vw; margin: auto;', 'width: 100%; margin: 0;')}
            <br><p style="margin:8px 0 0 0; color:#333;">${language.instructionsDecisionTable.example2ExplanationLottery}</p>
        </div></div>
        <p>${language.instructionsDecisionTable.clickNext}</p>`,

            `<!--<h2>${language.instructionsClickToChoose.title}</h2>-->
        <p>${language.instructionsClickToChoose.clickToChoose}</p>
        ${example1MPLSelected.replace('width: 50vw; margin: auto;', 'width: 100%; margin: 0;')}
        <p>${language.instructionsClickToChoose.clickToChooseExample}</p>
        <p>${language.instructionsClickToChoose.comprehensionQuestionsFirstAfter}</p>
        <p>${language.instructionsClickToChoose.clickNext}</p>`

        ];

    },
    show_clickable_nav: true,
    button_label_next: language.button.next,
    button_label_previous: language.button.previous,
    allow_backward: true,
};

const secondInstructionsPaymentRuleLottery = {
    type: "instructions",
    pages: function () {
        return [
            `<h2>${language.instructionsDecisionTable.titleSecondInstructions}</h2>
        <p>${language.instructionsDecisionTable.bonusRandomBox}</p>
        <p>${language.instructionsDecisionTable.breakDownWithExamples}</p>
         <br>
        <!-- Example 1 (separate box) -->
        <div style="border:1px solid #9f9f9f; background: #fffaf0; padding:18px; border-radius:8px; margin:12px 0; box-shadow: 0 10px 24px rgba(0,0,0,0.10);">
            <p style="font-weight:600; margin:0 0 8px 0; color:#222;">${language.instructionsDecisionTable.example1}</p>
            ${example1MPL.replace('width: 50vw; margin: auto;', 'width: 100%; margin: 0;')}
            <p style="margin:8px 0 0 0; color:#333;">${language.instructionsDecisionTable.example1ExplanationLottery}</p>
        </div></div>

        <!-- Example 2 (separate box, same style) -->
        <div style="border:1px solid #9f9f9f; background: #fffaf0; padding:18px; border-radius:8px; margin:12px 0; box-shadow: 0 10px 24px rgba(0,0,0,0.10);">
            <p style="font-weight:600; margin:0 0 8px 0; color:#222;">${language.instructionsDecisionTable.example2}</p>
            ${example2MPL.replace('width: 50vw; margin: auto;', 'width: 100%; margin: 0;')}
            <p style="margin:8px 0 0 0; color:#333;">${language.instructionsDecisionTable.example2ExplanationLottery}</p>
        </div></div>
        <p>${language.instructionsDecisionTable.clickNextSecond}</p>`
            ,
        ];
    },
    show_clickable_nav: true,
    button_label_next: language.button.next,
    button_label_previous: language.button.previous,
    allow_backward: true,
};
const secondInstructionsPaymentRuleMirror = {
    type: "instructions",
    pages: function () {

        return [
            `<h2>${language.instructionsDecisionTable.titleSecondInstructions}</h2>
        <p>${language.instructionsDecisionTable.bonusAverageBox}</p>
        <p>${language.instructionsDecisionTable.breakDownWithExamples}</p>
         <br>
        <!-- Example 1 (separate box) -->
        <div style="border:1px solid #9f9f9f; background: #fffaf0; padding:18px; border-radius:8px; margin:12px 0; box-shadow: 0 10px 24px rgba(0,0,0,0.10);">
            <p style="font-weight:600; margin:0 0 8px 0; color:#222;">${language.instructionsDecisionTable.example1}</p>
            ${example1MPL.replace('width: 50vw; margin: auto;', 'width: 100%; margin: 0;')}
            <p style="margin:8px 0 0 0; color:#333;">${language.instructionsDecisionTable.example1ExplanationMirror}</p>
        </div></div>

        <!-- Example 2 (separate box, same style) -->
        <div style="border:1px solid #9f9f9f; background: #fffaf0; padding:18px; border-radius:8px; margin:12px 0; box-shadow: 0 10px 24px rgba(0,0,0,0.10);">
            <p style="font-weight:600; margin:0 0 8px 0; color:#222;">${language.instructionsDecisionTable.example2}</p>
            ${example2MPL.replace('width: 50vw; margin: auto;', 'width: 100%; margin: 0;')}
            <p style="margin:8px 0 0 0; color:#333;">${language.instructionsDecisionTable.example2ExplanationMirror}</p>
        </div></div>
        <p>${language.instructionsDecisionTable.clickNextSecond}</p>`,
        ];
    },
    show_clickable_nav: true,
    button_label_next: language.button.next,
    button_label_previous: language.button.previous,
    allow_backward: true,
}
// const OriginalComprehensionQuestionsMPLLottery = {
//     type: "survey-multi-select",
//     data: {task: 'comprehensionSurveyMPLLottery'},
//     questions: [
//         {
//             prompt: `${example6MPLSelected.replace('width: 50vw; margin: auto;', 'width: 100%; margin: 0;')}
//             <p>${language.comprehensionQMPLLottery.q1.promptMain}</p>`,
//             options: [
//                 language.comprehensionQMPLLottery.q1.options[0],
//                 language.comprehensionQMPLLottery.q1.options[1],
//                 language.comprehensionQMPLLottery.q1.options[2],
//                 language.comprehensionQMPLLottery.q1.options[3]
//             ],
//             required: true,
//             correct_response: [0,3],
//         },
//         {
//             prompt: `<br><br>${example9MPLSelected.replace('width: 50vw; margin: auto;', 'width: 100%; margin: 0;')}
//             <p>${language.comprehensionQMPLLottery.q2.prompt}</p>`,
//             options: [
//                 language.comprehensionQMPLLottery.q2.optionsMain[0],
//                 language.comprehensionQMPLLottery.q2.optionsMain[1],
//                 language.comprehensionQMPLLottery.q2.optionsMain[2],
//                 language.comprehensionQMPLLottery.q2.optionsMain[3]
//             ],
//             required: true,
//             correct_response: 2,
//         },
//     ],
//     button_label: language.button.next,
//     randomize_question_order : false,
//     preamble: `
//     <div style="position: fixed; top: 10px; right: 10px; z-index: 1000;">
//     <button type="button" id="help-button-comprehension" style="padding: 16px 34px; background-color: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 18px;">
//         ${language.button.help || "Help"}
//     </button>
//     </div>
//     <h2>${language.comprehensionMPLIntro.titleMain}</h2>
//     <h3>${language.comprehensionMPLExplanation.replace('{notUnderstoodPayment}', Math.round(notUnderstoodPayment*100)/100).replace('{buttonHelp}', language.button.help)}</h3>
//     <br><br>`,
//     on_finish: function (data) {
//         const responses = JSON.parse(data.responses);

//         let all_correct = true;
//         let questions_correct = []; // Array to track which questions were correct
//         let questions_incorrect = []; // Array to track which questions were incorrect
//         let detailed_results = {}; // Object to store detailed results for each question

//         let totalIncorrectResponses = 0; // RESET FOR EACH COMPREHENSION QUESTION PAGE!
//         comprehensionQuestionsMPLLottery.questions.forEach((q, i) => {
//             const given_answer = responses["Q" + i];
//             let correct_text = [];
//             let matched_count=0;
//             if (i == 0){
//                 correct_text = [q.options[q.correct_response[0]], q.options[q.correct_response[1]]];
//                 for (let k = 0; k < length(correct_text); k++) {
//                     if (given_answer[k] === correct_text[k]) {
//                         matched_count++;
//                         questions_correct.push(i + 1); // correct text (1-based index)
//                     } // correct text (1-based index)
//                 }
//             }
//             else if (i == 1){
//                 correct_text = q.options[q.correct_response-1];
//                 if (correct_text === given_answer) {
//                     matched_count++;}
//                 }


//             const is_correct = matched_count == 3; // for lotteries, 2 for mirrors

//             // Track results
//             if (is_correct) {
//                 questions_correct.push(i + 1); // Store 1-based question numbers
//             } else {
//                 questions_incorrect.push(i + 1);
//                 all_correct = false;
//                 totalIncorrectResponses += given_answer.filter(answer => answer !== correct_text).length;
//                 console.log("is_correct is", is_correct)
//                 console.log("totalIncorrectResponses is", totalIncorrectResponses)
//             }

//             // Store detailed results
//             detailed_results[`q${i + 1}`] = {
//                 question_number: i + 1,
//                 given_answer: given_answer,
//                 correct_answer: correct_text,
//                 is_correct: is_correct,
//                 correct_option_index: q.correct_response // 0-based index
//             };

//             console.log(`Question ${i + 1}: Given="${given_answer}", Correct="${correct_text}", Is Correct=${is_correct}`);
//         });
//         console.log("totalIncorrectResponses at the end is", totalIncorrectResponses)
//         incorrectQCountLottery = totalIncorrectResponses
//         console.log("incorrectQCountLottery is", incorrectQCountLottery, "and should be = to questions_incorrect.length =", questions_incorrect.length)

//         if (!all_correct) {
//             failedQLottery += 1;
//             console.log("is failed Q Lottery increased", failedQLottery)
//         }

//         // Save comprehensive results to trial data
//         data.all_correct = all_correct;
//         data.questions_correct = questions_correct;
//         data.questions_incorrect = questions_incorrect;
//         data.num_correct = questions_correct.length;
//         data.num_incorrect = questions_incorrect.length;
//         data.detailed_results = detailed_results;
//         data.incorrectQCountLottery = incorrectQCountLottery;
//         if (!all_correct) {data.failedQuestionsCountLottery = failedQLottery-1;}
//         else {data.failedQuestionsCountLottery = failedQLottery;}

//         console.log(`MPL Comprehension Results: ${questions_correct.length}/${comprehensionQuestionsMPLLottery.questions.length} correct`);
//         console.log("Questions answered correctly:", questions_correct);
//         console.log("Questions answered incorrectly:", questions_incorrect, "= to incorrecQCountLottery:", incorrectQCountLottery);
//         console.log("All correct:", all_correct);
//         console.log("detailed_results:", detailed_results);
//         console.log( data.incorrectQCountLottery, "is data.incorrectQCountLottery" );
//         console.log( data.failedQuestionsCountLottery, "is data.failedQuestionsCountLottery" );

//     },
//     // on_start: function(){
//     //     // Delegated handler: works with jsPsych survey-multi-select naming (e.g. jspsych-survey-multi-select-response-0)
//     //     function delegatedSingleChoiceHandler(e) {
//     //         const el = e.target;
//     //         if (!el || el.tagName !== 'INPUT') return;

//     //         // try to extract question index from common patterns:
//     //         // - jsPsych multi-select plugin: name="jspsych-survey-multi-select-response-<qIndex>"
//     //         // - older code: name="Q<qIndex>" or name="Q<qIndex>[]"
//     //         const name = el.name || '';
//     //         let m = name.match(/jspsych-survey-multi-select-response-(\d+)/);
//     //         let qIndex = null;
//     //         if (m) qIndex = parseInt(m[1], 10);
//     //         else {
//     //             m = name.match(/^Q(\d+)/);
//     //             if (m) qIndex = parseInt(m[1], 10);
//     //         }
//     //         if (qIndex === null || Number.isNaN(qIndex)) return;

//     //         // enforce single selection only for questions 0..3; leave question 4 (index 4) multi-select
//     //         if (qIndex >= 0 && qIndex <= 3) {
//     //             if (el.checked) {
//     //                 // uncheck all other inputs with the same name (same question)
//     //                 document.querySelectorAll(`input[name="${name}"]`).forEach(inp => {
//     //                     if (inp !== el) inp.checked = false;
//     //                 });
//     //             }
//     //         }
//     //     }

//     //     // Attach once (use capture so we get the event early); remove previous if any to avoid duplicates
//     //     document.body.removeEventListener('change', delegatedSingleChoiceHandler, true);
//     //     document.body.addEventListener('change', delegatedSingleChoiceHandler, true);
//     // },
//     on_load: function() {
//         // Add click handler for help button
//         const helpButton = document.getElementById('help-button-comprehension');
//         if (helpButton) {
//         helpButton.addEventListener('click', function(e) {
//                 e.preventDefault(); // Prevent any default behavior

//                 // Check if modal is already open
//                 if (!document.getElementById('instruction-modal')) {
//                     showInstructionModalForQuestions("lottery", isPaymentRulePhase); // 
//                 }
//             });
//         }
//     },

// };

const comprehensionQuestionsMPLLottery = {
    type: "survey-multi-select",
    data: { task: 'comprehensionSurveyMPLLottery' },
    questions: [
        {
            prompt: `${example6MPLSelected.replace('width: 50vw; margin: auto;', 'width: 100%; margin: 0;')}
            <p>${language.comprehensionQMPLLottery.q1.promptMain}</p>`,
            options: [
                language.comprehensionQMPLLottery.q1.options[0],
                language.comprehensionQMPLLottery.q1.options[1],
                language.comprehensionQMPLLottery.q1.options[2],
                language.comprehensionQMPLLottery.q1.options[3]
            ],
            required: true,
            correct_response: [0, 3],
        },
        {
            prompt: `<br><br>${example9MPLSelected.replace('width: 50vw; margin: auto;', 'width: 100%; margin: 0;')}
            <p>${language.comprehensionQMPLLottery.q2.prompt}</p>`,
            options: [
                language.comprehensionQMPLLottery.q2.optionsMain[0],
                language.comprehensionQMPLLottery.q2.optionsMain[1],
                language.comprehensionQMPLLottery.q2.optionsMain[2],
                language.comprehensionQMPLLottery.q2.optionsMain[3]
            ],
            required: true,
            correct_response: 1,
        },
    ],
    button_label: language.button.next,
    randomize_question_order: false,
    preamble: `
    <div style="position: fixed; top: 10px; right: 10px; z-index: 1000;">
    <button type="button" id="help-button-comprehension" style="padding: 16px 34px; background-color: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 18px;">
        ${language.button.help || "Help"}
    </button>
    </div>
    <h2>${language.comprehensionMPLIntro.titleMain}</h2>
    <h3>${language.comprehensionMPLExplanation.replace('{notUnderstoodPayment}', Math.round(notUnderstoodPayment * 100) / 100).replace('{buttonHelp}', language.button.help)}</h3>
    <br><br>`,
    on_finish: function (data) {
        const responses = JSON.parse(data.responses);

        let all_correct = true;
        let questions_correct = []; // Array to track which questions were correct
        let questions_incorrect = []; // Array to track which questions were incorrect
        let detailed_results = {}; // Object to store detailed results for each question

        let totalIncorrectResponses = 0; // RESET FOR EACH COMPREHENSION QUESTION PAGE!
        this.questions.forEach((q, i) => {
            // normalize given_answer to an array of strings (may be undefined/null or a string/array)
            const raw_given = responses["Q" + i];
            const givenArr = Array.isArray(raw_given) ? raw_given.map(String) : (raw_given == null ? [] : [String(raw_given)]);

            // build correctArr as array of strings (handles multi-select indices or single index)
            let correctArr = [];
            if (Array.isArray(q.correct_response)) {
                // correct_response holds indices (0-based) for multi-select
                correctArr = q.correct_response.map(idx => String(q.options[idx]));
            } else if (typeof q.correct_response === "number") {
                // single-index (likely 1-based in some definitions) -> try both conventions safely
                const idx0 = (q.correct_response >= 0 && q.correct_response < q.options.length) ? q.correct_response
                    : (q.correct_response > 0 && q.correct_response <= q.options.length ? q.correct_response - 1 : null);
                if (idx0 !== null) correctArr = [String(q.options[idx0])];
            } else {
                correctArr = [String(q.options[q.correct_response])];
            }

            // compute number of common elements (by value, not position)
            const matched_count = correctArr.filter(ans => givenArr.includes(ans)).length;

            // compute missing (correct answers not provided) and extra (given answers not in correct)
            const missing = Math.max(0, correctArr.length - matched_count);
            const non_common_count = Math.max(0, givenArr.length - matched_count);


            // decide correctness: true only if exact set match (no missing and no extra)
            const is_correct = (matched_count === correctArr.length && non_common_count === 0 && givenArr.length === correctArr.length);

            // bookkeeping
            if (is_correct) {
                questions_correct.push(i + 1);
            } else {
                questions_incorrect.push(i + 1);
                all_correct = false;
            }
            totalIncorrectResponses += non_common_count;

            // store detailed results
            detailed_results[`q${i + 1}`] = {
                question_number: i + 1,
                given_answer: givenArr,
                correct_answer: correctArr,
                is_correct: is_correct,
                matched_count: matched_count,
                non_common_count: non_common_count,
                correct_option_index: q.correct_response
            };

            console.log(`Q${i + 1} given:`, givenArr, "correct:", correctArr, "matched:", matched_count, "non_common:", non_common_count, "is_correct:", is_correct);
        });
        console.log("totalIncorrectResponses at the end is", totalIncorrectResponses)
        incorrectQCountLottery = totalIncorrectResponses
        console.log("incorrectQCountLottery is", incorrectQCountLottery, "and should be = to questions_incorrect.length =", questions_incorrect.length)

        if (!all_correct) {
            failedQLottery += 1;
            console.log("is failed Q Lottery increased", failedQLottery)
        }

        // Save comprehensive results to trial data
        data.all_correct = all_correct;
        data.questions_correct = questions_correct;
        data.questions_incorrect = questions_incorrect;
        data.num_correct = questions_correct.length;
        data.num_incorrect = questions_incorrect.length;
        data.detailed_results = detailed_results;
        data.incorrectQCountLottery = incorrectQCountLottery;
        data.failedQuestionsCountLottery = failedQLottery;

        console.log(`MPL Comprehension Results: ${questions_correct.length}/${comprehensionQuestionsMPLLottery.questions.length} correct`);
        console.log("Questions answered correctly:", questions_correct);
        console.log("Questions answered incorrectly:", questions_incorrect, "= to incorrecQCountLottery:", incorrectQCountLottery);
        console.log("All correct:", all_correct);
        console.log("detailed_results:", detailed_results);
        console.log(data.incorrectQCountLottery, "is data.incorrectQCountLottery");
        console.log(data.failedQuestionsCountLottery, "is data.failedQuestionsCountLottery");

    },
    // on_start: function(){
    //     // Delegated handler: works with jsPsych survey-multi-select naming (e.g. jspsych-survey-multi-select-response-0)
    //     function delegatedSingleChoiceHandler(e) {
    //         const el = e.target;
    //         if (!el || el.tagName !== 'INPUT') return;

    //         // try to extract question index from common patterns:
    //         // - jsPsych multi-select plugin: name="jspsych-survey-multi-select-response-<qIndex>"
    //         // - older code: name="Q<qIndex>" or name="Q<qIndex>[]"
    //         const name = el.name || '';
    //         let m = name.match(/jspsych-survey-multi-select-response-(\d+)/);
    //         let qIndex = null;
    //         if (m) qIndex = parseInt(m[1], 10);
    //         else {
    //             m = name.match(/^Q(\d+)/);
    //             if (m) qIndex = parseInt(m[1], 10);
    //         }
    //         if (qIndex === null || Number.isNaN(qIndex)) return;

    //         // enforce single selection only for questions 0..3; leave question 4 (index 4) multi-select
    //         if (qIndex >= 0 && qIndex <= 3) {
    //             if (el.checked) {
    //                 // uncheck all other inputs with the same name (same question)
    //                 document.querySelectorAll(`input[name="${name}"]`).forEach(inp => {
    //                     if (inp !== el) inp.checked = false;
    //                 });
    //             }
    //         }
    //     }

    //     // Attach once (use capture so we get the event early); remove previous if any to avoid duplicates
    //     document.body.removeEventListener('change', delegatedSingleChoiceHandler, true);
    //     document.body.addEventListener('change', delegatedSingleChoiceHandler, true);
    // },
    on_load: function () {
        // Add click handler for help button
        const helpButton = document.getElementById('help-button-comprehension');
        if (helpButton) {
            helpButton.addEventListener('click', function (e) {
                e.preventDefault(); // Prevent any default behavior

                // Check if modal is already open
                if (!document.getElementById('instruction-modal')) {
                    showInstructionModalForQuestions("lottery", isPaymentRulePhase); // 
                }
            });
        }
    },

};

const comprehensionQuestionsMPLMirror = {
    ...comprehensionQuestionsMPLLottery,
    data: { task: 'comprehensionSurveyMPLMirror' },
    questions: [
        {
            prompt: `${example6MPLSelected.replace('width: 50vw; margin: auto;', 'width: 100%; margin: 0;')}
            <p>${language.comprehensionQMPLMirror.q1.promptMain}</p>`,
            options: [
                language.comprehensionQMPLMirror.q1.options[0],
                language.comprehensionQMPLMirror.q1.options[1],
                language.comprehensionQMPLMirror.q1.options[2],
                language.comprehensionQMPLMirror.q1.options[3]
            ],
            required: true,
            correct_response: 2,
        },
        {
            prompt: `<br><br>${example9MPLSelected.replace('width: 50vw; margin: auto;', 'width: 100%; margin: 0;')}
            <p>${language.comprehensionQMPLMirror.q2.prompt}</p>`,
            options: [
                language.comprehensionQMPLMirror.q2.optionsMain[0],
                language.comprehensionQMPLMirror.q2.optionsMain[1],
                language.comprehensionQMPLMirror.q2.optionsMain[2],
                language.comprehensionQMPLMirror.q2.optionsMain[3]
            ],
            required: true,
            correct_response: 1,
        },

    ],

    button_label: language.button.next,
    randomize_question_order: false,
    preamble: `
    <div style="position: fixed; top: 10px; right: 10px; z-index: 1000;">
    <button type="button" id="help-button-comprehension" style="padding: 16px 34px; background-color: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 18px;">
        ${language.button.help || "Help"}
    </button>
    </div>
    <h2>${language.comprehensionMPLIntro.titleMain}</h2>
    <h3>${language.comprehensionMPLExplanation.replace('{notUnderstoodPayment}', Math.round(notUnderstoodPayment * 100) / 100).replace('{buttonHelp}', language.button.help)}</h3>
    <br><br>`,
    on_finish: function (data) {
        const responses = JSON.parse(data.responses);

        let all_correct = true;
        let questions_correct = []; // Array to track which questions were correct
        let questions_incorrect = []; // Array to track which questions were incorrect
        let detailed_results = {}; // Object to store detailed results for each question
        let missing = 0;

        let totalIncorrectResponses = 0; // RESET FOR EACH COMPREHENSION QUESTION PAGE!
        this.questions.forEach((q, i) => {
            // normalize given_answer to an array of strings (may be undefined/null or a string/array)
            const raw_given = responses["Q" + i];
            const givenArr = Array.isArray(raw_given) ? raw_given.map(String) : (raw_given == null ? [] : [String(raw_given)]);

            // build correctArr as array of strings (handles multi-select indices or single index)
            let correctArr = [];
            if (Array.isArray(q.correct_response)) {
                // correct_response holds indices (0-based) for multi-select
                correctArr = q.correct_response.map(idx => String(q.options[idx]));
            } else if (typeof q.correct_response === "number") {
                // single-index (likely 1-based in some definitions) -> try both conventions safely
                const idx0 = (q.correct_response >= 0 && q.correct_response < q.options.length) ? q.correct_response
                    : (q.correct_response > 0 && q.correct_response <= q.options.length ? q.correct_response - 1 : null);
                if (idx0 !== null) correctArr = [String(q.options[idx0])];
            } else {
                correctArr = [String(q.options[q.correct_response])];
            }

            // compute number of common elements (by value, not position)
            const matched_count = correctArr.filter(ans => givenArr.includes(ans)).length;

            // compute missing (correct answers not provided) and extra (given answers not in correct)
            missing = Math.max(0, correctArr.length - matched_count);
            const non_common_count = Math.max(0, givenArr.length - matched_count);


            // decide correctness: true only if exact set match (no missing and no extra)
            const is_correct = (matched_count === correctArr.length && non_common_count === 0 && givenArr.length === correctArr.length);

            // bookkeeping
            if (is_correct) {
                questions_correct.push(i + 1);
            } else {
                questions_incorrect.push(i + 1);
                all_correct = false;
            }
            totalIncorrectResponses += non_common_count;

            // store detailed results
            detailed_results[`q${i + 1}`] = {
                question_number: i + 1,
                given_answer: givenArr,
                correct_answer: correctArr,
                is_correct: is_correct,
                matched_count: matched_count,
                non_common_count: non_common_count,
                correct_option_index: q.correct_response
            };

            console.log(`Q${i + 1} given:`, givenArr, "correct:", correctArr, "matched:", matched_count, "non_common:", non_common_count, "is_correct:", is_correct);
        });
        console.log("totalIncorrectResponses at the end is", totalIncorrectResponses)
        incorrectQCountMirror = totalIncorrectResponses
        missedQCountMirror = missing
        console.log("incorrectQCountMirror is", incorrectQCountMirror, "and should be = to questions_incorrect.length =", questions_incorrect.length)

        if (!all_correct) {
            failedQMirror += 1;
            console.log("is failed Q Mirror increased", failedQMirror)
        }

        // Save comprehensive results to trial data
        data.all_correct = all_correct;
        data.questions_correct = questions_correct;
        data.questions_incorrect = questions_incorrect;
        data.num_correct = questions_correct.length;
        data.num_incorrect = questions_incorrect.length;
        data.detailed_results = detailed_results;
        data.incorrectQCountMirror = incorrectQCountMirror;
        data.failedQuestionsCountMirror = failedQMirror;

        console.log(`MPL Comprehension Results: ${questions_correct.length}/${comprehensionQuestionsMPLMirror.questions.length} correct`);
        console.log("Questions answered correctly:", questions_correct);
        console.log("Questions answered incorrectly:", questions_incorrect, "= to incorrecQCountMirror:", incorrectQCountMirror);
        console.log("All correct:", all_correct);
        console.log("detailed_results:", detailed_results);
        console.log(data.incorrectQCountMirror, "is data.incorrectQCountMirror");
        console.log(data.failedQuestionsCountMirror, "is data.failedQuestionsCountMirror");
    },
    on_load: function () {
        // Add click handler for help button
        const helpButton = document.getElementById('help-button-comprehension');
        if (helpButton) {
            helpButton.addEventListener('click', function (e) {
                e.preventDefault(); // Prevent any default behavior

                // Check if modal is already open
                if (!document.getElementById('instruction-modal')) {
                    showInstructionModalForQuestions("mirror", isPaymentRulePhase); // or "lottery"
                }
            });
        }
    },
    // on_start: function(){
    //     // Delegated handler: works with jsPsych survey-multi-select naming (e.g. jspsych-survey-multi-select-response-0)
    //     function delegatedSingleChoiceHandler(e) {
    //         const el = e.target;
    //         if (!el || el.tagName !== 'INPUT') return;

    //         // try to extract question index from common patterns:
    //         // - jsPsych multi-select plugin: name="jspsych-survey-multi-select-response-<qIndex>"
    //         // - older code: name="Q<qIndex>" or name="Q<qIndex>[]"
    //         const name = el.name || '';
    //         let m = name.match(/jspsych-survey-multi-select-response-(\d+)/);
    //         let qIndex = null;
    //         if (m) qIndex = parseInt(m[1], 10);
    //         else {
    //             m = name.match(/^Q(\d+)/);
    //             if (m) qIndex = parseInt(m[1], 10);
    //         }
    //         if (qIndex === null || Number.isNaN(qIndex)) return;

    //         // enforce single selection only for questions 0..3; leave question 4 (index 4) multi-select
    //         if (qIndex >= 0 && qIndex <= 3) {
    //             if (el.checked) {
    //                 // uncheck all other inputs with the same name (same question)
    //                 document.querySelectorAll(`input[name="${name}"]`).forEach(inp => {
    //                     if (inp !== el) inp.checked = false;
    //                 });
    //             }
    //         }
    //     }

    //     // Attach once (use capture so we get the event early); remove previous if any to avoid duplicates
    //     document.body.removeEventListener('change', delegatedSingleChoiceHandler, true);
    //     document.body.addEventListener('change', delegatedSingleChoiceHandler, true);
    // }
}

const comprehensionQuestionsMPLMirrorIncentives = {
    ...comprehensionQuestionsMPLMirror,
    data: { task: 'comprehensionSurveyMPLIncentives' },
    questions: [
        {
            prompt: `${example6MPLSelected.replace('width: 50vw; margin: auto;', 'width: 100%; margin: 0;')}
            <p>${language.comprehensionQMPLMirror.q1.promptMainIncentives}</p>`,
            options: [
                language.comprehensionQMPLMirror.q1.options[0],
                language.comprehensionQMPLMirror.q1.options[1],
                language.comprehensionQMPLMirror.q1.options[2],
                language.comprehensionQMPLMirror.q1.options[3]
            ],
            required: true,
            correct_response: 2,
        },
        {
            prompt: `<br><br>${example9MPLSelected.replace('width: 50vw; margin: auto;', 'width: 100%; margin: 0;')}
            <p>${language.comprehensionQMPLMirror.q2.promptIncentives}</p>`,
            options: [
                language.comprehensionQMPLMirror.q2.optionsMain[0],
                language.comprehensionQMPLMirror.q2.optionsMain[1],
                language.comprehensionQMPLMirror.q2.optionsMain[2],
                language.comprehensionQMPLMirror.q2.optionsMain[3]
            ],
            required: true,
            correct_response: 1,
        },
        {
            prompt: ` <br><br><p>${language.comprehensionQMPLMirror.q3.promptIncentives}</p>`,
            options: [
                language.comprehensionQMPLMirror.q3.optionsMain[0],
                language.comprehensionQMPLMirror.q3.optionsMain[1],
            ],
            required: true,
            correct_response: 1, // will be set dynamically in on_start based on treatIs
        },

    ],

    button_label: language.button.next,
    randomize_question_order: false,
    preamble:
        function () {

            return `
    <div style="position: fixed; top: 10px; right: 10px; z-index: 1000;">
    <button type="button" id="help-button-comprehension" style="padding: 16px 34px; background-color: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 18px;">
        ${language.button.help || "Help"}
    </button>
    </div>
    <h2>${language.comprehensionMPLIntro.titleMain}</h2>
    <h3>${language.comprehensionMPLExplanationIncentives.replace('{basePaymentMPLIncentives}', Math.round(basePaymentMPLIncentives * 100) / 100).replace('{buttonHelp}', language.button.help)}</h3>
    <br><br>`
        },
    on_start: function () {
        // Set correct_response for question 3 based on current treatIs value at trial launch
        this.questions[2].correct_response = treatIs == "mirr" ? 1 : 0;
        console.log("treatIs is", treatIs, "so question 3 correct_response is set to", this.questions[2].correct_response);
    },
    on_load: function () {
        // Add click handler for help button
        const helpButton = document.getElementById('help-button-comprehension');
        if (helpButton) {
            helpButton.addEventListener('click', function (e) {
                e.preventDefault(); // Prevent any default behavior

                // Check if modal is already open
                if (!document.getElementById('instruction-modal')) {
                    showInstructionModalForQuestions("mplIncentives", isPaymentRulePhase); // or "lottery"
                }
            });
        }
    },
}

const loopAgainSpanMplLottery = {
    type: "instructions",
    pages: function () {
        if (incorrectQCountLottery === 1) {
            yourRAreIncorrect = fr.loopAgainSpanMpl.yourRAreIncorrectSingular;
        } else {
            yourRAreIncorrect = fr.loopAgainSpanMpl.yourRAreIncorrectPlural;
        }
        return [
            `<div style="max-width: 1200px"> <p>${language.loopAgainSpanMpl.failed}</p>
        <p>${language.loopAgainSpanMpl.surveyAgain}</p>
        <p>${language.loopAgainSpanMpl.maximumRepetition.replace('{trialQCount}', failedQLottery + 1).replace('{maxQTrials}', maxQTrials)}</p>
        <p>${language.loopAgainSpanMpl.readInstructions}</p>
        <p>${language.loopAgainSpanMpl.clickNext}</p>
        </div>`
        ]
    },
    show_clickable_nav: true,
    button_label_next: language.button.next,
    button_label_previous: language.button.previous,
}
const loopAgainSpanMplMirror = {
    type: "instructions",
    pages: function () {
        if (incorrectQCountMirror === 1) {
            yourRAreIncorrect = fr.loopAgainSpanMpl.yourRAreIncorrectSingular;
            missCorrectAnswer = fr.loopAgainSpanMpl.missCorrectAnswerSingular;
        } else {
            yourRAreIncorrect = fr.loopAgainSpanMpl.yourRAreIncorrectPlural;
            missCorrectAnswer = fr.loopAgainSpanMpl.missCorrectAnswerPlural;
        }

        return [
            `<div style="max-width: 1200px"> <p>${language.loopAgainSpanMpl.failed}</p>
        <p>${language.loopAgainSpanMpl.surveyAgain}</p>
        <p>${language.loopAgainSpanMpl.maximumRepetition.replace('{trialQCount}', failedQMirror + 1).replace('{maxQTrials}', maxQTrials)}</p>
        <p>${language.loopAgainSpanMpl.readInstructions}</p>
        <p>${language.loopAgainSpanMpl.clickNext}</p>
        </div>`
        ]
    },
    show_clickable_nav: true,
    button_label_next: language.button.next,
    button_label_previous: language.button.previous,
}

const comprehensionFailureTrial = {
    type: "html-keyboard-response",
    choices: ['Enter'],
    stimulus: function () {

        return `
            <h2>${language.comprehensionFailure.title}</h2>
            <p>${language.comprehensionFailure.description.replace('{notUnderstoodPayment}', Math.round(notUnderstoodPayment * 100) / 100).replace('{actual_payment_calibration}', Math.round(actual_payment_calibration * 100) / 100).replace('{actual_payment_span_span}', Math.round(actual_payment_span_span * 100) / 100)}</p>
            <p>${language.comprehensionFailure.thanks}</p>
            <p>${language.comprehensionFailure.clickNext}</p>
        </div>`;
    },
    on_start: function (trial) {
        console.log("notUnderstoodPayment is", notUnderstoodPayment);
        console.log("actual_payment_calibration is", actual_payment_calibration);
        console.log("actual_payment_span_span is", actual_payment_span_span);
        console.log("total payment is", Math.min(notUnderstoodPayment + actual_payment_calibration + actual_payment_span_span, (6 + (1.03 * 4) + 1.03)));

        // Add data to trial object instead of data parameter
        trial.data = trial.data || {};
        trial.data.totalPayment = Math.min(notUnderstoodPayment + actual_payment_calibration + actual_payment_span_span, (6 + (1.03 * 4) + 1.03));
        trial.data.versionFirst = block_order_indicator_span_MPL;
        trial.data.treatment = treatment;
        trial.data.helpPageCounter = helpPageCounter;
        trial.data.totalBonus = Math.min(actual_payment_calibration + actual_payment_span_span, ((1.03 * 4) + 1.03));
        trial.data.payment_span_span = actual_payment_span_span;
        trial.data.payment_calibration = actual_payment_calibration;
        trial.data.task = 'comprehensionFailure';
    },
    on_finish: function () {
        // End the experiment
        //jsPsych.data.get().localSave("csv", `span_Subject_${subjectId}_${level}back_output.csv`);
        submitToJatos(jsPsych.data.get().json());
        // jatos.endStudy(jsPsych.data.get().json());
    }
};

const comprehensionFailureTrialIncentives = {
    type: "html-keyboard-response",
    choices: ['Enter'],
    stimulus: function () {

        return `
            <h2>${language.comprehensionFailure.title}</h2>
            <p>${language.comprehensionFailure.descriptionIncentives.replace('{basePaymentMPLIncentives}', Math.round(basePaymentMPLIncentives * 100) / 100)}</p>
            <p>${language.comprehensionFailure.thanks}</p>
            <p>${language.comprehensionFailure.clickNext}</p>
        </div>`;
    },
    on_start: function (trial) {
        console.log("basePaymentMPLIncentives is", basePaymentMPLIncentives);
        console.log("total payment is", basePaymentMPLIncentives);

        // Add data to trial object instead of data parameter
        trial.data = trial.data || {};
        trial.data.totalPayment = basePaymentMPLIncentives;
        // trial.data.versionFirst = block_order_indicator_span_MPL;
        trial.data.treatment = treatmentGoal; // treatment in the incentives experiment
        trial.data.helpPageCounter = helpPageCounter;
        //trial.data.totalBonus = Math.min(actual_payment_calibration + actual_payment_span_span, ((1.03*4)+1.03)) ;
        //trial.data.payment_span_span = actual_payment_span_span;
        // trial.data.payment_calibration = actual_payment_calibration;
        trial.data.task = 'comprehensionFailure';
    },
    on_finish: function () {
        // End the experiment
        //jsPsych.data.get().localSave("csv", `span_Subject_${subjectId}_${level}back_output.csv`);
        submitToJatos(jsPsych.data.get().json());
        // jatos.endStudy(jsPsych.data.get().json());
    }
};
const instructionsChoosingASetOfBoxes = {
    type: "instructions",
    pages: function () {

        return [`<!-- <h2>${language.instructionsChoosingASetOfBoxes.title}</h2>-->
        <br>
         <h3>${language.instructionsChoosingASetOfBoxes.subTitle}</h3>
        <p>${language.instructionsChoosingASetOfBoxes.comprehensionChecked}</p>
        <p>${language.instructionsChoosingASetOfBoxes.description}</p>
        <p>${language.instructionsChoosingASetOfBoxes.example1}</p>
        ${example5MPL.replace('width: 50vw; margin: auto;', 'width: 100%; margin: 0;')}
        <p>${language.instructionsChoosingASetOfBoxes.chooseSet}</p>
        ${example5MPLSelected.replace('width: 50vw; margin: auto;', 'width: 100%; margin: 0;')}
        <p>${language.instructionsChoosingASetOfBoxes.computerOnlyOneChoice}</p>`,
        ]
    },
    show_clickable_nav: true,
    button_label_next: language.button.next,
    button_label_previous: language.button.previous,
    allow_backward: true,
}
const instructionsChoosingASetOfBoxesIncentives = {
    ...instructionsChoosingASetOfBoxes,
    pages: function () {
        let chooseSet = ``;
        if (treatIs == "ineq") { chooseSet = language.instructionsChoosingASetOfBoxes.chooseSetInequalities }
        else { chooseSet = language.instructionsChoosingASetOfBoxes.chooseSet }
        return [`<!-- <h2>${language.instructionsChoosingASetOfBoxes.title}</h2>-->
        <br>
         <h3>${language.instructionsChoosingASetOfBoxes.subTitle}</h3>
        <p>${language.instructionsChoosingASetOfBoxes.comprehensionCheckedIncentives}</p>
        <p>${language.instructionsChoosingASetOfBoxes.descriptionIncentives}</p>
        <p>${language.instructionsChoosingASetOfBoxes.example1}</p>
        ${example5MPL.replace('width: 50vw; margin: auto;', 'width: 100%; margin: 0;')}
        <p>${chooseSet}</p>
        ${example5MPLSelected.replace('width: 50vw; margin: auto;', 'width: 100%; margin: 0;')}
        <p>${language.instructionsChoosingASetOfBoxes.computerOnlyOneChoice}</p>`,
        ]
    },
}

const instructionsIncentivesSpanMPL = {
    type: "instructions",
    pages: function () {
        if (treatment === "hard") {
            bonusSpan = spanMplPayment_hard
            incentiveSpanExample = language.instructionsSpanInMPL.incentiveSpanExampleHard.replace("{bonusSpan}", bonusSpan).replace("{examplePaymentSpan}", Math.round((bonusSpan * 0.8) * 100) / 100)
            lettersOrder = language.instructionsSpanInMPL.lettersOrderHard
        }
        else {
            bonusSpan = spanMplPayment_easy
            incentiveSpanExample = language.instructionsSpanInMPL.incentiveSpanExampleEasy.replace("{bonusSpan}", bonusSpan).replace("{examplePaymentSpan}", Math.round((bonusSpan * 0.8) * 100) / 100)
            lettersOrder = language.instructionsSpanInMPL.lettersOrderEasy
        }

        return [
            `<h2>${language.instructionsSpanInMPL.title}</h2>
        <!--<h3>${language.instructionsSpanInMPL.subTitle}</h3>-->
        <p>${language.instructionsSpanInMPL.MPLInSpan}</p>
        <p>${lettersOrder}</p>
        <p>${language.instructionsSpanInMPL.timeLimit.replace("{mplTimeLimit}", (mplTimeLimit / 1000))}</p>
        <br>
        <p>${language.instructionsSpanInMPL.incentives}</p>
        <p>${language.instructionsSpanInMPL.incentivesSpan.replace("{bonusSpan}", bonusSpan)}</p>
        <p>${language.instructionsSpanInMPL.incentivesSpanDetails}</p>
        <p>${incentiveSpanExample}</p>
        <!--<p>${language.instructionsSpanInMPL.randomMechanism}</p>-->
        <br>
        <p>${language.instructionsSpanInMPL.severalTablesDescription.replace("{bonusMPL}", bonusSpan)}</p>
        <p>${language.instructionsSpanInMPL.incentivesMPL1.replace("{propSelecForMPL}", propSelecForMPL)}</p>
        <p>${language.instructionsSpanInMPL.incentivesMPL2}</p>
        <!--<p>${language.instructionsSpanInMPL.incentivesMPL3}</p>-->
        <!-- <p>${language.instructionsSpanInMPL.priority}</p> -->
        <p>${language.instructionsSpanInMPL.clickNext}</p> `
        ]
    },
    show_clickable_nav: true,
    button_label_next: language.button.next,
    button_label_previous: language.button.previous,
    allow_backward: true,
}
const instructionsIncentivesSpanMPLIncentives = {
    ...instructionsIncentivesSpanMPL,
    pages: function () {
        if (treatIs == "ineq") {
            return [
                `<!--<h2>${language.instructionsSpanInMPL.titleIncentives}</h2>--!>
            <!--<h3>${language.instructionsSpanInMPL.subTitle}</h3>-->
            <h2>${language.instructionsSpanInMPL.severalTablesDescriptionIncentives}</h2>
            <p>${language.instructionsSpanInMPL.MPLInSpanIncentives}</p>
            <p>${language.instructionsSpanInMPL.incentivesMPL1Incentives.replace("{propSelecForMPLIncentives}", propSelecForMPLIncentives)}</p>
            <p>${language.instructionsSpanInMPL.roundIncentivized}</p>
            <p>${language.instructionsSpanInMPL.incentivesMPL2}</p>
            <p>${language.instructionsSpanInMPL.CU_ineq}</p>
            <!-- <p>${language.instructionsSpanInMPL.instructionsMoreIncentivizedRound}</p> -->
            <!--<p>${language.instructionsSpanInMPL.incentivesMPL3}</p>-->
            <!-- <p>${language.instructionsSpanInMPL.priority}</p> -->
            <p>${language.instructionsSpanInMPL.clickNext}</p> `
            ]
        }
        else if (treatIs == "mirr") {
            return [
                `<!--<h2>${language.instructionsSpanInMPL.titleIncentives}</h2>--!>
            <!--<h3>${language.instructionsSpanInMPL.subTitle}</h3>-->
            <h2>${language.instructionsSpanInMPL.severalTablesDescriptionIncentives}</h2>
            <p>${language.instructionsSpanInMPL.MPLInSpanIncentives}</p>
            <p>${language.instructionsSpanInMPL.incentivesMPL1Incentives.replace("{propSelecForMPLIncentives}", propSelecForMPLIncentives)}</p>
            <p>${language.instructionsSpanInMPL.roundIncentivized}</p>
            <p>${language.instructionsSpanInMPL.incentivesMPL2}</p>
            <p>${language.instructionsSpanInMPL.CU_mirr}</p>
            <!-- <p>${language.instructionsSpanInMPL.instructionsMoreIncentivizedRound}</p> -->
            <!--<p>${language.instructionsSpanInMPL.incentivesMPL3}</p>-->
            <!-- <p>${language.instructionsSpanInMPL.priority}</p> -->
            <p>${language.instructionsSpanInMPL.clickNext}</p> `
            ]
        }
    }
}

const introductionFinalExampleSpanMPL = {
    type: "instructions",
    pages: function () {
        return [`<h2>${language.introductionFinalExampleSpanMPL.title}</h2>
        <p>${language.introductionFinalExampleSpanMPL.noTimeLimit}</p>
        <p>${language.introductionFinalExampleSpanMPL.description}</p>
        `
        ]
    },
    show_clickable_nav: true,
    button_label_next: language.button.next,
    button_label_previous: language.button.previous,
    allow_backward: true,
}

let correct_responses = [];
let totalIncorrectResponses = 0;




// const loopAgain = {
//     type: "instructions",
//     pages: [
//         `<div style="max-width: 1200px"> <p>${language.loopAgain.failed}</p>
//         <p>${language.loopAgain.viewInstructions}</p>
//         <p>${language.loopAgain.surveyAgain}</p>
//         <p>${language.loopAgain.press}</p>
//         </div>`
//     ],
//     show_clickable_nav: true,
//     button_label_next: language.button.next,
//     button_label_previous: language.button.previous,
// }





var response_grid =
    '<div class = numbox>' +
    //'<p>What were the numbers <b>in order</b>?<br>(When you are ready to lock in your answer, press ENTER)</p>' +
    '<p>{instructions}</p>' +
    '<button id = button_1 class = "square num-button" onclick = "recordClick(this)"><div class = content><div class = numbers>1</div></div></button>' +
    '<button id = button_2 class = "square num-button" onclick = "recordClick(this)"><div class = content><div class = numbers>2</div></div></button>' +
    '<button id = button_3 class = "square num-button" onclick = "recordClick(this)"><div class = content><div class = numbers>3</div></div></button>' +
    '<button id = button_4 class = "square num-button" onclick = "recordClick(this)"><div class = content><div class = numbers>4</div></div></button>' +
    '<button id = button_5 class = "square num-button" onclick = "recordClick(this)"><div class = content><div class = numbers>5</div></div></button>' +
    '<button id = button_6 class = "square num-button" onclick = "recordClick(this)"><div class = content><div class = numbers>6</div></div></button>' +
    '<button id = button_7 class = "square num-button" onclick = "recordClick(this)"><div class = content><div class = numbers>7</div></div></button>' +
    '<button id = button_8 class = "square num-button" onclick = "recordClick(this)"><div class = content><div class = numbers>8</div></div></button>' +
    '<button id = button_9 class = "square num-button" onclick = "recordClick(this)"><div class = content><div class = numbers>9</div></div></button>' +
    `<button class = clear_button id = "ClearButton" onclick = "clearResponse()">${language.responseGrid.clear}</button>` +
    `<p><u><b>${language.responseGrid.currentAnswer}:</b></u></p><div id=echoed_txt style="font-size: 30px; color:#ff8000;"><b></b></div></div>`



// Demographics ann prolific id: separate age text-entry (numeric) + multi-choice rest
const prolificID = {
    type: "survey-text",
    data: { task: 'prolificID' },
    questions: [
        {
            prompt: language.prolificID,
            required: true,
            name: 'prolificID'
        }
    ],
    preamble: ``,
    button_label: language.button.next,
    on_finish: function (data) {
        const responses = JSON.parse(data.responses);
        const prolific_id = responses.prolificID;
        console.log('Prolific ID entered (responses.prolificID):', prolific_id);
        console.log('responses are', responses);
        // Validate age: enforce 9..100 (inclusive)
        if (prolific_id.length != 24) {
            data.prolific_id = null;
            data.prolific_id_valid = false;
            console.log('Invalid prolific id entry:', prolific_id);
            // Show a blocking localized alert so the participant immediately knows what's wrong
            try {
                if (language === fr) {
                    window.alert('Entrée invalide. Veuillez indiquer votre identifiant Prolific (24 caractères).');
                } else {
                    window.alert('Invalid entry. Please enter your Prolific ID (24 characters).');
                }
            } catch (e) {
                // fallback to console log if alerts are disabled
                console.log('Alert failed, invalid prolific id entered:', prolific_id);
            }
        } else {
            data.prolific_id = prolific_id;
            data.prolific_id_valid = true;
        }
    }
};

//Loop the prolific ID entry until a valid ID (24 characters) is provided.
const prolific_id_loop = {
    timeline: [
        prolificID
    ],
    loop_function: function () {
        const last = jsPsych.data.get().filter({ task: 'prolificID' }).last(1).values()[0];
        // repeat while last.prolific_id_valid is not true
        return !(last && last.prolific_id_valid === true);
    }
};

// const paymentExplanationEasyTrialSecond = {
//     type: 'instructions',
//     pages: [
//         `<div style="max-width: 1200px">
//             <h2>${paymentExplanationEasy.title}</h2>
//             <p>${paymentExplanationEasy.changeScore}</p>
//             <p>${paymentExplanationEasy.score.replace(/__PAYMENT__/g, payment)}<br>
//             <p>${paymentExplanationEasy.clickNext}</p>
//         </div>`
//     ],
// show_clickable_nav: true,
//   button_label_next: language.button.next,
//   button_label_previous: language.button.previous,
// };



/********** define the MPL trials *************/


// Data setup


let numbersArray_lottery = generateShuffledArray(); // for the experiment 2, lottery treatment
let numbersArray_mirror = generateShuffledArray(); // for the experiment 2, mirror treatment
let numbersArray_mirror_incentives_ineq = generateShuffledArray(); //for the experiment 1, inequalities treatment
let numbersArray_mirror_incentives_mirr = generateShuffledArray(); // for the experiment 1, mirror treatment

let mpl_html_array_lottery = [];
let mpl_html_array_mirror = [];
let example_mpl_html_array_lottery = [];
let example_mpl_html_array_mirror = [];
let example_mpl_html_array_mirrorIncentives_mirr = []; // for the example in experiment 1, mirror treatment
let example_mpl_html_array_mirrorIncentives_ineq = []; // for the example in experiment 1, inequalities treatment
let training_mpl_html_array1 = [];
let training_mpl_html_array2 = [];
let list_mpl_tables = {
    1: "G10",
    2: "G25",
    3: "G50",
    4: "G75",
    5: "G90",
    6: "L10",
    7: "L25",
    8: "L50",
    9: "L75",
    10: "L90",
    11: "A10",
    12: "A15"
};
const mplPositionDict = createMPLPositionDictionaryFromList(); //this indicates wether each lottery is in "high" or "low" position
// Create mpl_html_array_lottery following the order of numbersArray
mpl_html_array_lottery = numbersArray_lottery.map(x => {
    const tableType = list_mpl_tables[x];
    // Extract the probability and type from the table identifier
    const probability = parseInt(tableType.substring(1)); // Extract number part
    const type = tableType.charAt(0); // Extract letter part (G, L, or A)
    const position = mplPositionDict[tableType]; // Get the position from dictionary
    // console.log("MPLGenerator2 called with:", probability, type, "lottery", position);
    return mplGenerator2(probability, type, "lottery", position);
});
if (Math.random() < 0.5) {
    mpl_html_array_lottery.splice(mpl_html_array_lottery.length, 0, mplGenerator(10, "G", "lottery"), mplGenerator(90, "G", "lottery"));
}
else {
    mpl_html_array_lottery.splice(mpl_html_array_lottery.length, 0, mplGenerator(90, "G", "lottery"), mplGenerator(10, "G", "lottery"));
}
// console.log("is mpl_html_array_lottery after adding two examples at start", mpl_html_array_lottery);

mpl_html_array_mirror = numbersArray_mirror.map(x => {
    const tableType = list_mpl_tables[x];
    // Extract the probability and type from the table identifier
    const probability = parseInt(tableType.substring(1)); // Extract number part
    const type = tableType.charAt(0); // Extract letter part (G, L, or A)
    const position = mplPositionDict[tableType]; // Get the position from dictionary ("high" or "low")
    return mplGenerator2(probability, type, "mirror", position);
});
if (Math.random() < 0.5) {
    mpl_html_array_mirror.splice(mpl_html_array_mirror.length, 0, mplGenerator(10, "G", "mirror"), mplGenerator(90, "G", "mirror"));
} // adding Opreas MPL
else {
    mpl_html_array_mirror.splice(mpl_html_array_mirror.length, 0, mplGenerator(90, "G", "mirror"), mplGenerator(10, "G", "mirror"));
}
//console.log("is mpl_html_array_mirror after adding two examples at start", mpl_html_array_mirror);

mplIncentives_html_array_ineq = numbersArray_mirror_incentives_ineq.map((x, idx) => {
    const tableType = list_mpl_tables[x];
    // Extract the probability and type from the table identifier
    const probability = parseInt(tableType.substring(1)); // Extract number part
    const type = tableType.charAt(0); // Extract letter part (G, L, or A)
    //const position = mplPositionDict[tableType]; // Get the position from dictionary ("high" or "low")
    //console.log("index is ", idx)
    return mplGenerator(probability, type, "mirror", superArray_ineq[idx], "ineq");
});
mplIncentives_html_array_mirr = numbersArray_mirror_incentives_mirr.map((x, idx) => {
    const tableType = list_mpl_tables[x];
    // Extract the probability and type from the table identifier
    const probability = parseInt(tableType.substring(1)); // Extract number part
    const type = tableType.charAt(0); // Extract letter part (G, L, or A)
    //const position = mplPositionDict[tableType]; // Get the position from dictionary ("high" or "low")
    //console.log("index is ", idx)
    return mplGenerator(probability, type, "mirror", superArray_mirr[idx], "mirr");
});
//console.log("mplIncentives_html_array_mirr is ", mplIncentives_html_array_mirr);

example_mpl_html_array_lottery = [mplGenerator2(50, "G", "lottery", mplPositionDict["G50"])];
// console.log(example_mpl_html_array_lottery, "is example_mpl_html_array_lottery");
example_mpl_html_array_mirror = [mplGenerator2(50, "G", "mirror", mplPositionDict["G50"])];
example_mpl_html_array_mirrorIncentives_mirr = [mplGenerator(50, "G", "mirror", isSuper = 0, treat = "mirr", example = true)]; // generate an example super (incentivized) Oprea's MPL table with 50% probability and "G" type
example_mpl_html_array_mirrorIncentives_ineq = [mplGenerator(50, "G", "mirror", isSuper = 0, treat = "ineq", example = true)]; // generate an example super (incentivized) Oprea's MPL table with 50% probability and "G" type
// console.log(example_mpl_html_array_mirror, "is example_mpl_html_array_mirror");
training_mpl_html_array1 = [mplGenerator3(1)];
training_mpl_html_array2 = [mplGenerator3(2)];
training_mpl_html_array = [mplGenerator3(1), mplGenerator3(2)];
training_mpl_html_array1 = training_mpl_html_array1.map(html => ({ html: html, statusMPL: "mirror" }));
training_mpl_html_array2 = training_mpl_html_array2.map(html => ({ html: html, statusMPL: "mirror" }));
training_mpl_html_array = training_mpl_html_array.map(html => ({ html: html, statusMPL: "mirror" }));
// console.log(training_mpl_html_array, "is training_mpl_html_array with generated HTML");
mpl_html_array_lottery = mpl_html_array_lottery.map(html => ({ html: html, statusMPL: "lottery" }));
mpl_html_array_mirror = mpl_html_array_mirror.map(html => ({ html: html, statusMPL: "mirror" }));
mplIncentives_html_array_ineq = mplIncentives_html_array_ineq.map((html, idx) => ({ html: html, statusMPL: "mirror", isSuper: superArray_ineq[idx] })); // html of the MPLs for experiment 2, inequalities treatment (+ wether they are super or not)
console.log("mplIncentives_html_array_ineq is ", mplIncentives_html_array_ineq);
mplIncentives_html_array_mirr = mplIncentives_html_array_mirr.map((html, idx) => ({ html: html, statusMPL: "mirror", isSuper: superArray_mirr[idx] })); // html of the MPLs for experiment 2, mirror treatment (+ wether they are super or not)
console.log("mplIncentives_html_array_mirr is ", mplIncentives_html_array_mirr);
example_mpl_html_array_lottery = example_mpl_html_array_lottery.map(html => ({ html: html, statusMPL: "lottery" }));
example_mpl_html_array_mirror = example_mpl_html_array_mirror.map(html => ({ html: html, statusMPL: "mirror" }));
example_mpl_html_array_mirrorIncentives_mirr = example_mpl_html_array_mirrorIncentives_mirr.map(html => ({ html: html, statusMPL: "mirror" })); // exemple for wither mirror or inequalities treatment in experiment 2
example_mpl_html_array_mirrorIncentives_ineq = example_mpl_html_array_mirrorIncentives_ineq.map(html => ({ html: html, statusMPL: "mirror" })); // exemple for wither mirror or inequalities treatment in experiment 2





/************ define the mpl trials ***************/

const setup_MPLIncentives = {
    type: 'html-button-response',
    stimulus: function () {
        if (jsPsych.timelineVariable("isSuper", true)) {
            isSuper = `<div class="mpl-incentive-badge-super">${language.fds.incentivizedRound}</div>`;
        } else {
            isSuper = `<p>${language.fds.notIncentivizedRound}</p>`
        }

        // Add help button to the stimulus
        // const helpButton = `
        //     <div style="position: fixed; top: 10px; right: 10px; z-index: 1000;">
        //         <button type="button" id="help-button" style="padding: 16px 34px; background-color: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 18px;">
        //             ${language.button.help || "Help"}
        //         </button>
        //     </div>
        // `;
        return `<p>${language.fds.trialOutOf.replace('{current}', fdsTrialNum).replace('{total}', numberTrialsMPLIncentives)}</p>
        ${isSuper}</div>
        `;
    },
    choices: [`${language.button.next}`],
    //trial_duration: setup_MPLIncentives_trialDuration,
    post_trial_gap: 500,
    // on_load: function() {
    // Add click handler for help button
    //     const helpButton = document.getElementById('help-button');
    //     if (helpButton) {
    //         helpButton.addEventListener('click', function() {
    //             showInstructionModal();
    //         });
    //     }
    // },
    on_finish: function () {
        fdsTrialNum += 1; //add 1 to the total trial count
        subBlock++;
        block_type = "mpl_incentives";
    }
};

const mpl_trial = {
    type: 'survey-html-form',
    button_label: language.button.next,
    html: function () {
        // console.log("isSuper is ", jsPsych.timelineVariable("isSuper", true));
        // console.log("html is ", jsPsych.timelineVariable("html", true));
        // console.log("statusMPL is ", jsPsych.timelineVariable("statusMPL", true));
        return jsPsych.timelineVariable("html", true);
    },
    on_load: function () {

        let numRows = null;
        try {
            const rowNodes = Array.from(document.querySelectorAll('.choice[data-row]'));
            if (rowNodes.length > 0) {
                const rows = rowNodes.map(n => parseInt(n.dataset.row, 10)).filter(x => !isNaN(x));
                if (rows.length > 0) numRows = Math.max(...rows) + 1;
            }
        } catch (e) {
            console.error("Error determining number of rows in MPL table:", e);
        }
        console.log("numRows detected as:", numRows);
        // expose on trial object so on_finish can also read it if needed
        this._mpl_num_rows = numRows;

        // Get the submit button
        const submitButton = document.querySelector('input[type="submit"]');
        const cuSlider = expIsIncentives === true ? document.querySelector('input[name="CU"]') : null;

        // For span_mpl blocks: hide the button entirely (participants cannot submit early, trial lasts exactly 15s)
        // For other blocks (training, examples): disable until selection is made
        if (block_type === "span_mpl") {
            if (submitButton) {
                submitButton.style.display = 'none';
            }
        } else {
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.style.opacity = '0.5';
                submitButton.style.cursor = 'not-allowed';
            }
        }

        if (cuSlider) {
            cuSlider.dataset.changed = 'false';
            cuSlider.disabled = true;
        }

        let hasSelections = false;

        function checkSelections() {
            // Check if at least one choice has been made
            const anySelected = document.querySelector('.choice.selected');
            hasSelections = !!anySelected;

            if (cuSlider) {
                if (!hasSelections) {
                    cuSlider.value = '0';
                    cuSlider.dataset.changed = 'false';
                    cuSlider.disabled = true;
                } else {
                    cuSlider.disabled = false;
                }
            }

            if (submitButton) {
                const cuReady = !cuSlider || cuSlider.dataset.changed === 'true';
                const canProceed = hasSelections && cuReady;
                submitButton.disabled = !canProceed;
                submitButton.style.opacity = canProceed ? '1' : '0.5';
                submitButton.style.cursor = canProceed ? 'pointer' : 'not-allowed';
            }
        }

        if (cuSlider) {
            const markCuChanged = function () {
                cuSlider.dataset.changed = 'true';
                checkSelections();
            };
            cuSlider.addEventListener('input', markCuChanged);
            cuSlider.addEventListener('change', markCuChanged);
        }

        function selectRow(row, choice) {
            document.querySelectorAll(`.choice[data-row="${row}"]`)
                .forEach(b => b.classList.remove('selected'));
            let cell = document.querySelector(`.choice[data-row="${row}"][data-choice="${choice}"]`);
            cell.classList.add('selected');
            cell.querySelector('input').checked = true;

            if (cuSlider) {
                cuSlider.value = '0';
                cuSlider.dataset.changed = 'false';
            }

            // Check if we can enable submit button
            checkSelections();
        }

        document.querySelectorAll('.mirror').forEach(cell => {
            cell.addEventListener('click', function () {
                let row = parseInt(this.dataset.row);
                this.classList.add('selected');
                console.log(row, "is row of mirror")
                let lotteryCell = document.querySelector(`.choice[data-row="${row}"][data-choice="lottery"]`);
                // this.classList.add('selected')
                if (lotteryCell) {
                    let clickEvent = new MouseEvent('click', {
                        bubbles: true,    // Allows the event to bubble up through the DOM
                        cancelable: true,  // Allows the event to be canceled
                        // view: window       // Associates the event with the window
                    });
                    lotteryCell.dispatchEvent(clickEvent);
                }
            });
            cell.addEventListener('mouseenter', function () {
                let row = parseInt(this.dataset.row);
                let lotteryCell = document.querySelector(`.choice[data-row="${row}"][data-choice="lottery"]`);
                if (lotteryCell) {
                    lotteryCell.classList.add('hovered');
                }
            });
            cell.addEventListener('mouseleave', function () {
                let row = parseInt(this.dataset.row);
                let lotteryCell = document.querySelector(`.choice[data-row="${row}"][data-choice="lottery"]`);
                if (lotteryCell) {
                    lotteryCell.classList.remove('hovered');
                }
            });
        });

        document.querySelectorAll('.choice').forEach(cell => {
            cell.addEventListener('click', function () {
                let row = parseInt(this.dataset.row); // dataset refers to all the custom data attributes of an element (data-*)
                let choice = this.dataset.choice;
                // Fill from row 0 to clicked row with clicked choice
                for (let r = 0; r <= row; r++) {
                    selectRow(r, choice);
                    if (choice == "lottery") {
                        document.querySelector(`.mirror[data-row="${r}"]`).classList.add('selected')
                    }
                    if (choice == "sure") {
                        document.querySelector(`.mirror[data-row="${r}"]`).classList.remove('selected')
                    }
                }
                // Fill from clicked row+1 to end with the opposite choice
                let otherChoice = (choice === 'sure') ? 'lottery' : 'sure';
                for (let r = row + 1; r < numRows; r++) {
                    selectRow(r, otherChoice);
                    if (choice == "lottery") {
                        document.querySelector(`.mirror[data-row="${r}"]`).classList.remove('selected')
                    }
                    if (choice == "sure") {
                        document.querySelector(`.mirror[data-row="${r}"]`).classList.add('selected')
                    }
                }
            });
        });


        if (block_type == "span_mpl") {
            // countdown timer UI (top-left) and time limit enforcement
            const countdownContainer = document.createElement('div');
            countdownContainer.id = 'countdown';
            countdownContainer.innerText = ''; // will be set below
            document.body.appendChild(countdownContainer);

            const startTime = Date.now();

            // update display immediately
            countdownContainer.innerText = `${language.timerText} ${formatSeconds(mplTimeLimit)}`;

            // interval to update the shown countdown every 250ms
            const intervalId = setInterval(() => {
                const elapsed = Date.now() - startTime;
                const remaining = Math.max(0, mplTimeLimit - elapsed);
                countdownContainer.innerText = `${language.timerText} ${formatSeconds(remaining)}`;
            }, 250);

            // timeout to auto-submit when time is up (fixed duration, no early submit)
            const timeoutId = setTimeout(() => {
                // add hidden input to mark that this was a timeout
                const form = document.querySelector('form') || document.querySelector('.jspsych-survey-form');
                if (cuSlider && cuSlider.dataset.changed !== 'true' && form) {
                    cuSlider.disabled = true;
                    const hiddenCU = document.createElement('input');
                    hiddenCU.type = 'hidden';
                    hiddenCU.name = 'CU';
                    hiddenCU.value = 'NA';
                    form.appendChild(hiddenCU);
                }
                if (form) {
                    const hidden = document.createElement('input');
                    hidden.type = 'hidden';
                    hidden.name = '__timed_out';
                    hidden.value = '1';
                    form.appendChild(hidden);
                }
                // clear the interval timer
                clearInterval(intervalId);
                // remove countdown element
                const countdownEl = document.getElementById('countdown');
                if (countdownEl && countdownEl.parentNode) countdownEl.parentNode.removeChild(countdownEl);
                // show, enable and click submit button to proceed
                if (submitButton) {
                    submitButton.style.display = '';
                    submitButton.disabled = false;
                    submitButton.style.opacity = '1';
                    submitButton.style.cursor = 'pointer';
                    submitButton.click();
                }
            }, mplTimeLimit);

            // store timers so we can clear them in on_finish if needed
            window.mplTimers = window.mplTimers || {};
            window.mplTimers[subjectId] = { timeoutId: timeoutId, intervalId: intervalId, elementId: 'countdown' };
        }


    },

    on_finish: function (data) {

        let numRows = (this && this._mpl_num_rows)
        console.log("numRows on finish is ", numRows)

        if (block_type == "span_mpl") {
            // clear any timers that might still be pending (safety)
            try {
                if (window.mplTimers && window.mplTimers[subjectId]) {
                    const t = window.mplTimers[subjectId];
                    clearTimeout(t.timeoutId);
                    clearInterval(t.intervalId);
                    const el = document.getElementById(t.elementId);
                    if (el && el.parentNode) el.parentNode.removeChild(el);
                    delete window.mplTimers[subjectId];
                }
            } catch (e) {
                /* ignore cleanup errors */
            }
        }


        let responses_mpl = JSON.parse(data.responses);
        console.log("data.responses is ", data.responses)

        let timedOut = false;
        if (block_type == "span_mpl") {
            timedOut = (responses_mpl && responses_mpl.__timed_out === "1");
            console.log("timedOut is", timedOut)
        }
        data.timed_out = timedOut;


        // Determine switching row
        let prevChoice = null;
        // let switchRow = null;
        let switchRow1 = null;
        let switchRow2 = null;
        let choicesArray = [];


        for (var i = 0; i < numRows; i++) {
            let choice = responses_mpl[`row${i}`];
            choicesArray.push(choice);
            prevChoice = i > 0 ? choicesArray[i - 1] : null;
            if (prevChoice && choice !== prevChoice) {
                switchRow2 = i;
                switchRow1 = i - 1;
                switchRow2Choice = responses_mpl[`row${i}`];
                switchRow1Choice = responses_mpl[`row${i - 1}`];
            }
        }
        // Add condition for all same choices
        if (switchRow1 === null && switchRow2 === null) {
            // Check if all choices are the same
            let firstChoice = choicesArray[0];
            let allSame = choicesArray.every(choice => choice === firstChoice);
            if (allSame) {
                switchRow1 = -1;
                switchRow2 = -1;
                switchRow1Choice = firstChoice;
                switchRow2Choice = firstChoice;
            }
        }
        // Add condition for time out with no choices
        if (timedOut === true && choicesArray.every(el => el === undefined)) {
            switchRow1 = -2;
            switchRow2 = -2;
            switchRow1Choice = "no_choice_due_to_time_limit";
            switchRow2Choice = "no_choice_due_to_time_limit";
            // Mark all choices as no_choice_due_to_time_limit
            choicesArray = choicesArray.map(() => "no_choice_due_to_time_limit");
        }


        let html = jsPsych.timelineVariable("html", true);
        let statusMPL = jsPsych.timelineVariable("statusMPL", true);

        let mplTypeMatch = html.match(/data-mpl-type="([^"]+)"/);
        if (mplTypeMatch && mplTypeMatch[1]) {
            data.mplType = mplTypeMatch[1];
        } else {
            data.mplType = "unknown";
        }


        console.log("block type is ", block_type)
        console.log("data.mplType is ", data.mplType)


        mplCounter++;
        data.mplCounter = mplCounter;
        data.subBlock = subBlock;
        console.log("data.subBlock is ", data.subBlock)
        data.statusMPL = statusMPL;
        data.block = block_type;
        if (block_type === "mpl_incentives") {
            data.isSuper = jsPsych.timelineVariable("isSuper", true);
            console.log("data.isSuper is ", data.isSuper)
        };
        data.treatIs = treatIs;
        console.log("data.treatIs is ", data.treatIs)
        if (expIsIncentives === true) {
            const cuRaw = responses_mpl.CU;
            const cuParsed = parseInt(cuRaw, 10);
            data.CU = (cuRaw === "NA" || cuRaw === undefined || cuRaw === null || cuRaw === "" || Number.isNaN(cuParsed)) ? "NA" : cuParsed;
            console.log("data.CU is ", data.CU);
        }
        data.switch_row2 = switchRow2; // null means no switch
        data.switch_row1 = switchRow1; // null means no switch
        console.log("data.switch_row1 is ", data.switch_row1, "and data.switch_row2 is ", data.switch_row2)
        data.switchRow2Choice = switchRow2Choice;
        data.switchRow1Choice = switchRow1Choice;
        console.log("data.switchRow2Choice is ", data.switchRow2Choice, "and data.switchRow1Choice is ", data.switchRow1Choice)
        data.choices = choicesArray;
        console.log("choicesArray is ", choicesArray)
        console.log("status of mpl is", data.statusMPL)
        data.task = "mpl";
        //if(data.mplType !== "GO90" && data.mplType !== "GO10"){
        data.position = mplPositionDict[data.mplType]
        console.log("data.position is ", data.position)
        //};
        let exampleLine = getRandomInt(0, lengthSurePayments);
        console.log("data.mplType is ", data.mplType, " and data.choices are ", data.choices, " and data.statusMPL is ", data.statusMPL)
        console.log("calculateMPLPayment with line ", exampleLine, " is", calculateMPLPayment(data.mplType, exampleLine, data.choices, data.statusMPL));
    }
};

const mpl_trial_training = {
    type: 'survey-html-form',
    button_label: language.button.next,
    html: function () {
        return jsPsych.timelineVariable("html", true);
    },
    on_load: function () {

        // Disable the submit button initially
        const submitButton = document.querySelector('input[type="submit"]');
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.style.opacity = '0.5';
            submitButton.style.cursor = 'not-allowed';
        }

        if (jsPsych.timelineVariable("html", true) == training_mpl_html_array[0].html) {
            function checkCorrectSelections() {
                // Check if the correct pattern is selected:
                // Rows 0-6 should have "lottery" selected
                // Rows 7-17 should have "sure" selected
                let correctPattern = true;

                // Check rows 0-6 for lottery selection
                for (let r = 0; r < 6; r++) {
                    const lotteryCell = document.querySelector(`.choice[data-row="${r}"][data-choice="lottery"]`);
                    if (!lotteryCell || !lotteryCell.classList.contains('selected')) {
                        correctPattern = false;
                        break;
                    }
                }

                // Check rows 7-17 for sure selection (only if rows 0-6 are correct)
                if (correctPattern) {
                    for (let r = 6; r <= 17; r++) {
                        const sureCell = document.querySelector(`.choice[data-row="${r}"][data-choice="sure"]`);
                        if (!sureCell || !sureCell.classList.contains('selected')) {
                            correctPattern = false;
                            break;
                        }
                    }
                }

                // Enable/disable submit button based on correct pattern
                if (submitButton) {
                    submitButton.disabled = !correctPattern;
                    submitButton.style.opacity = correctPattern ? '1' : '0.5';
                    submitButton.style.cursor = correctPattern ? 'pointer' : 'not-allowed';
                }
            }
        } else if (jsPsych.timelineVariable("html", true) == training_mpl_html_array[1].html) {
            function checkCorrectSelections() {
                // Check if the correct pattern is selected:
                // Rows 0-6 should have "lottery" selected
                // Rows 7-17 should have "sure" selected
                let correctPattern = true;

                // Check rows 0-6 for lottery selection
                for (let r = 0; r < 8; r++) {
                    const lotteryCell = document.querySelector(`.choice[data-row="${r}"][data-choice="sure"]`);
                    if (!lotteryCell || !lotteryCell.classList.contains('selected')) {
                        correctPattern = false;
                        break;
                    }
                }

                // Check rows 7-17 for sure selection (only if rows 0-6 are correct)
                if (correctPattern) {
                    for (let r = 8; r <= 17; r++) {
                        const sureCell = document.querySelector(`.choice[data-row="${r}"][data-choice="lottery"]`);
                        if (!sureCell || !sureCell.classList.contains('selected')) {
                            correctPattern = false;
                            break;
                        }
                    }
                }

                // Enable/disable submit button based on correct pattern
                if (submitButton) {
                    submitButton.disabled = !correctPattern;
                    submitButton.style.opacity = correctPattern ? '1' : '0.5';
                    submitButton.style.cursor = correctPattern ? 'pointer' : 'not-allowed';
                }
            }
        }

        function selectRow(row, choice) {
            document.querySelectorAll(`.choice[data-row="${row}"]`)
                .forEach(b => b.classList.remove('selected'));
            let cell = document.querySelector(`.choice[data-row="${row}"][data-choice="${choice}"]`);
            if (cell) {
                cell.classList.add('selected');
                cell.querySelector('input').checked = true;
            }

            // Check if the correct pattern is selected
            checkCorrectSelections();
        }

        document.querySelectorAll('.mirror').forEach(cell => {
            cell.addEventListener('click', function () {
                let row = parseInt(this.dataset.row);
                this.classList.add('selected');
                console.log(row, "is row of mirror")
                let lotteryCell = document.querySelector(`.choice[data-row="${row}"][data-choice="lottery"]`);
                if (lotteryCell) {
                    let clickEvent = new MouseEvent('click', {
                        bubbles: true,
                        cancelable: true,
                    });
                    lotteryCell.dispatchEvent(clickEvent);
                }
            });
            cell.addEventListener('mouseenter', function () {
                let row = parseInt(this.dataset.row);
                let lotteryCell = document.querySelector(`.choice[data-row="${row}"][data-choice="lottery"]`);
                if (lotteryCell) {
                    lotteryCell.classList.add('hovered');
                }
            });
            cell.addEventListener('mouseleave', function () {
                let row = parseInt(this.dataset.row);
                let lotteryCell = document.querySelector(`.choice[data-row="${row}"][data-choice="lottery"]`);
                if (lotteryCell) {
                    lotteryCell.classList.remove('hovered');
                }
            });
        });

        // Modified click behavior - restore auto-filling logic but check for correct pattern
        document.querySelectorAll('.choice').forEach(cell => {
            cell.addEventListener('click', function () {
                let row = parseInt(this.dataset.row);
                let choice = this.dataset.choice;

                // Fill from row 0 to clicked row with clicked choice (original auto-fill logic)
                for (let r = 0; r <= row; r++) {
                    selectRow(r, choice);
                    if (choice == "lottery") {
                        document.querySelector(`.mirror[data-row="${r}"]`).classList.add('selected')
                    }
                    if (choice == "sure") {
                        document.querySelector(`.mirror[data-row="${r}"]`).classList.remove('selected')
                    }
                }
                // Fill from clicked row+1 to end with the opposite choice (original auto-fill logic)
                let otherChoice = (choice === 'sure') ? 'lottery' : 'sure';
                for (let r = row + 1; r < lengthSurePayments + 1; r++) {
                    selectRow(r, otherChoice);
                    if (choice == "lottery") {
                        document.querySelector(`.mirror[data-row="${r}"]`).classList.remove('selected')
                    }
                    if (choice == "sure") {
                        document.querySelector(`.mirror[data-row="${r}"]`).classList.add('selected')
                    }
                }
            });
        });
    },

    on_finish: function (data) {
        // Parse the responses JSON
        console.log("Training MPL data is ", data)
        let responses_mpl = JSON.parse(data.responses);
        console.log("Training MPL data.responses is ", data.responses)

        // Determine switching row
        let prevChoice = null;
        let switchRow = null;
        let switchRow1 = null;
        let switchRow2 = null;
        let choicesArray = [];

        for (var i = 0; i < lengthSurePayments + 1; i++) {
            let choice = responses_mpl[`row${i}`];
            choicesArray.push(choice);
            prevChoice = i > 0 ? choicesArray[i - 1] : null;
            if (prevChoice && choice !== prevChoice) {
                switchRow2 = i;
                switchRow1 = i - 1;
                switchRow2Choice = responses_mpl[`row${i}`];
                switchRow1Choice = responses_mpl[`row${i - 1}`];
            }
        }

        // Add condition for all same choices
        if (switchRow1 === null && switchRow2 === null) {
            let firstChoice = choicesArray[0];
            let allSame = choicesArray.every(choice => choice === firstChoice);
            if (allSame) {
                switchRow1 = -1;
                switchRow2 = -1;
                switchRow1Choice = firstChoice;
                switchRow2Choice = firstChoice;
            }
        }

        let html = jsPsych.timelineVariable("html", true);

        data.mplType = "mpl";
        console.log("Training MPL type saved:", data.mplType);
        mplCounter++;
        data.mplCounter = mplCounter;
        data.subBlock = subBlock;
        data.statusMPL = statusMPL
        data.block = block_type;
        data.switch_row2 = switchRow2;
        data.switch_row1 = switchRow1;
        data.switchRow2Choice = switchRow2Choice;
        data.switchRow1Choice = switchRow1Choice;
        data.choices = choicesArray;
        data.task = "trainingToChoose";
        console.log("Training MPL completed with correct pattern");
    }
};
const loopAgainSpanMplTraining = {
    type: "instructions",
    pages: function () {
        return [
            `<div style="max-width: 1200px"> <p>${language.loopAgainSpanMplTraining.title}</p>
        <p>${language.loopAgainSpanMplTraining.surveyAgain}</p>
        <p>${language.loopAgainSpanMplTraining.readInstructions}</p>
        <p>${language.loopAgainSpanMplTraining.clickNext}</p>
        </div>`
        ]
    },
    show_clickable_nav: true,
    button_label_next: language.button.next,
    button_label_previous: language.button.previous,
}

/************ define the span trials ***************/


const fdsTotalTrialsTraining_update = {
    type: 'call-function',
    func: function () {
        fdsTotalTrials = totalFdsTrainingTrials
        block_type = "calibration"
    }
}
const blockIs_mpl_incentives = {
    type: 'call-function',
    func: function () {
        block_type = "mpl_incentives"
    }
}
// const fdsTotalTrialsSpanMpl_update = {
//     type: 'call-function',
//     func: function() {
//         fdsTotalTrials = totalFdsSpanMplTrials
//         currentSpan = mplSpan
//         block_type = "spanMpl"
//     }
// }

const staircase_assess = {
    type: 'call-function',
    func: updateSpan //update currentSpan based on staircase
};

const arithmeticRound = {
    type: 'call-function',
    func: function () {
        arRoundIndicator += 1;
        console.log("arRoundIndicator is ", arRoundIndicator)
    }
}

const setup_fds = {
    type: 'html-button-response',
    stimulus: function () {
        const trialInfo = `<h2>${language.fds.trialOutOf.replace('{current}', fdsTrialNum).replace('{total}', fdsTotalTrials)}</h2>`;

        // Add help button to the stimulus
        // const helpButton = `
        //     <div style="position: fixed; top: 10px; right: 10px; z-index: 1000;">
        //         <button type="button" id="help-button" style="padding: 16px 34px; background-color: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 18px;">
        //             ${language.button.help || "Help"}
        //         </button>
        //     </div>
        // `;
        return trialInfo;
    },
    choices: [],
    trial_duration: setup_fds_trial_duration,
    post_trial_gap: 500,
    // on_load: function() {
    // Add click handler for help button
    //     const helpButton = document.getElementById('help-button');
    //     if (helpButton) {
    //         helpButton.addEventListener('click', function() {
    //             showInstructionModal();
    //         });
    //     }
    // },
    on_finish: function () {
        if (fdsTrialNum == 1) {
            currentSpan = startingSpan;
        }
        stimList = getStimuli(currentSpan); //get the current stimuli for the trial
        spanHistory[fdsTrialNum - 1] = currentSpan; //log the current span in an array
        fdsTrialNum += 1; //add 1 to the total trial count
        idx = 0; //reset the index prior to the letter presentation
        exitLetters = 0; //reset the exit letter variable
    }
};

const before_span_span1 = {
    type: 'html-button-response',
    stimulus:
        function () {
            if (treatment == "hard") {
                return `<p>${language.fds.trialOutOf.replace('{current}', fdsTrialNum).replace('{total}', totalFdsSpanSpanTrials)}</p>
        <p>${language.spanTrials.theBlueDigitsWillBePresented}</p>`
            }
            else if (treatment == "easy") {
                return `<p>${language.fds.trialOutOf.replace('{current}', fdsTrialNum).replace('{total}', totalFdsSpanSpanTrials)}</p>
        <p>${language.spanTrials.theBlueDigitWillBePresented}</p>`
            }
            // <br>
            // <p>${language.span_span.first_letters_priority.replace("{theBlueDigits}", theBlueDigits).replace("{the}", the)}</p><br>
            // <p>${language.span_span.first_letters_give_back.replace("{theBlueDigits}", theBlueDigits).replace("{theBlueDigits}", theBlueDigits)}</p>`;
        },
    choices: [],
    post_trial_gap: 500,
    trial_duration: betweenSpanTimeInterval,
    on_finish: function () {
        if (treatment == 'hard') {
            stimList = getStimuliFirstLetters(startingSpan),
                spanHistory[fdsTrialNum - 1] = startingSpan;
        }
        else if (treatment == 'easy') {
            stimList = getStimuliFirstLetters(1),
                spanHistory[fdsTrialNum - 1] = 1
        }; //get the current stimuli for the trial
        spanHistory[fdsTrialNum - 1] = startingSpan; //log the current span in an array
        idx = 0; //reset the index prior to the letter presentation
        exitLetters = 0; //reset the exit letter variable
        fdsTotalTrials = totalFdsSpanSpanTrials;
        block_type = "spanSpan";
    }
};
const before_span_span2 = {
    type: 'html-button-response',
    stimulus: `<p>${language.spanTrials.theRedDigitsWillBePresented}<p>`,
    // function(){return `
    //     <p>${language.span_span.second_letters_priority.replace("{theBlueDigits}", theBlueDigits)}</p><br>
    //     <p>${language.span_span.second_letters_give_back.replace("{theBlueDigits}", theBlueDigits)}</p>`;},
    choices: [], //[`${language.button.next}`],
    post_trial_gap: 500,
    trial_duration: betweenSpanTimeInterval,
    on_finish: function () {
        stimList = getStimuliSecondLetters(startingSpan);
        spanHistory[fdsTrialNum - 1] = startingSpan;
        idx = 0; //reset the index prior to the letter presentation
        exitLetters = 0; //reset the exit letter variable
    }
};
const letter_fds_vis = {
    type: 'html-keyboard-response',
    stimulus: function () { return stimList[idx]; },
    choices: jsPsych.NO_KEYS,
    trial_duration: fds_letter_presentation,
    post_trial_gap: fds_post_trial_gap,
    on_start: function (trial) {
        trial.data = trial.data || {};
        trial.data.subBlock = subBlock;
        trial.data.subBlock_span_span = subBlock_span_span;
    },
    on_finish: function () {
        idx += 1; //update the index
        //check to see if we are at the end of the letter array
        if (idx == stimList.length) {
            exitLetters = 1;
        } else {
            exitLetters = 0;
        }
    }
}
const fds_response_screen = {
    type: 'html-keyboard-response',
    stimulus: response_grid.replace('{instructions}', language.response_grid_instructions),
    choices: ['Enter'],
    on_finish: function (data) {
        var curans = response;
        var corans = fds_correct_ans;
        if (JSON.stringify(curans) === JSON.stringify(corans)) {
            var gotItRight = 1;
            console.log("correct");
            staircaseChecker[staircaseIndex] = 1;
        } else {
            var gotItRight = 0;
            console.log("incorrect");
            staircaseChecker[staircaseIndex] = 0;
        }
        response = []; //clear the response for the next trial
        staircaseIndex += 1; //update the staircase index
        console.log(staircaseChecker);
        spanCounter++;

        jsPsych.data.addDataToLastTrial({
            designation: 'FDS-RESPONSE',
            span: currentSpan,
            answer: curans,
            correct: corans,
            was_correct: gotItRight,
            spanHistory: spanHistory,
            task: "spanTest",
            block: block_type,
            subBlock: subBlock,
            statusMPL: statusMPL,
            spanCounter: spanCounter,
        });
        console.log("accuracySpanSpan(data.answer, data.correct) is ", accuracySpanSpan(data.answer, data.correct));
        console.log("data.answer is ", curans, "and data.correct is ", corans, "and data.was_correct is ", gotItRight);
    }
}
const fds_response_screen_span_span1 = {
    type: 'html-keyboard-response',
    stimulus: response_grid.replace('{instructions}', language.span_span.type_second_letters),
    choices: ['Enter'],
    on_load: function () {
        // Add red theme class for this specific trial
        document.querySelector('.jspsych-content').classList.add('span-span1-red');
    },
    on_finish: function (data) {
        var curans = response;
        var corans = fds_correct_ans;
        if (JSON.stringify(curans) === JSON.stringify(corans)) {
            var gotItRight = 1;
            console.log("correct");
            staircaseChecker[staircaseIndex] = 1;
        } else {
            var gotItRight = 0;
            console.log("incorrect");
            staircaseChecker[staircaseIndex] = 0;
        }
        response = []; //clear the response for the next trial
        staircaseIndex += 1; //update the staircase index
        spanCounter++;
        console.log(staircaseChecker);

        jsPsych.data.addDataToLastTrial({
            designation: 'FDS-RESPONSE',
            span: currentSpan,
            answer: curans,
            correct: corans,
            was_correct: gotItRight,
            spanHistory: spanHistory,
            task: "spanTest",
            block: block_type,
            letterType: 2,
            subBlock_span_span: subBlock_span_span,
            spanCounter: spanCounter,
            accuracySpanSpan: accuracySpanSpan(data.answer, data.correct)
        });
        console.log("accuracySpanSpan(data.answer, data.correct) is ", accuracySpanSpan(data.answer, data.correct));
        console.log("data.answer is ", curans, "and data.correct is ", corans, "and data.was_correct is ", gotItRight);

        // Remove red theme class when trial ends
        document.querySelector('.jspsych-content').classList.remove('span-span1-red');
    }
}
const fds_response_screen_span_span2 = {
    type: 'html-keyboard-response',
    stimulus: function () {
        let stim;
        if (treatment == 'hard') {
            stim = language.span_span.type_first_letters.replace('{theBlueDigits}', language.span_span.variableHard.theBlueDigits);
        }
        else if (treatment == 'easy') {
            stim = language.span_span.type_first_letters.replace('{theBlueDigits}', language.span_span.variableEasy.theBlueDigits);
        }
        return response_grid.replace('{instructions}', stim);
    },
    choices: ['Enter'],
    on_load: function () {
        // Add blue theme class for this specific trial
        document.querySelector('.jspsych-content').classList.add('span-span2-blue');
    },
    on_finish: function (data) {
        var curans = response;
        var corans = fds_correct_ans_first_letters;
        if (JSON.stringify(curans) === JSON.stringify(corans)) {
            var gotItRight = 1;
            console.log("correct");
            staircaseChecker[staircaseIndex] = 1;
        } else {
            var gotItRight = 0;
            console.log("incorrect");
            staircaseChecker[staircaseIndex] = 0;
        }
        response = []; //clear the response for the next trial
        staircaseIndex += 1; //update the staircase index
        console.log(staircaseChecker);
        fdsTrialNum += 1; //add 1 to the total trial count only after the two trials
        spanCounter++;

        jsPsych.data.addDataToLastTrial({
            designation: 'FDS-RESPONSE',
            span: currentSpan,
            answer: curans,
            correct: corans,
            was_correct: gotItRight,
            task: "spanTest",
            block: block_type,
            letterType: 1,
            subBlock_span_span: subBlock_span_span,
            spanCounter: spanCounter,
        });
        console.log("accuracySpanSpan(data.answer, data.correct) is ", accuracySpanSpan(data.answer, data.correct));
        console.log("data.answer is ", curans, "and data.correct is ", corans, "and data.was_correct is ", gotItRight);

        // Remove blue theme class when trial ends
        document.querySelector('.jspsych-content').classList.remove('span-span2-blue');
    }
}
const feedback_span = {
    type: 'html-keyboard-response',
    stimulus: "nana",
    //`<p><b>${fdb}</b><br>Your answer was ${response}, the right numbers were ${fds_correct_ans}</br></p>`,
    choices: jsPsych.NO_KEYS,
    trial_duration: 2000,
    on_start: function (trial) {

        console.log(jsPsych.data.get().last(1).values()[0].was_correct)
        console.log(jsPsych.data.get().last(1).values()[0].answer, "is the answer")
        if (jsPsych.data.get().last(1).values()[0].was_correct == 0) {
            if (language == fr) {
                fdb = 'Faux'
            }
            if (language == en) {
                fdb = 'Wrong'
            }
            console.log(fdb, "is fdb")
        }
        if (jsPsych.data.get().last(1).values()[0].was_correct == 1) {
            if (language == fr) {
                fdb = 'Correct'
            }
            if (language == en) {
                fdb = 'Right'
            }
            console.log(fdb, "is fdb")
        }
        console.log(fdb, "is fdb")
        console.log(response, "is response")
        if (treatment == 'hard') {
            return trial.stimulus = language.feedback_span.hard.replace('{fdb}', fdb).replace('{answer}', jsPsych.data.get().last(1).values()[0].answer).replace('{fds_correct_ans}', fds_correct_ans);
        }
        else if (treatment == 'easy') {
            return trial.stimulus = language.feedback_span.easy.replace('{fdb}', fdb).replace('{answer}', jsPsych.data.get().last(1).values()[0].answer).replace('{fds_correct_ans}', fds_correct_ans);
        }
    },
}


/************ define some reset trials ***************/

const fdsTrialNumReset = {
    type: "call-function",
    func: function () {
        fdsTrialNum = 1;
        console.log("fdsTrialNumReset, fdsTrialNum is " + fdsTrialNum);
    },
};
const fdsTrialNumResetAndSubBlockReset = {
    type: "call-function",
    func: function () {
        fdsTrialNum = 1;
        console.log("fdsTrialNumReset, fdsTrialNum is " + fdsTrialNum);
        subBlock = 0;
        console.log("fdsTrialNumReset, subBlock is " + subBlock);
    },
};
const fdsBlockToSpanMplAndSubBlockIncrementLottery = {
    type: "call-function",
    func: function () {
        block_type = "span_mpl";
        subBlock++;
        statusMPL = "lottery";
        console.log("span_mpl, block_type is " + block_type);
        console.log("fdsBlockToSpanMplAndSubBlockIncrementLottery is activated");
        correct_responses = [3, 1, 3, 1, 3];
    },
};
const fdsBlockToSpanMplAndSubBlockIncrementMirror = {
    type: "call-function",
    func: function () {
        block_type = "span_mpl";
        subBlock++;
        statusMPL = "mirror";
        console.log("span_mpl, block_type is " + block_type);
        correct_responses = [1, 1, 1, 4, 3];
    },
};
const blockIsExample = {
    type: "call-function",
    func: function () {
        block_type = "example_span_mpl";
        fdsTotalTrials = 1;
        console.log("block_type is " + block_type);
    },
};
const blockIsTraining = {
    type: "call-function",
    func: function () {
        block_type = "training_span_mpl";
        fdsTotalTrials = 1;
        console.log("block_type is " + block_type);
    },
};
const blockIsspan_mPLAndFdsTrialNumReset = {
    type: "call-function",
    func: function () {
        block_type = "span_mpl";
        fdsTrialNum = 1;
        fdsTotalTrials = totalFdsSpanMplTrials;
        mplCounter = mplCounter - 1; // to exclude this trial from the count of mpls that matter for data analysis
        spanCounter = spanCounter - 1; // same reason
        console.log("block_type is " + block_type + ", fdsTrialNum is " + fdsTrialNum);
    },
};
const calibrationDebrief = {
    type: "html-button-response",
    choices: [`${language.button.next}`],
    stimulus: "",
    on_start: function (trial) {

        actual_payment_calibration = (Math.round((calibrationPayment / 2) * 100) / 100) * ((maximumSpanCalibration - 6))
        actual_payment_calibration = Math.min(actual_payment_calibration, 1.03 * 4); // cap at maxSpan = 14. Probably already cheating
        console.log(actual_payment_calibration, "is actual_payment_calibration")

        // Use the calculated payments
        trial.data = trial.data || {};
        trial.data.payment_calibration = actual_payment_calibration;
        trial.data.maximumSpan = maximumSpanCalibration;

        let html;
        html =
            `<h2>${language.debriefCalibration.title}</h2>
    <p>${language.debriefCalibration.performance.replace('{maxSpan}', maximumSpanCalibration)}</p>
    <p>${language.debriefCalibration.bonus.replace('{bonus}', Math.round((calibrationPayment / 2) * 100) / 100).replace('{units}', maximumSpanCalibration - 6).replace('{totalBonus}', actual_payment_calibration)}</p>
    `
        trial.stimulus = html; // set final display
    },
};
const spanSpanDebrief = {
    type: "html-button-response",
    choices: [`${language.button.next}`],
    stimulus: "",
    on_start: function (trial) {

        /******* payment for span_span *********/

        const subBlockIntegerSpanSpan = getRandomInt(0, 5);
        console.log("subBlockIntegerSpanSpan is ", subBlockIntegerSpanSpan);
        let trialsSpanSpan = jsPsych.data.get().filterCustom(function (trial) {
            return trial.task == 'spanTest' && trial.block == 'spanSpan' && trial.subBlock_span_span == subBlockIntegerSpanSpan;
        });
        console.log(trialsSpanSpan, "is trialsSpanSpan");
        console.log(trialsSpanSpan.count(), "is trialsSpanSpan.count()");
        let trialsSpan1Letters = trialsSpanSpan.filter({ letterType: 1 });
        console.log("trialsSpan1Letters is ", trialsSpan1Letters);
        let trialsSpan2Letters = trialsSpanSpan.filter({ letterType: 2 });
        console.log("trialsSpan2Letters is ", trialsSpan2Letters);
        let accuracyLetters1 = accuracySpanSpan(trialsSpan1Letters.select('answer').values[0], trialsSpan1Letters.select('correct').values[0]);
        console.log("trialsSpan1Letters.select('answer').values[0] is ", trialsSpan1Letters.select('answer').values[0]);
        console.log("accuracyLetters1 is ", accuracyLetters1);
        let accuracyLetters2 = accuracySpanSpan(trialsSpan2Letters.select('answer').values[0], trialsSpan2Letters.select('correct').values[0]);
        console.log("accuracyLetters2 is ", accuracyLetters2);
        actual_payment_span_span = Math.round(((spanSpanPayment_hard * 0.67 * accuracyLetters1) + (spanSpanPayment_hard * 0.33 * accuracyLetters2)) * 100) / 100;
        actual_payment_span_span = Math.min(actual_payment_span_span, 1.03);

        // Use the calculated payments
        trial.data = trial.data || {};
        trial.data.payment_span_span = actual_payment_span_span;

        let html;
        if (treatment == "hard") {
            html =
                `<h2>${language.debriefSpanSpan.title}</h2>
        <p>${language.debriefSpanSpan.performance.replace('{theBlueDigits}', language.debriefSpanSpan.variableHard.theBlueDigits.replace('{startingSpan}', startingSpan)).replace('{blueAccuracy}', Math.round(accuracyLetters1 * 100)).replace('{redAccuracy}', Math.round(accuracyLetters2 * 100))}</p>
        <p>${language.debriefSpanSpan.bonus.replace('{bonus}', spanSpanPayment_hard).replace('{blueAccuracy}', Math.round(accuracyLetters1 * 100)).replace('{redAccuracy}', Math.round(accuracyLetters2 * 100)).replace('{totalBonus}', actual_payment_span_span)}</p>
        `}
        else if (treatment == "easy") {
            html =
                `<h2>${language.debriefSpanSpan.title}</h2>
        <p>${language.debriefSpanSpan.performance.replace('{theBlueDigits}', language.debriefSpanSpan.variableEasy.theBlueDigits).replace('{blueAccuracy}', Math.round(accuracyLetters1 * 100)).replace('{redAccuracy}', Math.round(accuracyLetters2 * 100))}</p>
        <p>${language.debriefSpanSpan.bonus.replace('{bonus}', spanSpanPayment_hard).replace('{blueAccuracy}', Math.round(accuracyLetters1 * 100)).replace('{redAccuracy}', Math.round(accuracyLetters2 * 100)).replace('{totalBonus}', actual_payment_span_span)}</p>
        `}
        trial.stimulus = html; // set final display
    },
    on_finish: function () {
        console.log("actual_payment_span_span is ", actual_payment_span_span);
    }
};
const feedbackExampleSpanMPL = {
    type: "html-button-response",
    choices: [`${language.button.next}`],
    stimulus: "",
    on_start: function (trial) {
        /******* span_mpl payment *********/
        let actual_payment_span_mpl;
        let answerSpan;
        let correctSpan;
        let accuracy;
        // if (treatment == "hard"){
        let trialsSpanMpl = jsPsych.data.get().filterCustom(function (trial) {
            return trial.task == 'spanTest' && trial.block == 'example_span_mpl';
        });
        console.log("trialsSpanMPL is ", trialsSpanMpl);
        console.log("trialsSpanMPL.count() is (should be 1) ", trialsSpanMpl.count());
        answerSpan = trialsSpanMpl.select('answer').values[0];
        correctSpan = trialsSpanMpl.select('correct').values[0];
        accuracy = accuracySpanSpan(trialsSpanMpl.select('answer').values[0], trialsSpanMpl.select('correct').values[0]);
        console.log("trialsSpanMpl.select('answer').values[0] is ", trialsSpanMpl.select('answer').values[0]);
        console.log("trialsSpanMpl.select('correct').values[0] is ", trialsSpanMpl.select('correct').values[0]);
        console.log("accuracy is ", accuracy);
        actual_payment_span_mpl = spanMplPayment_hard * accuracy;
        actual_payment_span_mpl = Math.min(actual_payment_span_mpl, 3.3);
        // } 
        // else if (treatment == "easy") {
        //     let trialsSpanMpl = jsPsych.data.get().filterCustom(function(trial){
        //         return trial.task == 'spanTest' && trial.block == 'example_span_mpl';
        //     });
        //     console.log("trialsSpanMPL is ", trialsSpanMpl);
        //     console.log("trialsSpanMPL.count() is (should be 1) ", trialsSpanMpl.count());
        //     answerSpan = trialsSpanMpl.select('answer').values[0];
        //     correctSpan = trialsSpanMpl.select('correct').values[0];
        //     accuracy = accuracySpanSpan(trialsSpanMpl.select('answer').values[0], trialsSpanMpl.select('correct').values[0]);
        //     console.log("trialsSpanMpl.select('answer').values[0] is ", trialsSpanMpl.select('answer').values[0]);
        //     console.log("trialsSpanMpl.select('correct').values[0] is ", trialsSpanMpl.select('correct').values[0]);
        //     console.log("accuracy is ", accuracy);
        //     actual_payment_span_mpl = spanMplPayment_easy * accuracy;
        //     actual_payment_span_mpl = Math.min(actual_payment_span_mpl, 1);
        // } 
        let bonusSpan = spanMplPayment_hard;
        // if (treatment == "hard") {
        //     bonusSpan = spanMplPayment_hard}
        // else if (treatment == "easy") {
        //     bonusSpan = spanMplPayment_easy}
        // console.log("bonusSpan is " + bonusSpan);

        // mpl
        let actual_payment_mpl_example;
        let selectedRow = getRandomInt(0, lengthSurePayments); // select one of the 18 rows
        console.log("selectedRow is ", selectedRow);
        let selectedTrial = jsPsych.data.get().filterCustom(function (trial) {
            return trial.task == 'mpl' && trial.block == 'example_span_mpl';
        });
        console.log(selectedTrial, "is the selectedTrial for mpl payment");
        console.log(selectedTrial.count(), "is the selectedTrial count for mpl payment (should be one)");
        let mplType = selectedTrial.select('mplType').values[0]; // should be the same for all trials in the subBlock
        console.log(mplType, "is the mplType for the selected trial");
        let choices = selectedTrial.select('choices').values[0]; // should be the same for all trials in the subBlock
        console.log(choices, "is the choices for the selected trial");
        let chosenStatusExample = block_order_indicator_span_MPL == "mirror_first" ? "mirror" : "lottery";
        actual_payment_mpl_example = calculateMPLPayment(mplType, selectedRow, choices, chosenStatusExample);
        actual_payment_mpl_example = Math.min(actual_payment_mpl_example, 30);
        console.log(actual_payment_mpl_example)
        let chosenLot = "";
        if (choices[selectedRow] == "sure") { chosenLot = "<span style='color: blue'>lot B</span>"; }
        else if (choices[selectedRow] == "lottery") { chosenLot = "<span style='color: red'>lot A</span>"; }
        console.log("choices[selectedRow]", choices[selectedRow]);
        console.log("chosenLot is ", chosenLot);

        // Use the calculated payments
        trial.data = trial.data || {};
        trial.data.payment_span_mpl_exemple = actual_payment_span_mpl;
        trial.data.payment_mpl_exemple = actual_payment_mpl_example;
        let html;
        let theDigit = (treatment == "hard") ? "les chiffres" : "le chiffre";
        let thePresentedDigitWas = (treatment == "hard") ? "les chiffres présentés étaient" : "le chiffre présenté était";
        html =
            `<!--<h2>${language.feedbackExampleSpanMPL.title}</h2>-->
    <p>${language.feedbackExampleSpanMPL.description}</p>
    <p>${language.feedbackExampleSpanMPL.paymentSpan.replace('{thePresentedDigitWas}', thePresentedDigitWas).replace('{correctSpan}', correctSpan).replace('{theDigit}', theDigit).replace('{answerSpan}', answerSpan).replace('{precision}', Math.round(accuracy * 100)).replace('{bonusSpan}', bonusSpan).replace('{precision}', Math.round(accuracy * 100)).replace('{paymentSpan}', Math.round(actual_payment_span_mpl * 100) / 100)}</p>
    <p>${language.feedbackExampleSpanMPL.paymentMPL.replace('{selectedRow}', selectedRow + 1).replace('{chosenLot}', chosenLot).replace('{paymentMPL}', actual_payment_mpl_example).replace('{selectedRow}', selectedRow + 1)}<p>
    <div class="important-note">                     
    💡 ${language.feedbackExampleSpanMPL.remind.replace('{propSelecForMPL}', propSelecForMPL)} 
    </div>
    <!--<p>${language.feedbackExampleSpanMPL.instructionReminder}</p>-->
     <p>${language.feedbackExampleSpanMPL.clickNext}</p>
    `
        trial.stimulus = html; // set final display
    },
};

const feedbackExampleSpanMPLIncentives = {
    type: "html-button-response",
    choices: [`${language.button.next}`],
    stimulus: "",
    on_start: function (trial) {
        /******* span_mpl payment *********/
        let actual_payment_span_mpl;
        let answerSpan;
        let correctSpan;
        let accuracy;
        // if (treatment == "hard"){
        // let trialsSpanMpl = jsPsych.data.get().filterCustom(function(trial){
        //     return trial.task == 'spanTest' && trial.block == 'example_span_mpl';
        // });
        // console.log("trialsSpanMPL is ", trialsSpanMpl);
        // console.log("trialsSpanMPL.count() is (should be 1) ", trialsSpanMpl.count());
        // answerSpan = trialsSpanMpl.select('answer').values[0];
        // correctSpan = trialsSpanMpl.select('correct').values[0];
        // accuracy = accuracySpanSpan(trialsSpanMpl.select('answer').values[0], trialsSpanMpl.select('correct').values[0]);
        // console.log("trialsSpanMpl.select('answer').values[0] is ", trialsSpanMpl.select('answer').values[0]);
        // console.log("trialsSpanMpl.select('correct').values[0] is ", trialsSpanMpl.select('correct').values[0]);
        // console.log("accuracy is ", accuracy);
        // actual_payment_span_mpl = spanMplPayment_hard * accuracy;
        // actual_payment_span_mpl = Math.min(actual_payment_span_mpl, 3.3);
        // } 

        //let bonusSpan = spanMplPayment_hard;
        // if (treatment == "hard") {
        //     bonusSpan = spanMplPayment_hard}
        // else if (treatment == "easy") {
        //     bonusSpan = spanMplPayment_easy}
        // console.log("bonusSpan is " + bonusSpan);

        // mpl
        let actual_payment_mpl_example;
        let selectedRow = getRandomInt(0, sure_payments.length - 1); // select one of the 25 rows
        console.log("selectedRow is ", selectedRow, " length sure payments (should be 25) is ", sure_payments.length);
        let selectedTrial = jsPsych.data.get().filterCustom(function (trial) {
            return trial.task == 'mpl' && trial.block == 'example_span_mpl';
        });
        let rigthSet = selectedRow <= 11 ? "<span style='color: red'>lot A</span>" : "<span style='color: blue'>lot B</span>"; // the row to select to maximize EV is the lottery/mirror under €12 and certain amount above, in G50 
        let rightSetWas = language.feedbackExampleSpanMPL.rightChoiceWas.replace('{rightLot}', rigthSet); // in the example, we present the row but not the choice, so we just say that the right choice was the one that would maximize EV
        console.log(selectedTrial, "is the selectedTrial for mpl payment");
        console.log(selectedTrial.count(), "is the selectedTrial count for mpl payment (should be one)");
        let mplType = selectedTrial.select('mplType').values[0]; // should be the same for all trials in the subBlock
        console.log(mplType, "is the mplType for the selected trial");
        let choices = selectedTrial.select('choices').values[0]; // should be the same for all trials in the subBlock
        console.log(choices, "is the choices for the selected trial");
        let chosenStatusExample = selectedTrial.select('statusMPL').values[0]//block_order_indicator_span_MPL == "mirror_first" ? "mirror" : "lottery";
        actual_payment_mpl_example = calculateMPLPayment(mplType, selectedRow, choices, chosenStatusExample);
        actual_payment_mpl_example = Math.min(actual_payment_mpl_example, 30);
        console.log(actual_payment_mpl_example)
        let chosenSet = "";
        if (choices[selectedRow] == "sure") { chosenSet = "<span style='color: blue'>lot B</span>"; }
        else if (choices[selectedRow] == "lottery") { chosenSet = "<span style='color: red'>lot A</span>"; }
        console.log("choices[selectedRow]", choices[selectedRow]);
        console.log("chosenSet is ", chosenSet);

        // Use the calculated payments
        trial.data = trial.data || {};
        trial.data.payment_span_mpl_exemple = actual_payment_span_mpl;
        trial.data.payment_mpl_exemple = actual_payment_mpl_example;
        let html;
        let theDigit = (treatment == "hard") ? "les chiffres" : "le chiffre";
        let thePresentedDigitWas = (treatment == "hard") ? "les chiffres présentés étaient" : "le chiffre présenté était";
        if (treatIs == "mirr") { // no indication of which set had to be selected 
            html =
                `<!--<h2>${language.feedbackExampleSpanMPL.title}</h2>-->
    <p>${language.feedbackExampleSpanMPL.description}</p>
    <p>${language.feedbackExampleSpanMPL.youSelected.replace('{selectedRow}', selectedRow + 1).replace('{chosenLot}', chosenSet)}<p>
    <p>${language.feedbackExampleSpanMPL.yourPayment.replace('{paymentMPL}', actual_payment_mpl_example).replace('{selectedRow}', selectedRow + 1)}<p>
    <!--<p>${language.feedbackExampleSpanMPL.instructionReminder}</p>-->
     <p>${language.feedbackExampleSpanMPL.clickNext}</p>
    `}
        else if (treatIs == "ineq") { // indication of which set had to be selected 
            html =
                `<!--<h2>${language.feedbackExampleSpanMPL.title}</h2>-->
    <p>${language.feedbackExampleSpanMPL.description}</p>
    <p>${language.feedbackExampleSpanMPL.youSelected.replace('{selectedRow}', selectedRow + 1).replace('{chosenLot}', chosenSet).concat(" ", rightSetWas)}<p>
    <p>${language.feedbackExampleSpanMPL.yourPayment.replace('{paymentMPL}', actual_payment_mpl_example).replace('{selectedRow}', selectedRow + 1)}<p>
    <!--<p>${language.feedbackExampleSpanMPL.instructionReminder}</p>-->
     <p>${language.feedbackExampleSpanMPL.clickNext}</p>
    `
        }
        trial.stimulus = html; // set final display
    },
};

let actual_payment_span_span = 0;


/************ define the incentive calculation trials ***************/


const incentives_span_mpl = {
    type: "html-keyboard-response",
    choices: ['Enter'],
    stimulus: "",
    on_start: function (trial) {

        let chosenStatus = "";
        if (Math.random() < 0.5) { chosenStatus = "mirror"; }
        else { chosenStatus = "lottery"; }
        console.log("chosenStatus is ", chosenStatus);

        console.log(actual_payment_calibration, "is actual_payment_calibration")


        /******* span_mpl payment *********/
        let actual_payment_span_mpl;
        const subBlockIntegerSpanMpl = getRandomInt(1, 16)
        // if (treatment == "hard"){
        let trialsSpanMpl = jsPsych.data.get().filterCustom(function (trial) {
            return trial.task == 'spanTest' && trial.block == 'span_mpl' && trial.subBlock == subBlockIntegerSpanMpl && trial.statusMPL == chosenStatus;
        });
        console.log("trialsSpanMPL is ", trialsSpanMpl);
        console.log("trialsSpanMPL.count() is (should be 1) ", trialsSpanMpl.count());
        let accuracy = accuracySpanSpan(trialsSpanMpl.select('answer').values[0], trialsSpanMpl.select('correct').values[0]);
        console.log("trialsSpanMpl.select('answer').values[0] is ", trialsSpanMpl.select('answer').values[0]);
        console.log("trialsSpanMpl.select('correct').values[0] is ", trialsSpanMpl.select('correct').values[0]);
        console.log("accuracy is ", accuracy);
        actual_payment_span_mpl = Math.round((spanMplPayment_hard * accuracy) * 100) / 100;
        actual_payment_span_mpl = Math.min(actual_payment_span_mpl, 3.3);
        console.log("subBlock chosen for payment span_mpl is", subBlockIntegerSpanMpl, "and accuracy is ", accuracy);
        // } 
        // else if (treatment == "easy") {
        //     let trialsSpanMpl = jsPsych.data.get().filterCustom(function(trial){
        //         return trial.task == 'spanTest' && trial.block == 'span_mpl' && trial.subBlock == subBlockIntegerSpanMpl && trial.statusMPL == chosenStatus;
        //     });
        //     console.log("trialsSpanMPL is ", trialsSpanMpl);
        //     console.log("trialsSpanMPL.count() is (should be 1) ", trialsSpanMpl.count());
        //     let accuracy = accuracySpanSpan(trialsSpanMpl.select('answer').values[0], trialsSpanMpl.select('correct').values[0]);
        //     console.log("trialsSpanMpl.select('answer').values[0] is ", trialsSpanMpl.select('answer').values[0]);
        //     console.log("trialsSpanMpl.select('correct').values[0] is ", trialsSpanMpl.select('correct').values[0]);
        //     console.log("accuracy is ", accuracy);
        //     actual_payment_span_mpl = spanMplPayment_easy * accuracy;
        //     actual_payment_span_mpl = Math.min(actual_payment_span_mpl, 1);
        //     console.log("subBlock chosen for payment span_mpl is", subBlockIntegerSpanMpl, "and accuracy is ", accuracy);
        // } 
        console.log("actual_payement_span_mpl is " + actual_payment_span_mpl);

        // mpl
        let actual_payment_mpl = 0;

        if (luckyPp == 1) { // 1 in propSelecForMPL chance of being selected for MPL payment
            let selectedRow = 0;
            let selectedTrial = jsPsych.data.get().filterCustom(function (trial) {
                return trial.task == 'mpl' && trial.block == 'span_mpl' && trial.subBlock == subBlockIntegerSpanMpl && trial.statusMPL == chosenStatus;
            });
            console.log(selectedTrial, "is the selectedTrial for mpl payment");
            console.log(selectedTrial.count(), "is selectedTrial count for mpl payment");
            let mplType = selectedTrial.select('mplType').values[0]; // should be the same for all trials in the subBlock
            console.log(mplType, "is the mplType for the selected trial");
            if (mplType == "GO90" || mplType == "GO10") {
                selectedRow = getRandomInt(0, sure_payments.length() - 1) // select one of the 25 rows. has to be from 0 to length-1 (indces start at 0)
            } else {
                selectedRow = getRandomInt(0, lengthSurePayments); // select one of the 18 rows. has to be from 0 to length-1 (indces start at 0)
            }
            let choices = selectedTrial.select('choices').values[0];
            console.log(choices, "is the choices for the selected trial");
            actual_payment_mpl = Math.round(calculateMPLPayment(mplType, selectedRow, choices, chosenStatus) * 100) / 100;
            actual_payment_mpl = Math.min(actual_payment_mpl, 44.5);
            console.log("actual_payment_mpl is", actual_payment_mpl)
            console.log("selectedRow is ", selectedRow, "and subBlockIntegerSpanMpl is", subBlockIntegerSpanMpl, "and luckyPp is ", luckyPp, "and chosenStatus is ", chosenStatus,
                "and choices are ", choices);
        }


        // arithmetic payment
        let selectedRoundArithmetic = getRandomInt(1, nRoundsArithmetic + 1);
        if (selectedRoundArithmetic == 5) { selectedRoundArithmetic = incentivizedRound }; // most incentivized round has twice more chance to be selected than the others
        console.log("selectedRoundArithmetic is ", selectedRoundArithmetic);
        let trialsArithmetic = jsPsych.data.get().filterCustom(function (trial) {
            return trial.task == 'arithmeticTrial' && trial.roundNumber == selectedRoundArithmetic && trial.correct == true;
        });
        console.log(trialsArithmetic, "is trialsArithmetic for payment");
        console.log(trialsArithmetic.count(), "is trialsArithmetic count for payment");
        let payment_arithmetic = trialsArithmetic.count() * arithmeticPayment

        // Use the calculated payments
        trial.data = trial.data || {};
        trial.data.treatment = treatment;
        trial.data.versionFirst = block_order_indicator_span_MPL;
        trial.data.payment_calibration = actual_payment_calibration;
        trial.data.payment_span_span = actual_payment_span_span;
        trial.data.payment_span_mpl = actual_payment_span_mpl;
        trial.data.luckyPp = luckyPp;
        trial.data.payment_mpl = actual_payment_mpl;
        trial.data.payment_arithmetic = payment_arithmetic;
        trial.data.helpPageCounter = helpPageCounter;
        const cCal = actual_payment_calibration ?? 0;
        const cSpan = actual_payment_span_span ?? 0;
        const cSpanMpl = actual_payment_span_mpl ?? 0;
        const cMpl = actual_payment_mpl ?? 0;
        const cAri = payment_arithmetic ?? 0;
        trial.data.totalBonus = Math.round(Math.min(cCal + cSpan + cSpanMpl + cMpl + cAri, ((1.03 * 4) + 1.03 + 3.3 + 44.5) + 3) * 100) / 100; // cap total bonus, let's say €3 max for arithmetic, to adjust
        if (treatment == "hard") {
            trial.data.totalPayment = Math.round((basePayment_hard + trial.data.totalBonus) * 100) / 100;
        }
        else if (treatment == "easy") {
            trial.data.totalPayment = Math.round((basePayment_easy + trial.data.totalBonus) * 100) / 100;
        }
        trial.data.propSelecForMPL = propSelecForMPL;
        trial.data.fds_letter_presentation = fds_letter_presentation;
        trial.data.betweenSpanTimeInterval = betweenSpanTimeInterval;
        trial.data.fds_post_trial_gap = fds_post_trial_gap;
        trial.data.mplTimeLimit = mplTimeLimit;

        let html;
        // if (treatment == "hard"){
        if (luckyPp == 1) {
            html =
                `<h2>${language.debrief_incentives_span_mpl.title}</h2>
            <p>${language.debrief_incentives_span_mpl.calibrationPayment.replace('{trainingBonus}', actual_payment_calibration)}</p>
            <p>${language.debrief_incentives_span_mpl.spanSpanPayment_hard.replace('{spanSpanBonus}', actual_payment_span_span)}</p>
            <p>${language.debrief_incentives_span_mpl.selectedForMPL}</p>
            <p>${language.debrief_incentives_span_mpl.bonusSpanMPL.replace('{spanMplBonus}', actual_payment_span_mpl + actual_payment_mpl).replace('{spanMPL}', actual_payment_span_mpl).replace('{mplBonus}', actual_payment_mpl)}</p>
            <p>${language.debrief_incentives_span_mpl.bonusArithmetic.replace('{arithmeticBonus}', payment_arithmetic)}</p>
            <p>${language.debrief_incentives_span_mpl.totalBonus.replace('{totalBonus}', trial.data.totalBonus).replace('{totalPayment}', trial.data.totalPayment)}</p>
            <p>${language.debrief_incentives_span_mpl.thanksAgain}</p>`;
        }
        else if (luckyPp != 1) {
            html =
                `<h2>${language.debrief_incentives_span_mpl.title}</h2>
            <p>${language.debrief_incentives_span_mpl.calibrationPayment.replace('{trainingBonus}', actual_payment_calibration)}</p>
            <p>${language.debrief_incentives_span_mpl.spanSpanPayment_hard.replace('{spanSpanBonus}', actual_payment_span_span)}</p>
            <p>${language.debrief_incentives_span_mpl.notSelectedForMPL}</p>
            <p>${language.debrief_incentives_span_mpl.bonusSpanWithoutMPL.replace('{spanMplBonus}', actual_payment_span_mpl)}</p>
            <p>${language.debrief_incentives_span_mpl.bonusArithmetic.replace('{arithmeticBonus}', payment_arithmetic)}</p>
            <p>${language.debrief_incentives_span_mpl.totalBonus.replace('{totalBonus}', trial.data.totalBonus).replace('{totalPayment}', trial.data.totalPayment)}</p>
            <p>${language.debrief_incentives_span_mpl.thanksAgain}</p>`;
        }

        trial.stimulus = html; // set final display

    },
};
const incentives_mplIncentives = {
    type: "html-keyboard-response",
    choices: ['Enter'],
    stimulus: "",
    on_start: function (trial) {

        /******* mpl payment *********/
        let actual_payment_mplIncentives = 0;
        const subBlockIntegerMplIncentives = getRandomInt(1, numberTrialsMPLIncentives + numberSuperIncentivizedMPLs) // round number + more incentivized rounds.
        console.log("numberTrialsMPLIncentives + numberSuperIncentivizedMPLs is ", numberTrialsMPLIncentives + numberSuperIncentivizedMPLs);
        console.log("subBlockIntegerMplIncentives is ", subBlockIntegerMplIncentives);

        let actual_payment_mpl = 0;
        let chosenStatus = "mirror" // always mirror in this experiment

        if (luckyPpIncentives == 1) { // 1 in propSelecForMPLIncentives chance of being selected for MPL payment

            let selectedRow;
            let selectedTrial;
            console.log("subBlockIntegerMplIncentives > numberTrialsMPLIncentives");
            const superTrials = jsPsych.data.get().filterCustom(function (trial) {
                return trial.task == 'mpl' &&
                    trial.block == 'mpl_incentives' &&
                    trial.isSuper == 1;
            })
            console.log("superTrials for mpl incentives payment are ", superTrials);
            const selectedTrialCount = superTrials.count();
            console.log("selectedTrialCount for mpl incentives payment is ", selectedTrialCount);
            if (selectedTrialCount === 0) {
                selectedTrial = jsPsych.data.get().filterCustom(function () { return false; }); // empty DataCollection
            } else {
                const randomIdx = getRandomInt(1, selectedTrialCount);
                console.log("randomIdx for selecting super trial for mpl incentives payment is ", randomIdx);
                selectedTrial = superTrials.first(randomIdx).last(1); // still a DataCollection (1 trial)
            }
            console.log(selectedTrial.count(), "is selectedTrial count for mpl payment");

            let mplType = selectedTrial.select('mplType').values[0]; // should be the same for all trials in the subBlock
            console.log(mplType, "is the mplType for the selected trial");
            if (/^.O\d{2}$/.test(mplType)) { // is always the case except if we include other types of MPLs than Oprea's ones
                selectedRow = getRandomInt(0, sure_payments.length - 1) // select one of the 25 rows. has to be from 0 to length-1 (indces start at 0)
            } else { // in case we include other grids
                selectedRow = getRandomInt(0, lengthSurePayments); // select one of the 18 rows. has to be from 0 to length-1 (indces start at 0)
            }
            let choices = selectedTrial.select('choices').values[0];
            console.log(choices, "is the choices for the selected trial");
            actual_payment_mplIncentives = Math.round(calculateMPLPayment(mplType, selectedRow, choices, chosenStatus) * 100) / 100;
            actual_payment_mplIncentives = Math.min(actual_payment_mplIncentives, 32.5); // maximum payment for the MPL part (A15 mirror)
            console.log("actual_payment_mplIncentives is", actual_payment_mplIncentives)
            console.log("selectedRow is ", selectedRow, "and actual_payment_mplIncentives is", actual_payment_mplIncentives, "and luckyPp is ", luckyPp, "and chosenStatus is ", chosenStatus,
                "and choices are ", choices);
        }

        /******* arithmetic test payment (Part 2) *********/
        let actual_payment_arithmeticTest = 0; // payment for the arithmetic test (calculating % of $25)
        const arTestValues = [10, 25, 50, 75, 90];
        const selectedArTestValue = arTestValues[getRandomInt(0, arTestValues.length - 1)];
        const selectedArTestKey = `sliderArTest${selectedArTestValue}`;
        const latestArTest = jsPsych.data.get().filter({ task: 'arithmeticTest' }).last(1).values()[0];
        const arTestResponseRaw = latestArTest ? latestArTest[selectedArTestKey] : null;
        const arTestResponse = arTestResponseRaw === null || arTestResponseRaw === undefined || arTestResponseRaw === '' ? null : parseFloat(arTestResponseRaw);
        const arTestCorrectAmount = (selectedArTestValue / 100) * 25;

        let arTestDistance = null;
        let arTestNormalizedDistance = null;
        if (arTestResponse !== null && !Number.isNaN(arTestResponse)) {
            arTestDistance = Math.abs(arTestResponse - arTestCorrectAmount);
            arTestNormalizedDistance = arTestDistance / 25; // normalize by the maximum possible distance
            const rawArTestPayment = 0.5 * Math.pow(1 - arTestNormalizedDistance, 1);// linear funcyion of the distance
            actual_payment_arithmeticTest = Math.round(Math.max(0, Math.min(rawArTestPayment, 0.5)) * 100) / 100;
        }

        console.log("Part 2 selected arithmetic test value is", selectedArTestValue, "(key:", selectedArTestKey, ")");
        console.log("Part 2 arithmetic test response is", arTestResponse, "correct amount is", arTestCorrectAmount, "distance is", arTestDistance, "payment is", actual_payment_arithmeticTest);

        // Use the calculated payments
        trial.data = trial.data || {};
        //trial.data.treatmentGoal = treatmentGoal; each participant does the two treatment so no need to indicate what is the treatment (mirror or inequalities)
        trial.data.payment_mplIncentives = actual_payment_mplIncentives;
        trial.data.payment_arithmeticTest = actual_payment_arithmeticTest;
        trial.data.arithmeticTestSelectedValue = selectedArTestValue;
        trial.data.arithmeticTestSelectedKey = selectedArTestKey;
        trial.data.arithmeticTestCorrectAmount = Math.round(arTestCorrectAmount * 100) / 100;
        trial.data.arithmeticTestResponse = arTestResponse;
        trial.data.arithmeticTestDistance = arTestDistance;
        trial.data.arithmeticTestNormalizedDistance = arTestNormalizedDistance;
        trial.data.luckyPpIncentives = luckyPpIncentives;
        trial.data.helpPageCounter = helpPageCounter;
        const cMpl = actual_payment_mplIncentives ?? 0;
        const cArTest = actual_payment_arithmeticTest ?? 0;

        trial.data.totalBonus = Math.round((Math.min(cMpl, 32.50) + cArTest) * 100) / 100;
        trial.data.totalPayment = Math.round((basePaymentMPLIncentives + trial.data.totalBonus) * 100) / 100; //30.5€
        trial.data.propSelecForMPLIncentives = propSelecForMPLIncentives;
        trial.data.fds_post_trial_gap = fds_post_trial_gap;
        // trial.data.mplTimeLimit = mplTimeLimit;

        const part2Sentence = (language === fr)
            ? language.sliderArithmeticTest.paymentSentenceFr.replace('{y}', trial.data.payment_arithmeticTest.toFixed(2))
            : `Your payment for Part 2 is ${trial.data.payment_arithmeticTest.toFixed(2)}€`;

        let html;
        // if (treatment == "hard"){
        if (luckyPpIncentives == 1) {
            html =
                `<h2>${language.debrief_incentives_span_mpl.title}</h2>
            <p>${language.debrief_incentives_span_mpl.selectedForMPL}</p>
            <p>${language.debrief_incentives_span_mpl.bonusMPLIncentives.replace('{mplIncentivesBonus}', trial.data.payment_mplIncentives)}</p>
            <p>${part2Sentence}</p>
            <p>${language.debrief_incentives_span_mpl.totalBonus.replace('{totalBonus}', trial.data.totalBonus).replace('{totalPayment}', trial.data.totalPayment)}</p>
            <p>${language.debrief_incentives_span_mpl.thanksAgain}</p>`;
        }
        else if (luckyPpIncentives != 1) {
            html =
                `<h2>${language.debrief_incentives_span_mpl.title}</h2>
            <p>${language.debrief_incentives_span_mpl.notSelectedForMPL}</p>
            <p>${part2Sentence}</p>
            <p>${language.debrief_incentives_span_mpl.totalBonus.replace('{totalBonus}', trial.data.totalBonus).replace('{totalPayment}', trial.data.totalPayment)}</p>
            <p>${language.debrief_incentives_span_mpl.thanksAgain}</p>`;
        }

        trial.stimulus = html; // set final display

    },
};


const changePaymentRule = {
    type: "html-keyboard-response",
    stimulus: function () {
        return `<div style="max-width: 1200px">
            <div style="border: 3px solid #FF6B35; background-color: #FFF3E0; padding: 20px; margin: 20px auto; border-radius: 8px;">
                <h2 style="color: #FF6B35; text-align: center; margin-top: 0;">⚠️ ${language.changeRules.title} ⚠️</h2>
                <div style="background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #FF6B35;">
                    <p style="font-size: 1.1em; font-weight: bold; margin: 0;">${language.changeRules.paymentRuleChange}</p>
                </div>
            </div>
        </div>
        <p>${language.changeRules.paymentRuleChange2}</p>
        <p>${language.changeRules.pressKey}</p>`;
    },
    on_finish: function () {
        isPaymentRulePhase = true;
        console.log("isPaymentRulePhase is now ", isPaymentRulePhase);
        treatHasChanged = true;
        console.log("treatHasChanged is now ", treatHasChanged);
    }
};

const changeTreatment = { // change from inequalities to mirror or the inverse
    type: "html-keyboard-response",
    stimulus: function () {
        let instr;
        if (treatIs == "mirr") {
            instr = language.changeTreatment.treatmentMirr
            console.log("instructions are defined as ", instr);
        }
        else if (treatIs == "ineq") {
            instr = language.changeTreatment.treatmentIneq
            console.log("instructions are defined as ", instr);
        }
        return `<div style="max-width: 1200px">
            <div style="border: 3px solid #FF6B35; background-color: #FFF3E0; padding: 20px; margin: 20px auto; border-radius: 8px;">
                <h2 style="color: #FF6B35; text-align: center; margin-top: 0;">⚠️ ${language.changeTreatment.title} ⚠️</h2>
                <div style="background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #FF6B35;">
                    <p style="font-size: 1.1em; margin: 0;"> ${instr} </p> 
                </div>
            </div>
        </div>
        <p>${language.changeRules.pressKey}</p>`;
    },
    on_finish: function () {
        isPaymentRulePhase = true;
        console.log("isPaymentRulePhase is now ", isPaymentRulePhase);
        treatHasChanged = true;
        console.log("treatHasChanged is now ", treatHasChanged);
    }
};

/************ define the cognitive uncertainty trials ***************/

const cognitiveUncertaintyMirror = {
    type: 'survey-html-form',
    html: function () {
        if (block_order_indicator_span_MPL == "mirror_first") {
            sliderOrder = language.choicesBefore;
        }
        else if (block_order_indicator_span_MPL == "lottery_first") {
            sliderOrder = language.choicesAfter;
        }

        return `
            <div style="max-width: 800px; margin: 0 auto;">
                <h2>${language.sliderTitle}</h2><br>
                <p>${language.sliderMirror.replace('{order}', sliderOrder)}</p><br>
                <p>${language.sliderHonest}</p><br>
                
                <div style="margin: 30px 0;">
                    <p>${language.sliderCognitiveUncertainty.question}</p>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span>${language.sliderCognitiveUncertainty.veryUncertain}</span>
                        <input type="range" name="cognitiveUncertainty" min="0" max="100" value="50" style="flex-grow: 1;" required>
                        <span>${language.sliderCognitiveUncertainty.veryCertain}</span>
                    </div>
                </div><br>
                
                <div style="margin: 30px 0;">
                    <p>${language.sliderInattention.questionBoxes}</p>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span>${language.sliderInattention.veryUncertain}</span>
                        <input type="range" name="inattentionBoxes" min="0" max="100" value="50" style="flex-grow: 1;" required>
                        <span>${language.sliderInattention.veryCertain}</span>
                    </div>
                </div><br>

                <div style="margin: 30px 0;">
                    <p>${language.sliderInattention.questionPayoffs}</p>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span>${language.sliderInattention.veryUncertain}</span>
                        <input type="range" name="inattentionPayoffs" min="0" max="100" value="50" style="flex-grow: 1;" required>
                        <span>${language.sliderInattention.veryCertain}</span>
                    </div>
                </div><br>
                
                <div style="margin: 30px 0;">
                    <p>${language.sliderImprecision.question}</p>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span>${language.sliderImprecision.veryUncertain}</span>
                        <input type="range" name="imprecision" min="0" max="100" value="50" style="flex-grow: 1;" required>
                        <span>${language.sliderImprecision.veryCertain}</span>
                    </div>
                </div>
            </div>
        `},
    button_label: language.button.next,
    on_load: function () {
        // find the form and the submit control
        const form = document.querySelector('form');
        console.log("form is ", form);
        const submit = document.querySelector('input[type="submit"]'); //, button[type="submit"], button.jspsych-btn
        if (!form || !submit) return;

        // collect all range inputs in the form
        const ranges = Array.from(form.querySelectorAll('input[type="range"]'));
        if (ranges.length === 0) return; // nothing to enforce

        // disable submit initially
        submit.disabled = true;
        submit.style.opacity = '0.5';
        submit.style.cursor = 'not-allowed';

        // mark as not changed
        ranges.forEach(r => r.dataset.changed = 'false');

        // helper to check whether all ranges were interacted with
        const checkAllChanged = () => {
            const allChanged = ranges.every(r => r.dataset.changed === 'true');
            if (allChanged) {
                submit.disabled = false;
                submit.style.opacity = '1';
                submit.style.cursor = 'pointer';
            }
        };

        // create and attach handlers, store them on the element so cleanup can remove them
        ranges.forEach(r => {
            const handler = function () { r.dataset.changed = 'true'; checkAllChanged(); };
            // store a reference so we can remove it later
            r._markChangedHandler = handler;
            r.addEventListener('input', handler);
            r.addEventListener('change', handler);
        });

        // safety: if form is submitted programmatically, clear listeners (optional)
        // remove listeners on submit to avoid duplicates if trial rerun
        const cleanup = () => {
            ranges.forEach(r => {
                if (r._markChangedHandler) {
                    r.removeEventListener('input', r._markChangedHandler);
                    r.removeEventListener('change', r._markChangedHandler);
                    delete r._markChangedHandler;
                }
            });
        };
        // attach one-time listener to clean up after submit click
        submit.addEventListener('click', () => {
            cleanup();
        }, { once: true });
    },
    on_finish: function (data) {
        // Parse the responses JSON
        const responses = JSON.parse(data.responses);

        // Store each slider value with your desired naming convention
        data.sliderCognitiveUncertainty = parseInt(responses.cognitiveUncertainty);
        console.log(data.sliderCognitiveUncertainty, "is data.sliderCognitiveUncertainty");
        data.sliderInattentionBoxes = parseInt(responses.inattentionBoxes);
        console.log(data.sliderInattentionBoxes, "is data.sliderInattentionBoxes");
        data.sliderInattentionPayoffs = parseInt(responses.inattentionPayoffs);
        console.log(data.sliderInattentionPayoffs, "is data.sliderInattentionPayoffs");
        data.sliderImprecision = parseInt(responses.imprecision);
        console.log(data.sliderImprecision, "is data.sliderImprecision");
        // Add task identifier
        if (block_order_indicator_span_MPL == "mirror_first") {
            data.task = 'sliderQuestionsMirror';
        }
        else if (block_order_indicator_span_MPL == "lottery_first") {
            data.task = 'sliderQuestionsLottery';
        }
    }
};
const cognitiveUncertaintyLottery = {
    type: 'survey-html-form',
    html: function () {
        if (block_order_indicator_span_MPL == "mirror_first") {
            sliderOrder = language.choicesAfter;
        }
        else if (block_order_indicator_span_MPL == "lottery_first") {
            sliderOrder = language.choicesBefore;
        }

        return `
            <div style="max-width: 800px; margin: 0 auto;">
                <h2>${language.sliderTitle}</h2><br>
                <p>${language.sliderLottery.replace('{order}', sliderOrder)}</p><br>
                <p>${language.sliderHonest}</p><br>
                
                <div style="margin: 30px 0;">
                    <p>${language.sliderCognitiveUncertainty.question}</p>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span>${language.sliderCognitiveUncertainty.veryUncertain}</span>
                        <input type="range" name="cognitiveUncertainty" min="0" max="100" value="50" style="flex-grow: 1;" required>
                        <span>${language.sliderCognitiveUncertainty.veryCertain}</span>
                    </div>
                </div><br>
                
                <div style="margin: 30px 0;">
                    <p>${language.sliderInattention.questionBoxes}</p>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span>${language.sliderInattention.veryUncertain}</span>
                        <input type="range" name="inattentionBoxes" min="0" max="100" value="50" style="flex-grow: 1;" required>
                        <span>${language.sliderInattention.veryCertain}</span>
                    </div>
                </div><br>

                <div style="margin: 30px 0;">
                    <p>${language.sliderInattention.questionPayoffs}</p>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span>${language.sliderInattention.veryUncertain}</span>
                        <input type="range" name="inattentionPayoffs" min="0" max="100" value="50" style="flex-grow: 1;" required>
                        <span>${language.sliderInattention.veryCertain}</span>
                    </div>
                </div><br>
                
                <div style="margin: 30px 0;">
                    <p>${language.sliderImprecision.question}</p>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span>${language.sliderImprecision.veryUncertain}</span>
                        <input type="range" name="imprecision" min="0" max="100" value="50" style="flex-grow: 1;" required>
                        <span>${language.sliderImprecision.veryCertain}</span>
                    </div>
                </div>
            </div>
        `},
    button_label: language.button.next,
    on_load: function () {
        // find the form and the submit control
        const form = document.querySelector('form');
        console.log("form is ", form);
        const submit = document.querySelector('input[type="submit"]'); //, button[type="submit"], button.jspsych-btn
        if (!form || !submit) return;

        // collect all range inputs in the form
        const ranges = Array.from(form.querySelectorAll('input[type="range"]'));
        if (ranges.length === 0) return; // nothing to enforce

        // disable submit initially
        submit.disabled = true;
        submit.style.opacity = '0.5';
        submit.style.cursor = 'not-allowed';

        // mark as not changed
        ranges.forEach(r => r.dataset.changed = 'false');

        // helper to check whether all ranges were interacted with
        const checkAllChanged = () => {
            const allChanged = ranges.every(r => r.dataset.changed === 'true');
            if (allChanged) {
                submit.disabled = false;
                submit.style.opacity = '1';
                submit.style.cursor = 'pointer';
            }
        };

        // create and attach handlers, store them on the element so cleanup can remove them
        ranges.forEach(r => {
            const handler = function () { r.dataset.changed = 'true'; checkAllChanged(); };
            // store a reference so we can remove it later
            r._markChangedHandler = handler;
            r.addEventListener('input', handler);
            r.addEventListener('change', handler);
        });

        // safety: if form is submitted programmatically, clear listeners (optional)
        // remove listeners on submit to avoid duplicates if trial rerun
        const cleanup = () => {
            ranges.forEach(r => {
                if (r._markChangedHandler) {
                    r.removeEventListener('input', r._markChangedHandler);
                    r.removeEventListener('change', r._markChangedHandler);
                    delete r._markChangedHandler;
                }
            });
        };
        // attach one-time listener to clean up after submit click
        submit.addEventListener('click', () => {
            cleanup();
        }, { once: true });
    },
    on_finish: function (data) {
        // Parse the responses JSON
        const responses = JSON.parse(data.responses);

        // Store each slider value with your desired naming convention
        data.sliderCognitiveUncertainty = parseInt(responses.cognitiveUncertainty);
        console.log(data.sliderCognitiveUncertainty, "is data.sliderCognitiveUncertainty");
        data.sliderInattentionBoxes = parseInt(responses.inattentionBoxes);
        console.log(data.sliderInattentionBoxes, "is data.sliderInattentionBoxes");
        data.sliderInattentionPayoffs = parseInt(responses.inattentionPayoffs);
        console.log(data.sliderInattentionPayoffs, "is data.sliderInattentionPayoffs");
        data.sliderImprecision = parseInt(responses.imprecision);
        console.log(data.sliderImprecision, "is data.sliderImprecision");
        // Add task identifier
        data.task = 'sliderQuestionsMirror';
    }
};
const cognitiveUncertaintyMirrorIncentives_mirr = {
    ...cognitiveUncertaintyMirror,
    type: 'survey-html-form',
    html: function () {

        return `
            <div style="max-width: 800px; margin: 0 auto;">
                <h2>${language.sliderTitleIncentives_mirr}</h2><br>
                <!-- <p>${language.sliderMirrorIncentives}</p><br> -->
                <p>${language.sliderHonest}</p><br>
                
                
                <div style="margin: 30px 0;">
                    <p>${language.sliderAttentionToIncentives.questionIncentivesSuper}</p>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span>${language.sliderAttentionToIncentives.veryUncertain}</span>
                        <input type="range" name="incentivesSuper" min="0" max="100" value="50" style="flex-grow: 1;" required>
                        <span>${language.sliderAttentionToIncentives.veryCertain}</span>
                    </div>
                </div><br>

                <div style="margin: 30px 0;">
                    <p>${language.sliderAttentionToIncentives.questionIncentivesClassic}</p>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span>${language.sliderAttentionToIncentives.veryUncertain}</span>
                        <input type="range" name="incentivesClassic" min="0" max="100" value="50" style="flex-grow: 1;" required>
                        <span>${language.sliderAttentionToIncentives.veryCertain}</span>
                    </div>
                </div><br>

                <div style="margin: 30px 0;">
                    <p>${language.sliderInattention.questionBoxesIncentives}</p>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span>${language.sliderInattention.veryUncertain}</span>
                        <input type="range" name="inattentionBoxes" min="0" max="100" value="50" style="flex-grow: 1;" required>
                        <span>${language.sliderInattention.veryCertain}</span>
                    </div>
                </div><br>

                <div style="margin: 30px 0;">
                    <p>${language.sliderInattention.questionPayoffsIncentives}</p>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span>${language.sliderInattention.veryUncertain}</span>
                        <input type="range" name="inattentionPayoffs" min="0" max="100" value="50" style="flex-grow: 1;" required>
                        <span>${language.sliderInattention.veryCertain}</span>
                    </div>
                </div><br>

            </div>
        `},
    on_finish: function (data) {
        // Parse the responses JSON
        const responses = JSON.parse(data.responses);

        // Store each slider value with your desired naming convention
        data.sliderCUIncentiveSuper = parseInt(responses.incentivesSuper);
        console.log(data.sliderCUIncentiveSuper, "is data.sliderCUIncentiveSuper");
        data.sliderCUIncentiveClassic = parseInt(responses.incentivesClassic);
        console.log(data.sliderCUIncentiveClassic, "is data.sliderCUIncentiveClassic");
        data.sliderInattentionPayoffs = parseInt(responses.inattentionPayoffs);
        console.log(data.sliderInattentionPayoffs, "is data.sliderCUInattentionPayoffs");
        data.sliderInattentionBoxes = parseInt(responses.inattentionBoxes);
        console.log(data.sliderInattentionBoxes = data.sliderInattentionBoxes)
        data.task = 'sliderQuestions_mirror';
    }
};
const cognitiveUncertaintyMirrorIncentives_ineq = { // questions concerning the inequalities treatment (mirror because all MPLs are mirrors in Oprea's sense)
    ...cognitiveUncertaintyMirror,
    type: 'survey-html-form',
    html: function () {

        return `
            <div style="max-width: 800px; margin: 0 auto;">
                <h2>${language.sliderTitleIncentives_ineq}</h2><br>
                <!-- <p>${language.sliderMirrorIncentives}</p><br> -->
                <p>${language.sliderHonest}</p><br>
                
                
                <div style="margin: 30px 0;">
                    <p>${language.sliderAttentionToIncentives.questionIncentivesSuper}</p>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span>${language.sliderAttentionToIncentives.veryUncertain}</span>
                        <input type="range" name="incentivesSuper" min="0" max="100" value="50" style="flex-grow: 1;" required>
                        <span>${language.sliderAttentionToIncentives.veryCertain}</span>
                    </div>
                </div><br>

                <div style="margin: 30px 0;">
                    <p>${language.sliderAttentionToIncentives.questionIncentivesClassic}</p>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span>${language.sliderAttentionToIncentives.veryUncertain}</span>
                        <input type="range" name="incentivesClassic" min="0" max="100" value="50" style="flex-grow: 1;" required>
                        <span>${language.sliderAttentionToIncentives.veryCertain}</span>
                    </div>
                </div><br>

                <div style="margin: 30px 0;">
                    <p>${language.sliderInattention.questionBoxesIncentives}</p>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span>${language.sliderInattention.veryUncertain}</span>
                        <input type="range" name="inattentionBoxes" min="0" max="100" value="50" style="flex-grow: 1;" required>
                        <span>${language.sliderInattention.veryCertain}</span>
                    </div>
                </div><br>

                <div style="margin: 30px 0;">
                    <p>${language.sliderInattention.questionPayoffsIncentives}</p>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span>${language.sliderInattention.veryUncertain}</span>
                        <input type="range" name="inattentionPayoffs" min="0" max="100" value="50" style="flex-grow: 1;" required>
                        <span>${language.sliderInattention.veryCertain}</span>
                    </div>
                </div><br>

            </div>
        `},
    on_finish: function (data) {
        // Parse the responses JSON
        const responses = JSON.parse(data.responses);

        // Store each slider value with your desired naming convention
        data.sliderCUIncentiveSuper = parseInt(responses.incentivesSuper);
        console.log(data.sliderCUIncentiveSuper, "is data.sliderCUIncentiveSuper");
        data.sliderCUIncentiveClassic = parseInt(responses.incentivesClassic);
        console.log(data.sliderCUIncentiveClassic, "is data.sliderCUIncentiveClassic");
        data.sliderInattentionPayoffs = parseInt(responses.inattentionPayoffs);
        console.log(data.sliderInattentionPayoffs, "is data.sliderCUInattentionPayoffs");
        data.sliderInattentionBoxes = parseInt(responses.inattentionBoxes);
        console.log(data.sliderInattentionBoxes, "is data.sliderInattentionBoxes");
        data.task = 'sliderQuestions_inequalities';
    }
};

const instructionArTest = {
    type: "instructions",
    pages: [
        `<h2>${language.sliderArithmeticTest.instructionTitle}</h2>
        <p>${language.sliderArithmeticTest.subtitle}</p>
        <p>${language.sliderArithmeticTest.bonus.replace('{bonusArithmetic}', baseBonusArithmeticTest)}</p>
        <p>${language.sliderArithmeticTest.bePrecise}</p>
        <details style="margin-top: 10px; background-color: #f2f2f2; padding: 10px; border-radius: 10px;">
            <summary style="cursor: pointer;">${language.sliderArithmeticTest.morePrecisely}</summary>
            <div style="margin: 8px auto; max-width: 800px;">
                <p>${language.sliderArithmeticTest.morePreciseDistance}</p>
                <p>${language.sliderArithmeticTest.formula}</p>
                <p>${language.sliderArithmeticTest.morePrecisionBonus
            .replace('{bonusArithmetic}', baseBonusArithmeticTest)
            .replace('{bonusArithmetic}', baseBonusArithmeticTest)
            .replace('{exampleBonusArithmetic}', Math.round((baseBonusArithmeticTest * 0.8) * 100) / 100)}</p>
            </div>
        </details>`
    ],
    show_clickable_nav: true,
    button_label_next: language.button.next,
    button_label_previous: language.button.previous,
    allow_backward: true,
};

const atTestTrial = { // arithmetic test trial

    type: 'survey-html-form',
    button_label: language.button.next,
    html: function () {
        const values = [10, 25, 50, 75, 90];
        const shuffledValues = jsPsych.randomization.shuffle(values.slice());
        let sliderRows = '';

        for (let i = 0; i < shuffledValues.length; i++) {
            const value = shuffledValues[i];
            const questionTemplate = language.sliderArithmeticTest.question;
            const question = questionTemplate.replace('{x}', value).replace('{x}', value);
            sliderRows += `
                <div style="margin: 30px 0;">
                    <p style="margin-bottom: 10px;">${question}</p>
                    <div style="display: inline flow-root; align-items: center; gap: 10px;">
                        <input type="text" name="arTest_${value}" maxlength="5" required>
                        <!-- <span id="arTest_amount_${value}" style="min-width: 56px; text-align: right; font-weight: 600;">12.50</span> -->
                    </div>
                </div>
                <br>
            `;
        }

        return `
            <div id="arithmetic-test-container" style="width: 800px;max-width: 800px; margin: 0 auto;">
                <input type="hidden" name="arTestOrder" value="${shuffledValues.join(',')}">
                <h2>${language.sliderArithmeticTest.title}</h2>
                <br>
                ${sliderRows}
            </div>
        `;
    },
    // on_load: function() {
    //     const sliders = Array.from(document.querySelectorAll('#arithmetic-test-container input[type="range"]'));
    //     sliders.forEach(function(slider) {
    //         const suffix = slider.name.replace('arTest_', '');
    //         const amountNode = document.getElementById(`arTest_amount_${suffix}`);
    //         const updateAmount = function() {
    //             if (amountNode) {
    //                 amountNode.textContent = Number(slider.value).toFixed(2);
    //             }
    //         };
    //         slider.addEventListener('input', updateAmount);
    //         updateAmount();
    //     });
    // },
    on_finish: function (data) {
        const responses = JSON.parse(data.responses);
        console.log("Raw responses for arithmetic test are: ", responses);
        const valueOrder = responses.arTestOrder.split(',').map(function (v) { return parseInt(v, 10); }) //responses.arTestOrder ? responses.arTestOrder.split(',').map(function(v) { return parseInt(v, 10); }) : [10, 25, 50, 75, 90];
        valueOrder.forEach(function (value) {
            const key = `arTest_${value}`;
            const responseValue = responses[key];
            data[`sliderArTest${value}`] = responseValue === undefined || responseValue === null || responseValue === '' ? null : parseFloat(responseValue.replace(",", "."));
        });
        console.log("arithmetic test responses stored in data are: ", valueOrder.map(v => ({ [v]: data[`sliderArTest${v}`] })));

        data.arTestValuesOrder = valueOrder;
        data.task = 'arithmeticTest';
    }
};

const arTestTrial = atTestTrial;

/************ define the slider real effort task trials ***************/

const trialSlidersMotivation = {
    type: 'survey-html-form',
    html: function () {
        // Example parameters - adjust as needed
        const nSliders = 50;
        const startValue = 0;
        const horizontalPosition = "random"; // "centered" or "random"
        const verticalSpacing = "30px";
        return slidersMotivationGenerator(nSliders, startValue, horizontalPosition, verticalSpacing, 'trialSlidersMotivation');
    },
    button_label: language.button.next,
    on_load: function () {
        var container = document.getElementById('sliders-motivation-container');
        if (!container) {
            console.log("no sliders-motivation-container")
            return
        };

        var sliders = container.querySelectorAll('input[type="range"]');

        sliders.forEach(function (slider) {
            var isDragging = false;
            var hasMoved = false;
            var startX = 0;
            var originalValue = parseInt(slider.dataset.startValue);

            // On mousedown, store start position and current value
            slider.addEventListener('mousedown', function (e) {
                isDragging = true;
                hasMoved = false;
                startX = e.clientX;
                slider.dataset.valueAtMousedown = slider.value;
            });

            slider.addEventListener('touchstart', function (e) {
                isDragging = true;
                hasMoved = false;
                startX = e.touches[0].clientX;
                slider.dataset.valueAtMousedown = slider.value;
            });

            // On mousemove, check if actually dragging (moved more than 5px)
            slider.addEventListener('mousemove', function (e) {
                if (isDragging && Math.abs(e.clientX - startX) > 5) {
                    hasMoved = true;
                    slider.dataset.dragged = 'true';
                }
            });

            slider.addEventListener('touchmove', function (e) {
                if (isDragging && Math.abs(e.touches[0].clientX - startX) > 5) {
                    hasMoved = true;
                    slider.dataset.dragged = 'true';
                }
            });

            // On mouseup, if no drag occurred, reset to previous value
            slider.addEventListener('mouseup', function (e) {
                if (!hasMoved && isDragging) {
                    slider.value = slider.dataset.valueAtMousedown || originalValue;
                }
                isDragging = false;
            });

            slider.addEventListener('touchend', function (e) {
                if (!hasMoved && isDragging) {
                    slider.value = slider.dataset.valueAtMousedown || originalValue;
                }
                isDragging = false;
            });

            // Prevent clicks on track from changing value
            slider.addEventListener('click', function (e) {
                if (slider.dataset.dragged !== 'true') {
                    e.preventDefault();
                    slider.value = originalValue;
                }
            });
        });
    },
    on_finish: function (data) {
        processSlidersData(data, 'trialSlidersMotivation');
    }
};
const instructionsSlidersMotivation = {
    ...trialSlidersMotivation,
    html: function () {
        // Example parameters - adjust as needed
        const nSliders = 3;
        const startValue = 0;
        const horizontalPosition = "random"; // "centered" or "random"
        const verticalSpacing = "30px";
        return slidersMotivationGenerator(nSliders, startValue, horizontalPosition, verticalSpacing, 'instructionsSlidersMotivation');
    },
    button_label: language.button.next,
    on_finish: function (data) {
        processSlidersData(data, 'instructionsSlidersMotivation');
    }
};

/************ define the angles motivation trials ***************/

const instructionsAnglesMotivation = {
    type: "instructions",
    pages: ["Autre tâche de motivation possible : choisir si la ligne noire est plus horizontale ou verticale."],
    show_clickable_nav: true,
    button_label_next: language.button.next,
    //button_label_previous: language.button.previous,
};
const angleMotivationTrial = {
    type: 'html-button-response',
    stimulus: `
        <canvas id="angle-motivation-canvas" width="600" height="600" style="border: 1px solid #ccc;"></canvas>
        `,
    choices: ["Vertical (blue)", "Horizontal (red)"],
    data: {
        task: 'angleMotivation'//,
        //angle : jsPsych.timelineVariable("angle", true)
    },
    on_load: function () {
        const canvas = document.getElementById("angle-motivation-canvas");
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, width, height);

        // Line dimensions (2/3 of canvas size = 400px)
        const lineLength = 2 * width / 3; // 400px
        const lineWidth = 3;

        // Position: bottom of vertical line near left of horizontal line
        // Horizontal line: centered vertically, positioned so left side is at 1/3 canvas width
        const horizontalY = 5 * height / 6;
        const startX = width / 6;
        const horizontalEndX = startX + lineLength;

        // Vertical line: 
        const verticalX = startX;
        const verticalBottomY = horizontalY; // Just above horizontal line
        const verticalTopY = verticalBottomY - lineLength;

        // Draw red horizontal line
        ctx.beginPath();
        ctx.strokeStyle = 'red';
        ctx.lineWidth = lineWidth;
        ctx.moveTo(startX + 30, horizontalY);
        ctx.lineTo(horizontalEndX + 30, horizontalY);
        ctx.stroke();

        // Draw blue vertical line
        ctx.beginPath();
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = lineWidth;
        ctx.moveTo(verticalX, verticalTopY + 30);
        ctx.lineTo(verticalX, verticalBottomY + 30);
        ctx.stroke();

        // Black line center position:
        // x = middle of horizontal line
        // y = middle of vertical line
        const blackCenterX = 1 / 2 * width;//(horizontalStartX + horizontalEndX) / 2;
        const blackCenterY = 1 / 2 * height;// (verticalTopY + verticalBottomY) / 2;

        // Convert angle to radians (0° = horizontal, 90° = vertical)
        const angleRad = jsPsych.timelineVariable("angle", true) * Math.PI / 180;

        // Calculate black line endpoints
        const halfLength = lineLength / 2;
        const dx = halfLength * Math.cos(angleRad);
        const dy = halfLength * Math.sin(angleRad);

        // Draw black tilted line
        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.lineWidth = lineWidth;
        ctx.moveTo(blackCenterX - dx, blackCenterY + dy);
        ctx.lineTo(blackCenterX + dx, blackCenterY - dy);
        ctx.stroke();

        console.log(jsPsych.timelineVariable("angle", true), "is the angle for this trial (should be 45 or 135)");
    },
    on_finish: function (data) {
        data.angle = jsPsych.timelineVariable("angle", true);
        data.response_label = data.button_pressed == 0 ? "Vertical (blue)" : "Horizontal (red)";
        data.correct = (data.angle <= 45 && data.response_label == "Horizontal (red)") || (data.angle >= 45 && data.response_label == "Vertical (blue)") ? "correct" : "incorrect";
        console.log("angleMotivationTrial angle is ", data.angle);
        console.log("angleMotivationTrial response:", data.response_label);
        console.log("angleMotivationTrial correct:", data.correct);
    }
};
const feedbackAnglesMotivation = {
    type: 'html-button-response',
    stimulus: "debrief performance",
    choices: [`${language.button.next}`],
    data: { task: 'feedbackAnglesMotivation' }
};

let anglesVariables = generateAnglesMotivationVariables(nAngles);
anglesVariables = anglesVariables.map(angle => ({ angle: angle, test: "test" }))
//console.log("anglesVariables arrays are", anglesVariables)

const timelineAnglesMotivation = {
    timeline: [instructionsAnglesMotivation,
        {
            timeline: [angleMotivationTrial],
            timeline_variables: anglesVariables
        },
        feedbackAnglesMotivation
    ]
}

/************ define the arithmetic task trials ***************/

const arithmeticTrial = {
    type: 'html-keyboard-response',
    stimulus: function () {
        return jsPsych.timelineVariable('html', true);
    },
    choices: ['Enter'], // Disable default key responses
    on_start: function () {
        arithmeticInputBuffer = "";
        numberAttemptedSums += 1;
    },
    on_load: function () {
        console.log("Starting arithmetic trial, input buffer reset. numberAttemptedSums is now ", numberAttemptedSums);
        // Temporarily disable 'Enter' as a valid response to block carryover keypresses
        // const originalChoices = arithmeticTrial.choices;
        // arithmeticTrial.choices = [];
        // const ignoreWindowMs = 2000;
        // setTimeout(() => {
        //     arithmeticTrial.choices = originalChoices;
        //     console.log("Re-enabled Enter key response after ignore window");
        // }, ignoreWindowMs);
        const echoedText = document.getElementById('arithmetic-response-echo');

        const renderInput = function () {
            if (!echoedText) {
                return;
            }
            echoedText.textContent = arithmeticInputBuffer.length > 0 ? arithmeticInputBuffer : '\u00A0';
        };

        renderInput();


        arithmeticInputHandler = function (e) {

            if (/^[0-9]$/.test(e.key)) {
                arithmeticInputBuffer += e.key;
                renderInput();
                e.preventDefault();
            } else if (e.key === 'Backspace') {
                arithmeticInputBuffer = arithmeticInputBuffer.slice(0, -1);
                renderInput();
                e.preventDefault();
            }
        };

        document.addEventListener('keydown', arithmeticInputHandler);

        let countdownContainer = document.getElementById('countdown');
        if (!countdownContainer) {
            countdownContainer = document.createElement('div');
            countdownContainer.id = 'countdown';
            countdownContainer.innerText = '';
            document.body.appendChild(countdownContainer);
        }

        if (arithmeticRoundStartTime === null) {
            arithmeticRoundStartTime = Date.now();
        }

        const updateCountdown = function () {
            if (arithmeticRoundStartTime === null) {
                return;
            }
            const elapsed = Date.now() - arithmeticRoundStartTime;
            const remaining = Math.max(0, arithmeticRoundTimeoutMs - elapsed);
            const countdownEl = document.getElementById('countdown');
            if (countdownEl) {
                countdownEl.innerText = `${language.timerText} ${formatSeconds(remaining)}`;
            }
        };

        updateCountdown();

        if (arithmeticRoundTimer === null) {
            arithmeticRoundTimer = setTimeout(function () {
                if (arithmeticRoundCountdownInterval !== null) {
                    clearInterval(arithmeticRoundCountdownInterval);
                    arithmeticRoundCountdownInterval = null;
                    console.log("Cleared arithmetic round countdown interval due to timeout.");
                }
                const countdownEl = document.getElementById('countdown');
                if (countdownEl && countdownEl.parentNode) {
                    countdownEl.parentNode.removeChild(countdownEl);
                }
                arithmeticRoundStartTime = null;
                arithmeticRoundTimer = null;
                console.log("Arithmetic round timed out.");

                jsPsych.endCurrentTimeline();
                jsPsych.finishTrial();
                console.log("Ended current trial due to arithmetic round timeout.");
            }, arithmeticRoundTimeoutMs);
        }

        if (arithmeticRoundCountdownInterval === null) {
            arithmeticRoundCountdownInterval = setInterval(function () {
                updateCountdown();
                if (arithmeticRoundStartTime !== null && Date.now() - arithmeticRoundStartTime >= arithmeticRoundTimeoutMs) {
                    clearInterval(arithmeticRoundCountdownInterval);
                    arithmeticRoundCountdownInterval = null;
                }
            }, 250);
        }
    },
    on_finish: function (data) {

        if (arithmeticInputHandler) {
            document.removeEventListener('keydown', arithmeticInputHandler);
            arithmeticInputHandler = null;
        }

        const numbers = jsPsych.timelineVariable('numbers', true);
        const expectedSum = jsPsych.timelineVariable('expectedSum', true);
        const response = arithmeticInputBuffer;
        const responseNumber = response === "" ? null : parseInt(response, 10);
        const correct = responseNumber === expectedSum;

        if (correct) {
            numberCorrectSums += 1;
        }



        //data.task = 'arithmetic';
        data.task = 'arithmeticTrial';
        data.numbers = numbers;
        data.expectedSum = expectedSum;
        data.response = response;
        data.responseNumber = responseNumber;
        data.correct = correct;
        data.roundNumber = arRoundIndicator;
        console.log("Arithmetic trial data:", data, ", numberAttemptedSums is ", numberAttemptedSums, ", numberCorrectSums is ", numberCorrectSums);
    }
};

const arithmeticFeedback = { // select the trial from the same round ! Maybe using the jsPsych.data.getDataByTimelineNode(current_node_id)
    type: 'html-button-response',
    choices: [language.button.next],
    stimulus: function () {
        // const last = jsPsych.data.get().filterCustom(function(trial){task = 'arithmeticTrial'}).last(1).values()[0];
        const last = jsPsych.data.get().last(1).values()[0];
        const statusText = last.correct ? `${language.feedback.correct}` : `${language.feedback.incorrect}`;
        const statusColor = last.correct ? '#1B7F3A' : '#B00020';
        const answerText = last.response === '' ? '-' : last.response;

        return `<div style="max-width: 900px; margin: 0 auto; text-align: center;">
                    <p style="font-size: 42px; font-weight: 700; color: ${statusColor}; margin-bottom: 18px;">${statusText}</p>
                    <p style="font-size: 24px; margin-bottom: 8px;">${language.feedbackArithmetic.yourAnswer} <b>${answerText}</b></p>
                    <p style="font-size: 24px;">${language.feedbackArithmetic.correctAnswer} <b>${last.expectedSum}</b></p>
                </div>`;
    },
    data: { task: 'arithmeticFeedback' }
};

const instructionsArithmetic = {
    type: "instructions",
    pages: function () {
        return [`<h2>${language.arithInstr.titleInstructions}</h2>
            <p>${language.arithInstr.severalAdditions}</p>
            <p>${language.arithInstr.nRounds}</p>
            <br>
            <p><b>${language.arithInstr.bonus}</b></p>
            <p>${language.arithInstr.randomRound.replace('{paymentPerAddition}', arithmeticPayment)}</p>
            <p>${language.arithInstr.example.replace('{paymentPerAddition}', arithmeticPayment).replace('{exemplePayment}', Math.round(100 * 3 * arithmeticPayment) / 100)}</p>
            <p>${language.arithInstr.clickNextInstructions}</p>`];
    },
    show_clickable_nav: true,
    button_label_next: language.button.next,
    button_label_previous: language.button.previous,
    allow_backward: true,
}

let arithmeticRounds = [];

makeArithmeticRounds = function (n) {

    incentivizedRound = getRandomInt(3, n);

    for (let i = 0; i < n; i++) {
        let presentationRound = {
            type: "html-keyboard-response",
            stimulus: function () {
                if (i == incentivizedRound - 1) {
                    return `<h2>${language.arithmeticPresentationRound.round.replace('{n}', i + 1)}</h2>
                    <p><b>${language.arithmeticPresentationRound.incentivizedRound}</b></p>
                    <p>${language.arithmeticPresentationRound.pressEnter}</p>`;
                }
                else {
                    return `<h2>${language.arithmeticPresentationRound.round.replace('{n}', i + 1)}</h2>
                    <p>${language.arithmeticPresentationRound.pressEnter}</p>`;
                }
            },
            choices: ['Enter'],
            post_trial_gap: 500,
        }
        //let core_round = []
        arithmeticRounds.push(
            arithmeticRound, presentationRound
        )
        arithmeticRounds.push({
            timeline: [
                arithmeticTrial,
                arithmeticFeedback],
            timeline_variables: additionGenerator(arithmetic_duration),
            conditional_function: function () {
                console.log('This conditional function will execute first.')
                return true;
            }
        });

        //arithmeticRounds.push(core_round);
        //console.log("arithmeticRounds after push is ", arithmeticRounds);
    }
    arithmeticRounds.splice(0, 0, instructionsArithmetic);

}

makeArithmeticRounds(nRoundsArithmetic)
//       { conditional_function: function() { return fdsTrialNum == totalFdsSpanMplTrials + 1; }, timeline: [presentationRound]}, 

const arithmeticTimeline = {
    timeline: arithmeticRounds
}










/*************** TIMELINES ***************/


let block_order_indicator;


//let actual_payment_span_span = 0;



// Function to generate a random integer between min and max (inclusive)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Generate a random integer between 1 and 11
const subBlockInteger = getRandomInt(1, 12);
//getRandomInt(1, totSubBlocks);
console.log(subBlockInteger, "selected subBlock for payment"); // Output: random integer between 2 and 11

const letter_proc = {
    timeline: [letter_fds_vis],
    loop_function: function () {
        if (exitLetters == 0) {
            return true;
        } else {
            return false;
        }
    }
}

const staircase = {
    timeline: [setup_fds, letter_proc, fds_response_screen]
};

const fds_calibration = {
    timeline: [fdsTotalTrialsTraining_update, staircase, feedback_span, staircase_assess],
    loop_function: function () {
        if ((fdsTrialNum) == fdsTotalTrials + 1) {
            if (currentSpan == 0 || currentSpan == 1) {
                startingSpan = 1
            }
            else if (currentSpan >= 2) {
                console.log("currentSpan before updating startingSpan is " + currentSpan);
                startingSpan = currentSpan;
                console.log("startingSpan is now " + startingSpan);
            }
            fdsTrialNum = 1;
            idx = 0;
            exitLetters = 0;
            fdsTotalTrials = totalFdsSpanSpanTrials;
            maximumSpanCalibration = currentSpan;
            console.log("maximumSpanCalibration is " + maximumSpanCalibration);

            console.log("exiting fds_calibration, currentSpan is " + currentSpan);
            return false;
        } else {
            return true;
        }
    },
};

const fds_span_span_proc = {
    timeline: [before_span_span1, letter_proc, before_span_span2, letter_proc, fds_response_screen_span_span1, fds_response_screen_span_span2],
    loop_function: function () {
        subBlock_span_span++;
        console.log("subBlock_span_span is now " + subBlock_span_span);
        if ((fdsTrialNum) == totalFdsSpanSpanTrials + 1) {
            fdsTrialNum = 1;
            idx = 0;
            exitLetters = 0;
            fdsTotalTrials = totalFdsSpanMplTrials;
            if (treatment == "easy") {
                startingSpan = 1;
                currentSpan = 1;
            }
            console.log("exiting fds_span_span_proc, currentSpan is " + currentSpan);
            return false;
        } else {
            return true;
        }
    },
};
//     type: "instructions",
//     pages: function () {
//         return [
//         `<div style="max-width: 1200px"> <p>${language.continueToComprehensionQuestions.title}</p>
//         <p>${language.continueToComprehensionQuestions.clickNext}</p>
//         </div>`
//     ]
//     },
//     show_clickable_nav: true,
//     button_label_next: language.button.next,
//     button_label_previous: language.button.previous,
// };

const comprehensionQuestionsMPLLotteryWithCheck = {
    timeline: [
        comprehensionQuestionsMPLLottery,
        {
            timeline: [loopAgainSpanMplLottery],
            conditional_function: function () {
                const last = jsPsych.data.get().filter({ task: 'comprehensionSurveyMPLLottery' }).last(1).values()[0];
                console.log("Checking comprehension results:", last);
                console.log("last.questions_correct.length is ", last.questions_correct.length);
                // Check if fewer than 5 questions were correct
                return last && last.questions_correct.length < 2 && failedQLottery < maxQTrials;
            }
        },
        {
            timeline: [comprehensionFailureTrial],
            conditional_function: function () {
                // const last = jsPsych.data.get().filter({task: 'comprehensionSurveyMPLLottery'}).last(1).values()[0];
                // console.log("Checking comprehension results:", last);
                // console.log("last.questions_correct.length is ", last.questions_correct.length);
                // Check if fewer than 4 questions were correct
                // return last && last.questions_correct.length < 4;
                return failedQLottery >= maxQTrials;
            }
        }
    ],
    loop_function: function () {
        const last = jsPsych.data.get().filter({ task: 'comprehensionSurveyMPLLottery' }).last(1).values()[0];
        return !(last && last.questions_correct.length === 2);
    }
};

const comprehensionQuestionsMPLMirrorWithCheck = {
    timeline: [
        comprehensionQuestionsMPLMirror,
        {
            timeline: [loopAgainSpanMplMirror],
            conditional_function: function () {
                const last = jsPsych.data.get().filter({ task: 'comprehensionSurveyMPLMirror' }).last(1).values()[0];
                console.log("Checking comprehension results:", last);
                console.log("last.questions_correct.length is ", last.questions_correct.length);
                // Check if fewer than 4 questions were correct
                // return last && last.questions_correct.length == 4;
                return last && last.questions_correct.length < 2 && failedQMirror < maxQTrials;
            }
        },
        {
            timeline: [comprehensionFailureTrial],
            conditional_function: function () {
                const last = jsPsych.data.get().filter({ task: 'comprehensionSurveyMPLMirror' }).last(1).values()[0];
                console.log("Checking comprehension results:", last);
                console.log("last.questions_correct.length is ", last.questions_correct.length);
                // Check if fewer than 4 questions were correct
                // return last && last.questions_correct.length < 4;
                return failedQMirror >= maxQTrials;
            }
        }
    ],
    loop_function: function () {
        const last = jsPsych.data.get().filter({ task: 'comprehensionSurveyMPLMirror' }).last(1).values()[0];
        return !(last && last.questions_correct.length === 2);
    }
};
const comprehensionQuestionsMPLMirrorWithCheckIncentives = {
    timeline: [
        comprehensionQuestionsMPLMirrorIncentives,
        {
            timeline: [loopAgainSpanMplMirror],
            conditional_function: function () {
                const last = jsPsych.data.get().filter({ task: 'comprehensionSurveyMPLIncentives' }).last(1).values()[0];
                console.log("Checking comprehension results:", last);
                console.log("last.questions_correct.length is ", last.questions_correct.length);
                // Check if fewer than 4 questions were correct
                // return last && last.questions_correct.length == 4;
                return last && last.questions_correct.length < 3 && failedQMirror < maxQTrials; // 3 bc there are 3 questions
            }
        },
        {
            timeline: [comprehensionFailureTrialIncentives],
            conditional_function: function () {
                const last = jsPsych.data.get().filter({ task: 'comprehensionSurveyMPLIncentives' }).last(1).values()[0];
                console.log("Checking comprehension results:", last);
                console.log("last.questions_correct.length is ", last.questions_correct.length);
                // Check if fewer than 4 questions were correct
                // return last && last.questions_correct.length < 4;
                return failedQMirror >= maxQTrials;
            }
        }
    ],
    loop_function: function () {
        const last = jsPsych.data.get().filter({ task: 'comprehensionSurveyMPLIncentives' }).last(1).values()[0];
        return !(last && last.questions_correct.length === 3);
    }
};

const timelineTrainingSpanMPLTrial = {
    timeline: [blockIsTraining, mpl_trial_training],
    timeline_variables: training_mpl_html_array,
}
const timelineExampleSpanMPLTrialMirror = {
    timeline: [blockIsExample, introductionFinalExampleSpanMPL, setup_fds, letter_proc, mpl_trial, fds_response_screen, feedbackExampleSpanMPL, blockIsspan_mPLAndFdsTrialNumReset],
    timeline_variables: example_mpl_html_array_mirror,
}
const timelineExampleSpanMPLTrialMirrorIncentives_mirr = {
    timeline: [blockIsExample, mpl_trial, feedbackExampleSpanMPLIncentives, blockIsspan_mPLAndFdsTrialNumReset],
    timeline_variables: example_mpl_html_array_mirrorIncentives_mirr,
}
const timelineExampleSpanMPLTrialMirrorIncentives_ineq = {
    timeline: [blockIsExample, mpl_trial, feedbackExampleSpanMPLIncentives, blockIsspan_mPLAndFdsTrialNumReset],
    timeline_variables: example_mpl_html_array_mirrorIncentives_ineq,
}
const timelineExampleSpanMPLTrialLottery = {
    timeline: [blockIsExample, introductionFinalExampleSpanMPL, setup_fds, letter_proc, mpl_trial, fds_response_screen, feedbackExampleSpanMPL, blockIsspan_mPLAndFdsTrialNumReset],
    timeline_variables: example_mpl_html_array_lottery,
}
const timelineFirstInstructionsLottery = {
    timeline: [instructionsSpanMPLLottery, comprehensionQuestionsMPLLotteryWithCheck, instructionsChoosingASetOfBoxes, timelineTrainingSpanMPLTrial, instructionsIncentivesSpanMPL, timelineExampleSpanMPLTrialLottery],
    conditional_function: function () { return fdsTrialNum == 1; }
}
const timelineFirstInstructionsMirror = {
    timeline: [instructionsSpanMPLMirror, comprehensionQuestionsMPLMirrorWithCheck, instructionsChoosingASetOfBoxes, timelineTrainingSpanMPLTrial, instructionsIncentivesSpanMPL, timelineExampleSpanMPLTrialMirror],
    conditional_function: function () { return fdsTrialNum == 1; }
}
let treatIs;
const treatisIneq = {
    type: "call-function",
    func: function () {
        treatIs = "ineq"
        console.log("treatIs is ", treatIs);
    }
}
const treatisMirr = {
    type: "call-function",
    func: function () {
        treatIs = "mirr"
        console.log("treatIs is ", treatIs);
    }
}
const timelineInstructionsMPLIncentives = { // the timeline for the experiment about incentives on mirrors only
    timeline: [instructionsSpanMPLMirrorIncentives, comprehensionQuestionsMPLMirrorWithCheckIncentives, instructionsChoosingASetOfBoxesIncentives,
        timelineTrainingSpanMPLTrial, instructionsIncentivesSpanMPLIncentives,
        { conditional_function: function () { return treatIs == "mirr"; }, timeline: [timelineExampleSpanMPLTrialMirrorIncentives_mirr] },
        { conditional_function: function () { return treatIs == "ineq"; }, timeline: [timelineExampleSpanMPLTrialMirrorIncentives_ineq] }],
    //conditional_function: function() { return fdsTrialNum == 1; }
}
const timelineSecondInstructionsLottery = {
    timeline: [changePaymentRule, secondInstructionsPaymentRuleLottery, comprehensionQuestionsMPLLotteryWithCheck],
    conditional_function: function () { return fdsTrialNum == 1; }
};
const timelineSecondInstructionsMirror = {
    timeline: [changePaymentRule, secondInstructionsPaymentRuleMirror, comprehensionQuestionsMPLMirrorWithCheck],
    conditional_function: function () { return fdsTrialNum == 1; }
};
const timelineSecondInstructionsMPLIncentives = {
    timeline: [changePaymentRule, secondInstructionsPaymentRuleMirror, comprehensionQuestionsMPLMirrorWithCheckIncentives],
    conditional_function: function () { return fdsTrialNum == 1; }
};
const timeline_spanMPL_lottery = {
    timeline: [fdsBlockToSpanMplAndSubBlockIncrementLottery, setup_fds, letter_proc, mpl_trial, fds_response_screen, { conditional_function: function () { return fdsTrialNum == totalFdsSpanMplTrials + 1; }, timeline: [fdsTrialNumResetAndSubBlockReset] }],
    timeline_variables: mpl_html_array_lottery,
    // conditional_function: function() { return treatment == "hard"; }
};

const timeline_ineq_MPLIncentives = {
    timeline: [setup_MPLIncentives, mpl_trial /*, { conditional_function: function() { return fdsTrialNum == totalFdsSpanMplTrials + 1; }, timeline: [fdsTrialNumResetAndSubBlockReset]} */],
    timeline_variables: mplIncentives_html_array_ineq,
}
const timeline_mirr_MPLIncentives = {
    timeline: [setup_MPLIncentives, mpl_trial /*, { conditional_function: function() { return fdsTrialNum == totalFdsSpanMplTrials + 1; }, timeline: [fdsTrialNumResetAndSubBlockReset]} */],
    timeline_variables: mplIncentives_html_array_mirr,
}

let experiment_MPLIncentives;
if (treatment == "hard") { // 1 chance out of two that treatment is easy or high, and in the lab it is determined by the desk of the participant, so the pilot is counterbalanced
    experiment_MPLIncentives = {
        timeline: [blockIs_mpl_incentives, treatisIneq, timelineInstructionsMPLIncentives, timeline_ineq_MPLIncentives, treatisMirr, changeTreatment, timelineInstructionsMPLIncentives, timeline_mirr_MPLIncentives]
    }
}
else if (treatment == "easy") {
    experiment_MPLIncentives = {
        timeline: [blockIs_mpl_incentives, treatisMirr, timelineInstructionsMPLIncentives, timeline_mirr_MPLIncentives, treatisIneq, changeTreatment, timelineInstructionsMPLIncentives, timeline_ineq_MPLIncentives]
    }
}


const timelineTESTLotteryMixedMpl = {
    timeline: [fdsBlockToSpanMplAndSubBlockIncrementLottery, mpl_trial, { conditional_function: function () { return fdsTrialNum == totalFdsSpanMplTrials + 1; }, timeline: [fdsTrialNumResetAndSubBlockReset] }],
    timeline_variables: mpl_html_array_lottery,
}
const timeline_spanMPL_mirror = {
    timeline: [fdsBlockToSpanMplAndSubBlockIncrementMirror, setup_fds, letter_proc, mpl_trial, fds_response_screen, { conditional_function: function () { return fdsTrialNum == totalFdsSpanMplTrials + 1; }, timeline: [fdsTrialNumResetAndSubBlockReset] }],
    timeline_variables: mpl_html_array_mirror,
};

if (Math.random() < 0.5) {
    experimentBlocks_span_MPL = [timeline_spanMPL_lottery, timeline_spanMPL_mirror /*, timeline_spanMPL_easy_lottery, timeline_spanMPL_easy_mirror*/];
    block_order_indicator_span_MPL = "lottery_first";
    timeline_spanMPL_lottery.timeline.splice(1, 0, timelineFirstInstructionsLottery);
    timeline_spanMPL_mirror.timeline.splice(1, 0, timelineSecondInstructionsMirror);
    console.log(block_order_indicator_span_MPL)
} else {
    experimentBlocks_span_MPL = [timeline_spanMPL_mirror, timeline_spanMPL_lottery /*, timeline_spanMPL_easy_mirror, timeline_spanMPL_easy_lottery*/];
    block_order_indicator_span_MPL = "mirror_first";
    timeline_spanMPL_mirror.timeline.splice(1, 0, timelineFirstInstructionsMirror);
    timeline_spanMPL_lottery.timeline.splice(1, 0, timelineSecondInstructionsLottery);
    console.log(block_order_indicator_span_MPL);
}

const experiment_span_MPL = {
    timeline: experimentBlocks_span_MPL,
}
const timelineSlidersMotivation = {
    timeline: [instructionsSlidersMotivation, trialSlidersMotivation]
}

const uncertaintyTrials = [cognitiveUncertaintyMirror, cognitiveUncertaintyLottery];
if (Math.random() < 0.5) {
    uncertaintyTrials.reverse();
}
const timelineUncertainty = {
    timeline: uncertaintyTrials
};

let uncertaintyTrialsIncentives = [cognitiveUncertaintyMirrorIncentives_mirr, cognitiveUncertaintyMirrorIncentives_ineq];
if (Math.random() < 0.5) {
    uncertaintyTrialsIncentives.reverse();
}
const timelineUncertaintyIncentives = {
    timeline: uncertaintyTrialsIncentives
};

const arithmeticTestTimeline = {
    timeline: [instructionArTest, arTestTrial]
};




const prolific_redirect = {
    type: "html-keyboard-response",
    stimulus: function () {
        return `<p>${language.redirectProlific}</p>`;
    },
    choices: jsPsych.NO_KEYS,
    trial_duration: 3000,
    data: { task: 'prolific_redirect' },
    on_finish: function () {
        // End the JATOS study first, then redirect
        // jatos.endStudy(jsPsych.data.get().json(), true);
        jatos.endStudyAndRedirect("https://www.prolific.com/participants", jsPsych.data.get().json());
    }
};

/* main timeline */

jsPsych.data.addProperties({ subject: subjectId });

timeline.push( /* {type: "fullscreen", fullscreen_mode: true},*/  consentForm, demographics,/* instructionsBeforeCalibration, fds_calibration, calibrationDebrief,
    instructionsSpanSpan, fds_span_span_proc, spanSpanDebrief, fdsTrialNumReset, experiment_span_MPL, timelineUncertainty, timelineSlidersMotivation,
    timelineAnglesMotivation, arithmeticTimeline,  incentives_span_mpl, */ experiment_MPLIncentives, timelineUncertaintyIncentives, arithmeticTestTimeline, incentives_mplIncentives);


/*************** EXPERIMENT START AND DATA UPDATE ***************/

jatos.onLoad(() => {
    jsPsych.init({
        timeline: timeline,
        on_finish: function () {
            submitToJatos(jsPsych.data.get().json());
            // jatos.endStudy(jsPsych.data.get().json());
            // jsPsych.data.get().localSave("csv", `span_Subject_${subjectId}_${level}back_output.csv`);
        }
    });
});