
import {
  MAIN_ELEMENT
} from '../constants/constants.js';
import { render, RenderPosition, remove } from '../utils/render.js';
import SiteMenuView from '../view/menu.js';
// import ProfileView from '../view/profile.js';
// import TopRatingContainerView from './view/top-rated-container.js';
// import TopCommentsView from './view/top-comments-films.js';
import SortView from '../view/sort.js';
import MoreButtonView from '../view/button.js';
import Movie from './movie.js';
import FilmsListView from '../view/films-list.js';
import EmptyFilmsListView from '../view/empty-films-list.js';
import { generateFilter } from '../mock/mock-filter.js';
import { updateItem } from '../utils/common.js';
const BODY = document.querySelector('body');
const FILM_LIST_ELEMENT = BODY.querySelector('.films-list');
const CARD_COUNT_PER_STEP = 5;

export default class MovieList {
  constructor() {
    this._sortComponent = new SortView();
    this._noListComponent = new EmptyFilmsListView();
    this._filmsListContainer = new FilmsListView();
    this._siteMenuComponent = new SiteMenuView();
    this._loadMoreButtonComponent = new MoreButtonView();
    this._renderedCardCount = CARD_COUNT_PER_STEP;
    this._cardsContainer = this._filmsListContainer.getElement().querySelector('.films-list__container');
    this._filmList = this._filmsListContainer.getElement().querySelector('.films-list');
    this._filmListElement = FILM_LIST_ELEMENT;
    this._mainElement = MAIN_ELEMENT;
    this._filmPresenter = new Map();
    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
    this._handleCardsChange = this._handleCardsChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);

  }

  init(cards) {
    // Метод для инициализации (начала работы) модуля,
    // малая часть текущей функции renderBoard в main.js
    this._cards = cards.slice();
    this._renderMenu(this._cards);
    this._renderCardList();
  }

  _handleModeChange() {
    this._filmPresenter.forEach((presenter) => {
      presenter.resetView();
    });
  }

  _handleCardsChange(updatedCard) {
    this._cards = updateItem(this._cards, updatedCard);
    this._filmPresenter.get(updatedCard.id).init(updatedCard);
  }

  _renderCards(from, to) {
    this._cards
      .slice(from, to)
      .forEach((card) => this._renderCard(card));
  }

  _handleLoadMoreButtonClick() {
    this._renderCards(this._renderedCardCount, this._renderedCardCount + CARD_COUNT_PER_STEP);
    this._renderedCardCount += CARD_COUNT_PER_STEP;
    if (this._renderedCardCount >= this._cards.length) {
      remove(this._loadMoreButtonComponent);
    }
  }

  _renderLoadMoreButton() {
    render(this._filmList, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);
    this._loadMoreButtonComponent.setClickHandler(this._handleLoadMoreButtonClick);
  }

  _renderCard(card) {
    const movie = new Movie(this._cardsContainer, this._handleCardsChange, this._handleModeChange);
    movie.init(card);
    this._filmPresenter.set(card.id, movie);
    // this._filmPresenter[card.id] = movie;
  }

  _clearTaskList() {
    this._filmPresenter.forEach((presenter) => presenter.destroy());
    this._filmPresenter.clear();
    this._renderedCardCount = CARD_COUNT_PER_STEP;
    remove(this._loadMoreButtonComponent);
  }

  _renderCardList() {
    // Метод, куда уйдёт логика созданию и рендерингу компонетов задачи,
    // текущая функция renderTask в main.js
    if (!this._cards.length) {
      this._renderNoCards();
    } else {
      this._renderSort();
      render(this._mainElement, this._filmsListContainer, RenderPosition.BEFOREEND);
      this._renderCards(0, Math.min(this._cards.length, this._renderedCardCount));
      if (this._cards.length > this._renderedCardCount) {
        this._renderLoadMoreButton();
      }
    }
  }


  _renderNoCards() {
    // Метод для рендеринга заглушки
    render(this._mainElement, this._noListComponent, RenderPosition.BEFOREEND);
  }

  _renderMenu(cards) {
    const filters = generateFilter(cards);
    render(this._mainElement, new SiteMenuView(filters), RenderPosition.AFTERBEGIN);
    render(this._mainElement, this._sortComponent, RenderPosition.BEFOREEND);
  }


  _renderSort() {
    render(MAIN_ELEMENT, this._sortComponent, RenderPosition.BEFOREEND);
  }
}
