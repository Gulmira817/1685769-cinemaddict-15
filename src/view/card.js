import AbstractView from './abstract.js';

const createCardTemplate = (data) => {
  const { title, dueDate, description, comments, poster, genre, rating, isWhatchList, isHistory, isFavorite } = data;
  return (
    `<article class="film-card">
          <h3 class="film-card__title">${title}</h3>
          <p class="film-card__rating">${rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${dueDate}</span>
            <span class="film-card__duration">54m</span>
            <span class="film-card__genre">${genre}</span>
          </p>
          <img src="./images/posters/${poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${description.join('')}</p>
          <a class="film-card__comments">${comments.length} comments</a>
              <div class="film-card__controls">
                <button class="film-card__controls-item film-card__controls-item--add-to-watchlist
                    ${isWhatchList ? 'film-card__controls-item--active' : ''} "
                    type="button">${isWhatchList}</button>
                <button class="film-card__controls-item  film-card__controls-item--mark-as-watched ${isHistory ? 'film-card__controls-item--active' : ''}" type="button">Mark as watched</button>
                <button class="film-card__controls-item  film-card__controls-item--favorite ${isFavorite ? 'film-card__controls-item--active' : ''}" type="button">Mark as favorite</button>
              </div></article >`);
};

export default class Card extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createCardTemplate(this._data);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setPosterClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector('.film-card__poster').addEventListener('click', this._clickHandler);
  }

  setCommentsClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector('.film-card__comments').addEventListener('click', this._clickHandler);
  }

  setTitleClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector('.film-card__title').addEventListener('click', this._clickHandler);
  }
}
