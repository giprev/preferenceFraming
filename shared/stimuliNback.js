// function setArrays (){
//     nbackStimuli = {};
//     nbackStimuli.stimuliFirstBlock = [];
//     nbackStimuli.stimuliSecondBlock = [];
//     nbackStimuli.stimuliPractice = [];
//     nbackStimuli.correctResponse;
//     nbackStimuli.target;
//   }
function setArrays (){
    nbackStimuli = {};
    nbackStimuli.stimuliEasy_flanker = [];
    nbackStimuli.stimuliHard_flanker = [];
    nbackStimuli.stimuliPracticeEasy_flanker = [];
    nbackStimuli.stimuliPracticeHard_flanker = [];
    nbackStimuli.stimuliEasy_span = [];
    nbackStimuli.stimuliHard_span = [];
    nbackStimuli.stimuliPracticeEasy_span = [];
    nbackStimuli.stimuliPracticeHard_span = [];
    nbackStimuli.stimuliEasy_nback = [];
    nbackStimuli.stimuliHard_nback = [];
    nbackStimuli.stimuliPracticeEasy_nback = [];
    nbackStimuli.stimuliPracticeHard_nback = [];
    nbackStimuli.stimuliHardOverallTraining = [];
    nbackStimuli.stimuliEasyOverallTraining = [];
    nbackStimuli.correctResponse;
    nbackStimuli.target;
    nbackStimuli.practiceListEasy_nback = [];
    nbackStimuli.practiceListHard_nback = [];
  }

  
  function defineNullBack() {
    nbackStimuli.practiceList = ["B", "P", "X", "K", "H", "M", "Q", "X", "N","T"];
    nbackStimuli.stimuliListFirstBlock = ["R", "B", "Q", "N", "Q", "K", "X", "X", "N", "R", "B", "X", "M", "H", "X", "T", "R", "X", "P", "P", "M", "M", "Q", "K", "T", "P", "X", "H", "N", "T", "X", "H", "Q", "N", "R", "K", "M", "K", "B", "X", "K", "T", "B", "X", "R", "P", "N", "H", "B", "X"];
    nbackStimuli.stimuliListSecondBlock = ["H", "Q", "X", "R", "M", "R", "Q", "H", "Q", "X", "H", "T", "X", "Q", "B", "N", "K", "P", "K", "R", "B", "X", "R", "X", "X", "N", "K", "X", "P", "N", "P", "X", "T", "P", "T", "B", "H", "M", "M", "Q", "N", "M", "K", "X", "H", "M", "T", "X", "B", "P"]
  }
  
  function defineEasyBack() {
    nbackStimuli.practiceListEasy_flanker = ['A', 'U', 'A', 'M', 'M', 'U', 'U', 'U', 'U', 'E', 'E', 'O', 'O', 'U', 'U', 'U', 'U', 'B', 'B', 'Y']; // 10 1-back, 5 2-backs
    // nbackStimuli.stimuliListEasy_flanker = ['C', 'C', 'C', 'C', 'K', 'Y', 'P', 'I', 'O', 'O', 'C', 'O', 'C', 'B', 'B', 'B', 'O', 'O', 'O', 'E', 'B', 'B', 'B', 'B', 'Y', 'B', 'B', 'Y', 'B', 'Y', 'B', 'C', 'C', 'B', 'U', 'U', 'M', 'C', 'O', 'U', 'I', 'U', 'O', 'O', 'O', 'I', 'O', 'A', 'I', 'A', 'I', 'M', 'U', 'U', 'U', 'Y', 'C', 'K', 'C', 'M', 'O', 'O', 'O'];
    nbackStimuli.practiceListEasy_span =  ['B', 'B', 'B', 'Y', 'Y', 'Y', 'U', 'U', 'B', 'B', 'C', 'E', 'G', 'E', 'E', 'C', 'C', 'C', 'C', 'Y'];
    // nbackStimuli.stimuliListEasy_span = ['U', 'B', 'B', 'B', 'B', 'I', 'I', 'M', 'K', 'U', 'Y', 'U', 'K', 'B', 'O', 'P', 'P', 'P', 'P', 'A', 'P', 'E', 'E', 'B', 'B', 'P', 'P', 'P', 'M', 'U', 'M', 'B', 'B', 'B', 'B', 'O', 'E', 'Y', 'E', 'E', 'M', 'E', 'A', 'Y', 'G', 'Y', 'B', 'G', 'I', 'I', 'I', 'I', 'U', 'A', 'A', 'A', 'U', 'A', 'U', 'Y', 'K', 'Y', 'K'];
    // nbackStimuli.practiceListEasy_nback = ['C', 'C', 'A', 'C', 'A', 'A', 'M', 'M', 'G', 'G', 'K', 'G', 'Y', 'C', 'C', 'K', 'K', 'M', 'M', 'O', 'M', 'M', 'P', 'P', 'K', 'K', 'I', 'P', 'I', 'I', 'Y', 'I', 'G', 'P', 'P', 'A', 'A', 'B', 'A', 'A']; // 14 1-backs, 7 2-backs 
    // nbackStimuli.stimuliListEasy_nback = ['C', 'C', 'G', 'G', 'G', 'I', 'A', 'E', 'A', 'E', 'A', 'O', 'O', 'P', 'P', 'E', 'P', 'O', 'G', 'O', 'G', 'C', 'B', 'A', 'C', 'C', 'I', 'I', 'I', 'G', 'Y', 'Y', 'Y', 'Y', 'C', 'Y', 'U', 'Y', 'U', 'K', 'I', 'K', 'U', 'Y', 'Y', 'Y', 'G', 'U', 'U', 'U', 'U', 'M', 'M', 'A', 'A', 'A', 'M', 'A', 'O', 'A', 'G', 'G', 'U'] // 20 1-back, 20 2-backs
    nbackStimuli.stimuliListEasyOverallTraining =['B', 'E', 'E', 'C', 'C', 'I', 'I', 'C', 'C', 'K', 'C', 'K', 'K', 'U', 'U', 'Y', 'U', 'Y', 'U', 'U'] // 7 1-backs, 5 2-backs

  }
  
  function defineHard2Back() {
    nbackStimuli.practiceListHard_flanker = ['O', 'O', 'O', 'A', 'O', 'A', 'B', 'Y', 'B', 'Y', 'B', 'B', 'I', 'K', 'I', 'K', 'K', 'Y', 'K', 'Y']; // 10 2-backs, 4 1-backs and 4 3-backs
    // nbackStimuli.stimuliListHard_flanker = ['G', 'C', 'G', 'C', 'P', 'C', 'P', 'G', 'C', 'E', 'M', 'C', 'M', 'E', 'M', 'E', 'O', 'U', 'O', 'U', 'O', 'O', 'U', 'U', 'U', 'K', 'Y', 'P', 'O', 'P', 'P', 'O', 'A', 'I', 'I', 'Y', 'B', 'B', 'K', 'B', 'K', 'A', 'K', 'K', 'K', 'I', 'U', 'E', 'U', 'C', 'C', 'U', 'P', 'P', 'B', 'P', 'C', 'P', 'I', 'P']; // 20 2 backs, 10 1 backs and 10 3-backs
    nbackStimuli.practiceListHard_span = ['C', 'C', 'M', 'C', 'M', 'C', 'C', 'C', 'P', 'C', 'U', 'A', 'E', 'K', 'E', 'K', 'E', 'K', 'E', 'E'];
    // nbackStimuli.stimuliListHard_span = ['U', 'U', 'Y', 'P', 'Y', 'P', 'Y', 'P', 'Y', 'I', 'B', 'I', 'I', 'I', 'C', 'K', 'K', 'I', 'Y', 'Y', 'G', 'A', 'G', 'G', 'G', 'Y', 'U', 'O', 'Y', 'K', 'O', 'K', 'K', 'Y', 'E', 'Y', 'E', 'Y', 'E', 'E', 'K', 'C', 'B', 'B', 'E', 'B', 'C', 'E', 'P', 'C', 'P', 'C', 'U', 'P', 'U', 'B', 'E', 'A', 'E', 'A', 'B', 'C', 'E'];
    // nbackStimuli.practiceListHard_nback = ['A', 'A', 'K', 'A', 'K', 'K', 'M', 'P', 'P', 'K', 'P', 'A', 'E', 'E', 'M', 'E', 'M', 'C', 'E', 'C', 'M', 'C', 'M', 'B', 'M', 'B', 'B', 'Y', 'P', 'Y', 'P', 'P', 'C', 'E', 'C', 'G', 'C', 'K', 'K', 'P']; // 14 2-backs, 7 3-backs and 7 1-backs
    // nbackStimuli.stimuliListHard_nback = ['M', 'P', 'M', 'M', 'P', 'U', 'C', 'C', 'U', 'K', 'P', 'G', 'P', 'G', 'K', 'U', 'G', 'O', 'O', 'G', 'G', 'G', 'O', 'C', 'M', 'C', 'B', 'B', 'C', 'B', 'I', 'O', 'I', 'O', 'I', 'O', 'I', 'O', 'O', 'A', 'I', 'O', 'I', 'A', 'I', 'A', 'E', 'A', 'E', 'B', 'U', 'B', 'U', 'I', 'I', 'U', 'U', 'U', 'B', 'A', 'I', 'E', 'U'];
    nbackStimuli.stimuliListHardOverallTraining = ['P', 'A', 'P', 'A', 'P', 'A', 'A', 'P', 'A', 'P', 'P', 'K', 'B', 'B', 'C', 'C', 'P', 'C', 'G', 'G'] // 7 2-backs, 5 1-backs, 5 3-backs
  }
  
  function defineHard3Back() {

    nbackStimuli.practiceListHard_flanker =  ['K', 'A', 'K', 'A', 'A', 'C', 'A', 'A', 'C', 'K', 'K', 'M', 'P', 'K', 'M', 'P', 'P', 'M', 'P', 'P']; // 10 3-backs, 4 2-backs and 4 4-backs
    // nbackStimuli.stimuliListHard_flanker = ['G', 'Y', 'G', 'G', 'P', 'I', 'U', 'G', 'I', 'A', 'I', 'M', 'C', 'A', 'A', 'A', 'A', 'B', 'A', 'C', 'P', 'E', 'A', 'B', 'E', 'C', 'B', 'E', 'C', 'B', 'C', 'E', 'B', 'M', 'G', 'C', 'M', 'Y', 'E', 'M', 'E', 'Y', 'E', 'M', 'Y', 'M', 'I', 'A', 'G', 'I', 'E', 'G', 'E', 'E', 'B', 'G', 'O', 'B', 'M', 'G', 'B', 'M', 'G']; // 20 3-backs, 10 2-backs and 10 4-backs
    nbackStimuli.practiceListHard_span = ['P', 'C', 'P', 'P', 'C', 'P', 'P', 'C', 'E', 'E', 'P', 'E', 'E', 'P', 'P', 'G', 'C', 'C', 'G', 'C'];
    // nbackStimuli.stimuliListHard_span = ['G', 'E', 'K', 'G', 'O', 'K', 'G', 'G', 'O', 'M', 'G', 'U', 'G', 'U', 'A', 'O', 'G', 'B', 'O', 'U', 'E', 'C', 'E', 'E', 'C', 'O', 'I', 'B', 'O', 'I', 'B', 'O', 'O', 'B', 'O', 'B', 'A', 'A', 'B', 'O', 'M', 'P', 'O', 'O', 'M', 'P', 'O', 'I', 'P', 'I', 'P', 'P', 'Y', 'Y', 'Y', 'O', 'P', 'U', 'O', 'P', 'O', 'Y', 'O'];
    // nbackStimuli.practiceListHard_nback = ['K', 'B', 'I', 'K', 'B', 'Y', 'U', 'B', 'Y', 'Y', 'B', 'Y', 'Y', 'U', 'Y', 'I', 'O', 'Y', 'O', 'O', 'E', 'O', 'Y', 'I', 'E', 'O', 'I', 'I', 'Y', 'I', 'I', 'A', 'Y', 'E', 'E', 'G', 'I', 'A', 'I', 'A'];// 14 3-backs, 7 2-backs and 7 3-backs
    // nbackStimuli.stimuliListHard_nback = ['K', 'P', 'G', 'E', 'K', 'G', 'E', 'O', 'C', 'G', 'O', 'O', 'P', 'O', 'A', 'C', 'C', 'A', 'Y', 'Y', 'A', 'Y', 'Y', 'B', 'A', 'P', 'I', 'B', 'E', 'O', 'B', 'Y', 'M', 'A', 'Y', 'M', 'M', 'Y', 'M', 'G', 'P', 'G', 'P', 'P', 'Y', 'M', 'A', 'M', 'B', 'M', 'P', 'B', 'M', 'M', 'B', 'M', 'E', 'M', 'M', 'I', 'G', 'I', 'I']
    nbackStimuli.stimuliListHardOverallTraining = ['E', 'B', 'E', 'B', 'B', 'A', 'A', 'B', 'A', 'A', 'B', 'A', 'P', 'A', 'B', 'I', 'A', 'E', 'B', 'P'] // 7 3-backs, 5 2-backs, 5 4-backs
  }

 function assignRandomStimuli3back (){
    // Create array of indices for random selection
    let availableIndices = Array.from({length: possibleStimuliList3_nback.length}, (_, i) => i);
    
    // Shuffle the indices array
    for (let i = availableIndices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [availableIndices[i], availableIndices[j]] = [availableIndices[j], availableIndices[i]];
    }
    
    // Assign three different random arrays
    nbackStimuli.stimuliListHard_flanker = [...possibleStimuliList3_nback[availableIndices[0]]];
    nbackStimuli.stimuliListHard_span = [...possibleStimuliList3_nback[availableIndices[1]]];
    nbackStimuli.stimuliListHard_nback = [...possibleStimuliList3_nback[availableIndices[2]]];

    for (let j=0; j<possibleStimuliList_practice3back.length; j++){
      nbackStimuli.practiceListHard_nback[j] = possibleStimuliList_practice3back[availableIndices[j]];
    }

    console.log(nbackStimuli.practiceListHard_nback, "is the practiceListHard_nback");
}

 function assignRandomStimuli2back (){
    // Create array of indices for random selection
    let availableIndices = Array.from({length: possibleStimuliList2_nback.length}, (_, i) => i);
    
    // Shuffle the indices array
    for (let i = availableIndices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [availableIndices[i], availableIndices[j]] = [availableIndices[j], availableIndices[i]];
    }
    // Assign three different random arrays
    nbackStimuli.stimuliListHard_flanker = [...possibleStimuliList2_nback[availableIndices[0]]];
    nbackStimuli.stimuliListHard_span = [...possibleStimuliList2_nback[availableIndices[1]]];
    nbackStimuli.stimuliListHard_nback = [...possibleStimuliList2_nback[availableIndices[2]]];
    console.log(availableIndices[0], availableIndices[1], availableIndices[2],"are the available indices in assignRandomStimuli2back");

    for (let j=0; j<possibleStimuliList_practice2back.length; j++){
      nbackStimuli.practiceListHard_nback[j] = possibleStimuliList_practice2back[availableIndices[j]];
    }
    console.log(nbackStimuli.practiceListHard_nback, "is the practiceListHard_nback");
}

 function assignRandomStimuli1back (){
    // Create array of indices for random selection
    let availableIndices = Array.from({length: possibleStimuliList1_nback.length}, (_, i) => i);
    console.log(possibleStimuliList1_nback.length,"is possibleStimuliList1_nback.length");
    console.log(availableIndices.length,"is availableIndices.length in assignRandomStimuli1back");
    console.log(possibleStimuliList2_nback.length,"is possibleStimuliList2_nback.length");
    console.log(possibleStimuliList3_nback.length,"is possibleStimuliList3_nback.length");

    // Shuffle the indices array
    for (let i = availableIndices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [availableIndices[i], availableIndices[j]] = [availableIndices[j], availableIndices[i]];
    }
    
    // Assign three different random arrays
    nbackStimuli.stimuliListEasy_flanker = [...possibleStimuliList1_nback[availableIndices[0]]];
    nbackStimuli.stimuliListEasy_span = [...possibleStimuliList1_nback[availableIndices[1]]];
    nbackStimuli.stimuliListEasy_nback = [...possibleStimuliList1_nback[availableIndices[2]]];
    console.log(availableIndices[0], availableIndices[1], availableIndices[2],"are the available indices in assignRandomStimuli1back");

    for (let j=0; j<possibleStimuliList_practice1back.length; j++){
      nbackStimuli.practiceListEasy_nback[j] = possibleStimuliList_practice1back[availableIndices[j]];
    }
    console.log(nbackStimuli.practiceListEasy_nback, "is the practiceListEasy_nback");
  }


  
  /* 63 n-back stimuli: 10 before each target task (6 target tasks of 15 seconds each = 1min 30) + 3 at the end so participants are incentivized to keep the letters in mind for the last task. */
let possibleStimuliList3_nback = 
  [ // 20 3-backs, 10 2-backs and 10 4-backs
  ['B', 'P', 'C', 'Y', 'P', 'K', 'Y', 'Y', 'B', 'E', 'Y', 'E', 'O', 'U', 'O', 'O', 'I', 'I', 'I', 'M', 'M', 'I', 'M', 'Y', 'C', 'I', 'C', 'Y', 'B', 'O', 'M', 'A', 'P', 'B', 'A', 'P', 'B', 'B', 'U', 'E', 'B', 'U', 'B', 'B', 'U', 'C', 'C', 'U', 'C', 'C', 'A', 'U', 'O', 'I', 'P', 'O', 'I', 'Y', 'E', 'Y', 'Y', 'Y', 'Y'],
  ['Y', 'M', 'P', 'A', 'M', 'G', 'U', 'I', 'M', 'U', 'C', 'A', 'B', 'Y', 'A', 'Y', 'Y', 'O', 'P', 'Y', 'M', 'P', 'Y', 'M', 'C', 'Y', 'K', 'Y', 'C', 'K', 'C', 'I', 'I', 'I', 'I', 'I', 'C', 'C', 'P', 'G', 'C', 'G', 'M', 'A', 'C', 'Y', 'A', 'A', 'G', 'A', 'G', 'G', 'K', 'K', 'G', 'G', 'K', 'A', 'C', 'O', 'C', 'C', 'O'], 
  ['I', 'P', 'P', 'B', 'Y', 'P', 'I', 'Y', 'B', 'E', 'I', 'E', 'E', 'E', 'K', 'U', 'E', 'U', 'C', 'M', 'I', 'Y', 'I', 'Y', 'Y', 'I', 'A', 'O', 'A', 'U', 'O', 'O', 'U', 'O', 'O', 'P', 'O', 'Y', 'Y', 'O', 'M', 'C', 'M', 'U', 'C', 'M', 'E', 'C', 'C', 'M', 'K', 'C', 'U', 'K', 'I', 'M', 'K', 'K', 'M', 'K', 'O', 'U', 'P'], 
  ['G', 'E', 'U', 'G', 'U', 'O', 'A', 'A', 'G', 'G', 'A', 'G', 'I', 'K', 'G', 'M', 'K', 'G', 'P', 'M', 'C', 'P', 'M', 'M', 'C', 'P', 'I', 'C', 'O', 'C', 'O', 'B', 'G', 'G', 'B', 'G', 'G', 'P', 'G', 'G', 'P', 'P', 'O', 'P', 'C', 'C', 'O', 'G', 'O', 'G', 'I', 'M', 'U', 'I', 'U', 'M', 'I', 'O', 'K', 'A', 'P', 'K', 'A'],
  ['C', 'O', 'K', 'C', 'O', 'O', 'C', 'C', 'O', 'K', 'A', 'O', 'K', 'A', 'O', 'O', 'B', 'C', 'O', 'U', 'C', 'B', 'K', 'U', 'B', 'U', 'U', 'E', 'I', 'I', 'E', 'I', 'U', 'E', 'U', 'E', 'K', 'B', 'E', 'E', 'E', 'A', 'B', 'A', 'A', 'U', 'B', 'U', 'M', 'U', 'I', 'B', 'I', 'P', 'M', 'G', 'M', 'O', 'C', 'M', 'O', 'O', 'M'],
  ['P', 'M', 'O', 'P', 'M', 'O', 'P', 'E', 'M', 'E', 'E', 'E', 'M', 'P', 'M', 'A', 'P', 'E', 'I', 'P', 'E', 'I', 'E', 'E', 'B', 'E', 'B', 'M', 'B', 'Y', 'M', 'M', 'Y', 'Y', 'M', 'Y', 'O', 'I', 'I', 'O', 'M', 'G', 'P', 'M', 'K', 'Y', 'O', 'G', 'P', 'Y', 'O', 'G', 'E', 'U', 'E', 'E', 'P', 'Y', 'O', 'C', 'O', 'O', 'C'],
  ['P', 'A', 'P', 'A', 'M', 'A', 'U', 'U', 'B', 'U', 'A', 'P', 'U', 'A', 'A', 'U', 'A', 'A', 'G', 'I', 'K', 'I', 'U', 'O', 'G', 'U', 'M', 'G', 'G', 'I', 'A', 'G', 'I', 'U', 'G', 'I', 'U', 'B', 'I', 'U', 'I', 'E', 'K', 'A', 'B', 'K', 'A', 'K', 'K', 'K', 'O', 'M', 'K', 'K', 'I', 'C', 'K', 'Y', 'B', 'C', 'B', 'K', 'M'],
  ['I', 'K', 'I', 'M', 'K', 'I', 'K', 'K', 'G', 'K', 'M', 'P', 'M', 'K', 'U', 'K', 'E', 'M', 'M', 'C', 'Y', 'M', 'M', 'E', 'Y', 'M', 'P', 'B', 'M', 'M', 'I', 'M', 'I', 'I', 'I', 'I', 'U', 'O', 'E', 'U', 'O', 'A', 'U', 'O', 'G', 'B', 'B', 'G', 'O', 'K', 'G', 'K', 'O', 'C', 'Y', 'O', 'C', 'Y', 'U', 'O', 'P', 'Y', 'O'],
  ['A', 'Y', 'P', 'Y', 'A', 'P', 'O', 'B', 'O', 'B', 'K', 'M', 'G', 'M', 'I', 'G', 'A', 'I', 'I', 'E', 'I', 'C', 'E', 'I', 'O', 'C', 'I', 'I', 'K', 'I', 'K', 'A', 'K', 'C', 'B', 'M', 'P', 'B', 'A', 'K', 'B', 'O', 'K', 'B', 'G', 'O', 'B', 'M', 'B', 'A', 'M', 'M', 'A', 'A', 'I', 'A', 'A', 'I', 'U', 'U', 'I', 'E', 'U'],
  ['Y', 'P', 'O', 'Y', 'O', 'O', 'I', 'G', 'O', 'A', 'G', 'O', 'E', 'P', 'E', 'I', 'P', 'E', 'I', 'I', 'I', 'E', 'A', 'I', 'M', 'E', 'K', 'E', 'K', 'K', 'E', 'K', 'P', 'M', 'P', 'P', 'P', 'I', 'Y', 'C', 'O', 'U', 'Y', 'M', 'P', 'U', 'G', 'B', 'P', 'B', 'B', 'U', 'A', 'B', 'U', 'B', 'K', 'U', 'B', 'K', 'U', 'C', 'I'],
  ['C', 'P', 'M', 'B', 'P', 'E', 'G', 'E', 'P', 'G', 'A', 'B', 'G', 'B', 'B', 'P', 'E', 'P', 'B', 'E', 'P', 'E', 'B', 'C', 'E', 'C', 'C', 'U', 'B', 'E', 'U', 'B', 'E', 'U', 'Y', 'C', 'O', 'Y', 'O', 'O', 'Y', 'C', 'C', 'Y', 'Y', 'C', 'M', 'I', 'P', 'I', 'I', 'I', 'P', 'E', 'I', 'E', 'E', 'E', 'I', 'U', 'G', 'O', 'O'],
  ['A', 'B', 'E', 'A', 'M', 'O', 'E', 'A', 'O', 'O', 'M', 'O', 'Y', 'M', 'A', 'Y', 'I', 'A', 'Y', 'I', 'Y', 'I', 'I', 'U', 'P', 'I', 'P', 'P', 'K', 'E', 'E', 'K', 'M', 'K', 'K', 'M', 'K', 'K', 'M', 'A', 'P', 'M', 'M', 'M', 'E', 'O', 'Y', 'M', 'P', 'O', 'I', 'I', 'K', 'Y', 'I', 'E', 'K', 'E', 'K', 'K', 'B', 'U', 'B'],
  ['I', 'P', 'K', 'M', 'P', 'U', 'P', 'G', 'U', 'U', 'G', 'Y', 'I', 'A', 'Y', 'A', 'I', 'E', 'I', 'I', 'E', 'K', 'B', 'O', 'O', 'B', 'B', 'O', 'P', 'B', 'B', 'B', 'B', 'B', 'Y', 'K', 'E', 'Y', 'Y', 'E', 'Y', 'E', 'B', 'Y', 'E', 'B', 'A', 'B', 'P', 'E', 'M', 'U', 'E', 'M', 'U', 'U', 'E', 'G', 'E', 'A', 'K', 'K', 'M'],
  ['K', 'B', 'P', 'B', 'K', 'B', 'E', 'P', 'M', 'E', 'B', 'I', 'U', 'B', 'I', 'P', 'B', 'I', 'K', 'P', 'P', 'B', 'G', 'P', 'P', 'E', 'P', 'M', 'E', 'M', 'C', 'U', 'K', 'B', 'U', 'B', 'K', 'U', 'P', 'P', 'C', 'E', 'P', 'E', 'E', 'O', 'E', 'O', 'O', 'K', 'G', 'O', 'K', 'E', 'G', 'Y', 'E', 'E', 'K', 'E', 'K', 'K', 'E'],
  ['A', 'K', 'G', 'A', 'G', 'A', 'A', 'A', 'G', 'I', 'B', 'G', 'B', 'I', 'G', 'K', 'I', 'G', 'U', 'P', 'M', 'P', 'K', 'K', 'M', 'Y', 'Y', 'Y', 'C', 'Y', 'Y', 'E', 'E', 'G', 'A', 'K', 'A', 'A', 'I', 'E', 'E', 'I', 'I', 'E', 'K', 'P', 'P', 'K', 'K', 'I', 'K', 'C', 'I', 'K', 'C', 'I', 'I', 'Y', 'I', 'U', 'G', 'I', 'U'],
  ['C', 'P', 'A', 'C', 'P', 'A', 'U', 'I', 'E', 'I', 'I', 'I', 'I', 'Y', 'A', 'I', 'O', 'A', 'K', 'P', 'Y', 'K', 'Y', 'Y', 'M', 'K', 'I', 'O', 'M', 'P', 'O', 'Y', 'M', 'U', 'M', 'Y', 'U', 'U', 'A', 'U', 'U', 'O', 'G', 'G', 'Y', 'G', 'G', 'U', 'A', 'M', 'G', 'A', 'G', 'G', 'A', 'I', 'E', 'A', 'I', 'A', 'I', 'Y', 'Y'],
  ['O', 'K', 'O', 'Y', 'K', 'A', 'Y', 'A', 'Y', 'B', 'O', 'O', 'O', 'M', 'K', 'O', 'Y', 'K', 'O', 'O', 'K', 'Y', 'O', 'M', 'K', 'M', 'M', 'Y', 'O', 'M', 'I', 'O', 'O', 'M', 'O', 'U', 'I', 'O', 'K', 'O', 'Y', 'A', 'I', 'P', 'A', 'O', 'M', 'A', 'O', 'M', 'M', 'I', 'A', 'I', 'I', 'Y', 'I', 'I', 'Y', 'O', 'Y', 'I', 'K'],
  ['K', 'G', 'E', 'K', 'K', 'E', 'K', 'P', 'P', 'U', 'M', 'K', 'P', 'A', 'K', 'K', 'A', 'C', 'I', 'O', 'A', 'I', 'C', 'M', 'C', 'M', 'M', 'U', 'O', 'M', 'U', 'O', 'M', 'K', 'I', 'M', 'O', 'M', 'A', 'O', 'O', 'E', 'O', 'E', 'A', 'K', 'A', 'K', 'K', 'B', 'G', 'K', 'K', 'B', 'K', 'K', 'B', 'K', 'M', 'U', 'I', 'I', 'B'],
  ['P', 'A', 'O', 'P', 'C', 'O', 'G', 'C', 'C', 'C', 'C', 'G', 'O', 'G', 'G', 'K', 'G', 'E', 'K', 'K', 'E', 'K', 'G', 'U', 'E', 'G', 'U', 'P', 'P', 'U', 'M', 'P', 'E', 'E', 'A', 'E', 'K', 'P', 'A', 'Y', 'B', 'A', 'Y', 'A', 'G', 'I', 'Y', 'A', 'G', 'A', 'A', 'O', 'M', 'Y', 'Y', 'M', 'Y', 'K', 'Y', 'G', 'M', 'Y', 'Y'],
  ['C', 'Y', 'Y', 'Y', 'P', 'K', 'P', 'U', 'K', 'B', 'U', 'U', 'K', 'U', 'U', 'O', 'A', 'O', 'O', 'A', 'O', 'A', 'A', 'U', 'M', 'A', 'U', 'U', 'M', 'U', 'I', 'G', 'Y', 'Y', 'B', 'I', 'Y', 'C', 'I', 'O', 'Y', 'U', 'O', 'O', 'P', 'Y', 'I', 'U', 'Y', 'I', 'U', 'I', 'M', 'U', 'I', 'U', 'M', 'P', 'M', 'M', 'I', 'U', 'E'],
  ['O', 'Y', 'O', 'O', 'Y', 'I', 'U', 'C', 'I', 'M', 'U', 'P', 'M', 'A', 'P', 'P', 'A', 'Y', 'G', 'A', 'Y', 'Y', 'G', 'I', 'P', 'P', 'G', 'U', 'K', 'P', 'U', 'K', 'U', 'U', 'M', 'I', 'I', 'M', 'M', 'I', 'Y', 'B', 'U', 'B', 'B', 'U', 'B', 'Y', 'B', 'P', 'E', 'G', 'E', 'C', 'E', 'C', 'C', 'E', 'C', 'U', 'E', 'K', 'E'],
  ['Y', 'O', 'E', 'M', 'M', 'O', 'M', 'M', 'C', 'U', 'P', 'U', 'C', 'O', 'B', 'G', 'O', 'B', 'G', 'K', 'B', 'B', 'K', 'M', 'Y', 'C', 'M', 'C', 'P', 'M', 'Y', 'U', 'P', 'Y', 'U', 'G', 'E', 'U', 'G', 'G', 'E', 'G', 'E', 'O', 'K', 'I', 'O', 'I', 'I', 'O', 'U', 'I', 'I', 'I', 'I', 'I', 'O', 'U', 'C', 'B', 'K', 'G', 'K'],
  ['I', 'I', 'I', 'O', 'B', 'I', 'O', 'B', 'I', 'I', 'B', 'B', 'O', 'G', 'B', 'O', 'G', 'C', 'K', 'C', 'C', 'U', 'C', 'C', 'I', 'C', 'K', 'O', 'Y', 'K', 'K', 'U', 'O', 'M', 'M', 'U', 'M', 'U', 'E', 'K', 'A', 'K', 'U', 'A', 'U', 'A', 'K', 'P', 'A', 'I', 'B', 'P', 'A', 'B', 'C', 'O', 'B', 'G', 'O', 'O', 'Y', 'O', 'A'],
  ['E', 'M', 'E', 'E', 'M', 'E', 'U', 'I', 'U', 'U', 'E', 'I', 'G', 'K', 'G', 'P', 'K', 'C', 'M', 'K', 'K', 'K', 'A', 'P', 'K', 'A', 'A', 'P', 'B', 'A', 'P', 'B', 'G', 'P', 'B', 'G', 'I', 'B', 'O', 'B', 'A', 'O', 'A', 'P', 'O', 'G', 'P', 'P', 'U', 'Y', 'C', 'P', 'A', 'Y', 'K', 'A', 'A', 'A', 'A', 'M', 'U', 'G', 'U'],
  ['G', 'U', 'Y', 'I', 'U', 'U', 'I', 'G', 'U', 'I', 'P', 'U', 'P', 'P', 'P', 'P', 'A', 'O', 'Y', 'G', 'K', 'O', 'B', 'K', 'G', 'B', 'I', 'G', 'Y', 'I', 'Y', 'Y', 'B', 'Y', 'O', 'K', 'M', 'O', 'M', 'K', 'O', 'C', 'I', 'K', 'O', 'O', 'B', 'A', 'I', 'A', 'A', 'A', 'B', 'C', 'A', 'B', 'B', 'A', 'B', 'Y', 'M', 'E', 'M'],
  ['M', 'O', 'A', 'M', 'O', 'M', 'E', 'O', 'C', 'I', 'K', 'Y', 'C', 'P', 'C', 'Y', 'E', 'B', 'B', 'P', 'B', 'G', 'K', 'U', 'G', 'M', 'U', 'C', 'M', 'C', 'U', 'I', 'I', 'A', 'I', 'I', 'A', 'A', 'I', 'A', 'K', 'E', 'I', 'K', 'E', 'P', 'K', 'K', 'A', 'G', 'A', 'O', 'Y', 'M', 'O', 'Y', 'Y', 'Y', 'Y', 'O', 'Y', 'U', 'O'],
  ['A', 'G', 'A', 'G', 'U', 'U', 'B', 'A', 'I', 'K', 'A', 'I', 'K', 'A', 'A', 'K', 'I', 'G', 'I', 'P', 'G', 'A', 'G', 'K', 'A', 'K', 'K', 'M', 'A', 'B', 'I', 'M', 'B', 'B', 'I', 'U', 'B', 'K', 'U', 'C', 'U', 'U', 'C', 'C', 'P', 'K', 'O', 'P', 'O', 'K', 'A', 'K', 'B', 'A', 'A', 'B', 'Y', 'B', 'B', 'E', 'B', 'B', 'E'],
  ['B', 'E', 'B', 'K', 'O', 'E', 'Y', 'E', 'K', 'Y', 'C', 'P', 'Y', 'G', 'Y', 'K', 'G', 'E', 'E', 'G', 'E', 'E', 'B', 'C', 'B', 'U', 'E', 'B', 'U', 'Y', 'E', 'B', 'Y', 'Y', 'K', 'Y', 'Y', 'I', 'U', 'Y', 'B', 'Y', 'E', 'B', 'O', 'B', 'I', 'O', 'P', 'B', 'O', 'M', 'P', 'O', 'M', 'P', 'P', 'M', 'P', 'M', 'G', 'O', 'U'],
  ['C', 'Y', 'C', 'C', 'K', 'K', 'M', 'K', 'U', 'I', 'O', 'U', 'B', 'O', 'E', 'B', 'I', 'M', 'I', 'I', 'I', 'I', 'M', 'I', 'Y', 'E', 'O', 'B', 'O', 'I', 'O', 'K', 'I', 'I', 'K', 'I', 'I', 'E', 'M', 'I', 'C', 'Y', 'M', 'P', 'Y', 'G', 'O', 'Y', 'B', 'O', 'P', 'Y', 'B', 'C', 'Y', 'M', 'C', 'I', 'M', 'M', 'I', 'P', 'I'],
  ['O', 'P', 'A', 'P', 'O', 'P', 'A', 'O', 'K', 'A', 'E', 'Y', 'M', 'E', 'B', 'Y', 'P', 'B', 'K', 'I', 'B', 'K', 'A', 'U', 'P', 'U', 'U', 'P', 'C', 'P', 'P', 'G', 'P', 'P', 'M', 'E', 'P', 'B', 'M', 'P', 'P', 'P', 'Y', 'A', 'U', 'U', 'A', 'E', 'U', 'A', 'E', 'A', 'P', 'E', 'E', 'I', 'E', 'B', 'I', 'B', 'I', 'C', 'M'],
  ['A', 'P', 'C', 'A', 'C', 'Y', 'A', 'G', 'Y', 'A', 'C', 'E', 'Y', 'E', 'E', 'K', 'C', 'I', 'I', 'M', 'M', 'A', 'I', 'M', 'A', 'A', 'G', 'C', 'G', 'G', 'P', 'P', 'I', 'G', 'I', 'B', 'U', 'G', 'C', 'U', 'U', 'C', 'Y', 'C', 'C', 'M', 'C', 'E', 'M', 'O', 'M', 'U', 'K', 'U', 'U', 'K', 'K', 'U', 'K', 'K', 'U', 'K', 'G'],
  ['B', 'A', 'B', 'B', 'C', 'Y', 'B', 'B', 'Y', 'B', 'B', 'Y', 'B', 'Y', 'Y', 'K', 'Y', 'O', 'K', 'K', 'A', 'P', 'O', 'M', 'P', 'O', 'B', 'P', 'P', 'B', 'O', 'P', 'K', 'P', 'O', 'C', 'P', 'B', 'U', 'U', 'K', 'O', 'B', 'K', 'K', 'K', 'K', 'G', 'G', 'P', 'M', 'G', 'U', 'G', 'U', 'U', 'O', 'O', 'E', 'U', 'B', 'I', 'P'],
  ['C', 'A', 'C', 'E', 'K', 'A', 'E', 'K', 'Y', 'O', 'K', 'K', 'B', 'B', 'U', 'O', 'M', 'U', 'U', 'O', 'U', 'I', 'O', 'C', 'I', 'O', 'O', 'I', 'I', 'K', 'G', 'M', 'G', 'U', 'M', 'K', 'U', 'K', 'K', 'Y', 'K', 'K', 'Y', 'K', 'G', 'E', 'C', 'K', 'C', 'K', 'B', 'G', 'K', 'I', 'Y', 'I', 'U', 'O', 'O', 'U', 'U', 'O', 'U'],
  ['E', 'K', 'O', 'K', 'E', 'P', 'K', 'U', 'P', 'U', 'K', 'P', 'K', 'B', 'P', 'G', 'P', 'B', 'G', 'G', 'Y', 'O', 'G', 'Y', 'Y', 'B', 'E', 'P', 'G', 'E', 'P', 'E', 'P', 'P', 'Y', 'P', 'P', 'A', 'Y', 'E', 'B', 'Y', 'E', 'B', 'Y', 'E', 'E', 'B', 'E', 'G', 'G', 'C', 'C', 'C', 'U', 'K', 'E', 'O', 'K', 'E', 'K', 'G', 'A'],
  ['B', 'K', 'B', 'G', 'K', 'K', 'G', 'I', 'G', 'G', 'I', 'U', 'I', 'E', 'U', 'K', 'E', 'E', 'M', 'E', 'I', 'M', 'O', 'M', 'I', 'K', 'I', 'K', 'O', 'A', 'E', 'B', 'M', 'M', 'M', 'U', 'M', 'M', 'U', 'C', 'M', 'I', 'C', 'M', 'M', 'I', 'K', 'M', 'U', 'K', 'B', 'I', 'K', 'G', 'I', 'M', 'G', 'K', 'G', 'C', 'B', 'K', 'C'],
  ['K', 'E', 'P', 'K', 'E', 'P', 'P', 'U', 'Y', 'B', 'Y', 'Y', 'B', 'B', 'Y', 'A', 'B', 'G', 'A', 'I', 'A', 'A', 'K', 'K', 'O', 'M', 'M', 'O', 'C', 'O', 'K', 'Y', 'G', 'Y', 'G', 'Y', 'U', 'K', 'K', 'I', 'U', 'K', 'I', 'O', 'G', 'A', 'G', 'G', 'A', 'G', 'G', 'K', 'G', 'U', 'B', 'I', 'U', 'K', 'B', 'K', 'K', 'B', 'B'],
  ['P', 'Y', 'C', 'P', 'C', 'E', 'P', 'P', 'P', 'U', 'U', 'P', 'M', 'B', 'G', 'Y', 'B', 'G', 'U', 'B', 'B', 'U', 'B', 'O', 'O', 'O', 'B', 'A', 'B', 'A', 'A', 'I', 'K', 'K', 'I', 'K', 'K', 'I', 'B', 'U', 'M', 'I', 'M', 'A', 'A', 'A', 'A', 'O', 'Y', 'E', 'O', 'G', 'E', 'E', 'G', 'A', 'A', 'G', 'G', 'A', 'C', 'G', 'B'],
  ['U', 'I', 'O', 'K', 'I', 'O', 'I', 'C', 'O', 'K', 'C', 'C', 'C', 'A', 'C', 'A', 'A', 'A', 'K', 'U', 'A', 'K', 'U', 'Y', 'B', 'K', 'Y', 'B', 'B', 'A', 'B', 'Y', 'C', 'P', 'B', 'P', 'B', 'A', 'A', 'B', 'K', 'M', 'K', 'K', 'A', 'M', 'A', 'A', 'B', 'I', 'A', 'E', 'I', 'A', 'E', 'K', 'B', 'E', 'E', 'I', 'C', 'C', 'U'],
  ['B', 'G', 'G', 'G', 'G', 'G', 'Y', 'U', 'O', 'Y', 'K', 'O', 'K', 'K', 'I', 'M', 'E', 'I', 'I', 'E', 'Y', 'K', 'I', 'G', 'K', 'K', 'G', 'M', 'G', 'C', 'M', 'G', 'G', 'M', 'M', 'O', 'O', 'O', 'U', 'E', 'O', 'E', 'E', 'P', 'E', 'U', 'P', 'C', 'E', 'P', 'C', 'G', 'I', 'P', 'C', 'K', 'O', 'O', 'K', 'O', 'K', 'I', 'I'],
  ['O', 'G', 'O', 'O', 'Y', 'G', 'I', 'G', 'C', 'C', 'K', 'C', 'Y', 'I', 'K', 'Y', 'O', 'K', 'Y', 'K', 'M', 'Y', 'I', 'Y', 'Y', 'I', 'Y', 'O', 'I', 'K', 'G', 'O', 'K', 'P', 'G', 'B', 'Y', 'G', 'P', 'Y', 'B', 'G', 'B', 'M', 'E', 'G', 'M', 'M', 'K', 'G', 'M', 'K', 'G', 'K', 'G', 'G', 'C', 'M', 'C', 'C', 'I', 'U', 'C'],
  ['K', 'U', 'E', 'K', 'E', 'E', 'G', 'K', 'E', 'G', 'E', 'I', 'G', 'E', 'G', 'A', 'G', 'E', 'P', 'Y', 'K', 'E', 'B', 'K', 'B', 'E', 'G', 'E', 'G', 'G', 'E', 'A', 'I', 'E', 'A', 'B', 'I', 'K', 'B', 'B', 'K', 'M', 'M', 'M', 'I', 'A', 'I', 'G', 'A', 'K', 'G', 'A', 'K', 'G', 'P', 'Y', 'A', 'P', 'I', 'Y', 'P', 'P', 'P'],
  // ['A', 'I', 'B', 'A', 'I', 'A', 'I', 'O', 'I', 'I', 'O', 'U', 'M', 'I', 'O', 'M', 'I', 'I', 'I', 'I', 'I', 'O', 'G', 'K', 'O', 'I', 'G', 'E', 'O', 'I', 'A', 'I', 'A', 'G', 'E', 'B', 'M', 'G', 'B', 'C', 'I', 'B', 'C', 'U', 'B', 'M', 'U', 'M', 'A', 'U', 'E', 'A', 'G', 'A', 'A', 'G', 'I', 'M', 'G', 'I', 'I', 'U', 'M'],
  // ['G', 'K', 'U', 'G', 'K', 'Y', 'E', 'G', 'O', 'Y', 'E', 'O', 'O', 'E', 'O', 'O', 'E', 'A', 'I', 'M', 'I', 'A', 'M', 'P', 'M', 'P', 'Y', 'M', 'Y', 'Y', 'O', 'O', 'I', 'I', 'O', 'O', 'K', 'O', 'K', 'K', 'U', 'Y', 'G', 'Y', 'K', 'G', 'I', 'K', 'P', 'G', 'I', 'I', 'B', 'I', 'P', 'A', 'O', 'P', 'E', 'O', 'P', 'E', 'P'],
  // ['Y', 'B', 'E', 'G', 'E', 'B', 'G', 'E', 'A', 'C', 'G', 'O', 'E', 'C', 'E', 'P', 'A', 'P', 'Y', 'A', 'E', 'I', 'A', 'A', 'I', 'A', 'A', 'I', 'A', 'K', 'I', 'Y', 'B', 'M', 'B', 'M', 'A', 'I', 'Y', 'A', 'I', 'I', 'E', 'A', 'I', 'O', 'A', 'I', 'I', 'C', 'I', 'U', 'M', 'C', 'M', 'O', 'C', 'P', 'O', 'P', 'E', 'O', 'P'],
  // ['O', 'U', 'U', 'E', 'U', 'K', 'E', 'E', 'K', 'E', 'M', 'B', 'K', 'U', 'B', 'M', 'M', 'B', 'B', 'M', 'B', 'C', 'U', 'A', 'K', 'U', 'A', 'K', 'U', 'K', 'A', 'U', 'B', 'K', 'A', 'O', 'E', 'B', 'O', 'A', 'E', 'A', 'A', 'Y', 'M', 'M', 'I', 'K', 'I', 'I', 'K', 'I', 'K', 'I', 'G', 'O', 'A', 'O', 'B', 'G', 'O', 'O', 'G'],
  // ['G', 'P', 'E', 'G', 'G', 'E', 'B', 'G', 'B', 'U', 'Y', 'B', 'P', 'U', 'U', 'A', 'P', 'A', 'A', 'E', 'E', 'E', 'E', 'G', 'G', 'G', 'G', 'G', 'B', 'U', 'I', 'Y', 'Y', 'I', 'O', 'C', 'C', 'Y', 'C', 'B', 'O', 'B', 'O', 'O', 'B', 'K', 'M', 'B', 'E', 'M', 'A', 'E', 'M', 'A', 'E', 'E', 'M', 'A', 'E', 'P', 'Y', 'A', 'P'],
  // ['E', 'P', 'K', 'G', 'E', 'P', 'G', 'I', 'I', 'Y', 'G', 'Y', 'I', 'M', 'M', 'I', 'M', 'M', 'I', 'M', 'I', 'M', 'G', 'C', 'I', 'U', 'C', 'I', 'U', 'C', 'I', 'I', 'I', 'I', 'C', 'P', 'M', 'C', 'G', 'U', 'C', 'G', 'C', 'C', 'Y', 'P', 'E', 'Y', 'O', 'E', 'E', 'O', 'O', 'O', 'P', 'B', 'P', 'M', 'B', 'A', 'K', 'Y', 'I'],
  // ['U', 'C', 'C', 'B', 'U', 'B', 'Y', 'B', 'U', 'Y', 'C', 'U', 'K', 'Y', 'K', 'K', 'U', 'U', 'G', 'G', 'G', 'G', 'I', 'K', 'G', 'K', 'K', 'C', 'M', 'M', 'C', 'M', 'M', 'P', 'O', 'M', 'O', 'O', 'M', 'M', 'E', 'P', 'I', 'E', 'Y', 'I', 'I', 'I', 'Y', 'A', 'Y', 'K', 'A', 'Y', 'K', 'E', 'C', 'K', 'P', 'C', 'O', 'P', 'E'],
  // ['E', 'E', 'B', 'E', 'G', 'M', 'U', 'I', 'M', 'U', 'U', 'C', 'U', 'O', 'C', 'Y', 'O', 'U', 'O', 'A', 'U', 'O', 'U', 'U', 'O', 'U', 'O', 'O', 'M', 'M', 'I', 'I', 'C', 'M', 'I', 'A', 'O', 'M', 'I', 'B', 'C', 'M', 'E', 'E', 'Y', 'E', 'Y', 'A', 'K', 'Y', 'U', 'I', 'Y', 'Y', 'Y', 'O', 'B', 'Y', 'O', 'B', 'B', 'Y', 'B']
]

let possibleStimuliList1_nback = [
  ['P', 'O', 'P', 'O', 'K', 'K', 'G', 'G', 'G', 'I', 'U', 'I', 'U', 'Y', 'G', 'Y', 'K', 'K', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'I', 'U', 'U', 'U', 'K', 'G', 'K', 'B', 'M', 'A', 'M', 'A', 'U', 'E', 'E', 'E', 'M', 'M', 'Y', 'Y', 'K', 'M', 'E', 'E', 'O', 'Y', 'Y', 'Y', 'P', 'K', 'B', 'K', 'U', 'C', 'C', 'U', 'C', 'U'],
  ['I', 'M', 'M', 'K', 'U', 'U', 'U', 'B', 'B', 'B', 'B', 'B', 'P', 'P', 'P', 'M', 'M', 'G', 'M', 'B', 'E', 'B', 'G', 'U', 'U', 'U', 'G', 'G', 'G', 'G', 'E', 'B', 'U', 'M', 'M', 'M', 'P', 'P', 'Y', 'P', 'B', 'I', 'I', 'I', 'Y', 'C', 'Y', 'C', 'O', 'C', 'O', 'C', 'E', 'C', 'G', 'P', 'K', 'P', 'B', 'C', 'O', 'A', 'C'],
  ['M', 'A', 'M', 'C', 'C', 'G', 'U', 'U', 'G', 'A', 'G', 'K', 'K', 'K', 'U', 'G', 'O', 'O', 'P', 'O', 'G', 'G', 'G', 'M', 'P', 'P', 'P', 'P', 'P', 'E', 'P', 'E', 'G', 'E', 'G', 'E', 'P', 'G', 'G', 'G', 'U', 'P', 'U', 'K', 'K', 'A', 'A', 'A', 'M', 'M', 'M', 'I', 'I', 'I', 'O', 'G', 'O', 'E', 'O', 'M', 'E', 'K', 'Y'],
  ['A', 'Y', 'Y', 'K', 'I', 'K', 'K', 'K', 'K', 'A', 'M', 'M', 'M', 'B', 'M', 'I', 'A', 'P', 'A', 'B', 'A', 'E', 'O', 'B', 'B', 'B', 'B', 'U', 'B', 'U', 'B', 'U', 'O', 'G', 'G', 'C', 'C', 'C', 'A', 'P', 'Y', 'P', 'I', 'B', 'B', 'P', 'M', 'M', 'M', 'P', 'P', 'P', 'O', 'K', 'O', 'K', 'A', 'A', 'A', 'U', 'U', 'Y', 'M'],
  ['M', 'B', 'M', 'E', 'E', 'C', 'C', 'C', 'E', 'P', 'P', 'P', 'P', 'P', 'Y', 'A', 'A', 'U', 'U', 'E', 'U', 'P', 'M', 'P', 'M', 'K', 'G', 'G', 'B', 'G', 'B', 'B', 'P', 'P', 'P', 'A', 'A', 'G', 'A', 'O', 'B', 'P', 'U', 'P', 'U', 'O', 'M', 'A', 'M', 'B', 'K', 'B', 'O', 'O', 'O', 'C', 'U', 'O', 'G', 'G', 'G', 'G', 'G'],
  ['A', 'K', 'B', 'K', 'C', 'G', 'C', 'I', 'I', 'K', 'I', 'K', 'K', 'C', 'K', 'C', 'B', 'C', 'G', 'G', 'K', 'G', 'C', 'C', 'G', 'G', 'G', 'M', 'M', 'M', 'U', 'K', 'U', 'E', 'E', 'E', 'M', 'E', 'P', 'G', 'M', 'M', 'I', 'I', 'M', 'M', 'P', 'G', 'P', 'G', 'A', 'U', 'B', 'B', 'B', 'B', 'B', 'I', 'I', 'I', 'I', 'P', 'A'],
  ['A', 'B', 'B', 'E', 'B', 'B', 'I', 'M', 'A', 'I', 'I', 'I', 'U', 'U', 'K', 'K', 'K', 'E', 'O', 'O', 'O', 'A', 'P', 'K', 'C', 'K', 'G', 'G', 'G', 'M', 'U', 'M', 'G', 'M', 'I', 'I', 'Y', 'I', 'U', 'Y', 'C', 'M', 'C', 'M', 'P', 'M', 'M', 'M', 'M', 'Y', 'U', 'Y', 'U', 'A', 'A', 'A', 'A', 'B', 'A', 'G', 'G', 'G', 'P'],
  ['C', 'B', 'Y', 'P', 'P', 'O', 'K', 'O', 'M', 'O', 'O', 'B', 'O', 'B', 'I', 'B', 'I', 'I', 'I', 'I', 'E', 'I', 'O', 'G', 'C', 'G', 'C', 'C', 'C', 'C', 'O', 'O', 'I', 'I', 'O', 'O', 'P', 'E', 'E', 'B', 'M', 'K', 'M', 'I', 'A', 'I', 'E', 'K', 'E', 'G', 'G', 'O', 'E', 'E', 'U', 'U', 'B', 'B', 'B', 'B', 'B', 'B', 'P'],
  ['I', 'I', 'Y', 'K', 'K', 'K', 'P', 'I', 'I', 'Y', 'Y', 'Y', 'M', 'Y', 'I', 'A', 'K', 'A', 'E', 'G', 'G', 'G', 'E', 'E', 'P', 'E', 'P', 'E', 'P', 'O', 'E', 'Y', 'E', 'U', 'U', 'U', 'A', 'Y', 'A', 'Y', 'K', 'O', 'K', 'G', 'G', 'G', 'Y', 'G', 'A', 'A', 'P', 'P', 'P', 'M', 'B', 'B', 'B', 'B', 'B', 'P', 'M', 'Y', 'K'],
  ['E', 'A', 'B', 'Y', 'B', 'E', 'E', 'U', 'E', 'U', 'K', 'U', 'C', 'C', 'C', 'K', 'K', 'A', 'Y', 'Y', 'Y', 'M', 'M', 'Y', 'M', 'Y', 'Y', 'M', 'Y', 'M', 'I', 'M', 'A', 'C', 'C', 'C', 'K', 'K', 'P', 'K', 'M', 'M', 'C', 'M', 'G', 'G', 'P', 'P', 'P', 'E', 'G', 'G', 'I', 'I', 'U', 'I', 'U', 'I', 'Y', 'Y', 'Y', 'Y', 'B'],
  ['P', 'P', 'O', 'O', 'G', 'G', 'B', 'G', 'M', 'G', 'P', 'P', 'O', 'O', 'O', 'E', 'O', 'B', 'O', 'C', 'B', 'O', 'G', 'O', 'G', 'G', 'U', 'B', 'G', 'G', 'G', 'G', 'G', 'B', 'O', 'B', 'O', 'M', 'P', 'Y', 'P', 'Y', 'O', 'O', 'P', 'U', 'U', 'U', 'U', 'P', 'G', 'U', 'G', 'O', 'O', 'O', 'O', 'I', 'I', 'G', 'I', 'P', 'P'],
  ['G', 'G', 'G', 'Y', 'B', 'O', 'G', 'C', 'C', 'C', 'U', 'U', 'I', 'U', 'I', 'U', 'I', 'Y', 'I', 'O', 'O', 'O', 'I', 'A', 'M', 'M', 'M', 'Y', 'Y', 'Y', 'Y', 'K', 'Y', 'M', 'M', 'A', 'M', 'A', 'Y', 'U', 'U', 'U', 'B', 'A', 'K', 'K', 'K', 'E', 'K', 'O', 'O', 'P', 'E', 'E', 'I', 'E', 'A', 'E', 'K', 'G', 'K', 'Y', 'Y'],
  ['C', 'C', 'O', 'C', 'G', 'G', 'E', 'E', 'E', 'E', 'Y', 'E', 'C', 'E', 'C', 'A', 'U', 'U', 'Y', 'G', 'Y', 'Y', 'K', 'K', 'K', 'K', 'P', 'K', 'O', 'K', 'P', 'P', 'U', 'P', 'O', 'O', 'A', 'O', 'A', 'K', 'K', 'Y', 'Y', 'U', 'U', 'B', 'B', 'A', 'Y', 'G', 'Y', 'O', 'O', 'O', 'P', 'I', 'P', 'I', 'P', 'M', 'M', 'M', 'E'],
  ['A', 'A', 'Y', 'B', 'Y', 'B', 'Y', 'Y', 'G', 'G', 'Y', 'Y', 'Y', 'P', 'B', 'B', 'M', 'B', 'M', 'K', 'O', 'K', 'A', 'A', 'B', 'B', 'O', 'U', 'C', 'M', 'M', 'M', 'M', 'M', 'M', 'I', 'C', 'C', 'C', 'B', 'B', 'B', 'O', 'O', 'U', 'U', 'P', 'Y', 'P', 'Y', 'U', 'E', 'U', 'O', 'O', 'A', 'O', 'A', 'G', 'A', 'G', 'K', 'M'],
  ['E', 'Y', 'Y', 'Y', 'C', 'B', 'C', 'B', 'C', 'B', 'C', 'O', 'O', 'Y', 'E', 'Y', 'A', 'K', 'B', 'I', 'I', 'I', 'A', 'A', 'I', 'C', 'A', 'A', 'A', 'A', 'A', 'I', 'I', 'I', 'I', 'E', 'E', 'O', 'K', 'K', 'K', 'C', 'U', 'U', 'U', 'I', 'I', 'G', 'I', 'B', 'U', 'Y', 'U', 'K', 'U', 'K', 'U', 'C', 'O', 'Y', 'Y', 'A', 'K'],
  ['O', 'B', 'K', 'K', 'P', 'K', 'I', 'E', 'O', 'O', 'C', 'O', 'P', 'P', 'G', 'P', 'G', 'O', 'G', 'K', 'K', 'U', 'U', 'K', 'U', 'G', 'G', 'G', 'B', 'K', 'K', 'K', 'E', 'C', 'O', 'I', 'I', 'I', 'I', 'I', 'U', 'I', 'I', 'P', 'P', 'P', 'P', 'E', 'P', 'U', 'P', 'U', 'U', 'Y', 'E', 'Y', 'E', 'C', 'M', 'A', 'A', 'A', 'U'],
  ['A', 'A', 'O', 'C', 'Y', 'Y', 'A', 'Y', 'A', 'P', 'P', 'P', 'M', 'E', 'E', 'E', 'E', 'O', 'O', 'I', 'O', 'E', 'E', 'Y', 'Y', 'Y', 'P', 'C', 'C', 'C', 'C', 'M', 'M', 'M', 'C', 'O', 'C', 'C', 'C', 'A', 'C', 'A', 'Y', 'A', 'E', 'U', 'E', 'I', 'M', 'I', 'A', 'I', 'O', 'K', 'K', 'K', 'P', 'M', 'P', 'U', 'O', 'M', 'K'],
  ['O', 'G', 'O', 'U', 'P', 'P', 'P', 'P', 'C', 'C', 'C', 'Y', 'C', 'A', 'O', 'A', 'K', 'P', 'K', 'K', 'M', 'E', 'M', 'E', 'K', 'P', 'O', 'E', 'K', 'K', 'K', 'U', 'U', 'U', 'K', 'K', 'P', 'P', 'E', 'E', 'E', 'E', 'G', 'Y', 'Y', 'Y', 'K', 'O', 'G', 'G', 'G', 'B', 'B', 'C', 'B', 'C', 'O', 'K', 'O', 'K', 'G', 'P', 'G'],
  ['U', 'U', 'K', 'P', 'K', 'A', 'K', 'E', 'E', 'E', 'E', 'A', 'P', 'A', 'A', 'A', 'A', 'C', 'C', 'G', 'U', 'U', 'U', 'U', 'B', 'U', 'B', 'K', 'M', 'P', 'B', 'P', 'P', 'P', 'M', 'M', 'C', 'C', 'C', 'C', 'M', 'U', 'B', 'Y', 'B', 'U', 'M', 'U', 'A', 'Y', 'M', 'Y', 'M', 'G', 'Y', 'B', 'B', 'Y', 'Y', 'K', 'Y', 'P', 'P'],
  ['U', 'O', 'C', 'O', 'B', 'B', 'P', 'B', 'B', 'B', 'G', 'G', 'A', 'A', 'A', 'Y', 'I', 'O', 'B', 'O', 'G', 'M', 'G', 'E', 'G', 'O', 'O', 'M', 'M', 'K', 'M', 'G', 'B', 'G', 'Y', 'Y', 'A', 'Y', 'Y', 'Y', 'Y', 'Y', 'M', 'G', 'G', 'G', 'C', 'C', 'M', 'C', 'M', 'I', 'I', 'I', 'B', 'G', 'B', 'P', 'K', 'K', 'K', 'M', 'K'],
  ['A', 'A', 'A', 'O', 'A', 'P', 'P', 'P', 'P', 'I', 'P', 'P', 'K', 'I', 'P', 'P', 'G', 'C', 'G', 'C', 'G', 'E', 'I', 'I', 'Y', 'U', 'U', 'I', 'G', 'A', 'A', 'A', 'M', 'M', 'M', 'M', 'M', 'B', 'P', 'P', 'U', 'P', 'B', 'G', 'E', 'E', 'C', 'Y', 'C', 'Y', 'C', 'B', 'B', 'O', 'B', 'B', 'C', 'C', 'Y', 'C', 'Y', 'P', 'Y'],
  ['K', 'Y', 'M', 'Y', 'K', 'U', 'Y', 'Y', 'O', 'Y', 'O', 'E', 'E', 'E', 'O', 'B', 'B', 'B', 'B', 'B', 'P', 'O', 'P', 'O', 'P', 'O', 'U', 'U', 'O', 'A', 'A', 'O', 'O', 'I', 'O', 'U', 'U', 'U', 'U', 'B', 'U', 'B', 'K', 'K', 'E', 'E', 'E', 'U', 'O', 'G', 'G', 'G', 'B', 'G', 'O', 'O', 'A', 'E', 'A', 'G', 'O', 'O', 'E'],
  ['A', 'Y', 'A', 'U', 'A', 'P', 'A', 'G', 'G', 'U', 'G', 'U', 'G', 'U', 'C', 'C', 'C', 'U', 'U', 'M', 'O', 'A', 'O', 'K', 'K', 'B', 'I', 'I', 'I', 'B', 'B', 'U', 'U', 'M', 'M', 'M', 'P', 'M', 'P', 'O', 'A', 'O', 'I', 'M', 'M', 'M', 'M', 'E', 'O', 'U', 'B', 'U', 'C', 'C', 'C', 'C', 'P', 'E', 'E', 'M', 'M', 'M', 'C'],
  ['G', 'P', 'U', 'P', 'O', 'M', 'K', 'M', 'P', 'P', 'P', 'C', 'U', 'U', 'U', 'M', 'O', 'M', 'M', 'E', 'E', 'I', 'E', 'A', 'I', 'G', 'I', 'C', 'C', 'C', 'B', 'G', 'K', 'K', 'K', 'M', 'U', 'A', 'A', 'E', 'E', 'E', 'E', 'I', 'E', 'Y', 'M', 'U', 'M', 'U', 'U', 'U', 'P', 'U', 'P', 'E', 'O', 'O', 'O', 'O', 'O', 'M', 'E'],
  ['G', 'A', 'O', 'A', 'I', 'M', 'I', 'P', 'P', 'C', 'I', 'O', 'I', 'B', 'B', 'B', 'B', 'B', 'B', 'P', 'B', 'P', 'B', 'B', 'Y', 'C', 'C', 'A', 'C', 'M', 'C', 'M', 'M', 'M', 'I', 'I', 'G', 'O', 'O', 'O', 'A', 'G', 'G', 'G', 'C', 'C', 'K', 'K', 'K', 'C', 'Y', 'C', 'I', 'A', 'O', 'A', 'U', 'Y', 'Y', 'E', 'Y', 'A', 'A'],
  ['B', 'B', 'B', 'G', 'B', 'G', 'B', 'I', 'I', 'A', 'A', 'Y', 'O', 'Y', 'Y', 'Y', 'E', 'E', 'U', 'U', 'G', 'O', 'G', 'U', 'U', 'I', 'A', 'A', 'A', 'A', 'A', 'A', 'M', 'K', 'K', 'K', 'M', 'P', 'M', 'E', 'E', 'O', 'O', 'I', 'A', 'E', 'E', 'C', 'E', 'K', 'E', 'P', 'E', 'P', 'E', 'I', 'I', 'M', 'I', 'Y', 'C', 'Y', 'M'],
  ['U', 'I', 'G', 'C', 'U', 'U', 'U', 'U', 'M', 'K', 'C', 'K', 'O', 'O', 'O', 'O', 'C', 'C', 'M', 'M', 'M', 'M', 'O', 'A', 'O', 'K', 'B', 'B', 'A', 'A', 'Y', 'Y', 'U', 'U', 'E', 'U', 'E', 'K', 'I', 'A', 'I', 'A', 'P', 'O', 'E', 'E', 'O', 'E', 'E', 'E', 'E', 'E', 'I', 'C', 'I', 'Y', 'I', 'P', 'I', 'I', 'O', 'B', 'O'],
  ['K', 'K', 'G', 'G', 'K', 'C', 'C', 'P', 'C', 'I', 'Y', 'Y', 'Y', 'Y', 'M', 'Y', 'Y', 'B', 'Y', 'E', 'O', 'O', 'O', 'P', 'O', 'I', 'I', 'I', 'I', 'C', 'E', 'B', 'B', 'U', 'B', 'E', 'G', 'G', 'E', 'E', 'M', 'E', 'M', 'P', 'E', 'B', 'B', 'B', 'U', 'B', 'U', 'E', 'P', 'K', 'K', 'M', 'K', 'M', 'M', 'M', 'I', 'M', 'I'],
  ['B', 'B', 'I', 'B', 'Y', 'Y', 'M', 'G', 'O', 'O', 'O', 'A', 'A', 'A', 'A', 'K', 'Y', 'O', 'A', 'A', 'A', 'E', 'A', 'Y', 'Y', 'Y', 'Y', 'M', 'I', 'I', 'B', 'M', 'B', 'B', 'A', 'B', 'A', 'E', 'A', 'A', 'B', 'M', 'B', 'I', 'M', 'I', 'U', 'Y', 'M', 'Y', 'C', 'C', 'C', 'Y', 'E', 'G', 'E', 'E', 'E', 'E', 'U', 'E', 'B'],
  ['P', 'M', 'M', 'P', 'B', 'P', 'U', 'U', 'O', 'O', 'O', 'P', 'I', 'I', 'I', 'U', 'I', 'Y', 'M', 'E', 'M', 'Y', 'A', 'Y', 'U', 'Y', 'I', 'O', 'O', 'O', 'M', 'E', 'Y', 'M', 'Y', 'M', 'B', 'B', 'Y', 'Y', 'Y', 'Y', 'B', 'P', 'P', 'P', 'K', 'O', 'K', 'C', 'C', 'P', 'C', 'O', 'K', 'O', 'A', 'A', 'A', 'A', 'A', 'A', 'B'],
  ['E', 'P', 'P', 'P', 'P', 'E', 'E', 'G', 'P', 'G', 'P', 'B', 'K', 'B', 'K', 'Y', 'U', 'Y', 'M', 'M', 'A', 'M', 'U', 'K', 'B', 'B', 'B', 'U', 'K', 'K', 'K', 'U', 'U', 'U', 'P', 'P', 'P', 'G', 'O', 'G', 'C', 'U', 'Y', 'U', 'M', 'M', 'M', 'I', 'B', 'I', 'C', 'I', 'C', 'G', 'G', 'U', 'M', 'M', 'P', 'P', 'P', 'P', 'O'],
  ['M', 'Y', 'Y', 'K', 'U', 'U', 'A', 'A', 'O', 'O', 'E', 'O', 'E', 'C', 'C', 'C', 'M', 'M', 'M', 'U', 'U', 'C', 'C', 'C', 'Y', 'C', 'Y', 'E', 'Y', 'K', 'K', 'E', 'M', 'E', 'M', 'C', 'B', 'P', 'I', 'I', 'I', 'B', 'B', 'B', 'B', 'B', 'G', 'C', 'C', 'P', 'Y', 'P', 'Y', 'B', 'G', 'G', 'I', 'G', 'U', 'G', 'U', 'G', 'A'],
  ['G', 'I', 'P', 'I', 'P', 'E', 'G', 'G', 'G', 'B', 'I', 'I', 'I', 'I', 'Y', 'I', 'U', 'U', 'U', 'K', 'K', 'E', 'E', 'M', 'E', 'Y', 'P', 'P', 'K', 'P', 'K', 'C', 'C', 'C', 'C', 'Y', 'Y', 'E', 'E', 'E', 'E', 'C', 'Y', 'A', 'Y', 'G', 'Y', 'B', 'I', 'B', 'A', 'G', 'A', 'P', 'O', 'K', 'B', 'O', 'O', 'O', 'O', 'A', 'E'],
  ['U', 'U', 'M', 'O', 'I', 'I', 'I', 'K', 'K', 'B', 'Y', 'B', 'K', 'C', 'C', 'C', 'K', 'C', 'U', 'U', 'U', 'M', 'B', 'M', 'M', 'M', 'I', 'I', 'I', 'K', 'I', 'K', 'K', 'P', 'K', 'B', 'B', 'B', 'I', 'O', 'Y', 'O', 'I', 'O', 'A', 'Y', 'A', 'C', 'C', 'B', 'B', 'B', 'M', 'M', 'M', 'U', 'M', 'U', 'E', 'K', 'Y', 'K', 'O'],
  ['B', 'E', 'Y', 'Y', 'G', 'K', 'U', 'K', 'E', 'A', 'E', 'M', 'A', 'K', 'A', 'Y', 'Y', 'Y', 'K', 'K', 'Y', 'Y', 'I', 'Y', 'I', 'P', 'P', 'Y', 'E', 'E', 'A', 'E', 'A', 'A', 'A', 'P', 'P', 'P', 'P', 'B', 'B', 'Y', 'Y', 'Y', 'Y', 'Y', 'G', 'G', 'B', 'G', 'B', 'K', 'C', 'K', 'M', 'M', 'U', 'M', 'B', 'Y', 'B', 'Y', 'Y'],
  ['U', 'Y', 'A', 'A', 'A', 'A', 'M', 'I', 'M', 'C', 'Y', 'A', 'Y', 'A', 'O', 'O', 'O', 'U', 'C', 'G', 'G', 'G', 'G', 'I', 'A', 'I', 'O', 'I', 'E', 'U', 'U', 'U', 'U', 'G', 'U', 'G', 'E', 'Y', 'P', 'P', 'P', 'C', 'C', 'K', 'Y', 'O', 'O', 'O', 'P', 'M', 'A', 'M', 'A', 'A', 'P', 'B', 'E', 'G', 'G', 'G', 'G', 'E', 'A'],
  ['B', 'C', 'B', 'C', 'B', 'B', 'I', 'A', 'A', 'A', 'G', 'P', 'P', 'B', 'P', 'B', 'E', 'K', 'E', 'B', 'B', 'K', 'I', 'E', 'E', 'E', 'C', 'O', 'U', 'U', 'U', 'U', 'U', 'E', 'E', 'P', 'A', 'M', 'O', 'E', 'E', 'I', 'E', 'I', 'B', 'B', 'B', 'G', 'B', 'U', 'U', 'E', 'E', 'E', 'E', 'E', 'O', 'G', 'O', 'G', 'C', 'K', 'I'],
  ['K', 'E', 'K', 'E', 'K', 'E', 'G', 'E', 'G', 'Y', 'Y', 'I', 'A', 'A', 'I', 'A', 'P', 'P', 'M', 'M', 'U', 'M', 'B', 'B', 'E', 'E', 'E', 'C', 'C', 'M', 'C', 'M', 'I', 'P', 'B', 'B', 'B', 'G', 'G', 'G', 'P', 'P', 'E', 'E', 'I', 'I', 'I', 'U', 'K', 'I', 'K', 'Y', 'Y', 'Y', 'P', 'Y', 'U', 'Y', 'G', 'Y', 'C', 'C', 'C'],
  ['B', 'G', 'G', 'P', 'P', 'P', 'U', 'G', 'U', 'Y', 'U', 'Y', 'M', 'G', 'C', 'G', 'P', 'I', 'Y', 'Y', 'Y', 'Y', 'G', 'K', 'U', 'K', 'U', 'K', 'P', 'K', 'P', 'O', 'P', 'I', 'I', 'G', 'K', 'M', 'M', 'M', 'Y', 'Y', 'Y', 'Y', 'A', 'A', 'B', 'I', 'I', 'I', 'G', 'G', 'C', 'C', 'C', 'A', 'O', 'O', 'O', 'U', 'A', 'U', 'G'],
  ['E', 'E', 'U', 'E', 'U', 'E', 'G', 'U', 'P', 'G', 'G', 'B', 'G', 'U', 'E', 'P', 'E', 'P', 'P', 'P', 'P', 'P', 'A', 'I', 'Y', 'M', 'M', 'M', 'M', 'C', 'C', 'O', 'O', 'O', 'U', 'U', 'U', 'E', 'U', 'I', 'I', 'O', 'G', 'O', 'P', 'P', 'P', 'G', 'E', 'E', 'E', 'O', 'G', 'G', 'K', 'O', 'K', 'O', 'M', 'A', 'U', 'A', 'E'],
  ['U', 'P', 'U', 'I', 'I', 'U', 'I', 'U', 'K', 'K', 'P', 'P', 'P', 'B', 'G', 'P', 'G', 'C', 'G', 'P', 'P', 'P', 'P', 'C', 'K', 'I', 'I', 'I', 'I', 'O', 'O', 'O', 'G', 'Y', 'Y', 'M', 'O', 'M', 'G', 'G', 'O', 'G', 'E', 'G', 'E', 'C', 'C', 'C', 'G', 'A', 'M', 'U', 'B', 'B', 'B', 'A', 'B', 'K', 'K', 'K', 'E', 'O', 'E']
];
//     ['Y', 'C', 'G', 'G', 'C', 'I', 'E', 'C', 'B', 'E', 'C', 'C', 'B', 'C', 'G', 'B', 'C', 'C', 'B', 'C', 'C', 'C', 'A', 'C', 'C', 'A', 'A', 'A', 'K', 'A', 'B', 'I', 'A', 'U', 'B', 'M', 'A', 'U', 'G', 'G', 'G', 'M', 'M', 'E', 'C', 'M', 'G', 'E', 'P', 'M', 'E', 'E', 'P', 'M', 'E', 'P', 'U', 'A', 'B', 'U', 'M', 'A', 'Y'],
//     ['A', 'A', 'B', 'A', 'U', 'B', 'Y', 'E', 'U', 'B', 'E', 'E', 'B', 'A', 'M', 'M', 'E', 'I', 'M', 'E', 'O', 'I', 'G', 'O', 'K', 'G', 'O', 'I', 'U', 'G', 'O', 'U', 'I', 'G', 'O', 'I', 'I', 'O', 'O', 'G', 'U', 'O', 'G', 'U', 'M', 'G', 'G', 'U', 'M', 'C', 'U', 'M', 'K', 'C', 'U', 'M', 'K', 'U', 'M', 'I', 'A', 'U', 'P'],
//     ['Y', 'B', 'B', 'C', 'Y', 'B', 'C', 'M', 'A', 'U', 'M', 'O', 'U', 'U', 'M', 'O', 'U', 'I', 'O', 'C', 'Y', 'A', 'C', 'C', 'Y', 'C', 'C', 'Y', 'C', 'C', 'Y', 'Y', 'C', 'Y', 'G', 'B', 'B', 'G', 'U', 'O', 'B', 'P', 'U', 'B', 'B', 'P', 'O', 'B', 'E', 'K', 'K', 'B', 'K', 'K', 'Y', 'G', 'C', 'B', 'K', 'G', 'I', 'C', 'Y'],
//     ['M', 'M', 'A', 'I', 'M', 'A', 'I', 'B', 'I', 'I', 'B', 'I', 'I', 'I', 'I', 'I', 'O', 'U', 'I', 'K', 'A', 'C', 'I', 'B', 'C', 'C', 'I', 'A', 'C', 'K', 'A', 'A', 'K', 'O', 'A', 'C', 'G', 'Y', 'A', 'C', 'Y', 'G', 'Y', 'C', 'Y', 'G', 'Y', 'G', 'K', 'K', 'G', 'Y', 'I', 'G', 'G', 'I', 'K', 'Y', 'P', 'K', 'I', 'Y', 'P'],
//     ['O', 'B', 'C', 'O', 'B', 'C', 'O', 'B', 'Y', 'P', 'P', 'B', 'O', 'P', 'P', 'G', 'O', 'G', 'P', 'G', 'O', 'B', 'I', 'C', 'B', 'B', 'C', 'C', 'A', 'K', 'C', 'B', 'K', 'G', 'U', 'K', 'G', 'O', 'K', 'M', 'G', 'K', 'M', 'A', 'G', 'K', 'U', 'A', 'I', 'U', 'U', 'M', 'U', 'U', 'U', 'M', 'G', 'P', 'U', 'O', 'P', 'P', 'O'],
//     ['O', 'B', 'P', 'O', 'B', 'B', 'Y', 'Y', 'B', 'Y', 'Y', 'M', 'B', 'G', 'I', 'A', 'G', 'G', 'I', 'A', 'I', 'P', 'C', 'I', 'C', 'P', 'I', 'C', 'P', 'M', 'O', 'C', 'M', 'M', 'O', 'Y', 'M', 'M', 'Y', 'O', 'M', 'M', 'B', 'O', 'U', 'M', 'I', 'I', 'I', 'I', 'P', 'I', 'I', 'P', 'P', 'O', 'U', 'A', 'C', 'A', 'A', 'C', 'O'],
//     ['G', 'P', 'Y', 'G', 'P', 'O', 'Y', 'K', 'P', 'O', 'K', 'K', 'I', 'Y', 'K', 'I', 'B', 'B', 'U', 'I', 'B', 'M', 'I', 'B', 'G', 'I', 'I', 'E', 'C', 'I', 'M', 'C', 'U', 'U', 'Y', 'I', 'U', 'Y', 'Y', 'I', 'C', 'K', 'C', 'C', 'U', 'K', 'C', 'U', 'B', 'O', 'U', 'Y', 'B', 'U', 'U', 'B', 'E', 'U', 'U', 'B', 'E', 'Y', 'M'],
//     ['I', 'A', 'O', 'I', 'A', 'O', 'O', 'G', 'A', 'A', 'O', 'E', 'U', 'E', 'O', 'U', 'C', 'E', 'U', 'C', 'A', 'C', 'I', 'I', 'C', 'I', 'I', 'B', 'I', 'C', 'I', 'O', 'I', 'C', 'M', 'O', 'K', 'B', 'A', 'A', 'P', 'P', 'A', 'A', 'M', 'Y', 'B', 'M', 'Y', 'Y', 'B', 'Y', 'Y', 'C', 'C', 'Y', 'C', 'C', 'C', 'Y', 'K', 'C', 'Y'],
//     ['P', 'I', 'E', 'P', 'O', 'E', 'C', 'P', 'C', 'C', 'M', 'C', 'I', 'E', 'B', 'E', 'M', 'B', 'E', 'M', 'B', 'E', 'E', 'E', 'B', 'B', 'B', 'E', 'B', 'B', 'E', 'E', 'B', 'B', 'I', 'I', 'U', 'B', 'I', 'I', 'U', 'A', 'Y', 'K', 'U', 'Y', 'I', 'G', 'Y', 'Y', 'I', 'Y', 'Y', 'E', 'K', 'U', 'Y', 'E', 'G', 'E', 'E', 'E', 'E'],
//     ['A', 'M', 'G', 'A', 'O', 'G', 'I', 'P', 'G', 'G', 'I', 'P', 'G', 'G', 'A', 'G', 'A', 'A', 'A', 'A', 'C', 'A', 'K', 'C', 'U', 'K', 'C', 'U', 'K', 'I', 'E', 'A', 'I', 'I', 'B', 'G', 'P', 'I', 'G', 'G', 'P', 'Y', 'G', 'I', 'I', 'Y', 'G', 'G', 'C', 'Y', 'G', 'G', 'Y', 'Y', 'B', 'G', 'O', 'B', 'A', 'A', 'O', 'A', 'G'],
//     ['P', 'P', 'A', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'U', 'E', 'M', 'C', 'E', 'K', 'O', 'C', 'P', 'B', 'C', 'C', 'P', 'C', 'O', 'P', 'P', 'O', 'P', 'P', 'P', 'U', 'P', 'P', 'O', 'B', 'B', 'U', 'U', 'B', 'O', 'K', 'B', 'B', 'K', 'A', 'Y', 'M', 'A', 'E', 'Y', 'P', 'A', 'U', 'Y', 'I', 'U', 'U', 'P', 'Y', 'G', 'M', 'P'],
//     ['Y', 'G', 'C', 'P', 'Y', 'G', 'C', 'M', 'Y', 'I', 'C', 'E', 'O', 'C', 'U', 'E', 'K', 'C', 'I', 'K', 'K', 'I', 'K', 'K', 'B', 'M', 'E', 'B', 'M', 'E', 'E', 'B', 'E', 'U', 'I', 'G', 'U', 'I', 'G', 'U', 'U', 'M', 'G', 'U', 'M', 'O', 'G', 'E', 'O', 'A', 'E', 'I', 'A', 'G', 'E', 'I', 'K', 'E', 'E', 'E', 'K', 'E', 'C'],
//     ['G', 'A', 'G', 'O', 'A', 'K', 'O', 'A', 'K', 'K', 'O', 'A', 'K', 'K', 'O', 'P', 'K', 'K', 'A', 'B', 'G', 'G', 'M', 'B', 'P', 'M', 'C', 'A', 'I', 'C', 'A', 'I', 'Y', 'A', 'K', 'I', 'A', 'K', 'K', 'M', 'I', 'K', 'M', 'M', 'O', 'K', 'M', 'O', 'Y', 'Y', 'M', 'M', 'Y', 'Y', 'B', 'E', 'C', 'C', 'M', 'C', 'C', 'C', 'A'],
//     ['B', 'I', 'K', 'K', 'B', 'K', 'K', 'P', 'K', 'K', 'G', 'P', 'U', 'G', 'E', 'P', 'K', 'E', 'B', 'K', 'K', 'A', 'U', 'K', 'C', 'U', 'U', 'K', 'U', 'K', 'K', 'U', 'U', 'K', 'O', 'G', 'C', 'P', 'G', 'P', 'C', 'G', 'P', 'A', 'C', 'C', 'A', 'K', 'C', 'P', 'K', 'K', 'C', 'G', 'K', 'I', 'O', 'G', 'U', 'I', 'O', 'P', 'B'],
//     ['E', 'E', 'I', 'E', 'C', 'I', 'E', 'E', 'I', 'I', 'U', 'I', 'P', 'P', 'I', 'I', 'K', 'P', 'I', 'K', 'E', 'Y', 'Y', 'K', 'Y', 'G', 'Y', 'G', 'Y', 'I', 'G', 'G', 'I', 'U', 'C', 'O', 'U', 'C', 'C', 'I', 'C', 'C', 'G', 'I', 'C', 'U', 'K', 'O', 'O', 'C', 'B', 'O', 'O', 'K', 'B', 'O', 'O', 'K', 'A', 'M', 'K', 'A', 'A'],
//     ['P', 'P', 'E', 'Y', 'A', 'E', 'E', 'C', 'G', 'E', 'C', 'G', 'G', 'O', 'A', 'G', 'K', 'C', 'G', 'E', 'C', 'E', 'E', 'E', 'E', 'E', 'K', 'C', 'E', 'K', 'K', 'E', 'U', 'A', 'K', 'E', 'A', 'M', 'M', 'E', 'A', 'U', 'M', 'E', 'A', 'B', 'E', 'M', 'B', 'B', 'E', 'U', 'O', 'O', 'B', 'O', 'Y', 'B', 'B', 'E', 'Y', 'B', 'E'],
//     ['Y', 'B', 'A', 'A', 'Y', 'B', 'A', 'A', 'A', 'A', 'A', 'A', 'E', 'A', 'Y', 'A', 'I', 'Y', 'M', 'I', 'I', 'I', 'Y', 'G', 'G', 'K', 'G', 'G', 'O', 'P', 'P', 'O', 'P', 'P', 'P', 'O', 'B', 'P', 'O', 'B', 'M', 'O', 'O', 'B', 'M', 'E', 'U', 'C', 'E', 'E', 'E', 'C', 'C', 'O', 'P', 'K', 'O', 'O', 'K', 'U', 'C', 'C', 'U'],
//     ['A', 'B', 'G', 'I', 'B', 'B', 'I', 'O', 'B', 'I', 'I', 'I', 'I', 'Y', 'E', 'I', 'Y', 'E', 'M', 'I', 'A', 'M', 'I', 'P', 'M', 'M', 'I', 'P', 'I', 'K', 'I', 'P', 'K', 'K', 'P', 'Y', 'B', 'P', 'G', 'Y', 'B', 'U', 'I', 'M', 'U', 'U', 'I', 'C', 'U', 'M', 'K', 'U', 'M', 'I', 'U', 'U', 'E', 'I', 'U', 'K', 'B', 'I', 'M'],
//     ['P', 'G', 'K', 'A', 'G', 'G', 'A', 'U', 'G', 'G', 'P', 'Y', 'G', 'P', 'B', 'Y', 'Y', 'P', 'Y', 'Y', 'Y', 'O', 'B', 'G', 'Y', 'C', 'G', 'G', 'C', 'Y', 'G', 'M', 'G', 'O', 'B', 'B', 'G', 'O', 'B', 'U', 'Y', 'E', 'U', 'C', 'Y', 'E', 'P', 'U', 'E', 'P', 'U', 'U', 'P', 'P', 'U', 'K', 'G', 'G', 'K', 'C', 'G', 'K', 'I'],
//     ['P', 'B', 'B', 'K', 'K', 'B', 'K', 'K', 'A', 'A', 'K', 'I', 'A', 'C', 'I', 'B', 'O', 'O', 'P', 'B', 'O', 'O', 'E', 'A', 'I', 'M', 'C', 'I', 'I', 'C', 'C', 'I', 'C', 'P', 'I', 'I', 'C', 'O', 'K', 'C', 'C', 'O', 'K', 'C', 'P', 'O', 'M', 'C', 'O', 'B', 'I', 'O', 'K', 'I', 'I', 'K', 'E', 'M', 'A', 'B', 'E', 'A', 'B'],
//     ['B', 'B', 'M', 'B', 'B', 'M', 'B', 'G', 'M', 'Y', 'C', 'G', 'M', 'I', 'P', 'P', 'I', 'I', 'I', 'P', 'C', 'C', 'P', 'K', 'P', 'P', 'K', 'B', 'E', 'K', 'M', 'B', 'K', 'K', 'B', 'K', 'E', 'B', 'B', 'K', 'E', 'B', 'P', 'K', 'O', 'Y', 'P', 'K', 'P', 'P', 'G', 'E', 'P', 'I', 'B', 'P', 'P', 'O', 'B', 'P', 'O', 'O', 'B'],
//     ['M', 'K', 'P', 'G', 'O', 'K', 'P', 'O', 'O', 'M', 'K', 'O', 'O', 'K', 'K', 'O', 'O', 'K', 'Y', 'I', 'M', 'M', 'Y', 'A', 'M', 'M', 'A', 'A', 'A', 'A', 'A', 'A', 'C', 'A', 'O', 'P', 'O', 'A', 'O', 'O', 'K', 'Y', 'E', 'B', 'Y', 'E', 'B', 'E', 'Y', 'C', 'E', 'E', 'C', 'E', 'I', 'I', 'Y', 'U', 'B', 'Y', 'U', 'P', 'M'],
//     ['G', 'C', 'G', 'G', 'C', 'G', 'G', 'E', 'G', 'M', 'P', 'E', 'O', 'M', 'E', 'E', 'M', 'E', 'E', 'M', 'E', 'E', 'E', 'E', 'O', 'O', 'E', 'U', 'C', 'E', 'U', 'U', 'C', 'E', 'U', 'K', 'C', 'C', 'I', 'K', 'M', 'K', 'I', 'A', 'U', 'G', 'E', 'A', 'G', 'G', 'B', 'I', 'U', 'P', 'O', 'U', 'U', 'P', 'U', 'I', 'O', 'P', 'E'],
//     ['E', 'P', 'G', 'G', 'K', 'G', 'G', 'K', 'K', 'G', 'P', 'K', 'K', 'P', 'P', 'I', 'O', 'P', 'M', 'O', 'A', 'M', 'M', 'M', 'A', 'G', 'Y', 'K', 'E', 'G', 'K', 'O', 'E', 'K', 'A', 'M', 'C', 'Y', 'M', 'M', 'P', 'C', 'M', 'E', 'P', 'C', 'M', 'M', 'M', 'M', 'E', 'M', 'M', 'E', 'M', 'G', 'M', 'Y', 'G', 'G', 'Y', 'M', 'P'],
//     ['K', 'I', 'B', 'C', 'U', 'I', 'B', 'I', 'Y', 'B', 'I', 'Y', 'B', 'B', 'Y', 'A', 'K', 'B', 'Y', 'C', 'K', 'K', 'Y', 'E', 'E', 'K', 'E', 'C', 'C', 'K', 'E', 'C', 'K', 'K', 'C', 'C', 'P', 'C', 'C', 'E', 'G', 'C', 'C', 'G', 'C', 'B', 'G', 'G', 'C', 'G', 'C', 'K', 'I', 'B', 'K', 'K', 'M', 'K', 'M', 'M', 'M', 'M', 'C'],
//     ['O', 'M', 'E', 'Y', 'M', 'M', 'Y', 'M', 'B', 'Y', 'M', 'B', 'M', 'M', 'C', 'B', 'E', 'C', 'C', 'G', 'C', 'U', 'G', 'G', 'C', 'G', 'G', 'U', 'C', 'C', 'P', 'G', 'G', 'C', 'A', 'G', 'G', 'A', 'A', 'G', 'Y', 'B', 'A', 'G', 'B', 'B', 'M', 'G', 'A', 'M', 'M', 'Y', 'A', 'M', 'M', 'G', 'K', 'I', 'U', 'U', 'I', 'U', 'I'],
//     ['M', 'A', 'U', 'I', 'A', 'U', 'Y', 'I', 'I', 'Y', 'U', 'I', 'A', 'Y', 'C', 'A', 'U', 'G', 'C', 'A', 'U', 'M', 'U', 'I', 'M', 'G', 'U', 'I', 'K', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'B', 'B', 'E', 'B', 'B', 'P', 'E', 'O', 'P', 'U', 'O', 'P', 'A', 'O', 'A', 'I', 'B', 'O', 'E', 'B', 'B', 'E', 'E', 'P', 'B'],
//     ['P', 'M', 'C', 'M', 'U', 'C', 'O', 'M', 'C', 'O', 'O', 'M', 'C', 'O', 'O', 'C', 'Y', 'E', 'U', 'Y', 'E', 'B', 'P', 'Y', 'E', 'B', 'E', 'E', 'I', 'B', 'A', 'B', 'A', 'C', 'M', 'A', 'C', 'C', 'A', 'G', 'C', 'A', 'G', 'U', 'C', 'C', 'K', 'U', 'C', 'C', 'I', 'I', 'C', 'I', 'I', 'I', 'G', 'I', 'P', 'G', 'P', 'Y', 'A'],
//     ['E', 'C', 'U', 'E', 'E', 'U', 'P', 'E', 'U', 'U', 'A', 'I', 'C', 'A', 'I', 'U', 'K', 'O', 'U', 'U', 'O', 'E', 'U', 'O', 'O', 'Y', 'U', 'O', 'Y', 'Y', 'M', 'G', 'Y', 'P', 'K', 'U', 'Y', 'P', 'U', 'U', 'C', 'O', 'U', 'M', 'P', 'P', 'U', 'M', 'P', 'Y', 'Y', 'Y', 'P', 'Y', 'M', 'P', 'U', 'C', 'Y', 'A', 'U', 'Y', 'A'],
//     ['B', 'E', 'B', 'C', 'E', 'G', 'C', 'E', 'B', 'G', 'C', 'B', 'G', 'G', 'K', 'E', 'G', 'I', 'E', 'E', 'G', 'I', 'B', 'C', 'I', 'I', 'B', 'B', 'M', 'K', 'B', 'B', 'K', 'B', 'I', 'M', 'B', 'I', 'I', 'Y', 'K', 'I', 'I', 'K', 'P', 'M', 'B', 'K', 'M', 'M', 'I', 'B', 'K', 'M', 'I', 'M', 'M', 'M', 'M', 'K', 'I', 'M', 'K'],
//     ['E', 'O', 'A', 'C', 'E', 'C', 'C', 'C', 'I', 'O', 'C', 'C', 'O', 'C', 'C', 'U', 'O', 'U', 'C', 'Y', 'U', 'U', 'C', 'U', 'P', 'K', 'K', 'E', 'K', 'P', 'P', 'G', 'P', 'P', 'U', 'G', 'P', 'P', 'B', 'Y', 'I', 'P', 'Y', 'I', 'I', 'Y', 'P', 'E', 'Y', 'Y', 'U', 'Y', 'Y', 'U', 'U', 'Y', 'M', 'K', 'E', 'Y', 'G', 'E', 'M'],
//     ['B', 'A', 'G', 'B', 'A', 'A', 'G', 'B', 'M', 'I', 'C', 'M', 'E', 'C', 'B', 'E', 'B', 'C', 'P', 'B', 'Y', 'G', 'P', 'Y', 'P', 'A', 'Y', 'B', 'P', 'C', 'Y', 'K', 'C', 'C', 'A', 'C', 'C', 'Y', 'A', 'C', 'I', 'Y', 'A', 'I', 'I', 'P', 'I', 'P', 'P', 'Y', 'I', 'P', 'E', 'U', 'G', 'E', 'U', 'U', 'G', 'U', 'U', 'A', 'G'],
//     ['U', 'O', 'E', 'U', 'U', 'E', 'O', 'U', 'U', 'P', 'U', 'G', 'P', 'B', 'U', 'G', 'B', 'B', 'O', 'G', 'M', 'M', 'K', 'O', 'M', 'I', 'K', 'G', 'G', 'K', 'G', 'G', 'Y', 'K', 'C', 'Y', 'E', 'K', 'C', 'E', 'K', 'K', 'O', 'K', 'K', 'K', 'G', 'A', 'P', 'E', 'Y', 'P', 'E', 'Y', 'G', 'P', 'Y', 'G', 'G', 'P', 'Y', 'E', 'C'],
//     ['E', 'E', 'U', 'U', 'E', 'E', 'U', 'U', 'U', 'B', 'U', 'G', 'B', 'C', 'G', 'G', 'G', 'C', 'C', 'U', 'U', 'U', 'U', 'I', 'Y', 'U', 'I', 'P', 'P', 'I', 'P', 'P', 'E', 'I', 'P', 'P', 'P', 'E', 'K', 'K', 'P', 'U', 'E', 'I', 'U', 'K', 'I', 'U', 'U', 'I', 'I', 'U', 'U', 'B', 'I', 'M', 'I', 'I', 'I', 'C', 'I', 'E', 'C'],
//     ['O', 'Y', 'M', 'O', 'O', 'M', 'M', 'C', 'M', 'A', 'C', 'M', 'M', 'C', 'I', 'M', 'M', 'A', 'I', 'M', 'Y', 'I', 'E', 'K', 'A', 'I', 'E', 'C', 'C', 'A', 'E', 'O', 'C', 'A', 'M', 'Y', 'Y', 'A', 'E', 'Y', 'C', 'E', 'I', 'C', 'A', 'I', 'P', 'A', 'A', 'I', 'I', 'A', 'C', 'I', 'I', 'C', 'E', 'Y', 'K', 'E', 'E', 'K', 'E'],
//     ['P', 'B', 'U', 'K', 'B', 'O', 'C', 'B', 'B', 'C', 'C', 'B', 'M', 'A', 'A', 'M', 'M', 'A', 'M', 'M', 'A', 'A', 'M', 'K', 'A', 'K', 'M', 'I', 'A', 'E', 'I', 'I', 'P', 'E', 'G', 'P', 'Y', 'G', 'B', 'P', 'E', 'G', 'U', 'O', 'K', 'Y', 'I', 'K', 'K', 'I', 'E', 'K', 'G', 'A', 'B', 'K', 'A', 'B', 'E', 'K', 'U', 'E', 'E'],
//     ['E', 'P', 'Y', 'A', 'P', 'P', 'C', 'A', 'I', 'C', 'C', 'A', 'C', 'B', 'A', 'C', 'C', 'G', 'P', 'M', 'A', 'P', 'M', 'A', 'O', 'M', 'M', 'B', 'B', 'M', 'B', 'B', 'B', 'B', 'K', 'A', 'A', 'K', 'K', 'A', 'O', 'K', 'K', 'A', 'A', 'M', 'G', 'A', 'A', 'E', 'P', 'M', 'E', 'O', 'K', 'O', 'C', 'K', 'K', 'O', 'C', 'K', 'E'],
//     ['O', 'G', 'Y', 'O', 'G', 'C', 'O', 'C', 'C', 'Y', 'Y', 'Y', 'G', 'Y', 'G', 'G', 'C', 'G', 'G', 'G', 'U', 'A', 'G', 'U', 'K', 'A', 'Y', 'Y', 'U', 'U', 'U', 'A', 'U', 'K', 'U', 'K', 'E', 'K', 'K', 'U', 'C', 'K', 'U', 'C', 'C', 'Y', 'Y', 'Y', 'C', 'Y', 'Y', 'Y', 'C', 'Y', 'Y', 'K', 'Y', 'A', 'Y', 'K', 'Y', 'M', 'E'],
//     ['C', 'C', 'M', 'E', 'C', 'C', 'I', 'C', 'U', 'U', 'C', 'U', 'B', 'C', 'U', 'A', 'B', 'C', 'U', 'K', 'K', 'O', 'E', 'P', 'O', 'O', 'E', 'A', 'P', 'C', 'A', 'P', 'C', 'C', 'A', 'P', 'U', 'A', 'P', 'P', 'U', 'P', 'P', 'U', 'M', 'A', 'U', 'Y', 'E', 'A', 'C', 'Y', 'M', 'C', 'C', 'M', 'M', 'C', 'C', 'C', 'I', 'O', 'C'],
//     ['A', 'P', 'C', 'A', 'A', 'O', 'C', 'O', 'O', 'O', 'C', 'C', 'O', 'B', 'C', 'I', 'I', 'E', 'I', 'U', 'K', 'K', 'G', 'U', 'K', 'K', 'U', 'G', 'K', 'U', 'U', 'K', 'U', 'I', 'K', 'K', 'U', 'Y', 'C', 'M', 'Y', 'C', 'Y', 'M', 'K', 'Y', 'B', 'P', 'K', 'B', 'B', 'B', 'A', 'B', 'B', 'A', 'C', 'B', 'E', 'U', 'C', 'I', 'O'],
//     ['Y', 'Y', 'Y', 'U', 'U', 'U', 'U', 'B', 'I', 'I', 'O', 'I', 'C', 'C', 'P', 'A', 'G', 'A', 'A', 'M', 'A', 'Y', 'A', 'U', 'U', 'P', 'C', 'O', 'O', 'O', 'O', 'O', 'I', 'O', 'M', 'E', 'M', 'E', 'Y', 'K', 'Y', 'K', 'C', 'C', 'P', 'C', 'E', 'E', 'E', 'G', 'E', 'G', 'K', 'M', 'C', 'C', 'U', 'U', 'G', 'G', 'G', 'P', 'U']
//   ];

let possibleStimuliList2_nback = 
  [ // 20 2-backs, 10 3-backs, 10 1-backs
  ['G', 'O', 'G', 'P', 'P', 'G', 'M', 'C', 'C', 'B', 'A', 'M', 'B', 'M', 'B', 'M', 'M', 'C', 'M', 'B', 'C', 'B', 'O', 'O', 'A', 'U', 'A', 'U', 'A', 'I', 'A', 'I', 'A', 'A', 'G', 'G', 'O', 'A', 'O', 'U', 'C', 'U', 'C', 'C', 'P', 'Y', 'C', 'Y', 'O', 'E', 'Y', 'E', 'P', 'O', 'M', 'O', 'K', 'O', 'O', 'U', 'U', 'U', 'G'],
  ['E', 'C', 'E', 'K', 'Y', 'K', 'Y', 'K', 'Y', 'I', 'U', 'O', 'I', 'Y', 'A', 'Y', 'E', 'M', 'Y', 'M', 'G', 'Y', 'G', 'G', 'B', 'P', 'G', 'E', 'B', 'K', 'E', 'E', 'E', 'G', 'G', 'E', 'G', 'P', 'P', 'A', 'G', 'A', 'G', 'B', 'U', 'M', 'M', 'M', 'O', 'P', 'M', 'P', 'M', 'Y', 'Y', 'Y', 'Y', 'E', 'A', 'E', 'A', 'Y', 'A'],
  ['K', 'K', 'B', 'P', 'B', 'P', 'K', 'P', 'K', 'U', 'G', 'Y', 'G', 'Y', 'M', 'K', 'O', 'B', 'B', 'B', 'Y', 'B', 'Y', 'O', 'B', 'O', 'O', 'B', 'O', 'B', 'G', 'U', 'G', 'C', 'U', 'G', 'B', 'B', 'G', 'I', 'G', 'I', 'P', 'G', 'P', 'U', 'Y', 'Y', 'Y', 'M', 'K', 'K', 'B', 'P', 'P', 'A', 'M', 'A', 'M', 'U', 'O', 'U', 'U'],
  ['C', 'C', 'K', 'K', 'I', 'I', 'I', 'A', 'E', 'P', 'B', 'B', 'B', 'O', 'G', 'E', 'G', 'P', 'E', 'P', 'E', 'P', 'O', 'E', 'P', 'K', 'E', 'K', 'E', 'K', 'E', 'K', 'M', 'P', 'Y', 'P', 'Y', 'Y', 'I', 'Y', 'Y', 'O', 'O', 'B', 'O', 'C', 'C', 'I', 'M', 'B', 'G', 'O', 'I', 'G', 'I', 'K', 'E', 'K', 'E', 'A', 'K', 'A', 'K'],
  ['U', 'C', 'U', 'C', 'A', 'P', 'A', 'P', 'G', 'G', 'M', 'G', 'P', 'O', 'K', 'O', 'Y', 'Y', 'O', 'M', 'E', 'M', 'E', 'P', 'U', 'E', 'U', 'E', 'A', 'E', 'A', 'A', 'A', 'A', 'U', 'B', 'U', 'Y', 'U', 'A', 'K', 'U', 'A', 'A', 'A', 'G', 'U', 'G', 'P', 'I', 'P', 'M', 'I', 'P', 'E', 'B', 'I', 'Y', 'Y', 'I', 'I', 'I', 'O'],
  ['P', 'I', 'P', 'I', 'P', 'I', 'B', 'I', 'O', 'Y', 'P', 'Y', 'A', 'Y', 'A', 'A', 'Y', 'A', 'I', 'Y', 'U', 'U', 'G', 'A', 'A', 'K', 'K', 'I', 'I', 'M', 'B', 'U', 'O', 'B', 'P', 'O', 'P', 'B', 'O', 'B', 'E', 'C', 'E', 'C', 'E', 'C', 'E', 'E', 'M', 'E', 'O', 'A', 'A', 'I', 'I', 'K', 'M', 'M', 'M', 'I', 'M', 'I', 'P'],
  ['K', 'B', 'Y', 'B', 'Y', 'B', 'Y', 'Y', 'B', 'C', 'G', 'C', 'G', 'G', 'Y', 'G', 'Y', 'U', 'U', 'P', 'E', 'M', 'C', 'M', 'A', 'C', 'A', 'P', 'C', 'M', 'I', 'I', 'I', 'Y', 'M', 'Y', 'E', 'Y', 'A', 'M', 'B', 'M', 'M', 'P', 'P', 'Y', 'A', 'Y', 'O', 'O', 'P', 'O', 'P', 'Y', 'E', 'Y', 'Y', 'C', 'Y', 'C', 'M', 'M', 'B'],
  ['C', 'U', 'Y', 'U', 'Y', 'U', 'M', 'Y', 'Y', 'K', 'B', 'P', 'B', 'P', 'B', 'P', 'O', 'B', 'B', 'O', 'B', 'P', 'E', 'Y', 'E', 'G', 'E', 'G', 'A', 'A', 'I', 'A', 'C', 'Y', 'U', 'B', 'U', 'B', 'B', 'K', 'B', 'K', 'K', 'K', 'E', 'G', 'M', 'E', 'E', 'I', 'Y', 'O', 'Y', 'B', 'O', 'O', 'P', 'P', 'P', 'M', 'K', 'O', 'K'],
  ['A', 'O', 'B', 'A', 'A', 'U', 'E', 'I', 'G', 'I', 'Y', 'O', 'Y', 'I', 'I', 'O', 'I', 'Y', 'O', 'P', 'G', 'K', 'G', 'K', 'G', 'U', 'G', 'U', 'B', 'G', 'B', 'B', 'A', 'C', 'A', 'C', 'C', 'Y', 'Y', 'Y', 'U', 'P', 'I', 'P', 'P', 'Y', 'P', 'Y', 'K', 'P', 'K', 'E', 'K', 'E', 'E', 'Y', 'U', 'K', 'U', 'C', 'E', 'E', 'E'], 
  ['I', 'K', 'I', 'I', 'I', 'B', 'G', 'B', 'O', 'K', 'O', 'K', 'K', 'B', 'A', 'A', 'C', 'E', 'I', 'E', 'A', 'M', 'G', 'Y', 'B', 'Y', 'C', 'P', 'C', 'E', 'C', 'E', 'C', 'C', 'O', 'C', 'B', 'B', 'B', 'B', 'U', 'K', 'B', 'U', 'B', 'M', 'C', 'B', 'O', 'C', 'O', 'A', 'A', 'A', 'P', 'M', 'P', 'M', 'A', 'Y', 'C', 'A', 'C'], 
  ['M', 'A', 'M', 'K', 'A', 'M', 'O', 'A', 'I', 'A', 'I', 'K', 'A', 'C', 'A', 'Y', 'A', 'I', 'Y', 'I', 'B', 'B', 'B', 'B', 'U', 'K', 'I', 'I', 'I', 'E', 'Y', 'E', 'Y', 'Y', 'O', 'O', 'K', 'P', 'K', 'P', 'E', 'Y', 'E', 'Y', 'Y', 'E', 'K', 'E', 'K', 'B', 'O', 'O', 'A', 'A', 'B', 'G', 'B', 'G', 'C', 'I', 'C', 'Y', 'I'],
  ['O', 'M', 'O', 'A', 'O', 'A', 'E', 'A', 'E', 'B', 'E', 'B', 'O', 'M', 'Y', 'A', 'M', 'A', 'M', 'O', 'O', 'M', 'O', 'P', 'O', 'P', 'O', 'P', 'M', 'G', 'I', 'M', 'G', 'M', 'M', 'I', 'I', 'U', 'I', 'E', 'K', 'A', 'K', 'A', 'A', 'K', 'K', 'K', 'O', 'U', 'U', 'O', 'O', 'E', 'B', 'G', 'G', 'A', 'A', 'Y', 'C', 'P', 'C'], 
  ['E', 'C', 'E', 'C', 'C', 'E', 'E', 'K', 'K', 'M', 'U', 'G', 'P', 'K', 'G', 'K', 'B', 'K', 'B', 'M', 'E', 'U', 'A', 'M', 'A', 'A', 'A', 'Y', 'E', 'I', 'E', 'U', 'U', 'E', 'U', 'U', 'P', 'I', 'I', 'C', 'I', 'C', 'G', 'Y', 'G', 'Y', 'K', 'B', 'K', 'C', 'I', 'C', 'I', 'C', 'C', 'C', 'M', 'C', 'Y', 'K', 'A', 'K', 'B'], 
  ['M', 'B', 'M', 'B', 'B', 'U', 'Y', 'A', 'Y', 'K', 'P', 'U', 'I', 'G', 'I', 'G', 'I', 'Y', 'I', 'I', 'Y', 'Y', 'G', 'Y', 'B', 'M', 'C', 'I', 'C', 'E', 'C', 'C', 'K', 'C', 'K', 'B', 'B', 'I', 'I', 'C', 'I', 'G', 'G', 'G', 'A', 'G', 'A', 'K', 'K', 'K', 'U', 'B', 'A', 'E', 'M', 'E', 'M', 'E', 'P', 'K', 'U', 'P', 'K'],
  ['A', 'P', 'A', 'M', 'O', 'C', 'B', 'C', 'B', 'C', 'C', 'Y', 'C', 'Y', 'A', 'C', 'Y', 'Y', 'K', 'K', 'K', 'B', 'Y', 'U', 'Y', 'M', 'A', 'M', 'M', 'M', 'O', 'B', 'O', 'C', 'B', 'E', 'Y', 'U', 'U', 'U', 'G', 'M', 'G', 'M', 'I', 'G', 'C', 'G', 'G', 'K', 'G', 'B', 'G', 'K', 'Y', 'K', 'M', 'K', 'K', 'P', 'U', 'Y', 'U'],
  ['K', 'G', 'Y', 'A', 'P', 'A', 'I', 'G', 'I', 'K', 'I', 'P', 'K', 'K', 'U', 'C', 'O', 'E', 'O', 'E', 'Y', 'A', 'Y', 'A', 'A', 'A', 'C', 'B', 'C', 'E', 'E', 'C', 'E', 'I', 'I', 'I', 'I', 'P', 'I', 'P', 'A', 'E', 'P', 'U', 'U', 'Y', 'I', 'Y', 'B', 'Y', 'B', 'C', 'B', 'U', 'M', 'B', 'M', 'M', 'A', 'P', 'A', 'A', 'G'],
  ['O', 'Y', 'O', 'E', 'O', 'O', 'M', 'K', 'E', 'K', 'U', 'G', 'U', 'C', 'G', 'G', 'Y', 'Y', 'Y', 'C', 'P', 'C', 'P', 'G', 'P', 'C', 'U', 'M', 'U', 'M', 'U', 'P', 'M', 'E', 'A', 'E', 'E', 'U', 'E', 'U', 'U', 'U', 'U', 'Y', 'E', 'P', 'P', 'K', 'C', 'U', 'C', 'U', 'I', 'P', 'C', 'Y', 'C', 'C', 'Y', 'C', 'O', 'K', 'A'], 
  ['P', 'P', 'G', 'P', 'O', 'P', 'O', 'B', 'Y', 'E', 'Y', 'A', 'Y', 'U', 'B', 'K', 'U', 'G', 'I', 'G', 'E', 'B', 'G', 'E', 'G', 'U', 'G', 'K', 'G', 'U', 'G', 'U', 'P', 'B', 'G', 'B', 'G', 'G', 'G', 'O', 'K', 'A', 'A', 'A', 'M', 'A', 'M', 'A', 'A', 'M', 'U', 'G', 'U', 'C', 'E', 'E', 'C', 'C', 'C', 'O', 'O', 'C', 'P'],
  ['O', 'U', 'M', 'U', 'U', 'P', 'B', 'B', 'G', 'I', 'G', 'C', 'E', 'G', 'E', 'E', 'E', 'A', 'G', 'B', 'M', 'B', 'A', 'G', 'A', 'P', 'Y', 'P', 'Y', 'P', 'Y', 'P', 'I', 'Y', 'Y', 'K', 'O', 'C', 'B', 'C', 'C', 'O', 'U', 'B', 'P', 'B', 'B', 'P', 'B', 'E', 'M', 'M', 'C', 'M', 'C', 'C', 'C', 'K', 'Y', 'K', 'I', 'K', 'I'],
  ['B', 'G', 'C', 'G', 'C', 'A', 'A', 'A', 'E', 'E', 'M', 'E', 'E', 'G', 'E', 'G', 'I', 'B', 'I', 'A', 'I', 'A', 'I', 'I', 'E', 'C', 'C', 'C', 'U', 'Y', 'E', 'Y', 'C', 'A', 'Y', 'C', 'U', 'C', 'B', 'C', 'B', 'E', 'A', 'M', 'A', 'M', 'M', 'G', 'I', 'U', 'G', 'U', 'A', 'P', 'A', 'I', 'Y', 'A', 'I', 'I', 'I', 'G', 'Y'],
  ['G', 'Y', 'P', 'P', 'E', 'C', 'U', 'C', 'U', 'P', 'U', 'P', 'A', 'M', 'O', 'A', 'M', 'P', 'A', 'P', 'O', 'G', 'O', 'O', 'O', 'B', 'P', 'B', 'P', 'M', 'P', 'M', 'M', 'M', 'A', 'K', 'A', 'K', 'U', 'U', 'G', 'E', 'E', 'B', 'E', 'P', 'M', 'P', 'M', 'P', 'K', 'P', 'O', 'K', 'P', 'O', 'O', 'G', 'O', 'A', 'A', 'C', 'C'],
  ['G', 'G', 'C', 'G', 'G', 'G', 'O', 'O', 'E', 'M', 'Y', 'K', 'Y', 'Y', 'E', 'K', 'E', 'O', 'B', 'G', 'B', 'G', 'E', 'M', 'G', 'Y', 'G', 'Y', 'G', 'P', 'G', 'E', 'I', 'E', 'I', 'I', 'E', 'A', 'I', 'U', 'I', 'U', 'U', 'U', 'U', 'P', 'O', 'M', 'A', 'K', 'A', 'Y', 'E', 'Y', 'E', 'P', 'Y', 'O', 'E', 'O', 'U', 'I', 'I'],
  ['U', 'C', 'G', 'I', 'G', 'I', 'B', 'I', 'B', 'P', 'B', 'P', 'I', 'A', 'A', 'A', 'A', 'E', 'A', 'E', 'K', 'K', 'K', 'M', 'G', 'G', 'I', 'K', 'M', 'U', 'K', 'K', 'C', 'Y', 'C', 'Y', 'Y', 'K', 'Y', 'U', 'I', 'Y', 'I', 'I', 'P', 'C', 'C', 'P', 'C', 'B', 'K', 'M', 'B', 'I', 'U', 'K', 'U', 'G', 'U', 'G', 'Y', 'B', 'Y'],
  ['U', 'C', 'K', 'K', 'C', 'P', 'P', 'A', 'E', 'A', 'M', 'A', 'M', 'K', 'A', 'I', 'K', 'I', 'A', 'I', 'Y', 'A', 'Y', 'M', 'Y', 'K', 'A', 'A', 'P', 'A', 'P', 'O', 'A', 'O', 'M', 'O', 'G', 'O', 'G', 'B', 'G', 'B', 'B', 'I', 'Y', 'I', 'Y', 'A', 'Y', 'Y', 'A', 'A', 'O', 'O', 'E', 'O', 'B', 'B', 'P', 'P', 'P', 'U', 'K'],
  ['G', 'I', 'G', 'I', 'K', 'U', 'O', 'O', 'U', 'G', 'P', 'G', 'G', 'A', 'O', 'K', 'O', 'P', 'P', 'U', 'A', 'U', 'U', 'O', 'O', 'C', 'C', 'K', 'B', 'O', 'B', 'O', 'O', 'C', 'O', 'U', 'G', 'O', 'K', 'P', 'K', 'G', 'K', 'G', 'G', 'K', 'K', 'K', 'B', 'K', 'B', 'C', 'P', 'B', 'I', 'K', 'I', 'E', 'I', 'E', 'I', 'E', 'I'],
  ['U', 'M', 'U', 'M', 'U', 'P', 'P', 'U', 'Y', 'E', 'E', 'E', 'I', 'B', 'I', 'B', 'B', 'I', 'B', 'G', 'B', 'C', 'B', 'C', 'I', 'U', 'U', 'E', 'E', 'O', 'Y', 'O', 'C', 'O', 'M', 'P', 'K', 'B', 'K', 'B', 'E', 'Y', 'E', 'B', 'B', 'E', 'B', 'I', 'E', 'O', 'Y', 'Y', 'A', 'U', 'Y', 'A', 'Y', 'Y', 'Y', 'I', 'P', 'I', 'P'],
  ['B', 'P', 'P', 'P', 'O', 'K', 'O', 'K', 'O', 'U', 'A', 'O', 'I', 'C', 'O', 'C', 'P', 'E', 'C', 'E', 'C', 'E', 'C', 'C', 'P', 'C', 'P', 'M', 'C', 'C', 'G', 'G', 'G', 'O', 'K', 'M', 'C', 'B', 'Y', 'E', 'B', 'I', 'Y', 'M', 'A', 'M', 'A', 'G', 'A', 'I', 'G', 'I', 'B', 'E', 'B', 'B', 'B', 'E', 'C', 'C', 'C', 'Y', 'C'],
  ['I', 'I', 'G', 'I', 'I', 'K', 'I', 'M', 'M', 'O', 'M', 'K', 'U', 'O', 'U', 'M', 'U', 'B', 'M', 'U', 'M', 'G', 'P', 'B', 'P', 'O', 'P', 'O', 'P', 'C', 'P', 'P', 'Y', 'E', 'Y', 'O', 'Y', 'Y', 'Y', 'G', 'P', 'P', 'P', 'M', 'B', 'B', 'Y', 'G', 'Y', 'G', 'C', 'B', 'E', 'P', 'A', 'P', 'A', 'U', 'U', 'A', 'U', 'C', 'I'],
  ['B', 'P', 'P', 'P', 'O', 'K', 'O', 'K', 'O', 'U', 'A', 'O', 'I', 'C', 'O', 'C', 'P', 'E', 'C', 'E', 'C', 'E', 'C', 'C', 'P', 'C', 'P', 'M', 'C', 'C', 'G', 'G', 'G', 'O', 'K', 'M', 'C', 'B', 'Y', 'E', 'B', 'I', 'Y', 'M', 'A', 'M', 'A', 'G', 'A', 'I', 'G', 'I', 'B', 'E', 'B', 'B', 'B', 'E', 'C', 'C', 'C', 'Y', 'C'],
  ['Y', 'Y', 'M', 'M', 'B', 'M', 'G', 'B', 'G', 'U', 'G', 'A', 'G', 'O', 'G', 'O', 'I', 'I', 'O', 'K', 'G', 'K', 'K', 'K', 'Y', 'U', 'Y', 'G', 'M', 'G', 'M', 'B', 'B', 'P', 'K', 'K', 'G', 'K', 'Y', 'U', 'Y', 'G', 'G', 'Y', 'G', 'G', 'U', 'M', 'U', 'M', 'B', 'G', 'B', 'G', 'E', 'B', 'E', 'K', 'E', 'C', 'C', 'E', 'Y'],
  ['C', 'B', 'B', 'C', 'Y', 'Y', 'U', 'O', 'O', 'I', 'O', 'A', 'C', 'I', 'C', 'O', 'I', 'I', 'A', 'I', 'P', 'U', 'A', 'U', 'Y', 'U', 'Y', 'P', 'C', 'P', 'C', 'P', 'C', 'C', 'B', 'C', 'B', 'C', 'C', 'K', 'I', 'K', 'O', 'K', 'K', 'K', 'U', 'U', 'G', 'U', 'E', 'Y', 'E', 'C', 'B', 'C', 'K', 'E', 'C', 'E', 'Y', 'P', 'P'],
  ['M', 'U', 'P', 'M', 'I', 'I', 'A', 'P', 'U', 'P', 'E', 'C', 'B', 'C', 'I', 'B', 'I', 'P', 'B', 'P', 'M', 'B', 'A', 'P', 'E', 'P', 'E', 'P', 'C', 'C', 'P', 'P', 'K', 'K', 'K', 'U', 'E', 'U', 'E', 'I', 'B', 'A', 'B', 'A', 'A', 'P', 'A', 'P', 'O', 'O', 'U', 'Y', 'U', 'Y', 'Y', 'Y', 'C', 'Y', 'C', 'K', 'C', 'C', 'O'],
  ['B', 'A', 'B', 'A', 'B', 'I', 'A', 'I', 'G', 'O', 'O', 'O', 'U', 'U', 'M', 'I', 'E', 'I', 'P', 'E', 'A', 'E', 'I', 'A', 'M', 'A', 'M', 'A', 'M', 'M', 'E', 'M', 'E', 'B', 'B', 'O', 'G', 'O', 'O', 'G', 'C', 'A', 'O', 'O', 'A', 'P', 'M', 'O', 'P', 'O', 'C', 'M', 'C', 'P', 'P', 'P', 'B', 'B', 'P', 'E', 'P', 'E', 'P'],
  ['B', 'U', 'B', 'M', 'E', 'M', 'O', 'I', 'M', 'M', 'G', 'M', 'G', 'M', 'G', 'M', 'M', 'M', 'M', 'U', 'M', 'C', 'P', 'M', 'O', 'K', 'O', 'I', 'O', 'M', 'U', 'O', 'C', 'C', 'Y', 'A', 'G', 'A', 'I', 'I', 'B', 'P', 'Y', 'P', 'E', 'E', 'M', 'E', 'U', 'G', 'Y', 'G', 'K', 'G', 'G', 'G', 'P', 'O', 'Y', 'Y', 'K', 'Y', 'K'],
  ['G', 'M', 'K', 'G', 'C', 'O', 'O', 'O', 'G', 'G', 'B', 'Y', 'I', 'A', 'Y', 'B', 'A', 'B', 'A', 'B', 'A', 'O', 'A', 'A', 'A', 'C', 'M', 'C', 'B', 'C', 'G', 'Y', 'G', 'G', 'I', 'G', 'A', 'A', 'A', 'K', 'U', 'K', 'U', 'M', 'M', 'K', 'M', 'K', 'I', 'U', 'K', 'U', 'O', 'I', 'E', 'I', 'E', 'K', 'E', 'E', 'Y', 'B', 'E'],
  ['P', 'E', 'C', 'E', 'C', 'I', 'E', 'U', 'I', 'E', 'E', 'E', 'K', 'E', 'K', 'E', 'I', 'B', 'U', 'Y', 'G', 'Y', 'O', 'M', 'O', 'M', 'G', 'M', 'K', 'B', 'M', 'M', 'P', 'A', 'P', 'A', 'E', 'E', 'A', 'E', 'A', 'G', 'U', 'A', 'A', 'A', 'Y', 'G', 'G', 'K', 'K', 'E', 'K', 'E', 'U', 'G', 'U', 'M', 'G', 'M', 'E', 'E', 'E'],
  ['P', 'E', 'C', 'E', 'O', 'E', 'O', 'A', 'O', 'A', 'O', 'E', 'E', 'G', 'A', 'A', 'M', 'A', 'C', 'U', 'G', 'G', 'K', 'O', 'O', 'K', 'O', 'O', 'A', 'O', 'A', 'O', 'U', 'G', 'K', 'K', 'K', 'I', 'P', 'O', 'P', 'O', 'P', 'U', 'O', 'P', 'M', 'O', 'M', 'O', 'M', 'B', 'B', 'P', 'B', 'P', 'P', 'G', 'C', 'C', 'O', 'M', 'E'],
  ['B', 'U', 'G', 'U', 'G', 'G', 'A', 'A', 'E', 'C', 'E', 'C', 'E', 'M', 'A', 'M', 'A', 'M', 'M', 'A', 'G', 'O', 'G', 'A', 'E', 'A', 'A', 'A', 'O', 'K', 'O', 'K', 'I', 'K', 'I', 'O', 'K', 'O', 'P', 'Y', 'Y', 'M', 'Y', 'M', 'G', 'U', 'Y', 'G', 'U', 'O', 'M', 'M', 'O', 'O', 'O', 'Y', 'G', 'Y', 'Y', 'A', 'G', 'U', 'C'],
  ['Y', 'O', 'Y', 'O', 'Y', 'O', 'C', 'G', 'C', 'K', 'G', 'C', 'E', 'E', 'E', 'U', 'A', 'O', 'E', 'O', 'Y', 'O', 'I', 'Y', 'I', 'P', 'P', 'M', 'Y', 'M', 'M', 'P', 'K', 'P', 'K', 'K', 'P', 'P', 'P', 'K', 'O', 'U', 'K', 'U', 'G', 'U', 'M', 'K', 'M', 'B', 'M', 'U', 'M', 'M', 'B', 'M', 'B', 'B', 'E', 'I', 'O', 'G', 'G'],
  ['P', 'B', 'P', 'B', 'C', 'E', 'E', 'B', 'I', 'I', 'I', 'U', 'O', 'U', 'O', 'M', 'G', 'M', 'G', 'E', 'P', 'E', 'P', 'E', 'E', 'C', 'C', 'A', 'C', 'Y', 'C', 'G', 'Y', 'G', 'O', 'Y', 'G', 'G', 'U', 'A', 'E', 'B', 'U', 'O', 'O', 'Y', 'O', 'Y', 'G', 'Y', 'K', 'K', 'Y', 'K', 'A', 'C', 'Y', 'O', 'Y', 'Y', 'Y', 'B', 'Y'],
  ['P', 'P', 'C', 'P', 'C', 'G', 'B', 'G', 'B', 'U', 'Y', 'A', 'Y', 'A', 'B', 'A', 'B', 'G', 'M', 'G', 'M', 'O', 'M', 'M', 'C', 'M', 'C', 'M', 'I', 'C', 'C', 'C', 'Y', 'Y', 'M', 'M', 'G', 'I', 'I', 'C', 'I', 'K', 'A', 'K', 'O', 'O', 'O', 'B', 'E', 'A', 'K', 'E', 'E', 'A', 'Y', 'P', 'A', 'Y', 'P', 'A', 'P', 'I', 'P']
];

let possibleStimuliList_practice2back = [ // 5 2-backs, 2 3-backs, 2 1-backs
  ['I', 'P', 'I', 'P', 'I', 'M', 'P', 'M', 'A', 'A', 'M', 'M', 'O', 'A', 'O'],
  ['P', 'U', 'P', 'U', 'P', 'U', 'P', 'B', 'B', 'P', 'P', 'I', 'K', 'P', 'M'],
  ['A', 'B', 'A', 'I', 'A', 'I', 'I', 'I', 'B', 'M', 'C', 'G', 'M', 'G', 'A'],
  ['I', 'U', 'U', 'Y', 'C', 'Y', 'C', 'Y', 'E', 'C', 'E', 'E', 'M', 'I', 'M'],
  ['K', 'Y', 'K', 'K', 'I', 'K', 'I', 'P', 'B', 'P', 'B', 'A', 'O', 'O', 'Y'],
  ['I', 'M', 'I', 'M', 'I', 'E', 'Y', 'E', 'E', 'C', 'P', 'P', 'Y', 'P', 'M'],
  ['A', 'O', 'A', 'I', 'A', 'I', 'B', 'A', 'A', 'P', 'A', 'I', 'A', 'B', 'B'],
  ['P', 'P', 'I', 'P', 'U', 'P', 'C', 'C', 'P', 'U', 'P', 'U', 'P', 'O', 'E'],
  ['M', 'M', 'B', 'M', 'B', 'E', 'Y', 'I', 'Y', 'I', 'G', 'K', 'K', 'E', 'K'],
  ['I', 'K', 'I', 'K', 'I', 'I', 'M', 'G', 'K', 'G', 'G', 'E', 'A', 'O', 'A'],
  ['M', 'Y', 'O', 'Y', 'O', 'O', 'P', 'O', 'P', 'C', 'C', 'I', 'U', 'B', 'U'],
  ['Y', 'C', 'Y', 'C', 'Y', 'C', 'C', 'Y', 'Y', 'P', 'G', 'C', 'K', 'M', 'K'],
  ['A', 'I', 'A', 'I', 'A', 'I', 'A', 'A', 'B', 'O', 'M', 'K', 'O', 'Y', 'Y'],
  ['A', 'A', 'Y', 'K', 'P', 'K', 'P', 'P', 'M', 'P', 'C', 'O', 'B', 'O', 'B'],
  ['M', 'M', 'K', 'E', 'K', 'E', 'E', 'Y', 'E', 'A', 'M', 'O', 'M', 'O', 'A'],
  ['K', 'B', 'B', 'Y', 'B', 'Y', 'A', 'A', 'I', 'A', 'I', 'K', 'I', 'O', 'M'],
  ['G', 'G', 'B', 'I', 'B', 'I', 'G', 'I', 'E', 'I', 'E', 'E', 'I', 'M', 'A'],
  ['E', 'K', 'E', 'K', 'E', 'E', 'E', 'P', 'C', 'A', 'P', 'A', 'Y', 'K', 'M'],
  ['C', 'M', 'C', 'M', 'B', 'K', 'B', 'U', 'U', 'B', 'O', 'O', 'M', 'O', 'M'],
  ['M', 'I', 'M', 'I', 'M', 'I', 'I', 'I', 'Y', 'K', 'A', 'G', 'K', 'C', 'P'],
  ['O', 'O', 'M', 'O', 'M', 'M', 'Y', 'A', 'Y', 'E', 'Y', 'E', 'A', 'K', 'G'],
  ['E', 'E', 'U', 'E', 'O', 'I', 'O', 'I', 'O', 'M', 'A', 'M', 'E', 'A', 'A'],
  ['U', 'G', 'U', 'G', 'U', 'G', 'I', 'G', 'G', 'I', 'P', 'P', 'Y', 'A', 'O'],
  ['K', 'K', 'C', 'K', 'C', 'Y', 'A', 'B', 'A', 'B', 'A', 'E', 'Y', 'A', 'A'],
  ['G', 'O', 'G', 'O', 'P', 'O', 'P', 'P', 'C', 'G', 'U', 'U', 'G', 'O', 'G'],
  ['B', 'K', 'B', 'K', 'K', 'B', 'B', 'M', 'I', 'P', 'I', 'P', 'M', 'P', 'K'],
  ['I', 'O', 'I', 'O', 'M', 'M', 'A', 'M', 'A', 'K', 'A', 'A', 'M', 'P', 'E'],
  ['E', 'O', 'C', 'O', 'C', 'O', 'C', 'C', 'M', 'C', 'A', 'A', 'P', 'Y', 'B'],
  ['Y', 'I', 'Y', 'I', 'M', 'I', 'B', 'B', 'E', 'U', 'E', 'A', 'A', 'E', 'A'],
  ['C', 'A', 'C', 'B', 'M', 'B', 'C', 'M', 'M', 'M', 'A', 'M', 'Y', 'M', 'U'],
  ['K', 'M', 'M', 'C', 'C', 'A', 'C', 'A', 'G', 'A', 'C', 'G', 'C', 'G', 'I'],
  ['B', 'A', 'B', 'E', 'E', 'E', 'U', 'P', 'B', 'U', 'P', 'U', 'E', 'U', 'E'],
  ['E', 'P', 'E', 'P', 'K', 'P', 'K', 'B', 'P', 'B', 'B', 'A', 'Y', 'O', 'O'],
  ['G', 'U', 'P', 'U', 'P', 'U', 'U', 'I', 'U', 'I', 'O', 'P', 'P', 'C', 'B'],
  ['E', 'I', 'E', 'Y', 'E', 'E', 'P', 'P', 'M', 'P', 'U', 'B', 'U', 'B', 'O'],
  ['E', 'E', 'A', 'E', 'C', 'C', 'E', 'I', 'G', 'I', 'Y', 'I', 'Y', 'I', 'M'],
  ['P', 'B', 'B', 'P', 'B', 'P', 'G', 'P', 'K', 'M', 'M', 'G', 'B', 'G', 'B'],
  ['O', 'O', 'C', 'O', 'M', 'C', 'M', 'E', 'E', 'C', 'Y', 'C', 'Y', 'C', 'P'],
  ['U', 'I', 'U', 'I', 'U', 'M', 'K', 'U', 'U', 'P', 'A', 'P', 'A', 'A', 'O'],
  ['B', 'B', 'B', 'A', 'U', 'M', 'A', 'U', 'A', 'E', 'A', 'B', 'C', 'B', 'C'],
  ['M', 'K', 'K', 'M', 'I', 'U', 'I', 'A', 'I', 'A', 'K', 'A', 'K', 'K', 'B']
];

let possibleStimuliList_practice3back = [ // 5 3-backs, 2 2-backs, 2 4-backs
  ['E', 'B', 'A', 'E', 'A', 'A', 'E', 'E', 'K', 'A', 'O', 'K', 'G', 'K', 'K'],
  ['Y', 'M', 'Y', 'G', 'M', 'O', 'G', 'M', 'O', 'G', 'G', 'M', 'U', 'M', 'O'],
  ['G', 'K', 'M', 'G', 'G', 'G', 'I', 'U', 'M', 'I', 'I', 'M', 'I', 'C', 'M'],
  ['C', 'G', 'C', 'C', 'G', 'B', 'O', 'P', 'B', 'O', 'Y', 'O', 'B', 'Y', 'Y'],
  ['B', 'U', 'B', 'Y', 'U', 'B', 'G', 'C', 'B', 'B', 'C', 'B', 'M', 'U', 'C'],
  ['O', 'C', 'K', 'O', 'C', 'C', 'O', 'K', 'O', 'O', 'K', 'K', 'C', 'E', 'C'],
  ['U', 'P', 'I', 'P', 'G', 'I', 'P', 'E', 'G', 'P', 'E', 'Y', 'P', 'Y', 'E'],
  ['I', 'P', 'I', 'C', 'P', 'E', 'C', 'M', 'C', 'C', 'M', 'M', 'C', 'P', 'K'],
  ['P', 'G', 'P', 'B', 'G', 'G', 'B', 'G', 'C', 'P', 'O', 'O', 'P', 'Y', 'O'],
  ['G', 'O', 'E', 'O', 'O', 'E', 'O', 'P', 'C', 'K', 'P', 'C', 'Y', 'K', 'P'],
  ['B', 'E', 'B', 'B', 'E', 'B', 'M', 'I', 'E', 'M', 'M', 'E', 'P', 'K', 'C'],
  ['B', 'P', 'B', 'I', 'P', 'E', 'I', 'I', 'E', 'I', 'K', 'A', 'I', 'G', 'K'],
  ['G', 'G', 'Y', 'G', 'G', 'Y', 'G', 'O', 'B', 'P', 'U', 'O', 'P', 'A', 'M'],
  ['Y', 'U', 'Y', 'A', 'U', 'U', 'A', 'U', 'P', 'Y', 'C', 'E', 'Y', 'Y', 'E'],
  ['P', 'E', 'A', 'O', 'P', 'A', 'O', 'C', 'I', 'O', 'A', 'I', 'I', 'I', 'I'],
  ['O', 'E', 'K', 'E', 'E', 'U', 'E', 'P', 'U', 'I', 'P', 'C', 'U', 'I', 'C'],
  ['A', 'M', 'C', 'A', 'C', 'O', 'I', 'Y', 'O', 'I', 'Y', 'Y', 'O', 'Y', 'G'],
  ['B', 'G', 'K', 'B', 'G', 'G', 'K', 'G', 'Y', 'O', 'P', 'C', 'P', 'P', 'C'],
  ['A', 'M', 'A', 'A', 'M', 'I', 'K', 'E', 'M', 'I', 'E', 'M', 'A', 'E', 'A'],
  ['A', 'G', 'M', 'G', 'M', 'M', 'P', 'P', 'M', 'G', 'B', 'M', 'G', 'B', 'B'],
  ['O', 'A', 'O', 'O', 'A', 'A', 'U', 'O', 'M', 'U', 'I', 'M', 'O', 'I', 'O'],
  ['A', 'I', 'G', 'A', 'I', 'K', 'Y', 'I', 'K', 'I', 'Y', 'E', 'K', 'E', 'E'],
  ['U', 'P', 'K', 'U', 'Y', 'K', 'O', 'K', 'K', 'O', 'O', 'Y', 'K', 'Y', 'Y'],
  ['K', 'A', 'B', 'K', 'A', 'I', 'K', 'K', 'I', 'I', 'I', 'I', 'G', 'C', 'C'],
  ['E', 'C', 'K', 'K', 'C', 'K', 'K', 'M', 'K', 'C', 'I', 'B', 'B', 'I', 'I'],
  ['Y', 'A', 'U', 'M', 'A', 'U', 'A', 'M', 'U', 'O', 'U', 'I', 'O', 'O', 'I'],
  ['I', 'C', 'A', 'I', 'C', 'A', 'A', 'A', 'A', 'U', 'K', 'O', 'A', 'A', 'O'],
  ['I', 'M', 'I', 'U', 'M', 'K', 'C', 'G', 'M', 'C', 'G', 'M', 'G', 'C', 'M'],
  ['A', 'M', 'B', 'A', 'M', 'A', 'G', 'P', 'M', 'G', 'Y', 'G', 'G', 'Y', 'Y'],
  ['A', 'B', 'Y', 'A', 'B', 'O', 'B', 'O', 'O', 'G', 'G', 'O', 'C', 'G', 'P'],
  ['K', 'B', 'K', 'U', 'U', 'M', 'U', 'O', 'M', 'U', 'U', 'M', 'E', 'U', 'A'],
  ['K', 'U', 'I', 'K', 'U', 'I', 'A', 'U', 'U', 'I', 'U', 'I', 'M', 'B', 'Y'],
  ['C', 'M', 'K', 'U', 'K', 'K', 'U', 'B', 'Y', 'Y', 'B', 'Y', 'Y', 'K', 'B'],
  ['O', 'E', 'P', 'O', 'E', 'I', 'O', 'U', 'I', 'O', 'I', 'U', 'Y', 'O', 'Y'],
  ['A', 'G', 'K', 'U', 'A', 'K', 'U', 'E', 'K', 'P', 'E', 'E', 'Y', 'E', 'Y'],
  ['U', 'A', 'K', 'A', 'U', 'Y', 'B', 'U', 'Y', 'B', 'U', 'C', 'U', 'B', 'C'],
  ['Y', 'O', 'K', 'O', 'O', 'K', 'B', 'B', 'Y', 'B', 'B', 'U', 'Y', 'M', 'U'],
  ['Y', 'U', 'Y', 'Y', 'U', 'Y', 'M', 'U', 'U', 'G', 'I', 'B', 'E', 'I', 'I'],
  ['C', 'Y', 'C', 'C', 'K', 'Y', 'A', 'Y', 'K', 'A', 'Y', 'M', 'O', 'Y', 'M'],
  ['E', 'P', 'B', 'A', 'G', 'B', 'G', 'G', 'O', 'B', 'A', 'O', 'O', 'A', 'O'],
  ['P', 'K', 'A', 'P', 'P', 'Y', 'G', 'Y', 'Y', 'G', 'K', 'Y', 'E', 'Y', 'Y']
];

let possibleStimuliList_practice1back = [ // 5 1-backs, 5 2-backs, one triple maximum, no four consecutives letters
  ['Y', 'Y', 'I', 'Y', 'U', 'U', 'U', 'I', 'I', 'U', 'I', 'U', 'I', 'Y', 'Y'],
  ['B', 'B', 'O', 'B', 'O', 'U', 'U', 'K', 'K', 'K', 'Y', 'E', 'Y', 'E', 'E'],
  ['G', 'G', 'C', 'C', 'G', 'G', 'G', 'I', 'I', 'B', 'I', 'B', 'I', 'B', 'A'],
  ['C', 'C', 'U', 'U', 'U', 'G', 'A', 'G', 'A', 'A', 'C', 'C', 'M', 'C', 'M'],
  ['P', 'P', 'I', 'P', 'K', 'P', 'P', 'O', 'P', 'O', 'C', 'C', 'Y', 'Y', 'Y'],
  ['Y', 'Y', 'K', 'K', 'M', 'K', 'K', 'I', 'K', 'I', 'A', 'I', 'U', 'U', 'U'],
  ['U', 'A', 'A', 'A', 'O', 'O', 'U', 'O', 'U', 'A', 'U', 'A', 'A', 'O', 'O'],
  ['Y', 'P', 'P', 'C', 'C', 'C', 'K', 'C', 'K', 'K', 'B', 'K', 'K', 'I', 'K'],
  ['M', 'P', 'C', 'C', 'C', 'G', 'C', 'G', 'G', 'B', 'G', 'B', 'B', 'K', 'K'],
  ['Y', 'I', 'I', 'I', 'Y', 'Y', 'G', 'Y', 'G', 'Y', 'G', 'I', 'I', 'Y', 'Y'],
  ['A', 'K', 'K', 'G', 'K', 'G', 'K', 'G', 'P', 'P', 'Y', 'Y', 'Y', 'P', 'P'],
  ['O', 'O', 'O', 'C', 'O', 'C', 'C', 'I', 'C', 'I', 'M', 'M', 'I', 'I', 'O'],
  ['K', 'C', 'K', 'C', 'K', 'C', 'B', 'B', 'B', 'G', 'G', 'K', 'K', 'Y', 'Y'],
  ['U', 'O', 'U', 'O', 'O', 'O', 'G', 'G', 'C', 'B', 'C', 'B', 'B', 'M', 'M'],
  ['E', 'O', 'O', 'O', 'Y', 'O', 'G', 'G', 'A', 'A', 'B', 'A', 'B', 'A', 'A'],
  ['G', 'G', 'Y', 'Y', 'Y', 'I', 'Y', 'I', 'I', 'K', 'K', 'I', 'K', 'I', 'E'],
  ['I', 'I', 'I', 'B', 'B', 'G', 'I', 'G', 'I', 'G', 'E', 'E', 'B', 'E', 'E'],
  ['U', 'E', 'E', 'O', 'E', 'O', 'O', 'O', 'P', 'O', 'P', 'E', 'E', 'C', 'C'],
  ['C', 'C', 'E', 'C', 'E', 'C', 'Y', 'C', 'C', 'M', 'M', 'M', 'B', 'B', 'O'],
  ['K', 'K', 'K', 'Y', 'Y', 'M', 'Y', 'M', 'Y', 'Y', 'B', 'B', 'G', 'B', 'A'],
  ['K', 'K', 'K', 'A', 'A', 'P', 'A', 'P', 'A', 'A', 'C', 'E', 'E', 'P', 'E'],
  ['A', 'A', 'A', 'M', 'A', 'A', 'O', 'A', 'O', 'Y', 'Y', 'K', 'Y', 'P', 'P'],
  ['E', 'E', 'I', 'I', 'I', 'M', 'I', 'M', 'B', 'B', 'O', 'B', 'O', 'I', 'I'],
  ['E', 'E', 'B', 'B', 'I', 'B', 'B', 'I', 'B', 'I', 'K', 'I', 'G', 'G', 'G'],
  ['P', 'P', 'P', 'O', 'O', 'A', 'A', 'P', 'A', 'P', 'A', 'B', 'M', 'B', 'B'],
  ['K', 'K', 'M', 'M', 'E', 'M', 'E', 'M', 'M', 'M', 'U', 'U', 'I', 'U', 'E'],
  ['B', 'B', 'Y', 'B', 'Y', 'Y', 'Y', 'E', 'Y', 'U', 'Y', 'I', 'I', 'E', 'E'],
  ['I', 'O', 'I', 'I', 'M', 'I', 'M', 'I', 'A', 'A', 'I', 'I', 'I', 'O', 'O'],
  ['K', 'K', 'I', 'K', 'I', 'K', 'O', 'O', 'P', 'O', 'O', 'P', 'B', 'B', 'B'],
  ['Y', 'Y', 'Y', 'O', 'B', 'B', 'Y', 'Y', 'O', 'Y', 'O', 'Y', 'O', 'K', 'K'],
  ['E', 'G', 'G', 'E', 'G', 'K', 'K', 'E', 'K', 'E', 'K', 'K', 'P', 'P', 'P'],
  ['P', 'A', 'P', 'A', 'P', 'P', 'B', 'P', 'M', 'M', 'I', 'I', 'I', 'C', 'C'],
  ['M', 'M', 'B', 'B', 'M', 'B', 'M', 'U', 'U', 'P', 'U', 'P', 'A', 'A', 'A'],
  ['B', 'B', 'K', 'B', 'G', 'G', 'B', 'G', 'B', 'G', 'G', 'B', 'A', 'A', 'A'],
  ['I', 'I', 'P', 'I', 'I', 'P', 'I', 'P', 'Y', 'Y', 'C', 'Y', 'G', 'G', 'G'],
  ['O', 'O', 'B', 'O', 'B', 'O', 'G', 'G', 'E', 'E', 'E', 'K', 'K', 'U', 'K'],
  ['Y', 'Y', 'U', 'U', 'M', 'U', 'M', 'U', 'M', 'K', 'P', 'P', 'P', 'G', 'G'],
  ['P', 'P', 'M', 'M', 'U', 'M', 'U', 'U', 'B', 'M', 'I', 'M', 'I', 'I', 'I'],
  ['A', 'A', 'M', 'A', 'M', 'M', 'C', 'C', 'C', 'O', 'U', 'U', 'I', 'U', 'I'],
  ['Y', 'Y', 'Y', 'I', 'I', 'E', 'I', 'O', 'I', 'O', 'M', 'M', 'I', 'M', 'M'],
  ['B', 'B', 'P', 'B', 'P', 'G', 'G', 'U', 'U', 'U', 'M', 'U', 'M', 'E', 'E']
];

