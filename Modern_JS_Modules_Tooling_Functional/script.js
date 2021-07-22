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
import * as ShoppingCart from "./shoppingCart.js";

ShoppingCart.addToCart("bread", 5);
console.log(ShoppingCart.totalPrice);

// Default Imports, you give it a name
import add from "./shoppingCart.js";
add("apples", 10);

// It is not good practice to mix named and default imports/exports in the
// same module.
// Generally you use the default export/import to make working with them easier
