
import {
  SortType, UpdateType, UserAction, Pages
} from '../constants/constants.js';
import { render, RenderPosition, remove, replace } from '../utils/render.js';
import { sortDate, sortRating } from '../utils/card.js';
import CardView from '../view/card.js';
import FootStat from '../view/footer-statistic.js';
import SortView from '../view/sort.js';
import MoreButtonView from '../view/button.js';
import Movie from './movie.js';
import EmptyFilmsListView from '../view/empty-films-list.js';
import LoadingView from '../view/loading.js';
import MoviesContainer from '../view/films-container';
import filterMovies from '../utils/filter.js';
import UserRunk from '../view/user-rank.js';

const BODY = document.querySelector('body');
const FILM_LIST_ELEMENT = BODY.querySelector('.films-list');
const CARD_COUNT_PER_STEP = 5;


export default class MovieList {
  constructor(mainElement, moviesModel, commentsModel, filtersModel, api, headerElement) {
    this._mainElement = mainElement;
    this._moviesModel = moviesModel;
    this._filtersModel = filtersModel;
    this._commentsModel = commentsModel;
    this._api = api;
    this._headerElement = headerElement;

    this._renderedCardCount = CARD_COUNT_PER_STEP;


    this._moviesContainer = new MoviesContainer();
    this._loadMoreButtonComponent = new MoreButtonView();
    this._noListComponent = new EmptyFilmsListView();
    this._loadingComponent = new LoadingView();

    this._scrollPosition = null;
    this._menuComponent = null;
    this._noFilmsComponent = null;
    this._ratingComponent = null;

    this._currentSortType = SortType.DEFAULT;
    this._sortComponent = new SortView(this._currentSortType);

    this._filterType = Pages.ALL;
    this._isLoading = true;
    this._comments = [];


    this._filmPresenter = new Map();
    this._topFilmPresenter = new Map();
    this._commentedFilmPresenter = new Map();

    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    //======================================================

    this._moviesModel.addObserver(this._handleModelEvent);
    this._cardComponent = new CardView();
    this._cardsContainer = this._mainElement.querySelector('.films-list__container');
    this._filmList = this._mainElement.querySelector('.films-list');
    this._filmListElement = FILM_LIST_ELEMENT;

  }

  init() {
    this._renderSort();
    render(this._mainElement, this._moviesContainer.getElement(), RenderPosition.BEFOREEND);

  }

  _handleModeChange() {
    this._filmPresenter.forEach((presenter) => {
      presenter.resetView();
    });
  }


  _renderPage() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }
    const films = this._getCards();
    const filmsCount = films.length;
    if (filmsCount === 0) {
      render(this._mainElement, this._renderNoCards());
    } else {
      this._renderCardList();
      this._renderFooter(this._moviesModel.getCards());
    }
  }

  _renderLoading() {
    render(this._mainElement, this._loadingComponent, RenderPosition.BEFOREEND);
  }

  _renderFooter(films) {
    this._numbersFilms = new FootStat(films);
    const siteFooterElement = document.querySelector('.footer');
    const siteFooterSectionElement = siteFooterElement.querySelector('.footer__statistics');
    render(siteFooterSectionElement, this._numbersFilms, RenderPosition.BEFOREEND);
  }

  _getCards() {
    const cards = this._moviesModel.getCards();
    const filteredCards = filterMovies[this._filterType](cards);

    switch (this._currentSortType) {
      case SortType.DATE:
        return filteredCards.sort(sortDate);
      case SortType.RATING:
        return filteredCards.sort(sortRating);
    }
    return filteredCards;
  }

  _renderRating() {
    this._ratingComponent.getElement().remove();
    this._ratingComponent.removeElement();
    this._ratingComponent = new UserRunk(this._moviesModel.getCards());
    render(this._headerElement, this._ratingComponent.getElement(), RenderPosition.BEFOREEND);
  }

  _handleSortTypeChange(sortType) {
    // - Сортируем задачи
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;
    this._clearCardList();
    this._renderCardList();
  }

  _renderCard(card, presenter, filmListElement) {
    const movie = new Movie(filmListElement, this._handleViewAction, this._handleModeChange, this._filterType, this._api, this._commentsModel);
    movie.init(card, this._scrollPosition);
    presenter.set(card.id, movie);
  }

  _renderCards(from, to, cards, mainElement, presenter) {
    cards
      .slice(from, to)
      .forEach((card) => this._renderCard(card, presenter, mainElement));

  }


  _renderAdditionalFilmList(container, sortFunction, count = 2, presenter) {
    const sortedFilms = sortFunction(this._moviesModel.getCards()).slice(0, 2);
    this._renderCards(0, count, sortedFilms, container, presenter);
  }

  _handleLoadMoreButtonClick() {
    const cards = this._getCards();
    const newRenderedCount = Math.min(cards.length, this._renderedCardCount + 5);
    const filmsContainer = this._mainElement.querySelector('.films');
    const filmsList = filmsContainer.querySelector('.films-list');
    const filmsListContainer = filmsList.querySelector('.films-list__container');
    this._renderCards(this._renderedCardCount, newRenderedCount, cards, filmsListContainer, this._filmPresenter);
    this._renderedCardCount = newRenderedCount;
    if (this._renderedCardCount >= this._moviesModel.getCards().length) {
      remove(this._loadMoreButtonComponent);
    }
  }


  _renderLoadMoreButton() {
    const filmsContainer = this._mainElement.querySelector('.films');
    const filmsList = filmsContainer.querySelector('.films-list');
    render(filmsList, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);
    this._loadMoreButtonComponent.setClickHandler(this._handleLoadMoreButtonClick);
  }

  _renderCardList() {
    if (this._ratingComponent === null) {
      this._ratingComponent = new UserRunk(this._moviesModel.getCards());
      this._renderRating();
    }
    const cards = this._getCards();
    const cardCount = cards.length;
    if (!cards) {
      this._renderNoCards();
    } else {
      const filmsContainer = this._mainElement.querySelector('.films');
      const filmsList = filmsContainer.querySelector('.films-list');
      const filmsListContainer = filmsList.querySelector('.films-list__container');
      render(this._mainElement, this._filmsListContainer, RenderPosition.BEFOREEND);
      this._renderCards(0, Math.min(cardCount, CARD_COUNT_PER_STEP), cards, filmsListContainer, this._filmPresenter);

      if (cardCount > this._renderedCardCount) {
        this._renderLoadMoreButton();
      } else {
        remove(this._renderLoadMoreButton);

      }
    }
  }


  _clearCardList() {
    this._filmPresenter.forEach((presenter) => presenter.destroy());
    this._filmPresenter.clear();
    this._renderedCardCount = CARD_COUNT_PER_STEP;
    remove(this._loadMoreButtonComponent);
  }

  _rerenderSortFilms(sortType) {
    const newSorting = new SortView(sortType);
    newSorting.setSortTypeChangeHandler(this._handleSortTypeChange);
    replace(newSorting.getElement(), this._sortComponent);
    this._sortComponent = newSorting;
  }

  _renderSort() {
    render(this._mainElement, this._sortComponent, RenderPosition.BEFOREEND);
    this._rerenderSortFilms(this._currentSortType);
  }


  _renderNoCards() {
    // Метод для рендеринга заглушки
    render(this._mainElement, this._noListComponent, RenderPosition.BEFOREEND);
  }

  _renderMenu() {
    this._renderSort();
  }

  _handleModelEvent(updateType, data, comments, scrollPosition) {
    switch (updateType) {
      case UpdateType.PATCH:
        if (this._filmPresenter.get(data.id)) {
          this._filmPresenter.get(data.id).init(data, scrollPosition);
        }
        this._renderRating();
        break;
      case UpdateType.MINOR:
        this._clearCardList();
        this._renderCardList();
        break;
      case UpdateType.MAJOR:
        this._clearPage({ resetRenderedFilmsCount: true, resetSortType: true });
        this._filterType = data;
        this._renderCardList();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderPage();
        break;
    }
  }

  _clearPage({ resetRenderedFilmsCount = false, resetSortType = false } = {}) {
    const filmsCount = this._getFilms().length;
    this._filmPresenter.forEach((presenter) => presenter.destroy());
    this._filmPresenter.clear();
    remove(this._sortComponent);
    if (this._noFilmsComponent) {
      remove(this._noFilmsComponent);
    }
    remove(this._loadingComponent);
    remove(this._loadMoreButtonComponent);
    if (resetRenderedFilmsCount) {
      this._renderedCardCount = CARD_COUNT_PER_STEP;
    } else {
      this._renderedCardCount = Math.min(filmsCount, this._renderedCardCount);
    }
    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _handleViewAction(actionType, updateType, update, comments, scrollPosition) {
    switch (actionType) {
      case UserAction.UPDATE_CARD:
        this._api.updateFilm(update).then((response) => {
          this._moviesModel.updateCard(updateType, response, comments, scrollPosition);
        });
        break;
      case UserAction.ADD_COMMENT:
        this._commentsModel.addComment(updateType, update, comments, scrollPosition);
        break;
      case UserAction.DELETE_COMMENT:
        this._commentsModel.deleteComment(updateType, update, comments, scrollPosition);
        break;
    }
  }

  show() {
    this._sortComponent.show();
    this._moviesContainer.show();
    this._filmPresenter.forEach((item) => item._cardComponent.show());
    this._loadMoreButtonComponent.show();
  }

  hide() {
    this._sortComponent.hide();
    this._moviesContainer.hide();
    this._filmPresenter.forEach((item) => item._cardComponent.hide());
    this._loadMoreButtonComponent.hide();

  }
}
