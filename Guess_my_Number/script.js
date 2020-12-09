"use strict";

///////////////////////// Guess My Number Project ////////////////////////////////////////

// Using the querySelector you pass in the name of the class/element/ID that you use in CSS
console.log(document.querySelector(".message").textContent); // reads text property

// What is DOM Manipulation?
/* 
   Stands for Document Object Model
   Allows JavaScript to access HTML elements and styles
   to manipulate them

   - The DOM methods and properties are part of the Web APIs
*/

// Selecting and Manipulating Elements
// document.querySelector(".message").textContent = "🎉 Correct Number!"; // You can edit the text of an element

// document.querySelector(".number").textContent = 13;
// document.querySelector(".score").textContent = 10;

// document.querySelector(".guess").value = 23;
// console.log(document.querySelector(".guess").value);

// Secret Number Generator
let secret_number = random_number();
// document.querySelector(".number").textContent = secret_number;

// Define a variable to update for score
let score = 20;

// Define variable for highscore
let highscore = 0;

// refactor functions
function display_message(message) {
  document.querySelector(".message").textContent = message;
}

function random_number() {
  return Math.trunc(Math.random() * 20) + 1;
}

// Handling Click Events
/*
    The event listening expects a name of the event being listed for as the 
    1st argument and a function/event handler as the 2nd
    argument within its function.  You will want to create a function
    expression that tells what the event should do.
*/
document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);
  console.log(guess, typeof guess);

  // No player input
  if (!guess) {
    display_message("⛔ No Number!");

    // When player wins
  } else if (guess === secret_number) {
    display_message("🎉 Correct Number!");
    document.querySelector(".number").textContent = secret_number;
    document.querySelector("body").style.backgroundColor = "#60b347";
    document.querySelector(".number").style.width = "30rem";

    // Define functionality for highscore
    if (score > highscore) {
      highscore = score;
      document.querySelector(".highscore").textContent = highscore;
    }

    // When guess is wrong (refactored code)
  } else if (guess !== secret_number) {
    if (score > 1) {
      score--;
      display_message(guess > secret_number ? "📈 Too High!" : "📉 Too Low!");
      document.querySelector(".score").textContent = score;
    } else {
      display_message("💥 You Lost the Game!");
      document.querySelector(".score").textContent = 0;
      document.querySelector("body").style.backgroundColor = "#8b0000";
    }
  }
});

//////////////////////////////////////////////////////////////////////////////
// Coding Challenge #1

/*
Implement a game reset functionality, so that the player can make
a new guess!  Here is how:

1. Select the element with the 'again' class and attach
a click event handler
2. In the handler function, restore intial values of the score and number 
variables
3. Restore the initial conditions of the message, number, score, and guess input field
4. Also, restore the original backgroudn color (#222) and the number width (15rem)
*/

document.querySelector(".again").addEventListener("click", function () {
  score = 20;
  secret_number = random_number();

  document.querySelector(".number").textContent = "?";
  document.querySelector(".score").textContent = score;
  display_message("Start guessing...");
  document.querySelector(".guess").value = "";

  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").style.width = "15rem";
});
