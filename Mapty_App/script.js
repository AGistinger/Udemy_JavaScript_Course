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
  #mapZoom = 13;
  #mapEvent;
  #workouts = [];

  /////// Constructor ///////
  constructor() {
    this._getPosition();

    // Display the marker
    form.addEventListener("submit", this._newWorkout.bind(this));

    // Change type of workout based on selected option (toggle)
    inputType.addEventListener("change", this._toggleElevationField.bind(this));

    // Event listener for clicking on workouts and centering the map
    containerWorkouts.addEventListener("click", this._moveToPopup.bind(this));
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

    this.#map = L.map("map").setView(coords, this.#mapZoom); // creates map object

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

  // Shows the form on the left side of the screen
  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove("hidden");
    inputDistance.focus(); // puts the field in focus after clicking on the map
  }

  // clears inputs and form data on the left side of the screen
  _hideForm() {
    inputDistance.value = "";
    inputDuration.value = "";
    inputCadence.value = "";
    inputElevation.value = "";

    form.style.display = "none"; // removes animation
    form.classList.add("hidden");
    setTimeout(() => (form.style.display = "grid"), 1000); // re-adds animation
  }

  // Function to toggle the elevation field between elevation and cadence
  _toggleElevationField() {
    // Select the closest parent with the form row (DOM traversal) and toggle the hidden class
    inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
    inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
  }

  // Function to center the map on the selected workout
  _moveToPopup(e) {
    const workoutEl = e.target.closest(".workout"); // finds the closet workout object

    if (!workoutEl) return; // guard clause against there being no workout elements

    // Find the selected workout in the workouts array by using the elements id
    const workout = this.#workouts.find(
      work => work.id === workoutEl.dataset.id
    );

    // Center the map around the selected workout with a panning animation
    this.#map.setView(workout.coords, this.#mapZoom, {
      animate: true,
      pan: { duration: 1 },
    });

    // using public interface
    workout.click();
  }

  // Function to create new workout
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
    this._renderWorkoutMarker(workout);

    // Render workout on list
    this._renderWorkout(workout);

    // Hide form + clear input fields
    this._hideForm();
  }

  // Puts a marker on the map at the coords the user clicked
  _renderWorkoutMarker(workout) {
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
      .setPopupContent(
        `${workout.type === "running" ? "🏃‍♂️" : "🚴‍♀️"} ${workout.description}`
      )
      .openPopup();
  }

  // Renders the entered workout into the left side of the screen with the workout info.
  _renderWorkout(workout) {
    // Insert HTML into the DOM when there is a new workout
    let html = `
       <li class="workout workout--${workout.type}" data-id="${workout.id}">
          <h2 class="workout__title">${workout.description}</h2>
          <div class="workout__details">
            <span class="workout__icon">${
              workout.type === "running" ? "🏃‍♂️" : "🚴‍♀️"
            }</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>
    `;

    // Change HTML based on workout type
    if (workout.type === "running") {
      html += `<div class="workout__details">
        <span class="workout__icon">⚡️</span>
       <span class="workout__value">${workout.pace.toFixed(1)}</span>
        <span class="workout__unit">min/km</span>
     </div>
      <div class="workout__details">
        <span class="workout__icon">🦶🏼</span>
        <span class="workout__value">${workout.cadence}</span>
        <span class="workout__unit">spm</span>
       </div>
    </li>`;
    } else if (workout.type === "cycling") {
      html += `<div class="workout__details">
         <span class="workout__icon">⚡️</span>
         <span class="workout__value">${workout.speed.toFixed(1)}</span>
         <span class="workout__unit">km/h</span>
        </div>
        <div class="workout__details">
         <span class="workout__icon">⛰</span>
          <span class="workout__value">${workout.elevation}</span>
         <span class="workout__unit">m</span>
        </div>
     </li>`;
    }

    // Add the element as a new element after the "form"
    form.insertAdjacentHTML("afterend", html);
  }
}

/////////////////// WORKOUT CLASS ///////////////////////
class Workout {
  /////// Public Variables ///////
  date = new Date();
  id = String(Date.now()).slice(-10);
  clicks = 0;

  /////// Constructor ///////
  constructor(coords, distance, duration) {
    this.coords = coords; // [lat, long]
    this.distance = distance; // km
    this.duration = duration; // min
  }

  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    // sets the type to uppercase, finds the month from the month array
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }

  // public function (doesn't do anything just a test)
  click() {
    this.clicks++;
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
    this._setDescription();
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
  constructor(coords, distance, duration, elevation) {
    super(coords, distance, duration);
    this.elevation = elevation;
    this.calcSpeed();
    this._setDescription();
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
