"use strict";

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

////////////////////// How to Plan a Web Project //////////////////////
/*
 * User Stories - 
    - Description of the applications functionality from the user's persepective.
    - All the user stories put together will describe the entire application.
    - Common format: As a [type of user], I want [an action] so that [a benefit].
       - As a user, I want to log my running workouts with location, distance, time, pace
         and steps/minute, so I can keep a log of all my running.
       - As a user, I want to log my cycling workouts with location, distance, time, 
         speed, and elevation gain, so I can keep a log of all my cycling.
       - As a user, I want to see all my workouts at a glance, so I can easily track 
         my progress over time.
       - As a user, I want to also see my workouts on a map, so I can easily check where 
         I work out the most.
       - As a user, I want to see all my workouts when I leave the app and come back later,
          so that I can keep using the app over time.

 * Features - 
    - Map where user clicks to add new workout (best way to get location coordinate).
    - Geolocation to display map at current location (more use friendly).
    - Form to input distance, time, pace, steps/minute.
    - Form to input distance, time, speed, elevation gain.
    - Display all workouts in a list.
    - Display all workouts on the map.
    - Store workout data in the browser using local storage API.
    - On page load, read teh saved data from local storage and display.

 * Flowchart - 
   - What we will build
   - Page loads (interaction)
   - Load workouts from local storage (memory)
   - Get current location coordinates (async)
   - Render map on current location (render)
   - User clicks on map (interaction)
   - Render workout form (render)
   - User submits new working (interaction)
   - Render workout on map (render)
   - Render workout in list (render)
   - Store workouts in local storage (memory)
   - User clicks on workout in list (interaction)
   - Move map to workout location (render)

 * Architecture - 
   - How we will build
   
 * Development - 
   - Implementation of our plan using code
*/

////////////////////// Using the GeoLocation API //////////////////////
/*
 * Browser API similar to timers and internationalisation.
 * Modern API
 * navigator.geolocation.getCurrentPosition(func(sucess), func(fail));
  - requires 2 functions, one for correctly getting geolocation and one for failing
 * 
 */

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      // Creates link on google maps
      console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

      const coords = [latitude, longitude]; // array of coords used by leaflet

      const map = L.map("map").setView(coords, 13); // creates map object

      L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker(coords)
        .addTo(map)
        .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
        .openPopup();
    },
    function () {
      AudioListener("Could not get your position");
    }
  );
}

////////////////////// Displaying a Map Using Leaflet Library //////////////////////
/*
 * Leaflet
 * An open-source JavaScript library for mobile-friendly interact maps
 * Leaflet must be either downloaded and integrated into code or a hosted version
   integrated into the HTML to be used by the application.
 * Once Leaflet is active you can use the "L" namespace to access the functions for
   the API.
 */
