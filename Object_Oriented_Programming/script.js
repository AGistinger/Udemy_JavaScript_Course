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
 * The object will inherit functions from its prototype. (.__proto__)
 * The instance of the object and the prototype object create a prototype chain
 * If a object annot find a function in the object it will loop up in the prototypes chain.
 * Method inheritance
 */

////////////////////// Prototypal Inheritance on Built-In Objects //////////////////////
console.log(
  "--------------- Prototypal Inheritance on Built-In Objects --------------"
);
/*
 * Arrays have their own prototype  which is why all functions for arrays work on
  all arrays.
 * A mechinism for re-using code
 */

console.log(jonas.__proto__); // person prototype property
console.log(jonas.__proto__.__proto__); // object prototype property
console.log(jonas.__proto__.__proto__.__proto__); // Null

console.dir(Person.prototype.constructor); // person function constructor

const arr = [1, 4, 5, 6, 7, 3, 4, 6, 7];
console.log(arr.__proto); // array prototype property
console.log(arr.__proto__ === Array.prototype);

console.log(arr.__proto__.__proto__); // object prototype property

Array.prototype.unique = function () {
  return [...new Set(this)]; // returns new array of unique items by turning a set back into an array
};

console.log(arr.unique());

const h1 = document.querySelector("h1");
console.dir(h1);

////////////////////// Coding Challenge #1 //////////////////////
console.log("--------------- Coding Challenge #1 --------------");
/*
1. Use a constructor function to implement a Car.  A car has a make and a speed
   property.  The speed property is the currens peed of the car in km/h;
2. Implement an "accelerate" method that will increase the car's speed by 10, 
   and log the new speed to the console.
3. Implement a "brake" method that will decrease the car's speed by 5, and log 
   the new speed to the console.
4. Create 2 car objects and experiment with calling "accelerate" and "brake" multiple 
   times on each of them.

Data Car 1: "BMW" going at 120 km/h
Data Car2: "Mercedes" going at 95 km/h

// Good Luck 
*/

function Car(make, speed) {
  this.make = make;
  this.speed = speed;
}

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is now doing ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is now doing ${this.speed} km/h`);
};

const bmw = new Car("BMW", 120);
const merc = new Car("Mercedes", 95);

bmw.accelerate();
bmw.brake();
bmw.accelerate();
bmw.brake();

merc.accelerate();
merc.brake();
merc.accelerate();
merc.brake();

////////////////////// ES6 Classes //////////////////////
console.log("--------------- ES6 Classes --------------");
/*
* This is syntatic sugar over the constructor functions used in JavaScript to make
  the classes more like those used in Java and C++.

* Classes are just a special kind of functions.

* Classes need a constructor function which is a member of the "Class".  Must be called
  "constructor()".
  - Pass in properties that you want the object to have.

* Methods are added inside the classes.  All of the methods written inside of the class
  that are outside of the constructor will be added to the objects prototype and not on
  the object itself (prototypal inheritance).

* With this layout you do not need to directly add to the prototype property like in the
  previous example.

* Classes are not hoisted, cannot be used before they are declared in the code.
* Function declarations are hoised, can be used before they are declared.
* Classes are first-class citizens, you can pass them into functions and return them 
  from functions.
* The body of a class is alwasy executed in strict mode.
* Classes visually put all related code into a nice code block.
*/

// Class expression
// const PersonCl = class {}

// Class declaration
class PersonCl {
  // Constructs the object with the properties you want it to have
  constructor(fullName, birthYear) {
    this.firstName = fullName;
    this.birthYear = birthYear;
  }

  // Instance methods
  // Methods will be added to the .prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  // Set a property that already exists
  set fullName(name) {
    if (name.includes(" ")) {
      this._fullName = name;
    } else {
      alert(`${name} is not a full name!`);
    }
  }

  get fullName() {
    return this._fullName;
  }

  // Static method
  static hey() {
    console.log("Hey There");
  }
}

const jessica = new PersonCl("Jessica Davis", 1987);
console.log(jessica);
jessica.calcAge();

console.log(jessica.__proto__ === PersonCl.prototype);

// Works the same as inside the class
PersonCl.prototype.greet = function () {
  console.log(`Hey ${this.firstName}`);
};

jessica.greet();

////////////////////// Getters and Setters //////////////////////
console.log("--------------- Getters and Setters --------------");
/*
 * Assesor properties instead of data properties
 * In order to set a getter you pre-pend "get" in front of the function.
 * They are used like a property and not a normal method. ex) account.latest
 * This is useful when you want to read something as property but you need to complete
   some things before.

  * Setter methods need to have exactly 1 paramter
  * Setter methods are set to a value instead of the argument being passed in ex) account.latest = 50
  
  * Classes have getters and setters that work in the exact same way.
 */

const account = {
  owner: "Jonas",
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};

console.log(account.latest);
account.latest = 50;
console.log(account.movements);

console.log(jessica.age);

const walter = new PersonCl("Walter White", 1965);

////////////////////// Static Methods //////////////////////
console.log("--------------- Static Methods --------------");
/*
* A method that is attached to the constructor and not to the prototype property.
  This means that the child objects do not have access to this method.
* ex) Array.from(document.querySelectorAll("h1"));
      Number.parseFloat(12);
*/

// Static method
Person.hey = function () {
  console.log("Hey There");
};

Person.hey();
// jonas.hey(); // not in the prototype of the jonas object
PersonCl.hey();

////////////////////// Object.Create //////////////////////
console.log("--------------- Object.Create --------------");
/*

*/
