const sure_payments = [25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

const Y_valuesMPL = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50];
let helpPageCounter = 0;
let lengthSurePayments = 17;


function createMPLPositionDictionaryFromList() {
    const mplPositions = {};
    
    // Extract unique probabilities from G and L types
    const probabilities = [10, 25, 50, 75, 90];
    
    // Randomly assign positions for each probability
    probabilities.forEach(prob => {
        const gPosition = Math.random() < 0.5 ? "high" : "low";
        const lPosition = gPosition === "high" ? "low" : "high";
        
        mplPositions[`G${prob}`] = gPosition;
        mplPositions[`L${prob}`] = lPosition;
    });
    
    // Handle A types separately (opposite positions)
    const aHighFirst = Math.random() < 0.5;
    mplPositions['A10'] = aHighFirst ? "high" : "low";
    mplPositions['A15'] = aHighFirst ? "low" : "high";
    
    return mplPositions;
}

function mplGenerator(y, X, condition, isSuper=0, treat, example=false) {
    // when example == true , no indication on wether it is a classic or a super round
    //console.log("Generating MPL with parameters: y =", y, ", X =", X, ", condition =", condition, ", isSuper =", isSuper, ", treat =", treat, ", example =", example);
    const tableClass = isSuper ? 'mpl mpl-incentivized' : 'mpl';
    let sign = "";
    if (X == "G") {
        sign = "";
    }
    else if (X == "L") {
        sign = "-";
    }
    else if (X == "A") {
        sign = "";
    }
    else {
        console.log("sign error for the lottery");
    }

    // Dynamically assign endowmentsMPL based on parameters
    let Xy = X + y; // e.g., "G75" or "L75"
    // let endowmentsMPL = language.endowmentsMPL[Xy];
    let endowmentsMPL = "";
    if (condition == "mirror" && isSuper==1) {
        endowmentsMPL = language.endowmentsMPL.mirror[Xy];
    }
    else if (condition == "mirror" && isSuper==0) {
        endowmentsMPL = language.endowmentsMPL.mirrorNotIncentivized[Xy];
    } else if (condition == "lottery") {
        endowmentsMPL = language.endowmentsMPL.lottery[Xy];
    }
    let endowmentValue = "";
    if (X == "G"){ endowmentValue = 5;}
    else if (X == "L") { endowmentValue = 30;}
    else if (X == "A" && y == 10) { endowmentValue = 15;}
    else if (X == "A" && y == 15) { endowmentValue = 20;}

    const showCognitiveUncertainty = expIsIncentives === true && (treat === "ineq" || treat === "mirr") && typeof language !== "undefined" && language.cogUncertainty;
    const cognitiveUncertaintyHtml = showCognitiveUncertainty ? `
        <div class="mpl-cognitive-uncertainty" style="max-width: 50vw; margin: 30px auto 0 auto;">
            <p>${treat === "ineq" ? language.cogUncertainty.questionIneq : language.cogUncertainty.questionMirr}</p>
            <div style="display: flex; align-items: center; gap: 10px;">
                <span>${language.cogUncertainty.veryUncertain}</span>
                <input type="range" name="CU" min="0" max="100" value="0" disabled style="flex-grow: 1;">
                <span>${language.cogUncertainty.veryCertain}</span>
            </div>
        </div>` : "";

  // Generate sure payment values
    let rows = ``;
    let mpl_html = ``;
    if (treat== "ineq" & expIsIncentives) {
        makeChoice = language.instructionsMPL.makeChoiceIncentives;
    }
    else {makeChoice = language.instructionsMPL.makeChoice;}
    if (isSuper==1){
        instructionTop = `<div style="width: 50vw; margin: auto;">
        <h2> <span style="color: green">Somme initiale: ${endowmentValue}€ </span></h2>
        <p>${makeChoice}</p>
        <p>${language.instructionsMPL.computerChooses}</p>
        <p><span style="color: green">${endowmentsMPL}</span></p>
        </div>`
    }
    else if (isSuper==0){
        instructionTop = `<div style="width: 50vw; margin: auto;">
        <h2> <span style="color: green">Somme initiale: ${endowmentValue}€ </span></h2>
        <p>${makeChoice}</p>
        <p><span style="color: green">${endowmentsMPL}</span></p>
        </div>`
    }

    if (X == "L") {
        // HTML generation
        rows = sure_payments.map((amt, i) => `
        <tr>
            <td>${i + 1}</td>
            <td class="choice" data-row="${i}" data-choice="lottery" style="color: red">
            ${sign}25€
            <input type="radio" name="row${i}" value="lottery">
            </td>
            <td class="mirror" data-row="${i}" style="color: red">0€</td>
            <td class="choice" data-row="${i}" data-choice="sure" style="color: blue">
            ${sign}${amt}€
            <input type="radio" name="row${i}" value="sure">
            </td>
        </tr>
        `).join('');

        mpl_html =  `
        ${instructionTop}

                <!--
        <div style="width: 50vw; margin: auto;">
        <h2> <span style="color: green">Somme initiale: ${endowmentValue}€ </span></h2>
        <p>${makeChoice}</p>
        <p>${language.instructionsMPL.computerChooses}</p>
        <p><span style="color: green">${endowmentsMPL}</span></p>

        <ul>
        <li>${makeChoice}</li><br>
        <li>${language.instructionsMPL.computerChooses}</li><br>
        <li><span style="color: green">${endowmentsMPL}</span></li><br>
        </ul> -->
        </div>

        <table class="${tableClass}" data-mpl-type="${X}O${y}">
            <tr>
            <th></th>
            <th colspan="2" style="color: red">Lot A</th>
            <th style="color: blue">Lot B</th>
            </tr>
            <tr>
            <th>Version</th>
            <th style="color: red">${y} boîtes</th>
            <th style="color: red">${100-y} boîtes</th>
            <th style="color: blue">100 boîtes</th>
            </tr>
            ${rows}
        </table>
        `;
    }
    else if (X == "G") {
        // HTML generation
        rows = sure_payments.map((amt, i) => `
        <tr>
            <td>${i + 1}</td>
            <td class="choice" data-row="${i}" data-choice="lottery" style="color: red">
            ${sign}25€
            <input type="radio" name="row${i}" value="lottery">
            </td>
            <td class="mirror" data-row="${i}" style="color: red">
            0€</td>
            <td class="choice" data-row="${i}" data-choice="sure" style="color: blue">
            ${sign}${26 - amt}€
            <input type="radio" name="row${i}" value="sure">
            </td>
        </tr>
        `).join('');

        mpl_html = `
        ${instructionTop}
        
         <!--
        <h2> <span style="color: green">Somme initiale: ${endowmentValue}€ </span></h2>
        <p>${makeChoice}</p>
        <p>${language.instructionsMPL.computerChooses}</p>
        <p><span style="color: green">${endowmentsMPL}</span></p>
        <ul>
        <li>${makeChoice}</li><br>
        <li>${language.instructionsMPL.computerChooses}</li><br>
        <li><span style="color: green">${endowmentsMPL}</span></li><br>
        </ul> -->
        </div>

        <table class="${tableClass}" data-mpl-type="${X}O${y}">
            <tr>
            <th></th>
            <th colspan="2" style="color: red">Lot A</th>
            <th style="color: blue">Lot B</th>
            </tr>
            <tr>
            <th>Version</th>
            <th style="color: red">${y} boîtes</th>
            <th style="color: red">${100-y} boîtes</th>
            <th style="color: blue">100 boîtes</th>
            </tr>
            ${rows}
        </table>
        `;
    }
    else if (X == "A") {
        // HTML generation
        rows = Y_valuesMPL.map((amt, i) => `
        <tr>
            <td>${i + 1}</td>
            <td class="choice" data-row="${i}" data-choice="lottery" style="color: red">
            ${amt}€ <input type="radio" name="row${i}" value="lottery">
            </td>
            <td class="mirror" data-row="${i}" style="color: red">-${y}€</td>
            <td class="choice" data-row="${i}" data-choice="sure" style="color: blue">
            0€
            <input type="radio" name="row${i}" value="sure">
            </td>
        </tr>
        `).join('');

        mpl_html = `
        ${instructionTop}
        
                <!--
        <h2> <span style="color: green">Somme initiale: ${endowmentValue}€ </span></h2>
        <p>${makeChoice}</p>
        <p>${language.instructionsMPL.computerChooses}</p>
        <p><span style="color: green">${endowmentsMPL}</span></p>
        <ul>
        <li></li><br>
        <li>${language.instructionsMPL.computerChooses}</li><br>
        <li><span style="color: green">${endowmentsMPL}</span></li><br>
        </ul> -->
        </div>

        <table class="${tableClass}" data-mpl-type="${X}O${y}">
            <tr>
            <th></th>
            <th colspan="2" style="color: red">Lot A</th>
            <th style="color: blue">Lot B</th>
            </tr>
            <tr>
            <th>Version</th>
            <th style="color: red">50 boîtes</th>
            <th style="color: red">50 boîtes</th>
            <th style="color: blue">100 boîtes</th>
            </tr>
            ${rows}
        </table>
        `;
    }
    if (cognitiveUncertaintyHtml) {
        mpl_html = `${mpl_html}<br>
        ${cognitiveUncertaintyHtml}`;
    }
  
  if (isSuper==1 && example==false) {
    mpl_html = `
      <div class="mpl-container">
        <div class="mpl-incentive-badge-super">${language.incentiveBadge.super}</div>
        ${mpl_html}
      </div>
    `;
  }
  else if (isSuper==0 && example==false){
    mpl_html = `
        <div class="mpl-container">
        <div class="mpl-incentive-badge-classic">${language.incentiveBadge.classic}</div>
        ${mpl_html}
        </div>
        `
  }
    
  
  return mpl_html;
}

function roundToDownToFifth(number) {
    return Math.floor(number * 5) / 5;
}

function createSequenceArray(y, X, position) {
    const array = [];
    let pos = 0;
    if (position === "high" & (y == 10 | y == 90) & (X == "G" | X =="L")) {pos = 5;}
    else if (position === "low" & (y == 10 | y == 90) & (X == "G" | X =="L")) {pos = 11;}
    else if (position === "high" & (y == 25 | y == 75)) {pos = 4;}
    else if (position === "low" & (y == 25 | y == 75)) {pos = 12;}
    else if (position === "high" & y == 50) {pos = 3;}
    else if (position === "low" & y == 50) {pos = 13;}
    else if (position === "high" & (y == 10 | y == 15) & X == "A") {pos = 7;}
    else if (position === "low" & (y == 10 | y == 15) & X == "A") {pos = 9;}

    let EV = 0
    if (X == "G"){
        EV =roundToDownToFifth(y*0.25)}
    else if (X == "L"){
        EV = roundToDownToFifth(- y*0.25)}
    else if (X == "A" & y == 10){
        EV = 9.5 ;}
    else if (X == "A" & y == 15){
        EV = 14.5 ;}

    if (X == "G") {
        // console.log("y is", y, "X is", X, "position is", position);
        // console.log("EV in G is", EV);
        // console.log("pos in G is", pos);
        const startValue = EV - (pos * 0.2); // Calculate starting value
        // console.log("startValue in G is", startValue);
        for (let i = 0; i < lengthSurePayments + 1; i++) {
            array.push(Math.round((startValue + (i * 0.2)) * 10) / 10);
        }
    }
    else if (X == "L") {
        // console.log("y is", y, "X is", X, "position is", position);
        // console.log("EV in L is", EV);
        // console.log("pos in L is", pos);
        const startValue = EV - (pos * 0.2);
        // console.log("startValue in L is", startValue);
        for (let i = 0; i < lengthSurePayments + 1; i++) {
            array.push(Math.round((startValue + (i * 0.2)) * 10) / 10);
        }
    }
    else if (X == "A") {
        // console.log("y is", y, "X is", X, "position is", position);
        // console.log("EV in A is", EV);
        // console.log("pos in A is", pos);
        const startValue = EV - pos;
        // console.log("startValue in A is", startValue);
        for (let i = 0; i < lengthSurePayments + 1; i++) {
            array.push(startValue + i);
        }
    };
    return array;
}
console.log("Example of sure payments for L75 with high position (probaly negative amount):", createSequenceArray(75, "L", "high"));
console.log("Example of sure payments for LO75 with low position (probably positive amount):", sure_payments.slice());
console.log("Example of sure payments fixed for LO75 with low position (probably negative amount):", sure_payments.slice().map(x => -x));


function mplGenerator2(y, X, condition, position) {
    let sign = "";
    if (X == "G") {
        sign = "";
    }
    else if (X == "L") {
        sign = "-";
    }
    else if (X == "A") {
        sign = "";
    }
    else {
        console.log("sign error for the lottery");
    }

    let sure_payments2 = createSequenceArray(y, X, position);

    // Dynamically assign endowmentsMPL based on parameters
    let Xy = X + y; // e.g., "G75" or "L75"
    // let endowmentsMPL = language.endowmentsMPL[Xy];
    let endowmentsMPL = "";
    if (condition == "mirror") {
        endowmentsMPL = language.endowmentsMPL.mirror[Xy];
    } else if (condition == "lottery") {
        endowmentsMPL = language.endowmentsMPL.lottery[Xy];
    }
    let endowmentValue = "";
    if (X == "G"){ endowmentValue = 5;}
    else if (X == "L") { endowmentValue = 30;}
    else if (X == "A" && y == 10) { endowmentValue = 15;}
    else if (X == "A" && y == 15) { endowmentValue = 20;}

  // Generate sure payment values
    let rows = ``;
    let mpl_html = ``;
    if (X == "L") {
        // HTML generation
        rows = sure_payments2.map((amt, i) => `
        <tr>
            <td>${i + 1}</td>
            <td class="choice" data-row="${i}" data-choice="lottery" style="color: red">
            ${sign}25€
            <input type="radio" name="row${i}" value="lottery">
            </td>
            <td class="mirror" data-row="${i}" style="color: red">0€</td>
            <td class="choice" data-row="${i}" data-choice="sure" style="color: blue">
            ${amt}€
            <input type="radio" name="row${i}" value="sure">
            </td>
        </tr>
        `).join('');

        mpl_html = `
        <div style="width: 50vw; margin: auto;">
        <h2> <span style="color: green">Somme initiale: ${endowmentValue}€ </span></h2>
        <ul>
        <li>${language.instructionsMPL.makeChoice}</li><br>
        <li>${language.instructionsMPL.computerChooses}</li><br>
        <li><span style="color: green">${endowmentsMPL}</span></li><br>
        </ul></div>

        <table class="mpl" data-mpl-type="${X}${y}">
            <tr>
            <th></th>
            <th colspan="2" style="color: red">Lot A</th>
            <th style="color: blue">Lot B</th>
            </tr>
            <tr>
            <th>Version</th>
            <th style="color: red">${y} boîtes</th>
            <th style="color: red">${100-y} boîtes</th>
            <th style="color: blue">100 boîtes</th>
            </tr>
            ${rows}
        </table>
        `;
    }
    else if (X == "G") {
        // HTML generation
        rows = sure_payments2.map((amt, i) => `
        <tr>
            <td>${i + 1}</td>
            <td class="choice" data-row="${i}" data-choice="lottery" style="color: red">
            ${sign}25€
            <input type="radio" name="row${i}" value="lottery">
            </td>
            <td class="mirror" data-row="${i}" style="color: red">
            0€</td>
            <td class="choice" data-row="${i}" data-choice="sure" style="color: blue">
            ${sign}${amt}€
            <input type="radio" name="row${i}" value="sure">
            </td>
        </tr>
        `).join('');

        mpl_html = `
        <div style="width: 50vw; margin: auto;">
        <h2> <span style="color: green">Somme initiale: ${endowmentValue}€ </span></h2>
        <ul>
        <li>${language.instructionsMPL.makeChoice}</li><br>
        <li>${language.instructionsMPL.computerChooses}</li><br>
        <li><span style="color: green">${endowmentsMPL}</span></li><br>
        </ul></div>

        <table class="mpl" data-mpl-type="${X}${y}">
            <tr>
            <th></th>
            <th colspan="2" style="color: red">Lot A</th>
            <th style="color: blue">Lot B</th>
            </tr>
            <tr>
            <th>Version</th>
            <th style="color: red">${y} boîtes</th>
            <th style="color: red">${100-y} boîtes</th>
            <th style="color: blue">100 boîtes</th>
            </tr>
            ${rows}
        </table>
        `;
    }
    else if (X == "A") {
        // HTML generation
        rows = sure_payments2.map((amt, i) => `
        <tr>
            <td>${i + 1}</td>
            <td class="choice" data-row="${i}" data-choice="lottery" style="color: red">
            ${amt}€ <input type="radio" name="row${i}" value="lottery">
            </td>
            <td class="mirror" data-row="${i}" style="color: red">-${y}€</td>
            <td class="choice" data-row="${i}" data-choice="sure" style="color: blue">
            0€
            <input type="radio" name="row${i}" value="sure">
            </td>
        </tr>
        `).join('');

        mpl_html = `

        <div style="width: 50vw; margin: auto;">
        <h2> <span style="color: green">Somme initiale: ${endowmentValue}€ </span></h2>
        <ul>
        <li>${language.instructionsMPL.makeChoice}</li><br>
        <li>${language.instructionsMPL.computerChooses}</li><br>
        <li><span style="color: green">${endowmentsMPL}</span></li><br>
        </ul></div>

        <table class="mpl" data-mpl-type="${X}${y}">
            <tr>
            <th></th>
            <th colspan="2" style="color: red">Lot A</th>
            <th style="color: blue">Lot B</th>
            </tr>
            <tr>
            <th>Version</th>
            <th style="color: red">50 boîtes</th>
            <th style="color: red">50 boîtes</th>
            <th style="color: blue">100 boîtes</th>
            </tr>
            ${rows}
        </table>
        `;
    }
  return mpl_html;
}
function mplGenerator3(number) {

    if (number == 1) {explanation = language.instructionsMPL.explanation1;}
    else if (number == 2) {explanation = language.instructionsMPL.explanation2;}


    let surePaymentsTraining = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

  // Generate sure payment values
    let rows = ``;
    let mpl_html = ``;

        // HTML generation
        rows = surePaymentsTraining.map((amt, i) => `
        <tr>
            <td>${i + 1}</td>
            <td class="choice" data-row="${i}" data-choice="lottery" style="color: red">
            15€
            <input type="radio" name="row${i}" value="lottery">
            </td>
            <td class="mirror" data-row="${i}" style="color: red">
            0€</td>
            <td class="choice" data-row="${i}" data-choice="sure" style="color: blue">
            ${amt}€
            <input type="radio" name="row${i}" value="sure">
            </td>
        </tr>
        `).join('');

        mpl_html = `
        <div style="width: 50vw; margin: auto;">
        <h3>${language.instructionsMPL.trainingTitle}</h3>
        <p>${explanation}</p>
        <p>${language.instructionsMPL.trainingClickNext}</p>
        </ul></div>

        <table class="mpl" data-mpl-type="${50}${60}">
            <tr>
            <th></th>
            <th colspan="2" style="color: red">Lot A</th>
            <th style="color: blue">Lot B</th>
            </tr>
            <tr>
            <th>Version</th>
            <th style="color: red">60 boîtes</th>
            <th style="color: red">40 boîtes</th>
            <th style="color: blue">100 boîtes</th>
            </tr>
            ${rows}
        </table>
        `;

  return mpl_html;
}

function generateShuffledArray() { // generate an array with numbers 1-12, with 2 of them duplicated, and the order shuffled. Each number is then mapped to a MPL type
    // Create base array 1-12
    let arr = Array.from({length: 12}, (_, i) => i + 1);
    
    // Shuffle the main array directly
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    
    // Now randomly select 2 different indices to duplicatte
    let firstIndex = Math.floor(Math.random() * 12);
    let secondIndex;
    do {
        secondIndex = Math.floor(Math.random() * 12);
    } while (secondIndex === firstIndex);
    
    // Add the duplicates at the end
    arr.push(arr[firstIndex]);
    arr.push(arr[secondIndex]);
    
    return arr;
}

function generateIndexSuperMPLs(l) {
    let moreIncentivized =  Array(numberSuperIncentivizedMPLs).fill(1); // 4 more incentivized MPLs
    let others = new Array(l - moreIncentivized.length).fill(0);
    let combined = moreIncentivized.concat(others);
    
    // Shuffle the combined array to randomize the positions of the super MPLs
    for (let i = combined.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [combined[i], combined[j]] = [combined[j], combined[i]];
    }
    console.log("Generated index for super MPLs (1 = super MPL, 0 = regular MPL):", combined);
    return combined;
}

function calculateMPLPayment(mplType, rowNumber, choices, chosenStatus) {
    console.log("Beginning of calculateMPLPayment with parameters: mplType is", mplType, "rowNumber is", rowNumber, "choices are", choices, "chosenStatus is", chosenStatus, "position is", mplPositionDict[mplType]);
    if(choices.every(choice => choice === undefined)) {
        console.log("Undefined choices : error ? choices are", choices);
        return undefined; // or handle the error as needed
    }
    else if(choices.every(choice => choice === "no_choice_due_to_time_limit")) {
        console.log("no choices made within time limit : MPL payment is 0");
        return 0; // or handle the error as needed
    }
        else {
        let type = "";
        let probability = 0;
        let surePayments=[];
        if (/^.O\d{2}$/.test(mplType)) { // if the MPL type an original form Oprea (G0, LO, AO)
            type = mplType.charAt(0);
            probability = parseInt(mplType.substring(2));
            if (type == "G") {
                surePayments = sure_payments.slice().reverse(); // reverse to get them in ascending order
            }
            else if (type == "L") {
                surePayments = sure_payments.slice().map(x => -x); // take their opposite to get negative values, already in ascending order (from -25 to -1)
            }
            else if (type == "A") {
                surePayments = Y_valuesMPL.slice(); // they are different ($2 increments for A)
            } 
        }   
        else {
            type = mplType.charAt(0);
            probability = parseInt(mplType.substring(1));
            let position = mplPositionDict[mplType];
            surePayments = createSequenceArray(probability, type, position);
        }
        let sure = choices[rowNumber]; // either "sure" or "lottery"
        console.log("Parsed values: type is", type, "probability is", probability, "sure (choice[rowNumber]) is", sure ,"\n surePayments is ", surePayments);
        if (sure == "sure") {
            if (type == "G") {
                return surePayments[rowNumber] + 5;
            } else if (type == "L") {
                console.log("Calculating payment for L type with sure payment of", surePayments[rowNumber]);
                return surePayments[rowNumber] + 30; //surePayments array is positive but in losses it represents a negative amount
            }
            else if (type == "A") {
                return probability + 5;
            }
        } else if (sure == "lottery") {
                if (chosenStatus == "lottery") {
                let randomDraw = Math.random(); // Random number between 0 and 1
                if (type == "G") {
                    if (randomDraw <= (probability / 100)) {
                        return 25 + 5;
                    }
                    else if (randomDraw > (probability / 100)) {
                        return 0 + 5;
                    }
                } else if (type == "L") {
                    if (randomDraw <= (probability / 100)) {
                        return 30 -25;
                    } 
                    else if (randomDraw > (probability / 100)) {
                        return 0 + 30;
                    }
                } else if (type == "A") {
                    if (randomDraw <= 0.5) {
                        return surePayments[rowNumber] + probability + 5;
                    } else if (randomDraw > 0.5) {
                        return 5; // = - probability + endowment
                    }
                }
            }
            else if (chosenStatus == "mirror") {
                if (type == "G") {
                    return (probability/100) * 25 + 5;
                } else if (type == "L") {
                    return 30 - (probability/100) * 25;
                } else if (type == "A") {
                    let endow = 0;
                    if (probability == 10) { endow  = 15;}
                    else if (probability == 15) { endow = 20;}
                    return (((surePayments[rowNumber] - probability)/2) + endow);
                }
            } 
        }
    }
}

function generateHTML(setALabel = "Set A", setBLabel = "Set B") {
        // Generate 100 squares for each set
        let setASquares = '';
        let setBSquares = '';
        
        for (let i = 0; i < 100; i++) {
            setASquares += '<div class="squareMPL square-a"></div>';
            setBSquares += '<div class="squareMPL square-b"></div>';
        }
        //             ${this.styles}
        return `

            <div class="squares-container">
                <div class="square-set set-a">
                    <h3>${setALabel}</h3>
                    <div class="squares-grid grid-a">
                        ${setASquares}
                    </div>
                </div>
                
                <div class="square-set set-b">
                    <h3>${setBLabel}</h3>
                    <div class="squares-grid grid-b">
                        ${setBSquares}
                    </div>
                </div>
            </div>
        `;
    }

// function calculateMPLPayment(mplType, rowNumber, choices, chosenStatus) {
//     console.log("=== calculateMPLPayment DEBUG START ===");
//     console.log("Input parameters:");
//     console.log("  mplType:", mplType);
//     console.log("  rowNumber:", rowNumber);
//     console.log("  choices:", choices);
//     console.log("  chosenStatus:", chosenStatus);
    
//     const type = mplType.charAt(0);
//     const probability = parseInt(mplType.substring(1));
//     let sure = choices[rowNumber]; // either "sure" or "lottery"
    
//     console.log("Parsed values:");
//     console.log("  type:", type);
//     console.log("  probability:", probability);
//     console.log("  sure (choice at rowNumber):", sure);
    
//     if (sure == "sure") {
//         console.log("BRANCH: sure == 'sure'");
//         if (type == "G") {
//             console.log("  SUB-BRANCH: type == 'G'");
//             console.log("  sure_payments[rowNumber]:", sure_payments[rowNumber]);
//             const result = sure_payments[rowNumber] + 5;
//             console.log("  RETURN VALUE:", result, "(sure_payments[" + rowNumber + "] + 5)");
//             return result;
//         } else if (type == "L") {
//             console.log("  SUB-BRANCH: type == 'L'");
//             console.log("  sure_payments[rowNumber]:", sure_payments[rowNumber]);
//             const result = -sure_payments[rowNumber] + 30;
//             console.log("  RETURN VALUE:", result, "(-sure_payments[" + rowNumber + "] + 30)");
//             return result;
//         }
//         else if (type == "A") {
//             console.log("  SUB-BRANCH: type == 'A'");
//             console.log("  Y_valuesMPL[rowNumber]:", Y_valuesMPL[rowNumber]);
//             console.log("  probability:", probability);
//             const result = probability + 5;
//             console.log("  RETURN VALUE:", result, "(Y_valuesMPL[" + rowNumber + "] + " + probability + " + 5)");
//             return result;
//         }
//     } else if (sure == "lottery") {
//         console.log("BRANCH: sure == 'lottery'");
//         console.log("  chosenStatus:", chosenStatus);
        
//         if (chosenStatus == "lottery") {
//             console.log("  SUB-BRANCH: chosenStatus == 'lottery'");
//             let randomDraw = Math.random();
//             console.log("  randomDraw:", randomDraw);
            
//             if (type == "G") {
//                 console.log("    TYPE: G (Gains)");
//                 console.log("    probability/100:", probability/100);
//                 if (randomDraw <= (probability / 100)) {
//                     const result = 25 + 5;
//                     console.log("    LOTTERY WIN: RETURN VALUE:", result, "(25 + 5)");
//                     return result;
//                 }
//                 else if (randomDraw > (probability / 100)) {
//                     const result = 0 + 5;
//                     console.log("    LOTTERY LOSE: RETURN VALUE:", result, "(0 + 5)");
//                     return result;
//                 }
//             } else if (type == "L") {
//                 console.log("    TYPE: L (Losses)");
//                 console.log("    probability/100:", probability/100);
//                 if (randomDraw <= (probability / 100)) {
//                     const result = -25 + 30;
//                     console.log("    LOTTERY WIN (bad outcome): RETURN VALUE:", result, "(-25 + 30)");
//                     return result;
//                 } 
//                 else if (randomDraw > (probability / 100)) {
//                     const result = 0 + 30;
//                     console.log("    LOTTERY LOSE (good outcome): RETURN VALUE:", result, "(0 + 30)");
//                     return result;
//                 }
//             } else if (type == "A") {
//                 console.log("    TYPE: A (Ambiguity)");
//                 if (randomDraw <= 0.5) {
//                     console.log("    Y_valuesMPL[rowNumber]:", Y_valuesMPL[rowNumber]);
//                     const result = Y_valuesMPL[rowNumber] + probability + 5;
//                     console.log("    AMBIGUITY OUTCOME 1: RETURN VALUE:", result, "(Y_valuesMPL[" + rowNumber + "] + " + probability + " + 5)");
//                     return result;
//                 } else if (randomDraw > 0.5) {
//                     const result = 2 * probability + 5;
//                     console.log("    AMBIGUITY OUTCOME 2: RETURN VALUE:", result, "(5)");
//                     return result;
//                 }
//             }
//         }
//         else if (chosenStatus == "mirror") {
//             console.log("  SUB-BRANCH: chosenStatus == 'mirror'");
//             if (type == "G") {
//                 console.log("    TYPE: G (Gains) - Mirror");
//                 console.log("    probability:", probability);
//                 const result = (probability/100) * 25 + 5;
//                 console.log("    MIRROR RETURN VALUE:", result, "(" + probability + " * 25 + 5)");
//                 return result;
//             } else if (type == "L") {
//                 console.log("    TYPE: L (Losses) - Mirror");
//                 console.log("    probability:", probability);
//                 const result = - (probability/100) * 25 + 30;
//                 console.log("    MIRROR RETURN VALUE:", result, "(-" + probability + " * 25 + 30)");
//                 return result;
//             } else if (type == "A") {
//                 console.log("    TYPE: A (Ambiguity) - Mirror");
//                 let endow = 0;
//                 if (probability == 10) { endow = 15; }
//                 else if (probability == 15) { endow = 20; }
//                 console.log("    probability:", probability);
//                 console.log("    endow:", endow);
//                 console.log("    Y_valuesMPL[rowNumber]:", Y_valuesMPL[rowNumber]);
//                 const result = -probability + Y_valuesMPL[rowNumber] + endow;
//                 console.log("    MIRROR RETURN VALUE:", result, "(-" + probability + " + Y_valuesMPL[" + rowNumber + "] + " + endow + ")");
//                 return result;
//             }
//         } 
//     }
    
//     console.log("ERROR: No condition matched, returning undefined!");
//     console.log("=== calculateMPLPayment DEBUG END ===");
//     return undefined;
// }
// function showInstructionModal() {
//     helpPageCounter ++;
//     console.log("helpPageCounter is ", helpPageCounter);
//     const modal = document.createElement('div');
//     modal.style.cssText = `
//         position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
//         background-color: rgba(0,0,0,0.5); z-index: 2000; 
//         display: flex; justify-content: center; align-items: center;
//     `;
    
//     const modalContent = document.createElement('div');
//     modalContent.style.cssText = `
//         background: white; padding: 20px; border-radius: 8px; 
//         max-width: 80%; max-height: 80%; overflow-y: auto;
//         position: relative;
//     `;
    
//     // You can customize the help content based on the current block type
//     let helpContent = '';
//     let spanPayment = 0;
//     console.log("treatment is " + treatment);
//     if (treatment == "hard"){
//         spanPayment = spanMplPayment_hard;
//     }
//     else if (treatment == "easy"){
//         spanPayment = spanMplPayment_easy;
//     }
//     if (statusMPL === "mirror") {
//         helpContent = 
//         `<h2>${language.instructionsDecisionTable.title}</h2>
//         <h3>${language.instructionsBoxesWithMoney.subTitle}</h3>
//         <p>${language.instructionsBoxesWithMoney.initialSum}</p>
//         <p>${language.instructionsBoxesWithMoney.chooseSet}</p>
//         ${generateHTML("Lot A", "Lot B")}
//         <p>${language.instructionsBoxesWithMoney.choice}</p>
//         <p>${language.instructionsBoxesWithMoney.moneyInside}</p>
//         <h3>${language.instructionsDecisionTable.subTitle}</h3>
//         <p>${language.instructionsDecisionTable.description}</p>
//         ${example1MPL.replace('width: 50vw; margin: auto;', 'width: 100%; margin: 0;')}
//         <p>${language.instructionsDecisionTable.exampleAbove}</p>
//         <p>${language.instructionsDecisionTable.exampleBelow}</p>
//         ${example2MPL.replace('width: 50vw; margin: auto;', 'width: 100%; margin: 0;')}
//         <p>${language.instructionsDecisionTable.clickToChoose}</p>
//         ${example1MPLSelected.replace('width: 50vw; margin: auto;', 'width: 100%; margin: 0;')}
//         <h3>${language.instructionsPaymentRuleMirror.subTitle}</h3>
//         <p>${language.instructionsPaymentRuleMirror.paymentRule}</p>
//         <br>
//         <p>${language.instructionsPaymentRuleMirror.example1}</p>
//         ${example1MPLSelected.replace('width: 50vw; margin: auto;', 'width: 100%; margin: 0;')}
//         <p>${language.instructionsPaymentRuleMirror.example1Payment}</p>
//         <br>
//         <p>${language.instructionsPaymentRuleMirror.example2}</p>
//         ${example3MPLSelected.replace('width: 50vw; margin: auto;', 'width: 100%; margin: 0;')}
//         <p>${language.instructionsPaymentRuleMirror.example2Payment}</p>
//          <h3>${language.instructionsChoosingASetOfBoxes.subTitle}</h3>
//         <p>${language.instructionsChoosingASetOfBoxes.description}</p>
//         <p>${language.instructionsChoosingASetOfBoxes.example1}</p>
//         ${example5MPL.replace('width: 50vw; margin: auto;', 'width: 100%; margin: 0;')}
//         <p>${language.instructionsChoosingASetOfBoxes.chooseSet}</p>
//         ${example5MPLSelected.replace('width: 50vw; margin: auto;', 'width: 100%; margin: 0;')}
//         <p>${language.instructionsChoosingASetOfBoxes.example2}</p>
//         <p>${language.instructionsChoosingASetOfBoxes.computerOnlyOneChoice}</p>
//         <h3>${language.instructionsChoosingASetOfBoxes.severalTables}</h3>
//         <p>${language.instructionsChoosingASetOfBoxes.severalTablesDescription}</p>
//         <p>${language.instructionsChoosingASetOfBoxes.incentivesMPL.replace("{propSelecForMPL}", propSelecForMPL)}</p>
//         <h3>${language.instructionsSpanInMPL.subTitle}</h3>
//         <p>${language.instructionsSpanInMPL.MPLInSpan}</p>
//         <p>${language.instructionsSpanInMPL.MPLInSpanRepeat}</p>
//         <p>${language.instructionsSpanInMPL.priority}</p>
//         <h3>${language.instructionsSpanInMPL.incentives}</h3>
//         <p>${language.instructionsSpanInMPL.incentivesSpan.replace("{bonusSpan}", spanPayment)}</p>
//         <p>${language.instructionsSpanInMPL.incentivesSpanDetails}</p>
//         <p>${language.instructionsSpanInMPL.incentiveSpanExample.replace("{bonusSpan}", spanPayment).replace("{examplePaymentSpan}", Math.round((spanPayment * 0.8)*100)/100)}</p>
//         <p>${language.instructionsSpanInMPL.randomMechanism}</p>
//          `;
        
//     } else if (statusMPL === "lottery") {
//         helpContent = 
//         `<h2>${language.instructionsDecisionTable.title}</h2>
//         <h3>${language.instructionsBoxesWithMoney.subTitle}</h3>
//         <p>${language.instructionsBoxesWithMoney.initialSum}</p>
//         <p>${language.instructionsBoxesWithMoney.chooseSet}</p>
//         ${generateHTML("Lot A", "Lot B")}
//         <p>${language.instructionsBoxesWithMoney.choice}</p>
//         <p>${language.instructionsBoxesWithMoney.moneyInside}</p>
//         <h3>${language.instructionsDecisionTable.subTitle}</h3>
//         <p>${language.instructionsDecisionTable.description}</p>
//         ${example1MPL.replace('width: 50vw; margin: auto;', 'width: 100%; margin: 0;')}
//         <p>${language.instructionsDecisionTable.exampleAbove}</p>
//         <p>${language.instructionsDecisionTable.exampleBelow}</p>
//         ${example2MPL.replace('width: 50vw; margin: auto;', 'width: 100%; margin: 0;')}
//         <p>${language.instructionsDecisionTable.clickToChoose}</p>
//         ${example1MPLSelected.replace('width: 50vw; margin: auto;', 'width: 100%; margin: 0;')}
//         <h3>${language.instructionsPaymentRuleRandomBox.subTitle}</h3>
//         <p>${language.instructionsPaymentRuleRandomBox.paymentRule}</p>
//         <br>
//         <p>${language.instructionsPaymentRuleRandomBox.example1}</p>
//         ${example1MPLSelected.replace('width: 50vw; margin: auto;', 'width: 100%; margin: 0;')}
//         <p>${language.instructionsPaymentRuleRandomBox.example1Payment}</p>
//         <br>
//         <p>${language.instructionsPaymentRuleRandomBox.example2}</p>
//         ${example3MPLSelected.replace('width: 50vw; margin: auto;', 'width: 100%; margin: 0;')}
//         <p>${language.instructionsPaymentRuleRandomBox.example2Payment}</p>
//         <h3>${language.instructionsChoosingASetOfBoxes.subTitle}</h3>
//         <p>${language.instructionsChoosingASetOfBoxes.description}</p>
//         <p>${language.instructionsChoosingASetOfBoxes.example1}</p>
//         ${example5MPL.replace('width: 50vw; margin: auto;', 'width: 100%; margin: 0;')}
//         <p>${language.instructionsChoosingASetOfBoxes.chooseSet}</p>
//         ${example5MPLSelected.replace('width: 50vw; margin: auto;', 'width: 100%; margin: 0;')}
//         <p>${language.instructionsChoosingASetOfBoxes.example2}</p>
//         <p>${language.instructionsChoosingASetOfBoxes.computerOnlyOneChoice}</p>
//         <h3>${language.instructionsChoosingASetOfBoxes.severalTables}</h3>
//         <p>${language.instructionsChoosingASetOfBoxes.severalTablesDescription}</p>
//         <p>${language.instructionsChoosingASetOfBoxes.incentivesMPL.replace("{propSelecForMPL}", propSelecForMPL)}</p>
//         <h3>${language.instructionsSpanInMPL.subTitle}</h3>
//         <p>${language.instructionsSpanInMPL.MPLInSpan}</p>
//         <p>${language.instructionsSpanInMPL.MPLInSpanRepeat}</p>
//         <p>${language.instructionsSpanInMPL.priority}</p>
//         <h3>${language.instructionsSpanInMPL.incentives}</h3>
//         <p>${language.instructionsSpanInMPL.incentivesSpan.replace("{bonusSpan}", spanPayment)}</p>
//         <p>${language.instructionsSpanInMPL.incentivesSpanDetails}</p>
//         <p>${language.instructionsSpanInMPL.incentiveSpanExample.replace("{bonusSpan}", spanPayment).replace("{examplePaymentSpan}", Math.round((spanPayment * 0.8)*100)/100)}</p>
//         <p>${language.instructionsSpanInMPL.randomMechanism}</p>
//         `;
//     }
    
//     modalContent.innerHTML = `
//         ${helpContent}
//         <div style="margin-top: 20px; text-align: center;">
//             <button id="close-modal" style="padding: 8px 16px; background-color: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;">
//                 ${language.button.close || "Close"}
//             </button>
//         </div>
//     `;
    
//     modal.appendChild(modalContent);
//     document.body.appendChild(modal);
    
//     // Close button handler
//     document.getElementById('close-modal').addEventListener('click', function() {
//         document.body.removeChild(modal);
//     });
// }
function showInstructionModalForQuestions(instructionType, isPaymentRulePhase) {

    // Check if modal already exists - prevent duplicates
    if (document.getElementById('instruction-modal')) {
        console.log("Modal already open, preventing duplicate");
        return;
    }

    helpPageCounter ++;
    console.log("helpPageCounter is ", helpPageCounter);
    const modal = document.createElement('div');
    modal.id = 'instruction-modal';
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
        background-color: rgba(0,0,0,0.5); z-index: 2000; 
        display: flex; justify-content: center; align-items: center;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white; padding: 20px; border-radius: 8px; 
        max-width: 80%; max-height: 80%; overflow-y: auto;
        position: relative;
    `;

    //Prevent Enter key from submitting form while modal is open
    function preventEnterSubmission(e) {
        if (e.key === 'Enter' && document.getElementById('instruction-modal')) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    }
    
    // Add the event listener
    document.addEventListener('keydown', preventEnterSubmission);
    
    let helpContent = '';
    if (instructionType === "mirror" && !isPaymentRulePhase) {
        console.log("Generating help content for mirror condition");
        helpContent = 
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

        <!-- <h2>${language.instructionsClickToChoose.title}</h2> --> 
        <p>${language.instructionsClickToChoose.clickToChoose}</p>
        ${example1MPLSelected.replace('width: 50vw; margin: auto;', 'width: 100%; margin: 0;')}
        <p>${language.instructionsClickToChoose.clickToChooseExample}</p>
        `;

    } else if (instructionType === "lottery" && !isPaymentRulePhase) {
        helpContent=
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

        <!--<h2>${language.instructionsClickToChoose.title}</h2>-->
        <p>${language.instructionsClickToChoose.clickToChoose}</p>
        ${example1MPLSelected.replace('width: 50vw; margin: auto;', 'width: 100%; margin: 0;')}
        <p>${language.instructionsClickToChoose.clickToChooseExample}</p>
        `;
    }
    else if (instructionType === "lottery" && isPaymentRulePhase) {
        helpContent =
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
        `
        ;
    }
    else if (instructionType === "mirror" && isPaymentRulePhase) {
        helpContent =
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
        `
        ;
    }
    else if (instructionType === "mplIncentives") {
    let decisionTableSubtitle = "";
        if (treatIs == "ineq") 
            {decisionTableSubtitle = language.instructionsDecisionTable.subTitleInequalities 
            exemple1Explanation = language.instructionsDecisionTable.example1ExplanationMirrorIncentivesIneq;
            exemple2Explanation = language.instructionsDecisionTable.example2ExplanationMirrorIncentivesIneq;

            }
        else if (treatIs == "mirr") {
            decisionTableSubtitle = language.instructionsDecisionTable.subTitle;
            exemple1Explanation = language.instructionsDecisionTable.example1ExplanationMirrorIncentivesMirr;
            exemple2Explanation = language.instructionsDecisionTable.example2ExplanationMirrorIncentivesMirr;
        }
    helpContent = 
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

        <!-- <h2>${language.instructionsClickToChoose.title}</h2> --> 
        <p>${language.instructionsClickToChoose.clickToChoose}</p>
        ${example1MPLSelected.replace('width: 50vw; margin: auto;', 'width: 100%; margin: 0;')}
        <p>${language.instructionsClickToChoose.clickToChooseExample}</p>`
    }
    
    modalContent.innerHTML = `
        ${helpContent}
        <div style="margin-top: 20px; text-align: center;">
            <button id="close-modal" style="padding: 8px 16px; background-color: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;">
                ${language.button.close || "Close"}
            </button>
        </div>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Close button handler
    document.getElementById('close-modal').addEventListener('click', function() {
        document.removeEventListener('keydown', preventEnterSubmission);
        document.body.removeChild(modal);
    });
    // Close when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            document.removeEventListener('keydown', preventEnterSubmission);
            modal.parentNode.removeChild(modal);
        }
    });
}

const example1MPL = `
        <div style="width: 50vw; margin: auto;">
        <table class="mpl">
            <tr>
            <th></th>
            <th colspan="2" style="color: red">Lot A</th>
            <th style="color: blue">Lot B</th>
            </tr>
            <tr>
            <th>Version</th>
            <th style="color: red"> 50 boîtes</th>
            <th style="color: red"> 50 boîtes</th>
            <th style="color: blue">100 boîtes</th>
            </tr>
            <tr>
            <td>1</td>
            <td class="choice" data-row="1" data-choice="lottery" style="color: red">
            16€
            <input type="radio" name="row1" value="lottery">
            </td>
            <td class="mirror" data-row="1" style="color: red">0€</td>
            <td class="choice" data-row="1" data-choice="sure" style="color: blue">
            4€
            <input type="radio" name="row1" value="sure">
            </td>
        </tr>
        </table>
        `; 

const example1MPLSelected = `
        <div style="width: 50vw; margin: auto;">
        <table class="mpl">
            <tr>
            <th></th>
            <th colspan="2" style="color: red">Lot A</th>
            <th style="color: blue">Lot B</th>
            </tr>
            <tr>
            <th>Version</th>
            <th style="color: red"> 50 boîtes</th>
            <th style="color: red"> 50 boîtes</th>
            <th style="color: blue">100 boîtes</th>
            </tr>
            <tr>
            <td>1</td>
            <td class="choice selected" data-row="1" data-choice="lottery" style="color: red">
            16€
            <input type="radio" name="row1" value="lottery" checked>
            </td>
            <td class="choice selected" data-row="1" style="color: red">0€</td>
            <td class="choice" data-row="1" data-choice="sure" style="color: blue">
            4€
            <input type="radio" name="row1" value="sure">
            </td>
        </tr>
        </table>
        `;

const example2MPL = `
        <div style="width: 50vw; margin: auto;">
        <table class="mpl">
            <tr>
            <th></th>
            <th colspan="2" style="color: red">Lot A</th>
            <th style="color: blue">Lot B</th>
            </tr>
            <tr>
            <th>Version</th>
            <th style="color: red"> 25 boîtes</th>
            <th style="color: red"> 75 boîtes</th>
            <th style="color: blue">100 boîtes</th>
            </tr>
            <tr>
            <td>1</td>
            <td class="choice" data-row="1" data-choice="lottery" style="color: red">
            -12€
            <input type="radio" name="row1" value="lottery">
            </td>
            <td class="choice" data-row="1" style="color: red">0€</td>
            <td class="choice" data-row="1" data-choice="sure" style="color: blue">
            -3€
            <input type="radio" name="row1" value="sure">
            </td>
        </tr>
        </table>
        `;
const example3MPLSelected = `
    <div style="width: 50vw; margin: auto;">
    <table class="mpl">
        <tr>
        <th></th>
        <th colspan="2" style="color: red">Lot A</th>
        <th style="color: blue">Lot B</th>
        </tr>
        <tr>
        <th>Version</th>
        <th style="color: red"> 50 boîtes</th>
        <th style="color: red"> 50 boîtes</th>
        <th style="color: blue">100 boîtes</th>
        </tr>
        <tr>
        <td>1</td>
        <td class="choice" data-row="1" data-choice="lottery" style="color: red">
        -8€
        <input type="radio" name="row1" value="lottery">
        </td>
        <td class="choice" data-row="1" style="color: red">0€</td>
        <td class="choice selected" data-row="1" data-choice="sure" style="color: blue">
        -6€
        <input type="radio" name="row1" value="sure">
        </td>
    </tr>
    </table>
    `;

const example1MPLSelectedWithEndowment = `
        <div style="width: 50vw; margin: auto;">
        <ul>
        <li><span style="color: green">Vous serez payé 5€ plus la valeur d'une boîte tirée au hasard du lot choisi.</span></li><br>
        </ul></div>
        <table class="mpl">
            <tr>
            <th></th>
            <th colspan="2" style="color: red">Lot A</th>
            <th style="color: blue">Lot B</th>
            </tr>
            <tr>
            <th>Version</th>
            <th style="color: red"> 50 boîtes</th>
            <th style="color: red"> 50 boîtes</th>
            <th style="color: blue">100 boîtes</th>
            </tr>
            <tr>
            <td>1</td>
            <td class="choice selected" data-row="1" data-choice="lottery" style="color: red">
            16€
            <input type="radio" name="row1" value="lottery" checked>
            </td>
            <td class="choice selected" data-row="1" style="color: red">0€</td>
            <td class="choice" data-row="1" data-choice="sure" style="color: blue">
            4€
            <input type="radio" name="row1" value="sure">
            </td>
        </tr>
        </table>
        `;

const example3MPLSelectedWithEndowment = `
        <div style="width: 50vw; margin: auto;">
        <span style="color: green">Vous serez payé 20€ plus la valeur d'une boîte tirée au hasard du lot choisi.</span></li><br>
        </div>
        <table class="mpl">
            <tr>
            <th></th>
            <th colspan="2" style="color: red">Lot A</th>
            <th style="color: blue">Lot B</th>
            </tr>
            <tr>
            <th>Version</th>
            <th style="color: red"> 50 boîtes</th>
            <th style="color: red"> 50 boîtes</th>
            <th style="color: blue">100 boîtes</th>
            </tr>
            <tr>
            <td>1</td>
            <td class="choice selected" data-row="1" data-choice="lottery" style="color: red">
            -8€
            <input type="radio" name="row1" value="lottery" checked>
            </td>
            <td class="choice selected" data-row="1" style="color: red">0€</td>
            <td class="choice" data-row="1" data-choice="sure" style="color: blue">
            4€
            <input type="radio" name="row1" value="sure">
            </td>
        </tr>
        </table>
        `;

const example4MPLSelected = `
    <div style="width: 50vw; margin: auto;">
    <table class="mpl">
        <tr>
        <th></th>
        <th colspan="2" style="color: red">Lot A</th>
        <th style="color: blue">Lot B</th>
        </tr>
        <tr>
        <th>Version</th>
        <th style="color: red"> 50 boîtes</th>
        <th style="color: red"> 50 boîtes</th>
        <th style="color: blue">100 boîtes</th>
        </tr>
        <tr>
        <td>1</td>
        <td class="choice" data-row="1" data-choice="lottery" style="color: red">
        -8€
        <input type="radio" name="row1" value="lottery">
        </td>
        <td class="choice" data-row="1" style="color: red">0€</td>
        <td class="choice selected" data-row="1" data-choice="sure" style="color: blue">
        -6€
        <input type="radio" name="row1" value="sure">
        </td>
    </tr>
    </table>
    `;

    // ...existing code...
const example5MPL = `
        <div style="width: 50vw; margin: auto;">
        <table class="mpl">
            <tr>
            <th></th>
            <th colspan="2" style="color: red">Lot A</th>
            <th style="color: blue">Lot B</th>
            </tr>
            <tr>
            <th>Version</th>
            <th style="color: red"> 40 boîtes</th>
            <th style="color: red"> 60 boîtes</th>
            <th style="color: blue">100 boîtes</th>
            </tr>
            <tr>
            <td>1</td>
            <td class="choice" data-row="1" data-choice="lottery" style="color: red">
            10€
            <input type="radio" name="row1" value="lottery">
            </td>
            <td class="mirror" data-row="1" style="color: red">0€</td>
            <td class="choice" data-row="1" data-choice="sure" style="color: blue">
            1€
            <input type="radio" name="row1" value="sure">
            </td>
            </tr>
            <tr>
            <td>2</td>
            <td class="choice" data-row="2" data-choice="lottery" style="color: red">
            10€
            <input type="radio" name="row2" value="lottery">
            </td>
            <td class="mirror" data-row="2" style="color: red">0€</td>
            <td class="choice" data-row="2" data-choice="sure" style="color: blue">
            2€
            <input type="radio" name="row2" value="sure">
            </td>
            </tr>
            <tr>
            <td>3</td>
            <td class="choice" data-row="3" data-choice="lottery" style="color: red">
            10€
            <input type="radio" name="row3" value="lottery">
            </td>
            <td class="mirror" data-row="3" style="color: red">0€</td>
            <td class="choice" data-row="3" data-choice="sure" style="color: blue">
            3€
            <input type="radio" name="row3" value="sure">
            </td>
            </tr>
            <tr>
            <td>4</td>
            <td class="choice" data-row="4" data-choice="lottery" style="color: red">
            10€
            <input type="radio" name="row4" value="lottery">
            </td>
            <td class="mirror" data-row="4" style="color: red">0€</td>
            <td class="choice" data-row="4" data-choice="sure" style="color: blue">
            4€
            <input type="radio" name="row4" value="sure">
            </td>
            </tr>
            <tr>
            <td>5</td>
            <td class="choice" data-row="5" data-choice="lottery" style="color: red">
            10€
            <input type="radio" name="row5" value="lottery">
            </td>
            <td class="mirror" data-row="5" style="color: red">0€</td>
            <td class="choice" data-row="5" data-choice="sure" style="color: blue">
            5€
            <input type="radio" name="row5" value="sure">
            </td>
            </tr>
            <tr>
            <td>6</td>
            <td class="choice" data-row="6" data-choice="lottery" style="color: red">
            10€
            <input type="radio" name="row6" value="lottery">
            </td>
            <td class="mirror" data-row="6" style="color: red">0€</td>
            <td class="choice" data-row="6" data-choice="sure" style="color: blue">
            6€
            <input type="radio" name="row6" value="sure">
            </td>
            </tr>
            <tr>
            <td>7</td>
            <td class="choice" data-row="7" data-choice="lottery" style="color: red">
            10€
            <input type="radio" name="row7" value="lottery">
            </td>
            <td class="mirror" data-row="7" style="color: red">0€</td>
            <td class="choice" data-row="7" data-choice="sure" style="color: blue">
            7€
            <input type="radio" name="row7" value="sure">
            </td>
            </tr>
            <tr>
            <td>8</td>
            <td class="choice" data-row="8" data-choice="lottery" style="color: red">
            10€
            <input type="radio" name="row8" value="lottery">
            </td>
            <td class="mirror" data-row="8" style="color: red">0€</td>
            <td class="choice" data-row="8" data-choice="sure" style="color: blue">
            8€
            <input type="radio" name="row8" value="sure">
            </td>
            </tr>
            <tr>
            <td>9</td>
            <td class="choice" data-row="9" data-choice="lottery" style="color: red">
            10€
            <input type="radio" name="row9" value="lottery">
            </td>
            <td class="mirror" data-row="9" style="color: red">0€</td>
            <td class="choice" data-row="9" data-choice="sure" style="color: blue">
            9€
            <input type="radio" name="row9" value="sure">
            </td>
            </tr>
            <tr>
            <td>10</td>
            <td class="choice" data-row="10" data-choice="lottery" style="color: red">
            10€
            <input type="radio" name="row10" value="lottery">
            </td>
            <td class="mirror" data-row="10" style="color: red">0€</td>
            <td class="choice" data-row="10" data-choice="sure" style="color: blue">
            10€
            <input type="radio" name="row10" value="sure">
            </td>
            </tr>
        </table>
        `; 

const example5MPLSelected = `
        <div style="width: 50vw; margin: auto;">
        <table class="mpl">
            <tr>
            <th></th>
            <th colspan="2" style="color: red">Lot A</th>
            <th style="color: blue">Lot B</th>
            </tr>
            <tr>
            <th>Version</th>
            <th style="color: red"> 40 boîtes</th>
            <th style="color: red"> 60 boîtes</th>
            <th style="color: blue">100 boîtes</th>
            </tr>
            <tr>
            <td>1</td>
            <td class="choice selected" data-row="1" data-choice="lottery" style="color: red">
            10€
            <input type="radio" name="row1" value="lottery" checked>
            </td>
            <td class="choice selected" data-row="1" style="color: red">0€</td>
            <td class="choice" data-row="1" data-choice="sure" style="color: blue">
            1€
            <input type="radio" name="row1" value="sure">
            </td>
            </tr>
            <tr>
            <td>2</td>
            <td class="choice selected" data-row="2" data-choice="lottery" style="color: red">
            10€
            <input type="radio" name="row2" value="lottery" checked>
            </td>
            <td class="choice selected" data-row="2" style="color: red">0€</td>
            <td class="choice" data-row="2" data-choice="sure" style="color: blue">
            2€
            <input type="radio" name="row2" value="sure">
            </td>
            </tr>
            <tr>
            <td>3</td>
            <td class="choice selected" data-row="3" data-choice="lottery" style="color: red">
            10€
            <input type="radio" name="row3" value="lottery" checked>
            </td>
            <td class="choice selected" data-row="3" style="color: red">0€</td>
            <td class="choice" data-row="3" data-choice="sure" style="color: blue">
            3€
            <input type="radio" name="row3" value="sure">
            </td>
            </tr>
            <tr>
            <td>4</td>
            <td class="choice selected" data-row="4" data-choice="lottery" style="color: red">
            10€
            <input type="radio" name="row4" value="lottery" checked>
            </td>
            <td class="choice selected" data-row="4" style="color: red">0€</td>
            <td class="choice" data-row="4" data-choice="sure" style="color: blue">
            4€
            <input type="radio" name="row4" value="sure">
            </td>
            </tr>
            <tr>
            <td>5</td>
            <td class="choice selected" data-row="5" data-choice="lottery" style="color: red">
            10€
            <input type="radio" name="row5" value="lottery" checked>
            </td>
            <td class="choice selected" data-row="5" style="color: red">0€</td>
            <td class="choice" data-row="5" data-choice="sure" style="color: blue">
            5€
            <input type="radio" name="row5" value="sure">
            </td>
            </tr>
            <tr>
            <td>6</td>
            <td class="choice selected" data-row="6" data-choice="lottery" style="color: red">
            10€
            <input type="radio" name="row6" value="lottery" checked>
            </td>
            <td class="choice selected" data-row="6" style="color: red">0€</td>
            <td class="choice" data-row="6" data-choice="sure" style="color: blue">
            6€
            <input type="radio" name="row6" value="sure">
            </td>
            </tr>
            <tr>
            <td>7</td>
            <td class="choice selected" data-row="7" data-choice="lottery" style="color: red">
            10€
            <input type="radio" name="row7" value="lottery" checked>
            </td>
            <td class="choice selected" data-row="7" style="color: red">0€</td>
            <td class="choice" data-row="7" data-choice="sure" style="color: blue">
            7€
            <input type="radio" name="row7" value="sure">
            </td>
            </tr>
            <tr>
            <td>8</td>
            <td class="choice" data-row="8" data-choice="lottery" style="color: red">
            10€
            <input type="radio" name="row8" value="lottery">
            </td>
            <td class="choice" data-row="8" style="color: red">0€</td>
            <td class="choice selected" data-row="8" data-choice="sure" style="color: blue">
            8€
            <input type="radio" name="row8" value="sure" checked>
            </td>
            </tr>
            <tr>
            <td>9</td>
            <td class="choice" data-row="9" data-choice="lottery" style="color: red">
            10€
            <input type="radio" name="row9" value="lottery">
            </td>
            <td class="choice" data-row="9" style="color: red">0€</td>
            <td class="choice selected" data-row="9" data-choice="sure" style="color: blue">
            9€
            <input type="radio" name="row9" value="sure" checked>
            </td>
            </tr>
            <tr>
            <td>10</td>
            <td class="choice" data-row="10" data-choice="lottery" style="color: red">
            10€
            <input type="radio" name="row10" value="lottery">
            </td>
            <td class="choice" data-row="10" style="color: red">0€</td>
            <td class="choice selected" data-row="10" data-choice="sure" style="color: blue">
            10€
            <input type="radio" name="row10" value="sure" checked>
            </td>
            </tr>
        </table>
        `;


const example6MPLSelected = // exemple for the first four comprehension questions
`
        <div style="width: 50vw; margin: auto;">
        <table class="mpl">
            <tr>
            <th></th>
            <th colspan="2" style="color: red">Lot A</th>
            <th style="color: blue">Lot B</th>
            </tr>
            <tr>
            <th>Version</th>
            <th style="color: red"> 50 boîtes</th>
            <th style="color: red"> 50 boîtes</th>
            <th style="color: blue">100 boîtes</th>
            </tr>
            <tr>
            <td>1</td>
            <td class="choice selected" data-row="1" data-choice="lottery" style="color: red">
            10€
            <input type="radio" name="row1" value="lottery" checked>
            </td>
            <td class="choice selected" data-row="1" style="color: red">0€</td>
            <td class="choice" data-row="1" data-choice="sure" style="color: blue">
            3€
            <input type="radio" name="row1" value="sure">
            </td>
        </tr>
        </table>
        `;

const example7MPLSelected = // exemple for the last training comprehension questions
`
        <div style="width: 50vw; margin: auto;">
        <table class="mpl">
            <tr>
            <th></th>
            <th colspan="2" style="color: red">Lot A</th>
            <th style="color: blue">Lot B</th>
            </tr>
            <tr>
            <th>Version</th>
            <th style="color: red"> 50 boîtes</th>
            <th style="color: red"> 50 boîtes</th>
            <th style="color: blue">100 boîtes</th>
            </tr>
            <tr>
            <td>1</td>
            <td class="choice" data-row="1" data-choice="lottery" style="color: red">
            -20€
            <input type="radio" name="row1" value="lottery" checked>
            </td>
            <td class="choice" data-row="1" style="color: red">0€</td>
            <td class="choice selected" data-row="1" data-choice="sure" style="color: blue">
            -5€
            <input type="radio" name="row1" value="sure">
            </td>
        </tr>
        </table>
        `;

const example8MPLSelected = // exemple for the first four training comprehension questions 
`
        <div style="width: 50vw; margin: auto;">
        <table class="mpl">
            <tr>
            <th></th>
            <th colspan="2" style="color: red">Lot A</th>
            <th style="color: blue">Lot B</th>
            </tr>
            <tr>
            <th>Version</th>
            <th style="color: red"> 50 boîtes</th>
            <th style="color: red"> 50 boîtes</th>
            <th style="color: blue">100 boîtes</th>
            </tr>
            <tr>
            <td>1</td>
            <td class="choice selected" data-row="1" data-choice="lottery" style="color: red">
            20€
            <input type="radio" name="row1" value="lottery" checked>
            </td>
            <td class="choice selected" data-row="1" style="color: red">0€</td>
            <td class="choice" data-row="1" data-choice="sure" style="color: blue">
            5€
            <input type="radio" name="row1" value="sure">
            </td>
        </tr>
        </table>
        `;

const example9MPLSelected = // exemple for the last comprehension question 
`
        <div style="width: 50vw; margin: auto;">
        <table class="mpl">
            <tr>
            <th></th>
            <th colspan="2" style="color: red">Lot A</th>
            <th style="color: blue">Lot B</th>
            </tr>
            <tr>
            <th>Version</th>
            <th style="color: red"> 50 boîtes</th>
            <th style="color: red"> 50 boîtes</th>
            <th style="color: blue">100 boîtes</th>
            </tr>
            <tr>
            <td>1</td>
            <td class="choice" data-row="1" data-choice="lottery" style="color: red">
            -10€
            <input type="radio" name="row1" value="lottery" checked>
            </td>
            <td class="choice" data-row="1" style="color: red">0€</td>
            <td class="choice selected" data-row="1" data-choice="sure" style="color: blue">
            -3€
            <input type="radio" name="row1" value="sure">
            </td>
        </tr>
        </table>
        `;
