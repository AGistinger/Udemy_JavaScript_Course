// diagrams.net - allows you to build diagrams for free
"use strict";

// Selecting Elements
const player0_el = document.querySelector(".player--0");
const player1_el = document.querySelector(".player--1");
const score0_el = document.getElementById("score--0");
const score1_el = document.getElementById("score--1"); // This is faster if you have ID
const current0_el = document.getElementById("current--0");
const current1_el = document.getElementById("current--1");
const dice_el = document.querySelector(".dice");
const btn_new = document.querySelector(".btn--new");
const btn_roll = document.querySelector(".btn--roll");
const btn_hold = document.querySelector(".btn--hold");
const close_modal_btn = document.querySelector(".close-modal"); // Why am I null?

// Variables
let scores, current_score, active_player, playing;

// Functions
function switch_player() {
  active_player = active_player === 0 ? 1 : 0;
  player0_el.classList.toggle("player--active");
  player1_el.classList.toggle("player--active");
}

function clear_score() {
  current_score = 0;
  document.getElementById(`current--${active_player}`).textContent = 0;
}

function display_scores() {
  score0_el.textContent = scores[0];
  score1_el.textContent = scores[1];
}

function hide_dice() {
  dice_el.classList.add("hidden");
}

function init() {
  // Initialize variables
  scores = [0, 0];
  current_score = 0;
  active_player = 0;
  playing = true;

  // Starting conditions
  score0_el.textContent = 0;
  score1_el.textContent = 0;
  dice_el.classList.add("hidden");

  player0_el.classList.add("player--active");
  player1_el.classList.remove("player--active");
  player0_el.classList.remove("player--winner");
  player1_el.classList.remove("player--winner");
  hide_dice();
  clear_score();
  display_scores();
}

function close_modal() {
  document.querySelector(".modal").classList.add("hidden");
  document.querySelector(".overlay").classList.add("hidden");
}

// Start Game
init();

// Pop-up for instructions functionality
close_modal_btn.addEventListener("click", close_modal);

// Rolling dice functionality
btn_roll.addEventListener("click", function () {
  if (playing) {
    // 1. Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // Display the dice
    dice_el.classList.remove("hidden");
    dice_el.src = `dice-${dice}.png`;

    // Check for rolled 1 : if true, switch to next player
    if (dice !== 1) {
      current_score += dice;
      document.getElementById(
        `current--${active_player}`
      ).textContent = current_score;
    } else {
      clear_score();
      switch_player();
    }
  }
});

// Holding Score functionality
btn_hold.addEventListener("click", function () {
  if (playing) {
    scores[active_player] += current_score;
    document.getElementById(`score--${active_player}`).textContent =
      scores[active_player];
    clear_score();

    //  If score is >= 100 finish the game
    if (scores[active_player] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${active_player}`)
        .classList.add("player--winner");

      document
        .querySelector(`.player--${active_player}`)
        .classList.remove("player--active");

      hide_dice();
    } else {
      // switch to the next player
      switch_player();
    }
  }
});

// Reset Game functionality
btn_new.addEventListener("click", init);
