"use strict";

/*
---------------------------- Default Parameters ------------------------------
- Functions where paramters are set by default, if they do not need to be changed.
- Default values can contain any expression.  
- You cannot skip arguments.  If you want to keep a argument as default you can set it as undefined.
*/
console.log("------------------ Default Parameters ---------------");

const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  //   numPassengers = numPassengers || 1; // old way to create default values (ES5)
  //   price = price || 199;

  const booking = {
    flightNum,
    numPassengers,
    price,
  };

  console.log(booking);
  bookings.push(booking);
};

createBooking("LH123"); // with default values
createBooking("LH123", 2, 800);
createBooking("LH123", 5);
createBooking("LH123", undefined, 1000); // Skipping a parameter

/*
---------------------------- Passing Aruments: Value VS. Reference ------------------------------
- In JavaScript when you pass objects into functions they act as a reference and you can modify the 
  objects values.  
- When you pass a primitive value to a function it works like a copy and is not affected by the function.
- Passing by value
- Passing by reference (JS does not have passing by reference, this works in C++), objects are sending
  a memory address by value, but the original object can still be accidently modified.
*/
console.log(
  "------------------ Passing Aruments: Value VS. Reference ---------------"
);

const flight = "LH234";
const adrianne = {
  myName: "Adrianne Gistinger",
  passport: 12345567778910,
};

function checkIn(flightNum, passenger) {
  flightNum = "LH999";
  passenger.myName = "Ms. " + passenger.myName;

  if (passenger.passport === 12345567778910) {
    // alert("Check in");
  } else {
    // alert("Wrong Passport!");
  }
}

checkIn(flight, adrianne);
console.log(flight); // will not be changed, creates a copy
console.log(adrianne); // will be changed, creates a reference

// Is the same as doing ...
const flightNum = flight;
const passenger = adrianne;

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 1000000);
};

newPassport(adrianne); // will change passport number
checkIn(flight, adrianne); // checkin won't work, wrong passport number

/*
---------------------------- First-Class & Higher-Order Functions ------------------------------
FIRST-CLASS FUNCTIONS
- JavaScript treats functions as first-class citizens
- Functions are simply values
- Functions are just another type of object
- There are function methods (methods you can call on functions)
- You can return functions from functions

HIGHER-ORDER FUNCTIONS
- A function that recived another function as an argument, that returns a new function or both.
- This is only possible because of first-class functions
*/
console.log(
  "------------------ First-Class & Higher-Order Functions ---------------"
);

/*
---------------------------- Functions Accepting Callback Functions ------------------------------
How higher-order functions work:
- You pass a function as an argument into the higher-order function and then user that function
  inside the higher-order function.
- This will allow you to pass different functions into a higher-order function and manipulate data
  without having to create different functions to do so.
- Makes it easier to make functionality into small reusable parts
- Callback functions allow us to create abstraction (hide the detail of code implementation)
- calling function.name will return the name of the function property
*/
console.log(
  "------------------ Functions Accepting Callback Functions ---------------"
);

const oneWord = function (str) {
  return str.replace(/ /g, "").toLowerCase(); // Uses regular expression instead of replaceAll
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(" ");
  return [first.toUpperCase(), ...others].join(" ");
};

// higher-order function, accepts a function as an argument
function transformer(str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);

  console.log(`Transformed by: ${fn.name}`); // Function ".name" property
}

transformer("JavaScript is the best!", upperFirstWord);
transformer("Java is the best!", oneWord);

function high5() {
  console.log("✋");
}
// JS uses callbacks all the time
document.body.addEventListener("click", high5);

["Adrainne", "Jonas", "Martha"].forEach(high5); // forEach() method

/*
---------------------------- Functions Returning Functions ------------------------------
When you are returning a function from a function, you have to store the function to a variable
and then you can call that new function using that variable name along with any arguments.

This is valuable when you are functional programming.
*/
console.log("------------------ Functions Returning Functions ---------------");

function greet(greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
}

const greeterHey = greet("Hey"); // save the returned function into a variable
greeterHey("Adrianne"); // call the function
greeterHey("Steven");

greet("Hello")("Mark"); // you can call the returned function in one step

// Challenge try to write the function above as arrow functions
const greetArrow = greeting => myName => console.log(`${greeting} ${myName}`);
const greeterArrow = greetArrow("Ciao");
greeterArrow("Alexandrea");
greetArrow("Buongiono")("Jessica");

/*
---------------------------- The Call and Apply Methods ------------------------------
You can set the "this" keyword manually.

func.call(this, args)
- Using the .call() function will allow you to manually set what you want the this keyword 
 to point to.

 func.apply(this, arr)
 - Using the .apply() function works similiar to the call functione except that instead of passing
  in the arguments after specifying the this argument, you need to pass in an array with the
  arguments.
*/
console.log("------------------ The Call and Apply Methods ---------------");

const lufthansa = {
  airline: "Lufthansa",
  iataCode: "LH",
  bookings: [],
  book(flightNum, passName) {
    console.log(
      `${passName} booked a seat on ${this.airline} flight ${this.iataCode}:${flightNum}`
    );
    this.bookings.push({
      flight: `${this.iataCode}${flightNum}`,
      passName,
    });
  },
};

lufthansa.book(239, "Adrianne Gistinger");
lufthansa.book(635, "John Smith");
console.log(lufthansa);

const eurowings = {
  airline: "Eurowings",
  iataCode: "EW",
  bookings: [],
};

const book = lufthansa.book; // store a function into a new variable. (This will no longer work)

// book(23, "Sarah Williams"); // Does not work this is now undefined and function will not work

// Call Method
book.call(eurowings, 23, "Sara Williams"); // the "this" keyword will be set to eurowings
console.log(eurowings);
book.call(lufthansa, 239, "Mary Cooper");
console.log(lufthansa);

const swiss = {
  airline: "Swiss Air Lines",
  iataCode: "LX",
  bookings: [],
};

book.call(swiss, 585, "Mary Cooper");
console.log(swiss);

// Apply Method (not modern)
const flightData = [583, "George Cooper"];
book.apply(swiss, flightData);
console.log(swiss);

book.call(swiss, ...flightData); // works like apply but with spreading the arguments

/*
---------------------------- The Bind Method ------------------------------
func.bind(this, args);
- Bind also allows you to manually set the "this" keyword for any function call.
- Bind does not immediately call the function, it returns a new function that the
 "this" keyword is bound.
- In the bind method you can also set arguments, these arguments will remain the same
  each time you call the method.
*/
console.log("------------------ The Bind Method ---------------");

const bookEW = book.bind(eurowings); // will not call the book function, will return a new function
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(23, "Steven Williams"); // looks like the more normal function call, no longer need to specify "this"

const bookEW23 = book.bind(eurowings, 23); // sets flight number to 23 and now you only need name arg
bookEW23("Jessica Smith");

// Objects with Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

document
  .querySelector(".buy")
  .addEventListener("click", lufthansa.buyPlane.bind(lufthansa));

// Partial Application (Pre set parameters)
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

// Use null to set "this" keywaord as it isn't being used, order of args is important
const addVAT = addTax.bind(null, 0.23);
console.log(addVAT(100));

// Mini-Challenge use technique of one function returning antoher function for above ex
function taxRate(rate) {
  return function (value) {
    return value + value * rate;
  };
}
const taxVAT = taxRate(0.23);
console.log(taxVAT(100));

/*
---------------------------- Coding Challenge #1 ------------------------------
Let's build a simple poll app!

A poll has a question, an array of options fromwhich people can choose, 
and an array with the number of replies for each option.  This data is stored in
the start object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer" on the 'poll' object.
The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the 
  selected option.  The prompt should look like this:
    What is your favorite programming language?
    0: JavaScript
    1: Python
    2: Rust
    3: C++
    (Write option number)

  1.2. Based on the input number, update the answers array.  For example,
  if the option is 3, increase the value AT POSITION 3 of the array by 1.  
  Make sure to checck if the input is a number and if the and if the number
  makes sense (e.g anser 52 wouldn't make sense right?)

2. Call this method whenever the user clicks the "Answer Poll" button.
3. Create a method 'displayResults' which displays the poll results.
The method takes a string as an input (called 'type'), which can be either 'string' or 'array'.
If the type is 'array', simply display the results array as it is, using console.log().  
This should be the default option.  If type is 'string' dsiplay a string like 
"Poll results are 13, 2, 4, 1".
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

Bonus: Use the 'displayResults' method to display the 2 arrays in the test data.
Use both the 'array' and the 'string' option.  Do NOT put the arrays in the poll object!
So what should this keyword look like in this situation?

Bonus Test Data 1: [5, 2, 3]
Bonus Test Data 2: [1, 5, 3, 9, 6, 1]
*/
console.log("------------------ Coding Challenge #1 ---------------");

const poll = {
  question: "What is your favorite programming language?",
  options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
  // This generates [0, 0, 0, 0], more in the next section
  answers: new Array(4).fill(0),
};

/*
A function on the 'poll' object that will display a prompt window to the user,
accepts an input.  The input will be checked if it is valid compared to the questions
array.  If the input is valid then increment the correstponding location in the options
array.  displayResults should be called each time 'registerNewAnswer' is called.
*/
poll.registerNewAnswer = function () {
  // Makes the options array a string by using join with \n in between and getting response from user
  const answer = Number(
    prompt(
      `${this.question}\n${this.options.join("\n")}\n(Write option number)`
    )
  );
  // Check if input is valid
  if (answer <= this.options.length) {
    this.answers[answer]++;
    // Display results
    this.displayResults();
    this.displayResults("string");
  } else {
    console.log(`${answer} is not a valid entry`);
  }
};

/*
Event handler for the 'Answer Poll' button that calls the 'registerNewAnswer' function.
*/
document
  .querySelector(".poll")
  .addEventListener("click", poll.registerNewAnswer.bind(poll));

/*
A function that displays the poll results that takes a string as an input 'type',
which can be either 'string' or 'array'.  
-If the type is array print the array to the console.
-If the type is string display "Poll results are 13, 2, 4, 1".
*/
poll.displayResults = function (type = "array") {
  if (type === "array") {
    console.log(this.answers);
  } else if (type === "string") {
    console.log(`Poll results are ${this.answers.join(", ")}`);
  }
};

// use displayResults on bonus data
poll.displayResults.call({ answers: [5, 2, 3] }, "array");
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, "string");

/*
---------------------------- (IIFE) Immediately Invoked Function Expressions ------------------------------
Functions that are only executed once and then never run again.

Syntax for IIFE
(function() { logic; })();
*/
console.log(
  "------------------ (IIFE) Immediately Invoked Function Expressions ---------------"
);

// Normal function
const runOnce = function () {
  console.log("This will run again");
};
runOnce();

// IIFE
(function () {
  console.log("This will never run again");
  const isPrivate = 23;
})();

// Arrow function IIFE
(() => console.log("This will ALSO never run again"))();

// Scope
{
  const isPrivate = 23;
}

/*
---------------------------- Closures ------------------------------
A closure is not a feature that you explicitly use.
A closure happens automatically in certain situations.

The closure will remember the variables as part of where it was created.

The secret of the closure:
  * Any function always has access to the variable environment of the execution context
  in which the function was created.  Even after the execution context is gone.
  * Closure: VE attached to the function, exactly as it was at the time and place of the function
  it was created.
  * A function does not lose connection to the variables at the functions birthplace.
  * Closure has priority over the scope chain.

Summary:
  * A closure is the closed-over variable environment of the execution context in which a function
  was created, even after that execution context is gone.
  * A closure gives a function access to all the variables of its parent function, even after that
  parent function has returned.  The function keeps a reference to its outer scope, which preserves
  the scope chain thoughout time.
  * A closure makes sure that a function doesn't loose connection to variables that existed at the 
  function's birth place.
  * A closure is like a backpack that a function carries around wherever it goes.  This backpack has
  all the variables that were present in the environment where the function was created.
  * We do NOT have to manually create closures, this is a JavaScript feature that happens automatically.
  We can't even access closed-over variables explicitly.  A closure is NOT a tangible JavaScript object.
*/
console.log("------------------ Closures ---------------");

function secureBooking() {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
}

const booker = secureBooking(); // will have access to passengerCount = 0

// the closure can still access variables from a function that is no longer active
booker(); // 1 passengers
booker(); // 2 passengers
booker(); // 3 passengers

console.dir(booker); // shows directory/environment

console.log("------------------ More Closures ---------------");

// Example 1
let f;
const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f(); // has access to a
console.dir(f);

// Re-assigning f function
h();
f(); // has access to b
console.dir(f);

// Example 2
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  // Timer function accepts a function and a (ms) time increment, function is run after the time entered
  setTimeout(function () {
    console.log(`We are not boarindg all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds`); // will not wait for the timer to run
};

const perGroup = 1000; // closure has priority over scopechain this variable will not be used
boardPassengers(180, 3); // the callback function (wait) will use the closure variables to execute

/*
---------------------------- Challenge #2 ------------------------------
This is more of a thinking challenge than a coding challenge.

Take the IIFE below and at the end of the function attach an event listener that
changes the color of the selected h1 element ("header") to blue, each time the
BODY element is clicked, Do NOT select the h1 element again!

And now explain to YOURSELF for someone around you WHY this worked!  Take all the
time you need.  Think about WHEN exactly the callback function is executed, and
what that means for the variables invovled in this example.
*/
console.log("------------------ Challenge #2 ---------------");

(function () {
  const header = document.querySelector("h1");
  header.style.color = "red";

  document.body.addEventListener("click", function () {
    header.style.color = header.style.color === "red" ? "blue" : "red";
  });
})();
