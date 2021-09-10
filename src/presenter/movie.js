import CardView from '../view/card.js';
import FilmsDetailsView from '../view/film-details.js';
import { render, RenderPosition, removeFromDom, showPopup, remove, replace } from '../utils/render.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  POPUP: 'POPUP',
};

export default class Movie {
  constructor(cardContainer, changeData, changeMode) {
    this._cardContainer = cardContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleHistoryClick = this._handleHistoryClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._closeClickHandler = this._closeClickHandler.bind(this);
    this._handleWatchClick = this._handleWatchClick.bind(this);
    this._handleCardClick = this._handleCardClick.bind(this);
  }

  init(card) {
    this._card = card;
    const prevCardComponent = this._cardComponent;
    const prevPopupComponent = this._popupComponent;
    this._cardComponent = new CardView(card);
    this._popupComponent = new FilmsDetailsView(card);
    this._popupComponent.setCloseClickHandler(this._closeClickHandler);
    this._cardComponent.setWhatchClickHandler(this._handleWatchClick);
    this._cardComponent.setCardClickHandler(this._handleCardClick);
    this._cardComponent.setHistoryClickHandler(this._handleHistoryClick);
    this._cardComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._popupComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._popupComponent.setHistoryClickHandler(this._handleHistoryClick);
    this._popupComponent.setWhatchClickHandler(this._handleWatchClick);
    this._mode = Mode.DEFAULT;

    if (!prevCardComponent) {
      render(this._cardContainer, this._cardComponent, RenderPosition.BEFOREEND);
    } else {
      replace(this._cardComponent, prevCardComponent);
    }

    if (prevPopupComponent) {
      replace(this._popupComponent, prevPopupComponent);
    }

  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      removeFromDom(this._popupComponent);
      this._mode = Mode.DEFAULT;
      document.removeEventListener('keydown', this._escKeyDownHandler);
    }
  }

  _closeClickHandler() {
    removeFromDom(this._popupComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      removeFromDom(this._popupComponent);
      document.removeEventListener('keydown', this._escKeyDownHandler);
      this._mode = Mode.DEFAULT;
    }
  }

  _handleWatchClick() {
    this._changeData(
      Object.assign(
        {},
        this._card,
        {
          isWhatchList: !this._card.isWhatchList,
        },
      ),
    );
  }

  _handleFavoriteClick() {
    this._changeData(
      Object.assign(
        {},
        this._card,
        {
          isFavorite: !this._card.isFavorite,
        },
      ),
    );
  }

  _handleHistoryClick() {
    this._changeData(
      Object.assign(
        {},
        this._card,
        {
          isHistory: !this._card.isHistory,
        },
      ),
    );
  }

  _handleCardClick() {
    this._changeMode();
    showPopup(this._popupComponent);
    this._mode = Mode.POPUP;
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  // _renderSort() {
  //   // Метод для рендеринга сортировки
  //   render(this._mainElement, this._sortComponent, RenderPosition.BEFOREEND);

  // }

  destroy() {
    remove(this._cardComponent);
    remove(this._popupComponent);

  }

}

