// Strict mode - for secure JS code, must be the first code used
'use strict';

// It makes it easier to avoid accidental errors in code
// It forbids you from doing certain things
// Will show visible errors in situations to show mistakes
/*
let has_drivers_license = false;
const pass_test = true;

if(pass_test)
{
    has_drivers_license = true;
}

if(has_drivers_license)
{
    console.log("I can drive :)");
}
*/
// const interface = "Audio";  // strict mode reserved word, may be used by JS in the future
// const private = 534;  // also reserved word
/*
// Functions
// Piece of code that you can reuse over and over
function logger()
{
    // Function body
    console.log("My name is Adrianne");
}

logger(); // Use function, invoking, running, calling, executing
logger();
logger();

function fruit_processor(apples, oranges)
{
    const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
    return juice; // return value
}

const apple_juice = fruit_processor(5, 0); // Call function with arguments/parameters/values
console.log(apple_juice);
console.log(fruit_processor(2, 3)); // Value not captured

const apple_orange_juice = fruit_processor(2, 4);
console.log(apple_orange_juice);

const num = Number('23');  // Function that returns a string as a number


// Function Declarations vs. Expressions
// Function Declaration
function calc_age_01(birth_year)
{
    return 2037 - birth_year;
}

const age_01 = calc_age_01(1991);  // An argument is what replaces the placeholder parameter
console.log(age_01);

// Function Expression 
// Function without a name, produces a value
const calc_age_02 = function (birth_year)
{
    return 2037 - birth_year;
}

const age_02 = calc_age_02(1991);
console.log(age_01, age_02);

// The difference between the two is that declarations can be called before they are defined.
// You cannot call an expression before it is declared.


// Arrow Functions (ES6)
// A variant of function expression that makes function expressions easier to write
// Doesn't need curly braces and doesn't need the return.
const calc_age_03 = birth_year => 2037 - birth_year;

const age_03 = calc_age_03(1991);
console.log(age_03);

// Example multiple parameters and multiple lines of code
// You can only ommit the return if the function is one line, if it is more lines you have to call return
const years_until_retirement = (birth_year, first_name) =>
{
    const age = 2037 - birth_year;
    const retirement = 65 - age;
    return `${first_name} retires in ${retirement} years.`;
}
console.log(years_until_retirement(1991, "Adrianne"));
console.log(years_until_retirement(1980, "Bob"));

// Arrow functions do not get the "this" keyword


// Functions Calling other Functions
function cut_fruit_pieces(fruit)
{
    return fruit * 4;
}

function food_processor(apples, oranges)
{
    const apple_pieces = cut_fruit_pieces(apples);
    const orange_pieces = cut_fruit_pieces(oranges);
    return `Juice with ${apple_pieces} apple pieces and ${orange_pieces} orange pieces.`;
}

console.log(food_processor(2, 3));
*/

// Reviewing Functions
