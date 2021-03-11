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

////////////////////////////// FUNCTIONS ////////////////////////////////////
/*
This function will take the movements from an object and create
a new row in the webpage that will display # of the movement and the type
with the correct color along with the amount of money moved.
*/
function displayMovements(movements, sort = false) {
  // Empty pre-existing container items
  // .innerHTML is similiar to textContent but includes all the html tags
  containerMovements.innerHTML = "";

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    // Determine whether the type of the movement is deposit or withdrawl
    const type = mov > 0 ? "deposit" : "withdrawal";

    // template string that contains the new html code that will construct the class name
    // and string information
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}€</div>
    </div>`;

    // calls the insertAdjucentHTML on the variable for the movements class/element and
    // inserts the HTML afterbegin, which will place the new element after the beginning
    // of the parent element
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
}

/*
This function creates the usernames for each account
for each account in the accounts array it takes the owner name 
makes the name lowercase, splits each word into its own array,
uses map function to take the first letter in each word into a new array,
then join the letters together to create the username.
*/
function createUserNames(accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLocaleLowerCase()
      .split(" ")
      .map(word => word[0])
      .join("");
  });
}
createUserNames(accounts);
console.log(accounts);

// Function to display the summary at the bottom of the web page for money in, out and interest.
function calcDisplaySummary(account) {
  const incomes = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = Math.abs(
    account.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0)
  );
  labelSumOut.textContent = `${out}€`;

  const interest = account.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
}

// Function to calculate the balance of the account and set the text field for balance
function calcDisplayBalance(account) {
  account.balance = account.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${account.balance} €`;
}

// Refreshes the values displayed on the screen
function refreshUI(account) {
  displayMovements(account.movements);
  calcDisplayBalance(account);
  calcDisplaySummary(account);
}

///////////////////////////////// EVENT HANLDERS ////////////////////////////
// Event handlers for logging into the webpage
let currentAccount;

btnLogin.addEventListener("click", function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  // Will only return the pin if the account exists (optional chaining)
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fileds
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur(); // clears selection of field

    // Display movements, balance and summary
    refreshUI(currentAccount);
  } else {
    labelWelcome.textContent = "Log in to get started";
    containerApp.style.opacity = 0;
  }

  console.log("LOGIN");
});

// Event handler for transfering money to another account
btnTransfer.addEventListener("click", function (e) {
  // Prevent form from submitting (stop from refreshing page)
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);

  // returns the account that matches the username the user entered as input
  const recieverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  // Clear input fileds
  inputTransferAmount.value = inputTransferTo.value = "";
  inputTransferTo.blur(); // clears selection of field

  // Check if valid amount and move money to receiver and from giver
  // Also checks that money is not sent to self and if receiver account is valid
  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    recieverAcc &&
    recieverAcc?.username !== currentAccount.username
  ) {
    recieverAcc.movements.push(amount);
    currentAccount.movements.push(-Math.abs(amount));

    refreshUI(currentAccount);
    console.log(`Tranfer of ${amount}€ to ${recieverAcc.owner} Successful!`);
  }
});

// Event handler for requesting loan
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  // Save input variable
  const loanRequest = Number(inputLoanAmount.value);

  // Clear input fields
  inputLoanAmount.value = "";
  inputLoanAmount.blur();

  // Checks if the user has at least 1 deposit with 10% of the requested loan amount
  if (
    loanRequest > 0 &&
    currentAccount.movements.some(mov => mov >= loanRequest * 0.1)
  ) {
    currentAccount.movements.push(loanRequest);
    refreshUI(currentAccount);
  } else {
    console.log("You do not meet the requirements to request this loan");
  }
});

// Event handler for closing account
btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  // Saving input variables
  const user = inputCloseUsername.value;
  const pin = Number(inputClosePin.value);

  // Clear input fields
  inputCloseUsername.value = inputClosePin.value = "";
  inputClosePin.blur();

  // Checking if current account data and input data match and then deleting account
  if (currentAccount.username === user && currentAccount.pin === pin) {
    accounts.splice(
      accounts.findIndex(acc => acc.username === user),
      1
    );

    // logs user out / clears screen
    labelWelcome.textContent = "Log in to get started";
    containerApp.style.opacity = 0;
  } else {
    console.log(`Unable to close account username and pin do not match`);
  }
});

// Event handler for sorting movements
let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted); // does the opposite
  sorted = !sorted; // changes the sorted variable to turn on and off sorting
});

///////////////////////////////////////////////////////
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
console.log("------------------- Coding Challenge #1 -------------------");
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

//////////////////////////////////////////////////////
// Coding Challenge #2
/*
Let's go back to Julia and Kate's study about dogs.
This time, they want to convert dog ages to human ages and
calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an array of dog's ages
('ages'), and does the following things in order.

1. Calculate the dog age in human years using the following formula:
if the dog is <= 2 years old, humanAge = 2 * dogAge.  If the dog is > 2 years old,
humanAge  = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old
(which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know how to 
  calculate averages)
4. Run the function for both datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]
*/
console.log("------------------- Coding Challenge #2 -------------------");
function calcAverageHumanAge(ages) {
  const humanYears = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
  const adults = humanYears.filter(age => age >= 18);
  return adults.reduce((acc, age) => (acc += age), 0) / adults.length;
}

const dogAges1 = [5, 2, 4, 1, 15, 8, 3];
const dogAges2 = [16, 6, 10, 5, 6, 1, 4];

console.log(calcAverageHumanAge(dogAges1));
console.log(calcAverageHumanAge(dogAges2));

///////////////////////////////////////////////////////
// Coding Challenge #3
/*
Rewrite the previous `calcAverageHumanAge' functon from
the previous challenge, but this time as an arrow function,
and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [15, 6, 10, 5, 6, 1, 4]
*/
console.log("------------------- Coding Challenge #3 -------------------");
const calcAvgHumanAge = ages =>
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => (acc += age / arr.length), 0);

console.log(calcAvgHumanAge(dogAges1));
console.log(calcAvgHumanAge(dogAges2));

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

/*
The Map Method
- returns a brand new array of the results of the callback function on the
original array elements.

arr.map(function(ele, i, arr) { code });

This is more efficient than the forEach method as the whole array is created at one time
instead of there being a side effect for each of the calculations one by one.
*/
console.log("\n------------------- The Map Method -------------------");

const eurToUsd = 1.1;

// The Map Method (functional programming)
const movementsUSD = movements.map(mov => mov * eurToUsd);

console.log(movements);
console.log(movementsUSD);

// For of loop
const movementsUSDfor = [];
for (const mov of movements) {
  const updatedValue = mov * eurToUsd;
  movementsUSDfor.push(updatedValue.toFixed(2));
}
console.log(movementsUSDfor);

const movementsDescriptions = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: you ${mov > 0 ? "deposited" : "withdrew"} ${Math.abs(
      mov
    )}`
);
console.log(movementsDescriptions);

/*
The Filter Method
arr.filter(function(el, i, arr) { code });
- returns an array based on the function passed in to filter out elements based 
on the function.
*/
console.log("\n------------------- The Filter Method -------------------");

// Creates an array of movements above 0
const deposits = movements.filter(function (mov) {
  return mov > 0;
});
console.log(deposits); // only gives positive values now

// Using for loop to do the same as the filter method
const depositsFor = [];
for (const mov of movements) {
  if (mov > 0) {
    depositsFor.push(mov);
  }
}
console.log(depositsFor);

// Create an array of the withdrawls
const withdrawls = movements.filter(mov => mov < 0);
console.log(withdrawls);

/*
The Reduce Method
arr.reduce(function(acc, ele, i, arr){ code }, inittialValueOfAccumulator);
- Boil down all the elements in an array to a single value.
- Returns 1 value and not an array.
- Has 4 argumenets an accumulator, the current element, the index, and the array.
- Each loop iteration returns the accumulator will be the sum of all the previous values.
  * Return the updated accumulator + the current value so it can be used in the next iteration.
*/
console.log("\n------------------- The Reduce Method -------------------");

// accumulator -> snowball
// const balance = movements.reduce(function (acc, mov, i) {
//   console.log(`Iteration ${i}: ${acc}`);
//   return acc + mov;
// }, 0);
// console.log(balance);

const balance = movements.reduce((acc, mov) => acc + mov, 0);
console.log(balance);

// Using for loop to do the above example
let balance2 = 0;
for (const mov of movements) {
  balance2 += mov;
}
console.log(balance2);

// Maxium value of movements, use first value of the array instead of 0 to avoid issues
const maxValue = movements.reduce(
  (acc, mov) => (acc < mov ? (acc = mov) : acc),
  movements[0]
);
console.log(maxValue);

/*
The Magic of Chaining Methods
You can keep chaining the array methods as long as the method returns a new array 
for the next method to use.

It is bad practice to chain methods that modify the underlying array example 
the .splice() method or .reverse() method.
*/
console.log(
  "\n------------------- The Magic of Chaining Methods -------------------"
);

// Pipeline of chaining methods
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);

console.log(totalDepositsUSD);

/*
The Find Method (finds one element)

arr.find(function(mov, i, arr) {});

- Retrieves one element of an array based on a condition.
- Will return the first element in the array that matches the condition.

*/
console.log("\n------------------- The Find Method -------------------");

const first_withdrawl = movements.find(mov => mov < 0);
console.log(first_withdrawl);

console.log(accounts);

const account = accounts.find(acc => acc.owner === "Jessica Davis");
console.log(account);

// Using  a for loop for the above code
let foundAcc = "";
for (const acc of accounts) {
  if (acc.owner === "Jessica Davis") {
    foundAcc = acc;
  } else {
    console.log("account not found...");
  }
}
console.log(foundAcc);

/*
The Find Index Method

* Returns the index of the found element and NOT the element itself
* See Close account function
*/
console.log("\n------------------- The Find Index Method -------------------");

/*
The Some and Every Methods

Some Method
arr.some(condition);
* The some method works similiar to the includes method
* The difference is the some method checks against a condition instead of checking for
  equality.
* Returns a True False boolean
* (If there is any value to which the condition is true the some method will return true)

Every Method
arr.every(condition);
* The some method works similar to the some method, except that every element
  must meet the condition to return true.
*/
console.log(
  "\n------------------- The Some and Every Methods -------------------"
);

// Includes method (tests for equality)
console.log(movements.includes(-130)); // True (is in the array)

// Some Method (condition)
const anyDeposits = movements.some(mov => mov > 5000);
console.log(anyDeposits); // False no deposit greater than 5000

// Every Method (condition)
console.log(account4.movements.every(mov => mov > 0)); // true (all movements are deposits)

// Separate callback
const deposit = mov => mov > 0;
console.log(movements.some(deposit)); // true
console.log(movements.every(deposit)); // false
console.log(movements.filter(deposit)); // returns an array with all deposits

/*
Flat and Flatmap
(Working with Nested Arrays)

Flat
arr.flat(depth);
* Return a array of all the nested arrays that have been merged together.
* The flat method only goes 1 level deep when flattening arrays
* If there are nested arrays in nested arrays  only the first level gets flattend
* This can be adjusted by changing the depth in the flat method, default is 1.

FlatMap
arr.flatMap(condition)
* Works like a map method and flat method combined
* FlatMap takes a condition and then applies the flat method at the end of it
* FlatMap only goes 1 level deep, so if you need to go more than one you will
  have to do map and flat(depth) methods separately.
*/
console.log("\n------------------- Flat and Flatmap -------------------");

//Flat
const nestArr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(nestArr.flat());

// Only first level gets flattened unless depth in the flat method is changed to 2
const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2));

// Gets all movements from all accounts
const overallBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => (acc += mov), 0);
console.log(overallBalance);

// FlatMap
const overallBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => (acc += mov), 0);
console.log(overallBalance2);

/*
Sorting Arrays
arr.sort();
arr.sort(function() {});

- Will mutate the original array
- When used with strings will sort alphabetically
- When used with numbers will NOT sort smallest to largetst, instead will convert
  the numbers to strings and then sorts alphabetically as if the numbers were strings
  * This can be fixed by adding a callback function as an argument
*/
console.log("\n------------------- Sorting Arrays -------------------");

// Strings - Sorts alphabetically (Mutates original array)
const owners = ["Jonas", "Zach", "Adam", "Martha"];
console.log(owners.sort());

// Numbers
// console.log(movements.sort());  // Does not work as expected

// return < 0, A, B (a > b) (keep order)
// return > 0, B, A (a < b) (switch order)
movements.sort((a, b) => (a > b ? 1 : -1)); // Accending
console.log(movements);

// Another way
movements.sort((a, b) => a - b); // Accending
console.log(movements);

movements.sort((a, b) => (a < b ? 1 : -1)); // Decending
console.log(movements);

// Another way
movements.sort((a, b) => b - a);
console.log(movements);

/*
More Ways of Creating and Filling Arrays
- Problematically creating arrays

Fill
arr.fill(el, inx, end);
- Will fill an array with the selected element (optional) starting at the selected index and
   (optional) stopping at the end parameter.  
  * Will not fill in the index at the end parameter.
- The fill method will work on all arrays not just an empty array.

From
Array.from({length: num}, function(el, i) );
- Will fill an array with the selected length with a function (works like a map);
*/
console.log(
  "\n------------------- More Ways of Creating and Filling Arrays -------------------"
);

// Creates a new array with 7 empty elements
const x = new Array(7);
x.fill(1, 3, 5); // Fills the array with the value
x.fill(1);
console.log(x);

// Array.from()
const y = Array.from({ legnth: 7 }, () => 1);
console.log(y);

// Creating an array problematically
const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z);

// Create an array with 100 random dice rolls
const dice = Array.from({ length: 100 }, () =>
  Math.floor(Math.random() * 32 + 1)
);
console.log(dice);

// Converting a UI element into an array
labelBalance.addEventListener("click", function () {
  /* 
   Creates an array from the .movements__value UI element (nodelist)
   Then uses the callback function to convert the strings into
   a number, and remove the dollar character.
  */
  const movementsUI = Array.from(
    document.querySelectorAll(".movements__value"),
    el => Number(el.textContent.replace("€", ""))
  );

  // Another way of converting the nodelist ui element to a array
  const movementsUI2 = [...document.querySelectorAll(".movements__value")];

  console.log(movementsUI); // displays to console
});
