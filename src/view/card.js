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
                <button class="film-card__controls-item  film-card__controls-item--mark-as-watched
                 ${isHistory ? 'film-card__controls-item--active' : ''}" type="button">${isHistory}</button>
                <button class="film-card__controls-item  film-card__controls-item--favorite
                 ${isFavorite ? 'film-card__controls-item--active' : ''}" type="button">${isFavorite}</button>
              </div></article >`);
};

export default class Card extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
    this._cardClickHandler = this._cardClickHandler.bind(this);
    this._whatchClickHandler = this._whatchClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._historyClickHandler = this._historyClickHandler.bind(this);
  }

  getTemplate() {
    return createCardTemplate(this._data);
  }

  _cardClickHandler(evt) {
    evt.preventDefault();
    this._callback.posterClick();
  }

  _whatchClickHandler(evt) {
    evt.preventDefault();
    this._callback.whatchClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  _historyClickHandler(evt) {
    evt.preventDefault();
    this._callback.historyClick();
  }


  setCardClickHandler(callback) {
    this._callback.posterClick = callback;
    this.getElement().querySelector('.film-card__poster').addEventListener('click', this._cardClickHandler);
    this.getElement().querySelector('.film-card__comments').addEventListener('click', this._cardClickHandler);
    this.getElement().querySelector('.film-card__title').addEventListener('click', this._cardClickHandler);
  }


  setWhatchClickHandler(callback) {
    this._callback.whatchClick = callback;
    this.getElement().querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this._whatchClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.film-card__controls-item--favorite').addEventListener('click', this._favoriteClickHandler);
  }

  setHistoryClickHandler(callback) {
    this._callback.historyClick = callback;
    this.getElement().querySelector('.film-card__controls-item--mark-as-watched ').addEventListener('click', this._historyClickHandler);
  }
}
