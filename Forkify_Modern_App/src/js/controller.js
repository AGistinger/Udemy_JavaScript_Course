import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import "core-js/stable";
import "regenerator-runtime/runtime";
// import { async } from "regenerator-runtime";

////////////////////////////////////////
// https://forkify-api.herokuapp.com/v2
////////////////////////////////////////

// from Parcel, saves state
if (module.hot) {
  module.hot.accept();
}

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
    recipeView.renderError();
  }
}

async function controlSearchResults() {
  try {
    resultsView.renderSpinner();

    // Get Search query
    const query = searchView.getQuery();
    if (!query) return;

    // Load search results
    await model.loadSearchResults(query);

    // Render results
    resultsView.render(model.state.search.results);
  } catch (err) {
    console.error(err);
  }
}

// Publisher/subscriber pattern
function init() {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
}
init();
