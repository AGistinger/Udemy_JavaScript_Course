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

// XMLHttpRequest call (oldschool way)
const request = new XMLHttpRequest();

// Open a request
request.open("GET", "https://restcountries.eu/rest/v2/name/prtugal");

// Send a request (done in the background)
request.send();

// Wait for the
request.addEventListener("load", function () {});
