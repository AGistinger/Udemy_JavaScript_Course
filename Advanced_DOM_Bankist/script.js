"use strict";

/////////////////////////////////////////////////////////////////
// Modal window
/////////////////////////////////////////////////////////////////
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

/////////////////////////////////////////////////////////////////
// Functions
/////////////////////////////////////////////////////////////////
// Function to open open account modal
function openModal(e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

// Function to close open account modal
function closeModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

/////////////////////////////////////////////////////////////////
// EVENT LISTENERS
/////////////////////////////////////////////////////////////////
// Event listener for opening account modal
btnsOpenModal.forEach(btn => btn.addEventListener("click", openModal));

// Event listener to close the modal from X button
btnCloseModal.addEventListener("click", closeModal);

// Event listener to close the modal from overlay
overlay.addEventListener("click", closeModal);

// Event listner to close the modal from escape key press
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

/////////////////////////////////////////////////////////////////
// Lectures
/////////////////////////////////////////////////////////////////
console.log("--------- Selecting, Creating, and Deleting Elements -----------");

// Selecting Elements
console.log(document.documentElement); // Select the whole document
console.log(document.head); // Select the header
console.log(document.body); // Select the body

const header = document.querySelector(".header"); // returns first element that matches the selector
const allSections = document.querySelectorAll(".section"); // returns a nodelist of all elements of the selector
console.log(allSections);

document.getElementById("section--1"); // returns the element with the ID
const allButtons = document.getElementsByTagName("button"); // returns a HTMLCollection updates live
console.log(allButtons);

document.getElementsByClassName("btn"); // returns a HTMLCollection

// Creating and Inserting Elements
// .insertAdjacentHTML
// .createElement("tagName");
const message = document.createElement("div"); // Creates a div element
message.classList.add("cookie-message");
message.textContet = "We use cookies for improved functionality and analytics";
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// header.prepend(message); // adds the element as the first child of the selected element
header.append(message); // adds the element to the last chidl of the selected element
// header.append(message.cloneNode(true));
// header.before(message); // before the header element
// header.after(message); // after the header element

// Delete Elements
document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    message.remove();
    // message.parentElement.removeChild(message); // old way
  });
