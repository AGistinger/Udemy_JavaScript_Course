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

/*
This function will take the movements from an object and create
a new row in the webpage that will display # of the movement and the type
with the correct color along with the amount of money moved.
*/
function displayMovements(movements) {
  // Empty pre-existing container items
  // .innerHTML is similiar to textContent but includes all the html tags
  containerMovements.innerHTML = "";

  movements.forEach(function (mov, i) {
    // Determine whether the type of the movement is deposit or withdrawl
    const type = mov > 0 ? "deposit" : "withdrawal";

    // template string that contains the new html code that will construct the class name
    // and string information
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}</div>
    </div>`;

    // calls the insertAdjucentHTML on the variable for the movements class/element and
    // inserts the HTML afterbegin, which will place the new element after the beginning
    // of the parent element
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
}
displayMovements(account1.movements); // calls function

/////////////////////////////////////////////////
// Coding Challenge #1
/*
Julia and Kate are doing a study on dogs.  So each of them asked 5 dog owners
about their dog's age, and stored the data into an array (one array for each).
For now, they are just interested in knowing wether a dog is an adult or a puppy.
A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than
3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dogs ages ('dogsJulia' and 'dogsKate'),
and does the following things:

1. Julia found out that the owners of the FIRST and LAST TWO dogs actually have cats, not dogs!
So create a shallow copy of Julia's array, and remove the cat ages from that copied array
(because its a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult,
and is 5 years old") or a puppy ("Dog number 2 is still a puppy")
4. Run the function for both test datasets

Test Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
Test Data 2: Julias data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
*/

function checkDogs(arr1, arr2) {
  const fixedArr = arr1.slice(1, -2); // returns  new array without the first or last 2 elements
  const joinedArrs = fixedArr.concat(arr2); // join arrays

  joinedArrs.forEach(function (age, i) {
    if (age >= 3) {
      console.log(`Dog number ${i + 1} is an adult, and is ${age} years old`);
    } else {
      console.log(`Dog number ${i + 1} is still a puppy 🐶`);
    }
  });
}

const julArr1 = [3, 5, 2, 12, 7];
const katArr1 = [4, 1, 15, 8, 3];
const julArr2 = [9, 16, 6, 8, 3];
const katArr2 = [10, 5, 6, 1, 4];

checkDogs(julArr1, katArr1);
checkDogs(julArr2, katArr2);

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
