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
