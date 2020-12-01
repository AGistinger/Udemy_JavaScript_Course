// Remember, we're gonna use strict mode in all scripts now!
"use strict";

/*
const x = 23;

if (x === 23) console.log(23);

if (x !== 5) {
  console.log("x is not equal to 5");
} else {
  console.log("x is equal to 5");
}

const calc_age = (birth_year) => 2037 - birth_year;

console.log("xyz");

console.log(calc_age(1991));
console.log(2005);
*/

// Learning to Code
// Process of coding, developer skills
/*
How to Fail....
- Don't have a clear goal
- Started courses and tutorials and would copy code without caring how it works
- Didn't reinforce what was learned in the course by doing small challenges or taking notes
- Dont' come up with his own project ideas

How to Succeed....
- Set a goal for yourself
- Understand the code that you are typing
- Take notes, try to challenge yourself
- Practice on your own
- Come up with your own project ideas
- Don't get stuck of tutorial hell

Think like a Developer: Become a Problem Solver
- Stay calm and slow down
- Take a logical and rational approach
- Use 4-Step framework
  * Make sure you 100% understand the problem
  * Divide and conquer: break a big problem into smaller pieces
  * Don't be afraid to do research
  * Write psuedo-code before writing the actual code
*/

// Solving a Real World Problem
// Using Google, StackOverflow, and MDN
// Problem:
/*
We work for a company building a smart home thermometer.  Our most recent task
is this: "Given an array of temperatures of one day, calculate the temperature amplitude."
Keep in mind that sometimes there might be a sensor error.
*/

const temperatures_01 = [3, -2, -6, -1, "error", 9, 13, 17, 15, 14, 9, 5];
const temperatures_02 = ["error", 20, 25, 10, 35, 50, 30, 31, 22, 15, 45];

// 1) Understanding the problem
// What is the temperature amplitude? difference between highest and lowest temps in the array
// How to compute max and min temperatures?
// What is a sensor error? and what to do?

// 2) Breaking up into sub-problems
// How to ignore errors?
// Find max value in temp array
// Find min value in temp array
// subtract min from max and return it
// const calc_temp_amplitude = function (temps) {};
function calc_temp_amplitude(temps1, temps2) {
  const temps = temps1.concat(temps2);

  let max = temps[0];
  let min = temps[0];

  for (let i = 0; i < temps.length; i++) {
    const cur_temp = temps[i];
    if (typeof cur_temp !== "number") continue;
    if (cur_temp > max) {
      max = cur_temp;
    }
    if (cur_temp < min) {
      min = cur_temp;
    }
  }
  return max - min;
}

const amplitude = calc_temp_amplitude(temperatures_01, temperatures_02);
console.log(amplitude);

// Problem 2:
// Function should now receive 2 arrays of temperatures
// - with 2 arrays, should we implement the same functionality twice?
//  * merge the two arrays at the beginning
// - How to merge 2 arrays?

// Debugging (Fixing Errors)
// Any unexpected or unintended behavior

// Debugging with the Console and Breakpoints
function measure_kelvin() {
  const measurement = {
    type: "temp",
    unit: "celsius",
    // C) Fix bug
    //value: Number(prompt("Degrees celcius:")),
    value: 10,
  };

  // B) Find Bug
  console.table(measurement);

  const kelvin = measurement.value + 273;
  return kelvin;
}

// A) Identify bug
console.log(measure_kelvin());

/////////////////////////////////////////////////////////////////////
// Coding Challenge #1

/*
Given an array of forecasted maximum temperatures, the termometer displays a string
with these temperatures.

Example: [17, 21, 23] will print "... 17C in 1 days... 21C in 2 days ... 23C in 3 days..."

Create a function 'print_forecast' which takes in an array 'arr' and logs a string like above to the console.

Use the problem-solving framework: Understand the problem and break it up into sub-problems.

TEST DATA 1: [17, 21, 23];
TEST DATA 2: [12, 5, -5, 0, 4]
*/

const temps_01 = [17, 21, 23];
const temps_02 = [12, 5, -5, 0, 4];

function print_forecast(temps) {
  let forecast = "... ";
  for (let i = 0; i < temps.length; i++) {
    forecast += `${temps[i]}°C in ${i + 1} days ... `;
  }
  console.log(forecast);
}

print_forecast(temps_01);
print_forecast(temps_02);
