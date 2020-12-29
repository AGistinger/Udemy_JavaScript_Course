"use strict";

const restaurant = {
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  order: function (starter_index, main_index) {
    return [this.starterMenu[starter_index], this.mainMenu[main_index]];
  },

  order_delivery: function ({
    starter_index = 1,
    main_index = 0,
    time = "20:00",
    address,
  }) {
    console.log(
      `Order recieved! ${this.starterMenu[starter_index]} and ${this.mainMenu[main_index]}, Will be delivered to ${address}, at ${time}`
    );
  },
};

/*
----------Destructuring Arrays-----------
Unpacking a array into separate variables
Retrieve elements from the array and store them into variables
*/
const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

// Destructuring an array
const [x, y, z] = arr; // destructuring assignment
console.log(x, y, z);
console.log(arr); // original array is unaffected

let [main, , secondary] = restaurant.categories; // leaving a gap will allow you to skip an element
console.log(main, secondary);

// switching variables
[main, secondary] = [secondary, main]; // reassigning values
console.log(main, secondary);

const [starter, main_course] = restaurant.order(2, 0); // allows you to get 2 variables out of a function call
console.log(starter, main_course);

// Nested destructuring
const nested = [2, 4, [5, 6]]; // array inside of an array
// const [i, , j] = nested;
// console.log(i, j);
const [i, , [j, k]] = nested; // destructuring inside destructuring
console.log(i, j, k);

// Default values
const [p = 1, q = 1, r = 1] = [8, 9]; // sets default values to 1, helps when you have apis
console.log(p, q, r);

/*
----------Destructuring Objects---------
To destructure objects you use curly braces instead of brackets.
You have to provide the variable names that exactly match the property names that match the object.
Order of elements does not matter.
*/
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

// To specify new names for variables put a colon between a property name and a variable name
const {
  name: restaurant_name,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurant_name, hours, tags);

// Set default values [] will set it to empty
//  There is no property on the restaurant object called menu so you will see the empty array
// Without the default values menu will show an empty array
// This is helpful where you do not have data hard corded, like APIs
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

// Mutating variables while destructuring objects
let d = 111;
let e = 999;
const obj = { d: 23, e: 7, f: 14 };
({ d, e } = obj); // syntax error, expects a code block, must wrap in parantheses

// Nested objects
const {
  fri: { open: op, close: cl },
} = openingHours;
console.log(op, cl);

// Order delivery function destructuring
// function allows you to pass in an object of options
restaurant.order_delivery({
  time: "22:30",
  address: "Vil del Sole, 21",
  main_index: 2,
  starter_index: 2,
});

restaurant.order_delivery({
  address: "Vil del Sole, 21",
  starter_index: 1,
});

/*
-------------------The Spread Operator (...)--------------------
*/
