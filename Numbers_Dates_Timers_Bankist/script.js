"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2021-03-20T23:36:17.929Z",
    "2021-03-23T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

function formatMovements(date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) {
    return "Today";
  } else if (daysPassed === 1) {
    return "Yesterday";
  } else if (daysPassed <= 7) {
    return `${daysPassed} days ago`;
  } else {
    // const day = `${date.getDate()}`.padStart(2, 0);
    // const month = `${date.getMonth() + 1}`.padStart(2, 0); // zero based
    // const year = date.getFullYear();
    // return `${day}/${month}/${year}`;
    return new Intl.DateTimeFormat(locale).format(date);
  }
}

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = "";

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovements(date, acc.locale);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${mov.toFixed(2)}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map(name => name[0])
      .join("");
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount;

btnLogin.addEventListener("click", function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;
    const now = new Date();
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "numeric",
      year: "numeric",
      // weekday: "long", // you can also do short or narrow
    };

    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0); // zero based
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add loan date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = "";
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = "";
});

let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

//////// Converting and Checking Numbers /////////
/*
- In JavaScript all numbers are represented interally as floating point
numbers.
- Numbers internally are all binary form.
- Base 10 is 0 to 9
- Base 2 is 0 and 1 (binary)
- JavaScript cannot be used for financial and very detailed math calculations
 because it is unable to do (0.1 + 0.2) which should be 0.3.

*/
console.log("------------ Converting and Checking Numbers -------------");

console.log(23 === 23.0);
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3);

console.log(Number("23"));
console.log(+"23"); // type coersion will change to a number

// Parsing
// The parseInt function willl pull a number from a string as long as
// the number comes better the letters.
console.log(Number.parseInt("30px", 10));
console.log(Number.parseInt("e23", 10)); // NaN (won't work)

console.log(Number.parseFloat("2.5rem"));

// isNaN, checks if value is not a number
console.log(Number.isNaN(20)); // false (cause it is a number)
console.log(Number.isNaN("20")); // false
console.log(Number.isNaN(+"20x")); // true (NaN)
console.log(Number.isNaN(23 / 0)); // false (is infinity)

// isFinite, checks if value is a number
console.log(Number.isFinite(20)); // true
console.log(Number.isFinite("20")); // false
console.log(Number.isFinite(+"20X")); // false
console.log(Number.isFinite(23 / 0)); // false

// isInteger, checks if value is a integer
console.log(Number.isInteger(23)); // true
console.log(Number.isInteger(23.0)); // true
console.log(Number.isInteger(23 / 0)); // false

//////// Math and Rounding /////////

console.log("------------ Math and Rounding -------------");

console.log(Math.sqrt(25)); // Will squareroot the number
console.log(23 ** (1 / 2)); // will also squareroot
console.log(8 ** (1 / 3)); // Will cubicroot

// Math.max(numbers)
// will return max value
// will do type coersion
console.log(Math.max(5, 18, 23, 11, 2)); // 23
console.log(Math.max(5, 18, "23", 11, 2)); // 23

// Math.min(numbers)
// will return the min value
// will do type coersion
console.log(Math.min(5, 18, 23, 11, 2)); // 2

// Calculate radius of a circle that is 10 px
console.log(Math.PI * Number.parseFloat("10px") ** 2);

// Random dice roll
console.log(Math.trunc(Math.random() * 6) + 1);

// function to create a random number
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min;
console.log(randomInt(10, 20));

// Rounding integers
console.log(Math.trunc(23.3)); // 23, removes decimal
console.log(Math.round(23.9)); // 24, rounds to nearest integer
console.log(Math.ceil(23.9)); // 24, rounds up
console.log(Math.floor(23.9)); // 23, rounds down
console.log(Math.trunc(-23.3)); // -23, removes decmial
console.log(Math.floor(-23.3)); // -24, rounds up in negative value

// rounding Floating point numbers (decimals)
console.log((2.7).toFixed(0)); // 3 (string), toFixed will return a string
console.log((2.7).toFixed(3)); // 2.700 (string)
console.log(+(2.345).toFixed(2)); // 2.35 (number)

//////// The Remainder Operator /////////
/*
returns the remainder of a division
*/
console.log("------------ The Remainder Operator -------------");

console.log(5 % 2); // 1
console.log(5 / 2); // 2.5, 5 = 2 + 2 + 1
console.log(8 % 3); // 2
console.log(8 / 3); // 2.6666, 8 = 2 * 3 + 2
console.log(8 % 2); // 0

// Check if a number is even or odd
const isEven = num => num % 2 === 0;
console.log(isEven(10)); // true
console.log(isEven(5)); // false

// Example, to change every other row as orange red in the website and every 3rd blue
labelBalance.addEventListener("click", function () {
  [...document.querySelectorAll(".movements__row")].forEach(function (row, i) {
    if (i % 2 === 0) {
      row.style.backgroundColor = "orangered";
    }
    if (i % 3 === 0) {
      row.style.backgroundColor = "blue";
    }
  });
});

//////// Working with BigInt /////////
/*
Special type of integer introduced in ES2020
- You cannot mix BigInts with regular numbers
*/
console.log("------------ Working with BigInt -------------");

console.log(2 ** 53 - 1); // The biggest number that JS can represent
console.log(Number.MAX_SAFE_INTEGER);
console.log(2 ** 53 + 1); // wrong, cannot update correctly

// Big Int
console.log(123125245394983498539849823984293482342n); // adding n transforms a normal number to a bigint
console.log(BigInt(123125245394983498539849823984293482342));

// Operations
console.log(10000n + 10000n);
console.log(298342398492834982398429834n * 10000000n);

const huge = 2309280348902384092304982n;
const num = 23;
// console.log(huge * num); // error can't mix

console.log(20n > 15); // still works
console.log(20n === 20); // false types don't match
console.log(typeof 20n);

console.log(huge + " is REALLY big!!!!");

// Divisions
console.log(10n / 3n); // 3n cuts off decimal

//////// Creating Dates /////////
/*
There are 4 ways of creating dates in JS:
- const now = new Date();
- const date = new Date("string");
- const date = new Date(Y, M, D, Hr, Min, Sec, MS);
- const date = new Date(ms);
*/
console.log("------------ Creating Dates -------------");

// Create a date
const now = new Date();
console.log(now);

console.log(new Date("Aug 02 2020 18:05:53"));
console.log(new Date("December 24, 2015"));
console.log(new Date(account1.movementsDates[0]));

console.log(new Date(2037, 10, 19, 15, 23, 5));
console.log(new Date(2037, 10, 31));

console.log(new Date(0));
console.log(new Date(3 * 24 * 60 * 60 * 1000)); // 3 days * 24 hours * 60 min * 60 sec * 1000 ms

// Working with dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear()); // don't use getYear
console.log(future.getMonth());
console.log(future.getDate());
console.log(future.getDay()); // gets day of the week

console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());

console.log(future.toISOString());
console.log(future.getTime()); // ms since 1970

console.log(new Date(2142274980000));

// Right now
console.log(Date.now()); // Gets current time stamp

future.setFullYear(2040);
console.log(future);

//////// Operations With Dates /////////
/*
You are able to use math to calcuate differences between
dates.

You can turn the time stamp into a number by doing +date
and then converting the number back into a time stamp.

Date library: Moment.js, free library
*/
console.log("------------ Operations With Dates -------------");

// Do math with dates
// Calculate how much time has passed between two dates
console.log(Number(future));
console.log(+future);

const calcDaysPassed = (date1, date2) =>
  Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

const days1 = calcDaysPassed(
  new Date(2037, 3, 4),
  new Date(2037, 3, 14, 10, 8)
);
console.log(days1); // 10 days between the two dates

//////// Internationalizing Dates (INTL) /////////
/*
Format numbers and strings based on different languages.

Currencies and dates are represented differently acrossed the world.

See code where dates are displayed in application at top of script.

ISO language codes table, lingoes.net

MDN Intl (search) to see addtional functions
*/
console.log("------------ Internationalizing Dates (INTL) -------------");
const todayNow = new Date();
const locale = "en-US";
const options = {
  hour: "numeric",
  minute: "numeric",
  day: "numeric",
  month: "numeric",
  year: "numeric",
  weekday: "long",
};
console.log(new Intl.DateTimeFormat(locale, options).format(todayNow));
