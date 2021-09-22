import { getTimeFormat, getYearsFormat } from '../utils/common.js';
import AbstractView from './abstract.js';

export const createCardTemplate = (card) => {
  const { comments, movieInfo, userDetails } = card;

  const runtimeMovie = getTimeFormat(movieInfo.runtime);

  const setCardControlsItemActive = (value) => value ? 'film-card__controls-item--active' : '';

  const watchlistClassActive = setCardControlsItemActive(userDetails.isWhatchList);
  const alreadyWatchedClassActive = setCardControlsItemActive(userDetails.isHistory);
  const favoriteClassActive = setCardControlsItemActive(userDetails.isFavorite);

  return `<article class="film-card">
    <h3 class="film-card__title">${movieInfo.title}</h3>
  <p class="film-card__rating">${movieInfo.rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${getYearsFormat(movieInfo.release.date)}</span>
      <span class="film-card__duration">${runtimeMovie}</span>
      <span class="film-card__genre">${movieInfo.genre.slice(0, 1)}</span>
    </p>
    <img src="${movieInfo.poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${movieInfo.description}</p>
    <a class="film-card__comments">${comments.length} comments</a>
    <div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${watchlistClassActive}" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${alreadyWatchedClassActive}" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite ${favoriteClassActive}" type="button">Mark as favorite</button>
    </div>
  </article>`;
};

export default class Card extends AbstractView {
  constructor(card) {
    super();
    this._card = card;
    this._cardClickHandler = this._cardClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._whatchClickHandler = this._whatchClickHandler.bind(this);
    this._historyClickHandler = this._historyClickHandler.bind(this);
  }

  getTemplate() {
    return createCardTemplate(this._card);
  }

  _cardClickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  _whatchClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchlistClick();
  }

  _historyClickHandler(evt) {
    evt.preventDefault();
    this._callback.alreadyWatchedClick();
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.film-card__controls-item--favorite').addEventListener('click', this._favoriteClickHandler);
  }

  setWhatchClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this._whatchClickHandler);
  }

  setHistoryClickHandler(callback) {
    this._callback.alreadyWatchedClick = callback;
    this.getElement().querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this._historyClickHandler);
  }

  setCardClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector('.film-card__title').addEventListener('click', this._cardClickHandler);
    this.getElement().querySelector('.film-card__poster').addEventListener('click', this._cardClickHandler);
    this.getElement().querySelector('.film-card__comments').addEventListener('click', this._cardClickHandler);
  }
}
