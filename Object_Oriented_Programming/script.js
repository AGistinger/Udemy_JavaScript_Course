"use strict";

//////////////////////// What is Object-Oriented Programming? //////////////////////////
/* 
What is Object-Oriented Programming? (OOP)
- Programming paradigm (style) based on teh concept of objects.
- We use objects to model (describe) real-world or abstract features
- Objects may contain data (properties) and code (methods).  By using
 objects, we can pack data and the corresponding behavior into one
 block.
- Self contained pieces/blocks of code
- Objects are building blocks of applications, and interact with one another
- Interactions happen through a public interface (API): methods that
 the code outside the object can access and use to communicate with
 the object.
- OOP was developed with the goal of organizing code, to make it more flexible
 and easier to maintain (avoid "spaghetti code").

Class
- blueprint from which we can create new objects (instance)
- the class itself is not an object

4 fundamental principles:
- Abstration
 * Ignoring or hidng details that don't matter.
- Encapsulation
 * Keep properties and methods private inside the class so they are not 
  accessible from outside the class.  Some methods can be exposed as a
  public interace (API).
 * Prevents exernal code from accidently manipulating internal properties/state.
- Inheritance
 * Makes all properties and methods of a certain class available to a
  child class, forming a hierarchical relationship between classes.  This 
  allows us to reuse common logic and to model real-world relationships.
- Polymorphism
 * A child class can overwrite a method it inherited from a parent class
*/

//////////////////////// OOP in JavaScript //////////////////////////
console.log("------------------- OOP in JavaScript --------------");
/*
- Objects are linked to a "prototype" object, each object has a prototype
- Prototype object contains methods and properties that all the objects that
  that are linked to that prototype can access and use.  This is known as
  "Prototypal Inheritance".
- Objects delegate behavior to the linked prototype object, "methods".
- ex) Array.prototype.map() 
   * const num = [1, 2, 3];
   * num.map(v => v * 2);
- Array.prototype is the prototype of all the array objects we create in JS.
  * All arrays have access to the map method.
- 3 Ways of implementing prototypal inheritance in JS:
  * Constructor functions
    - Technique to create objects from a function.
    - This is how built-in objects like Arrays, Maps, or Sets are actually implemented.
  * ES6 Classes
    - Modern alternative to constructor function syntax
    - "Syntatic sugar": behind the scenes, ES6 classes work exactly like constructor functions.
    - ES6 classes do NOT behavor like classes in "classical OOP".
  * Object.create()
    - The easiest and most straightforward way of linking an object to a prototype object.
*/

///////////////////// Constructor Functions and the new Operator ///////////////////////
console.log(
  "-------------- Constructor Functions and the new Operator ------------"
);
/*
- Is just like creating a normal function but adding the "new" operator.
- Constructor functions should have the first letter capitalized.
- Creating a new object from a prototype you must use the "new" operator when creating the object.
- 4 Steps:
  * 1. New {} object is created
  * 2. function is called, this keyword set to newly created object (this = {})
  * 3. Newly created object {} is linked to prototype (sets __proto__ property)
  * 4. function automatically returns new object {}
- the this keyword for the new object needs to have the new properties set to it
- 
*/

// Constructor Function
// function Person() {} // Normal function declarations also work
const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Methods
  // Never create a method inside of a constructor function!!!! (creates copies of function)
  // this.calcAge = function () {
  //   console.log(2037 - this.birthYear);
  // };
};

// new Operator
// objects created problematically with a constructor function
const jonas = new Person("Jonas", 1991);
const matilda = new Person("Matilda", 2017);
const jack = new Person("Jack", 1975);
console.log(jonas, matilda, jack);

console.log(jonas instanceof Person); // Shows true/false if object is instance of prototype

//////////////////////////// Prototypes //////////////////////////
console.log("----------------- Prototypes ----------------");
/*
- Each and every function in JS automatically has a property called prototype
  * ex) Person.prototype
- Instance objects will have access to prototype functions due to prototypal inheritance.
- Newly created object will set the __proto__ property to the Object.prototype property 
  of the constructor function.  This is how JS knows that that object is 
  connected to the prototype object.
*/

// Prototype (prototype of linked objects)
console.log(Person.prototype); // shows prototype
console.log(jonas.__proto__); // prototype of jonas
console.log(jonas.__proto__ === Person.prototype); // true
console.log(Person.prototype.isPrototypeOf(jonas)); // true
console.log(Person.prototype.isPrototypeOf(Person)); // false

// Does not create copies of function, will only be one copy!
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

jonas.calcAge();
matilda.calcAge();
jack.calcAge();

// Set Properties on Prototype
// Not directly in object
Person.prototype.species = "Homo Sapien";

console.log(jonas.species);
console.log(jonas.hasOwnProperty("firstName"));
console.log(jonas.hasOwnProperty("species")); // false, not inside of object

////////////////////// Prototypal Inheritance and the Prototype Chain //////////////////////
console.log(
  "--------------- Prototypal Inheritance and the Prototype Chain --------------"
);
/*

*/
