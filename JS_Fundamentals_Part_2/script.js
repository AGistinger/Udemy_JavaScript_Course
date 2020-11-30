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
/*
// Arrow Function
const years_until_retirement = (birth_year, first_name) =>
{
    const age = 2037 - birth_year;
    const retirement = 65 - age;
    return `${first_name} retires in ${retirement} years`;
}
*/
/*
// Function Expressions
const calc_age = function(birth_year)
{
    return 2037 - birth_year;
}

const years_until_retirement = function (birth_year, first_name)
{
    const age = calc_age(birth_year);
    const retirement = 65 - age;

    if(retirement > 0)
    {
        return retirement;
    } else
    {
        return -1;
    }
}
console.log(years_until_retirement(1991, "Jonas"));
console.log(years_until_retirement(1950, "Mike"));
*/
/*
// Function Statement
function calc_age(birth_year, first_name)
{
    const age = 2037 - birth_year;
    console.log(`${first_name} is ${age} years old`);
    return age;
}
const age = calc_age(1991, "Jonas");
*/

/////////////////////////////////////////////////////////////////////////////
// Coding Challenge #1

/*
Back to the two gymanstics teams, the Dolphins and the Koalas!  There is a new
gymnastics disciple, which works differently.
Each team competes 3 times, and then the average of the 3 scores is calculated
(so one average score per team).
A team ONLY wins if it has at least DOUBLE the average score of the other team.
Otherwise, no team wins!

1. Create an arrow function 'calc_average' to calculate the average of 3 scores.
2. Use the function to calculate the average for both teams.
3. Create a function 'check_winner' that takes the average score of each team as parameters
('avg_dolphins' and 'avg_koalas'), and then log the winner to the console, together
with the victory points, according to the rule above.  Example: "Koalas win (30 vs. 13)".
4. Use the 'check_winner' function to determine the winner for both Data 1 and Data 2.
5. Ignore draws at this time.

Test data 1: Dolphins score 44, 23 and 71.  Koalas score 65, 54, and 49.
Test data 2: Dolphins score 85, 54, and 41.  Koalas score 23, 34, and 27.
*/
/*
const calc_average = (num_01, num_02, num_03) => (num_01 + num_02 + num_03) / 3;
// const avg_dolphins = calc_average(44, 23, 71);
// const avg_koalas = calc_average(65, 54, 49);
 const avg_dolphins = calc_average(85, 54, 41);
 const avg_koalas = calc_average(23, 34, 27);

function  check_winner(avg_dolphins, avg_koalas)
{
    if(avg_dolphins >= avg_koalas*2)
    {
        console.log(`Dolphins win (${avg_dolphins} vs. ${avg_koalas})`);
    } else if(avg_koalas >= avg_dolphins*2)
    {
        console.log(`Koalas win (${avg_koalas} vs. ${avg_dolphins})`);
    } else
    {
        console.log("No team wins...")
    }
}

check_winner(avg_dolphins, avg_koalas);
*/
/*
// Introduction to Arrays
const friend1 = "Micheal";
const friend2 = "Steve";
const friend3 = "Peter";

// An array is a big container that you can put variables and then reference them
const friends = ["Micheal", "Steve", "Peter"];
console.log(friends);

// Here is a different way of writing a array, this is the Array Function
const y = new Array(1991, 1984, 2008, 2020);

// The below console will print the 0 element in the array
console.log(friends[0]);

// You can get the number of elements in the array
// This will give the number of elements in the array
console.group(friends.length);

// You can get the last element in a array example below
console.log(friends[friends.length - 1]);

// Add elements to the array / Mutate the array
friends[2] = "Jay";  // Replace Peter with Jay
console.log(friends);

// Only primitive values are immutable, you are able to mutate arrays even though they are defined
// as const, you cannot replace the entire array.
// friends = ["Bob", Alice"];

// An array can hold values with different types at the same time
const first_name = "Jonas";
const jonas = [first_name, "Schmedtmann", 2037 - 1991, "teacher", friends];
console.log(jonas);
console.log(jonas.length);

// Array exercise
function calc_age(birth_year)
{
    return 2037 - birth_year;
}

const years = [1990, 1967, 2002, 2010, 2018];

const age1 = calc_age(years[0]);
const age2 = calc_age(years[1]);
const age3 = calc_age(years[years.length - 1]);
console.log(age1, age2, age3);

const ages = [calc_age(years[0]), calc_age(years[1]), calc_age(years[years.length - 1])];
console.log(ages);


// Basic Array Operations / Methods
const friends = ["Micheal", "Steven", "Peter"];

///// Add elements
// Push, will add elements to the end of the array
friends.push("Jay");
console.log(friends);

// Push will return the value of the length of the array
const new_length = friends.push("Alex");
console.log(new_length);

// Unshift will add elements to the beginning of the array
friends.unshift("John");
console.log(friends);

///// Remove elements
// Pop, will remove the last element in the array
friends.pop(); // doesn't need arguments
console.log(friends);

// Pop will return the removed element
const popped = friends.pop();
console.log(popped); // "Jay";
console.log(friends);

// shift, will remove the first element of the array
friends.shift(); // does not need arguments and will also return the element that was removed
console.log(friends);

/////// Methods
// indexOf will return the index that the element is located
console.log(friends.indexOf("Steven"));
console.log(friends.indexOf("Bob"));  // If the element does not exist -1 will be returned

// includes, will return true if the element is in the array and false if it is not (uses strict equality)
console.log(friends.includes("Steven"));
console.log(friends.includes("Bob"));

if(friends.includes("Peter"))
{
    console.log("You have a friend called Peter");
}
*/

/////////////////////////////////////////////////////////////////////////////
// Coding Challenge #2

/*
Steven is still building his tip calculator, using the same rules as before: tip 15% of the bill if
the bill value is between 50 and 300, and if the value is different, the tip is 20%.

1. Write a function "calc_tip", that takes any bill value as an input and returns the 
corresponding tip, calculated based on the rules above (you can check out the code from the first tip
calculator if you need to).  Use the function type you would like the most.  Test the function using
a bill value of 100.
2. And now lets use arrays!  So create an array 'bills' containing the test data below.
3. Create an array 'tips' containing the tip value for each bill, calculated from the function you 
created before.
4. Bonus: Create an array 'total' containing the total values, so the bill + the tip.

Test Data: 125, 555, and 44
*/
/*
function calc_tip(x)
{
    return x >= 50 && x <= 300 ? x * .15 : x * .2;
}

const calc_total = (x, y) => x + y;

const bills = [125, 555, 44];
const tips = [calc_tip(bills[0]), calc_tip(bills[1]), calc_tip(bills[2])];
const totals = [calc_total(bills[0], tips[0]), calc_total(bills[1], tips[1]), calc_total(bills[2], tips[2])];

console.log(bills, tips, totals);
*/
/*
// Introduction to Objects
// Data structure that defines key/value pairs, objects use {} instead of [] like arrays
// You assign a name to each value
// Each key is a propery of the object property first_name has a value of "Adrianne"
// Below is the object literal syntax
// Objects are used to group together different variables that belong together
// In objects the order of the content does not matter, unlike arrays
// You can only access array elements by their index, used for structured ordered data
// Objects are used from unstructured, unordered data
const adrianne = 
{
    first_name : "Adrianne",
    last_name : "Gistinger",
    age : 2020 - 1986,
    job : "Software Engineer",
    friends : ["Micheal", "Peter", "Steven"]
};
console.log(adrianne);

// Dot vs. Bracket Notation
// Dot notation, you are able to get the value by doing object.property_name
// The dot is an operator used on an object
console.log(adrianne.last_name);

// Brackets notation
// The bracket notion expects a pair of [] with a string of the key property name
// You can put any expression into the brackets to get the key
console.log(adrianne["last_name"]);

const name_key = "name";
console.log(adrianne["first_" + name_key]); // will concatanate first_ + the name
console.log(adrianne["last_" + name_key]);

// You are not able to write expressions with the dot notation only the braket notation

// If you don't know which property you want to show
const interested_in = prompt("What do you want to know about Adrianne?  Choose between first_name, last_name, age, job, and friends."); // built in function that creates a pop-up window with a text field
console.log(interested_in);

console.log(adrianne[interested_in]);

// How to check for a incorrect value returned by the user
if(adrianne[interested_in]) // will return a true/false value
{
    console.log(adrianne[interested_in]);
} else
{
    console.log("Incorrect value entered");
}

// Add new properties to a object
// dot notation
adrianne.location = "United States";

// bracket notation
adrianne["car"] = "2010 Chevy Camaro 2LT RS";
console.log(adrianne);

// Challenge objects
// "Jonas has 3 friends, and his friend is called Micheal"
// Write this sentence without hard coding any of the values
console.log(`${adrianne.first_name} has ${adrianne.friends.length} friends, and her best friend is called
${adrianne.friends[0]}`);
*/
/*
// Object Methods
// You have to use function expressions in objects, no other function methods will work
const adrianne = 
{
    first_name : "Adrianne",
    last_name : "Gistinger",
    birth_year : 1986,
    job : "Software Engineer",
    friends : ["Mark", "Ark", "PB"],
    has_drivers_license : true,

    // calc_age : function(birth_year) { return 2037 - birth_year; }  // function expression, function value
    calc_age : function()
    {
        this.age = 2037 - this.birth_year; // Refers to this object
        return this.age; // You do not need to return here, but it is best practice
    },

    // Prints a summary to the console
    get_summary : function()
    {
        return `${this.first_name} is a ${this.calc_age()}-year old ${this.job}, and ${this.has_drivers_license ? "has" : "Does not have"} a drivers license.`;
    }
};

// Dot notation
// console.log(adrianne.calc_age(adrianne.birth_year));
console.log(adrianne.calc_age()); // Using 'this' keyword

// Bracket notation
// console.log(adrianne["calc_age"](adrianne["birth_year"]));
console.log(adrianne["calc_age"]()); // Using 'this' keyword

// Storing a new variable within a object using a function
console.log(adrianne.age);

////////////////////////////////
// Mini Challenge Objects
/*
Write a method called get summary that will return a string that will summarize the data from
the object. ex) "Jonas is a 46-year old teacher. and has a drivers license."
*/
// console.log(adrianne.get_summary());

//////////////////////////////////////////////////////////////////////////////
// Coding Challenge #3

/*
Let's go back to Mark and John comparing their BMIs!
This time, let's use objects to implement the calculations! 
Remember: BMI = mass / (height * height).  (mass in kg and height in meter)

1. For each of them, create an object with properties for their full name, mass,
and height (Mark Miller and John Smilth)
2. Create a 'calc_bmi' Method on each object to calculate the BMI (the same method on both objects).
Store the BMI value to a property, and also return it from the method.
3. Log to the console who has the higher BMI,
together with the full name and the respective BMI.
Example: "John Smith's BMI (28.3) is higher than Mark Millers (23.9)!"

Test Data: Mark weighs 78 kg and is 1.69 m tall.
John weighs 92 kg and is 1.95 m tall.
*/
/*
// Mark Miller Object
const mark = 
{
    first_name : "Mark",
    last_name : "Miller",
    weight : 78,
    height : 1.69,

    calc_BMI : function()
    {
        this.bmi = this.weight / (this.height * this.height);
        return this.bmi;
    }
};

// John Smith Object
const john = 
{
    first_name : "John",
    last_name : "Smith",
    weight : 92,
    height : 1.95,

    calc_BMI : function()
    {
        this.bmi = this.weight / (this.height * this.height);
        return this.bmi;
    }
};

// Function to compare the bmi of both objects
function compare_bmi(obj1, obj2)
{
    obj1.calc_BMI();
    obj2.calc_BMI();

    if(obj1.bmi < obj2.bmi)
    {
        return `${obj1.first_name} ${obj1.last_name}'s BMI (${obj1.bmi}) is higher than ${obj2.first_name} ${obj2.last_name}'s (${obj2.bmi})!)`;
    } else
    {
        return `${obj2.first_name} ${obj2.last_name}'s BMI (${obj2.bmi}) is higher than ${obj1.first_name} ${obj1.last_name}'s (${obj1.bmi})!)`;
    }
}

console.log(compare_bmi(mark, john));
*/
/*
// Iteration : The For Loop
// Allows you to automate repeatitive tasks
// For loop keeps running while condition is true
for(let rep = 1; rep <= 10; rep++)
{
    console.log(`Lifting weights repitition ${rep}`);
}

// Looping Arrays, Breaking, and Continuing
const adr_array = 
[
    "Adrianne",
    "Gistinger",
    2037 - 1991,
    ["Mark", "Brian", "Jessica"],
    true
];

const types = []; // empty array

for(let i = 0; i < adr_array.length; i++)
{
    console.log(adr_array[i], typeof adr_array[i]);

    // Filling types array
    // types[i] = typeof adr_array[i];
    types.push(typeof adr_array[i]);
}

console.log(types);

const current_year = 2037;
const years = [1991, 2007, 1969, 2020];
const ages = [];

for(let i = 0; i < years.length; i++)
{
    ages.push(current_year - years[i]);
}
console.log(ages);

// Continue and Break
// Continue is to exit the current iteration of the loop and continue to the next one
// Break is to exit the whole loop
console.log("----------ONLY STRINGS------------");
for(let i = 0; i < adr_array.length; i++)
{
    if(typeof adr_array[i] !== "string") continue;
    console.log(adr_array[i], typeof adr_array[i]);
}

console.log("----------BREAK WITH NUMBER------------");
for(let i = 0; i < adr_array.length; i++)
{
    if(typeof adr_array[i] === "number") break;
    console.log(adr_array[i], typeof adr_array[i]);
}


// Looping Backwards and Loops in Loops
// Looping Backwards
const adr_array = 
[
    "Adrianne",
    "Gistinger",
    2037 - 1991,
    "Software Engineer",
    ["Mark", "Brian", "Jessica"],
    true
];

for(let i = adr_array.length-1; i >= 0; i--)
{
    console.log(i, adr_array[i]);
}

// Loop inside of a Loop
for(let i = 1; i <= 3; i++)
{
    console.log(`--------Starting Exercise ${i}`);
    for(let x = 1; x <= 5; x++)
    {
        console.log(`Exercise ${i}, Lifting Reptition ${x}`);
    }
}

// While Loop
// While loops only need a condition that will keep running if it is true
let rep = 1;
while(rep <= 10)
{
    console.log(`Lifting weights repitition ${rep}`);
    rep++;
}

// While loop without a counter
// roll a dice until you get a 6
let dice = Math.trunc(Math.random() * 6) + 1;  // Math.random() creates a number between 0 and 1
// Math.trunc(number) will round a number
while(dice !== 6)
{
    dice = Math.trunc(Math.random() * 6) + 1;
    console.log(`You rolled a ${dice}`);
    if(dice === 6) console.log("Loop is about to end....");
}

// While loop should be used when you don't know how many iterations you need
*/

////////////////////////////////////////////////////////////////////
// Coding Challenge #4

/*
Let's improve Steven's tip calculator even more, this time using loops!

1. Create an array 'bills' containing all 10 test bill values
2. Create empty arrays for the tips and the totals 'tips' and 'totals'
3. Use the 'calc_tip' function we wrote before (no need to repeat) to
calculate tips and total vluaes (bill + tip) for every bill value in the bills array.
Use a loop to perform the 10 calculations!

TEST DATA: 22, 295, 176, 440, 37, 105, 10, 1100, 86, and 52.

HINT: Call calc_tip in the lop and use the push method to add values to the tips and total arrays

4. BONUS: Write a function 'calc_average' which takes an array called 'arr' as an argument.
This function calculates the average of all numbers in the given array.  This is a DIFFICULT challenge
(we haven't done this before)! Here is how to solve it:
4.1. First, you will need to add up all the values in the array.  To do the additon,
start by creating a variable 'sum' that starts at 0.  The loop over array using a for loop.
In each iteration, add the current value to the 'sum' variable.  This way by the end of the 
loop, you will have all the values added together.
4.2. To calculate the average, divide the sum you calculated before by the length of the array
(because that's the number of elements)
4.3. Call the function with the 'totals' array
*/

// If bill is between 50 and 300 the tip will be 15%, else the tip is 20%
function calc_tip(x)
{
    return x >= 50 && x <= 300 ? x * .15 : x * .2;
}

function calc_average(arr)
{
    let sum = 0;
    for(let i = 0; i < arr.length; i++)
    {
        sum += arr[i];
    }
    return sum / arr.length;
}

const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips = [];
const totals = [];

for(let i = 0; i < bills.length; i++)
{
    const tip = calc_tip(bills[i]);
    tips.push(tip);
    totals.push(tip + bills[i]);
}

console.log(`Bills: ${bills}, 
Tips: ${tips}, 
Totals: ${totals},
Average: ${calc_average(totals)}`);
