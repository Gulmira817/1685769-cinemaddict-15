import {
  createMenu,
  createFilter,
  createProfile,
  showMoreButton,
  createFilmDetails,
  createCard,
  createTopRating,
  createTopCommentsFilms,
  creaetFooterStatistics,
  createFilmsList
} from './index.js';

import {
  HEADER,
  MAIN_ELEMENT,
  FOOTER_STATISTICS
} from './constants/constants.js';

const BODY = document.querySelector('body');

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);

};

render(HEADER, createProfile(), 'beforeend');
render(MAIN_ELEMENT, createMenu(), 'afterbegin');
render(MAIN_ELEMENT, createFilter(), 'beforeend');
render(MAIN_ELEMENT, createFilmsList(), 'beforeend');
const FILMS_LIST_CONTAINER = BODY.querySelector('.films-list__container');
for (let i = 0; i < 5; i++) {
  render(FILMS_LIST_CONTAINER, createCard(), 'beforeend');
}
const FILMS_ELEMENT = BODY.querySelector('.films');
const FILM_LIST_ELEMENT = BODY.querySelector('.films-list');
render(FILM_LIST_ELEMENT, showMoreButton(), 'beforeend');

render(FILMS_ELEMENT, createTopRating(), 'beforeend');
render(FILMS_ELEMENT, createTopCommentsFilms(), 'beforeend');
render(FOOTER_STATISTICS, creaetFooterStatistics(), 'beforeend');
render(BODY, createFilmDetails(), 'beforeend');


