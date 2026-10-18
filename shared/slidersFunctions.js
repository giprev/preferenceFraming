// /**
//  * Generates HTML for motivation sliders
//  * @param {number} nSliders - Number of sliders to generate
//  * @param {number} startValue - Starting value for sliders (0-100)
//  * @param {string} horizontalPosition - "centered" or "random"
//  * @param {string} verticalSpacing - CSS value for vertical spacing between sliders (e.g., "30px")
//  * @returns {string} HTML string containing all sliders
//  */
// function slidersMotivationGenerator(nSliders, startValue, horizontalPosition, verticalSpacing) {
//     let html = `
//         <div style="width: 1000px; max-width: 1000px; margin: 0 auto;">
//             <p>This is the overall prompt</p><br>
//     `;

//     for (let i = 1; i <= nSliders; i++) {
//         // Calculate margin-left based on horizontal position
//         let marginLeft;
//         if (horizontalPosition === "centered") {
//             marginLeft = "25%"; // Centers a 50% width slider
//         } else if (horizontalPosition === "random") {
//             marginLeft = (Math.random() * 50) + "%"; // Random between 0% and 50%
//         } else {
//             marginLeft = "25%"; // Default to centered
//         }

//         html += `
//             <div style="margin-bottom: ${verticalSpacing};">
//                 <!-- <p>Slider ${i}</p> --!>
//                 <div style="width: 50%; margin-left: ${marginLeft};">
//                     <input type="range" name="slider_${i}" min="0" max="100" value="${startValue}" style="width: 100%;">
//                 </div>
//             </div>
//         `;
//     }

//     html += `</div>`;

//     return html;
// }



/**
 * Generates HTML for motivation sliders
 * @param {number} nSliders - Number of sliders to generate
 * @param {number} startValue - Starting value for sliders (0-100)
 * @param {string} horizontalPosition - "centered" or "random"
 * @param {string} verticalSpacing - CSS value for vertical spacing between sliders (e.g., "30px")
 * @returns {string} HTML string containing all sliders
 */
function slidersMotivationGenerator(nSliders, startValue, horizontalPosition, verticalSpacing, taskName) {
    
    let html = '';
    if (taskName === 'instructionsSlidersMotivation') {
        html += `
        <div id="sliders-motivation-container" style="width: 1000px; max-width: 1000px; margin: 0 auto;">
        <h2>${language.slidersMotiv.titleInstructions}</h2><br>
        <p>${language.slidersMotiv.severalBars}</p>
        <p>${language.slidersMotiv.objCenter}</p>           
        <p><b>${language.slidersMotiv.bonus}</b></p>
        <p>${language.slidersMotiv.randomBar}</p>
        <p>${language.slidersMotiv.maxBonus}</p>
        <p>${language.slidersMotiv.linear}</p>
        <p>${language.slidersMotiv.example}</p>
        <p>${language.slidersMotiv.train}</p>
        <br>

    `;
    } else if (taskName === 'trialSlidersMotivation') {
        html += `
        <div id="sliders-motivation-container" style="width: 1000px; max-width: 1000px; margin: 0 auto;">
        <p>${language.slidersMotiv.remember}</p><br>
    `;
    }
    for (let i = 1; i <= nSliders; i++) {
        // Calculate margin-left based on horizontal position
        let marginLeft;
        if (horizontalPosition === "centered") {
            marginLeft = "25%"; // Centers a 50% width slider
        } else if (horizontalPosition === "random") {
            marginLeft = (Math.random() * 50) + "%"; // Random between 0% and 50%
        } else {
            marginLeft = "25%"; // Default to centered
        }

        html += `
            <div style="margin-bottom: ${verticalSpacing};">
                <div style="width: 50%; margin-left: ${marginLeft};">
                    <input type="range" 
                           name="slider_${i}" 
                           min="0" max="100" 
                           value="${startValue}" 
                           data-dragged="false"
                           data-start-value="${startValue}"
                           style="width: 100%;">
                </div>
            </div>
        `;
    }

    if (taskName === 'instructionsSlidersMotivation') {
    html += `
    <br>
    <p>${language.slidersMotiv.clickNextInstructions}</p>
    </div>`;}
    else if (taskName === 'trialSlidersMotivation') {
    html += `
    <br>
    </div>`;}

    // Add script to enforce drag behavior (prevent click-to-set)
    // html += `
    // <script>
    // (function() {
    // console.log('Initializing slider behavior for ${sliderId}');
    //     var container = document.getElementById('${sliderId}');
    //     if (!container) return;
        
    //     var sliders = container.querySelectorAll('input[type="range"]');
        
    //     sliders.forEach(function(slider) {
    //         var isDragging = false;
    //         var hasMoved = false;
    //         var startX = 0;
    //         var originalValue = parseInt(slider.dataset.startValue);
            
    //         // On mousedown, store start position and current value
    //         slider.addEventListener('mousedown', function(e) {
    //             isDragging = true;
    //             hasMoved = false;
    //             startX = e.clientX;
    //             slider.dataset.valueAtMousedown = slider.value;
    //         });
            
    //         slider.addEventListener('touchstart', function(e) {
    //             isDragging = true;
    //             hasMoved = false;
    //             startX = e.touches[0].clientX;
    //             slider.dataset.valueAtMousedown = slider.value;
    //         });
            
    //         // On mousemove, check if actually dragging (moved more than 5px)
    //         slider.addEventListener('mousemove', function(e) {
    //             if (isDragging && Math.abs(e.clientX - startX) > 5) {
    //                 hasMoved = true;
    //                 slider.dataset.dragged = 'true';
    //             }
    //         });
            
    //         slider.addEventListener('touchmove', function(e) {
    //             if (isDragging && Math.abs(e.touches[0].clientX - startX) > 5) {
    //                 hasMoved = true;
    //                 slider.dataset.dragged = 'true';
    //             }
    //         });
            
    //         // On mouseup, if no drag occurred, reset to previous value
    //         slider.addEventListener('mouseup', function(e) {
    //             if (!hasMoved && isDragging) {
    //                 slider.value = slider.dataset.valueAtMousedown || originalValue;
    //             }
    //             isDragging = false;
    //         });
            
    //         slider.addEventListener('touchend', function(e) {
    //             if (!hasMoved && isDragging) {
    //                 slider.value = slider.dataset.valueAtMousedown || originalValue;
    //             }
    //             isDragging = false;
    //         });
            
    //         // Prevent clicks on track from changing value
    //         slider.addEventListener('click', function(e) {
    //             if (slider.dataset.dragged !== 'true') {
    //                 e.preventDefault();
    //                 slider.value = originalValue;
    //                 console.log('Click prevented, slider value reset to', originalValue);
    //             }
    //         });
    //     });
    // })();
    // <\/script>
    // `;

    return html;
}


function processSlidersData(data, taskName) {
        const responses = JSON.parse(data.responses);
        
        // Store slider answers
        let slidersAnswers = {};
        let slidersDistance = {};
        let overallSlidersDistance = 0;
        
        // Iterate through all slider responses
        for (let key in responses) {
            if (key.startsWith('slider_')) {
                const value = parseInt(responses[key]);
                slidersAnswers[key] = value;
                
                // Calculate absolute distance from 50
                const distance = Math.abs(50 - value);
                slidersDistance[key] = distance;
                overallSlidersDistance += distance;
            }
        }
        
        // Store in data
        data.slidersAnswers = slidersAnswers;
        data.slidersDistance = slidersDistance;
        data.overallSlidersDistance = overallSlidersDistance;
        data.task = taskName;
        
        // Log to console
        console.log("slidersAnswers:", slidersAnswers);
        console.log("slidersDistance:", slidersDistance);
        console.log("overallSlidersDistance:", overallSlidersDistance);
    }