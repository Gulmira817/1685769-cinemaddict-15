import {
  HEADER, Pages, UpdateType
} from './constants/constants.js';

import StatisticsView from './view/statistics.js';

import { render, RenderPosition, remove } from './utils/render.js';

import MovieList from './presenter/movie-page.js';
import Filter from './presenter/filter.js';

import MoviesModel from './model/movies.js';
import FilterModel from './model/filter.js';
import CommentsModel from './model/comments.js';
import Api from './api.js';

const BODY = document.querySelector('body');
const AUTHORIZATION = 'Basic 15fevfev15fevfev15';
const END_POINT = 'https://15.ecmascript.pages.academy/cinemaddict';
const api = new Api(END_POINT, AUTHORIZATION);
const MAIN_ELEMENT = BODY.querySelector('.main');

const moviesModel = new MoviesModel();
const commentsModel = new CommentsModel();
const filtersModel = new FilterModel();


const movieListPresenter = new MovieList(MAIN_ELEMENT, moviesModel, commentsModel, filtersModel, api, HEADER);
const filtersPresenter = new Filter(MAIN_ELEMENT, filtersModel, moviesModel, handleMenuClick);

filtersPresenter.init();
const statisticElement = new StatisticsView();
movieListPresenter.init();

function handleMenuClick(filterType) {
  if (filterType === Pages.STATISTIC) {
    render(MAIN_ELEMENT, statisticElement, RenderPosition.BEFOREEND);
    statisticElement.init(moviesModel);
    movieListPresenter.hide();
    statisticElement.setData();
    return;
  }
  movieListPresenter.show();
  remove(statisticElement);
}


api.getFilms()
  .then((films) => {
    moviesModel.setCards(UpdateType.INIT, films);
  })
  .catch(() => {
    moviesModel.setCards(UpdateType.INIT, []);
  });
