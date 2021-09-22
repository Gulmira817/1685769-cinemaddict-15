import { render, replace, RenderPosition, remove, isEscEvent } from '../utils/render.js';
import CardView from '../view/card.js';
import FilmsDetailsView from '../view/film-details.js';
import { UserAction, UpdateType, Pages, Mode } from '../constants/constants.js';


export default class Movie {
  constructor(container, changeData, changeMode, filterType, api, commentsModel) {
    this._container = container;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._filterType = filterType;
    this._api = api;
    this._commentsModel = commentsModel;

    this._bodyElement = document.querySelector('body');
    this._cardComponent = null;
    this._popupComponent = null;
    this._mode = Mode.DEFAULT;
    this._comments = [];

    this._clickHandler = this._clickHandler.bind(this);
    this._closeClickHandler = this._closeClickHandler.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleWatchClick = this._handleWatchClick.bind(this);
    this._handleHistoryClick = this._handleHistoryClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);

    this._handleFetchedComments = this._handleFetchedComments.bind(this);
    this._commentsModel.addObserver(this._handleFetchedComments);
  }

  init(card, scrollPosition) {
    this._card = card;
    this._scrollPosition = scrollPosition;
    const prevFilmComponent = this._cardComponent;
    const prevPopupComponent = this._popupComponent;

    this._cardComponent = new CardView(this._card);
    this._popupComponent = new FilmsDetailsView(this._card, this._changeData, this._commentsModel, this._api);
    this._cardComponent.setCardClickHandler(this._clickHandler);
    this._cardComponent.setWhatchClickHandler(this._handleWatchClick);
    this._cardComponent.setHistoryClickHandler(this._handleHistoryClick);
    this._cardComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._popupComponent.setFormSubmitHandler(this._closeClickHandler);
    this._popupComponent.setWhatchClickHandler(this._handleWatchClick);
    this._popupComponent.setHistoryClickHandler(this._handleHistoryClick);
    this._popupComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    if (prevFilmComponent === null || prevPopupComponent === null) {
      render(this._container, this._cardComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._container.contains((prevFilmComponent.getElement())) && this._mode === Mode.DEFAULT) {
      replace(this._cardComponent, prevFilmComponent);
    }

    if (this._bodyElement.contains((prevPopupComponent.getElement())) && this._mode === Mode.POPUP) {
      replace(this._popupComponent, prevPopupComponent);
      replace(this._cardComponent, prevFilmComponent);

      this._getCommentsFilm(this._card);
      this._popupComponent.getElement().scrollTo(0, this._scrollPosition);
    }
  }

  _handleFetchedComments(updateType, film) {
    if (film.id !== this._card.id) {
      return;
    }
    switch (updateType) {
      case UpdateType.PATCH:
        if (document.querySelector('.film-details')) {
          this._popupComponent.updateData(film, true);
          return;
        }
        this._popupComponent.updateData(film, false);
        render(this._bodyElement, this._popupComponent, RenderPosition.BEFOREEND);
    }
  }

  _handleFavoriteClick(scroll) {
    this._changeData(
      UserAction.UPDATE_CARD,
      this._filterType !== Pages.FAVORITES ? UpdateType.PATCH : UpdateType.MINOR,
      Object.assign(
        {},
        this._card,
        {
          userDetails: {
            ...this._card.userDetails,
            isFavorite: !this._card.userDetails.isFavorite,
          },
        },
      ), this._comments, scroll,
    );
  }

  _handleWatchClick(scroll) {
    this._changeData(
      UserAction.UPDATE_CARD,
      this._filterType !== Pages.WATCHLIST ? UpdateType.PATCH : UpdateType.MINOR,
      Object.assign(
        {},
        this._card,
        {
          userDetails: {
            ...this._card.userDetails,
            isWhatchList: !this._card.userDetails.isWhatchList,
          },
        },
      ), this._comments, scroll,
    );
  }

  _handleHistoryClick(scroll) {
    this._changeData(
      UserAction.UPDATE_CARD,
      this._filterType !== Pages.HISTORY ? UpdateType.PATCH : UpdateType.MINOR,
      Object.assign(
        {},
        this._card,
        {
          userDetails: {
            ...this._card.userDetails,
            isHistory: !this._card.userDetails.isHistory,
          },
        },
      ), this._comments, scroll,
    );
  }

  _getCommentsFilm(film) {
    this._api.getComments(film.id)
      .then((comments) => {
        this._commentsModel.setData(UpdateType.PATCH, film, comments);
      })
      .catch(() => {
        this._commentsModel.setData(UpdateType.PATCH, film, []);
      });
  }


  _clickHandler() {
    this._openPopupFilm();
    document.addEventListener('keydown', this._escKeyDownHandler);
    this._bodyElement.classList.add('hide-overflow');
  }

  _closeClickHandler() {
    this._onClosePopup();
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _openPopupFilm() {
    if (document.querySelector('.film-details')) {
      document.querySelector('.film-details').remove();
    }
    this._bodyElement.classList.add('hide-overflow');
    this._getCommentsFilm(this._card);
    this._changeMode();
    this._mode = Mode.POPUP;
  }

  _onClosePopup() {
    this._bodyElement.classList.remove('hide-overflow');
    this._popupComponent.getElement().remove();
    this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      this._onClosePopup();
      document.removeEventListener('keydown', this._escKeyDownHandler);
    }
  }

  _restoreHandlers() {
    this._popupComponent.setCardClickHandler(this._closeClickHandler);
    this._popupComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._popupComponent.setWhatchClickHandler(this._handleWatchClick);
    this._popupComponent.setHistoryClickHandler(this._handleHistoryClick);
  }

  destroy() {
    remove(this._cardComponent);
    remove(this._popupComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._onClosePopup();
    }
  }
}
