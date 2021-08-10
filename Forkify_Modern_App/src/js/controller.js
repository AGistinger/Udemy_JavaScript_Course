// Module Imports
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
// Library Imports
import "core-js/stable";
import "regenerator-runtime/runtime";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
async function controlRecipes() {
  try {
    const id = window.location.hash.slice(1); // Get the hash ID from the selected location
    if (!id) return; // guard against no id
    recipeView.renderSpinner();

    // Loading Recipe
    await model.loadRecipe(id);

    // Rendering Recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
    alert(err);
  }
}

// Listen for when the selected recipe changes and show the recipe in the main window
// Listen for when a page is loaded and show the recipe in the main window
["hashchange", "load"].forEach((event) =>
  window.addEventListener(event, controlRecipes)
);
