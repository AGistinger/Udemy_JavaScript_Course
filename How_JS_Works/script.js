"use strict";

// function scope
function calc_age(birth_year) {
  const age = 2037 - birth_year;

  // function scope
  function print_age() {
    let output = `${first_name}, you are ${age}, born in ${birth_year}.`;
    console.log(output);

    // New block scope
    if (birth_year >= 1981 && birth_year <= 1996) {
      var millenial = true; // var variables are function scoped not block scoped
      const first_name = "Steven"; // new current scope variable
      output = "NEW OUTPUT!"; // redefined existing variable
      const str = `Oh, and you're a millenial, ${first_name}`;

      // this function cannot be used outside of the if block
      function add(a, b) {
        return a + b;
      }
    }
    console.log(millenial);
    console.log(output);
  }
  print_age();
  return age;
}

// Global scope
const first_name = "Adrianne";
calc_age(1991);

/*
Hoisting in JavaScript (Variable Environment)
Makes some types of variables acessible before they are actually declared

function declarations - are hoisted, initial value is set to the actual function, block scoped.
var variables - are hoisted, initial value is undefined, function scoped. (causes bugs)
let and const variables - not hoisted, initial values are uninitialized, block scoped.
function expressions and arrows - depends if using var or let/const, work like normal variables

Temporal Dead Zone (let and const)
The region of the scope where in which the variable is defined, but can't be used in any way.
You cannot use the variable in the lines of the code before it was created.

This makes it easier to catch errors as it is bad practice to use variables before they are declared.
*/

// using variables before declaration (hoisting)
console.log(me); // undefined
// console.log(job); // cannot access before initialization
// console.log(year); // cannot access before initialization

var me = "Adrianne";
let job = "Software Engineer";
const year = 1991;

// using functions before declaration (hoisting)
console.log(add_decl(2, 3)); // able to call function before declared
// console.log(add_expr(2, 3)); // reference error
// console.log(add_arrow(2, 3)); // reference error

function add_decl(a, b) {
  return a + b;
}

const add_expr = function (a, b) {
  return a + b;
};

var add_arrow = (a, b) => a + b;

// Example (pitfall)
if (!num_products) {
  delete_shopping_cart(); // num_products isn't defined, function will be called
}

var num_products = 10;

function delete_shopping_cart() {
  console.log("All products deleted");
}

var x = 1;
let y = 2;
const z = 3;

console.log(x === window.x); // variables declared with var create a property in the window object
console.log(y === window.y);
console.log(z === window.z);

/*
This Keyword
special variable that is created for every function.
Takes the value of (points to) the "owner" of the function in which this keyword is used.

The value of the this keyword is not static.  It depends on how the function is called and its value 
is only assigned when the function is actually called.

Method: this = <object that is calling the method>
  const jonas = {
    name: "Jonas",
    calc_age: function() {
      return 2037 - this.year;
    }
  }
jonas.calc_age(); // 48

Simple function call: this = undefined (strict mode)
Arrow functions: this = <this of surrounding/parent function (lexical this)>
Event listener: this = <DOM element that the handler is attached to>
new, call, apply, bind: <later in course>

this does not point to the function itself, and also does not point to the variable environment.
*/
console.log(this); // window object in global scope

const calc_age_func = function (birth_year) {
  console.log(2037 - birth_year);
  console.log(this); // undefined
};
calc_age_func(1991);

const calc_age_arrow = birth_year => {
  console.log(2037 - birth_year);
  console.log(this); // uses this of the parent scope
};
calc_age_arrow(1980);

const adrianne = {
  first_name: "adrianne",
  year: 1986,
  calc_age_obj: function () {
    console.log(this); // will point to adrianne object
    console.log(2037 - this.year);
  },
  greet: () => console.log(`Hey ${this.first_name}`),
};
adrianne.calc_age_obj();

const matilda = {
  year: 2017,
};

matilda.calc_age_obj = adrianne.calc_age_obj; // borrowing the method from another object
matilda.calc_age_obj(); // this points to matilda

const f = adrianne.calc_age_obj; // copy the function into a new variable
// f(); // this is undefined

/*
Regular Functions vs. Arrow Functions
Never use an arrow function as a method, it can cause issues especially if var is used in the code
*/
adrianne.greet(); // this is undefined arrow functions get this from global scope
console.log(this.first_name); // undefined, do not get an error as this is the window object

// function inside of a method
const mark = {
  name: "Mark",
  year: 1977,
  calc_age_2: function () {
    console.log(2037 - this.year);

    // this is undefined as this is a regular function call
    const self = this; // will allow access to this inside the function scope
    const is_millenial = function () {
      console.log(self.year >= 1981 && self.year <= 1996);
    };
    is_millenial();

    // arrow function will get parent scopes this object
    const is_retired = () => {
      console.log(this); // will get parent this from calc_age_2 function
      console.log(`${this.name} is retired`);
    };
    is_retired();
  },
};
mark.calc_age_2();

// Arguments keyword, only available in regular functions
const func_expr = function (a, b) {
  console.log(arguments);
  return a + b;
};
func_expr(2, 5);
func_expr(2, 5, 8, 12);

const func_arrow = (a, b) => {
  console.log(arguments);
  return a + b;
}; // arrow functions do not get arguments keyword
// add_arrow(2, 5, 8); // error
