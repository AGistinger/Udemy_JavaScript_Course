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
    this.fullName = fullName;
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
 * Works differently than constructor functions and classes.
 * Still uses prototypal inheritence and no constructor functions or new operator.
 * Instead object.create manually sets the prototype of an object to any other object.
 * First you need to have an object to be used as a prototype.
 * You create a new variable and then use Object.create(prototype); to create the new object.
 */

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  // Manually initializing object
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

// Object.create
const steven = Object.create(PersonProto);
console.log(steven);

steven.name = "Steven";
steven.birthYear = 2002;
steven.calcAge(); // prototypal inheritance

console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
sarah.init("Sarah", 1979);
sarah.calcAge();

////////////////////// Coding Challenge #2 //////////////////////
console.log("--------------- Coding Challenge #2 --------------");
/*
1. Re-create challenge 1, but this time using an ES6 class.
2. Add a getter called "speedUS" which returns the current speed in
  mi/h (divid by 1.6);
3. Add a setter called "speedUS" which sets the current speed in mi/h
  (but converts it to km/h before storing the value, by multipying the input by 1.6).
4. Create a new car and experiment with the accelerate and brake methods, and with the
  getter and setter.

DATA CAR 1: "Ford" going at 120 km/h
*/

class Vehicle {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is now doing ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is now doing ${this.speed} km/h`);
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const ford = new Vehicle("Ford", 120);
console.log(`Speed in miles per hour is ${ford.speedUS}`);
ford.speedUS = 50;
console.log(`Speed set from US to EU ${ford.speed}`);
ford.accelerate();
ford.brake();

////////////////////// Inheritance Between Classes:Constructor Functions //////////////////////
console.log(
  "--------------- Inheritance Between Classes:Constructor Functions --------------"
);
/*
 * You want the child class to share behavior from the parent class
 * In order to connect parent classes to child classes, the connecction must be
    created manually.
 * Object.create is used to create prototypes manually
 * Object.create must be done before any functions are created on the prototype object because
    assigning the child classes prototype to the parent returns an empty objecct which would 
    overwrite any functions created before this occurred.
 */

function Student(firstName, birthYear, course) {
  Person.call(this, firstName, birthYear); // uses the .call function to manually set the this keyword
  this.course = course;
}

Student.prototype = Object.create(Person.prototype); // Links the object types together (Inheritance)

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student("Mike", 2020, "Computer Science");
console.log(mike);
mike.introduce();
mike.calcAge();
console.log(mike.__proto__ === Student.prototype);
console.log(mike.__proto__.__proto__ === Person.prototype);

console.log(mike instanceof Student);
console.log(mike instanceof Person);
console.log(mike instanceof Object);

Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);

////////////////////// Coding Challenge #3 //////////////////////
console.log("--------------- Coding Challenge #3 --------------");
/*
1. Use a constructor function to implement an Electric Car (called EV) as a CHILd
   "class" of Car.  Besides a make and current speed, the EV also has the current
   battery chare in % ("charge") property).
2.  Implement a "chargeBattery" method which takes an arguement "chargeTo" and sets
   the battery charge to "chargeTo".
3. Implement an "accelerate" method that will increase the car's speed by 20, and
   decrease the charge by 1%.  Then log a message like this: "Teslate going at 140 km/h, 
   with a current charge of of 22%".
4. Create an electric car object and experiment with calling "accelerate", "brake", and
   charge battery (charge to 90%).  Notice what happens when you "accelerate". (polymorphism)

DATA CAR 1: Tesla going at 120 km/h with a charge of 23%.
*/

// Constructor function for Child Class EV
function EV(make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
}

// Link prototypes for inheritance
EV.prototype = Object.create(Car.prototype); // Creates the inheritance
EV.prototype.constructor = EV; // Sets the correct prototype constructor

EV.prototype.chargeTo = function (chargeVal) {
  this.charge = chargeVal;
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} going at ${this.speed} km/h, with a current charge of ${this.charge}%.`
  );
};

// Test Data
const tesla = new EV("Tesla", 120, 23);
console.log(tesla);
console.log(tesla.__proto__ === EV.prototype);
tesla.chargeTo(90);
tesla.brake();
tesla.accelerate();
tesla.accelerate();

////////////////////// Inheritance between Classes: ES6 Classes //////////////////////
console.log(
  "--------------- Inheritance between Classes: ES6 Classes --------------"
);
/*
* Abstraction over constructor functions
* To implement inheritence in ES6 classes you need two things:
  - extends keyword (link prototypes behind the scenes)
  - super function (constructor function of parent class, needs to happen first)
    * allows access of "this" keyword
    * If there are no additional values for the constructor then a constroctor function is not needed
      and you can just call the super function instead.
* This method can be problematic in the future (talked about in functional programming)
*/

class StudentCl extends PersonCl {
  // constructor
  constructor(fullName, birthYear, course) {
    super(fullName, birthYear); // pass in arg of parent class constructor
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }

  calcAge() {
    console.log(
      `I'm ${
        2037 - this.birthYear
      } years old, but as a student I feel more like ${
        2037 - this.birthYear + 10
      }`
    );
  }
}

const martha = new StudentCl("Martha Jones", 2012, "Computer Science");
console.log(martha);
martha.introduce();
martha.calcAge();

////////////////////// Inheritance between Classes: Object.create //////////////////////
console.log(
  "--------------- Inheritance between Classes: Object.create --------------"
);
/*
* In order to create inheritance in Object.create you create a Object.create object
  using the parent object.
  - Student inherites from person
  - Then you can use Object.create again to create a new student object
*/

const StudentProto = Object.create(PersonProto); // creates inheritance between student and person

StudentProto.init = function (firstName, birthYear, course) {
  // sets the this keyword to the this keyword inside the student
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jay = Object.create(StudentProto);
jay.init("Jay", 2010, "Computer Science");
jay.introduce();
jay.calcAge();

////////////////////// Another Class Example //////////////////////
console.log("--------------- Another Class Example --------------");
/*
 * The methods/api are the interface for the object
 */

class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;

    // Private properties
    this._movements = [];
    this._pin = pin;
    this._locale = navigator.language;

    console.log(`Thanks for opening an account, ${owner}`);
  }

  // Private Methods
  _approveLoan(val) {
    return true;
  }

  // Public Methods
  getMovements() {
    return this._movements;
  }

  deposit(val) {
    this._movements.push(val);
  }

  withdraw(val) {
    this.deposit(-val);
  }

  requestLoan(val) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved`);
    }
  }
}

const acc1 = new Account("Jonas", "EUR", 1111);
acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);
console.log(acc1.getMovements());

console.log(acc1);

////////////////////// Encapsulation: Protected Properties and Methods //////////////////////
console.log(
  "--------------- Encapsulation: Protected Properties and Methods --------------"
);
/*
 * Keeps some objects and properties private within the class so that they cannot change
   outside of the class.
 * To prevent code from outside the class from manipulating code inside the class
 * If you expose only a small API, then you can change the other interal methods with
   more confidence because then you can know external code does not rely on these private methods
   therefore the code will not break when you do internal changes.
 * JavaScript does not current support true data privacy and encapsoluation
    - There is a proposal to add truly private class fields and methods to the language
      but it is not ready
  * Current functionality fakes ecapsolation.
      * add a underscore in front of the variable or method ._deposit
 */
// See above class example

////////////////////// Encapsulation: Private Class Fields and Methods //////////////////////
console.log(
  "--------------- Encapsulation: Private Class Fields and Methods --------------"
);
/*
 * Not yet ready currently in stage 3, not part of JavaScript language
 * Classes will start to have abilities that they did not have with constructor functions
 * 4 different kinds of fields and methods:
   - Public fields
   - Private fields
   - Public methods
   - Private methods

  * Fields
    - properties that are going to be on all objects that are created for all instances
    - referenceable by the "this" keyword
    - putting a "#" in front of a variable makes it private

  * Methods
     - private methods hide implementation from the outside
     - putting a "#" in front of a method will make it private (currently doesn't work)

    
  * There is also static fields and classes for private and public
  * "static" is used for helper functions and will not be available on all instsances
    but only the class itself.
 */

class Account2 {
  // Public fields (instances)
  locale = navigator.language;

  // Private fields (instances)
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;

    // Private properties
    this.#pin = pin;

    console.log(`Thanks for opening an account, ${owner}`);
  }

  // Private Methods
  #approveLoan(val) {
    return true;
  }

  // Public Methods
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
  }

  withdraw(val) {
    this.deposit(-val);
  }

  requestLoan(val) {
    if (this.#approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved`);
    }
  }

  // Static Methods
  static helper() {
    console.log("Helper");
  }
}

const acc2 = new Account2("Jonas", "EUR", 1111);
acc2.deposit(250);
acc2.withdraw(140);
acc2.requestLoan(1000);
console.log(acc2.getMovements());
Account2.helper();

////////////////////// Chaining Methods //////////////////////
console.log("--------------- Chaining Methods --------------");
/*

*/
