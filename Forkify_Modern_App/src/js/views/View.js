import icons from "url:../../img/icons.svg";

export default class View {
  _data;

  // Methods
  render(data) {
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
                  <use href="${icons}_icon-loader"></use>
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
                  <use href="${icons}_icon-alert-triangle"></use>
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
            <use href="${icons}_icon-smile"></use>
          </svg>
        </div>
        <p>Start by searching for a recipe or an ingredient. Have fun!</p>
      </div>
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", messageMarkup);
  }
}
