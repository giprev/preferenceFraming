

//define the stimuli array
// const stimuli_flanker = [
//   { stim: al, stimsign: "<<<<<", resp1: ar, resp1sign: ">>>>>", resp2: al, resp2sign: "<<<<<", correct_response: 1, condition: 1 },
//   { stim: al, stimsign: "<<<<<", resp1: al, resp1sign: "<<<<<", resp2: ar, resp2sign: ">>>>>", correct_response: 0, condition: 1 },
//   { stim: ar, stimsign: ">>>>>", resp1: ar, resp1sign: ">>>>>", resp2: al, resp2sign: "<<<<<", correct_response: 0, condition: 1 },
//   { stim: ar, stimsign: ">>>>>", resp1: al, resp1sign: "<<<<<", resp2: ar, resp2sign: ">>>>>", correct_response: 1, condition: 1 },
//   { stim: al, stimsign: "<<<<<", resp1: ml_fr, resp1sign: ">><>>", resp2: mr_fl, resp2sign: "<<><<", correct_response: 0, csondition: 2 },
//   { stim: al, stimsign: "<<<<<", resp1: mr_fl, resp1sign: "<<><<", resp2: ml_fr, resp2sign: ">><>>", correct_response: 1, condition: 2 },
//   { stim: ar, stimsign: ">>>>>", resp1: ml_fr, resp1sign: ">><>>", resp2: mr_fl, resp2sign: "<<><<", correct_response: 1, condition: 2 },
//   { stim: ar, stimsign: ">>>>>", resp1: mr_fl, resp1sign: "<<><<", resp2: ml_fr, resp2sign: ">><>>", correct_response: 0, condition: 2 },
//   { stim: mr_fl, stimsign: "<<><<", resp1: al, resp1sign: "<<<<<", resp2: ar, resp2sign: ">>>>>", correct_response: 0, condition: 3 },
//   { stim: mr_fl, stimsign: "<<><<", resp1: ar, resp1sign: ">>>>>", resp2: al, resp2sign: "<<<<<", correct_response: 1, condition: 3 },
//   { stim: ml_fr, stimsign: ">><>>", resp1: al, resp1sign: "<<<<<", resp2: ar, resp2sign: ">>>>>", correct_response: 1, condition: 3 },
//   { stim: ml_fr, stimsign: ">><>>", resp1: ar, resp1sign: ">>>>>", resp2: al, resp2sign: "<<<<<", correct_response: 0, condition: 3 },
//   { stim: mr_fl, stimsign: "<<><<", resp1: mr_fl, resp1sign: "<<><<", resp2: ml_fr, resp2sign: ">><>>", correct_response: 1, condition: 4 },
//   { stim: mr_fl, stimsign: "<<><<", resp1: ml_fr, resp1sign: ">><>>", resp2: mr_fl, resp2sign: "<<><<", correct_response: 0, condition: 4 },
//   { stim: ml_fr, stimsign: ">><>>", resp1: mr_fl, resp1sign: "<<><<", resp2: ml_fr, resp2sign: ">><>>", correct_response: 0, condition: 4 },
//   { stim: ml_fr, stimsign: ">><>>", resp1: ml_fr, resp1sign: ">><>>", resp2: mr_fl, resp2sign: "<<><<", correct_response: 1, condition: 4 }
// ];



const ar = "../static/images/ar.PNG";
const al = "../static/images/al.PNG";
const mr_fl = "../static/images/mr_fl.PNG";
const ml_fr = "../static/images/ml_fr.PNG";

// Create object that has all the possible stimuli for the task (stimuli_flanker)
var stimuli_flanker = [
	{stim: al, stimsign: "<<<<<", resp1: ar, resp1sign: ">>>>>", resp2: al, resp2sign: "<<<<<", correct_response: 1, condition: 1, item: 0},
	{stim: al, stimsign: "<<<<<", resp1: al, resp1sign: "<<<<<", resp2: ar, resp2sign: ">>>>>", correct_response: 0, condition: 1, item: 1},
	{stim: ar, stimsign: ">>>>>", resp1: ar, resp1sign: ">>>>>", resp2: al, resp2sign: "<<<<<", correct_response: 0, condition: 1, item: 2},
	{stim: ar, stimsign: ">>>>>", resp1: al, resp1sign: "<<<<<", resp2: ar, resp2sign: ">>>>>", correct_response: 1, condition: 1, item: 3},
	{stim: al, stimsign: "<<<<<", resp1: ml_fr, resp1sign: ">><>>", resp2: mr_fl, resp2sign: "<<><<", correct_response: 0, condition: 2, item: 4},
	{stim: al, stimsign: "<<<<<", resp1: mr_fl, resp1sign: "<<><<", resp2: ml_fr, resp2sign: ">><>>", correct_response: 1, condition: 2, item: 5},
	{stim: ar, stimsign: ">>>>>", resp1: ml_fr, resp1sign: ">><>>", resp2: mr_fl, resp2sign: "<<><<", correct_response: 1, condition: 2, item: 6},
	{stim: ar, stimsign: ">>>>>", resp1: mr_fl, resp1sign: "<<><<", resp2: ml_fr, resp2sign: ">><>>", correct_response: 0, condition: 2, item: 7},
	{stim: mr_fl, stimsign: "<<><<", resp1: al, resp1sign: "<<<<<", resp2: ar, resp2sign: ">>>>>", correct_response: 0, condition: 3, item: 8},
	{stim: mr_fl, stimsign: "<<><<", resp1: ar, resp1sign: ">>>>>", resp2: al, resp2sign: "<<<<<", correct_response: 1, condition: 3, item: 9},
	{stim: ml_fr, stimsign: ">><>>", resp1: al, resp1sign: "<<<<<", resp2: ar, resp2sign: ">>>>>", correct_response: 1, condition: 3, item: 10},
	{stim: ml_fr, stimsign: ">><>>", resp1: ar, resp1sign: ">>>>>", resp2: al, resp2sign: "<<<<<", correct_response: 0, condition: 3, item: 11},
	{stim: mr_fl, stimsign: "<<><<", resp1: mr_fl, resp1sign: "<<><<", resp2: ml_fr, resp2sign: ">><>>", correct_response: 1, condition: 4, item: 12},
	{stim: mr_fl, stimsign: "<<><<", resp1: ml_fr, resp1sign: ">><>>", resp2: mr_fl, resp2sign: "<<><<", correct_response: 0, condition: 4, item: 13},
	{stim: ml_fr, stimsign: ">><>>", resp1: mr_fl, resp1sign: "<<><<", resp2: ml_fr, resp2sign: ">><>>", correct_response: 0, condition: 4, item: 14},
	{stim: ml_fr, stimsign: ">><>>", resp1: ml_fr, resp1sign: ">><>>", resp2: mr_fl, resp2sign: "<<><<", correct_response: 1, condition: 4, item: 15}
];

function generateFlankerVariables(totalLength = 100) {
  const shuffledBase = [...stimuli_flanker].sort(() => Math.random() - 0.5);

  let repeated = [];
  while (repeated.length < totalLength) {
    repeated.push(...shuffledBase);
  }
  repeated.length = totalLength;

  return repeated.sort(() => Math.random() - 0.5);
}

const practice_array = generateFlankerVariables(100)
const main_array_easy = generateFlankerVariables(500)
const main_array_hard = generateFlankerVariables(500)

// function generateFlankerVariables(totalLength = 100) {
//   // Step 1: Shuffle the original stimuli once
//   const shuffledBase = [...stimuli_flanker].sort(() => Math.random() - 0.5);

//   // Step 2: Repeat until total trials >= 100
//   let repeated = [];
//   while (repeated.length < totalLength) {
//     repeated.push(...shuffledBase);
//   }

//   // Step 3: Trim to exactly 100
//   repeated.length = totalLength;

//   // Step 4: Final shuffle
//   return repeated.sort(() => Math.random() - 0.5);
// }

// const flanker_trials_100 = generateFlankerVariables(100);

// // Log to check length and preview
// console.log("Total trials:", flanker_trials_100.length);
// console.log("Sample trial:", flanker_trials_100[0]);