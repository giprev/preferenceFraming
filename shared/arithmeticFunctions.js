function additionGenerator(arithmetic_duration) {
    var nProblems = Math.floor(arithmetic_duration / 500);
    var allDigits = [];

    for (var i = 0; i < nProblems * 4; i++) {
        allDigits.push(Math.floor(Math.random() * 9) + 1);
    }

    var arithmeticAdditions = [];
    for (var j = 0; j < nProblems; j++) {
        var chunkStart = j * 4;
        var digits = allDigits.slice(chunkStart, chunkStart + 4);
        var sum = digits.reduce(function(acc, value) { return acc + value; }, 0);
        var expr = digits.join(" + ");

        arithmeticAdditions.push({ //>&nbsp is a non-breaking space to prevent collapsing of spaces in HTML
            html: `<div style="max-width: 900px; margin: 0 auto; text-align: center;">
                        <p style="font-size: 48px; font-weight: 700; margin-bottom: 24px;">${expr}</p>
                        <p style="font-size: 22px; margin-bottom: 16px;">${language.arithmeticTrial.enterNumbers}</p>
                        <p id="arithmetic-response-echo" style="font-size: 40px; color: black; min-height: 40px;">&nbsp;</p>
                   </div>`,
            numbers: digits,
            expectedSum: sum
        });
    }

    return arithmeticAdditions;
}
