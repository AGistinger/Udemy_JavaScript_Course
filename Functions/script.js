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
