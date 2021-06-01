"use strict";

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

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/////////////// DOM ELEMENTS /////////////////
const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

/////////////////// APP CLASS ///////////////////////
class App {
  /////// Private Variables ///////
  #map;
  #mapEvent;
  #workouts = [];

  /////// Constructor ///////
  constructor() {
    this._getPosition();

    // Display the marker
    form.addEventListener("submit", this._newWorkout.bind(this));

    // Change type of workout based on selected option (toggle)
    inputType.addEventListener("change", this._toggleElevationField.bind(this));
  }

  /////// Private Functions ///////
  // this._loadMap function needs to bind the "this" keyword as weithout it the _loadMap funciton
  // doesn't have access to "this".
  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          AudioListener("Could not get your position");
        }
      );
    }
  }

  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    const coords = [latitude, longitude]; // array of coords used by leaflet

    this.#map = L.map("map").setView(coords, 13); // creates map object

    // Creates map tiles
    L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // handling clicks on map
    this.#map.on("click", this._showForm.bind(this));

    // Creates link on google maps
    console.log(`https://www.google.com/maps/@${latitude},${longitude}`);
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove("hidden");
    inputDistance.focus(); // puts the field in focus after clicking on the map
  }

  _toggleElevationField() {
    // Select the closest parent with the form row (DOM traversal) and toggle the hidden class
    inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
    inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
  }

  _newWorkout(e) {
    e.preventDefault();

    // Checks if input is valid for all inputs and only returns true if all inputs are valid
    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp));

    // Checks if input is positive and only returns true if all inputs are positive
    const allPositive = (...inputs) => inputs.every(inp => inp > 0);

    // Get data from the form
    const type = inputType.value;
    const distance = Number(inputDistance.value);
    const duration = Number(inputDuration.value);
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    // If workout running, create running object
    if (type === "running") {
      const cadence = Number(inputCadence.value);

      // Check if data is valid
      if (
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      )
        return alert("Inputs have to be positive numbers");

      workout = new Running([lat, lng], distance, duration, cadence);
    }

    // If workout cycling, creating cycling object
    if (type === "cycling") {
      const elevation = Number(inputElevation.value);

      // Check if data is valid
      if (
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration)
      )
        return alert("Inputs have to be positive numbers");
      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    // Add new object to workout array
    this.#workouts.push(workout);

    // Render workout on map as a marker
    this.renderWorkoutMarker(workout);

    // Render workout on list

    // Hide form + clear input fields
    this._clearInputs();
  }

  _clearInputs() {
    inputDistance.value = "";
    inputDuration.value = "";
    inputCadence.value = "";
    inputElevation.value = "";
  }

  renderWorkoutMarker(workout) {
    // places marker where user clicks and sets the options for the popup (Display Marker)
    // custom icon
    let mapMarker = L.icon({
      iconUrl: "icon.png",
      iconSize: [50, 50],
      iconAnchor: [22, 94],
      popupAnchor: [0, -90],
    });

    L.marker(workout.coords, { icon: mapMarker })
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(`${workout.distance}`)
      .openPopup();
  }
}

/////////////////// WORKOUT CLASS ///////////////////////
class Workout {
  /////// Public Variables ///////
  date = new Date();
  id = String(Date.now()).slice(-10);

  /////// Constructor ///////
  constructor(coords, distance, duration) {
    this.coords = coords; // [lat, long]
    this.distance = distance; // km
    this.duration = duration; // min
  }
}

/////////////////// RUNNING WORKOUT CLASS ///////////////////////
class Running extends Workout {
  type = "running";
  /////// Constructor ///////
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
  }

  /////// Functions ///////
  calcPace() {
    // minutes/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

/////////////////// CYCLING WORKOUT CLASS ///////////////////////
class Cycling extends Workout {
  type = "cycling";
  /////// Constructor ///////
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
  }

  /////// Functions ///////
  calcSpeed() {
    // km/h
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

///////////////////// APPLICATION EXECUTION /////////////////////////
const app = new App();

////////////////////// Using the GeoLocation API //////////////////////
/*
 * Browser API similar to timers and internationalisation.
 * Modern API
 * navigator.geolocation.getCurrentPosition(func(sucess), func(fail));
  - requires 2 functions, one for correctly getting geolocation and one for failing
 */

////////////////////// Displaying a Map Using Leaflet Library //////////////////////
/*
 * Leaflet
 * An open-source JavaScript library for mobile-friendly interact maps
 * Leaflet must be either downloaded and integrated into code or a hosted version
   integrated into the HTML to be used by the application.
 * Once Leaflet is active you can use the "L" namespace to access the functions for
   the API.
 */

//////////////////// Displaying a Map Marker Using Leaflet Library ////////////////////
/*
 * A event handler needs to be created to display a marker when the user clicks
   on the map.
  * A normal event handler will not work, there is a special one from the leaflet
    library that is to be used.
  * This needs to be called within the getCurrentPosition function for when a 
    position is correctly obtained.
  * map.on(event, function());  // object generated by leaflet
     - Calls the click event with the special map functionality
  * See leaflet documentation for popup options under UI layers
 */

//////////////////// Rendering Workout Input Form ////////////////////
/*
 * remove hidden class of the form from the style css.
 * update the form based on what the workout type is selected by using
   DOM traversal by selecting the nearest parent and then toggling the hidden class
 */

///////////////////////////// NOTES //////////////////////////////////////
/*
* The "this" keyword gets rebound every time a event handler is called, you will have to bind it
  back to the correct object by calling .bind(this).  The event handler will bind the "this" keyword
  to the object on the left side instead of the object it is called from.
*/
