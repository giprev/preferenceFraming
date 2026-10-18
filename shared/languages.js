function generateRandomSimulations(outcomes, numSimulations = 10) {
    const simulations = [];
    for (let i = 1; i <= numSimulations; i++) {
        const randomOutcome = outcomes[Math.floor(Math.random() * outcomes.length)];
        simulations.push(`<li>Simulation ${i}: <span style='color: green'>${randomOutcome}</span></li>`);
    }
    return simulations.join('\n');
}


// First define the languages
const en = {
    welcomePage: {
        welcome: "Welcome!",
        clickNext: "Click on <strong>Next</strong> to continue!"
    },
    overviewPage: {
        purpose: "This experiment focuses on cognitive processes related to memory.",
        procedure: "It includes two memory tasks that you will alternate between.",
        anonimity: "All your results will remain anonymous.",
        credits: "This experiment is conducted by master's student Gildas Prévost under the supervision of Professor Dr. Bastien Blain, both at Université Paris 1 Panthéon-Sorbonne.",
        question: "If you have any questions or requests, please email gildas.prevost@etu.univ-paris1.fr.",
        withdrawal: "You are free to withdraw from the experiment at any time without penalty.",
        clickNext: "Click on <strong>Next</strong> to continue!"
    },    
    descriptionExperimentNback: {
        title: "Description of the experiment",
        twoGames: "You will have two different tasks to play: the visual 2-back and the letter n-back.",
        instructionsAfter: "You will receive instructions for each task after this page.",
        subBlockExplanation: "The experiment consists of 12 subBlocks. One block consists of a visual 2-back task and then a letter n-back task.",
        paymentAfter: "So you understand how you will be paid, you will receive the payment instructions after the task guidelines.",
        clickNext: "Click on <strong>Next</strong> to continue!"
        
    },
    instructions0back: {
        letter: "In this task, <strong>letters</strong> will appear on the screen consecutively.",
        yourTask1: "Your task will be <strong>to press the key 'J' if you see the letter <strong style='color:red'>X</strong> on the screen.</strong>",
        yourTask2: "Otherwise, press the <strong>key 'F'</strong>.</p>",
        image: "<img src='static/images/instruction_0back_en.gif' />"
    },    
    instructions1back: {
        letter: "In this task, <strong>letters</strong> will appear on the screen consecutively.",
        changeN: "Now you will switch to a different n-back level.",
        grid: "In this task, <strong>a dot appears in one of the squares of a grid</strong> on each presentation.",
        yourTask1: "Your task will be <strong>to press the key 'J' if the letter on the screen is the same as the <strong style='color:red'>previous</strong> one</strong>.",
        yourTask1Grid: "Your task will be <strong>to press the key 'J' if the location of the dot on the screen is the same as the <strong style='color:red'>previous</strong> one</strong>.",
        firstGrids: "At the first point of a series of presentations, you must press 'F'.",
        yourTask2: "Otherwise, press the <strong>key 'F'</strong>.",
        image: "<img src='static/images/instruction_1back_en.gif' />",
        liveDemo: nbackDemoHTML('nback-demo'),
        firstGameVisual: "Let's explain the visual 2-back.",
        firstGameLetter: "Let's explain the letter 1-back task.",
        allGame: "These instructions apply to the entire experiment."
    },
    instructions2back: {
        changeN: "Now you will switch to a different n-back level.",
        letter: "In this task, <strong>letters</strong> will appear on the screen consecutively.",
        grid: "In this task, <strong>a dot appears in one of the squares of a grid</strong> on each presentation.",
        yourTask1Grid: "Your task will be <strong>to press the key 'J' if the location of the dot on the screen is the same as <strong style='color:red'>two</strong> grids before</strong>.",
        firstGrids: "For the first two points of a series of presentations, you must press 'F'.",
        yourTask1: "Your task will be <strong>to press the key 'J' if the letter on the screen is the same as <strong style='color:red'>two</strong> letters earlier</strong>.",
        yourTask2: "Otherwise, press the <strong>key 'F'</strong>.",
        liveDemo: nbackDemoHTML('nback-demo'),
        image: "<img src='static/images/instruction_2back_en.gif' />",
        firstGameLetter: "Let's explain the letter 2-back task.",
        firstGameVisual: "Let's explain the visual 2-back.",
        allGame: "These instructions apply to the entire experiment."
    },
    instructions3back: {
        changeN: "Now you will switch to a different n-back level.",
        letter: "In this task, <strong>letters</strong> will appear on the screen consecutively.",
        yourTask1: "Your task will be <strong>to press the key 'J' if the letter on the screen is the same as <strong style='color:red'>three</strong> letters earlier</strong>.",
        yourTask2: "Otherwise, press the <strong>key 'F'</strong>.",
        image: "<img src='static/images/instruction_3back_en.gif' />",
        firstGameLetter: "Let's explain the letter 3-back task."
    },
    generalInstruction: {
        fastAndAccurate: "Try to be as fast and as accurate as possible!",
        clickNext: "If the instructions are clear, click on <strong>Next</strong>",
    },
    practice: {
        practice: "First, you can practice the task a little bit.",
        startPractice: "Press any key on the keyboard to start the practice!",
        end: "End of the practice."
    },
    feedbackPracticeBlock: {
        yourPerformance: "Your precision in the previous practice block was {accuracy}%.",
        rules: "If you achieve to have more than 80% precision in two practice blocks in a row, you will quit the training part.",
        achievedMessage: "You achieved more than 80% for two practice blocks in a row. Congratulation!",
        achievedClickNext: "You can now click on <strong>Next</strong> to move on to the next instructions!",
        notAchievedClickNext: "You can now click on <strong>Next</strong> to try a new practice block."
    },
    betweenBlocks: {
        rest: "Now you can rest a little.",
        continue:"Press any key to continue the task!",
        pressKey:"If you are ready, press a key!"
    },
    end:  {
        end: "End of the task.",
        thankYou: "Thank you!",
    },
    button: {
        next: "Next",
        previous: "Previous",
        finish: "Finish Experiment",
        close: "Close",
        help: "Help"
    },
    experimentStop: {
        title: "Practice Session Completed",
        message: "Unfortunately, you were unable to achieve the required accuracy of 80% in two consecutive practice blocks after Multiples attempts.",
        explanation: "This indicates that the task may be too difficult at this level. The experiment will now end.",
        thankYou: "Thank you for your participation and effort.",
        contact: "If you have any questions, please contact the research team."
    },
    fullscreen: {
        fullscreenText: "The experiment will switch to full screen mode when you press the button below.",
        fullscreenButton: "Continue"
    },
    feedback: {
        correct: "Correct!",
        wrong: "Wrong!",
        noResponse: "You did not respond!",
        accuracy: "You responded correctly on ",
        accuracy2: "% of the trials.",
        rt: "Your average response time was ",
        rt2: " ms."
    },
    task1back: {
        start: "The task start now. From now on, you won't receive any feedback.",
        remember1: "Remember: press the key <strong>'J'</strong> if the letter on the screen is the same as the <strong style='color:red'>previous</strong> one</strong>.",
        remember2: "Otherwise, press the key <strong>'F'</strong>.",
        press: "Press any key to start the task!",
    },
    task2back: {
        start: "The task start now. From now on, you won't receive any feedback.",
        remember1: "Remember: press the key <strong>'J'</strong> if the letter on the screen is the same as <strong style='color:red'>two</strong> letters earlier.",
        remember2: "Otherwise, press the key <strong>'F'</strong>.",
        press: "Press any key to start the task!",
    },
    task3back: {
        start: "The task start now. From now on, you won't receive any feedback.",
        remember1: "Remember: press the key <strong>'J'</strong> if the letter on the screen is the same as <strong style='color:red'>three</strong> letters earlier.",
        remember2: "Otherwise, press the key <strong>'F'</strong>.",
        press: "Press any key to start the task!",
    },
    parameters: {
        subject: "Subject Number:",
        session: "Session Number:"
    },
    startWarning: {
        startSubject: "You are about to start the game with<strong> Subject Number ",
        startSession: "</strong> and <strong>Session Number ",
        startButton: "Start the task!",
        goBackButton: "Change the parameters"
    },
    incentives: {
        selectedBlock: "The selected subBlock for payment was subBlock number ${subBlockInteger}:",
        accuracies: "Your accuracy in that subBlock was ${percentPostVisual}% for the trials following the visual 2-back, ${percentVN}% for the visual 2-back, ${percentN}% for the classic n-back.",
        visualDetails: "Visual 2-back total trials: ${totalTrialsVN}, correct trials: ${corTrialsVN}.",
        letterDetails: "Letter n-back total trials: ${totalTrialsN}, correct trials: ${corTrialsN}.",
        postVisualDetails: "Post visual 2-back total trials: ${postVisualTrials}, correct trials: ${corPostVisualTrials}.",
        paymentExplanation: "Your payment is based on your performance:\n- 50% on trials after visual 2-back (${accuracyPostVisual})\n- 25% on visual 2-back (${accuracyVN})\n- 25% on letter n-back (${accuracyN})",
        totalPayment: "Your total bonus payment will be: ${totalPayment}€",
        thankYou: "Thank you for participating in this experiment!",
        redirect: "We will now redirect you to the end page.",
        continue: "Press Enter to continue"
    },
    changeRules: {
        title: "Rules change!",
        ruleTo1Back: "Pay attention, you are now switching to 1-back letter (the 2-back visual remains the same)!",
        ruleTo3Back: "Pay attention, you are now switching to 3-back letter (the 2-back visual remains the same)!",
        pressKey: "Press any key to continue."
    },
    paymentExplanation1Back: {
        title: "Payment Information",
        mainText: "In addition to your base payment, you can earn a bonus of up to ${payment}€ based on your performance.",
        changeScore: `Attention! From now on, <span style="color:red;"><strong>50% of your bonus</strong></span> will depend on your performance with the <span style="color:red;"><strong>first letter</strong></span> after the visual 2-back in the selected block for payment.`,
        score: `
        <div class="payment-info">
            <div class="payment-illustration">
                <h3>How it works:</h3>
                <div class="nback-sequence" style="position: relative;">
                    <div class="nback-box">... K L <span class="highlight">M</span></div>
                    <div class="nback-box visual-nback-box" id="visual-nback-box">Visual 2-back<br>(10 trials)</div>
                    <div class="nback-box" id="letter-nback-box"><span class="highlight">M</span> A U Q P B ...</div>
                    <!-- Horizontal accolade below visual 2-back and letter 1-back -->
                <div style="position: absolute; left: 50%; transform: translateX(-30%); top: 75px; width: 400px; pointer-events: none;">
                <svg width="400" height="70"> <!-- Hauteur augmentée pour accommoder le décalage -->
                    <path d="M20,30 Q20,55 60,55 L350,55 Q390,55 390,30" stroke="#333" fill="transparent" stroke-width="3"/>
                </svg>
                    <div style="text-align:center; font-size:1em; margin-top:5px;">a block</div>
                </div>
                </div>
                <br><br>
                <p>At the end of the experiment, one block will be randomly selected for your bonus payment.</p>
                <p>Your bonus will be calculated based on your accuracy in three parts:</p>
                
                <ol>
                    <li><strong>50% of your bonus</strong> depends on your accuracy in the crucial first trial after the visual 2-back.
                    <br>In the example above, this means correctly identifying that the <span class="highlight">M</span> matches the last letter before the visual task.</li>
                    <li><strong>25% of your bonus</strong> depends on your accuracy in the visual 2-back trials.</li>
                    <li><strong>25% of your bonus</strong> depends on your accuracy in the remaining letter 1-back trials.</li>
                </ol>

                <div class="payment-formula">
                    Final bonus = __PAYMENT__€ × (0.5 × accuracy_after_visual + 0.25 × accuracy_visual + 0.25 × accuracy_letters)
                </div>
                
                <p><strong>Example:</strong> If you achieve:<br>
                - 100% accuracy in the trial after visual 2-back<br>
                - 50% accuracy in visual 2-back<br>
                - 50% accuracy in letter 1-back<br>
                Your bonus would be: __PAYMENT__€ × (0.5 × 1.0 + 0.25 × 0.5 + 0.25 × 0.5) = __PAYMENT__€ × 0.75</p>
                <br>
                <div class="important-note">
                    💡 Remember: The most important part for maximizing your bonus is to correctly identify matches immediately after the visual 2-back section!
                </div>
                <div style="margin-top: 20px; padding: 10px; background-color: #f8f9fa; border-left: 3px solid #dee2e6; font-size: 0.85em; color: #6c757d;">
                    <strong>Technical note:</strong> The final block contains only three letter 1-back trials. If randomly selected for payment, the 25% bonus portion will be calculated using these three trials plus the ten preceding letters.
                </div>
            </div>
        </div>`,
        clickNext: "When you have understood, click on <strong>Next</strong> to continue!"
    },
    paymentExplanation2Back: {
        title: "Payment Information",
        mainText: "In addition to your base payment, you can earn a bonus of up to ${payment}€ based on your performance.",
        changeScore: `Attention! From now on, <span style="color:red;"><strong>50% of your bonus</strong></span> will depend on your performance with the <span style="color:red;"><strong>two first letters</strong></span> after the visual 2-back in the selected block for payment.`,
        score: `
        <div class="payment-info">
            <div class="payment-illustration">
                <h3>How it works:</h3>
                <div class="nback-sequence" style="position: relative;">
                    <div class="nback-box">... K <span class="highlight">M P</span></div>
                    <div class="nback-box visual-nback-box" id="visual-nback-box">Visual 2-back<br>(10 trials)</div>
                    <div class="nback-box" id="letter-nback-box"><span class="highlight">M B</span> U Q P B ...</div>
                    <!-- Horizontal accolade below visual 2-back and letter 2-back -->
                <div style="position: absolute; left: 50%; transform: translateX(-30%); top: 75px; width: 400px; pointer-events: none;">
                <svg width="400" height="70"> <!-- Hauteur augmentée pour accommoder le décalage -->
                    <path d="M20,30 Q20,55 60,55 L350,55 Q390,55 390,30" stroke="#333" fill="transparent" stroke-width="3"/>
                </svg>
                    <div style="text-align:center; font-size:1em; margin-top:5px;">a block</div>
                </div>
                </div>
                <br><br>
                <p>At the end of the experiment, one block will be randomly selected for your bonus payment.</p>
                <p>Your bonus will be calculated based on your accuracy in three parts:</p>
                
                <ol>
                    <li><strong>50% of your bonus</strong> depends on your accuracy in the crucial two first trials after the visual 2-back.
                    <br>In the example above, this means correctly identifying that the <span class="highlight">M</span> but not the <span class="highlight">B</span> matches the <span class="highlight">M</span> before before the visual task.</li>
                    <li><strong>25% of your bonus</strong> depends on your accuracy in the visual 2-back trials.</li>
                    <li><strong>25% of your bonus</strong> depends on your accuracy in the remaining letter 2-back trials.</li>
                </ol>

                <div class="payment-formula">
                    Final bonus = __PAYMENT__€ × (0.5 × accuracy_after_visual + 0.25 × accuracy_visual + 0.25 × accuracy_letters)
                </div>
                
                <p><strong>Example:</strong> If you achieve:<br>
                - 100% accuracy in trials after visual 2-back<br>
                - 50% accuracy in visual 2-back<br>
                - 50% accuracy in letter 2-back<br>
                Your bonus would be: __PAYMENT__€ × (0.5 × 1.0 + 0.25 × 0.5 + 0.25 × 0.5) = __PAYMENT__€ × 0.75</p>
                <br>                
                <div class="important-note">
                💡 Remember: The most important thing to maximize your bonus is to identify, after each visual 2-back, whether the first letter of the letter 2-back matches the last letter you saw before the visual 2-back!
                </div>
                <div style="margin-top: 20px; padding: 10px; background-color: #f8f9fa; border-left: 3px solid #dee2e6; font-size: 0.85em; color: #6c757d;">
                    <strong>Technical note:</strong> The final block contains only three letter 2-back trials. If randomly selected for payment, the 25% bonus portion will be calculated using these three trials plus the ten preceding letters.
                </div>
            </div>
            </div>`,
        clickNext: "When you have understood, click on <strong>Next</strong> to continue!"

    },
    paymentExplanation3Back: {
        title: "Payment Information",
        mainText: "In addition to your base payment, you can earn a bonus of up to ${payment}€ based on your performance.",
        changeScore: `Attention! From now on, <span style="color:red;"><strong>50% of your bonus</strong></span> will depend on your performance with the <span style="color:red;"><strong>three first letters</strong></span> after the visual 2-back in the selected block for payment.`,
        score: `
        <div class="payment-info">
            <div class="payment-illustration">
                <h3>How it works:</h3>
                <div class="nback-sequence" style="position: relative;">
                    <div class="nback-box">... A <span class="highlight">K M P</span></div>
                    <div class="nback-box visual-nback-box" id="visual-nback-box">Visual 2-back<br>(10 trials)</div>
                    <div class="nback-box" id="letter-nback-box"><span class="highlight">Q M B</span> U P B Q...</div>
                    <!-- Horizontal accolade below visual 2-back and letter 3-back -->
                <div style="position: absolute; left: 50%; transform: translateX(-30%); top: 75px; width: 400px; pointer-events: none;">
                <svg width="400" height="70"> <!-- Hauteur augmentée pour accommoder le décalage -->
                    <path d="M20,30 Q20,55 60,55 L350,55 Q390,55 390,30" stroke="#333" fill="transparent" stroke-width="3"/>
                </svg>
                    <div style="text-align:center; font-size:1em; margin-top:5px;">a block</div>
                </div>
                </div>
                <br><br>
                <p>At the end of the experiment, one block will be randomly selected for your bonus payment.</p>
                <p>Your bonus will be calculated based on your accuracy in three parts:</p>
                
                <ol>
                    <li><strong>50% of your bonus</strong> depends on your accuracy in the crucial three first trials after the visual 2-back.
                    <br>In the example above, this means correctly identifying that the <span class="highlight">M</span> but not the <span class="highlight">B</span> or <span class="highlight">Q</span> matches the <span class="highlight">M</span> before before the visual task.</li>
                    <li><strong>25% of your bonus</strong> depends on your accuracy in the visual 2-back trials.</li>
                    <li><strong>25% of your bonus</strong> depends on your accuracy in the remaining letter 3-back trials.</li>
                </ol>

                <div class="payment-formula">
                    Final bonus = __PAYMENT__€ × (0.5 × accuracy_after_visual + 0.25 × accuracy_visual + 0.25 × accuracy_letters)
                </div>
                
                <p><strong>Example:</strong> If you achieve:<br>
                - 100% accuracy in trials after visual 2-back<br>
                - 50% accuracy in visual 2-back<br>
                - 50% accuracy in letter 3-back<br>
                Your bonus would be: __PAYMENT__€ × (0.5 × 1.0 + 0.25 × 0.5 + 0.25 × 0.5) = __PAYMENT__€ × 0.75</p>
                <br>

                <div class="important-note">
                💡 Remember: The most important thing to maximize your bonus is to identify, after each visual 2-back, whether the first three letters of the letter 3-back respectively match the last three letters you saw before the visual 2-back!
                </div>
                <div style="margin-top: 20px; padding: 10px; background-color: #f8f9fa; border-left: 3px solid #dee2e6; font-size: 0.85em; color: #6c757d;">
                    <strong>Technical note:</strong> The final block contains only three letter 3-back trials. If randomly selected for payment, the 25% bonus portion will be calculated using these three trials plus the ten preceding letters.
                </div>
            </div>
        </div>`,
        clickNext: "When you have understood, click on <strong>Next</strong> to continue!"

    },
    overallTrainingIntro: {
        title: "Full Training",
        description1Back: "Now you will practice how the real experiment works: alternating between the visual 2-back task and the letter 1-back task.",
        description3Back: "Now you will practice how the real experiment works: alternating between the visual 2-back task and the letter 3-back task.",
        structure1Back: "You will start with 10 trials of the letter 1-back, then do a block: one visual 2-back task (10 trials), followed by one letter 1-back task.",
        structure3Back: "You will start with 10 trials of the letter 3-back, then do a block: one visual 2-back task (10 trials), followed by one letter 3-back task.",
        importance: "This training will help you understand the full structure of a block and how the scoring system works.",
        feedback: "At the end, you will see feedback on your performance and how your bonus would be calculated if this were a real block.",
        highlightEasy: "Pay particular attention to the letter immediately after the visual 2-back — it is the most important for your bonus!",
        highlightHard: "Pay particular attention to the first {level} letters immediately after the visual 2-back — they are the most important for your bonus!",
        ready: "When you are ready to begin the full training, press any key."
    },
    overallTrainingFeedback: {
        title: "Training Complete - Scoring Demonstration",
        performance: "Here's how your performance would be scored if this were a real block:",
        beforeVisual: "Letters before visual 2-back: {accuracy}% accuracy ({correct}/{total} trials)",
        visualNback: "Visual n-back: {accuracy}% accuracy ({correct}/{total} trials)", 
        afterVisual: "Letters after visual 2-back: {accuracy}% accuracy ({correct}/{total} trials)",
        explain1Back: "The last letter before the visual 2-back was K, and the first letter after was C. Therefore you had to press the key 'F' when seeing the 'C' after the visual nback.",
        explain2Back: "The last two letters before the visual 2-back were 'A' and 'P', and the first two letters after were 'P' and 'K'. Therefore you had to press the key 'F' when seeing the 'P' and 'K' after the visual nback ('P' different from 'A' and 'K' from 'P').",
        explain3Back: "The last three letters before the visual 2-back were 'B', 'A', 'A', and the first three letters after were 'B', 'A', 'P'. Therefore you had to press the key 'J' when seeing 'B' and 'A' and 'F' when seeing 'P' after the visual nback ('P' different from 'A').",
        keyImportance: "💡 Key insight: The first {level} letters immediately after the visual 2-back are worth 50% of your bonus!",
        calculation: "Bonus calculation: €{payment} × (0.5 × {afterVisualAcc} + 0.25 × {visualAcc} + 0.25 × {letterAcc}) = €{totalBonus}",
        remember: "Remember: Always keep the last few letters in mind during the visual task!",
        continue: "Press any key to continue to the main experiment.",
        remindAfter3Back: {
            0:"To answer correctly to the next letter, you should think about the last last last letter <strong style='color:red;'>before the visual 2-back</strong>.",
            1: "To answer correctly to the next letter, you should think about the last last letter <strong style='color:red;'>before the visual 2-back</strong>.",
            2: "To answer correctly to the next letter, you should think about the last letter <strong style='color:red;'>before the visual 2-back</strong>.",
        },
        remindAfter2Back: {
            0: "To answer correctly to the next letter, you should think about the last last letter <strong style='color:red;'>before the visual 2-back</strong>.",
            1: "To answer correctly to the next letter, you should think about the last letter <strong style='color:red;'>before the visual 2-back</strong>.",
        },
        remindAfter1Back: "To answer correctly to the next letter, you should think about the last letter <strong style='color:red;'>before the visual 2-back</strong>.",
        remindBeforeHard:"Remember the following letters well to answer correctly at the first letter after the visual 2-back!",
        remindBefore1Back: "Remember this letter well to answer correctly at the first letter after the visual 2-back!",
    },


    // New: comprehension check (English)
    comprehensionIntro: "Before starting the experiment, you must answer a few comprehension questions correctly.",
    comprehension: {
        q1Hard: {
            prompt: "Question 1: Please select the correct answer:",
            options: [
                "I am paid based on the average of my accuracy across all trials (100% of the bonus).",
                "I am paid independently of my accuracy (100% of the bonus).",
                "I am paid based on the letter 3-back only for one block of the experiment.",
                "I am paid based on my accuracy on the visual 2-back (25% of the bonus), my accuracy on the following letter 3-back (25% of the bonus) and my accuracy on the first three letters of the letter 3-back in particular (50% of the bonus), for one block randomly selected among the 12 blocks of the experiment."
            ]
        },
        q1Easy: {
            prompt: "Question 1: Please select the correct answer:",
            options: [
                "I am paid based on the average of my accuracy across all trials (100% of the bonus).",
                "I am paid independently of my accuracy (100% of the bonus).",
                "I am paid based on the letter 1-back only for one block of the experiment.",
                "I am paid based on my accuracy on the visual 2-back (25% of the bonus), my accuracy on the following letter 1-back (25% of the bonus) and my accuracy on the first letter of the letter 1-back in particular (50% of the bonus), for one block randomly selected among the 12 blocks of the experiment."
            ]
        },
        q2: {
            prompt: "Question 2: I start a visual 2-back. The dot is in the same position as the last dot of the previous visual 2-back. Which key should I press?",
            options: [
                "The 'F' key.",
                "The 'J' key.",
                "The Space key."
            ]
        },
        q3Hard: {
            prompt: "Question 3: I have just finished a visual 2-back. Before it, the last three letters I saw were A O I. The letter A appears. Which key should I press?",
            options: [
                "The 'F' key.",
                "The 'J' key.",
                "The Space key."
            ]
        },
        q3Easy: {
            prompt: "Question 3: I have just finished a visual 2-back. Before it, the last letter I saw was A. The letter A appears. Which key should I press?",
            options: [
                "The 'F' key.",
                "The 'J' key.",
                "The Space key."
            ]
        },
        // correct answers as option strings (used for checking)
        correct_answers: {
            q1: "I am paid based on the letter n-back only for one block of the experiment.",
            q2: "The 'F' key.",
            q3: "The 'J' key."
        },
        tryAgain: "One or more answers are incorrect. Please review the instructions and try again.",
        success: "All answers are correct. Press any key to continue."
    },
    loopAgain: {
        failed: "You have responded incorrectly to at least one of the questions.",
        viewInstructions: "Next you are going to view the instructions again.",
        surveyAgain: "Then you will take the survey again.",
    },
    demographics: {
    preamble: "<strong>Demographics</strong>",
    questions: [
        "How old are you?",
        "Gender:",
        "Education level: (if you are a student, please choose the degree your are currently enrolled in)",
        "Work status:",
        "What is the range of your monthly income?",
        "Overall, how satisfied are you with your life nowadays?"
    ],
    options: {
        age: [
            "Under 18",
            "18-24",
            "25-34",
            "35-44",
            "45-54",
            "55-64",
            "65 or older",
            "Prefer not to say"
        ],
        gender: [
            "Male",
            "Female",
            "Other",
            "Prefer not to say"
        ],
        education: [
            "Less than a high school diploma",
            "High school degree or equivalent (e.g. GED)",
            "Some college, no degree",
            "Associate degree (e.g. AA, AS)",
            "Bachelor’s degree (e.g. BA, BS)",
            "Master’s degree (e.g. MA, MS, MEd)",
            "Professional degree (e.g. MD, DDS, DVM)",
            "Doctorate (e.g. PhD, EdD)",
            "Prefer not to say"
        ],
        work: [
            "Full-time employee (40 or more hours per week)",
            "Part-time employee (up to 39 hours per week)",
            "Unemployed - currently looking for work",
            "Unemployed - currently not looking for work",
            "Furlough",
            "Student",
            "Retired",
            "Homemaker",
            "Self-employed",
            "Unable to work",
            "Prefer not to say"
        ],
        income: [
            "Less than €500",
            "Between €500 and €1000",
            "Between €1000 and €1500",
            "Between €1500 and €2000",
            "Between €2000 and €3000",
            "Between €3000 and €5000",
            "More than €5000",
            "Not applicable",
            "Prefer not to say"
        ],
        life: [
            "0 (not at all)",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10 (very)",
            "Prefer not to say"
        ]
    },
    },
    prolificID: "Please enter your Prolific ID:",
    redirectProlific: "You will be automatically redirected to Prolific in 3 seconds...",
    endowmentsMPL: {
        G90: "Your initial endowment is 90€.",
        G75: "Your initial endowment is 75€.",
        G50: "Your initial endowment is 50€.",
        G25: "Your initial endowment is 25€.",
        G10: "Your initial endowment is 10€.",
        L90: "Your initial endowment is 90€.",
        L75: "Your initial endowment is 75€.",
        L50: "Your initial endowment is 50€.",
        L25: "Your initial endowment is 25€.",
        L10: "Your initial endowment is 10€.",
        A10: "Your initial endowment is 10€.",
        A15: "Your initial endowment is 15€.",
    },
    responseGrid: {
        currentAnswer: "Current answer",
        clear: "Clear",
    },
}


const fr = {
    welcomePage: {
        welcome: "Bienvenue!",
        clickNext: "Cliquez sur <strong>Suivant</strong> pour continuer!"
    },
    overviewPage: {
        purpose: "Cette expérience porte sur la prise de décision et la mémoire.",
        procedure: "Elle comprend des tâches de mémoire et des tâches de prise de décision.",
        IRB: "Cette expérience a été approuvée par l'Institutional Review Board (comité d'éthique) de Paris School of Economics, numéro d'approbation XXXXX.",
        anonimity: "Tous vos résultats resteront anonymes. Les données collectées seront utilisées à des fins de recherche uniquement.",
        credits: "Cette expérience est menée par l'étudiant en master Gildas Prévost sous la supervision du professeur Dr. Bastien Blain, tous deux à l'Université Paris 1 Panthéon-Sorbonne.",
        question: "Si vous avez des questions ou des demandes, veuillez envoyer un email à gildas.prevost@etu.univ-paris1.fr.",
        withdrawal: "Vous êtes libre de quitter l'expérience à tout moment, sans aucune conséquence.",
        phone: "L'usage de tout objet pouvant servir à noter des informations (téléphone, montre connectée, stylo etc.) est interdit, sous peine d'exclusion de l'expérience.",
        clickNext: "Cliquez sur <strong>Suivant</strong> pour continuer!"
    },
    descriptionExperimentNback: {
        title: "Description de l'expérience",
        twoGames: "Vous aurez deux tâches différentes à réaliser: le 2-back visuel et le n-back lettres.",
        instructionsAfter: "Vous recevrez les consignes pour chaque tâche après cette page.",
        subBlockExplanation: "L'expérience se compose de 12 blocs. Un bloc comprend une tâche de 2-back visuel suivie d'une tâche de n-back lettres.",
        paymentAfter: "Pour que vous compreniez comment vous serez payé·e, vous recevrez les explications du paiement après les consignes.",
        clickNext: "Cliquez sur <strong>Suivant</strong> pour continuer!"
    },
    descriptionExperimentSpanMPL: {
        title: "Description de l'expérience",
        threeParts: "L'expérience se déroule en <b>trois parties</b>.",
        part1: 'Dans la première partie, vous effectuerez une tâche de mémoire appelée "span de mémoire".',
        part2: "Dans la deuxième partie, vous effectuerez une variation de la tâche de span de mémoire.",
        part3: "Dans la troisième partie, vous effectuerez la tâche de span de mémoire en combinaison avec une tâche de prise de décision.",
        payment: "Votre paiement de base pour les deux premières parties est de <b>{notUnderstoodPayment}€</b>. Le paiement de base pour la troisième partie est de <b>{basePaymentThird}€</b>. Vous recevrez ce dernier si vous répondez correctement aux <b>questions de compréhension</b>. Sinon vous quitterez l'expérience.",
        paymentBonus: "De plus vous pouvez gagner des bonus pour chaque partie, en fonction de vos performances et de vos choix.",
        warningComprehensionQuestions: `Pendant la troisième partie, vous devrez répondre deux fois à des questions de compréhension (qui concerneront les consignes de la troisième partie).
        Si vous répondez incorrectement à plus d'une question sur les cinq, l'expérience s'arrêtera et votre paiement de base ne sera que de {notUnderstoodPayment}€, auquel vous ajouterez les bonus de la première et de la deuxième partie.`,
        paymentAfter: "Pour que vous compreniez comment les bonus sont calculés, vous recevrez les explications des bonus après les consignes pour chaque partie.",
        instructionsAfter: "Vous recevrez les consignes de la première partie après cette page.",
        clickNext: "Cliquez sur <strong>Suivant</strong> pour continuer!"
    },
    instruction_span_general:{
        title: "Consignes pour la tâche de span de mémoire (valables tout au long de l'expérience).",
        description: "À chaque essai, une séquence de chiffres s'affichera. Vous devrez la restituer dans le même ordre à l'aide d'un clavier à l'écran.",
        examplePresentation: "Par exemple, si vous voyez les chiffres <b style=\"color:blue;\">1</b>, <b style=\"color:blue;\">2</b>, <b style=\"color:blue;\">3</b>, vous devrez répondre <b style=\"color:green;\">1</b>, <b style=\"color:green;\">2</b>, <b style=\"color:green;\">3</b>.",
        precision: "La <b>précision</b> pour un essai est calculée comme suit: la proportion de chiffres correctement restitués dans la bonne position. Si vous saisissez plus de chiffres que la séquence n’en contient, les chiffres supplémentaires comptent comme des erreurs.",
        examplePrecision: `<ul>
        <li>Exemple 1: si vous avez vu <b style="color:blue;">1</b>, <b style="color:blue;">2</b>, <b style="color:blue;">3</b> 
        et que vous répondez <b style="color:green;">1</b>, <b style="color:red;">3</b>,  <b style="color:red;">2</b>, votre précision est de 1/3 = <b>33%</b>.
        </li>
        <li>Exemple 2: si vous avez vu <b style="color:blue;">1</b>, <b style="color:blue;">2</b>, <b style="color:blue;">3</b> 
        et que vous répondez <b style="color:green;">1</b>, <b style="color:green;">2</b>, <b style="color:red;">2</b>, <b style="color:red;">3</b>, votre précision est de 2/4 = <b>50%</b>.
        </li>
        <li>Exemple 3: si vous avez vu <b style="color:blue;">1</b>, <b style="color:blue;">2</b>, <b style="color:blue;">3</b> 
        et que vous répondez <b style="color:green;">1</b>, <b style="color:green;">2</b>, votre précision est de 2/3 = <b>66%</b>.
        </li>
        </ul>`,
        clickNext: "Cliquez sur <strong>Suivant</strong> pour continuer!"
    },
    instructionCalibration:{
        title: "Consignes pour la première partie.",
        rounds: "Dans cette partie, vous effectuerez <b>12</b> essais de la tâche de span de mémoire.",
        description: "À chaque essai, vous verrez une séquence de chiffres et vous devrez la retaper dans le même ordre dans lequel elle a été vue.",
        examplePresentation: "Par exemple, si vous voyez les chiffres <b style=\"color:blue;\">1</b>, <b style=\"color:blue;\">2</b>, <b style=\"color:blue;\">3</b>, vous devrez répondre <b style=\"color:blue;\">1</b>, <b style=\"color:blue;\">2</b>, <b style=\"color:blue;\">3</b>.",
        staircase: "La longueur des séquences de chiffres augmentera après une réussite (100% de précision) et diminuera après deux échecs consécutifs.",
        goal: "Votre but est d'atteindre la <b>plus longue séquence possible</b> à la fin des douze essais ! Votre bonus dépend de votre performance.",
        incentiveRule: "Votre bonus sera de {bonus}€, <b>multiplié par la longueur</b> obtenue après la dernière séquence, divisée par 10.",
        incentiveRuleExample: "Par exemple, si vous atteignez une longueur de 7, votre bonus sera de {bonus}€ x 7/10 = <b>{examplePayment}€</b>.",
        meanDuration: "Cette partie dure environ 3 minutes.",
        clickNext: "Cliquez sur <strong>Suivant</strong> pour commencer la première partie!"
    },
    // instructionsSpanSpan:{
    //     title: "Consignes pour la deuxième partie.",
    //     description: "Dans cette partie, vous allez effectuer deux tâches de span de mémoire en même temps.",
    //     lettersOrder: "À chaque essai, vous allez d'abord mémoriser {someBlueDigits}. Puis, au lieu de {the} restituer directement, vous verrez une série de chiffres <span style='color:red'>rouges</span>. Immédiatement après vous devrez restituer les chiffres <span style='color:red'>rouges</span>. Enfin vous devrez restituer {theBlueDigits}.",
    //     goal: "Pour maximiser votre bonus, vous devez restituer correctement les chiffres <span style='color:blue'>bleus</span> en <b>priorité</b>.",
    //     sequenceNumber: "Vous ferez 6 essais.",
    //     variableHard: {
    //         someBlueDigits: "{startingSpan} chiffres <span style='color:blue'>bleus</span>",
    //         theBlueDigits: "les {startingSpan} chiffres <span style='color:blue'>bleus</span>",
    //         the: "les",
    //     },
    //     variableEasy: {
    //         someBlueDigits: "1 chiffre <span style='color:blue'>bleu</span>",
    //         theBlueDigits: "le chiffre <span style='color:blue'>bleu</span>",
    //         the: "le",
    //     },
    //     clickNext: "Cliquez sur <strong>Suivant</strong> pour découvrir le bonus de la deuxième partie !"

    // },
    instructionsSpanSpan:{
        title: "Consignes pour la deuxième partie.",
        description: "Dans cette partie, vous allez réaliser deux tâches de span de mémoire de la manière suivante :",
        lettersOrder: `<ul>
        <li><b>Début de la tâche source</b> : Mémorisez {theBlueDigits} {displayed} à l’écran.</li>
        <li><b>Tâche cible</b> : Immédiatement après, une série de chiffres <span style='color:red'>rouges</span> apparaîtra. 
        <br>Vous devrez la restituer dans l’ordre après l'avoir vue.</li>
        <li><b>Fin de la tâche source</b> : Enfin, vous devrez restituer {theBlueDigits}.</li>
        </ul>`,
        goal: "Pour maximiser votre bonus, la tâche source ({theBlueDigits}) est plus importante que la tâche cible.",
        sequenceNumber: "Vous ferez 6 essais.",
        variableHard: {
            someBlueDigits: "chiffres <span style='color:blue'>bleus</span>",
            theBlueDigits: "les chiffres <span style='color:blue'>bleus</span>",
            the: "les",
            displayed: "affichés"
        },
        variableEasy: {
            someBlueDigits: "1 chiffre <span style='color:blue'>bleu</span>",
            theBlueDigits: "le chiffre <span style='color:blue'>bleu</span>",
            the: "le",
            displayed: "affiché"
        },
        clickNext: "Cliquez sur <strong>Suivant</strong> pour découvrir le bonus de la deuxième partie !"

    },
    instructionsSpanSpanPayment:{
        title: "Consignes pour la deuxième partie.",
        subTitle: "Explication du bonus",
        incentives: "Votre bonus (<b>{bonus}€</b> maximum) dépend de votre performance.",
        incentiveRule: `Votre bonus est calculé comme suit. L'ordinateur sélectionne un essai au hasard parmi les essais de la partie. Chaque essai a la même chance d'être sélectionné. Votre bonus dépend de votre précision dans cet essai, selon la formule suivante:
        <ul> 
        <li> <b>67%</b> du bonus dépend de votre précision pour {theBlueDigits}. </li>
        <li> <b>33%</b> du bonus dépend de votre précision pour les chiffres <span style='color:red'>rouges</span>.</li>
        </ul>`,
        incentiveRuleExample: "Par exemple, si à l'essai sélectionné vous obtenez une précision de 100% sur {theBlueDigits} mais seulement 10% sur les chiffres <span style='color:red'>rouges</span>, votre bonus sera de {bonus}€ x (<span style='color:blue'>0.67 x 100%</span> + <span style='color:red'>0.33 x 10%</span>) = {examplePayment}€.",
        remember1: "Le plus important pour maximiser votre bonus est donc de restituer correctement {theBlueDigits} !",
        remember:  `<div class="important-note">
                    💡 À retenir: Le plus important pour maximiser votre bonus est donc de restituer correctement {theBlueDigits} !
                </div>`,
        meanDuration: "Cette partie dure environ 3 minutes.",
        clickNext: "Cliquez sur <strong>Suivant</strong> pour commencer la deuxième partie!"
    },
    instructionsThirdPart:{
        title: "Consignes pour la troisième partie.",
        description: "Dans cette partie, vous effectuerez la tâche de span de mémoire combinée à une tâche de prise de décision, dite \"Listes à Multiples Prix \" (LMP).",
        freqMPL: "<b>En moyenne, une personne sur {frequency}</b> sera sélectionnée à la fin de l'expérience pour qu'<b>un de ses choix à la tâche de prise de décision (LMP) soit réellement payé</b>, selon les règles de paiement qui vont vous être présentées. Le bonus pour la tâche de span de mémoire est lui calculé <b>pour chaque personne</b>.",
        clickNext: "Cliquez sur <strong>Suivant</strong> pour découvrir les consignes des LMP !"
    },
    instructionsSpanInMPL: {
        title: "Consignes finales pour la troisième partie.",
        subTitle: "Combinaison de la tâche de span de mémoire et des Listes à Multiples Prix (LMP).",
        // MPLInSpan: "Dans la troisième partie, vous verrez <b>une série de chiffres à retenir, puis vous devrez faire vos choix pour une tâche de LMP, et enfin vous devrez restituer les chiffres.</b>",
        MPLInSpan: "Dans cette partie, vous allez réaliser la tâche de span de mémoire et la tâche de prise de décision (LMP) de la manière suivante :",
        lettersOrder: `<ul>
        <li><b>Début de la tâche source (tâche de span de mémoire)</b> : mémorisez la série de chiffres à l’écran.</li>
        <li><b>Tâche cible (LMP)</b> : immédiatement après, vous ferez un choix dans une tâche de LMP.</li>
        <li><b>Fin de la tâche source (tâche de span de mémoire)</b> : Enfin, vous devrez restituer la série de chiffres vue au début de la tâche source.</li>
        </ul>`,
        MPLInSpanRepeat: "Vous répéterez cela avec des séquences de chiffres et des tableaux différents.",
        incentives: "Bonus pour la tâche de span de mémoire",
        incentivesSpan: "Le <b>bonus</b> pour la tâche de span de mémoire, de <b>{bonusSpan}€</b> maximum, sera calculé de manière similaire à la deuxième partie:",
        incentivesSpanDetails: `Un essai sera sélectionné au hasard parmi les essais de la troisième partie. Chaque essai a la même chance d'être sélectionné. Votre bonus dépendra de votre <b>précision</b> dans cet essai.`,
        incentiveSpanExample: "Par exemple, si à l'essai sélectionné vous obtenez une précision de 80%, votre bonus sera de {bonusSpan}€ x 0.8 = {examplePaymentSpan}€.",
        randomMechanism: "Puisque le bonus dépend d'un essai tiré au hasard, veuillez considérer chaque essai comme si c’était celui qui allait être payé.",
        priority: "Pour maximiser votre bonus, votre <b>priorité</b> doit être de restituer correctement les chiffres.",
        clickNext: "Cliquez sur <strong>Suivant</strong> pour effectuer un exemple final !"
    },
    feedbackExampleSpanMPL: {
        title: "Exemple de paiement type à la troisième partie.",
        description: "Voici comment vous seriez payé·e si cet essai avait été sélectionné pour le paiement de la tâche du span de mémoire et de LMP.",
        paymentSpan: "Pour la tâche de span de mémoire {thePresentedDigitWas} {correctSpan}. Vous avez restitué {theDigit} {answerSpan}. Votre précision est de {precision}%. Votre bonus est de <b>{bonusSpan}€ x {precision}% = {paymentSpan}€</b>.",
        paymentMPL: "La ligne (version) du tableau sélectionnée au hasard est la ligne {selectedRow}. Pour cette ligne vous avez choisi le {chosenLot}. Après calcul, le paiement pour la LMP s’élèverait à <b>{paymentMPL}€</b>: <span style='color:green'>5€ (la somme initiale)</span> plus le montant déterminé selon votre choix et la règle de paiement à la ligne {selectedRow}.",
        remind: "À retenir: <b>en moyenne seulement une personne sur {propSelecForMPL}</b> est sélectionnée pour qu'un de ses choix à la tâche de LMP soit payé. Au contraire vous êtes <b>sûr·e d'être sélectionné·e</b> pour le bonus de la tâche de span de mémoire ! Correctement <b>restituer les chiffres est donc le plus important</b> pour maximiser votre gain total.",
        instructionReminder: 'Vous aurez la possibilité d\'afficher de nouveau les consignes pendant la troisième partie, en cliquant sur le bouton "Afficher les consignes".',
        clickNext: "Quand vous êtes prêt·e, cliquez sur <strong>Suivant</strong> pour commencer la troisième partie !"
    },    
    feedbackExampleSpanMPLTemporary: {
        title: "Exemple de paiement type à la troisième partie.",
        description: "Voici comment vous seriez payé·e si cet essai avait été sélectionné pour le paiement de la tâche du span de mémoire et de LMP.",
        paymentSpan: "Pour la tâche de span de mémoire les chiffres présentés étaient 1, 5, 3, 9, 4. Vous avez restitué les chiffres 5, 6, 9. Votre précision est de 0%. Votre bonus est de <b>2€ x 0% = 0€</b>.",
        paymentMPL: "La ligne (version) du tableau sélectionnée au hasard est la ligne 15. Pour cette ligne vous avez choisi le <span style='color:blue'>lot B</span>. Après calcul, le paiement pour la LMP s’élèverait à <b>17,6€</b>: <span style='color:green'>5€ (la somme initiale)</span> plus le montant déterminé selon votre choix et la règle de paiement à la ligne 15.",
        remind: "À retenir: <b>en moyenne seulement une personne sur {propSelecForMPL}</b> est sélectionnée pour qu'un de ses choix à la tâche de LMP soit payé. Au contraire vous êtes <b>sûr·e d'être sélectionné·e</b> pour le bonus de la tâche de span de mémoire ! Correctement <b>restituer les chiffres est donc le plus important</b> pour maximiser votre gain total.",
        instructionReminder: 'Vous aurez la possibilité d\'afficher de nouveau les consignes pendant la troisième partie, en cliquant sur le bouton "Afficher les consignes".',
        clickNext: "Quand vous êtes prêt·e, cliquez sur <strong>Suivant</strong> pour commencer la troisième partie !"
    },
    instructionsDecisionTable:{
        title: "Consignes pour les Listes à Multiples Prix (LMP).",
        subTitle: "Choisir entre deux lots de boîtes",
        description: "Dans chaque LMP, les lots de boîtes sont présentés sous la forme d'un tableau. Il y a écrit la composition de chaque lot: le nombre de boîtes et l'argent qu'elles contiennent.",
        exampleAbove: "Dans l'exemple ci-dessus, le <span style='color:red'>lot A</span> est composé de 50 boîtes contenant 16€ et 50 boîtes contenant 0€. Le <span style='color:blue'>lot B</span> est composé de 100 boîtes contenant 4€.",
        exampleBelow: "Dans l'exemple ci-dessous, le <span style='color:red'>lot A</span> est composé de 25 boîtes contenant -12€ et 75 boîtes contenant 0€. Le <span style='color:blue'>lot B</span> est composé de 100 boîtes contenant -3€.",
        clickToChoose: `Vous devez cliquer sur le tableau pour choisir le lot que l’ordinateur sélectionnera afin de calculer votre bonus. Le lot sélectionné est surligné en <span style='background-color: rgba(239, 243, 4, 1)'>jaune</span>.
        Dans l'exemple ci-dessous, vous avez sélectionné le <span style='color:red'>lot A</span> et vous serez donc payé·e en fonction de ce lot.`,
        clickNext: "Cliquez sur <strong>Suivant</strong> pour découvrir la règle de paiement!"
    },
    instructionsBoxesWithMoney:{
        title: "Consignes pour les Listes à Multiples Prix (LMP).",
        subTitle: "Les boîtes contenant de l'argent",
        initialSum: "Au début de chaque LMP, vous recevez une somme d'argent (entre 5 et 30€).",
        chooseSet: "Vous devez ensuite <b>choisir un lot de boîtes.</b>",
        choice: "Vous aurez toujours le choix entre les lots <span style='color:red'>A</span> et <span style='color:blue'>B</span>, composés de 100 boîtes chacun.",
        moneyInside: "Chaque boîte peut contenir <b>de l'argent</b>. Votre bonus dépend de cet argent selon une règle de paiement qui va vous être expliquée.",
        clickNext: "Cliquez sur <strong>Suivant</strong> pour découvrir comment sélectionner les lots !"
    },
    // instructionsRandomBox:{
    //     title: "Consignes pour les Listes à Multiples Prix (LMP).",
    //     subTitle: "Règle de paiement: une boîte au hasard.",
    //     selectABox: "Après que vous ayez choisi un lot, l'ordinateur sélectionne une boîte au hasard dans ce lot et vous recevez l'argent qui est à l'intérieur de cette boîte.",
    //     ifNegative: "Si le montant est négatif, il sera déduit de la somme d'argent que vous avez reçue. S'il est positif il est ajouté.",
    //     example: "Par exemple, si vous choisissez le lot <span style='color:red'>A</span>, l'ordinateur sélectionnera une boîte au hasard dans le lot <span style='color:red'>A</span> et vous recevrez l'argent qui est à l'intérieur de cette boîte.",
    //     differentRisk: "Les deux lots ont des niveaux de risque différents. Le lot <span style='color:red'>A</span> est plus risqué que le lot <span style='color:blue'>B</span>.",
    //     riskExplanation: "Cela signifie que le lot <span style='color:red'>A</span> contient plus de boîtes avec des montants d'argent très élevés ou très faibles"
    // },
    instructionsPaymentRuleMirror:{
        title: "Consignes pour les Listes à Multiples Prix (LMP).",
        subTitle: "Règle de paiement: la moyenne des boîtes.",
        // paymentRule:`Votre bonus pour une LMP est calculé comme suit: l'ordinateur calcule la <b>moyenne</b> de la somme d'argent contenue dans les boîtes du lot choisi.
        // Cela veut dire qu'il va additionner la somme d'argent de toutes les boîtes du lot, puis va la diviser par 100. 
        // Si cette quantité est positive, il <b>l'ajoute</b> à votre somme initiale d'argent, si elle est négative il la <b>retire</b>.`,
        paymentRule:`Votre bonus pour une LMP est la <b>moyenne</b> de l'argent contenu dans les boîtes du lot choisi, plus la somme initiale d'argent.
        Cela veut dire que l'ordinateur va additionner la somme d'argent de toutes les boîtes du lot, puis va la diviser par 100. Il ajoute ou retire cette quantité de votre somme initiale d'argent.
        <!-- Si cette quantité est positive, il <b>l'ajoute</b> à votre somme initiale d'argent, si elle est négative il la <b>retire</b>. -->`,
        example1: `Dans l'exemple ci-dessous, le <span style='color:red'>lot A</span> est sélectionné. `,
        example1Payment: `
        <ul>
        <li>Le lot est composé de 100 boîtes en tout, 50 contiennent 16€ et 50 contiennent 0€. L'ordinateur calcule la moyenne: <span style='color:green'>(16€ x 50 + 0€ x 50)/100 = 8€</span>. Le résultat est ajouté à votre somme d'argent initiale pour sûr.</li>
        <li>Pour vous aider à mieux comprendre les bonus possibles, voici 10 simulations de bonus pour le lot sélectionné (avec une somme initiale d'argent de 0€):
        <ul>
        ${generateRandomSimulations(['8€', '8€'], 10)}
        </ul></li>
        <li> Si le <span style='color:blue'>lot B</span> avait été sélectionné, <span style='color:green'>(4€ x 100)/100 = 4€</span> auraient été ajoutés à votre somme initiale d'argent pour sûr.</li>
        </ul>`,
        example2: `Dans l'exemple ci-dessous, le <span style='color:blue'>lot B</span> est sélectionné.`,
        example2Payment: `
        <ul>
        <li>Le lot est composé de 100 boîtes en tout, toutes contiennent -6€. L'ordinateur calcule la moyenne: <span style='color:green'>(-6€ x 100)/100 = -6€</span>. Le résultat est retiré de votre somme initiale d'argent pour sûr.</li>
        <li>Pour vous aider à mieux comprendre les bonus possibles, voici 10 simulations de bonus pour le lot sélectionné (avec une somme initiale d'argent de 0€):
        <ul>
        ${generateRandomSimulations(['-6€', '-6€'], 10)}
        </ul></li>
        <li>Si le <span style='color:red'>lot A</span> avait été sélectionné,  <span style='color:green'>(-8€ x 50 + 0€ x 50)/100 = -4€</span> auraient été retirés de votre somme initiale d'argent pour sûr.</li>
        </ul>`,
        remindNotEveryone: "Seulement une personne sur {frequency} est sélectionnée pour qu'un de ses choix soit réellement payé.",
        clickNext: "Cliquez sur <strong>Suivant</strong> pour répondre aux questions de compréhension!"
    },
    instructionsPaymentRuleRandomBox:{
        title: "Consignes pour les Listes à Multiples Prix (LMP).",
        subTitle: "Règle de paiement: une boîte au hasard.",
        paymentRule: `Votre bonus pour une LMP est l'argent contenu dans <b>une boîte au hasard</b> parmi les 100 boîtes du lot choisi, plus la somme initiale d'argent. Chaque boîte a la même chance d'être sélectionnée.
        <!-- Si cette quantité est positive, il <b>l'ajoute</b> à votre somme initiale d'argent, si elle est négative il la <b>retire</b>. -->`,
        example1: `Dans l'exemple ci-dessous, vous avez choisi le <span style='color:red'>lot A</span>.`,
        example1Payment: `
        <div><ul>
        <li>Le lot se compose de 50 boîtes contenant 16€, et 50 boîtes contenant 0€. Il y a donc 50% de chance que <span style='color: green'>16€</span> soient ajoutés à votre somme initiale d'argent, et 50% de chance que <span style='color: green'>0€</span> soit ajouté.</li>
        <li>Pour vous aider à mieux comprendre les bonus possibles, voici 10 simulations de bonus pour le lot sélectionné (avec une somme initiale d'argent de 0€):
        <ul>
        ${generateRandomSimulations(['16€', '0€'], 10)}
        </ul></li>
        <li>Si vous aviez choisi le <span style='color:blue'>lot B</span>, comme toutes les boîtes contiennent 4€, <span style='color: green'>4€</span> auraient été ajoutés à votre somme initiale d'argent pour sûr.</li>
        </ul></div>`,
        example2: `Dans l'exemple ci-dessous, vous avez choisi le <span style='color:blue'>lot B</span>.`,
        example2Payment: `
        <div><ul> 
        <li>Le lot se compose de 100 boîtes, toutes contenant -6€. Donc <span style='color: green'>6€</span> sont retirés de votre somme initiale d'argent pour sûr.</li>
        <li>Pour vous aider à mieux comprendre les bonus possibles, voici 10 simulations de bonus pour le lot sélectionné (avec une somme initiale d'argent de 0€):
        <ul>
        ${generateRandomSimulations(['-6€', '-6€'], 10)}
        </ul></li>
        <li>Si vous aviez choisi le <span style='color:red'>lot A</span>, comme il y a 50 boîtes contenant -8€, et 50 boîtes contenant 0€, il y aurait eu une probabilité de 50% que <span style='color: green'>8€</span> soient retirés de votre somme initiale d'argent, et une probabilité de 50% que <span style='color: green'>0€</span> soit ajouté.</li>
        </ul></div> `,
        remindNotEveryone: "Seulement une personne sur {frequency} est sélectionnée pour qu'un de ses choix soit réellement payé.",
        clickNext: "Cliquez sur <strong>Suivant</strong> pour répondre aux questions de compréhension!"

    },
    instructionsChoosingASetOfBoxes: {
        title: "Consignes pour les Listes à Multiples Prix (LMP).",
        subTitle: "Sélectionner un lot de boîtes",
        description: `Dans la troisième partie, vous devez choisir entre différentes versions du <span style='color:red'>lot A</span> et du <span style='color:blue'>lot B</span>. Chaque ligne du tableau présente une version différente de ces lots.`,
        example1: ` 
        Dans l'exemple ci-dessous, à la première ligne (Version 1), le <span style='color:red'>lot A</span> est composé de 40 boîtes contenant 10€ et 60 boîtes contenant 0€, 
        tandis que le <span style='color:blue'>lot B</span> est composé de 100 boîtes contenant <b>1€</b>.
        Cependant à la deuxième ligne (Version 2), le <span style='color:blue'>lot B</span> est composé de 100 boîtes contenant <b>2€</b>.
        Les lignes suivantes présentent d'autres versions du <span style='color:blue'>lot B</span>.`,
        chooseSet: "Vous ferez un choix à chaque ligne en cliquant sur le tableau. Le lot sélectionné à chaque ligne est surligné en <span style='background-color: rgba(239, 243, 4, 1)'>jaune</span>.",
        example2: `Dans l'exemple ci-dessus, vous sélectionnez le <span style='color:red'>lot A</span> dans les versions 1, 2, 3, 4, 5, 6 et 7, et vous sélectionnez le <span style='color:blue'>lot B</span> dans les versions 8, 9 et 10.`,
        pickOneRow: `À la fin de l'expérience, si vous êtes sélectionné·e (vous avez une chance sur 22), l'ordinateur sélectionnera au hasard une ligne du tableau
        (une version des <span style='color:red'>lot A</span> et <span style='color:blue'>lot B</span>) et vous serez payé·e en fonction du lot que vous aurez sélectionné pour cette ligne. Chaque ligne a la même chance d'être sélectionnée.
        Vous devez donc choisir chaque ligne comme si c'était celle qui allait être payée.`,
        computerOnlyOneChoice: `L'ordinateur ne vous autorise à passer du <span style='color:red'>lot A</span> au <span style='color:blue'>lot B</span> qu'une seule fois dans le tableau.
        Quand vous êtes sûr de votre choix, vous pouvez valider votre saisie avec le bouton "Suivant!"`,
        severalTables: "Plusieurs tableaux",
        severalTablesDescription: `Vous effectuerez cette tâche plusieurs fois pendant la troisième partie de l'expérience.
        Les tableaux varient dans leur contenu: les lignes et la répartition des boîtes dans les lots.`,
        incentivesMPL: `À la fin de l'expérience, si vous êtes sélectionné·e (vous avez une chance sur {propSelecForMPL}), l'ordinateur sélectionnera <b>au hasard un tableau puis une ligne (version) de ce tableau</b> 
        puis déterminera votre paiement <b>selon votre choix pour cette ligne</b>.
        Faites donc chaque choix comme si c'était celui qui allait être payé !`,
        clickNext: "Cliquez sur <strong>Suivant</strong> pour vous entraîner à sélectionner des lots de boîtes !",
    },
    introductionFinalExampleSpanMPL:{
        title: "Exemple final avant de commencer la troisième partie.",
        description: "Cliquer sur <b>Suivant</b> pour faire un exemple complet d'un essai de la troisième partie, combinant la tâche source (span de mémoire) et la tâche cible (LMP).",
    },
    comprehensionMPLIntro: "Questions de compréhension",
    comprehensionMPLExplanation: `Vous devez réussir toutes les questions pour continuer l'expérience. Si vous échouez plus de quatre fois,
    l'expérience se terminera et vous serez payé·e {notUnderstoodPayment}€, en plus des bonus des deux premières parties. 
    <br>
    Vous pouvez cliquer sur le bouton {buttonHelp} pour afficher les consignes.`,
    comprehensionFailure:{
        title: "Fin de l'expérience",
        description: `Malheureusement, vous n'avez pas répondu correctement aux questions de compréhension.
        L'expérience se termine ici. Vous serez payé·e {notUnderstoodPayment}€ pour votre temps, en plus des bonus précédents ({actual_payment_calibration}€ pour la première partie et {actual_payment_span_span}€ pour la deuxième partie).`,
        thanks: "Merci beaucoup pour votre participation!",
        clickNext: "Appuyez sur Entrée pour terminer l'expérience <b>et recevoir votre paiement!.</b>",
    },
    comprehensionQMPLMirror: {
        q1: {
            prompt: `Pour les quatre prochaines questions, supposez que vous avez fait le choix du <span style='color:red'>lot A</span> dans le tableau ci-dessus et que vous êtes sélectionné·e pour que ce choix soit payé. 
            La règle de paiement est "la moyenne des boîtes".
            Votre somme initiale d'argent est de 0€.<br><br>
            Quelle est la chance que vous gagniez exactement 20€ ?`,
            options: [
                "0 chance sur 100 (0%)",
                "25 chance sur 100 (25%)",
                "50 chance sur 100 (50%)",
                "100 chance sur 100 (100%)",
            ],
        },
        q2: {
            prompt: "Quelle est la chance que vous gagniez exactement 5€ ?",
            options: [
                "0 chance sur 100 (0%)",
                "25 chance sur 100 (25%)",
                "50 chance sur 100 (50%)",
                "100 chance sur 100 (100%)",
            ],
        },
        q3: {
            prompt: "Quelle est la chance que vous gagniez exactement 0€ ?",
            options: [
                "0 chance sur 100 (0%)",
                "25 chance sur 100 (25%)",
                "50 chance sur 100 (50%)",
                "100 chance sur 100 (100%)",
            ],
        },
        q4: {
            prompt: "Quelle est la chance que vous gagniez exactement 10€ ?",
            options: [
                "0 chance sur 100 (0%)",
                "25 chance sur 100 (25%)",
                "50 chance sur 100 (50%)",
                "100 chance sur 100 (100%)",
            ],
        },
        q5: {
            prompt: `Pour cette dernière question, supposez que vous ayez fait le choix du <span style='color:blue'>lot B</span> dans le tableau ci-dessus. 
            Vous êtes sélectionné·e pour que ce choix soit payé, toujours avec la règle de paiement "la moyenne des boîtes". 
            Votre somme initiale d'argent est de 0€. 
            <br>
            Quel(s) montant(s) d'argent pouvez-vous gagner ou perdre ?`,
            options: [
                "0€",
                "-6€",
                "-8€",
                "-100€",
            ],
        },
    },
    comprehensionQMPLLottery: {
         q1: {
            prompt: `Pour les quatre prochaines questions, supposez que vous avez fait le choix du <span style='color:red'>lot A</span> dans le tableau ci-dessus et que vous êtes sélectionné·e pour que ce choix soit payé. 
            La règle de paiement est "une boîte au hasard". 
            Votre somme initiale d'argent est de 0€.<br><br>
            Quelle est la chance que vous gagniez exactement 20€ ?`,
            options: [
                "0 chance sur 100 (0%)",
                "25 chance sur 100 (25%)",
                "50 chance sur 100 (50%)",
                "100 chance sur 100 (100%)",
            ],
        },
        q2: {
            prompt: "Quelle est la chance que vous gagniez exactement 5€ ?",
            options: [
                "0 chance sur 100 (0%)",
                "25 chance sur 100 (25%)",
                "50 chance sur 100 (50%)",
                "100 chance sur 100 (100%)",
            ],
        },
        q3: {
            prompt: "Quelle est la chance que vous gagniez exactement 0€ ?",
            options: [
                "0 chance sur 100 (0%)",
                "25 chance sur 100 (25%)",
                "50 chance sur 100 (50%)",
                "100 chance sur 100 (100%)",
            ],
        },
        q4: {
            prompt: "Quelle est la chance que vous gagniez exactement 10€ ?",
            options: [
                "0 chance sur 100 (0%)",
                "25 chance sur 100 (25%)",
                "50 chance sur 100 (50%)",
                "100 chance sur 100 (100%)",
            ],
        },
        q5: {
            prompt: `Pour cette dernière question, supposez que vous ayez fait le choix du <span style='color:blue'>lot B</span> dans le tableau ci-dessus. 
            Vous êtes sélectionné·e pour que ce choix soit payé, toujours avec la règle de paiement "une boîte au hasard". 
            Votre somme initiale d'argent est de 0€. 
            <br>
            Quel(s) montant(s) d'argent pouvez-vous gagner ou perdre ?`,
            options: [
                "0€",
                "-6€",
                "-8€",
                "-100€",
            ],
        },
    },
    debriefCalibration:{
        title: "Fin de la première partie",
        performance: "La longueur finale (après la prise en compte de votre succès ou échec final) est de {maxSpan}.",
        bonus: "Votre bonus pour cette partie est donc de {bonus}€ x {maxSpan}/10 = <b>{totalBonus}€</b>.",
    },
    debriefSpanSpan:{
        title: "Fin de la deuxième partie",
        performance: "Dans le bloc sélectionné, votre précision pour {theBlueDigits} est de {blueAccuracy}%, et votre précision pour les chiffres <span style='color:red'>rouges</span> est de {redAccuracy}%.",
        bonus: "Votre bonus pour cette partie est donc de {bonus}€ x (0.67 x {blueAccuracy}% + 0.33 x {redAccuracy}%) = <b>{totalBonus}€</b>.",
        variableHard: {
            theBlueDigits: "les {startingSpan} chiffres <span style='color:blue'>bleus</span>",
        },
        variableEasy: {
            theBlueDigits: "le chiffre <span style='color:blue'>bleu</span>",
        },
    },
    instructions0back: {
        letter: "Dans cette tâche, des <strong>lettres</strong> apparaîtront à l'écran consécutivement.",
        yourTask1: "Votre tâche sera <strong>d'appuyer sur la touche 'J' si vous voyez la lettre <strong style='color:red'>X</strong> à l'écran.</strong>",
        yourTask2: "Sinon, appuyez sur la <strong>touche 'F'</strong>.</p>",
        image: "<img src='static/images/instruction_0back_en.gif' />"
    },
    instructions1back: {
        letter: "Dans cette tâche, des <strong>lettres</strong> apparaîtront à l'écran consécutivement.",
        changeN: "Maintenant, vous allez passer à un niveau n-back lettres différent. Vous passez de la tâche du <strong>3</strong>-back lettres au <strong>1</strong>-back lettres.",
        grid: "Dans cette tâche, un <strong>point apparaît dans l'une des cases d'une grille</strong> à chaque présentation.",
        yourTask1: "Votre tâche sera <strong>d'appuyer sur la touche 'J' si la lettre à l'écran est la même que la <strong style='color:red'>précédente</strong></strong>.",
        yourTask1Grid: "Votre tâche sera <strong>d'appuyer sur la touche 'J' si la position du point à l'écran est la même que la <strong style='color:red'>précédente</strong></strong>.",
        firstGrids: "Pour le premier point d'une série de présentations, vous devez appuyer sur 'F'.",
        yourTask2: "Sinon, appuyez sur la <strong>touche 'F'</strong>.",
        image: "<img src='static/images/instruction_1back_en.gif' />",
        liveDemo: nbackDemoHTML('nback-demo'),
        firstGameVisual: "Expliquons le 1-back visuel.",
        firstGameLetter: "Expliquons maintenant la tâche de 1-back lettres.",
        allGame: "Ces instructions s'appliquent à toute l'expérience."
    },
    instructions2back: {
        changeN: "Maintenant, vous allez passer à un niveau n-back lettres différent. Vous passez de la tâche 1-back lettres au <strong>2</strong>-back lettres.",
        letter: "Dans cette tâche, des <strong>lettres</strong> apparaîtront à l'écran consécutivement.",
        grid: "Dans cette tâche, un <strong>point apparaît dans l'une des cases d'une grille</strong> à chaque présentation.",
        yourTask1: "Votre tâche sera <strong>d'appuyer sur la touche 'J' si la lettre à l'écran est la même que celle d'il y a <strong style='color:red'>deux</strong> lettres</strong>.",
        yourTask2: "Sinon, appuyez sur la <strong>touche 'F'</strong>.",
        yourTask1Grid: "Votre tâche sera <strong>d'appuyer sur la touche 'J' si le point à l’écran est à la même position que celui d’il y a  <strong style='color:red'>deux</strong> présentations </strong>(c’est-à-dire le point avant le dernier).",
        firstGrids: "Pour les deux premiers points d'une série de présentations, vous devez appuyer sur 'F' (il n'y a pas de points immédiatement précédents).",
        liveDemo: nbackDemoHTML('nback-demo'),
        image: "<img src='static/images/instruction_2back_en.gif' />",
        firstGameLetter: "Expliquons maintenant la tâche de 2-back lettres.",
        firstGameVisual: "Expliquons la tâche de 2-back visuel.",
        allGame: "Ces instructions s'appliquent à toute l'expérience."

    },
    instructions3back: {
        changeN: "Maintenant, vous allez passer à un niveau n-back lettres différent. Vous passez de la tâche de 1-back lettres au <strong>3</strong>-back lettres.",
        letter: "Dans cette tâche, des <strong>lettres</strong> apparaîtront à l'écran consécutivement.",
        yourTask1: "Votre tâche sera <strong>d'appuyer sur la touche 'J' si la lettre à l'écran est la même que celle d'il y a <strong style='color:red'>trois</strong> lettres</strong>.",
        yourTask2: "Sinon, appuyez sur la <strong>touche 'F'</strong>.",
        image: "<img src='static/images/instruction_3back_en.gif' />",
        firstGameLetter: "Expliquons maintenant la tâche de 3-back lettres."
    },
    generalInstruction: {
        fastAndAccurate: "Essayez d'être aussi rapide et précis que possible !",
        clickNext: "Si les instructions sont claires, cliquez sur <strong>Suivant</strong>",
    },
    practice: {
        practice: "D'abord, vous pouvez vous entraîner un peu à la tâche.",
        startPractice: "Appuyez sur n'importe quelle touche du clavier pour commencer l'entraînement !",
        end: "Fin de l'entraînement."
    },
    feedbackPracticeBlock: {
        yourPerformance: "Votre précision dans le bloc d'entraînement précédent était de {accuracy}%.",
        rules: "Si vous parvenez à avoir 80% ou plus de précision dans deux blocs d'entraînement consécutifs, vous quitterez la partie entraînement.",
        achievedMessage: "Vous avez atteint 80% ou plus de précision dans deux blocs d'entraînement consécutifs. Félicitations !",
        firstAchieved: "Vous avez atteint 80% ou plus de précision dans le bloc d'entraînement précédent. Félicitations ! Si vous réussissez à avoir 80% ou plus de précision dans le prochain bloc, vous quitterez la partie entraînement.",
        achievedClickNext: "Vous pouvez maintenant cliquer sur <strong>Suivant</strong> pour passer aux instructions suivantes !",
        firstAchievedClickNext: "Vous pouvez maintenant cliquer sur <strong>Suivant</strong> pour essayer un nouveau bloc d'entraînement.",
        notAchievedClickNext: "Vous pouvez maintenant cliquer sur <strong>Suivant</strong> pour essayer un nouveau bloc d'entraînement."
    },
    betweenBlocks: {
        rest: "Maintenant vous pouvez vous reposer un peu.",
        continue: "Appuyez sur n'importe quelle touche pour continuer la tâche !",
        pressKey: "Si vous êtes prêt·e, appuyez sur une touche !"
    },
    end: {
        end: "Fin de la tâche.",
        thankYou: "Merci !",
    },
    button: {
        next: "Suivant",
        previous: "Précédent",
        finish: "Terminer l'expérience",
        close: "Fermer",
        help: "Afficher les consignes"
    },
    experimentStop: {
        title: "Session d'entraînement terminée",
        message: "Malheureusement, vous n'avez pas pu atteindre la précision requise de 80% sur deux blocs d'entraînement consécutifs après plusieurs tentatives.",
        explanation: "Cela indique que la tâche peut être trop difficile à ce niveau. L'expérience va maintenant se terminer.",
        thankYou: "Merci pour votre participation et vos efforts.",
        contact: "Si vous avez des questions, veuillez contacter l'équipe de recherche à l'adresse mail suivante: gildas.prevost@etu.univ-paris1.fr"
    },
    fullscreen: {
        fullscreenText: "L'expérience passera en mode plein écran lorsque vous appuierez sur le bouton ci-dessous.",
        fullscreenButton: "Continuer"
    },
    feedback: {
        correct: "Correct !",
        wrong: "Incorrect !",
        noResponse: "Vous n'avez pas répondu !",
        accuracy: "Vous avez répondu correctement à ",
        accuracy2: "% des essais.",
        rt: "Votre temps de réponse moyen était de ",
        rt2: " ms."
    },
    task1back: {
        start: "La tâche commence maintenant. À partir de maintenant, vous ne recevrez plus de feedback.",
        remember1: "Rappelez-vous: appuyez sur la touche <strong>'J'</strong> si la lettre à l'écran est la même que la <strong style='color:red'>précédente</strong></strong>.",
        remember2: "Sinon, appuyez sur la touche <strong>'F'</strong>.",
        press: "Appuyez sur n'importe quelle touche pour continuer.",
    },
    task2back: {
        start: "La tâche commence maintenant. À partir de maintenant, vous ne recevrez plus de feedback.",
        remember1: "Rappelez-vous: appuyez sur la touche <strong>'J'</strong> si la lettre à l'écran est la même que celle d'il y a <strong style='color:red'>deux</strong> lettres.",
        remember2: "Sinon, appuyez sur la touche <strong>'F'</strong>.",
        press: "Appuyez sur n'importe quelle touche pour continuer.",
    },
    task3back: {
        start: "La tâche commence maintenant. À partir de maintenant, vous ne recevrez plus de feedback.",
        remember1: "Rappelez-vous: appuyez sur la touche <strong>'J'</strong> si la lettre à l'écran est la même que celle d'il y a <strong style='color:red'>trois</strong> lettres.",
        remember2: "Sinon, appuyez sur la touche <strong>'F'</strong>.",
        press: "Appuyez sur n'importe quelle touche pour continuer.",
    },
    parameters: {
        subject: "Numéro du Sujet:",
        session: "Numéro de Session:"
    },
    startWarning: {
        startSubject: "Vous êtes sur le point de commencer le jeu avec le <strong>Numéro de Sujet ",
        startSession: "</strong> et le <strong>Numéro de Session ",
        startButton: "Commencer la tâche !",
        goBackButton: "Modifier les paramètres"
    },
    incentives: {
        selectedBlock: "Le bloc sélectionné pour le paiement était le bloc numéro ${subBlockInteger}:",
        accuracies: "Votre précision dans ce bloc était de ${percentPostVisual}% pour ${len} essais suivant le 2-back visuel, ${percentVN}% pour le 2-back visuel, ${percentN}% pour le ${n}-back lettres.",
        visualDetails: "2-back visuel essais totaux: ${totalTrialsVN}, essais corrects: ${corTrialsVN}.",
        letterDetails: "${N}-back lettres essais totaux: ${totalTrialsN}, essais corrects: ${corTrialsN}.",
        postVisualDetails: "${N-lettres} après le 2-back visuel: ${postVisualTrials}, essais corrects: ${corPostVisualTrials}.",
        paymentExplanation: "Votre paiement est basé sur votre performance:\n- 50% sur les essais après le 2-back visuel (${accuracyPostVisual})\n- 25% sur le 2-back visuel (${accuracyVN})\n- 25% sur le n-back lettres (${accuracyN})",
        totalPayment: "Votre bonus total sera de: ${totalPayment}€",
        thankYou: "Merci de votre participation à cette expérience !",
        redirect: "",
        continue: "Appuyez sur Entrée pour continuer"
    },
    changeRules: {
        title: "Changement de règles",
        ruleTo1Back: "Attention, vous passez maintenant en 1-back lettre (le 2-back visuel reste le même)!",
        ruleTo3Back: "Attention, vous passez maintenant en 3-back lettre (le 2-back visuel reste le même)!",
        paymentRuleChange: "Attention, la règle de paiement change !",
        paymentRuleChange2: "À partir de maintenant, la règle de paiement pour les Listes à Multiples Prix (LMP) va changer. Si l'ordinateur choisit un essai dans les essais suivants, il <b>vous paiera avec la nouvelle règle</b>, qui va vous être présentée.",
        pressKey: "Appuyez sur n'importe quelle touche pour découvrir la nouvelle règle de paiement."
    },
    paymentExplanation1Back: {
        title: "Informations sur le paiement",
        mainText: "En plus de votre paiement de base, vous pouvez gagner un bonus allant jusqu'à ${payment}€ en fonction de vos performances.",
        changeScore: `Attention ! À partir de maintenant, les 50% de votre bonus dépendront de votre résultat à la <span style="color:red;"><strong>première lettre</strong></span> après le 2-back visuel du bloc choisi pour le paiement.`,
        score: `
        <div class="payment-info">
             <div class="payment-illustration">
                <h3>Fonctionnement:</h3>
                <div class="nback-sequence" style="position: relative;">
                    <div class="nback-box"><span style="float: right;">... A Q L K L <span class="highlight">M</span></span><br><span style="font-size:0.9em;">(1-back lettres)</span></div>
                    <div class="nback-box visual-nback-box" id="visual-nback-box">
                    <img src="static/images/grids_explanation.png" alt="n-back visuel" style="max-width:220px;max-height:140px;display:block;margin:auto;">
                    <span style="display:block; font-size:0.9em; margin-top:0px; vertical-align:top;">(2-back visuel)</span>
                    </div>
                    <div class="nback-box" id="letter-nback-box"><span class="highlight">M</span> A U Q P B ...
                    <br><span style="font-size:0.9em;">(1-back lettres)</span></div>
                    <!-- Horizontal accolade below visual 2-back and letter 1-back -->
                <div style="position: absolute; left: 50%; transform: translateX(-30%); top: 140px; width: 400px; pointer-events: none;">
                <svg width="400" height="70"> <!-- Hauteur augmentée pour accommoder le décalage -->
                    <path d="M20,30 Q20,55 60,55 L350,55 Q390,55 390,30" stroke="#333" fill="transparent" stroke-width="3"/>
                </svg>
                    <div style="text-align:center; font-size:1em; margin-top:-5px;">un bloc</div>
                </div>
                </div>
                <br><br>
                <p>L'expérience se compose de 12 blocs. Un bloc comprend une tâche de 2-back visuel suivie d'une tâche de 1-back lettres.</p>
                <p>À la fin de l'expérience, si vous êtes sélectionné·e, un bloc sera sélectionné aléatoirement pour le calcul de votre bonus:</p>

                <ol>
                    <li><strong><span style="color:red;">50 %</span> de votre bonus</strong> dépend de votre précision lors de l'essai immédiatement après le 2-back visuel du bloc sélectionné.
                    <br>Dans l'exemple ci-dessus, cela signifie identifier correctement que le <span class="highlight">M</span> correspond à la dernière lettre avant la tâche visuelle.</li>
                    <li><strong>25% de votre bonus</strong> dépend de votre précision lors des essais du 2-back visuel du bloc sélectionné.</li>
                    <li><strong>25% de votre bonus</strong> dépend de votre précision lors des essais restants du 2-back de lettres du bloc sélectionné.</li>
                </ol>
    
                <!---
                <div class="payment-formula">
                    Bonus final = __PAYMENT__€ × (0,5 × précision_après_visuel + 0,25 × précision_visuel + 0,25 × précision_lettres)
                </div>
                --->
                
                <p><strong>Exemple:</strong> Si vous obtenez:<br>
                - 100 % de précision dans l'essai après le 2-back visuel<br>
                - 50 % de précision dans le 2-back visuel<br>
                - 50 % de précision dans le 1-back de lettres<br>
                Votre bonus serait: __PAYMENT__€ × (0,5 × 1.0 + 0,25 × 0,5 + 0,25 × 0,5) = __PAYMENT__€ × 0,75</p>
                <br>
                <div class="important-note">
                    💡 À retenir: l’élément le plus important pour maximiser votre bonus est d’identifier, après chaque 2-back visuel, si la première lettre du 1-back lettres correspond à la dernière lettre que vous avez vue avant le 2-back visuel !
                </div>
                <div style="margin-top: 20px; padding: 10px; background-color: #f8f9fa; border-left: 3px solid #dee2e6; font-size: 0.85em; color: #6c757d;">
                    <strong>Note technique:</strong> Le dernier bloc ne contient que trois essais du 1-back lettres. S'il est sélectionné au hasard pour le paiement, la portion de 25% du bonus sera calculée en utilisant ces trois essais plus les dix lettres précédant le premier bloc.
                </div>
            </div>
        </div>`,
        clickNext: "Quand vous avez compris, cliquez sur <strong>Suivant</strong> pour continuer !"

    },
    paymentExplanation2Back: {
        title: "Informations sur le paiement",
        mainText: "En plus de votre rémunération de base, vous pouvez gagner un bonus allant jusqu'à ${payment}€ en fonction de votre performance.",
        changeScore: `Attention ! À partir de maintenant, les 50% de votre bonus dépendront de votre résultat aux <span style="color:red;"><strong>deux premières lettres</strong></span> après le 2-back visuel du bloc choisi pour le paiement.`,
        score: `
        <div class="payment-info">
            <div class="payment-illustration">
                <h3>Fonctionnement:</h3>
                <div class="nback-sequence" style="position: relative;">
                    <div class="nback-box"><span style="float: right;">... A Q M K<span class="highlight">M L</span></span><br><span style="font-size:0.9em;">(2-back lettres)</span></div>
                    <div class="nback-box visual-nback-box" id="visual-nback-box">
                    <img src="static/images/grids_explanation.png" alt="n-back visuel" style="max-width:220px;max-height:140px;display:block;margin:auto;">
                    <span style="display:block; font-size:0.9em; margin-top:0px; vertical-align:top;">(2-back visuel)</span>
                    </div>
                    <div class="nback-box" id="letter-nback-box"><span class="highlight">M B</span> Q A U Q ...
                    <br><span style="font-size:0.9em;">(2-back lettres)</span></div>
                    <!-- Horizontal accolade below visual 2-back and letter 2-back -->
                <div style="position: absolute; left: 50%; transform: translateX(-30%); top: 140px; width: 400px; pointer-events: none;">
                <svg width="400" height="70"> <!-- Hauteur augmentée pour accommoder le décalage -->
                    <path d="M20,30 Q20,55 60,55 L350,55 Q390,55 390,30" stroke="#333" fill="transparent" stroke-width="3"/>
                </svg>
                    <div style="text-align:center; font-size:1em; margin-top:-5px;">un bloc</div>
                </div>
                </div>
                <br><br>
                <p>L'expérience se compose de 12 blocs. Un bloc comprend une tâche de 2-back visuel suivie d'une tâche de 2-back lettres.</p>
                <p>À la fin de l'expérience, un bloc sera sélectionné aléatoirement pour le calcul de votre bonus:</p>

                <ol>
                    <li><strong><span style="color:red;">50</span> % de votre bonus</strong> dépend de votre précision dans les deux essais juste après le 2-back visuel du bloc sélectionné.
                    <br>Dans l'exemple ci-dessus, cela signifie identifier correctement que le <span class="highlight">M</span> mais pas le <span class="highlight">B</span> correspond au <span class="highlight">M</span> avant la tâche visuelle.</li>
                    <li><strong>25 % de votre bonus</strong> dépend de votre précision dans les essais du 2-back visuel du bloc sélectionné.</li>
                    <li><strong>25 % de votre bonus</strong> dépend de votre précision dans les essais restants du 2-back lettres du bloc sélectionné.</li>
                </ol>
                <!---
                <div class="payment-formula">
                    Bonus final = __PAYMENT__€ × (0,5 × précision_après_visuel + 0,25 × précision_visuel + 0,25 × précision_lettres)
                </div>
                --->
                <p><strong>Exemple:</strong> Si vous obtenez:<br>
                - 100 % de précision dans les deux essais après le 2-back visuel<br>
                - 50 % de précision dans le 2-back visuel<br>
                - 50 % de précision dans le 2-back de lettres<br>
                Votre bonus serait: __PAYMENT__€ × (0,5 × 1.0 + 0,25 × 0,5 + 0,25 × 0,5) = __PAYMENT__€ × 0,75</p>
                <br>    
                <div class="important-note">
                    💡 À retenir: l’élément le plus important pour maximiser votre bonus est d’identifier, après chaque 2-back visuel, si les deux premières lettres du 2-back lettres correspondent respectivement aux deux dernières lettres que vous avez vues avant le 2-back visuel !
                </div>
                <div style="margin-top: 20px; padding: 10px; background-color: #f8f9fa; border-left: 3px solid #dee2e6; font-size: 0.85em; color: #6c757d;">
                    <strong>Note technique:</strong> Le dernier bloc ne contient que trois essais de 2-back lettres. S'il est sélectionné au hasard pour le paiement, la portion de 25% du bonus sera calculée en utilisant ces trois essais plus les dix lettres précédant le premier bloc.
                </div>
            </div>
            </div>`,
        clickNext: "Quand vous avez compris, cliquez sur <strong>Suivant</strong> pour continuer !"

    },
    paymentExplanation3Back: {
        title: "Informations sur le paiement",
        mainText: "En plus de votre rémunération de base, vous pouvez gagner un bonus allant jusqu'à ${payment}€ en fonction de votre performance.",
        changeScore: `Attention ! À partir de maintenant, les 50% de votre bonus dépendront de votre résultat aux <span style="color:red;"><strong>trois premières lettres</strong></span> après le 2-back visuel du bloc choisi pour le paiement.`,
        score: `
        <div class="payment-info">
            <div class="payment-illustration">
                <h3>Fonctionnement:</h3>
                <div class="nback-sequence" style="position: relative;">
                    <div class="nback-box"><span style="float: right;">... A Q M <span class="highlight">M K L</span></span><br><span style="font-size:0.9em;">(3-back lettres)</span></div>
                    <div class="nback-box visual-nback-box" id="visual-nback-box">
                    <img src="static/images/grids_explanation.png" alt="n-back visuel" style="max-width:220px;max-height:140px;display:block;margin:auto;">
                    <span style="display:block; font-size:0.9em; margin-top:0px; vertical-align:top;">(2-back visuel)</span>
                    </div>
                    <div class="nback-box" id="letter-nback-box"><span class="highlight">M B Q</span> A U Q ...
                    <br><span style="font-size:0.9em;">(3-back lettres)</span></div>
                    <!-- Horizontal accolade below visual 2-back and letter 3-back -->
                <div style="position: absolute; left: 50%; transform: translateX(-30%); top: 140px; width: 400px; pointer-events: none;">
                <svg width="400" height="70"> <!-- Hauteur augmentée pour accommoder le décalage -->
                    <path d="M20,30 Q20,55 60,55 L350,55 Q390,55 390,30" stroke="#333" fill="transparent" stroke-width="3"/>
                </svg>
                    <div style="text-align:center; font-size:1em; margin-top:-5px;">un bloc</div>
                </div>
                </div>
                <br><br>
                <p>L'expérience se compose de 12 blocs. Un bloc comprend une tâche de 2-back visuel suivie d'une tâche de 3-back lettres.</p>
                <p>À la fin de l'expérience, un bloc sera sélectionné aléatoirement pour le calcul de votre bonus:</p>

                <ol>
                    <li><strong><span style="color:red;">50 %</span> de votre bonus</strong> dépend de votre précision dans les trois essais juste après le 2-back visuel du bloc sélectionné.
                    <br>Dans l'exemple ci-dessus, cela signifie identifier correctement que le <span class="highlight">M</span> correspond au 
                    <span class="highlight">M</span> avant la tâche visuelle, mais que le <span class="highlight">B</span> ne correspond pas 
                    au <span class="highlight">K</span>, de même que le <span class="highlight">Q</span> ne correspond pas au 
                    <span class="highlight">L</span>.</li>
                    <li><strong>25 % de votre bonus</strong> dépend de votre précision dans les essais du 2-back visuel du bloc sélectionné.</li>
                    <li><strong>25 % de votre bonus</strong> dépend de votre précision dans les essais restants du 3-back lettre du bloc sélectionné.</li>
                </ol>
                <!---
                <div class="payment-formula">
                    Bonus final = __PAYMENT__€ × (0,5 × précision_après_visuel + 0,25 × précision_visuel + 0,25 × précision_lettres)
                </div>
                --->
                <p><strong>Exemple:</strong> Si vous obtenez:<br>
                - 100 % de précision dans les trois essais après le 2-back visuel<br>
                - 50 % de précision dans le 2-back visuel<br>
                - 50 % de précision dans le 3-back de lettres<br>
                Votre bonus serait: __PAYMENT__€ × (0,5 × 1.0 + 0,25 × 0,5 + 0,25 × 0,5) = __PAYMENT__€ × 0,75</p>

                <br>    
                <div class="important-note">
                    💡 À retenir: l’élément le plus important pour maximiser votre bonus est d’identifier, après chaque 2-back visuel, si les trois premières lettres du 3-back lettres correspondent respectivement aux trois dernières lettres que vous avez vues avant le 2-back visuel !
                </div>
                <div style="margin-top: 20px; padding: 10px; background-color: #f8f9fa; border-left: 3px solid #dee2e6; font-size: 0.85em; color: #6c757d;">
                    <strong>Note technique:</strong> Le dernier bloc ne contient que trois essais de 3-back lettres. S'il est sélectionné au hasard pour le paiement, la portion de 25% du bonus sera calculée en utilisant ces trois essais plus les dix lettres précédant le premier bloc.
                </div>
            </div>
            </div>`,
        clickNext: "Quand vous avez compris, cliquez sur <strong>Suivant</strong> pour continuer !"

    },
    rulesWillChange:{
        attention: "Attention, ces règles vont changer au milieu de l'expérience !",
        clear: "Cela vous sera indiqué clairement. Prêtez attention aux instructions.",
    },
    overallTrainingIntro: {
        title: "Entraînement Complet",
        description1Back: "Maintenant vous allez pratiquer le fonctionnement de l'expérience réelle: alterner entre les tâches de 2-back visuel et de 1-back lettres.",
        description3Back: "Maintenant vous allez pratiquer le fonctionnement de l'expérience réelle: alterner entre les tâches de 2-back visuel et de 3-back lettres.",
        structure1Back: "Vous commencerez par 10 essais de 1-back lettres, puis ferez un bloc: une tâche de 2-back visuel, et une tâche de 1-back lettres.",
        structure3Back: "Vous commencerez par 10 essais de 3-back lettres, puis ferez un bloc: une tâche de 2-back visuel, et une tâche de 3-back lettres.",
        importance: "Cet entraînement vous aidera à comprendre la structure complète d'un bloc et le fonctionnement du système de notation.",
        feedback: "À la fin, vous verrez un retour sur votre performance et comment votre bonus serait calculé si c'était un vrai bloc.",
        highlightEasy: "Portez une attention particulière à la lettre immédiatement après le 2-back visuel - c'est la plus importante pour votre bonus !", // Pour vous aider, la lettre correspondante avant le 2-back visuel est colorée en <span style='color:#F016DF;'>rose</span>.
        highlightHard: "Portez une attention particulière aux {level} premières lettres immédiatement après le 2-back visuel - ce sont les plus importantes pour votre bonus ! ", // Pour vous aider, les lettres correspondantes avant le 2-back visuel sont colorées en <span style='color:#F016DF;'>rose</span>.
        ready: "Quand vous êtes prêt·e à commencer l'entraînement complet, appuyez sur n'importe quelle touche."
    },
    overallTrainingFeedback: {
        title: "Entraînement Terminé - Démonstration du système de points",
        performance: "Voici comment votre performance serait notée si c'était un vrai bloc et qu'il était sélectionné pour le paiement (au hasard):",
        nbackLetter1Back: "1-back lettres après le 2-back visuel: {accuracy}% de précision ({correct}/{total} essais)",
        nbackLetter3Back: "3-back lettres après le 2-back visuel: {accuracy}% de précision ({correct}/{total} essais)",
        visualNback: "2-back visuel: {accuracy}% de précision ({correct}/{total} essais)",
        afterVisual: "{Lettres} après le 2-back visuel ({total} essais): {accuracy}% de précision ({correct}/{total} essais)",
        explain1Back: "La dernière lettre avant le 2-back visuel était K, et la première après était C. Vous deviez donc appuyer sur la touche 'F' lorsque vous voyiez le C après le 2-back visuel (C différent de K).",
        explain2Back: "Les deux dernières lettres avant le 2-back visuel étaient A puis P, et les deux premières après étaient P puis K. Vous deviez donc appuyer sur la touche 'F' lorsque vous voyiez le P et le K après le 2-back visuel (P différent de A et K de P).",
        explain3Back: "Les trois dernières lettres avant le 2-back visuel étaient B puis A puis A, et les trois premières après étaient B puis A puis P. Vous deviez donc appuyer sur la touche 'J' lorsque vous voyiez B et A et sur la touche 'F' lorsque vous voyiez P après le 2-back visuel (P différent de A).",
        keyImportanceHard: "💡 Point clé: Les {level} premières lettres immédiatement après le 2-back visuel valent 50% de votre bonus !",
        keyImportanceEasy: "💡 Point clé: La dernière lettre immédiatement après le 2-back visuel vaut 50% de votre bonus !",
        calculation: "Calcul du bonus: €{payment} × (0.5 × {afterVisualAcc} + 0.25 × {visualAcc} + 0.25 × {letterAcc}) = €{totalBonus}",
        rememberHard: "À retenir: Gardez toujours en mémoire les {level} dernières lettres pendant le 2-back visuel!",
        rememberEasy: "À retenir: Gardez toujours en mémoire la dernière lettre pendant le 2-back visuel!",
        continue: "Appuyez sur n'importe quelle touche pour continuer vers l'expérience principale.",
        remindAfter3Back: "Pour répondre correctement à la prochaine lettre, vous devez vous souvenir de la lettre trois positions en arrière, <strong style='color:red;'>avant le 2-back visuel</strong>.",
        remindAfter2Back: "Pour répondre correctement à la prochaine lettre, vous devez vous souvenir de la lettre deux positions en arrière, <strong style='color:red;'>avant le 2-back visuel</strong>.",
        remindAfter1Back: "Pour répondre correctement à la prochaine lettre, vous devez vous souvenir de la lettre une position en arrière, <strong style='color:red;'>avant le 2-back visuel</strong>.",
        remindBeforeHard: "Retenez bien les lettres suivantes pour répondre aux premiers essais après le 2-back visuel!",
        remindBefore1Back: "Retenez bien la lettre suivante pour répondre aux premiers essais après le 2-back visuel!",
        remindAfter3Back: {
            0:"Pour répondre correctement à la prochaine lettre, vous devez vous souvenir de l'avant avant dernière lettre <strong style='color:red;'>avant le 2-back visuel</strong>.",
            1: "Pour répondre correctement à la prochaine lettre, vous devez vous souvenir de l'avant dernière lettre <strong style='color:red;'>avant le 2-back visuel</strong>.",
            2: "Pour répondre correctement à la prochaine lettre, vous devez vous souvenir de la dernière lettre <strong style='color:red;'>avant le 2-back visuel</strong>.",
        },
        remindAfter2Back: {
            0: "Pour répondre correctement à la prochaine lettre, vous devez vous souvenir de l'avant dernière lettre <strong style='color:red;'>avant le 2-back visuel</strong>.",
            1: "Pour répondre correctement à la prochaine lettre, vous devez vous souvenir de la dernière lettre <strong style='color:red;'>avant le 2-back visuel</strong>.",
        },    
    },
    // New: comprehension check (French)
    comprehensionIntro: "Avant de commencer l’expérience, vous devez répondre correctement à quelques questions de compréhension.",
    comprehension: {
        q1Hard: {
            prompt: "Veuillez sélectionner la bonne réponse:",
            options: [
                "Je suis payé·e en fonction de la moyenne de ma précision sur tous les essais (100% de bonus).",
                "Je suis payé·e indépendamment de ma précision (100% du bonus).",
                "Je suis payé·e en fonction du 3-back lettres uniquement pour un bloc sélectionné au hasard parmi les 12 de l’expérience.",
                "Je suis payé·e en fonction de ma précision sur le 2-back visuel (25% du bonus), ma précision sur le 3-back lettres suivant (25% du bonus) et ma précision sur les trois premières lettres du 3-back lettres en particulier (50% du bonus), pour un bloc sélectionné au hasard parmi les 12 de l’expérience."
            ]
        },
        q1Easy: {
            prompt: "Veuillez sélectionner la bonne réponse:",
            options: [
                "Je suis payé·e en fonction de la moyenne de ma précision sur tous les essais (100% de bonus).",
                "Je suis payé·e indépendamment de ma précision (100% du bonus).",
                "Je suis payé·e en fonction du 1-back lettres uniquement pour un bloc sélectionné au hasard parmi les 12 de l’expérience.",
                "Je suis payé·e en fonction de ma précision sur le 2-back visuel (25% du bonus), ma précision sur le 1-back lettres suivant (25% du bonus) et ma précision sur la première lettre du 1-back lettres (50% du bonus ), pour un bloc sélectionné au hasard parmi les 12 de l’expérience."
            ]
        },
        q2: {
            prompt: "Je commence un 2-back visuel. Le point est à la même position que l'avant-dernier point du dernier 2-back visuel. Sur quelle touche dois-je appuyer ?",
            options: [
                "La touche “F”.",
                "La touche “J”.",
                "La touche “espace”."
            ]
        },
        q3Hard: {
            prompt: "Je viens de terminer un 2-back visuel. Avant lui, les trois dernières lettres que j’ai vues étaient A puis O puis I. La lettre A apparaît. Sur quelle touche dois-je appuyer ?",
            options: [
                "La touche “F”.",
                "La touche “J”.",
                "La touche “espace”."
            ]
        },
        q3Easy: {
            prompt: "Je viens de terminer un 2-back visuel. Avant lui, la dernière lettre que j’ai vue était I. La lettre I apparaît. Sur quelle touche dois-je appuyer ?",
            options: [
                "La touche “F”.",
                "La touche “J”.",
                "La touche “espace”."
            ]
        },
        correct_answers: {
            q1: "Je suis payé·e en fonction du n-back lettres uniquement pour un bloc de l’expérience.",
            q2: "La touche “F”.",
            q3: "La touche “J”."
        },
        tryAgain: "Une ou plusieurs réponses sont incorrectes. Veuillez relire les consignes et réessayer.",
        success: "Toutes les réponses sont correctes. Appuyez sur une touche pour continuer."
    },
    loopAgain: {
        failed: "Vous avez répondu incorrectement à une des questions.",
        viewInstructions: "Vous allez revoir les instructions.",
        surveyAgain: "Puis vous allez de nouveau répondre aux questions.",
        press: "Appuyez sur <strong>Suivant</strong> pour continuer !",
    },      
    loopAgainSpanMpl: {
        failed: "{incorrectQCount} {yourRAreIncorrect}.",
        yourRAreIncorrectPlural: "de vos réponses sont incorrectes",
        yourRAreIncorrectSingular: "de vos réponses est incorrecte",
        surveyAgain: "Vous allez de nouveau répondre aux questions.",
        maximumRepetition: "Ce sera votre tentative {trialQCount} sur {maxQTrials}.",
        readInstructions: "Vous êtes invité à lire les consignes si vous avez un doute pour répondre aux questions.",
        clickNext: "Appuyez sur <strong>Suivant</strong> pour répondre de nouveau !",
    },
    demographics: {
        preamble: "<strong>Données démographiques</strong>",
        questions: [
            "Quel âge avez-vous?",
            "Quel est votre genre?",
            "Quel est votre niveau d'études: (si vous êtes étudiant·e, choisissez le diplôme en cours)?",
            "Quelle est votre situation professionnelle?",
            "Quelle est la fourchette de votre revenu mensuel?",
            "Si vous avez eu ou si vous avez actuellement un parcours académique post-bac, la matière principale est-elle liée aux sciences, technologies, mathématiques, à l'ingénierie ou l'économie?",
            "Avez-vous suivi des cours universitaires (post-bac) en mathématiques, statistiques, probabilités ?",
            "Globalement, à quel point êtes-vous satisfait·e de votre vie de tous les jours?"
        ],
        options: {
            age: [
                "Moins de 18 ans",
                "18-24",
                "25-34",
                "35-44",
                "45-54",
                "55-64",
                "65 ans ou plus",
                "Préfère ne pas répondre"
            ],
            gender: [
                "Homme",
                "Femme",
                "Autre",
                "Préfère ne pas répondre"
            ],
            education: [
                "Moins qu'un diplôme d'études secondaires",
                "Diplôme d'études secondaires ou équivalent (ex.: BEP/CAP)",
                "Quelques études supérieures, sans diplôme",
                "Diplôme d'études tertiaires (ex.: BTS, DUT)",
                "Licence",
                "Master",
                "Diplôme d'ingénieur / diplôme professionnel",
                "Doctorat (ex.: Thèse / PhD)",
                "Préfère ne pas répondre"
            ],
            work: [
                "Employé·e à temps plein (35h ou plus par semaine)",
                "Employé·e à temps partiel (jusqu'à 34h par semaine)",
                "Chômeur·se - actuellement en recherche d'emploi",
                "Chômeur·se - ne recherche pas d'emploi",
                "Mise en chômage partiel",
                "Étudiant·e",
                "Retraité·e",
                "Personne au foyer",
                "Travailleur·se indépendant·e",
                "Ne peut pas travailler",
                "Préfère ne pas répondre"
            ],
            income: [
                "Moins de 500 €",
                "Entre 500 € et 1000 €",
                "Entre 1000 € et 1500 €",
                "Entre 1500 € et 2000 €",
                "Entre 2000 € et 3000 €",
                "Entre 3000 € et 5000 €",
                "Plus de 5000 €",
                "Non applicable",
                "Préfère ne pas répondre"
            ],
            collegeDegree :[
                "Oui",
                "Non",
                "Préfère ne pas répondre"
            ],
            collegeCourse: [
                "Oui",
                "Non",
                "Préfère ne pas répondre"
            ],
            life: [
                "0 (pas du tout)",
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "10 (très)",
                "Préfère ne pas répondre"
            ]
        },
    },
    prolificID: "Veuillez saisir votre identifiant Prolific:",
    redirectProlific: "Vous allez être dirigé automatiquement sur Prolific dans 3 secondes...",
    feedback_span: {
        hard: "<p><b>{fdb}</b><br>Votre réponse était {answer}, la réponse correcte était {fds_correct_ans}.</br></p>",
        easy: "<p><b>{fdb}</b><br>Votre réponse était {answer}, la réponse correcte était {fds_correct_ans}.</br></p>",
    },
    instructionsMPL: {
            makeChoice: `Veuillez <span style="background-color: rgba(239, 243, 4, 1)">sélectionner</span> quel lot (<span style="color: red">A</span> ou <span style="color: blue">B</span>) vous préférez pour chaque ligne (chaque \"version\") du tableau ci-dessous. Vous pouvez ensuite cliquer sur 'Suivant'.`,
            computerChooses: 'Si cet essai est choisi pour le paiement, l\'ordinateur choisira une ligne (\"version\") au hasard et utilisera votre <span style="background-color:  rgba(239, 243, 4, 1)">choix</span> (<span  style="color: red">lot A</span> ou <span style="color: blue"> lot B</span>) à cette ligne pour déterminer votre paiement.',
            trainingTitle: "Entraînement à sélectionner les lots",
            explanation1: "Sélectionnez le lot A pour les versions 1 à 6 et le lot B pour les versions 7 à 18.",
            explanation2: "Sélectionnez le lot B pour les versions 1 à 8 et le lot A pour les versions 9 à 18.",
            trainingClickNext: "Quand vous l'avez fait, cliquez sur <strong>Suivant</strong> pour continuer !"
    },
    endowmentsMPL: {
        lottery: {
            G90: `Vous serez payé·e 5€ plus l'argent d'une boîte tirée au hasard du lot choisi.`,
            G75: `Vous serez payé·e 5€ plus l'argent d'une boîte tirée au hasard du lot choisi.`,
            G50: `Vous serez payé·e 5€ plus l'argent d'une boîte tirée au hasard du lot choisi.`,
            G25: `Vous serez payé·e 5€ plus l'argent d'une boîte tirée au hasard du lot choisi.`,
            G10: `Vous serez payé·e 5€ plus l'argent d'une boîte tirée au hasard du lot choisi.`,
            L90: `Vous serez payé·e 30€ plus l'argent d'une boîte tirée au hasard du lot choisi.`,
            L75: `Vous serez payé·e 30€ plus l'argent d'une boîte tirée au hasard du lot choisi.`,
            L50: `Vous serez payé·e 30€ plus l'argent d'une boîte tirée au hasard du lot choisi.`,
            L25: `Vous serez payé·e 30€ plus l'argent d'une boîte tirée au hasard du lot choisi.`,
            L10: `Vous serez payé·e 30€ plus l'argent d'une boîte tirée au hasard du lot choisi.`,
            A10: `Vous serez payé·e 15€ plus l'argent d'une boîte tirée au hasard du lot choisi.`,
            A15: `Vous serez payé·e 20€ plus l'argent d'une boîte tirée au hasard du lot choisi.`,
        },
        mirror: {
            G90: `Vous serez payé·e 5€ plus la somme divisée par 100 de l'argent de toutes les boîtes du lot que vous avez choisi pour cette ligne.`,
            G75: `Vous serez payé·e 5€ plus la somme divisée par 100 de l'argent de toutes les boîtes du lot que vous avez choisi pour cette ligne.`,
            G50: `Vous serez payé·e 5€ plus la somme divisée par 100 de l'argent de toutes les boîtes du lot que vous avez choisi pour cette ligne.`,
            G25: `Vous serez payé·e 5€ plus la somme divisée par 100 de l'argent de toutes les boîtes du lot que vous avez choisi pour cette ligne.`,
            G10: `Vous serez payé·e 5€ plus la somme divisée par 100 de l'argent de toutes les boîtes du lot que vous avez choisi pour cette ligne.`,
            L90: `Vous serez payé·e 30€ plus la somme divisée par 100 de l'argent de toutes les boîtes du lot que vous avez choisi pour cette ligne.`,
            L75: `Vous serez payé·e 30€ plus la somme divisée par 100 de l'argent de toutes les boîtes du lot que vous avez choisi pour cette ligne.`,
            L50: `Vous serez payé·e 30€ plus la somme divisée par 100 de l'argent de toutes les boîtes du lot que vous avez choisi pour cette ligne.`,
            L25: `Vous serez payé·e 30€ plus la somme divisée par 100 de l'argent de toutes les boîtes du lot que vous avez choisi pour cette ligne.`,
            L10: `Vous serez payé·e 30€ plus la somme divisée par 100 de l'argent de toutes les boîtes du lot que vous avez choisi pour cette ligne.`,
            A10: `Vous serez payé·e 15€ plus la somme divisée par 100 de l'argent de toutes les boîtes du lot que vous avez choisi pour cette ligne.`,
            A15: `Vous serez payé·e 20€ plus la somme divisée par 100 de l'argent de toutes les boîtes du lot que vous avez choisi pour cette ligne.`,
    }
    },
    span_span: {
        first_letters_priority: "Vous allez voir {theBlueDigits}. Retenez-{the} en <b>priorité</b>, même pendant la présentation des chiffres <span style='color: red'>rouges</span>.",
        first_letters_give_back: "Après avoir vu {theBlueDigits}, vous verrez les chiffres <span style='color: red'>rouges</span>. Puis vous devrez restituer les chiffres <span style='color: red'>rouges</span>. Après cela vous devrez restituer {theBlueDigits}.",
        second_letters_priority: "Vous allez voir les chiffres <span style='color: red'>rouges</span>. Cependant, retenez en priorité {theBlueDigits}.",
        second_letters_give_back: "Après les avoir vus les chiffres <span style='color: red'>rouges</span>, vous devrez les restituer immédiatement. Après cela vous devrez restituer {theBlueDigits}.",
        type_second_letters: "Restituez ci-dessous les chiffres <span style='color: red'>rouges</span>, puis appuyez sur Entrée.",
        type_first_letters: "Restituez ci-dessous {theBlueDigits}, puis appuyez sur Entrée.",
        variableHard: {
            theBlueDigits: "les chiffres <span style='color:blue'>bleus</span>",
            the: "les",
        },
        variableEasy: {
            theBlueDigits: "le chiffre <span style='color:blue'>bleu</span>",
            the: "le",
        }
    },
    fds: {
        trialOutOf: "<p>Essai {current} sur {total}</p>",
    },
    response_grid_instructions: "<p>Tapez ci-dessous les chiffres dans l'ordre où vous les avez vus, puis appuyez sur Entrée.</p>",
    debrief_incentives_span_mpl: {
        title: "Fin de l'expérience",
        thanks: "Merci d'avoir participé à cette expérience !",
        calibrationPayment: "Votre bonus pour la première partie de l'expérience est de {trainingBonus}€.",
        spanSpanPayment_hard: "Votre bonus pour la deuxième partie de l'expérience est de {spanSpanBonus}€.",
        selectedForMPL: "Vous avez été sélectionné·e pour qu'un de vos choix aux tâches de prise de décision (LMP) soit payé.",
        notSelectedForMPL: "Vous n'avez pas été sélectionné·e pour qu'un de vos choix aux tâches de prise de décision (LMP) soit payé.",
        bonusSpanMPL: "Votre bonus pour la troisième partie de l'expérience est de {spanMplBonus}€. La décomposition est de {spanMPL}€ pour la tâche de mémoire et de {mplBonus}€ pour le choix.",
        bonusSpanWithoutMPL: "Votre bonus pour la troisième partie de l'expérience est de {spanMplBonus}€.",
        totalBonus: "Votre bonus total est donc de {totalBonus}€ et votre paiement total est de {totalPayment}€.",
        thanksAgain: "Merci encore pour votre participation ! <b>Appuyez sur Entrée pour recevoir votre paiement!.</b>",
    },
    responseGrid: {
        currentAnswer: "Réponse actuelle",
        clear: "Effacer",
    },
    choicesBefore: "Ce sont les choix que vous avez faits avant que la règle de paiement n'ait changé.",
    choicesAfter: "Ce sont les choix que vous avez faits après que la règle de paiement ait changé.",
    sliderTitle: "Questions finales sur vos choix",
    sliderMirror: `Les questions ci-dessous concernent vos choix dans les tâches de prise de décision (LMP), quand la consigne était <b>"la moyenne des boîtes"</b>. {order}`,
    sliderLottery: `Les questions ci-dessous concernent vos choix dans les tâches de prise de décision (LMP), quand la consigne était <b>"une boîte au hasard"</b>. {order}`,
    sliderHonest: "Vos réponses aux questions suivantes sont anonymes et ne seront pas liées à votre paiement. Veuillez répondre honnêtement.",
    sliderCognitiveUncertainty:{
        question: "Quelle est la probabilité selon vous (en %) que vos réponses aient maximisé vos bonus pour toutes les lignes de chaque tableau des LMP?",
        veryUncertain: "0% (bonus non maximisé)",
        veryCertain: "100% (bonus maximisé)",
    },
    sliderInattention:{
        questionBoxes: "Avez-vous prêté attention au nombre de boîtes dans chaque lot lors des tâches de prise de décision (LMP)?",
        questionPayoffs: "Avez-vous prêté attention aux montants des boîtes dans chaque lot lors des tâches de prise de décision (LMP)?",
        veryUncertain: "Aucune attention",
        veryCertain: "Attention maximale",
    },
    sliderImprecision:{
        question: "Avez-vous plutôt deviné les réponses ou plutôt pris des décisions précises?",
        veryUncertain: "Je devinais",
        veryCertain: "Je prenais des décisions précises",
    }

};

let language = fr;