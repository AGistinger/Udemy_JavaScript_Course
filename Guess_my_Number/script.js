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

  if (!guess) {
    document.querySelector(".message").textContent = "⛔ No Number!";
  }
});
