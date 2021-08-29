import { createElement } from '../utils';

const createTopCommentsTemplate = (data) => {
  const { title, description, comments, poster, genre, rating } = data;
  return (
    `<section class="films-list films-list--extra">
  <h2 class="films-list__title">Most commented</h2>

  <div class="films-list__container">
    <article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">1964</span>
        <span class="film-card__duration">1h 21m</span>
        <span class="film-card__genre">Comedy</span>
      </p>
      <img src="./images/posters/${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
    ${comments.map((comment) =>
      `<a class="film-card__comments">
    ${comment.text}
    </a>`,
    )}
      <div class="film-card__controls">
        <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
        <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
        <button class="film-card__controls-item film-card__controls-item--favorite film-card__controls-item--active" type="button">Mark as favorite</button>
      </div>
    </article>

    <article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">1939</span>
        <span class="film-card__duration">1h 32m</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src="./images/posters/${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
     ${comments.map((comment) =>
      `<a class="film-card__comments">
    ${comment.text}
    </a>`,
    )}
      <div class="film-card__controls">
        <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
        <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
        <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
      </div>
    </article>
      </div>
    </section>`
  );
};

export default class TopComments {
  constructor(data) {
    this._element = null;
    this._data = data;
  }

  getTemplate() {
    return createTopCommentsTemplate(this._data);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
