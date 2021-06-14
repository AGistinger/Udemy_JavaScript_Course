"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////

/////// Asynchronous JavaScript ///////
/*
 Synchronous Code
 - The code executed line by line in the order of execution.
 - There can be issues when code takes a long time to run.
 - Each line of code waits for the previous line to finish.
 - If a line can't run the code is blocked and won't continue until the previous line is complete.
 
 Asynchronous Code
 - Code that is executed after a tasks that runs in the "background" finishes.
 - Code is non-blocking
 - Execution doesn't wait for an asynchrnous task to finish its work.
 - Coordinating behavior of a program over a period of time.
 - Callback functions alone do not make code asynchronous.
 - img.src is a asynchronous action.
   * you can listen for the "load" event on an image and then provide a callback function.
 - Event listeners alone do not make code asynchronous.

 Ajax
 - Asynchronous JavaScript and XML
 - Allows us to communicate with remove web servers in an asynchronous way.
 - With Ajax calls, we can request data from web servers dynamically.
 - Asks for Data (Request/Get/Post) gets a (Response)

 API
 - Application Programming Interface
 - Piece of software that can be used by another piece of software, in order to
   allow applications to talk to each other.
 - There are many types of APIs in web development (DOM API/GeoLocation API/Class API)
 - Online or Web API is a application running on a server, that receives requests for data,
   and sends data back as a response.
 - We can build our ownw web APIs (requires back-end development, e.g. with node.js) or use
   3rd-party APIs.
 - Most popular API data format is now JSON and not XML.
*/

/////////////////////////////////////////////

// function getCountryData(country) {
//   // XMLHttpRequest call (oldschool way) stores result in a variable
//   const request = new XMLHttpRequest();

//   // Open a request ("type", "string of URL to where the AJAX call is made")
//   request.open("GET", `https://restcountries.eu/rest/v2/name/${country}`);

//   // Send a request (done in the background)
//   request.send();

//   // Wait for the load event to execute code
//   request.addEventListener("load", function () {
//     const [data] = JSON.parse(this.responseText); // Convert JSON to JS object
//     console.log(data);

//     const html = `
//     <article class="country">
//           <img class="country__img" src="${data.flag}" />
//           <div class="country__data">
//             <h3 class="country__name">${data.name}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(
//               Number(data.population) / 1000000
//             ).toFixed(1)} million</p>
//             <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//             <p class="country__row"><span>💰</span>${
//               data.currencies[0].name
//             }</p>
//           </div>
//         </article>
//         `;

//     countriesContainer.insertAdjacentHTML("beforeend", html);
//     countriesContainer.style.opacity = 1;
//   });
// }

// getCountryData("portugal");
// getCountryData("usa");

////////////////////////////////////////////////////////////////////
//// Welcome to Callback Hell ///////

// Having one callback function inside of another one (nested callbacks)
function renderCountry(data, className = "") {
  const html = `
    <article class="country ${className}">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              Number(data.population) / 1000000
            ).toFixed(1)} million</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
          </div>
        </article>
        `;

  countriesContainer.insertAdjacentHTML("beforeend", html);
  // countriesContainer.style.opacity = 1;
}

// function getCountryAndNeighbor(country) {
//   // XMLHttpRequest call (oldschool way) stores result in a variable
//   const request = new XMLHttpRequest();

//   // Open a request ("type", "string of URL to where the AJAX call is made")
//   request.open("GET", `https://restcountries.eu/rest/v2/name/${country}`);

//   // Send a request (done in the background)
//   request.send();

//   // Wait for the load event to execute code
//   request.addEventListener("load", function () {
//     const [data] = JSON.parse(this.responseText); // Convert JSON to JS object
//     console.log(data);

//     // Render Country Main
//     renderCountry(data);

//     // Get Neighbor Country
//     const neighbor = data.borders[0];

//     if (!neighbor) return;

//     const requestNeighbor = new XMLHttpRequest();

//     // Open a request ("type", "string of URL to where the AJAX call is made")
//     requestNeighbor.open(
//       "GET",
//       `https://restcountries.eu/rest/v2/alpha/${neighbor}`
//     );

//     // Send a request (done in the background)
//     requestNeighbor.send();

//     requestNeighbor.addEventListener("load", function () {
//       const data2 = JSON.parse(this.responseText); // Country codes do not return an array
//       renderCountry(data2, "neighbour");
//     });
//   });
// }

// getCountryAndNeighbor("usa");

// Callback hell example
// Callback hell can be easily identified by the triangle shape of the code
// Makes code look messy, hard to maintain and understand
// setTimeout(() => {
//   console.log("1 second passed");
//   setTimeout(() => {
//     console.log("2 seconds passed");
//     setTimeout(() => {
//       console.log("3 seconds passed");
//       setTimeout(() => {
//         console.log("4 seconds passed");
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

////////////////////////////////////////////////////////////////////
//// Promises and the Fetch API ///////

// Fetch function you can pass in the URL and options (returns a promise)
const request = fetch(`https://restcountries.eu/rest/v2/name/portugal`); // promise

/*
 What is a Promise? (ES6 / 2015)
  - An object that is used as a placeholder for the future result of an
    asynchronous operation.
  - A container for an asynchrounously delivered value.
  - A container for a future value. (ex. response coming from AJAX call)
  - Example) Promise that I will receive money if I guess the correct outcome (lottery ticket)
    * I buy lottery ticket (promise) right now
    * Lottery draw happens asynchronously
    * If correct outcome, I receive money, because it was promised
  - By using Promises we no longer need to rely on events and callbacks passed
    asynchronous functions to handler asynchronous results.
  - Instead of nesting callbacks, we can chain promises for a sequence of
    asynchronous operations: escaping callback hell.
  - Promises are only fullfilled once

  The Promise Lifecycle:
   - Pending (before the future value is available)\
     - Async task running
   - Settled (asynchronous task has finished)
     - Fullfilled (successfully got the data)
     - Rejected (an error happened)

   - Build promise, (fetch API returns promise)
   - Consume promise, (promise was settled ex) data returned)
*/

////////////////////////////////////////////////////////////////////
//// Consuming Promises ///////

// Then method will execute a callback method as soon as the promise is fullfilled
// function getCountryData(country) {
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//     .then(function (response) {
//       // json() is available on all response objects will also return promise
//       // that promise will also need a then method
//       // callback functions can be arrow functions
//       return response.json();
//     })
//     .then(function (data) {
//       renderCountry(data[0]);
//     });
// }

// getCountryData("portugal");

////////////////////////////////////////////////////////////////////
//// Chaining Promises ///////
// function getCountryData(country) {
//   // Country
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//     .then((response) => response.json())
//     .then((data) => {
//       renderCountry(data[0]);
//       const neighbor = data[0].borders[0];
//       if (!neighbor) return;

//       // Countries neighbor (returns promise)
//       return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbor}`);
//     })
//     .then((response) => response.json())
//     .then((data) => renderCountry(data, "neighbour"));
// }

// getCountryData("portugal");

////////////////////////////////////////////////////////////////////
//// Handling Rejected Promises ///////
/*
  Adding a catch method at the end of the chain will have the error
  propagage through the chain.

  Besides then and catch there is a finally() method, used for something
  that always needs to happen, no matter what the result of the promise.
  ex) hide a loading spinner.
*/
function renderError(msg) {
  countriesContainer.insertAdjacentText("beforeend", msg);
  // countriesContainer.style.opacity = 1;
}

function getCountryData(country) {
  // Country
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then((response) => response.json())
    .then((data) => {
      renderCountry(data[0]);
      const neighbor = data[0].borders[0];
      if (!neighbor) return;

      // Countries neighbor (returns promise)
      return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbor}`);
    })
    .then((response) => response.json())
    .then((data) => renderCountry(data, "neighbour"))
    .catch((err) => {
      console.error(`${err} 🔥🔥🔥🔥🔥`);
      renderError(`Something went wrong 🔥🔥🔥 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
}

btn.addEventListener("click", function () {
  getCountryData("portugal");
});

getCountryData("asldkjfas");
