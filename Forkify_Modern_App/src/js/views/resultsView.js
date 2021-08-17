import View from "./View.js";
import icons from "url:../../img/icons.svg";

class ResultsView extends View {
  _parentElement = document.querySelector(".results");
  _message = "";
  _errorMessage = "No recipes found for your query!  Please try again!";

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join("");
  }

  // the ids need to have a # in front of them in order to work correctly
  _generateMarkupPreview(result) {
    return `
        <li class="preview">
          <a class="preview__link" href="#${result.id}">
            <figure class="preview__fig">
              <img src="${result.image}" alt="${result.title}" crossOrigin="anonymous"/>
            </figure>
            <div class="preview__data">
              <h4 class="preview__title">${result.title}</h4>
              <p class="preview__publisher">${result.publisher}</p>
            </div>
          </a>
        </li>
    `;
  }
}

export default new ResultsView();