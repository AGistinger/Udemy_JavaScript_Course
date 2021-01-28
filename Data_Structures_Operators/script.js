"use strict";
// Allows you to computer names instead of hardcoding them Enhanced object literal ES6
const weekdays = ["mon", "tues", "wed", "thur", "fri", "sat", "sun"];
const openingHours = {
  [weekdays[3]]: {
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
};
const restaurant = {
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],

  // ES6 Enhanced Object LIteral, no longer need to set openingHours: openingHours,
  openingHours,

  // ES6 Enhanced Object Literal, no longer need to set name: function(args)
  order(starter_index, main_index) {
    return [this.starterMenu[starter_index], this.mainMenu[main_index]];
  },

  order_delivery({
    starter_index = 1,
    main_index = 0,
    time = "20:00",
    address,
  }) {
    console.log(
      `Order recieved! ${this.starterMenu[starter_index]} and ${this.mainMenu[main_index]}, Will be delivered to ${address}, at ${time}`
    );
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2}, and ${ing3}`
    );
  },

  orderPizza(mainIngredient, ...otherIngredients) {
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
console.log("------------------ Deconstructing Arrays --------------------");
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
console.log("------------------ Deconstructing Objects --------------------");
const { name, opHours, categories } = restaurant;
console.log(name, opHours, categories);

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
console.log("------------------ Spread Operator (...) --------------------");
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
// const ingredients = [
//   prompt("Let's make pasta! Ingredient 1?"),
//   prompt("ingredient 2?"),
//   prompt("ingredient 3?"),
// ];
// console.log(ingredients);
// restaurant.orderPasta(...ingredients); // expands ingredients array with prompt values

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
console.log("------------------ Rest Operator (...) --------------------");
console.log("Rest Example");
const [a1, b1, ...others] = [1, 2, 3, 4, 5];
console.log(a1, b1, others);

const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood);

// REST, objects destructuring assignment
const { sat, ...workweek } = restaurant.openingHours;
console.log(workweek); // will only have thu and friday

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
console.log(
  "------------------ Short Circuiting (|| and &&) --------------------"
);
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

/*
---------------------- Nullish Coalescing Operator (??) ----------------------------
works with null values instead of false values. (NOT 0 or "").
It does not count 0 or "" as null values
Only null values will short circuit
*/
console.log(
  "------------------ Nullish Coalescing Operator --------------------"
);
restaurant.numGuests = 0;
const guests3 = restaurant.numGuests ?? 10;
console.log(guests3);

/*
--------------------------- Coding Challenge #1 ----------------------------------
We're building a football betting app (soccer).

Suppose we get data from a web service about a certain game (below).  In this challenge 
we're going to work with the data.  So here are your tasks:

1. Create one player array for each team (variables "players1" and "players2")
2. The first player in any player array is the goalkeeper and the others are field players.
For Bayern Munich (team 1) create one variable ("gk") with the goalkeepr's name, and one array
("fieldPlayers") with all the remaining 10 field players.
3. Create an array "allPLayers" containing all players of both teams (22 players).
4. During the game Bayern Munich (team 1) used 3 substitute players.  So create a new array 
("playersFinal") containing all the original team1 players plust "Thiago", "Coutinho", and "Persic".
5. Based on the game.odds object, create one variable for each odd called ("team1", "draw", and "team 2")
6. Write a function ("printGoals") that receives an arbitrary number of player names (NOT an array) and
prints each of them to the console, along with the total number of goals who were scored 
(number of player names passed in)
7. The team with the lower odd is more likely to win.
Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary
operator.

TEST DATA FOR 6: Use players "Davies", "Muller", "Lewandowski", and "Kimmich".  Then call the function again
with the players from game.scored.
*/
console.log("------------------ Coding Challenge #1 --------------------");
const game = {
  team1: "Bayern Munich",
  team2: "Borrusia Dorthmund",
  players: [
    [
      "Neuer",
      "Pavard",
      "Martinez",
      "Alaba",
      "Davies",
      "Kimmich",
      "Goretzka",
      "Coman",
      "Muller",
      "Gnarby",
      "Lewandowski",
    ],
    [
      "Burki",
      "Schulz",
      "Hummels",
      "Akanji",
      "Hakimi",
      "Weigl",
      "Witsel",
      "Harvard",
      "Brandt",
      "Sancho",
      "Gotze",
    ],
  ],
  score: "4.0",
  scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
  date: "Nov. 9th, 2037",
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// destructuring arrays of arrays
const [players1, players2] = game.players;

// rest syntax
const [gk, ...fieldPlayers] = players1;

// spread operator
const allPlayers = [...players1, ...players2];

// spread operator + adding elements
const playersFinal = [...players1, "Thiago", "Coutinho", "Persic"];

// nested destructuring objects
const {
  odds: { team1: team1, x: draw, team2: team2 },
} = game;

// condensing arguments using rest paramters (condenses arguments into an array)
function printGoals(...playerNames) {
  let players = "";
  for (let i = 0; i < playerNames.length; i++) {
    players += playerNames[i] + " ";
  }
  console.log(`Players: ${players} Goals: ${playerNames.length}`);
}

printGoals("Davies", "Muller", "Lewandowski", "Kimmich");
printGoals(...game.scored);

// printing without if/else or ternary statement using a logical operator
team1 < team2 && console.log("Team 1 is more likely to win");
/*
|| or value will short circuit when the first value is true, but you want the evaluation to continune
so you want to use a && operator because it will continue to evaluate.
*/

/*
------------------------- Looping Arrays: The for-of Loop ---------------------
works like for(auto a : numbers) in C++, iterators.
Does not require counters or conditions.
Still allows for continue and break.
It is much more difficult to get the index of the array.
*/
console.log("------------------ The for-of Loop --------------------");
const menuLoop = [...restaurant.starterMenu, ...restaurant.mainMenu];

for (const it of menuLoop) {
  console.log(it);
}

// Get index by destructing the array of the two variables
console.log([...menuLoop.entries()]);

for (const [i, el] of menuLoop.entries()) {
  console.log(`${i + 1}: ${el}`);
}

/*
----------------------- Enhanced Object Literals ------------------------
See object at the top of the JS file
There were improvments in ES6 to allow for easier writing of functions and object literals
Also allows for the computing of attribute names instead of hardcoding them, see all examples in the
restaurant object at the top of the code.
*/
console.log("------------------ Enhanced Object Literals --------------------");
console.log("see code for object at top of JS file");

/*
------------------------- Optional Chaining (?.) ------------------------------
Only if the propery that is before the ?. exists then only then the next property be read,
otherwise it will return undefined.  A property exists if it is not null and not undefined.

optional chaining is used to help do error checking to make sure that properties and content
exist, this is used along with the (??) nullish coellesing operator
*/
console.log("------------------ Optional Chaining (?.) --------------------");
// if (restaurant.openingHours && restaurant.openingHours.mon.open) {
//   consolelog(restaurant.openingHours.mon.open);
// }

// With optional chaining
console.log(restaurant.openingHours.mon?.open);
console.log(restaurant.openingHours?.mon?.open);

// Example
const allDays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

for (const day of allDays) {
  const open = restaurant.openingHours[day]?.open ?? "closed";
  console.log(`On ${day}, we open at ${open}`);
}

// Methods
console.log(restaurant.order?.(0, 1) ?? "Method does not exist");
console.log(restaurant.orderRisotto?.(0, 1) ?? "Method does not exist");

// Arrays
const usersArr = [{ name: "Jonas", email: "hello@jonas.io" }];

console.log(usersArr[0]?.name ?? "User array empty");

/*
------------------------- Looping Objects: Object Keys, Values, and Entries ------------------------------
*/
console.log(
  "------------------ Looping Objects: Object Keys, Values, and Entries ---------------"
);

// Property names
const properties = Object.keys(openingHours);
console.log(properties);
let openStr = `We are open on ${properties.length} days: `;

for (const day of Object.keys(openingHours)) {
  openStr += `${day}, `;
}
console.log(openStr);

// Property values
const values = Object.values(openingHours);
console.log(values);

// Objects
const entries = Object.entries(openingHours);
console.log(entries);

// Destructure and specify properties to loop through and print
for (const [key, { open, close }] of entries) {
  console.log(x); // shows each key and each value
  console.log(`On ${key} we open at ${open} and close at ${close}`);
}

/*
------------------------- Coding Challenge #2 ------------------------------
Let's continue with our football better app!

1. Loop over the game.scored array and print each player name to the console, 
along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (we already studied 
  how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exactly like this:
    Odd of victor Bayern Munich: 1.33
    Odd of draw: 3.25
    Odd of victory Barrussia Dortmund: 6.5
Get the team  names directly from the game object,
don't hardcoe them (except for the "draw").  Hint Note how the odds and the game object have
the same property names.

Bonus:  Create an object called "scorers" which contains the names of the players who
scored as properties, and the number of goals as the value.  In this game it will look
like this:
  {
    Gnarby: 1,
    Hummels: 1, 
    Lewandowski: 2,
  }
*/
console.log("------------------ Coding Challenge #2 ---------------");

// Loop over game.scored array and print the player and goal # to the console
// for(const [i, player] of game.scored.entries())
// console.log(`Goal ${i + 1}: ${player}`);
for (const player of game.scored) {
  console.log(`Goal ${game.scored.indexOf(player) + 1}: ${player}`);
}

// Use a loop to calculate the average of odds and print it to the console
function calcOdds() {
  const arrOdds = Object.values(game.odds);
  let calc = 0;
  for (const odd of arrOdds) {
    calc += odd;
  }
  console.log(`The average Odd is: ${calc / arrOdds.length}`);
}
calcOdds();

// Print the 3 odds to the console
for (const [team, odd] of Object.entries(game.odds)) {
  const teamStr = team === "x" ? "draw" : `victory ${game[team]}`;
  console.log(`Odd of ${teamStr}: ${odd}`);
}
// console.log(`Odd of victory ${game.team1}: ${game.odds.team1}`);
// console.log(`Odd of draw: ${game.odds.x}`);
// console.log(`Odd of victory ${game.team2}: ${game.odds.team2}`);

// create an object called scorers which contains the names of the players
const scorers = {};
for (const player of game.scored) {
  if (!scorers.hasOwnProperty(player)) {
    scorers[player] = 1;
  } else {
    scorers[player] += 1;
  }
}
console.log(scorers);

/*
---------------------------- Sets ------------------------------
Set - a collection of unique elements, cannot have any duplicates.
In order to create a new set you need to "new Set()" and you need to pass in an iterable
ex) an array.
A set can hold mixed data types.
A set will remove any duplicates.
A set does not have key/value pairs.
The order of elements in the set is irrelevent.
The set has function for .size, which shows how many elements are in the set
The set has a function for .has(ele), which shows true/false for if a value is in the set
The set has a function for .add(ele), which will allow you to add new items to the set
The set has a function for .delete(ele), which will allow you to remove elements from the set
The set has a function for .clear(), which will delete all elements out of the set
There is no way to get data out of a set.
The main use of sets in the real world is to remove duplicate values of arrays.
If you need to manipulate data you should use arrays
*/
console.log("------------------ Sets ---------------");

const ordersSet = new Set([
  "Pasta",
  "Pizza",
  "Pizza",
  "Risotto",
  "Pasta",
  "Pizza",
]);
console.log(ordersSet);

console.log(new Set("Adrainne")); // New set created of a string iterable
console.log(ordersSet.size); // Set using the .size function
console.log(ordersSet.has("Pizza")); // Set using the .has() function "true"
console.log(ordersSet.has("Bread")); // Set using the .has() function "false"
ordersSet.add("Garlic Bread"); // Set using the .add() function
ordersSet.add("Garlic Bread"); // won't add duplicates must be unique
ordersSet.delete("Risotto"); // Set using the .delete function to remove an element
// ordersSet.clear(); // will remove all elements out of the set

// Loop is possible in sets
for (const order of ordersSet) {
  console.log(order);
}

// Example Sets (removing duplicates)
const staff = ["Waiter", "Chef", "Waiter", "Manager", "Chef", "Waiter"];

// Converting a set to an array using the spread operator to take the elements out of the set
// And put them into the array.  Will now not have duplicates
const staffUnique = [...new Set(staff)]; // passing in an array
console.log(staffUnique);
console.log(
  new Set(["Waiter", "Chef", "Waiter", "Manager", "Chef", "Waiter"]).size
);

console.log(new Set("AdrianneGistinger").size);

/*
---------------------------- Maps ------------------------------
Maps (Fundamentals)
More useful than sets.
Key/Value pairs
The difference between objects and maps, is that in maps the keys can be any types.
In objects the keys are strings.  In maps they can be objects, arrays, strings, etc.
To create a new map you create a variable to equal "new Map();"
To fill a map use the .set(key, value) method, set accepts the key / value, and will return the 
map.
You are able to chain .set() methods together by .set(key, value).set(key, value).set(key, value);
You are able to read data from a map by using the .get(key) method, this will return the value.
You are able to check if a map contains a certain key with the .has(key) method.
You are able to delete elements from the map by using the .delete(key) method.
You are able to check the size of a map using the .size method.
You are able to remove all items from the map by using the .clear() method.

*/
console.log("------------------ Maps ---------------");

// Create map new Map();
const rest = new Map(); // create a new map

// Set method ".set(key, value)"
rest.set("Name", "Classico Italiano"); // add new key/value pair using .set() method
rest.set(1, "Firenze, Italy");
console.log(rest.set(2, "Lisbon, Portugal")); // calling the set method returns the new set

// You are able to chain .set() methods to create multiple new sets of key/value pairs
rest
  .set("categories", ["Italian", "Pizzeria", "Vegetarial", "Organic"])
  .set("Open", 11)
  .set("Close", 23)
  .set(true, "We are open :D")
  .set(false, "We are closed :(");

// Get method ".get(key)";
console.log(rest.get("Name"));
console.log(rest.get(true));

const time = 21;
// will return true or false which is set to one of the key/values
rest.get(time > rest.get("Open") && time < rest.get("Close"));

// Has method ".has(key)"
console.log(rest.has("categories"));

// Delete method ".delete(key)"
rest.delete(2); // will delete Lisbon location
console.log(rest);

// Size method ".size"
console.log(rest.size);

// Clear method ".clear()"
// rest.clear();
// console.log(rest.size());

// Using objects as map keys, this can be useful for DOM elements
const arrMap = [1, 2];
rest.set(arrMap, "Test");
rest.set(document.querySelector("h1"), "Heading"); // key/value for DOM element
console.log(rest);
console.log(rest.size);

console.log(rest.get(arrMap));

/*
---------------------------- Maps Iteration------------------------------
A new way of populating a map without using the set method.
The set method is cumbersome when adding a lot of values.

The structure that shows an array of arrays is similiar to the structure of the Objects.entries(obj)
method.
*/
console.log("------------------ Maps Iteration ---------------");

const question = new Map([
  ["question", "What is the best programming langauge in the world?"],
  [1, "C"],
  [2, "Java"],
  [3, "JavaScript"],
  ["correct", 3],
  [true, "Correct!"],
  [false, "Try Again!"],
]);

console.log(question);

// Convert Object to Map
console.log(Object.entries(openingHours));
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

// Iteration
// destructuring each array into a key/value pair
console.log(question.get("question"));
for (const [key, value] of question) {
  if (typeof key === "number") console.log(`Answer ${key}: ${value}`);
}

// const answer = Number(prompt("Your answer?"));
const answer = 3;
console.log(answer);

// challenge/quiz
if (answer === question.get("correct")) {
  console.log(question.get(true));
} else {
  console.log(question.get(false));
}

// Teachers answer
console.log(question.get(question.get("correct") === answer));

// To convert a map back to an array
console.log([...question]);
console.log(...question.entries());
console.log(...question.keys());
console.log(...question.values());

/*
---------------------------- What Data Structure to Use? ------------------------------
SOURCES OF DATA:
1: From the program itself: Data written direction in source code
2: From the UI: Data input from the user or data written in DOM
3: From external sources: Data fetched for example from a web API (application programming interface)

DATA STRUCTURE:
Is the data a simple list? (array or set)
If you need key/value pairs? (object or map) ex) allows you to describe values

There are also weak sets and weak maps in JavaScript.
There are many other different data structures that are built into other libraries.

Use Arrays:
-When you need ordered list of values (might contain duplicates)
-When you need to manipulate data

Use Sets:
-When you need to work with unique values
-When high-performance is really important
-To remove duplicates from arrays

Use Objects:
-More "traditional" key/value store
-Easier to write and acces values with .and[]
-When you need to include functions(methods)
-When working with JSON(can convert to map)

Use Maps:
-Better performance
-Keys can have any data type
-Easier to iterate
-Easier to compute size
-When you simply need to map key to values
-When you need keys that are not strings
*/
console.log("------------------ What Data Structure to Use? ---------------");

/*
---------------------------- Coding Challenge #3 ------------------------------
Let's continue working with our football betting app!  This time, we have a map
with a log of the events that happened during the game.  The values are the events
themselves, and the keys are the minutes in which each even happened (a football game
has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, it was found that the yellow card from minute 64 was unfair. 
 so remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep
  in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking weatherit's in the first half or second
 half (after 45 min) of the game, like this:
  [First Half] 17: GOAL
*/
console.log("------------------ Coding Challenge #3 ---------------");

const gameEvents = new Map([
  [17, "⚽ GOAL"],
  [36, "🔁 Substitution"],
  [47, "⚽ GOAL"],
  [61, "🔁 Substitution"],
  [64, "🟨 Yellow card"],
  [69, "🟥 Red card"],
  [70, "🔁 Substitution"],
  [72, "🔁 Substitution"],
  [76, "⚽ GOAL"],
  [80, "⚽ GOAL"],
  [92, "🟨 Yellow card"],
]);

// Create an array of the different events that happened (no duplicates)
const events = [...new Set(gameEvents.values())];
console.log(events);

//  Remove the yellow card from minute 64
gameEvents.delete(64);

// Print a line to the console that states how often an event happened over 90 mins
const clock = [...gameEvents.keys()].pop(); // pops of last element of the array and returns it
console.log(
  `An event happened, on average every ${clock / gameEvents.size} minutes.`
);

// Loop over the events and log whether each event happend on the first half or 2nd half
for (const [key, val] of gameEvents) {
  console.log(
    `${key <= 45 ? "[First Half]" : "[Second Half]"} ${key} : ${val}`
  );
}

/*
---------------------------- Working with Strings (Part 1) ------------------------------
Strings work similiar to arrays you are able to get characters from a string by putting str[0]
which will return the character at the location in the string.  

You are also able to work with strings directly without having to set it to a variable by "hello"[0], 
which will return 'h' as it is at position 0.

You can do the same behavior by using the str.length() method to return the length of a string
in the same way as you would an array.

STRING METHODS:
str.indexOf('x');
  will return the index number that the character is at.  Also works with words.
str.lastIndexOf('x');
  will return the last occurrence index that the character is at.  Also works with words.
str.slice(num);
  will return the string after the number/index entered.  In order to use the returned string you have
  to save the string to a new variable.  You can specify both begin and end index parameters.  

JavaScript will automatically convert a string primitive into a string object when you call methods on it.
Called boxing.  Will turn the string into an Object.  All string methods return primitives, even when
called on a string object.
*/
console.log("------------------ Working with Strings (Part 1) ---------------");

const airline = "TAP Air Portugal";
const plane = "A320";

console.log(plane[0]); // A, works like an array to get the characters from the string
console.log("B737"[0]);

console.log(airline.length);
console.log("B737".length);

// .indexOf()
console.log(airline.indexOf("r")); // 6
console.log(airline.indexOf("Portugal")); // 8

// .lastIndexOf()
console.log(airline.lastIndexOf("r")); // 10
console.log(airline.lastIndexOf("Portugal")); // 8

// .slice();
console.log(airline.slice(4)); // Air Portugal
console.log(airline.slice(4, 7)); // Air

// Extract a string without knowning the value of the string
console.log(airline.slice(0, airline.indexOf(" ")));

// Extra last word without knowing the value of the string
console.log(airline.slice(airline.lastIndexOf(" ") + 1)); // +1 will remove the extra space

// Negative arguments
console.log(airline.slice(-2));
console.log(airline.slice(1, -1));

// Write a function that receives an airline seat and logs to the console if its middle or not
function checkMidSeat(seat) {
  // B and E are middle seats
  const s = seat.slice(-1);
  if (s === "B" || s === "E") {
    console.log("You got the middle seat 😭");
  } else console.log("You got lucky 😎");
}

checkMidSeat("11B");
checkMidSeat("23C");
checkMidSeat("3E");

/*
---------------------------- Working with Strings (Part 2) ------------------------------
STRING METHODS CONTINUED
str.toLowerCase();
  Does not require any arguments, will change all letters to lower case.
str.toUpperCase();
  Does not require any arguments, will change all letters to upper case.
str.trim();
  Will remove white space from a string, no arguments required.
str.replace("old", "new");
  Will replace the first entered parameter with the second entered parameter.  This will only
  replace the first occurence.
str.replaceAll("old", "new")
  Will replace the first entered parameter with the second entered paramter.  This will replace
  all occurrences.
str.includes("data");
  Will return a true/false value based on the parameter entered.
str.startsWith("data");
  Will return a true/false value based on the parameter entered.
str.endsWith("data");
  Will return a true/false value based on the parameter entered.
*/
console.log("------------------ Working with Strings (Part 2) ---------------");

console.log(airline.toLowerCase()); // all lower case
console.log(airline.toUpperCase()); // all upper case

// Fix capitalization in a name
const passenger = "jOnAs"; // Jonas
const passengerLower = passenger.toLowerCase();
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);

// Function to fix case in a name
function fixName(name) {
  let fixedName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  return fixedName;
}
const myName = "aDrIaNnE";
console.log(fixName(myName));

// comparing a user input email
const email = "hello@jonas.io";
const loginEmail = "   Hello@Jonas.Io \n";

const lowerEmail = loginEmail.toLocaleLowerCase();
// Remove white space
const trimmedEmail = lowerEmail.trim();
console.log(trimmedEmail);

// All in one step
const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);

console.log(email === normalizedEmail);

// Function to compare two emails and return true/false that the email is correct
function checkEmail(email) {
  const savedEmail = "agistinger@gmail.com";
  const loginEmail = email.toLowerCase().trim();
  return savedEmail === loginEmail ? true : false;
}

const myEmail = "Agistinger@GMAIL.COM";
console.log(checkEmail(myEmail));
const myEmail2 = "Agggisstingger@google.com";
console.log(checkEmail(myEmail2));

// Replacing characters in string
const priceGB = "288,97£";
console.log(priceGB);
const priceUS = priceGB.replace("£", "$").replace(",", ".");
console.log(priceUS);

const announcement =
  "All passengers come to boarding door 23.  Boarding door 23!";
console.log(announcement.replaceAll("door", "gate"));

// Regular expression version (without replaceAll) to come later in the course
console.log(announcement.replace(/door/g, "gate"));

// Boolean methods (includes, startsWith, endsWith)
const plane2 = "Airbus A320neo";
console.log(plane2.includes("A320")); // true
console.log(plane2.includes("Boeing")); // false
console.log(plane2.startsWith("Air")); // true

// used when you need to make a decision based on the contents of a string
if (plane2.startsWith("Airbus") && plane2.endsWith("neo")) {
  console.log("Part of the NEW Airbus family");
}

// Practice exercise
function checkBaggage(items) {
  const baggage = items.toLowerCase();
  if (baggage.includes("knife") || baggage.includes("gun")) {
    console.log("You are NOT allowed on board!");
  } else {
    console.log("Welcome aboard!");
  }
}

checkBaggage("I have a laptop, some Food, and a pocket Knife");
checkBaggage("Socks and camera");
checkBaggage("Got some snacks and a gun for protection");

/*
---------------------------- Working with Strings (Part 3) ------------------------------
STRING METHODS CONTINUED PT. 2
str.split(arg);
  Will split the string by the argument and put the split elements into a new array.
str.join(arg);
  Will join the strings together and put the argument between the strings ex) " ", "--".
str.padStart(num, "char/str"");
  Will pad a string at the start of the string to make it the length entered (num)
  with the characters entered.
str.padEnd(num, "char/str");
  Will pad a string at the end of the string to make it the legnth entered (num)
  with the characters entered.
str.repeat(num);
  Will repeat the same string mutiple times

Search for other String methods on MDN, all the other string methods will show on the site.
*/
console.log("------------------ Working with Strings (Part 3) ---------------");

// Split method
console.log("a+very+nice+string".split("+"));
console.log("Adrianne Gistinger".split(" "));

const [firstName, lastName] = "Adrianne Gistinger".split(" ");

const newName = ["Ms.", firstName, lastName.toUpperCase()].join(" ");
console.log(newName);

function capitalizeName(name) {
  const names = name.split(" "); // split name into an array
  const namesUpper = []; // create an empty array to put the modifed names
  for (const n of names) {
    // Loop through each name make the first letter uppercase, add it to the rest of the word and
    // push it to the new names array
    namesUpper.push(n[0].toUpperCase() + n.slice(1));
  }
  console.log(namesUpper.join(" ")); // join all the words in the name together separated by a space
}

capitalizeName("jessica ann smith davis");
capitalizeName("adrianne gistinger");

// alternate way of doing the above function
function fixCapitalization(name) {
  const names = name.split(" ");
  const fixed = [];
  for (const n of names) {
    fixed.push(n.replace(n[0], n[0].toUpperCase()));
  }
  console.log(fixed.join(" "));
}

fixCapitalization("adrianne gistinger");

// Padding a string
const message = "Go to gate 23!";
console.log(message.padStart(25, "+").padEnd(35, "+"));
console.log("Adrianne".padStart(25, "+").padEnd(40, "+"));

// masking a number so you don't see all of the text
function maskCreditCard(number) {
  const str = String(number);
  const last = str.slice(-4); // get last 4 characters
  return last.padStart(str.length, "*");
}

console.log(maskCreditCard(43332342342342522323));
console.log(maskCreditCard("1212315413532323434"));

// repeat method
const weatherMessage = "Bad weather.... All Departures Delayed.... ";
console.log(weatherMessage.repeat(5));

function planesInLine(num) {
  console.log(`There are ${num} planes in line ${"✈".repeat(num)}`);
}

planesInLine(5);
planesInLine(3);
planesInLine(12);

/*
---------------------------- Coding Challenge #4 ------------------------------
Write a program that receives a list of variable names written in underscore_case 
and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion
will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
  first_name
Some_Variable
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: remember which character defines a new line in the textarea.
HINT 2: The solution only needs to work for a variable made out of 2 words (a_b).
HINT 3: Start without worrying about the ✅.  Tackle that only after you have the 
  variable name conversion working.
HINT 4: This challenge is difficult on purpose, so stsart watching the solution in 
  case you are stuck.
*/
console.log("------------------ Coding Challenge #4 ---------------");

document.body.append(document.createElement("textarea"));
document.body.append(document.createElement("button"));
const button = document.querySelector("button");

function camelCase(text) {
  // fix text to remove "_", make first letter uppercase
  const fixedText = formatString(removeSpace(makeLower(text.split("\n"))));

  // print string
  printFixedStrings(fixedText);
}

// Remove spaces from all strings in an array
function removeSpace(arr) {
  const cleanArray = [];
  for (const str of arr) {
    cleanArray.push(str.trim());
  }
  return cleanArray;
}

// take apart underscore strings and make camelCase and return fixed array
function formatString(arr) {
  const camelArr = [];

  for (const str of arr) {
    const wordArr = str.split("_");
    const camelWord = [];
    for (const s of wordArr) {
      if (s === wordArr[0]) {
        camelWord.push(s);
      } else {
        camelWord.push(s[0].toUpperCase() + s.slice(1));
      }
    }
    camelArr.push(camelWord.join(""));
  }
  return camelArr;
}

// Make all strings in an array lowercase
function makeLower(arr) {
  const lowerCaseArray = [];
  for (const str of arr) {
    lowerCaseArray.push(str.toLowerCase());
  }
  return lowerCaseArray;
}

function printFixedStrings(arr) {
  // formate the output so that the end of the string has a increasing amount of
  // check marks for each string but they have to line up
  let num = 1;
  for (const str of arr) {
    console.log(`${str.padEnd(20, " ")}${"✅".padEnd(num, "✅")}`);
    num++;
  }
}

button.addEventListener("click", function () {
  const text = document.querySelector("textarea").value;
  camelCase(text);
});
