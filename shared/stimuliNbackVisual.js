

function makeGridWithDot(index) {
    let html = '<div class="grid">';
    for (let i = 0; i < 9; i++) {
      html += '<div class="cell">';
      if (i === index) {
        html += '<div class="dot"></div>';
      }
      html += '</div>';
    }
    html += '</div>';
    return html;
  }

  function makeGridCache(index) {
    let html = '<div class="grid">';
    for (let i = 0; i < 9; i++) {
      html += '<div class="cell">'; {
        html += '<div class="dot"></div>';}
      html += '</div>';
    }
    html += '</div>';
    return html;
  }

  // Make 9 different stimuli
  const st0 = makeGridWithDot(0);
  const st1 = makeGridWithDot(1);
  const st2 = makeGridWithDot(2);
  const st3 = makeGridWithDot(3);
  const st4 = makeGridWithDot(4);
  const st5 = makeGridWithDot(5);
  const st6 = makeGridWithDot(6);
  const st7 = makeGridWithDot(7);
  const st8 = makeGridWithDot(8);
  const stCache = makeGridCache(0); // cache stimulus, no dot


let stimuliList_nbackVisual_1 = [];
let stimuliList_nbackVisual_2 = [];
let stimuliList_nbackVisual_3 = [];
let stimuliList_nbackVisual_4 = [];
let stimuliList_nbackVisual_5 = [];
let stimuliList_nbackVisual_6 = [];
let stimuliList_nbackVisual_7 = [];
let stimuliList_nbackVisual_8 = [];
let stimuliList_nbackVisual_9 = [];
let stimuliList_nbackVisual_10 = [];
let stimuliList_nbackVisual_11 = [];
let stimuliList_nbackVisual_12 = [];

let stimuliList_nbackVisual_practice = [];
// let stimuliList_nbackVisual_practice = [st5, st5, st5, st5, st5, st4, st4, st0, st4, st8, st5, st4, st5, st4, st4, st1, st1, st2, st6, st2, st6, st2, st2, st5, st2, st6, st5, st6, st1, st5, st5, st4, st5, st8, st8, st5, st7, st7, st5, st5] // 12 2-backs, 12 1-backs and 12 3-backs
let stimuliList_nbackVisualOverallPractice= [st2, st7, st2, st7, st2, st2, st1, st2, st5, st5] // 4 2-backs, 2 1-backs and 2 3-backs

let stimuli_nbackVisual_practice =[];
let stimuli_nbackVisual_overall_training = [];
let stimuli_nback_1 = [];
let stimuli_nback_2 = [];
let stimuli_nback_3 = [];
let stimuli_nback_4 = [];
let stimuli_nback_5 = [];
let stimuli_nback_6 = [];
let stimuli_nback_7 = [];
let stimuli_nback_8 = [];
let stimuli_nback_9 = [];
let stimuli_nback_10 = [];
let stimuli_nback_11 = [];
let stimuli_nback_12 = [];

// every sequence has 3 2-backs, 3 1-back and 3 3backs. 
let possibleStimuliList2_nbackVisual = 
[
    [st7, st7, st8, st7, st8, st8, st0, st5, st0, st0],
    [st5, st5, st3, st5, st3, st5, st5, st7, st7, st5],
    [st1, st1, st0, st1, st0, st0, st8, st3, st8, st8],
    [st5, st5, st1, st5, st8, st8, st0, st8, st0, st0],
    [st8, st8, st8, st6, st6, st8, st6, st3, st8, st3],
    [st6, st6, st8, st6, st8, st8, st8, st0, st6, st8],
    [st3, st3, st6, st3, st3, st2, st2, st0, st2, st0],
    [st8, st8, st8, st0, st0, st8, st0, st6, st8, st6],
    [st5, st5, st6, st5, st6, st6, st3, st3, st5, st3],
    [st6, st6, st5, st6, st8, st8, st7, st8, st7, st7],
    [st6, st6, st3, st6, st3, st3, st0, st4, st0, st0],
    [st7, st7, st7, st5, st6, st5, st5, st6, st5, st3],
    [st5, st5, st7, st5, st7, st7, st7, st6, st5, st7],
    [st6, st6, st4, st6, st4, st4, st8, st5, st8, st8],
    [st4, st4, st6, st4, st6, st3, st3, st2, st3, st3],
    [st8, st8, st5, st8, st6, st6, st3, st6, st3, st3],
    [st2, st2, st1, st2, st2, st2, st4, st2, st5, st7],
    [st1, st1, st7, st1, st1, st5, st5, st3, st5, st3],
    [st1, st1, st3, st1, st8, st7, st1, st7, st7, st7],
    [st1, st1, st1, st4, st8, st4, st4, st8, st4, st1],
    [st1, st1, st6, st1, st0, st0, st5, st0, st5, st5],
    [st1, st1, st1, st6, st8, st6, st6, st8, st6, st7],
    [st6, st6, st7, st6, st5, st5, st7, st5, st7, st7],
    [st7, st7, st7, st0, st3, st0, st0, st3, st0, st6],
    [st8, st8, st6, st8, st3, st2, st8, st2, st2, st2],
    [st4, st4, st4, st6, st8, st6, st6, st8, st6, st5],
    [st3, st3, st3, st6, st8, st6, st6, st8, st6, st4],
    [st4, st4, st6, st4, st8, st8, st1, st8, st1, st1],
    [st7, st7, st7, st2, st5, st2, st2, st5, st2, st6],
    [st0, st0, st6, st0, st0, st0, st3, st0, st4, st2],
    [st1, st1, st4, st1, st1, st2, st1, st2, st6, st6],
    [st2, st2, st3, st2, st4, st4, st1, st4, st1, st1],
    [st0, st0, st3, st0, st3, st3, st1, st5, st1, st1],
    [st5, st5, st1, st5, st4, st2, st5, st2, st2, st2],
    [st0, st0, st4, st0, st4, st5, st4, st4, st5, st5],
    [st3, st3, st2, st3, st2, st2, st5, st4, st5, st5],
    [st4, st4, st8, st4, st7, st7, st8, st7, st8, st8],
    [st5, st5, st5, st4, st2, st4, st4, st2, st4, st3],
    [st7, st7, st7, st2, st7, st3, st5, st5, st3, st5],
    [st8, st8, st7, st8, st7, st7, st1, st4, st1, st1],
    [st5, st5, st0, st5, st8, st8, st4, st8, st4, st4],
    [st8, st8, st6, st8, st2, st2, st5, st2, st5, st5],
    [st2, st2, st4, st2, st8, st5, st2, st5, st5, st5],
    [st8, st8, st3, st8, st3, st2, st2, st1, st2, st2],
    [st2, st2, st6, st2, st6, st6, st4, st7, st4, st4],
    [st7, st7, st3, st7, st2, st2, st6, st2, st6, st6],
    [st2, st2, st5, st2, st5, st5, st4, st8, st4, st4],
    [st5, st5, st8, st5, st6, st6, st7, st6, st7, st7],
    [st5, st5, st3, st5, st7, st7, st8, st7, st8, st8],
    [st8, st8, st8, st6, st3, st6, st6, st3, st6, st8],
    [st1, st1, st8, st1, st8, st8, st3, st4, st3, st3],
    [st8, st8, st6, st8, st6, st6, st1, st8, st1, st1],
    [st5, st5, st0, st5, st0, st6, st0, st0, st6, st6],
    [st7, st7, st4, st7, st4, st4, st8, st8, st2, st8],
    [st3, st3, st1, st3, st3, st2, st2, st1, st2, st1],
    [st5, st5, st1, st5, st1, st1, st8, st3, st8, st8],
    [st3, st3, st0, st3, st3, st3, st0, st4, st3, st4],
    [st8, st8, st0, st8, st0, st0, st6, st6, st3, st6],
    [st4, st4, st1, st4, st0, st0, st7, st0, st7, st7],
    [st4, st4, st4, st7, st8, st7, st7, st8, st7, st4],
    [st7, st7, st2, st7, st2, st2, st0, st3, st0, st0],
    [st7, st7, st6, st7, st5, st5, st2, st5, st2, st2],
    [st4, st4, st2, st4, st4, st7, st4, st7, st1, st1],
    [st7, st7, st5, st7, st5, st5, st3, st0, st3, st3],
    [st5, st5, st5, st3, st0, st3, st3, st0, st3, st4],
    [st4, st4, st0, st4, st0, st6, st6, st8, st6, st6],
    [st7, st7, st7, st6, st3, st6, st6, st3, st6, st2],
    [st5, st5, st4, st5, st0, st0, st7, st0, st7, st7],
    [st7, st7, st2, st7, st2, st2, st8, st2, st5, st5],
    [st0, st0, st2, st0, st6, st6, st3, st6, st3, st3],
    [st6, st6, st6, st8, st6, st5, st1, st5, st5, st1],
    [st1, st1, st7, st1, st7, st6, st1, st7, st7, st7],
    [st4, st4, st2, st4, st4, st6, st6, st3, st6, st3],
    [st1, st1, st5, st2, st5, st2, st2, st8, st2, st2],
    [st2, st2, st0, st2, st2, st2, st0, st2, st7, st5],
    [st2, st2, st5, st2, st7, st7, st0, st7, st0, st0],
    [st5, st5, st0, st5, st0, st0, st3, st7, st3, st3],
    [st1, st1, st1, st1, st4, st7, st1, st3, st7, st3],
    [st2, st2, st2, st1, st2, st0, st0, st2, st0, st8],
    [st8, st8, st7, st8, st7, st7, st1, st7, st8, st8],
    [st7, st7, st4, st7, st7, st6, st0, st6, st0, st0],
    [st7, st7, st7, st5, st7, st2, st2, st7, st2, st6],
    [st5, st5, st6, st5, st4, st4, st7, st4, st7, st7],
    [st7, st7, st6, st7, st6, st6, st1, st2, st1, st1],
    [st6, st6, st6, st3, st6, st1, st1, st6, st1, st8],
    [st2, st2, st6, st2, st3, st3, st8, st3, st8, st8],
    [st6, st6, st2, st6, st2, st2, st5, st2, st8, st8],
    [st5, st5, st0, st5, st0, st0, st6, st0, st4, st4],
    [st5, st5, st3, st5, st5, st2, st2, st8, st2, st8],
    [st5, st5, st4, st5, st4, st4, st4, st3, st2, st4],
    [st4, st4, st1, st4, st8, st3, st4, st3, st3, st3],
    [st4, st4, st4, st0, st4, st5, st1, st4, st1, st1],
    [st8, st8, st3, st8, st3, st3, st7, st3, st4, st4],
    [st8, st8, st4, st8, st8, st0, st2, st0, st2, st2],
    [st8, st8, st6, st8, st6, st6, st2, st5, st2, st2],
    [st5, st5, st2, st5, st2, st5, st5, st2, st2, st0],
    [st7, st7, st7, st3, st3, st7, st3, st2, st7, st2],
    [st5, st5, st3, st5, st1, st1, st6, st1, st6, st6],
    [st4, st4, st6, st4, st6, st6, st2, st7, st2, st2],
    [st5, st5, st3, st5, st2, st2, st4, st2, st4, st4]
]


function assignRandomStimuliVisual() {
    // Create a copy of the possible stimuli list to avoid modifying the original
    let availableStimuli = [...possibleStimuliList2_nbackVisual];
    // Randomly select 12 unique sequences from the available stimuli
    for (let i = 1; i <= 12; i++) {
        // Get a random index from remaining available stimuli
        let randomIndex = Math.floor(Math.random() * availableStimuli.length);
        // Assign the selected stimulus to the corresponding variable
        let selectedStimulus = availableStimuli[randomIndex];
        // Remove the selected stimulus from available options
        availableStimuli.splice(randomIndex, 1);
        // Assign to the appropriate global variable
        switch(i) {
            case 1: stimuliList_nbackVisual_1 = selectedStimulus; break;
            case 2: stimuliList_nbackVisual_2 = selectedStimulus; break;
            case 3: stimuliList_nbackVisual_3 = selectedStimulus; break;
            case 4: stimuliList_nbackVisual_4 = selectedStimulus; break;
            case 5: stimuliList_nbackVisual_5 = selectedStimulus; break;
            case 6: stimuliList_nbackVisual_6 = selectedStimulus; break;
            case 7: stimuliList_nbackVisual_7 = selectedStimulus; break;
            case 8: stimuliList_nbackVisual_8 = selectedStimulus; break;
            case 9: stimuliList_nbackVisual_9 = selectedStimulus; break;
            case 10: stimuliList_nbackVisual_10 = selectedStimulus; break;
            case 11: stimuliList_nbackVisual_11 = selectedStimulus; break;
            case 12: stimuliList_nbackVisual_12 = selectedStimulus; break;
        }
    }

    let availableIndices = Array.from({length: possibleStimuliList_visualNback_practice.length}, (_, i) => i);

    // Shuffle the indices array
    for (let i = availableIndices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [availableIndices[i], availableIndices[j]] = [availableIndices[j], availableIndices[i]];
    }
    for (let j=0; j<possibleStimuliList_visualNback_practice.length; j++){
      stimuliList_nbackVisual_practice[j] = possibleStimuliList_visualNback_practice[availableIndices[j]];
    }
    console.log(stimuliList_nbackVisual_practice, "is the practice stimuli list")
}

let possibleStimuliList_visualNback_practice = [ // 5 2-backs, 2 3-backs, 2 1-backs, one triple maximum, no four consecutives letters
  [st0, st3, st0, st3, st5, st3, st1, st5, st1, st0, st0, st2, st2, st1, st2],
  [st2, st7, st2, st7, st4, st3, st4, st3, st3, st8, st3, st1, st1, st6, st7],
  [st8, st0, st8, st0, st4, st5, st0, st5, st8, st8, st7, st8, st7, st4, st4],
  [st1, st7, st1, st7, st1, st7, st6, st4, st4, st6, st6, st3, st6, st5, st8],
  [st7, st7, st6, st0, st6, st0, st6, st4, st1, st7, st7, st1, st7, st6, st7],
  [st5, st1, st5, st1, st6, st2, st6, st7, st1, st1, st7, st7, st8, st7, st8],
  [st2, st5, st5, st2, st4, st1, st1, st5, st1, st5, st4, st5, st4, st5, st2],
  [st6, st6, st5, st7, st5, st7, st7, st5, st1, st0, st1, st6, st7, st6, st7],
  [st7, st7, st7, st6, st4, st6, st5, st3, st6, st3, st6, st1, st3, st1, st5],
  [st0, st7, st7, st0, st2, st5, st2, st7, st2, st7, st1, st1, st6, st1, st6],
  [st3, st4, st3, st4, st5, st5, st6, st5, st3, st4, st3, st1, st3, st3, st2],
  [st7, st7, st1, st2, st6, st2, st3, st2, st3, st2, st2, st3, st8, st1, st8],
  [st4, st8, st8, st5, st2, st6, st2, st7, st2, st4, st2, st4, st4, st3, st4],
  [st0, st0, st3, st2, st3, st2, st0, st3, st2, st6, st2, st6, st2, st1, st1],
  [st2, st8, st2, st6, st8, st7, st6, st6, st6, st2, st8, st4, st8, st4, st8],
  [st2, st7, st2, st7, st2, st5, st1, st2, st0, st8, st8, st8, st3, st8, st4],
  [st2, st2, st4, st2, st4, st1, st3, st7, st0, st7, st0, st0, st6, st5, st6],
  [st5, st7, st2, st2, st7, st7, st4, st2, st7, st2, st7, st2, st0, st2, st0],
  [st3, st0, st5, st0, st5, st1, st0, st5, st5, st5, st8, st6, st8, st1, st8],
  [st3, st4, st4, st3, st3, st8, st6, st2, st8, st2, st3, st2, st3, st2, st3],
  [st0, st0, st4, st3, st4, st4, st1, st5, st8, st1, st8, st5, st8, st5, st8],
  [st0, st4, st0, st4, st0, st7, st5, st7, st4, st4, st0, st3, st3, st0, st3],
  [st7, st0, st7, st7, st7, st8, st1, st8, st3, st4, st2, st4, st2, st1, st4],
  [st6, st0, st6, st0, st6, st5, st4, st5, st6, st4, st6, st6, st3, st3, st0],
  [st0, st5, st0, st7, st0, st6, st2, st6, st6, st0, st0, st8, st0, st5, st0],
  [st1, st1, st7, st8, st7, st0, st8, st0, st0, st5, st6, st3, st6, st3, st6],
  [st3, st6, st3, st6, st1, st3, st3, st1, st1, st7, st0, st7, st0, st6, st0],
  [st0, st0, st7, st0, st4, st0, st4, st2, st0, st2, st3, st5, st3, st2, st2],
  [st0, st8, st3, st3, st8, st8, st5, st8, st3, st1, st3, st1, st3, st5, st3],
  [st8, st8, st0, st6, st0, st6, st3, st2, st3, st2, st2, st3, st1, st5, st1],
  [st3, st3, st0, st2, st0, st0, st7, st0, st2, st8, st2, st8, st5, st4, st5],
  [st3, st2, st2, st6, st4, st6, st4, st6, st4, st4, st6, st3, st8, st4, st8],
  [st3, st4, st8, st4, st8, st3, st2, st3, st2, st5, st3, st2, st2, st2, st3],
  [st7, st7, st5, st7, st6, st5, st1, st5, st1, st4, st1, st4, st8, st5, st5],
  [st5, st5, st4, st5, st2, st3, st3, st8, st3, st8, st3, st8, st2, st4, st7],
  [st6, st7, st1, st7, st1, st4, st1, st1, st6, st3, st8, st8, st7, st8, st7],
  [st6, st6, st0, st7, st7, st0, st7, st2, st6, st2, st6, st2, st6, st0, st3],
  [st8, st7, st8, st7, st3, st7, st3, st0, st0, st3, st7, st1, st7, st7, st8],
  [st0, st4, st8, st4, st8, st8, st4, st4, st5, st0, st3, st7, st3, st7, st3],
  [st1, st7, st1, st0, st1, st8, st0, st1, st1, st1, st6, st8, st6, st7, st6],
  [st2, st3, st3, st2, st8, st1, st8, st3, st8, st3, st8, st5, st5, st2, st5]
]
