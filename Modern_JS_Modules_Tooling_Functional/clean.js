"use strict";

/*  
Makes object Immutable! Object.freeze(obj/arr)
Is not a deep freeze, you can still modify objects inside of the object
There are 3rd party libraries that implement a deep freeze */
const budget = Object.freeze([
  { value: 250, description: "Sold old TV 📺", user: "jonas" },
  { value: -45, description: "Groceries 🥑", user: "jonas" },
  { value: 3500, description: "Monthly salary 👩‍💻", user: "jonas" },
  { value: 300, description: "Freelancing 👩‍💻", user: "jonas" },
  { value: -1100, description: "New iPhone 📱", user: "jonas" },
  { value: -20, description: "Candy 🍭", user: "matilda" },
  { value: -125, description: "Toys 🚂", user: "matilda" },
  { value: -1800, description: "New Laptop 💻", user: "jonas" },
]);

const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});

// Using optional chaining and nullish collaesing operator
const getLimit = (limits, user) => limits?.[user] ?? 0;

// Pure Function :D
function addExpense(state, limits, value, description, user = "jonas") {
  const cleanUser = user.toLowerCase(user);

  return value <= getLimit(limits, cleanUser)
    ? [...state, { value: -value, description, user: cleanUser }]
    : state;
}
const newBudget1 = addExpense(budget, spendingLimits, 10, "Pizza 🍕");
const newBudget2 = addExpense(
  newBudget1,
  spendingLimits,
  100,
  "Movies 🍿",
  "Matilda"
);
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, "Stuff", "Jay");

// Pure Function :D
function checkExpenses(state, limits) {
  return state.map((entry) => {
    return entry.value < -getLimit(limits, entry)
      ? { ...entry, flag: "limit" }
      : entry;
  });
}
const finalBudget = checkExpenses(newBudget3, spendingLimits);

// Not Pure due to console.log "side effect"
function logBigExpenses(state, bigLimit) {
  const bigExpenses = state
    .filter((entry) => entry.value <= -bigLimit)
    .map((entry) => entry.description.slice(-2))
    .join(" / ");
  console.log(bigExpenses);
}
console.log(budget);
console.log(finalBudget);
logBigExpenses(finalBudget, 500);
