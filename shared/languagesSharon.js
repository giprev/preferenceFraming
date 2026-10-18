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
    descriptionExperiment: {
        title: "Description of the experiment",
        twoGames: "You will have two different tasks to play: the visual 2-back and the letter n-back.",
        instructionsAfter: "You will receive instructions for each task after this page.",
        subBlockExplanation: "The experiment consists of 12 blocks. One block consists of a visual 2-back task and then a letter n-back task.",
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
        firstAchieved: "You achieved 80% or more accuracy in the previous practice block. If you do it again in the next block, training will end.",
        achievedClickNext: "You can now click on <strong>Next</strong> to move on to the next instructions!",
        firstAchievedClickNext: "You can now click on <strong>Next</strong> to try a new practice block.",
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
        finish: "Finish Experiment"
    },
    experimentStop: {
        title: "Practice Session Completed",
        message: "Unfortunately, you were unable to achieve the required accuracy of 80% in two consecutive practice blocks after multiple attempts.",
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
        selectedBlock: "The selected block for payment was block number ${subBlockInteger}:",
        accuracies: "Your accuracy in that block was ${percentPostVisual}% for the trials following the visual 2-back, ${percentVN}% for the visual 2-back, ${percentN}% for the classic n-back.",
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
        paymentRuleChange: "Attention, the payment rules also change!",
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
    rulesWillChange: {
        attention: "Attention, these rules will change halfway through the experiment!",
        clear: "This will be clearly indicated. Pay close attention to the instructions."
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
        performance: "Here is how your performance would be scored if it were a real block randomly selected for payment:",
        nbackLetter1Back: "Letter 1-back after visual 2-back: {accuracy}% accuracy ({correct}/{total} trials)",
        nbackLetter3Back: "Letter 3-back after visual 2-back: {accuracy}% accuracy ({correct}/{total} trials)",
        visualNback: "Visual 2-back: {accuracy}% accuracy ({correct}/{total} trials)",
        afterVisual: "{Lettres} after visual 2-back ({total} trials): {accuracy}% accuracy ({correct}/{total} trials)",
        explain1Back: "The last letter before the visual 2-back was K, and the first after was C. You had to press 'F' for C (C different from K).",
        explain2Back: "The last two letters before the visual 2-back were A then P; the first two after were P then K. You had to press 'F' for P and K (P ≠ A, K ≠ P).",
        explain3Back: "The last three letters before the visual 2-back were B then A then A; the first three after were B then A then P. You had to press 'J' for B and A and 'F' for P (P ≠ A).",
        keyImportanceHard: "💡 Key point: The first {level} letters immediately after the visual 2-back are worth 50% of your bonus!",
        keyImportanceEasy: "💡 Key point: The first letter immediately after the visual 2-back is worth 50% of your bonus!",
        calculation: "Bonus calculation: €{payment} × (0.5 × {afterVisualAcc} + 0.25 × {visualAcc} + 0.25 × {letterAcc}) = €{totalBonus}",
        rememberHard: "Remember: Keep the last {level} letters in mind during the visual 2-back!",
        rememberEasy: "Remember: Keep the last letter in mind during the visual 2-back!",
        continue: "Press any key to continue to the main experiment.",
        remindAfter3Back: {
            0: "To answer the next letter correctly, recall the letter three letters back <strong style='color:red;'>before the visual 2-back</strong>.",
            1: "To answer the next letter correctly, recall the letter two letters back <strong style='color:red;'>before the visual 2-back</strong>.",
            2: "To answer the next letter correctly, recall the last letter <strong style='color:red;'>before the visual 2-back</strong>."
        },
        remindAfter2Back: {
            0: "To answer the next letter correctly, recall the letter two letters back <strong style='color:red;'>before the visual 2-back</strong>.",
            1: "To answer the next letter correctly, recall the last letter <strong style='color:red;'>before the visual 2-back</strong>."
        },
        remindAfter1Back: "To answer the next letter correctly, recall the last letter <strong style='color:red;'>before the visual 2-back</strong>.",
        remindBeforeHard: "Remember the following letters well to answer the first trials after the visual 2-back!",
        remindBefore1Back: "Remember the following letter well to answer the first trial after the visual 2-back!"
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
        press: "Press <strong>Next</strong> to continue!"
    },
    demographics : {
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
    instructionsMPL: {
        makeChoice: "Please make your choices. Once you switch from the sure payment to the lottery (or vice versa), all later rows will be selected automatically."
    },
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
    }
}


const fr = {
    welcomePage: {
        welcome: "Bienvenue!",
        clickNext: "Cliquez sur <strong>Suivant</strong> pour continuer!"
    },
    overviewPage: {
        purpose: "Cette expérience porte sur les processus cognitifs liés à la mémoire.",
        procedure: "Elle comprend deux tâches de mémoire que vous alternerez.",
        anonimity: "Tous vos résultats resteront anonymes.",
        credits: "Cette expérience est menée par l'étudiant en master Gildas Prévost sous la supervision du professeur Dr. Bastien Blain, tous deux à l'Université Paris 1 Panthéon-Sorbonne.",
        question: "Si vous avez des questions ou des demandes, veuillez envoyer un email à gildas.prevost@etu.univ-paris1.fr.",
        withdrawal: "Vous êtes libre de quitter l'expérience à tout moment, sans aucune conséquence.",
        clickNext: "Cliquez sur <strong>Suivant</strong> pour continuer!"
    },
    descriptionExperiment: {
        title: "Description de l'expérience",
        twoGames: "Vous aurez deux tâches différentes à réaliser : le 2-back visuel et le n-back lettres.",
        instructionsAfter: "Vous recevrez les consignes pour chaque tâche après cette page.",
        subBlockExplanation: "L'expérience se compose de 12 blocs. Un bloc comprend une tâche de 2-back visuel suivie d'une tâche de n-back lettres.",
        paymentAfter: "Pour que vous compreniez comment vous serez payé, vous recevrez les explications du paiement après les consignes.",
        clickNext: "Cliquez sur <strong>Suivant</strong> pour continuer!"
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
        firstGameLetter: "Expliquons maintenantla tâche de 2-back lettres.",
        firstGameVisual: "Expliquons la tâche de 2-back visuel.",
        allGame: "Ces instructions s'appliquent à toute l'expérience."

    },
    instructions3back: {
        changeN: "Maintenant, vous allez passer à un niveau n-back lettres différent. Vous passez de la tâche de 1-back lettres au <strong>3</strong>-back lettres.",
        letter: "Dans cette tâche, des <strong>lettres</strong> apparaîtront à l'écran consécutivement.",
        yourTask1: "Votre tâche sera <strong>d'appuyer sur la touche 'J' si la lettre à l'écran est la même que celle d'il y a <strong style='color:red'>trois</strong> lettres</strong>.",
        yourTask2: "Sinon, appuyez sur la <strong>touche 'F'</strong>.",
        image: "<img src='static/images/instruction_3back_en.gif' />",
        firstGameLetter: "Expliquons maintenantla tâche de 3-back lettres."
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
        pressKey: "Si vous êtes prêt(e), appuyez sur une touche !"
    },
    end: {
        end: "Fin de la tâche.",
        thankYou: "Merci !",
    },
    button: {
        next: "Suivant",
        previous: "Précédent",
        finish: "Terminer l'expérience"
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
        remember1: "Rappelez-vous : appuyez sur la touche <strong>'J'</strong> si la lettre à l'écran est la même que la <strong style='color:red'>précédente</strong></strong>.",
        remember2: "Sinon, appuyez sur la touche <strong>'F'</strong>.",
        press: "Appuyez sur n'importe quelle touche pour continuer.",
    },
    task2back: {
        start: "La tâche commence maintenant. À partir de maintenant, vous ne recevrez plus de feedback.",
        remember1: "Rappelez-vous : appuyez sur la touche <strong>'J'</strong> si la lettre à l'écran est la même que celle d'il y a <strong style='color:red'>deux</strong> lettres.",
        remember2: "Sinon, appuyez sur la touche <strong>'F'</strong>.",
        press: "Appuyez sur n'importe quelle touche pour pour continuer.",
    },
    task3back: {
        start: "La tâche commence maintenant. À partir de maintenant, vous ne recevrez plus de feedback.",
        remember1: "Rappelez-vous : appuyez sur la touche <strong>'J'</strong> si la lettre à l'écran est la même que celle d'il y a <strong style='color:red'>trois</strong> lettres.",
        remember2: "Sinon, appuyez sur la touche <strong>'F'</strong>.",
        press: "Appuyez sur n'importe quelle touche pour pour continuer.",
    },
    parameters: {
        subject: "Numéro du Sujet :",
        session: "Numéro de Session :"
    },
    startWarning: {
        startSubject: "Vous êtes sur le point de commencer le jeu avec le <strong>Numéro de Sujet ",
        startSession: "</strong> et le <strong>Numéro de Session ",
        startButton: "Commencer la tâche !",
        goBackButton: "Modifier les paramètres"
    },
    incentives: {
        selectedBlock: "Le bloc sélectionné pour le paiement était le bloc numéro ${subBlockInteger} :",
        accuracies: "Votre précision dans ce bloc était de ${percentPostVisual}% pour ${len}essais suivant le 2-back visuel, ${percentVN}% pour le 2-back visuel, ${percentN}% pour le ${n}-back lettres.",
        visualDetails: "2-back visuel essais totaux : ${totalTrialsVN}, essais corrects : ${corTrialsVN}.",
        letterDetails: "${N}-back lettres essais totaux : ${totalTrialsN}, essais corrects : ${corTrialsN}.",
        postVisualDetails: "${N-lettres} après le 2-back visuel : ${postVisualTrials}, essais corrects : ${corPostVisualTrials}.",
        paymentExplanation: "Votre paiement est basé sur votre performance :\n- 50% sur les essais après le 2-back visuel (${accuracyPostVisual})\n- 25% sur le 2-back visuel (${accuracyVN})\n- 25% sur le n-back lettres (${accuracyN})",
        totalPayment: "Votre bonus total sera de : ${totalPayment}€",
        thankYou: "Merci de votre participation à cette expérience !",
        redirect: "",
        continue: "Appuyez sur Entrée pour continuer"
    },
    changeRules: {
        title: "Changement de règles",
        ruleTo1Back: "Attention, vous passez maintenant en 1-back lettre (le 2-back visuel reste le même)!",
        ruleTo3Back: "Attention, vous passez maintenant en 3-back lettre (le 2-back visuel reste le même)!",
        paymentRuleChange: "Attention, les règles de paiement changent aussi !",
        pressKey: "Appuyez sur n'importe quelle touche pour continuer."
    },
    paymentExplanation1Back: {
        title: "Informations sur le paiement",
        mainText: "En plus de votre paiement de base, vous pouvez gagner un bonus allant jusqu'à ${payment}€ en fonction de vos performances.",
        changeScore: `Attention ! À partir de maintenant, les 50% de votre bonus dépendront de votre résultat à la <span style="color:red;"><strong>première lettre</strong></span> après le 2-back visuel du bloc choisi pour le paiement.`,
        score: `
        <div class="payment-info">
             <div class="payment-illustration">
                <h3>Fonctionnement :</h3>
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
                <p>À la fin de l'expérience, un bloc sera sélectionné aléatoirement pour le calcul de votre bonus:</p>

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
                
                <p><strong>Exemple :</strong> Si vous obtenez :<br>
                - 100 % de précision dans l'essai après le 2-back visuel<br>
                - 50 % de précision dans le 2-back visuel<br>
                - 50 % de précision dans le 1-back de lettres<br>
                Votre bonus serait : __PAYMENT__€ × (0,5 × 1.0 + 0,25 × 0,5 + 0,25 × 0,5) = __PAYMENT__€ × 0,75</p>
                <br>
                <div class="important-note">
                    💡 À retenir : l’élément le plus important pour maximiser votre bonus est d’identifier, après chaque 2-back visuel, si la première lettre du 1-back lettres correspond à la dernière lettre que vous avez vue avant le 2-back visuel !
                </div>
                <div style="margin-top: 20px; padding: 10px; background-color: #f8f9fa; border-left: 3px solid #dee2e6; font-size: 0.85em; color: #6c757d;">
                    <strong>Note technique :</strong> Le dernier bloc ne contient que trois essais du 1-back lettres. S'il est sélectionné au hasard pour le paiement, la portion de 25% du bonus sera calculée en utilisant ces trois essais plus les dix lettres précédant le premier bloc.
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
                <h3>Fonctionnement :</h3>
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
                <p><strong>Exemple :</strong> Si vous obtenez :<br>
                - 100 % de précision dans les deux essais après le 2-back visuel<br>
                - 50 % de précision dans le 2-back visuel<br>
                - 50 % de précision dans le 2-back de lettres<br>
                Votre bonus serait : __PAYMENT__€ × (0,5 × 1.0 + 0,25 × 0,5 + 0,25 × 0,5) = __PAYMENT__€ × 0,75</p>
                <br>    
                <div class="important-note">
                    💡 À retenir : l’élément le plus important pour maximiser votre bonus est d’identifier, après chaque 2-back visuel, si les deux premières lettres du 2-back lettres correspondent respectivement aux deux dernières lettres que vous avez vues avant le 2-back visuel !
                </div>
                <div style="margin-top: 20px; padding: 10px; background-color: #f8f9fa; border-left: 3px solid #dee2e6; font-size: 0.85em; color: #6c757d;">
                    <strong>Note technique :</strong> Le dernier bloc ne contient que trois essais de 2-back lettres. S'il est sélectionné au hasard pour le paiement, la portion de 25% du bonus sera calculée en utilisant ces trois essais plus les dix lettres précédant le premier bloc.
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
                <h3>Fonctionnement :</h3>
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
                <p><strong>Exemple :</strong> Si vous obtenez :<br>
                - 100 % de précision dans les trois essais après le 2-back visuel<br>
                - 50 % de précision dans le 2-back visuel<br>
                - 50 % de précision dans le 3-back de lettres<br>
                Votre bonus serait : __PAYMENT__€ × (0,5 × 1.0 + 0,25 × 0,5 + 0,25 × 0,5) = __PAYMENT__€ × 0,75</p>

                <br>    
                <div class="important-note">
                    💡 À retenir : l’élément le plus important pour maximiser votre bonus est d’identifier, après chaque 2-back visuel, si les trois premières lettres du 3-back lettres correspondent respectivement aux trois dernières lettres que vous avez vues avant le 2-back visuel !
                </div>
                <div style="margin-top: 20px; padding: 10px; background-color: #f8f9fa; border-left: 3px solid #dee2e6; font-size: 0.85em; color: #6c757d;">
                    <strong>Note technique :</strong> Le dernier bloc ne contient que trois essais de 3-back lettres. S'il est sélectionné au hasard pour le paiement, la portion de 25% du bonus sera calculée en utilisant ces trois essais plus les dix lettres précédant le premier bloc.
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
        description1Back: "Maintenant vous allez pratiquer le fonctionnement de l'expérience réelle : alterner entre les tâches de 2-back visuel et de 1-back lettres.",
        description3Back: "Maintenant vous allez pratiquer le fonctionnement de l'expérience réelle : alterner entre les tâches de 2-back visuel et de 3-back lettres.",
        structure1Back: "Vous commencerez par 10 essais de 1-back lettres, puis ferez un bloc: une tâche de 2-back visuel, et une tâche de 1-back lettres.",
        structure3Back: "Vous commencerez par 10 essais de 3-back lettres, puis ferez un bloc: une tâche de 2-back visuel, et une tâche de 3-back lettres.",
        importance: "Cet entraînement vous aidera à comprendre la structure complète d'un bloc et le fonctionnement du système de notation.",
        feedback: "À la fin, vous verrez un retour sur votre performance et comment votre bonus serait calculé si c'était un vrai bloc.",
        highlightEasy: "Portez une attention particulière à la lettre immédiatement après le 2-back visuel - c'est la plus importante pour votre bonus !", // Pour vous aider, la lettre correspondante avant le 2-back visuel est colorée en <span style='color:#F016DF;'>rose</span>.
        highlightHard: "Portez une attention particulière aux {level} premières lettres immédiatement après le 2-back visuel - ce sont les plus importantes pour votre bonus ! ", // Pour vous aider, les lettres correspondantes avant le 2-back visuel sont colorées en <span style='color:#F016DF;'>rose</span>.
        ready: "Quand vous êtes prêt à commencer l'entraînement complet, appuyez sur n'importe quelle touche."
    },
    overallTrainingFeedback: {
        title: "Entraînement Terminé - Démonstration du système de points",
        performance: "Voici comment votre performance serait notée si c'était un vrai bloc et qu'il était sélectionné pour le paiement (au hasard) :",
        nbackLetter1Back: "1-back lettres après le 2-back visuel: {accuracy}% de précision ({correct}/{total} essais)",
        nbackLetter3Back: "3-back lettres après le 2-back visuel: {accuracy}% de précision ({correct}/{total} essais)",
        visualNback: "2-back visuel: {accuracy}% de précision ({correct}/{total} essais)",
        afterVisual: "{Lettres} après le 2-back visuel ({total} essais): {accuracy}% de précision ({correct}/{total} essais)",
        explain1Back: "La dernière lettre avant le 2-back visuel était K, et la première après était C. Vous deviez donc appuyer sur la touche 'F' lorsque vous voyiez le C après le 2-back visuel (C différent de K).",
        explain2Back: "Les deux dernières lettres avant le 2-back visuel étaient A puis P, et les deux premières après étaient P puis K. Vous deviez donc appuyer sur la touche 'F' lorsque vous voyiez le P et le K après le 2-back visuel (P différent de A et K de P).",
        explain3Back: "Les trois dernières lettres avant le 2-back visuel étaient B puis A puis A, et les trois premières après étaient B puis A puis P. Vous deviez donc appuyer sur la touche 'J' lorsque vous voyiez B et A et sur la touche 'F' lorsque vous voyiez P après le 2-back visuel (P différent de A).",
        keyImportanceHard: "💡 Point clé : Les {level} premières lettres immédiatement après le 2-back visuel valent 50% de votre bonus !",
        keyImportanceEasy: "💡 Point clé : La première lettre immédiatement après le 2-back visuel vaut 50% de votre bonus !",
        calculation: "Calcul du bonus : €{payment} × (0.5 × {afterVisualAcc} + 0.25 × {visualAcc} + 0.25 × {letterAcc}) = €{totalBonus}",
        rememberHard: "À retenir : Gardez toujours en mémoire les {level} dernières lettres pendant le 2-back visuel!",
        rememberEasy: "À retenir : Gardez toujours en mémoire la dernière lettre pendant le 2-back visuel!",
        continue: "Appuyez sur n'importe quelle touche pour continuer vers l'expérience principale.",
        remindAfter3Back: "Pour répondre correctement à la prochaine lettre, vous devez vous souvenir de la lettre trois positions en arrière, <strong style='color:red;'>avant le 2-back visuel</strong>.",
        remindAfter2Back: "Pour répondre correctement à la prochaine lettre, vous devez vous souvenir de la lettre deux positions en arrière, <strong style='color:red;'>avant le 2-back visuel</strong>.",
        remindAfter1Back: "Pour répondre correctement à la prochaine lettre, vous devez vous souvenir de la lettre une position en arrière, <strong style='color:red;'>avant le 2-back visuel</strong>.",
        remindBeforeHard: "Retenez bien les lettres suivantes pour répondre aux premiers essais après le 2-back visuel!",
        remindBefore1Back: "Retenez bien la lettre suivante pour répondre aux premiers essais après le 2-back visuel!",
        remindAfter3Back: {
            0 :"Pour répondre correctement à la prochaine lettre, vous devez vous souvenir de l'avant avant dernière lettre <strong style='color:red;'>avant le 2-back visuel</strong>.",
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
                "Je suis payé en fonction de la moyenne de ma précision sur tous les essais (100% de bonus).",
                "Je suis payé indépendamment de ma précision (100% du bonus).",
                "Je suis payé en fonction du 3-back lettres uniquement pour un bloc sélectionné au hasard parmi les 12 de l’expérience.",
                "Je suis payé en fonction de ma précision sur le 2-back visuel (25% du bonus), ma précision sur le 3-back lettres suivant (25% du bonus) et ma précision sur les trois premières lettres du 3-back lettres en particulier (50% du bonus), pour un bloc sélectionné au hasard parmi les 12 de l’expérience."
            ]
        },
        q1Easy: {
            prompt: "Veuillez sélectionner la bonne réponse:",
            options: [
                "Je suis payé en fonction de la moyenne de ma précision sur tous les essais (100% de bonus).",
                "Je suis payé indépendamment de ma précision (100% du bonus).",
                "Je suis payé en fonction du 1-back lettres uniquement pour un bloc sélectionné au hasard parmi les 12 de l’expérience.",
                "Je suis payé en fonction de ma précision sur le 2-back visuel (25% du bonus), ma précision sur le 1-back lettres suivant (25% du bonus) et ma précision sur la première lettre du 1-back lettres (50% du bonus ), pour un bloc sélectionné au hasard parmi les 12 de l’expérience."
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
        press: "Press <strong>Next</strong> to continue!"
    },
    demographics: {
        preamble: "<strong>Demographics</strong>",
        questions: [
            "How old are you?",
            "Gender:",
            "Education level: (if you are a student, please choose the degree you are currently enrolled in)",
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
        }
    },
    prolificID: "Please enter your Prolific ID:",
    redirectProlific: "You will be automatically redirected to Prolific in 3 seconds...",
    instructionsMPL: {
        makeChoice: "Please make your choices. Once you switch from the sure payment to the lottery (or vice versa), all later rows will be selected automatically."
    },
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
        A15: "Your initial endowment is 15€."
    }
}

let language = en;