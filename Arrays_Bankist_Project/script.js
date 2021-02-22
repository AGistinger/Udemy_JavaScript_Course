"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

function displayMovements(movements) {
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal"; // determine the type of movement
    // string that contains the new html code that will change forEach movement
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}</div>
    </div>`;
    containerMovements.insertAdjacentHTML("afterbegin", html); // adds new html afterbegin
  });
}
displayMovements(account1.movements);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

/*
Array Methods:
 * functions that can be called on arrays.

arr.slice(beginIndex, endIndex);
 * will return a new array, does not mutate the original array. Accepts a begin and
   and a end parameter.  You can also specify a negative begin parameter and it will
   start slicing from the end instead of the beginning of the array.

arr.splice(beginIndex, numDelete);
  * will mutate the original array.  Accepts a begin and a count parameter.
  Splice will return the spliced elements.

arr.reverse();
  * will reverse the elements of the array that it is called on.  This does mutate the 
  original array.

arr.concat(arr2);
  * Will return the concantonated arrays.  Works the same as [...arr, ...arr2], does
  not mutate the original arrays.

arr.join(charactersJoinedBy);
  * Will return a string of the joined elements plus the argument specified they are separated by.
*/
console.log("------------------- Simple Array Methods -------------------");
let arr = ["a", "b", "c", "d", "e"];

// Slice Method
console.log(arr.slice(2)); // c, d, e
console.log(arr.slice(2, 4)); // c, d
console.log(arr.slice(-2)); // a, b, c
console.log(arr.slice(-1)); // e
console.log(arr.slice(1, -2)); // b, c
console.log(arr.slice()); // creates shallow copy a, b, c, d, e

// Splice Method
// console.log(arr.splice(2)); // a, b
arr.splice(-1); // removes last element in an array
console.log(arr);

// Reverse Method
arr = ["a", "b", "c", "d", "e"];
const arr2 = ["j", "i", "h", "g", "f"];
console.log(arr2.reverse());

// Concat Method
const letters = arr.concat(arr2);
console.log(letters); // a, b, c, d, e, f, g, h, i, j

// Join Method
console.log(letters.join(" - ")); // a - b - c - d - e - f - g - h - i - j

/*
Looping Arrays : forEach
arr.forEach(function(el, it, arr) {});

Will perform the function on each element in the array.  
* To get the index of the element the forEach method has access to those.  You can access them
by specifying them as arguments in order (element, index, array).

The difference between a forEach loop and a forOf loop is that you cannot use "continue" or "break"
in the forEach loop.  ForEach will always loop over the entire array and there no way to break out 
of it.
*/
console.log(
  "\n------------------- Looping Arrays : forEach -------------------"
);

// Using for of loop
// for (const [i, movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(`Movement ${i + 1} - You depositied ${movement}`);
//   } else {
//     console.log(`Movement ${i + 1} - You withdrew ${Math.abs(movement)}`); // removes negative
//   }
// }

// Using for each loop
movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You depositied ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`); // removes negative
  }
});

/*
forEach with Maps and Sets

MAPS
map.forEach(function (value, key, map) {});
-Works similiar to forEach with array, takes 3 arguments for (value, key, map).

SETS
set.forEach(function (value, key, set) {});
-Works the same as maps except there sets do not have keys so will return the same as value.
-Because there is no key it is common to use "_" instead of key to show a skipped value.
*/
console.log(
  "\n------------------- ForEach with Maps and Sets -------------------"
);

// Map (forEach)
currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// Sets (forEach)
const currenciesUnique = new Set(["USD", "GBP", "USD", "EUR", "EUR"]);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, _, set) {
  console.log(`${value}: ${_}`);
});
