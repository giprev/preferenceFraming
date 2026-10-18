/**
 * Generates HTML with a canvas displaying angle motivation stimuli.
//  * 
//  * @param {number} angle - The angle of the black line in degrees (0-90).
//  *                         0° = horizontal, 90° = vertical.
//  * @returns {string} HTML string containing the canvas element
//  */
// function angleMotivationGenerator(angle) {
    
//     // Return HTML with canvas - drawing happens via on_load
//     const html = ;
//     //     <script>
//     //         (function() {
//     //             const canvas = document.getElementById("angle-motivation-canvas");
//     //             const ctx = canvas.getContext('2d');
//     //             const width = canvas.width;
//     //             const height = canvas.height;
                
//     //             // Clear canvas
//     //             ctx.clearRect(0, 0, width, height);
//     //             ctx.fillStyle = 'white';
//     //             ctx.fillRect(0, 0, width, height);
                
//     //             // Line dimensions (1/4 of canvas size = 150px)
//     //             const lineLength = width / 4; // 150px
//     //             const blackLineLength = width / 5; // 120px
//     //             const lineWidth = 3;
                
//     //             // Position: bottom of vertical line near left of horizontal line
//     //             // Horizontal line: centered vertically, positioned so left side is at 1/4 canvas width
//     //             const horizontalY = height / 2;
//     //             const horizontalStartX = width / 4;
//     //             const horizontalEndX = horizontalStartX + lineLength;
                
//     //             // Vertical line: bottom is near the left of horizontal line
//     //             const verticalX = horizontalStartX + 20; // Slightly offset to the right
//     //             const verticalBottomY = horizontalY - 10; // Just above horizontal line
//     //             const verticalTopY = verticalBottomY - lineLength;
                
//     //             // Draw red horizontal line
//     //             ctx.beginPath();
//     //             ctx.strokeStyle = 'red';
//     //             ctx.lineWidth = lineWidth;
//     //             ctx.moveTo(horizontalStartX, horizontalY);
//     //             ctx.lineTo(horizontalEndX, horizontalY);
//     //             ctx.stroke();
                
//     //             // Draw blue vertical line
//     //             ctx.beginPath();
//     //             ctx.strokeStyle = 'blue';
//     //             ctx.lineWidth = lineWidth;
//     //             ctx.moveTo(verticalX, verticalTopY);
//     //             ctx.lineTo(verticalX, verticalBottomY);
//     //             ctx.stroke();
                
//     //             // Black line center position:
//     //             // x = middle of horizontal line
//     //             // y = middle of vertical line
//     //             const blackCenterX = (horizontalStartX + horizontalEndX) / 2;
//     //             const blackCenterY = (verticalTopY + verticalBottomY) / 2;
                
//     //             // Convert angle to radians (0° = horizontal, 90° = vertical)
//     //             const angleRad = ${angle} * Math.PI / 180;
                
//     //             // Calculate black line endpoints
//     //             const halfLength = blackLineLength / 2;
//     //             const dx = halfLength * Math.cos(angleRad);
//     //             const dy = halfLength * Math.sin(angleRad);
                
//     //             // Draw black tilted line
//     //             ctx.beginPath();
//     //             ctx.strokeStyle = 'black';
//     //             ctx.lineWidth = lineWidth;
//     //             ctx.moveTo(blackCenterX - dx, blackCenterY + dy);
//     //             ctx.lineTo(blackCenterX + dx, blackCenterY - dy);
//     //             ctx.stroke();
//     //         })();
//     //     </script>
//     // `;
    
//     return html;
// }


function generateAnglesMotivationVariables(n) {

    const minAngle = 35;
    const maxAngle = 55;
    const referenceAngle = 45;

    const angles = Array.from({ length: n }, function() {
        let angle = Math.floor(Math.random() * (maxAngle - minAngle + 1)) + minAngle;

        // Exclude the exact reference angle from generated values.
        while (angle === referenceAngle) {
            angle = Math.floor(Math.random() * (maxAngle - minAngle + 1)) + minAngle;
        }

        return angle;
    });

    angles.sort(function(a, b) {
        const distA = Math.abs(a - referenceAngle);
        const distB = Math.abs(b - referenceAngle);

        if (distA !== distB) {
            return Math.random() < 0.5 ? distA - distB : distB - distA; // Randomize order if distances are equal
        }

        return a - b; // negative if a should come before b
    });
    console.log("Generated angles for motivation task:", angles);

    return angles;
}