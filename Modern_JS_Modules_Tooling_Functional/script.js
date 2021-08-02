//////////////////////////////////////////////////////
// Modules in JS
/*
 - Resusable piece of code that encapsulates implementation details
 - Usually a standalone file, but it doesn't have to be
 - You can import and export modules
 - Compose Software: Modules make it easy to compose software
   - Small building blocks that we put together to build complext applications.
 - Isolate components: Modules can be worked on individually in isolation.
 - Abstract code: Implement low-level code in modules and import these 
   abstractions into other modules.
 - Organized code: Modules naturally lead to a more organized codebase.
 - Reuse code: Modules allow us to easily reuse the same code across 
   multiple projects.

  Native JavaScript (ES6) Modules
  - Modules that are stored in files, exactly one module per file.
  - Imports and exports need to happen at top-level
  - Imports and exports are hoisted, first thing that happens.
  - Modules are imported synchronously
  - Makes bundling and dead code elimination possible
  - Download of modules occurs asynchronously
  - Linking live connection not copies
  - All modules are executed in "strict" mode by default
*/
console.log("Importing module");
// Importing Module
// import "./shoppingCart.js"; // happens first
// import {
//   addToCart,
//   totalPrice as price, // change name of totalPrice to price
//   tq,
// } from "./shoppingCart.js";

// Can now use function from shoppingCart module
// addToCart("bread", 5);
// console.log(price, tq);

// Import all the exports of a module at the same time
// This makes the code in the module act like an Class object
import shoppingCart, * as ShoppingCart from "./shoppingCart.js";

ShoppingCart.addToCart("bread", 5);
console.log(ShoppingCart.totalPrice);

// Default Imports, you give it a name
import add from "./shoppingCart.js";
add("apples", 10);

// It is not good practice to mix named and default imports/exports in the
// same module.
// Generally you use the default export/import to make working with them easier

//////////////////////////////////////////////////////
// The Module Pattern
/*
Old JavaScript Modules (Pre-ES6)
- Encapsolate functionality to have private data and expose a public API
- This is done by using a IFFY function
- Wrap all the code in a IFFY so it is not invoked more than one time.
- This functionality works by closures, allow func to have access to all  
  variables at its birthplace.
*/
// create a new scope and return data
const ShoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 20;
  const totalPrice = 500;
  const totalQuantity = 50;

  function addToCart(product, quantity) {
    cart.push({ product, quantity });
    console.log(
      `${quantity} ${product} have been added to cart, shipping cost is $S${shippingCost}`
    );
  }

  function orderStock(product, quantity) {
    console.log(`${quantity} ${product} ordered from supplier`);
  }

  // Return what you want to be made public
  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

ShoppingCart2.addToCart("apple", 5);
ShoppingCart2.addToCart("pizza", 2);

//////////////////////////////////////////////////////
// Common JS Modules
/*
 These have been used by NodeJS for all of its existence.
 Almost all of the modules in the NPM repo still use the common JS module system.
 NPM was only intended for NodeJS.
*/
// Export in node JS
// export.addToCart = function (product, quantity) {
//   cart.push({ product, quantity});
//   console.log(` ${quantity}, ${product} added to cart`);
// }

// Import node JS
// const { addToCart } = require("./shoppingCart.js");

//////////////////////////////////////////////////////
// A Brief Introduction to the Command Line
/*
 All the build tools only work in the command line
 - While in a command line you are always in a folder
 - When you open a terminal in VS code you are always in the project folder

 Show Contents of Current folder
 Linux - ls
 Windows - dir

 Change Directory
 Windows/Linux - cd
 cd.. will go up a folder
 cd../.. will go up two folders

 Clear Console
 clear

 Make a new Folder
 mkdir foldername

 Create new file
 Linux - touch filename
 Windows - new-item filename

 Delete Files
 Windows - del
 linux - rmdir

 Move Files
 Windows mv filename locationToBeMoved
*/

//////////////////////////////////////////////////////
// Introduction to NPM
/*
Install Node JS to get NPM to work

Initialize NPM
npm init

Creates a package.json file
- Stores the whole configuration for the project

Install leaflet using the NPM
npm install leaflet

Doing this will create new dependencies
and will create a node_modules folder that will contain the library folder

Popular JS library
Lodash - A collection of useful functions that should be included in JS but
  aren't.
  npm install lodash-es (to install es6 modules)
*/
// import cloneDeep from "./node_modules/lodash-es/cloneDeep.js";
// importing with a bundler
import { cloneDeep } from "lodash-es";

const state = {
  cart: [
    { product: "bread", quantity: 5 },
    { product: "pizza", quantity: 5 },
  ],
  user: { loggedIn: true },
};
// Lodash (Deep Copy)
const stateDeepClone = cloneDeep(state);
console.log(stateDeepClone);

const stateClone = Object.assign({}, state); // shallow copy
console.log(stateClone);
state.user.loggedIn = false; // changes both the real object and copy

//////////////////////////////////////////////////////
// Bundling with Parcel and NPM Scripts
/*
 Parcel
 - fast and easy to use
 - Works out of the box without any configuration
 - Webpack is more popular but complex
 
 To Install
 npm install parcel --save-dev
 - A tool needed to build the application, but not included in code

 How to Use Parcel
 - You can use npx or npm scripts
 - npx parcel index.html (entry point)
 - Used to bundle the modules together
 - Starts a new server (works like liveserver)
 - If there are errors while installing or running parcel, how to fix?
   * You can try to install with "sudo npm install parcel" (allows more permissions)
   * Try to install version 1.12.4 "npm install parcel@1.12.4"
   * Try to uninstall "npm uninstall parcel"
   * Try to remove "type=module" from html as may not be needed
   * NPM scripts for locally installed packages in command line (automate repeatitive tasks)
     - Under "scripts" in the package.json file
       * "start": "parcel index.html"
       * Then to run script in command line "npm run start"
  - You can kill a server process by selecting <Ctrl + c>

 Build final bundle
 - When done developing project, build final bundle
 - Has code compressed and code elimination
 - Under "scripts" in the package.json file
   * "build": "parcel build index.html"
   * "npm run build"
   
 Packages can be installed globally
 - "npm install parcel --g"
 - Allows packages to work everywhere
 - Tools normally should be installed locally so they can be on the latest version
*/

// Hot module replacement
// Only Parcel understands, when you change a module it will not reload the page during rebuild
if (module.hot) {
  module.hot.accept();
}

//////////////////////////////////////////////////////
// Configuring Babel and Polyfilling
/*
 Transpile modern code to ES5 code
 - There are still many people stuck on older computers and cannot upgrade
 - Parcel automatically uses Babel
   * Define what browsers should be supported

 Babel
 - Bablejs.io
 - Plug-ins
 - Works with plug-ins and presets that can be configured
 - Plug-ins are specific features that you want to convert
 - More normal to use presets, bunch of plugins bundled together
 - Preset-env
 
 Polyfilling
  - uses a different library
  - "import "core-js/stable"
  - manual install "npm install core.js"
  - Will polyfill everything even if you don't need it
  - "npm install regenerator-runtime" // polyfil for async functions
*/

// Code that is not part of the preset for Babel (now included by default)
class Person {
  #greeting = "Hey";
  constructor(name) {
    this.name = name;
    console.log(`${this.#greeting}, ${this.name}}`);
  }
}
const jonas = new Person("Jonas");

console.log("Jonas" ?? null);

console.log(state.cart.find((el) => el.quantity >= 2)); // Not converted to ES5
Promise.resolve("Test").then((x) => console.log(x)); // Not converted to ES5

// Polyfilling
// import "core-js/stable"; // everything
import "core-js/stable/array/find"; // specific
import "core-js/stable/promise"; // specific

// Polyfilling async functions
import "regenerator-runtime/runtime";

//////////////////////////////////////////////////////
// Writing Clean and Modern JavaScript Code
/*
 READABLE CODE
 * Write code so that others can understand it
 * Write code so that you can understand it in 1 year
 * Avoid too "clever" and overcomplicated solutions
 * Use descriptive variable names: what they contain
 * Use descriptive function names: what they do
 
 GENERAL
 * use the DRY principle (refactor your code, don't repeat yourself)
 * Don't pollute global namespace, encapsulate instead
 * Don't use var
 * Use strong type checks (=== and !==)
 
 FUNCTIONS
 * Generally, functions should only do one thing
 * Don't use more than 3 function parameters
 * Use default parameters whenever possible
 * Generally, return same data type as received
 * Use arrow functions when they make code more readable
 
 OOP
 * Use ES6 classes
 * Encapsulate data and don't mutate it from outside the class
 * Implement method chaining
 * Do not use arrow functions as methods (in regular objects)
 
 AVOID NESTED CODE
 * Use early return (guard clauses)
 * Use ternary (conditional) or logical operators instead of if
 * Use multiple if instaed of if/else-if
 * Avoid for loops, use array methods instead
 * Avoid callback-based asynchronous APIs
 
 ASYNCHRONOUS CODE
 * Consume promises with async/await for best readability
 * Whenever possible, run promises in parallel (Promise.all)
 * Handler errors and promise rejections
*/

//////////////////////////////////////////////////////
// Let's fix some bad code part 1
/*
  See "clean.js"
*/

//////////////////////////////////////////////////////
// Declaritive and Functional JavaScript Principles
/*
 
*/
