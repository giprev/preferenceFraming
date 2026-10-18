// Training-specific language additions

// Add to English language object
const trainingLanguageEn = {
    overallTraining: {
        title: "Overall Training",
        description: "Now you will practice how the actual experiment works: alternating between visual and letter n-back tasks.",
        structure: "You will start with 10 letter n-back trials, then do the visual n-back task (10 trials), and finally continue with more letter n-back trials.",
        importance: "This training will help you understand the complete structure of a sub-block and how the scoring system works.",
        feedback: "At the end, you'll see feedback about your performance and how your bonus would be calculated if this were a real sub-block.",
        highlight: "Pay special attention to the first {level} letters that come immediately after the visual n-back - these are the most important for your bonus!",
        ready: "When you're ready to start the overall training, press any key."
    },
    overallTrainingFeedback: {
        title: "Training Complete - Scoring Demonstration",
        performance: "Here's how your performance would be scored if this were a real sub-block:",
        beforeVisual: "Letters before visual n-back: {accuracy}% accuracy ({correct}/{total} trials)",
        visualNback: "Visual n-back: {accuracy}% accuracy ({correct}/{total} trials)", 
        afterVisual: "Letters after visual n-back: {accuracy}% accuracy ({correct}/{total} trials)",
        keyImportance: "💡 Key insight: The first {level} letters immediately after the visual n-back are worth 50% of your bonus!",
        calculation: "Bonus calculation: €{payment} × (0.5 × {afterVisualAcc} + 0.25 × {visualAcc} + 0.25 × {letterAcc}) = €{totalBonus}",
        remember: "Remember: Always keep the last few letters in mind during the visual task!",
        continue: "Press any key to continue to the main experiment."
    }
};

// Add to French language object  
const trainingLanguageFr = {
    overallTraining: {
        title: "Entraînement Complet",
        description: "Maintenant vous allez pratiquer le fonctionnement de l'expérience réelle : alterner entre les tâches de n-back visuel et de n-back lettres.",
        structure: "Vous commencerez par 10 essais de n-back lettres, puis ferez la tâche de n-back visuel (10 essais), et enfin continuerez avec d'autres essais de n-back lettres.",
        importance: "Cet entraînement vous aidera à comprendre la structure complète d'un sous-bloc et le fonctionnement du système de notation.",
        feedback: "À la fin, vous verrez un retour sur votre performance et comment votre bonus serait calculé si c'était un vrai sous-bloc.",
        highlight: "Portez une attention particulière aux {level} premières lettres qui viennent immédiatement après le n-back visuel - elles sont les plus importantes pour votre bonus !",
        ready: "Quand vous êtes prêt à commencer l'entraînement complet, appuyez sur n'importe quelle touche."
    },
    overallTrainingFeedback: {
        title: "Entraînement Terminé - Démonstration du Système de Points",
        performance: "Voici comment votre performance serait notée si c'était un vrai sous-bloc :",
        beforeVisual: "Lettres avant le n-back visuel : {accuracy}% de précision ({correct}/{total} essais)",
        visualNback: "N-back visuel : {accuracy}% de précision ({correct}/{total} essais)",
        afterVisual: "Lettres après le n-back visuel : {accuracy}% de précision ({correct}/{total} essais)",
        keyImportance: "💡 Point clé : Les {level} premières lettres immédiatement après le n-back visuel valent 50% de votre bonus !",
        calculation: "Calcul du bonus : €{payment} × (0,5 × {afterVisualAcc} + 0,25 × {visualAcc} + 0,25 × {letterAcc}) = €{totalBonus}",
        remember: "À retenir : Gardez toujours en mémoire les dernières lettres pendant la tâche visuelle !",
        continue: "Appuyez sur n'importe quelle touche pour continuer vers l'expérience principale."
    }
};

// Extend the existing language objects
if (typeof en !== 'undefined') {
    Object.assign(en, trainingLanguageEn);
}

if (typeof fr !== 'undefined') {
    Object.assign(fr, trainingLanguageFr);
}
