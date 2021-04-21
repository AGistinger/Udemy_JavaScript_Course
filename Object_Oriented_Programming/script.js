"use strict";

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
