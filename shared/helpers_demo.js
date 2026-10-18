// Return the HTML container for the demo
// function nbackDemoHTML(id) {
//     return `
//       <div id="${id}">
//         <div id="${id}-fixation" class="fixation">+</div>
//         <div id="${id}-stimuli">
//           <div id="${id}-grid" class="grid"></div>
//           <div id="${id}-overlay" class="overlay"></div>
//         </div>
//       </div>
//     `;
//   }
  
  function nbackDemoHTML(id) {
    return `
      <div id="${id}" class="nback-demo-container">
        <div id="${id}-fixation" class="fixation">+</div>
        <div id="${id}-stimuli">
          <div id="${id}-grid" class="grid"></div>
          <div id="${id}-overlay" class="overlay"></div>
        </div>
      </div>
    `;
  }

  // Start the demo animation inside the container
  function startNbackDemo(id, opts) {
    const grid = document.getElementById(`${id}-grid`);
    const overlay = document.getElementById(`${id}-overlay`);
    const fixation = document.getElementById(`${id}-fixation`);
    const stimuli = document.getElementById(`${id}-stimuli`);
  
    // Build grid
    const cells = [];
    for (let i = 0; i < 9; i++) {
      const c = document.createElement('div');
      c.className = 'cell';
      grid.appendChild(c);
      cells.push(c);
    }
  
    function clearDots() {
      cells.forEach(c => {
        const d = c.querySelector('.dot');
        if (d) d.remove();
      });
    }
  
    function showDot(index) {
      clearDots();
      const dot = document.createElement('div');
      dot.className = 'dot';
      cells[index].appendChild(dot);
    }
  
    // Example sequence
    const sequence = opts.sequence || [
      {pos: 0, text: '<span style="color:red;">PRESS</span> F'},
      {pos: 1, text: '<span style="color:red;">PRESS</span> F'},
      {pos: 0, text: '<span style="color:red;">PRESS</span> J'},
      {pos: 4, text: '<span style="color:red;">PRESS</span> F'},
      {pos: 0, text: '<span style="color:red;">PRESS</span> J'},
      {pos: 4, text: '<span style="color:red;">PRESS</span> J'},
      {pos: 2, text: '<span style="color:red;">PRESS</span> F'},
    ];
  
    let t = 0;
    let showingFixation = true;
  
    function step() {
        if (showingFixation) {
          fixation.style.visibility = "visible";
          stimuli.style.visibility = "hidden";
        } else {
          fixation.style.visibility = "hidden";
          stimuli.style.visibility = "visible";
      
          const s = sequence[t];
          showDot(s.pos);
          overlay.innerHTML = s.text;
          t = (t + 1) % sequence.length;
        }
        showingFixation = !showingFixation;
      }
  
    // Start
    step();
    setInterval(step, opts.stim_ms || 1500);
  }
  



//   // Return the HTML container for the demo
// function nbackDemoHTMLLetter(id) {
//     return `
//       <div id="${id}" class="nback-demo-container">
//         <div id="${id}-fixation" class="fixation">+</div>
//         <div id="${id}-stimuli" class="stimuli"></div>
//       </div>
//     `;
//   }
  
//   // Start the demo animation inside the container
//   function startNbackDemoLetter(id, opts) {
//     const fixation = document.getElementById(`${id}-fixation`);
//     const stimuli = document.getElementById(`${id}-stimuli`);
  
//     // Letter sequence (repeats forever)
//     const sequence = opts.sequence || ["B", "P", "X", "K", "H", "M", "Q", "X", "N", "T"];
  
//     let t = 0;
//     let showingFixation = true;
  
//     function step() {
//       if (showingFixation) {
//         fixation.style.visibility = "visible";
//         stimuli.style.visibility = "hidden";
//       } else {
//         fixation.style.visibility = "hidden";
//         stimuli.style.visibility = "visible";
  
//         // Show current letter
//         stimuli.textContent = sequence[t];
//         t = (t + 1) % sequence.length;
//       }
//       showingFixation = !showingFixation;
//     }
  
//     // Start animation
//     step();
//     setInterval(step, opts.stim_ms || 1000);
//   }
  



  
// Return the HTML container for the demo
// function nbackDemoHTMLLeter(id) {
//     return `
//       <div id="${id}" class="nback-demo-container">
//         <div id="${id}-fixation" class="fixation">+</div>
//         <div id="${id}-stimuli">  
//           <div id="${id}-letter" class="letter"></div>
//           <div id="${id}-overlay" class="overlay"></div>
//         </div>
//       </div>
//     `;
//   }
  // 
//   const sequence1back = opts.sequence || [
//     {letter: "A", text: '<span style="color:red;">PRESS</span> F'},
//     {letter: "O", text: '<span style="color:red;">PRESS</span> F'},
//     {letter: "O", text: '<span style="color:red;">PRESS</span> J'},
//     {letter: "U", text: '<span style="color:red;">PRESS</span> F'},
//     {letter: "U", text: '<span style="color:red;">PRESS</span> J'},
//   ];
// const sequence2Back = opts.sequence || [
//     {letter: "A", text: '<span style="color:red;">PRESS</span> F'},
//     {letter: "O", text: '<span style="color:red;">PRESS</span> F'},
//     {letter: "A", text: '<span style="color:red;">PRESS</span> J'},
//     {letter: "O", text: '<span style="color:red;">PRESS</span> J'},
//     {letter: "O", text: '<span style="color:red;">PRESS</span> F'},
//     ];
//   const sequence3Back = opts.sequence || [
//     {letter: "A", text: '<span style="color:red;">PRESS</span> J'},
//     {letter: "U", text: '<span style="color:red;">PRESS</span> F'},
//     {letter: "A", text: '<span style="color:red;">PRESS</span> F'},
//     {letter: "A", text: '<span style="color:red;">PRESS</span> J'},
//     {letter: "U", text: '<span style="color:red;">PRESS</span> J'},
//   ];
  // Start the demo animation inside the container




//   function startNbackDemoLetter(id, opts) {
//     const fixation = document.getElementById(`${id}-fixation`);
//     const stimuli = document.getElementById(`${id}-stimuli`);
//     const letterDiv = document.getElementById(`${id}-letter`);
//     const overlay = document.getElementById(`${id}-overlay`);
  
//     // Example sequence with letters and instructions
//     const sequence= opts.sequence || [
//         {letter: "A", text: '<span style="color:red;">PRESS</span> F'},
//         {letter: "O", text: '<span style="color:red;">PRESS</span> F'},
//         {letter: "O", text: '<span style="color:red;">PRESS</span> J'},
//         {letter: "U", text: '<span style="color:red;">PRESS</span> F'},
//         {letter: "U", text: '<span style="color:red;">PRESS</span> J'},
//       ];

//     let t = 0;
//     let showingFixation = true;
  
//     function step() {
//       if (showingFixation) {
//         fixation.style.visibility = "visible";
//         stimuli.style.visibility = "hidden";
//       } else {
//         fixation.style.visibility = "hidden";
//         stimuli.style.visibility = "visible";
  
//         const s = sequence[t];
//         letterDiv.textContent = s.letter;
//         overlay.innerHTML = `<span class="nback-instruction">${s.text}</span>`;
//         //overlay.innerHTML = s.text;
//         t = (t + 1) % sequence.length;
//       }
  
//         showingFixation = !showingFixation;
//       }

//     // Start animation
//     step();
//     setInterval(step, opts.stim_ms || 1000);
// }

// //Return the HTML container for the demo
// function nbackDemoHTMLLetter(id) {
//     return `
//       <div id="${id}" class="nback-demo-container">
//         <div id="${id}-fixation" class="fixation">+</div>
//         <div id="${id}-stimuli">  
//           <div id="${id}-letter" class="letter"></div>
//           <div id="${id}-overlay" class="overlay"></div>
//         </div>
//       </div>
//     `;
//   }
// function startNbackDemoLetter(id, sequence, opts = {}) {
//     const fixation = document.getElementById(`${id}-fixation`);
//     const stimuli = document.getElementById(`${id}-stimuli`);
//     const letterDiv = document.getElementById(`${id}-letter`);
//     const overlay = document.getElementById(`${id}-overlay`);

//     // Use the provided sequence or default to empty array if not provided
//     const seq = sequence || [];

//     let t = 0;
//     let showingFixation = true;

//     function step() {
//       if (showingFixation) {
//         stimuli.style.visibility = "hidden";
//         fixation.style.visibility = "visible";
//       } else {
//         fixation.style.visibility = "hidden";
//         stimuli.style.visibility = "visible";

//         // Check if sequence has elements before trying to access them
//         if (seq.length > 0) {
//           const s = seq[t % seq.length]; // Use modulo to safely loop through sequence
//           letterDiv.textContent = s.letter;
//           overlay.innerHTML = `<span class="nback-instruction">${s.text}</span>`;
//           t = (t + 1); // Increment counter (modulo is applied when accessing the array)
//         }
//       }
//       showingFixation = !showingFixation;
//     }

//     // Start animation
//     step();
//     const intervalId = setInterval(step, opts.stim_ms || 1000);

//     // Return the interval ID so it can be cleared later if needed
//     return intervalId;
// }

// // Example usage with different sequences:
// // const sequence1 = [
// //     {letter: "A", text: '<span style="color:red;">PRESS</span> F'},
// //     {letter: "O", text: '<span style="color:red;">PRESS</span> F'},
// //     {letter: "O", text: '<span style="color:red;">PRESS</span> J'},
// //     {letter: "U", text: '<span style="color:red;">PRESS</span> F'},
// //     {letter: "U", text: '<span style="color:red;">PRESS</span> J'},
// // ];

// const sequence2 = [
//     {letter: "X", text: '<span style="color:blue;">PRESS</span> F'},
//     {letter: "Y", text: '<span style="color:blue;">PRESS</span> J'},
//     {letter: "Z", text: '<span style="color:blue;">PRESS</span> F'},
// ];

// // Call the function with different sequences
// // const demo1 = startNbackDemoLetter('demo1', sequence1, {stim_ms: 1500});
// // const demo2 = startNbackDemoLetter('demo2', sequence2, {stim_ms: 2000});

// // To stop the animation later:
// // clearInterval(demo1);
// // clearInterval(demo2);
