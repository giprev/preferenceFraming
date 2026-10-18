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
        welcome: "Bienvenue !", //Traitement {treatment}
        clickNext: "Cliquez sur <strong>Suivant</strong> pour continuer."
    },
    overviewPage: {
        //purpose: "Cette expérience porte sur la prise de décision et la mémoire.",
        // procedure: "Elle comprend des tâches de mémoire et des tâches de prise de décision.",
       //  IRB: "Cette expérience a été approuvée par l'Institutional Review Board (comité d'éthique) de Paris School of Economics, numéro d'approbation XXXXX.",
        thanks: "Merci de participer à cette expérience.",
        anonimity: "Toutes les données collectées sont anonymes et seront utilisées à des fins de recherche uniquement.",
        // credits: "Cette expérience est menée par l'étudiant en master Gildas Prévost sous la supervision du professeur Dr. Bastien Blain, tous deux à l'Université Paris 1 Panthéon-Sorbonne.",
        question: "Si vous avez des questions, vous pouvez envoyer un email à gildas.prevost@etu.univ-paris1.fr.",
        withdrawal: "Vous pouvez quitter l'expérience à tout moment.",
        phone: "L'usage de tout objet pouvant servir à noter des informations (téléphone, montre connectée, stylo etc.) est interdit, sous peine d'exclusion de l'expérience.",
        clickNext: "Cliquez sur <strong>Suivant</strong> pour continuer."
    },
    // descriptionExperimentNback: {
    //     title: "Description de l'expérience",
    //     twoGames: "Vous aurez deux tâches différentes à réaliser: le 2-back visuel et le n-back lettres.",
    //     instructionsAfter: "Vous recevrez les instructions pour chaque tâche après cette page.",
    //     subBlockExplanation: "L'expérience se compose de 12 blocs. Un bloc comprend une tâche de 2-back visuel suivie d'une tâche de n-back lettres.",
    //     paymentAfter: "Pour que vous compreniez comment vous serez payé·e, vous recevrez les explications du paiement après les instructions.",
    //     clickNext: "Cliquez sur <strong>Suivant</strong> pour continuer."
    // },
    descriptionExperimentSpanMPL: {
        title: "Description de l'expérience",
        threeParts: "L'expérience se déroule en <b>trois parties</b>.",
        twoPartsIncentives: "L'expérience se compose d'un jeu et de quelques questions.",
        // part1: 'Dans la première partie, vous effectuerez une tâche de mémoire appelée "span de mémoire".',
        // part2: "Dans la deuxième partie, vous effectuerez une variation de la tâche de span de mémoire.",
        // part3: "Dans la troisième partie, vous effectuerez la tâche de span de mémoire en combinaison avec une tâche de prise de décision.",
        payment: "Votre gain final pour l’expérience sera un paiement fixe de <b>{basePaymentMPLIncentives}€ plus la somme des bonus réalisés grâce au jeu et aux questions</b>.",
        // paymentBonus: "De plus vous pouvez gagner des bonus pour chaque partie, en fonction de vos performances et de vos choix.",
        warningComprehensionQuestions: `Pendant la troisième partie, vous devrez répondre deux fois à des questions de compréhension (qui concerneront les instructions de la troisième partie).
        Si vous répondez incorrectement à plus d'une question sur les cinq, l'expérience s'arrêtera et votre paiement de base ne sera que de {notUnderstoodPayment}€, auquel vous ajouterez les bonus de la première et de la deuxième partie.`,
        descriptionSpan: `Chacune des 3 parties comporte plusieurs tours d’un jeu nommé "le jeu des chiffres" : vous devrez visionner une séquence de chiffres qui apparaîtront et disparaîtront un par un à l’écran. Après avoir visionné la séquence, vous devrez la restituer grâce à un clavier affiché à l’écran.`,
        examplePresentation: "Par exemple, si vous voyez les chiffres <b style=\"color:blue;\">1</b>, <b style=\"color:blue;\">2</b>, <b style=\"color:blue;\">3</b>, vous devrez répondre <b style=\"color:green;\">1</b>, <b style=\"color:green;\">2</b>, <b style=\"color:green;\">3</b>.",
        precision: "A chaque tour, l’ordinateur calculera la précision de votre réponse : elle correspond à la proportion de chiffres correctement restitués dans la bonne position. Si vous saisissez plus de chiffres que la séquence n’en contient, les chiffres supplémentaires comptent comme des erreurs.",
        examplePrecision: `
        Exemple 1: si vous avez vu <b style="color:blue;">1</b>, <b style="color:blue;">2</b>, <b style="color:blue;">3</b> 
        et que vous répondez <b style="color:green;">1</b>, <b style="color:red;">3</b>,  <b style="color:red;">2</b>,
        <br> votre précision est de 1/3 = <b>33%</b>.
        <br>
        Exemple 2: si vous avez vu <b style="color:blue;">1</b>, <b style="color:blue;">2</b>, <b style="color:blue;">3</b> 
        et que vous répondez <b style="color:green;">1</b>, <b style="color:green;">2</b>, <b style="color:red;">2</b>, <b style="color:red;">3</b>,
        <br> votre précision est de 2/4 = <b>50%</b>.
        <br>
        Exemple 3: si vous avez vu <b style="color:blue;">1</b>, <b style="color:blue;">2</b>, <b style="color:blue;">3</b> 
        et que vous répondez <b style="color:green;">1</b>, <b style="color:green;">2</b>, 
        <br>votre précision est de 2/3 = <b>66%</b>.
        <br>`,
        //paymentAfter: "Pour que vous compreniez comment les bonus sont calculés, vous recevrez les explications des bonus après les instructions pour chaque partie.",
        //instructionsAfter: "Vous recevrez les instructions de la première partie après cette page.",
        clickNext: "Cliquez sur <strong>Suivant</strong> pour continuer."
    },
    // instruction_span_general:{
    //     title: "instructions pour la tâche de span de mémoire (valables tout au long de l'expérience).",
    //     description: "À chaque tour, une séquence de chiffres s'affichera. Vous devrez la restituer dans le même ordre à l'aide d'un clavier à l'écran.",
    //     clickNext: "Cliquez sur <strong>Suivant</strong> pour continuer."
    // },
    instructionCalibration:{
        title: "Instructions pour la Partie 1.",
        rounds: "Dans cette partie, vous allez jouer 9 tours du jeu des chiffres.",
        //description: "À chaque tour, vous verrez une séquence de chiffres et vous devrez la retaper dans le même ordre dans lequel elle a été vue.",
        bonus: "<b>Calcul du bonus dans la Partie 1 :</b> dans cette partie, la longueur des séquences de chiffres augmentera après une réussite (100% de précision) et diminuera après deux échecs consécutifs.",
        incentiveRule: "Votre but est d'atteindre la <b>plus longue séquence possible</b> à la fin des 9 tours. En effet, si votre dernière séquence dépasse 6 unités, chaque unité à partir de la 7ème (inclus) vous rapporte <b>{partBonus}€.</b>",
        incentiveRuleExample: "Par exemple, si vous atteignez une longueur de 8 après le dernier tour, votre bonus sera de {partBonus}€ x 2 = <b>{examplePayment}€</b>.",
        meanDuration: "Cette partie dure environ 3 minutes.",
        clickNext: "Cliquez sur <strong>Suivant</strong> pour commencer la première partie."
    },
    debriefCalibration:{
        title: "Fin de la première partie",
        performance: "La longueur finale (après la prise en compte de votre succès ou échec final) est de {maxSpan}.",
        bonus: "Votre bonus pour cette partie est donc de {bonus}€ x {units} = <b>{totalBonus}€</b>.",
    },
    // instructionsSpanSpan:{
    //     title: "instructions pour la deuxième partie.",
    //     description: "Dans cette partie, vous allez effectuer deux tâches de span de mémoire en même temps.",
    //     lettersOrder: "À chaque tour, vous allez d'abord mémoriser {someBlueDigits}. Puis, au lieu de {the} restituer directement, vous verrez une série de chiffres <span style='color:red'>rouges</span>. Immédiatement après vous devrez restituer les chiffres <span style='color:red'>rouges</span>. Enfin vous devrez restituer {theBlueDigits}.",
    //     goal: "Pour maximiser votre bonus, vous devez restituer correctement les chiffres <span style='color:blue'>bleus</span> en <b>priorité</b>.",
    //     sequenceNumber: "Vous ferez 6 tours.",
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
        title: "Instructions pour la Partie 2.",
        description: "Dans cette partie, vous allez jouer 6 tours du jeu des chiffres, mais avec des règles légèrement différentes :",
        lettersOrder: `Vous verrez une séquence composée de {someBlueDigits} puis une séquence composée de chiffres <span style='color:red'>rouges</span>. 
        <br>Vous devrez ensuite restituer à l'aide du clavier à l'écran la séquence de chiffres <span style='color:red'>rouges</span>, puis {theBlueDigits}.`,
        //goal: "Pour maximiser votre bonus, la tâche source ({theBlueDigits}) est plus importante que la tâche cible.",
        bonus: `<b>Calcul du bonus pour la Partie 2 :</b> à la fin de la partie, un tour sera tiré au hasard. Votre bonus dépendra de votre précision dans ce tour, selon la formule suivante:`,
        bonusBlue: `<b>67%</b> du bonus dépend de votre précision pour {theBlueDigits}.`,
        bonusRed: `<b>33%</b> du bonus dépend de votre précision pour les chiffres <span style='color:red'>rouges</span>.`,
        incentiveRuleExample: "Par exemple, si au tour sélectionné vous obtenez une précision de 100% sur {theBlueDigits} mais seulement 10% sur les chiffres <span style='color:red'>rouges</span>, votre bonus sera de <b>{bonus}€ x (<span style='color:blue'>0.67 x 100%</span> + <span style='color:red'>0.33 x 10%</span>) = {examplePayment}€.</b>",
        reminder: "Rappel: La précision correspond à la proportion de chiffres correctement restitués dans la bonne position. Si vous saisissez plus de chiffres que la séquence n’en contient, les chiffres supplémentaires comptent comme des erreurs.",
        remember:  `<div class="important-note">
                    💡 À retenir: retenez {theBlueDigits} en priorité, même pendant la présentation des chiffres <span style='color:red'>rouges</span>. Votre bonus dépend avant tout de la restitution correcte {theBlueWithDu} ! 
                </div>`,
        variableHard: {
            someBlueDigits: "chiffres <span style='color:blue'>bleus</span>",
            theBlueDigits: "les chiffres <span style='color:blue'>bleus</span>",
            the: "les",
            displayed: "affichés",
            theBlueWithDu : "des chiffres <span style='color:blue'>bleus</span>"
        },
        variableEasy: {
            someBlueDigits: "1 chiffre <span style='color:blue'>bleu</span>",
            theBlueDigits: "le chiffre <span style='color:blue'>bleu</span>",
            the: "le",
            displayed: "affiché",
            theBlueWithDu : "du chiffre <span style='color:blue'>bleu</span>"
        },
        clickNext: "Cliquez sur <strong>Suivant</strong> pour commencer la Partie 2.",
    },
    spanTrials: {
        theBlueDigitsWillBePresented: "Les chiffres <span style='color:blue'>bleus</span> vont être présentés.",
        theBlueDigitWillBePresented: "Le chiffre <span style='color:blue'>bleu</span> va être présenté.",
        theRedDigitsWillBePresented: "Les chiffres <span style='color:red'>rouges</span> vont être présentés.",
    },
    debriefSpanSpan:{
        title: "Fin de la deuxième partie",
        performance: "Pour le tour sélectionné, votre précision pour {theBlueDigits} est de {blueAccuracy}%, et votre précision pour les chiffres <span style='color:red'>rouges</span> est de {redAccuracy}%.",
        bonus: "Votre bonus pour cette partie est donc de {bonus}€ x (0.67 x {blueAccuracy}% + 0.33 x {redAccuracy}%) = <b>{totalBonus}€</b>.",
        variableHard: {
            theBlueDigits: "les chiffres <span style='color:blue'>bleus</span>",
        },
        variableEasy: {
            theBlueDigits: "le chiffre <span style='color:blue'>bleu</span>",
        },
    },
    // instructionsThirdPart:{
    //     freqMPL: "<b>En moyenne, une personne sur {frequency}</b> sera sélectionnée à la fin de l'expérience pour qu'<b>un de ses choix à la tâche des choix soit réellement payé</b>. Le bonus pour le jeu des chiffres est lui calculé <b>pour chaque personne</b>.",
    //     clickNext: "Cliquez sur <strong>Suivant</strong> pour découvrir la tâche des choix."
    // },
    instructionsDecisionTable:{
        // title: "Instructions pour la tâche des choix.",
        title: "Instructions pour la Partie 3.",
        titleIncentives: "Instructions.",
        description: "Dans cette partie, vous allez jouer au jeu des chiffres et à une nouvelle tâche, nommée <b>\"la tâche des choix\"</b>. Découvrons d'abord les instructions de la tâche des choix.",
        descriptionIncentives: 'Dans cette expérience, vous allez jouer à "la tâche des choix".',
        subTitle: "Qu'allez vous faire ? Vous devez choisir le lot que vous préférez entre le <span style='color:red'>lot A</span> et le <span style='color:blue'>lot B</span>.",
        subTitleInequalities: "Qu'allez vous faire ? Vous devez choisir le lot qui rapporte le plus entre le <span style='color:red'>lot A</span> et le <span style='color:blue'>lot B</span>.", // in the inequalities treatment
        titleSecondInstructions: "Nouvelle règle de paiement",
        descriptionBoxes: `Chaque lot contient 100 boîtes.`,
        descriptionMoney: "Chaque boîte peut contenir de l'argent (positif ou négatif).",
        optionsDiffer: "Les lots diffèrent par la répartition de l'argent dans les boîtes.",
        bonusRandomBox: 'Comment serez-vous payé ? L\'ordinateur prend l\'argent <b>d\'une boîte tirée au hasard</b> dans le lot que vous avez choisi et l\'ajoute à votre <b>bonus</b>. C\'est la règle de paiement nommée <b>"une boîte au hasard"</b>.',
        bonusAverageBox: "Comment serez-vous payé ? L'ordinateur prend <b>la moyenne</b> de l'argent dans les boîtes du lot que vous avez choisi et l'ajoute à votre <b>bonus</b>. C\'est la règle de paiement nommée <b>\"la boîte moyenne\"</b>.",
        bonusAverageBoxIncentives: "Un lot rapporte <b>la moyenne</b> de l'argent de ses boîtes.",
        breakDownWithExamples: "Expliquons avec deux exemples.",
        example1: "Exemple 1:",
        example1ExplanationLottery: `Si vous choisissez le <span style='color:red'>lot A</span>, comme il y a 50 boîtes avec 16€ et 50 avec 0€, 
        <br>vous avez <b>50% de chance d'avoir <span style='color:green'>16€</span></b>, et 50% de chance d'avoir 0€.
        <br>Si vous choisissez le <span style='color:blue'>lot B</span>, comme toutes les boîtes contiennent 4€, vous êtes <b>sûr·e d'avoir <span style='color:green'>4€</span></b> (100% de chance).`,
        example1ExplanationMirror: `Si vous choisissez le <span style='color:red'>lot A</span>, comme il y a 50 boîtes avec 16€ et 50 avec 0€,
        <br>la moyenne est de (16€ x 50 + 0€ x 50) divisé par 100 = 8€. Vous êtes <b>sûr·e d'avoir <span style='color:green'>8€</span></b> (100% de chance).
        <br> Si vous choisissez le <span style='color:blue'>lot B</span>, comme toutes les boîtes contiennent 4€, la moyenne est de 4€, vous êtes <b>sûr·e d'avoir <span style='color:green'>4€</span></b> (100% de chance).`,
        example1ExplanationMirrorIncentivesMirr: `Pour le <span style='color:red'>lot A</span>, comme il y a 50 boîtes avec 16€ et 50 avec 0€,
        <br>la moyenne est de (16€ x 50 + 0€ x 50) divisé par 100 = 8€. Le lot rapporte donc <b><span style='color:green'>8€</span></b>.
        <br> Pour le <span style='color:blue'>lot B</span>, comme toutes les boîtes contiennent 4€, la moyenne est de 4€, le lot rapporte donc <b><span style='color:green'>4€</span></b>.`,
        example1ExplanationMirrorIncentivesIneq: `Pour le <span style='color:red'>lot A</span>, comme il y a 50 boîtes avec 16€ et 50 avec 0€,
        <br>la moyenne est de (16€ x 50 + 0€ x 50) divisé par 100 = 8€. Le lot rapporte donc <b><span style='color:green'>8€</span></b>.
        <br> Pour le <span style='color:blue'>lot B</span>, comme toutes les boîtes contiennent 4€, la moyenne est de 4€, le lot rapporte donc <b><span style='color:green'>4€</span></b>.
        <br>Vous devez donc choisir le <span style='color:red'>lot A</span> car il <b>rapporte plus d'argent</b>.`,
        example2: "Exemple 2:",
        example2ExplanationLottery: `Si vous choisissez le <span style='color:red'>lot A</span>, comme il y a 25 boîtes avec -12€ et 75 avec 0€, 
        <br>vous avez <b>25% de chance d'avoir <span style='color:green'>-12€</span></b>, et 75% de chance d'avoir 0€.
        <br>Si vous choisissez le <span style='color:blue'>lot B</span>, comme toutes les boîtes contiennent -3€, vous êtes <b>sûr·e d'avoir <span style='color:green'>-3€</span></b> (100% de chance).`,
        example2ExplanationMirror: `Si vous choisissez le <span style='color:red'>lot A</span>, comme il y a 25 boîtes avec -12€ et 75 avec 0€,
        <br> la moyenne est de (-12€ x 25 + 0€ x 75) divisé par 100 = -3€. Vous êtes <b>sûr·e d'avoir <span style='color:green'>-3€</span></b> (100% de chance).
        <br>Si vous choisissez le <span style='color:blue'>lot B</span>, comme toutes les boîtes contiennent -3€, la moyenne est de -3€, vous gagnez un bonus de <b>sûr·e d'avoir <span style='color:green'>-3€</span></b> (100% de chance).
        <br>Ici, le <span style='color:red'>lot A</span> et le <span style='color:blue'>lot B</span> vous rapportent le même bonus, car ils ont la même moyenne.`,
        example2ExplanationMirrorIncentivesMirr: `Pour le <span style='color:red'>lot A</span>, comme il y a 25 boîtes avec -12€ et 75 avec 0€,
        <br> la moyenne est de (-12€ x 25 + 0€ x 75) divisé par 100 = -3€. Le lot rapporte donc <b><span style='color:green'>-3€</span></b>.
        <br> Pour le <span style='color:blue'>lot B</span>, comme toutes les boîtes contiennent -3€, la moyenne est de -3€, le lot rapporte donc <b><span style='color:green'>-3€</span></b>.
        <br>Ici, le <span style='color:red'>lot A</span> et le <span style='color:blue'>lot B</span> rapportent autant, car ils ont la même moyenne.`,
        example2ExplanationMirrorIncentivesIneq: `Pour le <span style='color:red'>lot A</span>, comme il y a 25 boîtes avec -12€ et 75 avec 0€,
        <br> la moyenne est de (-12€ x 25 + 0€ x 75) divisé par 100 = -3€. Le lot rapporte donc <b><span style='color:green'>-3€</span></b>.
        <br> Pour le <span style='color:blue'>lot B</span>, comme toutes les boîtes contiennent -3€, la moyenne est de -3€, le lot rapporte donc <b><span style='color:green'>-3€</span></b>.
        <br>Ici, vous pouvez choisir le <span style='color:red'>lot A</span> ou le <span style='color:blue'>lot B</span> car ils rapportent autant d'argent.`,
        clickNext: "Cliquez sur <strong>Suivant</strong> pour découvrir comment choisir un lot.",
        clickNextSecond: "Cliquez sur <strong>Suivant</strong> pour répondre à la dernière partie des questions de compréhension."
    },
    instructionsClickToChoose:{
        title: "Instructions pour la tâche des choix.",
        clickToChoose: `Pour choisir un lot vous devez cliquer sur le tableau. Le lot choisi est surligné en <span style='background-color: rgba(239, 243, 4, 1)'>jaune</span>.`,
        clickToChooseExample: `Ici le lot choisi est le <span style='color:red'>lot A</span>.`,
        comprehensionQuestionsFirstAfter: "La prochaine page vous montrera la première partie des questions de compréhension. La deuxième partie des questions de compréhension se trouve au milieu de cette partie de l'expérience.",
        comprehensionQuestionsSecondAfter: "La prochaine page vous montrera la deuxième et dernière partie des questions de compréhension.",
        clickNext: "Cliquez sur <strong>Suivant</strong> pour répondre aux questions de compréhension."
    },
    comprehensionMPLIntro: {
        titleMain: "Questions de compréhension",
        titleTraining: "Questions de compréhension (entraînement)",
    },
    comprehensionMPLExplanation: `Vous devez réussir les deux questions des deux parties des questions de compréhension pour continuer l'expérience. Si vous échouez plus de quatre fois à l'une des deux parties,
    l'expérience se terminera et vous serez payé·e {notUnderstoodPayment}€, en plus des bonus des deux premières parties de l'expérience. 
    <br>
    Vous pouvez cliquer sur le bouton en haut à droite pour afficher les instructions.`,
    comprehensionMPLExplanationIncentives: `Vous devez réussir les deux questions. Si vous échouez plus de quatre fois
    l'expérience se terminera et vous serez payé·e {basePaymentMPLIncentives}€. 
    <br>
    Vous pouvez cliquer sur le bouton en haut à droite pour afficher les instructions.`,
    comprehensionFailure:{
        title: "Fin de l'expérience",
        description: `Malheureusement, vous n'avez pas répondu correctement aux questions de compréhension.
        L'expérience se termine ici. Vous serez payé·e {notUnderstoodPayment}€ pour votre temps, en plus des bonus précédents ({actual_payment_calibration}€ pour la première partie et {actual_payment_span_span}€ pour la deuxième partie).`,
        descriptionIncentives: `Malheureusement, vous n'avez pas répondu correctement aux questions de compréhension.
        L'expérience se termine ici. Vous serez payé·e {basePaymentMPLIncentives}€ pour votre temps.`,
        thanks: "Merci beaucoup pour votre participation.",
        clickNext: "Appuyez sur Entrée pour terminer l'expérience <b>et recevoir votre paiement</b>.",
    },
    comprehensionQMPLMirror: {
        q1: {
            promptMain: `Pour la prochaine question, supposez que vous ayez choisi le <span style='color:red'>lot A</span> dans le tableau ci-dessus,
            et que vous êtes sélectionné·e pour être payé·e. 
            <b>La règle de paiement est "la moyenne des boîtes"</b>.
            <br><br>
            Quel(s) montant(s) d'argent pouvez-vous gagner ou perdre ?`,
            promptMainIncentives: `Pour la prochaine question, supposez que vous ayez choisi le <span style='color:red'>lot A</span> dans le tableau ci-dessus.
            <br><br>
            Quel(s) montant(s) d'argent le lot peut-il rapporter ?`,
            options: [
                "0€",
                "1€",
                "5€",
                "10€",
            ],
        },
        q2: {
            prompt: `Pour cette deuxième question, supposez supposez que vous ayez choisi le <span style='color:blue'>lot B</span> dans le tableau ci-dessus. 
            Vous êtes sélectionné·e pour que ce choix soit payé, toujours avec la règle de paiement <b>"la moyenne des boîtes"</b>. 
            <br>
            Quel(s) montant(s) d'argent pouvez-vous gagner ou perdre ?`,
            promptIncentives: `Pour cette deuxième question, supposez que vous ayez choisi le <span style='color:blue'>lot B</span> dans le tableau ci-dessus.             <br>
            Quel(s) montant(s) d'argent le lot peut-il rapporter ?`,
            optionsMain: [
                "0€",
                "-3€",
                "-10€",
                "-100€",
            ],
        },
        q3 : {
            promptIncentives: `Dernière question : pour chaque choix, que devez-vous faire ?`,
            optionsMain: [
                `Choisir l'option qui rapporte le plus.`,
                `Choisir l'option que je préfère.`,
            ],
        },
    },
    comprehensionQMPLLottery: {
        q1: {
            promptMain: `Pour la prochaine question, supposez que vous ayez choisi le <span style='color:red'>lot A</span> dans le tableau ci-dessus,
            et que vous êtes sélectionné·e pour être payé·e. 
            <b>La règle de paiement est "une boîte au hasard"</b>.
            <br><br>
            Quel(s) montant(s) d'argent pouvez-vous gagner ou perdre ?`,
            options: [
                "0€",
                "1€",
                "5€",
                "10€",
            ],
        },
        q2: {
            prompt: `Pour cette dernière question, supposez que vous ayez fait le choix du <span style='color:blue'>lot B</span> dans le tableau ci-dessus. 
            Vous êtes sélectionné·e pour que ce choix soit payé, toujours avec la règle de paiement <b>"une boîte au hasard"</b>. 
            <br>
            Quel(s) montant(s) d'argent pouvez-vous gagner ou perdre ?`,
            optionsMain: [
                "0€",
                "-3€",
                "-10€",
                "-100€",
            ],
        },
    },
    instructionsChoosingASetOfBoxes: {
        title: "Instructions pour les Listes à Multiples Prix (LMP).",
        subTitle: "Choisir un lot de boîtes",
        comprehensionChecked: "Vous avez correctement répondu à la première partie des questions de compréhension.",
        comprehensionCheckedIncentives: "Vous avez correctement répondu aux questions de compréhension.",
        description: `Dans la Partie 3, vous devrez choisir entre différentes lignes ("versions") du <span style='color:red'>lot A</span> et du <span style='color:blue'>lot B</span>.`,
        descriptionIncentives: `Durant l'expérience, vous allez choisir entre différentes lignes ("versions") du <span style='color:red'>lot A</span> et du <span style='color:blue'>lot B</span>.`,
        example1: ` 
        Dans l'exemple ci-dessous, le <span style='color:red'>lot A</span> est le même pour toutes les lignes ("versions") du tableau. Cependant le <span style='color:blue'>lot B</span> change : à chaque version, l'argent dans chacune de ses boîtes augmente de 1€.`,
        chooseSet: `Vous devez choisir le lot qui vous <b>plaît</b> le plus à chaque ligne. Le lot sélectionné à chaque ligne est surligné en <span style='background-color: rgba(239, 243, 4, 1)'>jaune</span>.
        Dans l'exemple ci-dessous, vous sélectionnez le <span style='color:red'>lot A</span> dans les lignes ("versions") 1, 2, 3, 4, 5, 6 et 7, et vous sélectionnez le <span style='color:blue'>lot B</span> dans les lignes ("versions") 8, 9 et 10.`,
        chooseSetInequalities: `Vous devez choisir le lot qui <b>rapporte</b> le plus à chaque ligne. Le lot sélectionné à chaque ligne est surligné en <span style='background-color: rgba(239, 243, 4, 1)'>jaune</span>.
        Dans l'exemple ci-dessous, vous sélectionnez le <span style='color:red'>lot A</span> dans les lignes ("versions") 1, 2, 3, 4, 5, 6 et 7, et vous sélectionnez le <span style='color:blue'>lot B</span> dans les lignes ("versions") 8, 9 et 10.`,
        pickOneRow: `À la fin de l'expérience, si vous êtes sélectionné·e (vous avez en moyenne une chance sur 22), l'ordinateur sélectionnera au hasard une ligne du tableau
        (une lignes("version") des <span style='color:red'>lot A</span> et <span style='color:blue'>lot B</span>) et vous serez payé·e en fonction du lot que vous aurez sélectionné pour cette ligne. Chaque ligne a la même chance d'être sélectionnée.
        Vous devez donc choisir chaque ligne comme si c'était celle qui allait être payée.`,
        computerOnlyOneChoice: `L'ordinateur ne vous autorise à passer du <span style='color:red'>lot A</span> au <span style='color:blue'>lot B</span> qu'une seule fois dans le tableau.`,
        severalTables: "Plusieurs tableaux",
        clickNext: "Cliquez sur <strong>Suivant</strong> pour vous entraîner à choisir des lots de boîtes.",
    },
    instructionsSpanInMPL: {
        title: "Instructions finales pour la Partie 3.",
        titleIncentives: "Instructions finales.",
        subTitle: "Combinaison de la tâche de span de mémoire et des Listes à Multiples Prix (LMP).",
        // MPLInSpan: "Dans la troisième partie, vous verrez <b>une série de chiffres à retenir, puis vous devrez faire vos choix pour une tâche de LMP, et enfin vous devrez restituer les chiffres.</b>",
        MPLInSpan: "Dans la Partie 3, vous allez jouer de multiples tours du jeu des chiffres, mais avec en plus la tâche des choix.",
        MPLInSpanIncentives: "Vous allez jouer de multiples tours de la tâche des choix.",
        lettersOrderHard: `À chaque tour vous verrez une séquence de chiffres (début du jeu des chiffres), puis vous ferez des choix sur un tableau (tâche des choix), puis vous devrez restituer les chiffres dans la bonne position (fin du jeu des chiffres).`,
        lettersOrderEasy: `À chaque tour vous verrez un chiffre (début du jeu des chiffres), puis vous ferez des choix sur un tableau (tâche des choix), puis vous devrez restituer le chiffre (fin du jeu des chiffres).`,
        // MPLInSpanRepeatHard: "Vous ferez plusieurs tours, avec des séquences de chiffres et des tableaux différents.",
        // MPLInSpanRepeatEasy: "Vous ferez plusieurs tours, avec des chiffres et des tableaux différents.",
        incentives: "<b>Calcul des bonus dans la Partie 3 :</b>",
        incentivesSpan: "<b>Le bonus pour le jeu des chiffres, de {bonusSpan}€</b> maximum, sera calculé de manière similaire à la deuxième partie :",
        incentivesSpanDetails: `L'ordinateur sélectionnera un tour au hasard parmi les tours de la troisième partie. Votre bonus dépendra de votre <b>précision</b> dans cet tour.`,
        incentiveSpanExampleHard: "Par exemple, si au tour sélectionné vous obtenez une précision de 80%, votre bonus sera de <b>{bonusSpan}€ x 0.8 = {examplePaymentSpan}€.</b>",
        incentiveSpanExampleEasy: "Par exemple, si au tour sélectionné vous restituez le bon chiffre, votre bonus sera de <b>{bonusSpan}€</b>. Si vous restituez un autre chiffre, votre bonus sera de 0€.",
        randomMechanism: "Puisque le bonus dépend d'un tour tiré au hasard, veuillez considérer chaque tour comme si c’était celui qui allait être payé.",
        severalTablesDescription: `<b>Le bonus pour la tâche des choix</b> sera calculé de la manière suivante :`,
        severalTablesDescriptionIncentives: `<b>Le bonus</b> sera calculé de la manière suivante :`,
        incentivesMPL1: `Vous avez en moyenne une chance sur {propSelecForMPL} d'être sélectionné·e au hasard pour avoir ce bonus. Si c'est le cas l'ordinateur sélectionnera <b>au hasard un tour puis une ligne (version) du tableau que vous avez vu ce tour-là</b>, 
        puis déterminera votre paiement <b>selon votre choix pour cette ligne</b>.`,
        incentivesMPL1Incentives: `Certains tours sont des <span style='color: #D4AF37'><b>💰 Super Tours 💰</b></span> : vous avez en moyenne une chance sur {propSelecForMPLIncentives} pour qu’un des ces <span style='color: #D4AF37'><b>💰 Super Tours 💰</b></span> soit payé. 
        Si c'est le cas l'ordinateur sélectionnera <b>au hasard un <span style='color: #D4AF37'>💰 Super Tour 💰</span> puis une ligne (version) du tableau que vous avez vu à ce tour là</b>, 
        puis vous payera ce que rapporte le lot que vous avez choisi à cette ligne.`,
        roundIncentivized: `Les autres tours (<span style='color: #275293df'><b>Tours Classiques</b></span>) ne seront <b>pas payés</b>. Avant chaque tour vous serez prévenu·e s’il s’agit d’un <span style='color: #D4AF37'><b>💰 Super tour 💰</b></span> ou d’un <span style='color: #275293df'><b>Tour Classique</b></span>.`,
        instructionsMoreIncentivizedRound: `Certains tours sont des <b>"super tours"</b>: ils ont <b>deux fois plus de chance</b> d'être sélectionnés pour le <b>bonus</b> que les autres tours. Avant chaque tour, vous serez prévenu·e s’il s’agit d’un "Super tour" ou d’un <span style='color: #275293df'><b>Tour Classique</b></span>.`,   
        incentivesMPL2: `L'ordinateur rajoutera une somme initiale d'argent au bonus du choix (si il y en a un). Cette somme dépend du tableau sélectionné. Elle est indiquée en <span style='color:green'>vert</span> en haut de chaque tableau.`,
        CU_ineq: "Après avoir fait votre choix, vous devez indiquer à quel point vous pensez qu'à chaque ligne, vous avez choisi le lot qui rapporte le plus. <b>Répondez honnêtement, votre réponse ne changera pas votre paiement.</b>",
        CU_mirr: "Après avoir fait votre choix, vous devez indiquer à quel point vous pensez qu'à chaque ligne, vous avez choisi le lot qui vous plaît le plus. <b>Répondez honnêtement, votre réponse ne changera pas votre paiement.</b>",
        timeLimit: "Vous aurez {mplTimeLimit} secondes pour faire vos choix à chaque tableau (même sans cliquer sur le bouton Suivant ils seront pris en compte). Cependant si vous êtes sélectionné·e mais qu'au tour choisi au hasard vous n'avez pas fait de choix dans le temps imparti, vous n'obtiendrez pas de bonus.",
        incentivesMPL3: `Faites donc chaque choix comme si c'était celui qui allait être payé !`,
        priority: "Retenez les chiffres même pendant la tâche des choix, le bonus du jeu des chiffres est en moyenne supérieur à celui de la tâche des choix !",
        clickNext: "Cliquez sur <strong>Suivant</strong> pour effectuer un exemple final."
        
    },
    instructionsMPLIncentives: {
        title: "Instructions finales.",
        MPLInSpan: "Vous allez réaliser de multiples tours.",
        lettersOrderHard: `À chaque tour vous verrez une séquence de chiffres (début du jeu des chiffres), puis vous ferez des choix sur un tableau (tâche des choix), puis vous devrez restituer les chiffres dans la bonne position (fin du jeu des chiffres).`,
        lettersOrderEasy: `À chaque tour vous verrez un chiffre (début du jeu des chiffres), puis vous ferez des choix sur un tableau (tâche des choix), puis vous devrez restituer le chiffre (fin du jeu des chiffres).`,
        // MPLInSpanRepeatHard: "Vous ferez plusieurs tours, avec des séquences de chiffres et des tableaux différents.",
        // MPLInSpanRepeatEasy: "Vous ferez plusieurs tours, avec des chiffres et des tableaux différents.",
        incentives: "<b>Calcul des bonus dans la Partie 3 :</b>",
        incentivesSpan: "<b>Le bonus pour le jeu des chiffres, de {bonusSpan}€</b> maximum, sera calculé de manière similaire à la deuxième partie :",
        incentivesSpanDetails: `L'ordinateur sélectionnera un tour au hasard parmi les tours de la troisième partie. Votre bonus dépendra de votre <b>précision</b> dans cet tour.`,
        incentiveSpanExampleHard: "Par exemple, si au tour sélectionné vous obtenez une précision de 80%, votre bonus sera de <b>{bonusSpan}€ x 0.8 = {examplePaymentSpan}€.</b>",
        incentiveSpanExampleEasy: "Par exemple, si au tour sélectionné vous restituez le bon chiffre, votre bonus sera de <b>{bonusSpan}€</b>. Si vous restituez un autre chiffre, votre bonus sera de 0€.",
        randomMechanism: "Puisque le bonus dépend d'un tour tiré au hasard, veuillez considérer chaque tour comme si c’était celui qui allait être payé.",
        severalTablesDescription: `<b>Le bonus pour la tâche des choix</b> sera calculé de la manière suivante :`,
        incentivesMPL1: `Vous avez en moyenne une chance sur {propSelecForMPL} d'être sélectionné·e au hasard pour avoir ce bonus. Si c'est le cas l'ordinateur sélectionnera <b>au hasard un tour puis une ligne (version) du tableau que vous avez vu ce tour-là</b>, 
        puis déterminera votre paiement <b>selon votre choix pour cette ligne</b>.`,
        incentivesMPL2: `Avant chaque tour une somme d'argent vous est remise. Vous l'obtenez si le lot est sélectionné pour le bonus. Elle est indiquée en <span style='color:green'>vert</span> en haut de chaque tableau.`,
        timeLimit: "Vous aurez {mplTimeLimit} secondes pour faire vos choix à chaque tableau (même sans cliquer sur le bouton Suivant ils seront pris en compte). Cependant si vous êtes sélectionné·e mais qu'au tour choisi au hasard vous n'avez pas fait de choix dans le temps imparti, vous n'obtiendrez pas de bonus.",
        incentivesMPL3: `Faites donc chaque choix comme si c'était celui qui allait être payé !`,
        priority: "Retenez les chiffres même pendant la tâche des choix, le bonus du jeu des chiffres est en moyenne supérieur à celui de la tâche des choix !",
        clickNext: "Cliquez sur <strong>Suivant</strong> pour effectuer un exemple final."
    },
    introductionFinalExampleSpanMPL:{
        title: "Exemple final avant de commencer la troisième partie.",
        noTimeLimit: "Pour cet exemple, il n'y a pas de limite de temps.",
        description: "Cliquer sur <b>Suivant</b> pour faire un exemple complet d'un tour de la Partie 3.",
    },
    feedbackExampleSpanMPL: {
        title: "Exemple de paiement type.",
        description: "Voici comment vous seriez payé·e si ce tour était un <span style='color: #D4AF37'><b>💰 Super Tour 💰</b></span> et avait été sélectionné pour le bonus :",
        paymentSpan: "Pour le <b>jeu des chiffres</b>, {thePresentedDigitWas} {correctSpan}. Vous avez restitué {theDigit} {answerSpan}. Votre précision est de {precision}%. Votre bonus est de <b>{bonusSpan}€ x {precision}% = {paymentSpan}€</b>.",
        paymentMPL: "Pour la <b>tâche des choix</b>, la ligne (version) du tableau sélectionnée au hasard est la ligne {selectedRow}. Pour cette ligne vous avez choisi le {chosenLot}. Après calcul, le paiement pour la tâche des choix s’élèverait à <b>{paymentMPL}€</b>: <span style='color:green'>5€ (la somme initiale)</span> plus le montant déterminé selon votre choix et la règle de paiement à la ligne {selectedRow}.",
        youSelected: "La ligne (version) du tableau sélectionnée au hasard est la ligne {selectedRow}. Pour cette ligne vous avez choisi le {chosenLot}. ",
        rightChoiceWas : "Il <b>fallait choisir le {rightLot}</b> car il rapportait plus d'argent à cette ligne. ",
        yourPayment: "Après calcul, le paiement pour la tâche des choix s’élèverait à <b>{paymentMPL}€</b>: <span style='color:green'>5€ (la somme initiale)</span> plus le montant déterminé selon votre choix à la ligne {selectedRow}.",
        remind: "À retenir: <b>en moyenne seulement une personne sur {propSelecForMPL}</b> est sélectionnée pour qu'un de ses choix à la tâche des choix soit payé. Au contraire vous êtes <b>sûr·e d'être sélectionné·e</b> pour le bonus du jeu des chiffres ! Correctement <b>restituer les chiffres est donc le plus important</b> pour maximiser votre gain total.",
        instructionReminder: 'Vous aurez la possibilité d\'afficher de nouveau les instructions pendant la troisième partie, en cliquant sur le bouton "Afficher les instructions".',
        clickNext: "Quand vous êtes prêt·e, cliquez sur <strong>Suivant</strong> pour commencer la tâche des choix."
    },
    button: {
        next: "Suivant",
        previous: "Précédent",
        finish: "Terminer l'expérience",
        close: "Fermer",
        help: "Afficher les instructions"
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
    changeRules: {
        title: "Changement de règles",
        paymentRuleChange: "Attention, la règle de paiement change !",
        paymentRuleChange2: "À partir de maintenant, la règle de paiement pour la tâche des choix va changer. Si l'ordinateur choisit un tour dans les tours suivants, il <b>vous paiera avec la nouvelle règle</b>, qui va vous être présentée.",
        pressKey: "Appuyez sur n'importe quelle touche pour découvrir la nouvelle règle de paiement."
    },
    changeTreatment: {
        title: "Changement de règles",
        treatmentMirr: "À partir de maintenant, vous devez <b>choisir les lots que vous préférez</b>.",
        treatmentIneq: "À partir de maintenant, vous devez <b>choisir les lots qui rapportent le plus</b>.",
        pressKey: "Appuyez sur n'importe quelle touche pour découvrir voir les nouvelles règles."
    },
    rulesWillChange:{
        attention: "Attention, ces règles vont changer au milieu de l'expérience !",
        clear: "Cela vous sera indiqué clairement. Prêtez attention aux instructions.",
    },
    comprehensionIntro: "Avant de commencer l’expérience, vous devez répondre correctement à quelques questions de compréhension.",
    loopAgain: {
        failed: "Vous avez répondu incorrectement à une des questions.",
        viewInstructions: "Vous allez revoir les instructions.",
        surveyAgain: "Puis vous allez de nouveau répondre aux questions.",
        press: "Appuyez sur <strong>Suivant</strong> pour continuer !",
    },      
    loopAgainSpanMpl: {
        failed: "Une ou plusieurs réponses sont incorrectes ou n’ont pas été sélectionnées correctement.",
        yourRAreIncorrectPlural: "de vos réponses sont incorrectes",
        yourRAreIncorrectSingular: "de vos réponses est incorrecte",
        missCorrectAnswerPlural: "Il vous manque {missedCorrectCount} bonnes réponses.",
        missCorrectAnswerSingular: "Il vous manque {missedCorrectCount} bonne réponse.",
        surveyAgain: "Vous allez de nouveau répondre aux questions.",
        maximumRepetition: "Ce sera votre tentative {trialQCount} sur {maxQTrials}.",
        readInstructions: "Vous êtes invité·e à lire les instructions si vous avez un doute pour répondre aux questions.",
        clickNext: "Appuyez sur <strong>Suivant</strong> pour répondre de nouveau !",
    },
    loopAgainSpanMplTraining: {
        title: "Une ou plusieurs de vos réponses sont incorrectes.",
        surveyAgain: "Vous allez de nouveau répondre aux questions, des indications vous seront fournies.",
        readInstructions: "Vous êtes invité·e à lire les instructions si vous avez un doute pour répondre aux questions.",
        clickNext: "Appuyez sur <strong>Suivant</strong> pour répondre de nouveau !",
    },
    continueToComprehensionQuestions: {
        title: "Toutes vos réponses sont correctes !",
        clickNext: "Appuyez sur <strong>Suivant</strong> pour répondre aux vraies questions de compréhension !",
    },
    demographics: {
        preamble: "<strong>Données démographiques</strong>",
        questions: [
            "Quel âge avez-vous ?",
            "Quel est votre genre ?",
            "Quel est votre niveau d'études: (si vous êtes étudiant·e, choisissez le diplôme en cours) ?",
            "Quelle est votre situation professionnelle ?",
            "Quelle est la fourchette de votre revenu mensuel ?",
            "Si vous avez eu ou si vous avez actuellement un parcours académique post-bac, la matière principale est-elle liée aux sciences, technologies, mathématiques, à l'ingénierie ou l'économie ?",
            "Avez-vous suivi des cours universitaires (post-bac) en mathématiques, statistiques, probabilités ?",
            "Globalement, à quel point êtes-vous satisfait·e de votre vie de tous les jours ?"
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
            makeChoice: `Veuillez <span style="background-color: rgba(239, 243, 4, 1)">choisir</span> quel lot vous <b>vous préférez</b> (<span style="color: red">A</span> ou <span style="color: blue">B</span>) pour chaque ligne (chaque \"version\") du tableau ci-dessous. Vous pouvez ensuite cliquer sur 'Suivant'.`,
            makeChoiceIncentives: `Veuillez <span style="background-color: rgba(239, 243, 4, 1)">choisir</span> le lot qui <b>rapporte le plus d'argent</b> (<span style="color: red">A</span> ou <span style="color: blue">B</span>) pour chaque ligne (chaque \"version\") du tableau ci-dessous. Vous pouvez ensuite cliquer sur 'Suivant'.`,
            computerChooses: 'Si ce tour est choisi pour le paiement, l\'ordinateur choisira une ligne (\"version\") au hasard et utilisera votre <span style="background-color:  rgba(239, 243, 4, 1)">choix</span> (<span  style="color: red">lot A</span> ou <span style="color: blue"> lot B</span>) à cette ligne pour déterminer votre paiement.',
            trainingTitle: "Entraînement à choisir les lots",
            explanation1: "<b>Choisissez</b> le <span style=\"color: red\">lot A</span> pour les lignes (\"versions\") 1 à 6 et le <span style=\"color: blue\">lot B</span> pour les lignes (\"versions\") 7 à 18.",
            explanation2: "<b>Choisissez</b> le <span style=\"color: blue\">lot B</span> pour les lignes (\"versions\") 1 à 8 et le <span style=\"color: red\">lot A</span> pour les lignes (\"versions\") 9 à 18.",
            trainingClickNext: "Quand vous l'avez fait, cliquez sur <strong>Suivant</strong> pour continuer."
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
            G90: `Vous serez payé·e 5€ plus la somme divisée par 100 (la moyenne) de l'argent de toutes les boîtes du lot que vous avez choisi pour cette ligne.`,
            G75: `Vous serez payé·e 5€ plus la somme divisée par 100 (la moyenne) de l'argent de toutes les boîtes du lot que vous avez choisi pour cette ligne.`,
            G50: `Vous serez payé·e 5€ plus la somme divisée par 100 (la moyenne) de l'argent de toutes les boîtes du lot que vous avez choisi pour cette ligne.`,
            G25: `Vous serez payé·e 5€ plus la somme divisée par 100 (la moyenne) de l'argent de toutes les boîtes du lot que vous avez choisi pour cette ligne.`,
            G10: `Vous serez payé·e 5€ plus la somme divisée par 100 (la moyenne) de l'argent de toutes les boîtes du lot que vous avez choisi pour cette ligne.`,
            L90: `Vous serez payé·e 30€ plus la somme divisée par 100 (la moyenne) de l'argent de toutes les boîtes du lot que vous avez choisi pour cette ligne.`,
            L75: `Vous serez payé·e 30€ plus la somme divisée par 100 (la moyenne) de l'argent de toutes les boîtes du lot que vous avez choisi pour cette ligne.`,
            L50: `Vous serez payé·e 30€ plus la somme divisée par 100 (la moyenne) de l'argent de toutes les boîtes du lot que vous avez choisi pour cette ligne.`,
            L25: `Vous serez payé·e 30€ plus la somme divisée par 100 (la moyenne) de l'argent de toutes les boîtes du lot que vous avez choisi pour cette ligne.`,
            L10: `Vous serez payé·e 30€ plus la somme divisée par 100 (la moyenne) de l'argent de toutes les boîtes du lot que vous avez choisi pour cette ligne.`,
            A10: `Vous serez payé·e 15€ plus la somme divisée par 100 (la moyenne) de l'argent de toutes les boîtes du lot que vous avez choisi pour cette ligne.`,
            A15: `Vous serez payé·e 20€ plus la somme divisée par 100 (la moyenne) de l'argent de toutes les boîtes du lot que vous avez choisi pour cette ligne.`,
        },
        mirrorNotIncentivized : {
            G90: `Un lot rapporte 5€ plus la somme divisée par 100 (la moyenne) de l'argent de toutes les boîtes qu'il contient.`,
            G75: `Un lot rapporte 5€ plus la somme divisée par 100 (la moyenne) de l'argent de toutes les boîtes qu'il contient.`,
            G50: `Un lot rapporte 5€ plus la somme divisée par 100 (la moyenne) de l'argent de toutes les boîtes qu'il contient.`,
            G25: `Un lot rapporte 5€ plus la somme divisée par 100 (la moyenne) de l'argent de toutes les boîtes qu'il contient.`,
            G10: `Un lot rapporte 5€ plus la somme divisée par 100 (la moyenne) de l'argent de toutes les boîtes qu'il contient.`,
            L90: `Un lot rapporte 30€ plus la somme divisée par 100 (la moyenne) de l'argent de toutes les boîtes qu'il contient.`,
            L75: `Un lot rapporte 30€ plus la somme divisée par 100 (la moyenne) de l'argent de toutes les boîtes qu'il contient.`,
            L50: `Un lot rapporte 30€ plus la somme divisée par 100 (la moyenne) de l'argent de toutes les boîtes qu'il contient.`,
            L25: `Un lot rapporte 30€ plus la somme divisée par 100 (la moyenne) de l'argent de toutes les boîtes qu'il contient.`,
            L10: `Un lot rapporte 30€ plus la somme divisée par 100 (la moyenne) de l'argent de toutes les boîtes qu'il contient.`,
            A10: `Un lot rapporte 15€ plus la somme divisée par 100 (la moyenne) de l'argent de toutes les boîtes qu'il contient.`,
            A15: `Un lot rapporte 20€ plus la somme divisée par 100 (la moyenne) de l'argent de toutes les boîtes qu'il contient.`,
        }
    },
    incentiveBadge: {
     super: "💰 Super Tour 💰",
     classic : "Tour Classique"
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
        trialOutOf: "Tour {current} sur {total}", //<span style='color: #D4AF37'>
        incentivizedRound : `Le tour qui vient est un <b>💰 Super Tour 💰</b> ! Il peut être sélectionné pour le  <b>paiement</b> !`,
        notIncentivizedRound : `Le tour qui vient est un <span style='color: #275293df'><b>Tour classique</b></span>. Il ne peut pas être sélectionné pour le paiement.`,
    },
    response_grid_instructions: "<p>Tapez ci-dessous les chiffres dans l'ordre où vous les avez vus, puis appuyez sur Entrée.</p>",
    debrief_incentives_span_mpl: {
        title: "Fin de l'expérience",
        thanks: "Merci d'avoir participé à cette expérience !",
        calibrationPayment: "Votre bonus pour la première partie de l'expérience est de {trainingBonus}€.",
        spanSpanPayment_hard: "Votre bonus pour la deuxième partie de l'expérience est de {spanSpanBonus}€.",
        selectedForMPL: "Vous avez été sélectionné·e pour qu'un de vos choix à la tâche de prise de décision soit payé.",
        notSelectedForMPL: "Vous n'avez pas été sélectionné·e pour qu'un de vos choix à la tâche de prise de décision soit payé.",
        bonusSpanMPL: "Votre bonus pour la troisième partie de l'expérience est de {spanMplBonus}€. La décomposition est de {spanMPL}€ pour le jeu des chiffres et de {mplBonus}€ pour le choix de la tâche des choix.",
        bonusSpanWithoutMPL: "Votre bonus pour la troisième partie de l'expérience est de {spanMplBonus}€.",
        bonusMPLIncentives: "Votre bonus pour la tâche de choix est de {mplIncentivesBonus}€.",
        bonusArithmetic: "Votre bonus pour la quatrièmep artie (calcul mental) est de {arithmeticBonus}€.",
        totalBonus: "Votre bonus total est donc de {totalBonus}€ et votre paiement total est de {totalPayment}€.",
        thanksAgain: "Merci encore pour votre participation ! <b>Appuyez sur Entrée pour recevoir votre paiement !</b>",
    },
    responseGrid: {
        currentAnswer: "Réponse actuelle",
        clear: "Effacer",
    },
    slidersMotiv : {
        titleInstructions: "Instructions pour la Partie 4.",
        severalBars :"Dans cette partie, vous verrez plusieurs barres avec un curseur pour chacune d'elles.",
        objCenter:"Pour chaque barre, votre objectif est de placer le curseur le plus près possible du centre de la barre en le déplaçant avec la souris.",
        bonus: "Calcul du bonus pour la Partie 4 :",
        randomBar : "A la fin de la partie, une barre sera tirée au hasard.",
        maxBonus : "Si votre curseur pour cette barre est exactement au <b>centre</b>, vous gagnez <b>0,50€</b>.",
        linear :"Plus votre curseur est éloigné du centre, moins vous gagnez (de façon linéaire avec la distance au centre).",
        example :"Par exemple, si pour la barre choisie votre curseur est au milieu entre le centre et une extrémité, vous gagnez <b>0,25€</b>.",
        train :"Ci-dessous, vous pouvez vous entraîner à déplacer les curseurs.",
        remember: "Rappel : quand vous appuirez sur <b>Suivant</b> (en bas de page), une barre sera sélectionnée au hasard pour votre bonus. Vous gagnerez <b>0,50€</b> si votre curseur pour cette barre est exactement au <b>centre</b>, et moins si votre curseur est plus éloigné du centre (<b>0€ aux extremités</b>).",
        clickNextInstructions :"Cliquez sur <b>Suivant</b> pour commencer la Partie 4 !",
    },
    arithInstr : {
        titleInstructions: "Instructions pour la Partie 4.",
        severalAdditions :"Dans cette partie, votre but est d'effectuer correctement un <b>maximum d'additions</b> en 1 minute.",
        nRounds : "Il y aura 4 tours de 1 minute.",
        bonus: "Bonus pour la Partie 4 :",
        randomRound : "Vous serez payé {paymentPerAddition}€ pour chaque addition correcte, pour un tour sélectionné au hasard.",
        example :"Par exemple, si au tour choisi vous avez effectué 3 additions correctement, vous gagnerez 3 x {paymentPerAddition}€ = <b>{exemplePayment}€</b>.",
        clickNextInstructions :"Cliquez sur <b>Suivant</b> pour commencer la Partie 4 !",
    },
    choicesBefore: "Ce sont les choix que vous avez faits avant que la règle de paiement n'ait changé.",
    choicesAfter: "Ce sont les choix que vous avez faits après que la règle de paiement ait changé.",
    sliderTitle: "Questions finales sur vos choix",
    sliderTitleIncentives: "Questions sur vos choix.",
    sliderTitleIncentives_ineq: "Questions sur vos choix quand il fallait choisir les options qui <span style='color: red'><b>rapportaient le plus</b></span>.",
    sliderTitleIncentives_mirr: "Questions sur vos choix quand il fallait choisir les options qui vous <span style='color: red'><b>plaisaient le plus</b></span>.",
    sliderMirror: `Les questions ci-dessous concernent vos choix dans la tâches de prise de décision, quand la règle de paiement était <b>"la moyenne des boîtes"</b>. {order}`,
    sliderLottery: `Les questions ci-dessous concernent vos choix dans les tâches de prise de décision, quand la règle de paiement était <b>"une boîte au hasard"</b>. {order}`,
    sliderMirrorIncentives: `Dernières questions.`,
    cogUncertainty: {
        questionIneq: "À quel point êtes-vous certain·e que les lots que vous avez choisis sont ceux qui rapportent le plus (à chaque ligne)?",
        questionMirr: "À quel point êtes-vous certain·e que les lots que vous avez choisis sont vos lots préférés (à chaque ligne) ?",
        veryUncertain: "0% (Je ne sais pas)",
        veryCertain: "100% (Je suis certain·e)",
    },
    sliderHonest: "Vos réponses aux questions suivantes sont anonymes et ne sont pas liées à votre paiement. Veuillez répondre honnêtement.",
    sliderCognitiveUncertainty:{
        question: "Quelle est la probabilité selon vous (en %) que vos réponses aient maximisé vos bonus pour toutes les lignes de chaque tableau de la tâche des choix?",
        questionIncentives: "Quelle est la probabilité selon vous (en %) que vos réponses aient maximisé vos bonus pour toutes les lignes à chaque tour ?",
        veryUncertain: "0% (bonus non maximisé)",
        veryCertain: "100% (bonus maximisé)",
    },
    sliderAttentionToIncentives:{
        questionIncentivesClassic: "Avez-vous prêté attention aux <span style='color: #275293df'><b>Tours Classiques</b></span> ?",
        questionIncentivesSuper: "Avez-vous prêté attention aux <span style='color: #D4AF37'><b>💰 Super Tours 💰</b></span> ?",
        veryUncertain: "0% (aucune attention)",
        veryCertain: "100% (attention maximale)",
    },
    sliderCognitiveUncertainty:{
        question: "Quelle est la probabilité selon vous (en %) que vos réponses aient maximisé vos bonus pour toutes les lignes de chaque tableau de la tâche des choix?",
        questionIncentives: "Quelle est la probabilité selon vous (en %) que vos réponses aient maximisé vos bonus pour toutes les lignes à chaque tour ?",
        veryUncertain: "0% (bonus non maximisé)",
        veryCertain: "100% (bonus maximisé)",
    },
    sliderInattention:{
        questionBoxes: "Avez-vous prêté attention au nombre de boîtes dans chaque lot dans les tableaux de la tâche des choix?",
        questionPayoffs: "Avez-vous prêté attention aux montants des boîtes dans chaque lot dans les tableaux de la tâche des choix?",
        questionBoxesIncentives: "Avez-vous prêté attention au nombre de boîtes des lots ?",
        questionPayoffsIncentives: "Avez-vous prêté attention à la quantité d'argent dans les boîtes des lots?",
        veryUncertain: "0% (aucune attention)",
        veryCertain: "100% (attention maximale)",
    },
    sliderImprecision:{
        question: "Avez-vous plutôt deviné les réponses ou plutôt pris des décisions précises?",
        veryUncertain: "Je devinais",
        veryCertain: "Je prenais des décisions précises",
    },
    sliderArithmeticTest: {
        instructionTitle: "Instructions pour les dernières questions.",
        title : "Questions",
        subtitle: "Vous allez répondre à cinq questions. Pour chaque question vous devez faire un calcul et écrire votre réponse.",
        bonus : "Votre bonus est de <b>{bonusArithmetic}€</b> maximum.",
        bePrecise: "À la fin de l'expérience un des calculs sera sélectionné au hasard. Votre bonus dépendra de votre précision à ce calcul, soyez donc le plus précis possible !",
        morePrecisely : "Cliquez sur ici si vous voulez plus de précisions sur le calcul du bonus pour cette partie.",
        morePreciseDistance : "La distance à la bonne réponse est calculée comme suit (où la fonction valeur absolue est notée | |) :",
        formula : "distance = |votre réponse - bonne réponse| / 25. ",
        morePrecisionBonus : `Si la distance est comprise entre 0 et 1 inclus, votre bonus est ensuite calculé de la manière suivante : bonus = {bonusArithmetic}€ x (1 - distance).
        Sinon votre bonus est de 0€.<br>
        Par exemple, si la bonne réponse est 20 et que votre réponse est 15, votre distance est de 0.2 et votre bonus de {bonusArithmetic}€ x (1 - 0.2) = {exampleBonusArithmetic}€.`,
        paymentSentenceFr: "Votre paiement pour les questions est de {y} €.",
        question: "Combien font ( {x}/100 ) x 25 ; c'est à dire {x}% de 25 ?"
    },
    timerText: "Temps restant: ",
    feedback: {
        correct: "Correct!",
        incorrect: "Incorrect",
        noResponse: "Vous n'avez pas répondu!",
        accuracy: "Vous avez répondu correctement à ",
        accuracy2: "% des essais.",
        rt: "Votre temps de réponse moyen était de ",
        rt2: " ms."
    },
    feedbackArithmetic: {
        yourAnswer: "Votre réponse: ",
        correctAnswer: "La réponse correcte était: "
    },
    arithmeticTrial:{
        enterNumbers: "Tapez la somme des chiffres puis appuyez sur Entrée.",
    },
    arithmeticPresentationRound: {
        round : "Tour {n}.",
        incentivizedRound : `Attention ! Le tour qui vient est un "Super tour". Ce tour a <b>deux fois plus de chances</b> d'être sélectionné pour le paiement que les "Tours classiques"!`,
        notIncentivizedRound : `Le tour qui vient est un "Tour Classique". Il a une chance normale d'être sélectionné pour le paiement.`,
        pressEnter : "Appuyez sur Entrée pour commencer le tour."
    }

};

let language = fr;