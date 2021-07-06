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

  catch can use a err object.  The error object has a message property that
  can be used to show the message to the user.

  The finally method will be called whether the promise was fullfilled or
  rejected.  Used for something that always needs to happen no matter the 
  result of the promise. (not always useful)
*/
function renderError(msg) {
  countriesContainer.insertAdjacentText("beforeend", msg);
  // countriesContainer.style.opacity = 1;
}

function getJSON(url, errorMsg = "Something went wrong") {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(`${errorMsg} (${response.status})`);
    }
    return response.json();
  });
}

function getCountryData(country) {
  // Country
  getJSON(
    `https://restcountries.eu/rest/v2/name/${country}`,
    "Country not found"
  )
    .then((data) => {
      renderCountry(data[0]);
      const neighbor = data[0].borders[0];
      if (!neighbor) throw new Error("No neighbour found!");

      // Countries neighbor (returns promise)
      return getJSON(
        `https://restcountries.eu/rest/v2/alpha/${neighbor}`,
        "Country not found"
      );
    })
    .then((data) => renderCountry(data, "neighbour"))
    .catch((err) => {
      console.error(`${err}`);
      renderError(`${err.message}`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
}

// btn.addEventListener("click", function () {
//   getCountryData("portugal");
// });

// getCountryData("australia"); // Will get error

////////////////////////////////////////////////////////////////////
//// Throwing Errors Manually ///////
/*
You can throw a custom error by writing
  throw new Error(`Text`);

Throw will cause promises to immediately reject.

It is important to handle all possible errors for the user.
*/

////////////////////////////////////////////////////////////////////
//// Coding Challenge #1 ///////
/*
In this hcallenge you will build a function "whereAmI" which renders a 
country ONLY based on GPS coordinates.  For that, you will use a 
second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function "whereAmI" which takes as inputs a latitude value
(lat) and a longitude value (lng), (these are GPS coordinates, examples are below).
2. Do "reverse geocoding" of the provided coordinates.  Reverse geocoding
means to convert coordinates to a meaningful location, like a city and
country name.  Use this API to do reverse geocoding:
https://geocode.xyz/api
The AJAX call will be done to a URL with this format:
https://geocode.xyz/52.508, 13.381?geoit=json
Use the fetch API and the promises to get the data.  Do NOT use the getJSON
function we created, that is cheating.
3. Once you have the data, take a look at it in the console to see all the 
attributes that you recieved about the provided location.  Then, using 
this data, log a message like this to the console: `Your are in Berlin, Germany`.
4. Chain a .catch method to the end of the promise chain and log errors to 
the console.
4. This API allows you to make only 3 requests per second.  If you reload fast, you 
will get this error with code 403.  This is an error with the request.
Remember, fetch() does NOT reject the promise in this case.  So create an error
to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the recieved dtata to render a country.  So take the
revelant attribute from the geocoding API result, and plug it into the 
countries API that we have been using.
7.  Render the country and catch any errors, just like we have done in the last
lecture (you can even copy this code, no need to type the same code).

TEST COORDINATES 1: 52.508, 13.381 (latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 3: -33.933, 18.474
*/
function getLocation() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

function renderFailure(msg) {
  countriesContainer.insertAdjacentHTML("beforeend", msg);
}

function getAPIdata(url, errmsg = "Failed to obtain API data") {
  return fetch(url).then((response) => {
    // response
    if (!response.ok) {
      throw new Error(`${errmsg} (${response.status})`);
    }
    // return data
    return response.json();
  });
}

function whereAmI() {
  getLocation().then((pos) => {
    const { latitude: lat, longitude: lng } = pos.coords;

    getAPIdata(`https://geocode.xyz/${lat}, ${lng}?geoit=json`)
      .then((data) => {
        console.log(`You are in ${data.city}, ${data.country}`);
        getCountryData(data.country); // use restcountries api to change coords into country
      })
      .catch((err) => {
        console.error(err);
        renderFailure(`${err.message}`);
      });
  });
}

// btn.addEventListener("click", whereAmI(lat, lng));
btn.addEventListener("click", whereAmI);

////////////////////////////////////////////////////////////////////
//// The Event Loop in Practice ///////
/*
The lines of code created outside of any callback loops will execute first,
then the timeout call back and promise will execute at the same time.

However since the promise callback is a microtask it will execute before, 
any normal callback functions.

Microtasks queue has priority of Callback queue.

setTimeout() method is not a garentee that the timer will run at the time set,
it will only not run before the time, but may run later, due to other tasks.
*/

console.log("Test start");
setTimeout(() => console.log(`0 sec timer`), 0); // Calls timer function after 0 seconds

// Create a promise that is immediately resolved
Promise.resolve("Resolved promise 1").then((res) => console.log(res));

Promise.resolve("Resolved promise 2").then((res) => {
  for (let i = 0; i < 1000000000; i++) {} // Similate long task
  console.log(res);
});

console.log("Test end");

////////////////////////////////////////////////////////////////////
//// Building a Simple Promise ///////
/*
Promises are a special kind of object in JavaScript.

Promises have one argument which is the executer function.  The executer
function has 2 arguments for "resolve" and "reject".

The resolve() function passes the fulfilled valued of the promise, so it can
later be consumed with the then() method.

The reject() function passes the rejected value of the promise, so it can 
later be caught with the catch handler.
*/
console.log("----- Building a Simple Promise -----");

const lotteryPromise = new Promise(function (resolve, reject) {
  console.log("Lottery draw is happening 🔮");

  setTimeout(function () {
    if (Math.random() >= 0.5) {
      // Scenario where resolve function from executer functon
      resolve("You WIN! 🤑");
    } else {
      // Scenario where promise is rejected from executer function
      reject(new Error("You lost your money 💩")); // Creating a new error object (shows more info.)
    }
  }, 2000);
});

lotteryPromise
  .then((res) => console.log(res))
  .catch((err) => console.error(err)); // consume promise

// Promisifying - convert callback based asynchronous behavior to promise based
function wait(seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
}

// Create a promise that will wait for 2 seconds then resolve
wait(2)
  .then(() => {
    console.log("I waited for 2 seconds");
    return wait(1); // wait another second
  })
  .then(() => console.log("I waited for 1 second")); // chain async behavior

// Reject promise immediately
Promise.resolve("abc").then((x) => console.log(x)); // static method on promise constructor
Promise.reject(new Error("Problem!")).catch((x) => console.error(x));

////////////////////////////////////////////////////////////////////
//// Promisfying the GeoLocation API ///////
/*
A new function is created to obtain the postion by using a promise.

The function returns a new promise with a resolved and rejected arguments.
If the navigator.geolocation.getCurrentPosition function is sucessful the 
position is returned and the promise is resolved.  If the getCurrentPosition
fails then the reject error will be returned.

See additional changes made in Challenge 1 code to the whereAmI function and getLocation.
*/
function getPosition() {
  return new Promise(function (resolve, reject) {
    // Simplified version of belows code
    navigator.geolocation.getCurrentPosition(resolve, reject);
    // navigator.geolocation.getCurrentPosition(
    //   (position) => resolve(position),
    //   (err) => reject(err)
    // );
  });
}

// Get promise value
getPosition().then((pos) => console.log(pos));

////////////////////////////////////////////////////////////////////
//// Coding Challenge #2 ///////
/*
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some 
stuff on your own.  Pretend you're workong on your own.

PART 1-
1. Create a function "createImage" which recieves imgPath as an input.
This function returns a promise which creates a new image (use document.CreateElement("img")),
and sets the .src attribute to the provided image path.  When the image is done loading,
append it to the DOM element with the "images" class, and resolve the promise.  The
fullfilled value should be the image element itself.  In case there is an error loading the image
("error" event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2-
2. Consume the promise using the .then and also add an error handler.
3. After the image has loaded, pause the execution for 2 seconds using the wait function
we created earlier.
4. After the 2 seconds have passed, hide the current image (set display to "none"), and load 
a second image (HINT: use the image element returned by the createImage promise to hide
  the current image.  You will need a global variable for that).
5. After the second image has loaded, pause the execution for 2 seconds again.
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img, folder.  Test the error handler by passing a wrong image path.
Set the network speed to "Fast 3G" in the dev tools Network tab, otherwise the images load
too fast.
*/
const hold = 10; // const wait time for image loading
const imgContainer = document.querySelector(".images"); // image container
let background; // global image element so hiding img element works

// Sets the global background variable and then sets the image to hidden
function hideImage(img) {
  background = img;
  background.style.display = "none";
}

// Creates a image element and sets the image path, waits for a load or error
// event and returns the resolved promise or error
function createImage(imgPath) {
  return new Promise(function (resolve, reject) {
    const image = document.createElement("img");
    image.src = imgPath;

    // Listen for successful load
    image.addEventListener("load", function () {
      imgContainer.append(image);
      resolve(image);
    });

    // Listen for load error
    image.addEventListener("error", function () {
      reject(new Error(`Unable to load image ${imgPath}`));
    });
  });
}

// Execution
createImage("img/img-1.jpg")
  .then((img) => {
    wait(hold).then(() => {
      hideImage(img);
      createImage("img/img-2.jpg").then((img) => {
        wait(hold).then(() => {
          hideImage(img);
        });
      });
    });
  })
  .catch((err) => console.error(err));
