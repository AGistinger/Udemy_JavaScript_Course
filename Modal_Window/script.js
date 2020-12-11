"use strict";

/*
    Classes
    Classes hold styles that can be added and removed to modify pages/content
    In the case of this project .hiddle holds a display: none; attribute
    that hides the content the class is assigned to.
*/

// Variables for HTML classes
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btn_close_modal = document.querySelector(".close-modal");
const btns_show_modal = document.querySelectorAll(".show-modal");

// Functions for modal
function close_modal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

function open_modal() {
  modal.classList.remove("hidden"); // to remove a class
  overlay.classList.remove("hidden");
}

// To detect clicks to open the modal
for (let i = 0; i < btns_show_modal.length; i++) {
  btns_show_modal[i].addEventListener("click", open_modal);
}

// To detect clicks to close the model when the close button "X" is pressed
// You do not want to call the function in the event listener like "close_modal()"
// because that will immediately call the function instead of waiting for the click event
btn_close_modal.addEventListener("click", close_modal);

// To detect clicks outside of the modal (in the overlay) to close the modal
overlay.addEventListener("click", close_modal);

// To detect keypress events you will use a global even
// document contains a bunch of methods for all kinds of stuff
// when you add an event listener to document it listens for a event anywhere in the page
document.addEventListener("keydown", function (ev) {
  if (ev.key === "Escape" && !modal.classList.contains("hidden")) {
    // Will close the modal if Escape button is pressed & if the modal isn't already hidden
    close_modal();
  }
});
