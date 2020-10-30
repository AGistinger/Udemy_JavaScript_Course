/*
let js = 'amazing';
console.log(40 + 8 + 23 - 10);

//values (Piece of data)
console.log('Jonas');
console.log(23);

let first_name = "Matilda";

console.log(first_name);
console.log(first_name);
console.log(first_name);

let jonas_matilda = "JM";

let PI = 3.13159;

let my_first_job = "Programmer";
let my_current_job = "Teacher";

console.log(my_first_job);

//Value is either an object or a primitive
//Object let me = { name: 'Jonas'};
//Primitive let age = 30;

//Primitive data types
//Number - floating point numbers used for decimals and integers
//String - sequence of characters, used for text ' or "
//Boolean - logical type that can only be true or false, used for decisions
//Undefined - value taken by a variable that is not yet defined ('empty value') ex) let children;
//Null - also means 'empty value'
//Symbol - value that is unique and cannot be changed
//BigInt - larger integers than the number can hold

//Dynamic typing, you do not have to manually define the data type
//JS automatically determines the datatype of the variable

//Data types
let java_fun = true;
console.log(java_fun);

console.log(typeof true);
console.log(typeof java_fun);
console.log(typeof 50);
console.log(typeof "Adrianne");

java_fun = "Yes!";  //Reassigning a variable
console.log(typeof java_fun);

//Undefined can be both a type and a value, when you declare a empty variable it will automatically be undefined
let year;
console.log(year);
console.log(typeof year);

year = 2020;
console.log(year);
console.log(typeof year);

//error in typeof operator, type and value are null.  
console.log(typeof null);  //will be object, this is a bug that was never fixed


//let, const, var
//var is the old way of creating variables
//let and const are the modern way of creating variables
//let is used to creating variables that you can change later
let age = 30;
age = 31;

//const is used to declare variables that are not supposed to change (Immutable)
const birth_year = 2010;
//birth_year = 2020; //Will give an error
//You cannot create empty const variables
// const job; //can't create unintialized variables
//Always use const unless a variable that needs to change, good practice

//Var should be avoided (legacy)
//works similar to let
var job = "Programmer";
job = "Teacher";

//You don't have to create variables at all
last_name = "Gistinger";
consol.log(last_name);
//Bad idea creates a global object instead of in current scope.


//************Basic Operators*********
//An operator allows us to transform values or combine multiple values, work with values
//Math operators, comparison, assign, etc
//Arithmatic/Math
const now = 2037;
const age_jonas = now - 1991;
const age_sarah = now - 2020;
console.log(age_jonas, age_sarah);

// 2 ** 3 means 2 to the power of 3 = 2 * 2 * 2
console.log(age_jonas * 2, age_jonas / 10, 2 ** 3);

// You can use the + operator to join strings
const first_name = "Adrianne";
const last_name = "Gistinger";
console.log(first_name + ' ' + last_name);

// Assignment operators
let x = 10 + 5; // 15
x += 10; // x = x + 10 = 25
x *= 4; // x = x * 4 = 100
x++; // x = x + 1 = 101, increase value by 1
x--; // decrease value by 1
x--; // x = 99
console.log(x);

// Comparison operators, >, <, <=, >=
console.log(age_jonas > age_sarah); // true
console.log(age_sarah >= 18); // false

const is_adult = age_sarah >= 18;
console.log(now - 1991 > now - 2018);


// Order of operations
const now = 2037;
const age_jonas = now - 1991;
const age_sarah = now - 2020;
console.log(now - 1991 > now - 2020);

// mdn operator precedence (do a search for the table) documenation site

console.log(25 - 10 - 5); // left to right operation

// right to left operation
let x, y;
x = y = 25 - 10 - 5; // x = y = 10
console.log(x, y);

// grouping
const average_age = (age_jonas + age_sarah) / 2;
console.log(age_jonas, age_sarah, average_age);

*/

////////////////////////////////////////////////////////
// Coding challenge #1
/*
Mark and John are trying to compare their BMI (Body Mass Index), which is calculated using the 
formula: BMI = mass / height ** 2 or mass / (height * height).
(mass in kg and height in meter).

1. Store Mark's and John's mass and height in the variables
2. Calculate both their BMIs using the formula (you can even implement both versions)
3. Create a boolean variable 'markHigherBMI' containing information about whether Mark has a
higher BMI than John.

TEST DATA 1: Marks weighs 78 kg and is 1.69 m tall.
John weighs 92 kg and is 1.95 m tall.
TEST DATA 2: Mark weighs 95 kg and is 1.88 m tall.
John weighs 85 kg and is 1.76 m tall
*/

/*
function bmi(mass, height)
{
    return mass / (height * height);
};

// Test Data 1
const mark_wt = 78;
const mark_ht = 1.69;
const john_wt = 92;
const john_ht = 1.95;

const mark_bmi = bmi(mark_wt, mark_ht);
const john_bmi = bmi(john_wt, john_ht);
const mark_higher_bmi = mark_bmi > john_bmi;  // True
console.log(mark_bmi, john_bmi, mark_higher_bmi);

// Test Data 2
const mark_wt_02 = 95;
const mark_ht_02 = 1.95;
const john_wt_02 = 85;
const john_ht_02 = 1.76;

const mark_bmi_02 = bmi(mark_wt_02, mark_ht_02);
const john_bmi_02 = bmi(john_wt_02, john_ht_02);
const mark_higher_bmi_02 = mark_bmi_02 > john_bmi_02; // False

console.log(mark_bmi_02, john_bmi_02, mark_higher_bmi_02);
*/

/*
const first_name = "Adrianne";
const job = "Tester";
const birth_year = 1986;
const year = 2037;

const adrianne = "I'm " + first_name + ", a " + (year - birth_year) + " year old " + job + '!';
console.log(adrianne);

// Template literals - write a string in a more normal way
// Use back ticks `` the button above the tab button with a ${} for template literals
// This was added in ES6
const adrianne_new = `I'm ${first_name}, a ${year - birth_year} year old ${job}!`;
console.log(adrianne_new);

// You can use back ticks for all strings
console.log(`Just a regular string...`);

// You can use template literals for multi-line strings
console.log("String with \n\
multiple \n\
lines");  // Old way

console.log(`String
multiple
lines`);  //new way


// JS If/Else statements
const age = 15;

if(age >= 18) 
{
    console.log("Sarah can start driving 😎");  //Emojis windows key + period
} 
else 
{
    const years_left = 18 - age;
    console.log(`Sarah cannot start driving for ${years_left} more years 😥`);
}

const birth_year = 1991;
let century;

if(birth_year <= 2000) 
{
    century = 20;
}
else
{
    century = 21;
}
console.log(century);
*/

/////////////////////////////////////////////////////////////
// Coding Challenge #2

/*
Use the BMI example from challenge #1, and the code you already wrote and improve it:

1. Print a nice output to the console, saying who has the higher BMI.  The message can be eitehr "Mark's 
BMI is higher than John's!" or "John's VMI is higher than Mark's".
2. Use a template literal to include the BMI values in the outputs.  Example: "Mark's BMI (28.3)
is higher than John's (23.9)".
*/
/*
function bmi(mass, height)
{
    return mass / (height * height);
};

// Test Data 1
const mark_wt = 78;
const mark_ht = 1.69;
const john_wt = 92;
const john_ht = 1.95;

const mark_bmi = bmi(mark_wt, mark_ht);
const john_bmi = bmi(john_wt, john_ht);

if(mmark_bmi > john_bmi) {
    console.log(`Mark's BMI (${mark_bmi}) is higher than John's (${john_bmi}).`);
} else {
    console.log(`John's BMI (${john_bmi}) is higher than Mark's (${mark_bmi}).`);
}

// Test Data 2
const mark_wt_02 = 95;
const mark_ht_02 = 1.95;
const john_wt_02 = 85;
const john_ht_02 = 1.76;

const mark_bmi_02 = bmi(mark_wt_02, mark_ht_02);
const john_bmi_02 = bmi(john_wt_02, john_ht_02);

if(mark_bmi_02 > john_bmi_02) {
    console.log(`Mark's BMI (${mark_bmi_02}) is higher than John's (${john_bmi_02}).`);
} else {
    console.log(`John's BMI (${john_bmi_02}) is higher than Mark's (${mark_bmi_02}).`);
}
*/

// Type Conversion and Coercion
// Conversion when you manually convert from one to another
// Coercion when JS automtically changes types in the background
const input_year = "1991";
console.log(Number(input_year));  // convert string to number by using function Number()
console.log(Number(input_year) + 18);

console.log(Number("Adrianne"));  // Will equal NaN (Not a Number)
console.log(typeof NaN);

console.log(String(23), 23);  // converts a number to a string by using function String()
// You can convert to a number, string or a boolean

// Type Coercion
console.log("I am " + 23 + " years old"); // Automatically converted number to string
console.log("23" - "10" - 3);  // Automatically converted strings to numbers (- operator)
console.log("23" * "2"); // Automaticaly converts to numbers (* and / operator)
console.log("23" > "18"); // Automatically convert strings to numbers with comparison
// Only the + operator will convert to strings instead of numbers

// Guess the output
let n = '1' + 1; // will show 11
n = n - 1; // will show 10
console.log(n);

n = 2 + 3 + 4 + '5'; // 95
n = '10' - '4' - '3' - 2 + '5'; // 15
