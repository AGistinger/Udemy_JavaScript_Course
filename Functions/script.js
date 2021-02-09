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
    alert("Check in");
  } else {
    alert("Wrong Passport!");
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

*/
console.log("------------------ Coding Challenge #1 ---------------");
