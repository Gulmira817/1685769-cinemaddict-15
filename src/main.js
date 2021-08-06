import {
  menuTemplate,
  filterTemplate,
  profileTemplate,
  showMoreButtonTemplate,
  filmDetailsTemplate,
  filmCard,
  topRatingTemplate,
  topCommentsFilms,
  footerStatistics,
  films
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

render(HEADER, profileTemplate(), 'beforeend');
render(MAIN_ELEMENT, menuTemplate(), 'afterbegin');
render(MAIN_ELEMENT, filterTemplate(), 'beforeend');
render(MAIN_ELEMENT, films(), 'beforeend');
const FILMS_LIST_CONTAINER = BODY.querySelector('.films-list__container');
for (let i = 0; i < 5; i++) {
  render(FILMS_LIST_CONTAINER, filmCard(), 'beforeend');
}
const FILM_LIST_ELEMENT = BODY.querySelector('.films-list');
render(FILM_LIST_ELEMENT, showMoreButtonTemplate(), 'beforeend');

render(MAIN_ELEMENT, topRatingTemplate(), 'beforeend');
render(MAIN_ELEMENT, topCommentsFilms(), 'beforeend');
render(FOOTER_STATISTICS, footerStatistics(), 'beforeend');
render(BODY, filmDetailsTemplate(), 'beforeend');


