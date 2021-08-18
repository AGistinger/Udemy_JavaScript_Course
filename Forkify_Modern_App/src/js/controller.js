import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import "core-js/stable";
import "regenerator-runtime/runtime";
// import { async } from "regenerator-runtime";

////////////////////////////////////////
// https://forkify-api.herokuapp.com/v2
////////////////////////////////////////

// from Parcel, saves state
// if (module.hot) {
//   module.hot.accept();
// }

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
    resultsView.render(model.getSearchResultsPage());

    // Render intial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
}

function controlPagination(goToPage) {
  // Render new results
  resultsView.render(model.getSearchResultsPage(goToPage));
  // Render new pagination buttons
  paginationView.render(model.state.search);
}

function controlServings(newServings) {
  // Update the recipe servings(in state)
  model.updateServings(newServings);

  // Update the recipe view
  recipeView.render(model.state.recipe);
}

// Publisher/subscriber pattern
function init() {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
}
init();
