import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import "core-js/stable";
import "regenerator-runtime/runtime";

////////////////////////////////////////
// https://forkify-api.herokuapp.com/v2
////////////////////////////////////////
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
    // Get Search query
    const query = searchView.getQuery();
    if (!query) return;

    // Load search results
    await model.loadSearchResults(query);

    // Render results
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
