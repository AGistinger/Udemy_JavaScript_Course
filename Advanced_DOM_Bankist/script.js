"use strict";

/////////////////////////////////////////////////////////////////
// Elements
/////////////////////////////////////////////////////////////////
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
const nav = document.querySelector(".nav");
const header = document.querySelector(".header");

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

function handleHover(e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
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
// Tabbed Component
/////////////////////////////////////////////////////////////////
tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab"); // Will get the closest tab element

  // Guard clause
  if (!clicked) return; // will exit for null clicks

  // Remove active classes for tab and content area
  tabs.forEach(t => t.classList.remove("operations__tab--active")); // clear active tab class
  tabsContent.forEach(c => c.classList.remove("operations__content--active"));

  // Activate tab
  clicked.classList.add("operations__tab--active");

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

/////////////////////////////////////////////////////////////////
// Sticky Navigation
/////////////////////////////////////////////////////////////////
// const initialCoords = section1.getBoundingClientRect();

// Not Efficient
// window.addEventListener("scroll", function () {
//   if (window.scrollY > initialCoords.top) {
//     nav.classList.add("sticky");
//   } else {
//     nav.classList.remove("sticky");
//   }
// });

// Intersection Observer API (Efficient)
const navHeight = nav.getBoundingClientRect().height;
function stickyNav(entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`, // 90 pixels before threshold was reached (visual margin)
});
headerObserver.observe(header);

/////////////////////////////////////////////////////////////////
// Reveal Sections on Scroll
/////////////////////////////////////////////////////////////////
const allSections = document.querySelectorAll(".section");
function revealSection(entries, observer) {
  const [entry] = entries;

  if (entry.isIntersecting) {
    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target); // helps performance by stopping observer
  }
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.2,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

/////////////////////////////////////////////////////////////////
// Lazy Loading Images
/////////////////////////////////////////////////////////////////
const imgTargets = document.querySelectorAll("img[data-src]");
function loadImg(entries, observer) {
  const [entry] = entries;

  if (entry.isIntersecting) {
    // Replace placeholder image
    entry.target.src = entry.target.dataset.src;
    // Wait for image to be loaded to remove blur
    entry.target.addEventListener("load", function () {
      entry.target.classList.remove("lazy-img");
    });
    imgObserver.unobserve(entry.target);
  }
}
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px", // makes loading occur before threshold
});

imgTargets.forEach(img => imgObserver.observe(img));

/////////////////////////////////////////////////////////////////
// Slider Component
/////////////////////////////////////////////////////////////////
////////// Elements //////////////
function slider() {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length - 1;

  ///////////// Functions ////////////
  // Function to change translate values of slide
  function goToSlide(slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  }

  // Function to go to Next Slide
  function nextSlide() {
    if (curSlide === maxSlide) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  }

  // Function to go to Previous slide
  function prevSlide() {
    if (curSlide === 0) {
      curSlide = maxSlide;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  }

  // Function to create dots
  function createDots() {
    slides.forEach(function (s, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  }

  // Function to change active slide dot
  function activateDot(slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach(dot => dot.classList.remove("dots__dot--active"));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  }

  // Initialize function
  function init() {
    goToSlide(0);
    createDots();
    activateDot(curSlide);
  }
  init();

  /////////// Event Listeners /////////
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") {
      prevSlide();
    } else if (e.key === "ArrowRight") {
      nextSlide();
    }
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
}
slider();

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

// Menu Fade Animation
// Passing "argument" into a handler
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

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

const headerTest = document.querySelector(".header"); // returns first element that matches the selector
// const allSections = document.querySelectorAll(".section"); // returns a nodelist of all elements of the selector
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

///////////////////// Intersection Observer API /////////////////
console.log("--------- Intersection Observer API -----------");
/*
Create

new IntersectionObserver(function, options);

The options object needs to have:
root: target element
threashold: percentage of intersection of which the observer callback will be called, can have multiple []

The callback function has two arguments, entries and the observer object itself.

The entries argument has various properties.
*/
// function obsCallback(entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//     if (entry.isIntersecting) {
//       nav.classList.add("sticky");
//     } else {
//       nav.classList.remove("sticky");
//     }
//   });
// }

// const obsOptions = {
//   root: null, // target element
//   threshold: [0, 0.2], // percentage of intersection of which the observer callback will be called
// };
// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

///////////////////// LIfecycle DOM Events /////////////////
console.log("--------- Lifecycle DOM Events -----------");
/*
DOM content loaded (DOMContentLoaded)
- fired by the document as soon as the HTML is completely parsed
- HTML has been downloaded and converted by the DOM tree
- All scripts must be downloaded and executed
- does not wait for images and other external resources
- only HTML and JavaScript need to be loaded.

Load event (load)
- fired by the window when the HTML and images and external resources are loaded
- when complete page has finished loaded.

Before unload event (beforeunload)
- created immediately before a user is about to leave a page
- clicking the close button
- can be used to ask the user if they want to leave the page
- only use if information is going to be lost by leaving
*/

document.addEventListener("DOMContentLoaded", function (e) {
  console.log("HTML parsed and DOM tree built!", e);
});

document.addEventListener("load", function (e) {
  console.log("Page fully loaded!", e);
});

// window.addEventListener("beforeunload", function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = ""; // sends popup for user to leave the site
// });

///////////////////// Efficient Script Loading: Defer and Async /////////////////
console.log("--------- Efficient Script Loading: Defer and Async -----------");
/*
Regular way-
<script src="script.js">
* Head
 - parsing HTML
 - Fetch script (waiting)
 - Execute (waiting)
 - Finish parsing HTML
 - script is executed before the DOM is ready
* Body
 - parsing HTML
 - Fetch script
 - Execute
* Scripts are fetched and executed after the HTML is completely parsed
* Use if you need to support old browsers

Async-
<script async src="script.js">
* Head
 - parsing HTML and fetch script
 - execute (waiting)
 - finish parsing HTML
* Body
 - Don't make sense
* Scripts are fetched asynchronously and executed immediately
* Usually the DOMContentLoad event waits for all scripts to
  execute, execpt for async scripts.  So DOMContentLoaded does not wait 
  for async scripts.
* Scripts not guranteed to execute in order
* Use for 3rd-party scripts where order doesn't matter (Google Analytics)

Defer-
<script defer src="script.js">
* Head
 - parsing HTML and fetch script
 - execute is called after the HTML parsing
* Body
 - Don't make sense
* Scripts are fetched asynchronously and executed after the HTML
 is compeltely parsed.
* DOMContentLoaded event fires after defer script is executed.
* Scripts are executed in order
* This is overall the best solution
*/
