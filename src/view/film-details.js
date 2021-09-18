import SmartView from './smart.js';
// const BLANK_TASK = {
//   isWhatchList: false,
//   isFavorite: false,
//   isHistory: false,
//   commentText: '',
//   emoji: '',
// };
const getEmojiUrl = (name) => `<img src='./images/emoji/${name}.png'  width="50"  height="50"/>`;
const createFilmDetailsTemplate = (data) => {
  const { title, dueDate, description, comments, poster, genre, emojiList,
    emoji, isWhatchList, isFavorite, isHistory, commentText, duration } = data;

  return (
    `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">
          <p class="film-details__age">18+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">Original: The Great Flamarion</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">8.9</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">Anthony Mann</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">Anne Wigton, Heinz Herald, Richard Weil</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">Erich von Stroheim, Mary Beth Hughes, Dan Duryea</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${dueDate}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${duration}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">USA</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
                <span class="film-details__genre">${genre}</span>
                <span class="film-details__genre">${genre}</span>
                <span class="film-details__genre">${genre}</span></td>
            </tr>
          </table>
          <p class="film-details__film-description">${description}</p>
        </div>
      </div>

      <section class="film-details__controls">
        <button type="button" class="film-details__control-button film-details__control-button--watchlist
         ${isWhatchList ? 'film-details__control-button--active' : ''} " id="watchlist" name="watchlist">Add to watchlis</button>
        <button type="button" class="film-details__control-button film-details__control-button--watched
          ${isHistory ? 'film-details__control-button--active' : ''} " id="watched" name="watched">Already watched</button>
        <button type="button" class="film-details__control-button film-details__control-button--favorite
         ${isFavorite ? 'film-details__control-button--active' : ''} " id="favorite" name="favorite">Add to favorites</button>
      </section>
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">4</span></h3>

        <ul class="film-details__comments-list">
          ${comments.map((comment) => `<li class="film-details__comment">
              <span class="film-details__comment-emoji">
                <img src="${comment.emotion}" width="55" height="55" alt="emoji-smile">
              </span>
              <div>
                <p class="film-details__comment-text">${comment.text}</p>
                <p class="film-details__comment-info">
                  <span class="film-details__comment-author">${comment.author}</span>
                  <span class="film-details__comment-day">${comment.date}</span>
                  <button class="film-details__comment-delete">Delete</button>
                </p>
              </div>
      </li>`).join('')
    }
        </ul>

        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label">${emoji ? getEmojiUrl(emoji) : ''}</div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${commentText ? commentText : ''}</textarea>
          </label>

          <div class="film-details__emoji-list">
           ${emojiList.map((item) => `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${item}" value=${item} ${item === emoji ? 'checked' : ''}>
            <label class="film-details__emoji-label" for="emoji-${item}">
              <img src="./images/emoji/${item}.png" width="30" height="30" alt="emoji">
            </label>`).join('')}
          </div>
        </div>
    </section>`
  );
};

export default class FilmsDetails extends SmartView {
  constructor(data) {
    super();
    // this._data = FilmsDetails.parseTaskToData(task);
    this._data = data;
    this._clickHandler = this._clickHandler.bind(this);
    this._whatchClickHandler = this._whatchClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._historyClickHandler = this._historyClickHandler.bind(this);
    this._emojiClickHandler = this._emojiClickHandler.bind(this);
    this._commentTextChangeHandler = this._commentTextChangeHandler.bind(this);
    // this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._setInnerHandlers();
  }

  // reset(task) {
  //   this.updateData(
  //     FilmsDetails.parseTaskToData(task),
  //   );
  // }

  getTemplate() {
    return createFilmDetailsTemplate(this._data);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
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


  setCloseClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', this._clickHandler);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setCloseClickHandler(this._callback.click);
    this.setWhatchClickHandler(this._callback.whatchClick);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.setHistoryClickHandler(this._callback.historyClick);
    // this.setFormSubmitHandler(this._callback.formSubmit);
  }

  setWhatchClickHandler(callback) {
    this._callback.whatchClick = callback;
    this.getElement().querySelector('.film-details__control-button--watchlist').addEventListener('click', this._whatchClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.film-details__control-button--favorite').addEventListener('click', this._favoriteClickHandler);
  }

  setHistoryClickHandler(callback) {
    this._callback.historyClick = callback;
    this.getElement().querySelector('.film-details__control-button--watched').addEventListener('click', this._historyClickHandler);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('.film-details').addEventListener('submit', this._formSubmitHandler);
  }

  // _formSubmitHandler(evt) {
  //   evt.preventDefault();
  //   this._callback.formSubmit(FilmsDetails.parseDataToTask(this._data));
  // }

  _emojiClickHandler(evt) {
    evt.preventDefault();
    this.updateData({
      emoji: evt.target.value,
    });
  }

  _commentTextChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      commentText: evt.target.value,
    }, true);
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector('.film-details__emoji-list')
      .addEventListener('change', this._emojiClickHandler);

    this.getElement()
      .querySelector('.film-details__comment-input')
      .addEventListener('keyup', this._commentTextChangeHandler);
  }

  static parseTaskToData(data) {
    return Object.assign(
      {},
      data,
      {
        // commentText: data.commentText !== null,
        // emoji: data.emoji !== null,
      },
    );
  }


  static parseDataToTask(data) {
    data = Object.assign({}, data);

    // if (!data.isDueDate) {
    //   data.dueDate = null;
    // }

    delete data.commentText;
    delete data.emoji;

    return data;
  }
}
