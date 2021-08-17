import icons from "url:../../img/icons.svg";

export default class View {
  _data;

  // Methods
  render(data) {
    // Checks if there is data or if the data is an empty array
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
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
