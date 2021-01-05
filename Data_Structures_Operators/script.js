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

  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2}, and ${ing3}`
    );
  },

  orderPizza: function (mainIngredient, ...otherIngredients) {
    let order = `Your Pizza from ${this.name} is on its way with the selected toppings of: ${mainIngredient}`;
    for (let i = 0; i < otherIngredients.length; i++) {
      order += ` ${otherIngredients[i]}`;
    }
    console.log(order);
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
// cannot use const/let because d and e are already declared and you are just mutating the variables
({ d, e } = obj); // syntax error, expects a code block, must wrap in parantheses.
console.log(d, e);

// Nested objects
// In order to access nested objections you enter the property name and then a colon then {nested_property}
const {
  fri: { open: op = 0, close: cl = 0 },
} = openingHours;
console.log(op, cl);

// Order delivery function destructuring
// function allows you to pass in an object of options
restaurant.order_delivery({
  time: "22:30",
  address: "Via del Sole, 21",
  main_index: 2,
  starter_index: 2,
});

restaurant.order_delivery({
  address: "Via del Sole, 21",
  starter_index: 1,
});

/*
-------------------The Spread Operator (...)--------------------
Used to expand an array as all its elements
Takes all the individual values out of orginal array and puts them into the new array.

Gets elements out of arrays, doesn't create new variables, you can only use the spread operator when 
building an array or when passing values into a function.

Spread operator works on all iterables.
Iterables are: arrays, strings, maps, sets, NOT objects.
*/
const spreadArr = [7, 8, 9];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]]; // don't do this
console.log(badNewArr);

const newArr = [1, 2, ...arr]; // expands the array into all elements
console.log(newArr);
console.log(...newArr); // will log the indivudual elements of the array instead of showing the whole array
const newMenu = [...restaurant.mainMenu, "Gnocci"]; // creates a new array, does not manipulate the mainMenu array
console.log(newMenu);

// Copy array
const mainMenuCopy = [...restaurant.mainMenu]; // shallow copy, similar to obj.assign

// Join 2 arrays together
const fullMenu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(fullMenu);

// iterable string
const str = "Adrianne";
const letters = [...str, " ", "G."];
console.log(letters);
console.log(...str);
// console.log(`${...str} Gistinger`); // doesn't work

// Function with spread operator / orderPasta function
const ingredients = [
  prompt("Let's make pasta! Ingredient 1?"),
  prompt("ingredient 2?"),
  prompt("ingredient 3?"),
];
console.log(ingredients);
restaurant.orderPasta(...ingredients); // expands ingredients array with prompt values

// Objects with spread operator
const newRestaurant = { foundedIn: 1998, ...restaurant, founder: "Guiseppe" };
console.log(newRestaurant);

// Shallow copy objects (instead of obj.assign)
const restaurantCopy = { ...restaurant };
restaurantCopy.name = "Ristorante Roma";

console.log(restaurantCopy.name);
console.log(restaurant.name);

/*
-------------------- Rest Pattern and Parameters ---------------------------------
The rest pattern has the same syntax as the spread operator (...), but it does the opposite
of the spread operator.

The rest pattern collects multiple elements and pack them into an array.

It is called rest because it will take the rest of the elements and put them into an array that
are not used in a destructuring assignment.  This will not include skipped elements.

Must be the last in the destructuring element.  You cannot use rest pattern in the middle.

There can only be one rest in any destructuring assignment.
*/
////////////// Destructuring
// SPREAD, because on RIGHT side of =
const arr2 = [1, 2, ...[3, 4]];

// REST, because it is on the LEFT side of =
const [a1, b1, ...others] = [1, 2, 3, 4, 5];
console.log(a1, b1, others);

const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood);

// REST, objects destructuring assignment
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays); // will only have thu and friday

//////////////// Functions with rest syntax as arguments/parameters (compress arguments)
function add(...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  console.log(sum);
}

add(2, 3);
add(5, 3, 7, 2);
add(8, 2, 5, 3, 2, 1, 5);

// Use spread operator to pass them into the function
const x1 = [23, 5, 7];
add(...x1);

// Example of function inside object using rest parameters
restaurant.orderPizza("mushrooms", "onion", "olives", "spinach");
restaurant.orderPizza("sausage");

/*
-------------------- Short Circuiting (&& and ||) -----------------------------
(||)
If the first value is a truth value, it will immediately return the first truth value and not
evaluate the 2nd value.

You can use the || to evaluate statements and set default values.

(&&)
The && operator works in the exact opposite way of the || operator.
The && operator short circuits if the first value is false.
The first false value will be returned.
*/
// Use ANY data type, return ANY data type, short-circuiting (||)
console.log("--- Or ---");
console.log(3 || "Jonas"); // Non-boullien values
console.log("" || "Jonas"); // first operand is false so 2nd is returned
console.log(true || 0); // first operand is true
console.log(undefined || null); //  both are false but 2nd value is returned

console.log(undefined || 0 || "" || "Hello" || 23 || null); // will be hello, first truth value

// Ternary operator
restaurant.numGuests = 23;
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);

// Short circuit ||
const guests2 = restaurant.numGuests || 10;
console.log(guests2);

// short-circuiting (&&)
console.log("---And---");
console.log(0 && "Jonas"); // 0 false
console.log(7 && "Jonas"); // "Jonas" true

console.log("Hello" && 23 && null && "Jonas"); // null false

// Practical example
if (restaurant.orderPizza) {
  restaurant.orderPizza("Sausage", "Mushroom");
}

restaurant.orderPizza && restaurant.orderPizza("Sausage", "Mushroom");
