import { API_URL } from "./config.js";
import { RES_PER_PAGE } from "./config.js";
import { getJSON } from "./helpers.js";
import { DEFAULT_PAGE } from "./config.js";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

// Change state object to get the recipe
export async function loadRecipe(id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);

    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    // Check if there are any saved bookmarks and mark the recipe as bookmarked
    if (state.bookmarks.some((bookmark) => bookmark.id === id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }
  } catch (err) {
    throw err; // will throw error to be handled by controller
  }
}

export async function loadSearchResults(query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);

    state.search.results = data.data.recipes.map((recipe) => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });
    state.search.page = DEFAULT_PAGE;
  } catch (err) {
    throw err;
  }
}

// Will slice 10 search results from the results array based on the page passed in
export function getSearchResultsPage(page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
}

export function updateServings(newServings) {
  state.recipe.ingredients.forEach((ingredient) => {
    ingredient.quantity =
      (ingredient.quantity * newServings) / state.recipe.servings;
  });

  state.recipe.servings = newServings;
}

function saveBookmarks() {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
}

export function addBookmark(recipe) {
  // Add bookmark
  state.bookmarks.push(recipe);

  // Mark current as bookmarked
  if (recipe.id === state.recipe.id) {
    state.recipe.bookmarked = true;
  }

  saveBookmarks();
}

export function removeBookmark(id) {
  // Remove bookmark
  const index = state.bookmarks.findIndex((el) => el.id === id);
  state.bookmarks.splice(index, 1);

  // Mark as not bookmarked
  if (id === state.recipe.id) {
    state.recipe.bookmarked = false;
  }

  saveBookmarks();
}

function loadStorage() {
  const storage = localStorage.getItem("bookmarks");

  if (storage) {
    state.bookmarks = JSON.parse(storage);
  }
}
loadStorage();

// For testing to clear bookmarks
function clearBookmarks() {
  localStorage.clear("bookmarks");
}
