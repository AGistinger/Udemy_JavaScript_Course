import icons from "url:../../img/icons.svg";

export default class View {
  _data;

  // Methods
  render(data, render = true) {
    // Checks if there is data or if the data is an empty array
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) {
      return markup;
    }

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    // Convert markup into a DOM object and then into an Array
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const curElements = Array.from(this._parentElement.querySelectorAll("*"));

    // Compare the elements
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      // Get the first child of the element to get the text and check if it is text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        curEl.textContent = newEl.textContent;
      }

      // Update changed attributes (gets values and sets them into the current elements)
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach((attr) =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  renderSpinner() {
    const markupSpin = `
            <div class="spinner">
                <svg>
                  <use href="${icons}#icon-loader"></use>
                </svg>
             </div>
        `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markupSpin);
  }

  renderError(message = this._errorMessage) {
    const errorMarkup = `
        <div class="error">
              <div>
                <svg>
                  <use href="${icons}#icon-alert-triangle"></use>
                </svg>
              </div>
              <p>${message}</p>
            </div>
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", errorMarkup);
  }

  renderMessage(message = this._message) {
    const messageMarkup = `
      <div class="recipe">
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", messageMarkup);
  }
}
