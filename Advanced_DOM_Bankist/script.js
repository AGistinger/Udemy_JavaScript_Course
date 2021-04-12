"use strict";

/////////////////////////////////////////////////////////////////
// Elements
/////////////////////////////////////////////////////////////////
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

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
// Page Navigation
/////////////////////////////////////////////////////////////////
// Header Page Navigation (Inefficient way)
// document.querySelectorAll(".nav__link").forEach(function (el) {
//   el.addEventListener("click", function (e) {
//     e.preventDefault();
//     const id = this.getAttribute("href");
//     document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//   });
// });

// (Efficient way)
// 1. Add event listener to common parent element
// 2. Determine what element originated the event
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  // Matching strategy
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

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

// Button Scrolling
btnScrollTo.addEventListener("click", function (e) {
  const s1coords = section1.getBoundingClientRect();

  // Scrolling
  // window.scrollTo(
  //   // Takes the current position + the current scroll
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // Smooth scrolling takes an object with properties
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: "smooth",
  // });

  // Modern way (modern browsers only)
  section1.scrollIntoView({ behavior: "smooth" });
});

/////////////////////////////////////////////////////////////////
// Lectures
/////////////////////////////////////////////////////////////////
///////////////////// Selecting Creating and Deleting Elements /////////////////
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

///////////////////// Styles, Attributes and Classes /////////////////
console.log("--------- Styles, Attributes and Classes -----------");

// Styles
message.style.backgroundColor = "#37383d";
message.style.width = "120%";

console.log(message.style.height); // won't read anything
console.log(message.style.backgroundColor); // Will only read inline styles that are set in JS

console.log(getComputedStyle(message).color); // shows CSS properties

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + "px";

// document.documentElement.style.setProperty("--color-primary", "orangered");

// Attributes
const logo = document.querySelector(".nav__logo");
console.log(logo.alt);
console.log(logo.source); // absolute
console.log(logo.getAttribute("src")); // relative
console.log(logo.className);

logo.alt = "Beautiful minimalist logo";

// Non-Standard
// console.log(logo.designer); // undefined
// console.log(logo.getAttribute("designer"));
logo.setAttribute("company", "Bankist");
const link = document.querySelector(".nav__link--btn");
console.log(link.href);
console.log(link.getAttribute("href"));

// Data Attributes
console.log(logo.dataset.versionNumber);

// Classes
logo.classList.add("c");
logo.classList.remove("c");
logo.classList.toggle("c");
logo.classList.contains("c"); // not includes

// Don't use
// logo.className = "jonas";

///////////////////// Types of Events and Event Handlers /////////////////
console.log("--------- Type of Events and Event Handlers -----------");

// Mouse Enter
/*
fires whenever the mouse enters a certain element, works kind of like
hover in CSS.
*/
const h1 = document.querySelector("h1");
function alertH1(e) {
  alert("addEventListener: Great! You are reading the heading :D");

  h1.removeEventListener("mouseenter", alertH1); // Removed event listen after it triggers
}

h1.addEventListener("mouseenter", alertH1);

// old way
// h1.onmouseenter = function (e) {
//   alert("addEventListener: Great! You are reading the heading :D");
// };

// Removes a event listener after a certain period of time so it doesn't fire
setTimeout(() => h1.removeEventListener("mouseenter", alertH1), 3000);

///////////////////// Event Propagation: Bubbling and Capturing /////////////////
console.log("--------- Event Propagation: Bubbling and Capturing -----------");
/*
Capturing phase - 
* The event is generated at the root of the DOM tree from there the capturing phase happens
the event travels all the way down from the document root to the target element.  
* As the event travels down the tree it will pass through every single parent element of
the target element (no siblings).

Target Phase - 
* Events can be handled at the target, (event listeners)

Bubbling Phase - 
* The event bubbles up from the target to the document root and the even passes through
all the parent elements (no siblings)
* The event happened in each of the parent elements
* If the same event listener is attached to the section element will handle the same event

*/

// // Random color rgb(255, 255, 255)
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

// // One click will activate all of these elements
// document.querySelector(".nav__link").addEventListener("click", function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log("LINK", e.target, e.currentTarget);
//   console.log(e.currentTarget === this); // These are the same in an event handler

//   // Stop propagation
//   // e.stopPropagation(); // Will not trigger parent elements
// });

// document.querySelector(".nav__links").addEventListener("click", function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log("CONTAINER", e.target, e.currentTarget);
// });

// // If a 3rd arg is added to an event listener (true/false) and set to True the event listener will
// // change to only listen to capturing events instead of bubbling events
// document.querySelector(".nav").addEventListener(
//   "click",
//   function (e) {
//     this.style.backgroundColor = randomColor();
//     console.log("NAV", e.target, e.currentTarget);
//   },
//   true
// );

///////////////////// DOM Traversing /////////////////
console.log("--------- DOM Traversing -----------");
/*
- Calling querySelectorAll() on an element will return all child elements of the selected element
- Other elements that have the same name but are not children of the selected element will not be
selected.

- Closest is the opposite of querySelector:
  - querySelector finds children no matter how deep in the DOM tree
  - closest finds parents no matter how high up in the DOM tree

- In JavaScript you can only access directi siblings so the previous or the next one
- 
*/
// Going downwards: child
console.log(h1.querySelectorAll(".highlight"));
console.log(h1.childNodes); // shows all direct children elements
console.log(h1.children); // gives HTML collection (live) for direct children
h1.firstElementChild.style.color = "white";
h1.lastElementChild.style.color = "grey";

// Going upwards: parents
console.log(h1.parentNode);
console.log(h1.parentElement);
// h1.closest(".header").style.background = "var(--gradient-secondary)";
// h1.closest("h1").style.background = "var(--gradient-primary)";

// Going sideways: siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);
console.log(h1.previousSibling);
console.log(h1.nextSibling);

// How to get all of the siblings
// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(function (el) {
//   if (el != h1) el.style.transform = "scale(0.5)";
// });
