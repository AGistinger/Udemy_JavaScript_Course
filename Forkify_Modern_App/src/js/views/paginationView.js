import View from "./View.js";
import icons from "url:../../img/icons.svg";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (event) {
      // Searches in the tree for the parent button element
      const button = event.target.closest(".btn--inline");
      if (!button) return; // guard against clicking outside button

      const goToPage = Number(button.dataset.goto);
      handler(goToPage);
    });
  }

  _generateMarkupPrevious(currentPage) {
    return `
        <button data-goto="${
          currentPage - 1
        }"class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
        </button>
  `;
  }

  _generateMarkupNext(currentPage) {
    return `
        <button data-goto="${
          currentPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
  `;
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (currentPage === 1 && numPages > 1) {
      return this._generateMarkupNext(currentPage);
    }

    // Last page
    if (currentPage === numPages && numPages > 1) {
      return this._generateMarkupPrevious(currentPage);
    }
    // Other page
    if (currentPage < numPages) {
      return (
        this._generateMarkupPrevious(currentPage) +
        this._generateMarkupNext(currentPage)
      );
    }
    // Page 1, and there are NO other pages
    return "";
  }
}

export default new PaginationView();
