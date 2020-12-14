// diagrams.net - allows you to build diagrams for free
"use strict";

// Selecting Elements
const player0_el = document.querySelector(".player--0");
const player1_el = document.querySelector(".player--1");
const score0_el = document.querySelector("#score--0");
const score1_el = document.getElementById("score--1"); // This is faster if you have ID
const current0_el = document.getElementById("current--0");
const current1_el = document.getElementById("current--1");
const dice_el = document.querySelector(".dice");
const btn_new = document.querySelector(".btn--new");
const btn_roll = document.querySelector(".btn--roll");
const btn_hold = document.querySelector(".btn--hold");

// Starting Conditions
score0_el.textContent = 0;
score1_el.textContent = 0;
dice_el.classList.add("hidden");

// Variables
const scores = [0, 0];
let current_score = 0;
let active_player = 0;

// Rolling dice functionality
btn_roll.addEventListener("click", function () {
  // 1. Generate a random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;

  // 2. Display the dice
  dice_el.classList.remove("hidden");
  dice_el.src = `dice-${dice}.png`;
  console.log(`You rolled a ${dice}`);

  // 3. Check for rolled 1 : if true, switch to next player
  if (dice !== 1) {
    current_score += dice;
    document.getElementById(
      `current--${active_player}`
    ).textContent = current_score;
  } else {
    document.getElementById(`current--${active_player}`).textContent = 0;
    current_score = 0;
    active_player = active_player === 0 ? 1 : 0;
    player0_el.classList.toggle("player--active");
    player1_el.classList.toggle("player--active");
  }
});

// Holding Score functionality
btn_hold.addEventListener("click", function () {});
