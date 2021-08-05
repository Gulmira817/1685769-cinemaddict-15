import {
  menuTemplate,
  filterTemplate,
  profileTemplate,
  showMoreButtonTemplate,
  filmDetailsTemplate,
  filmCard,
  topRatingTemplate,
  topCommentsFilms,
  stats,
  footerStatistics,
  loading
} from './index.js';
import {
  HEADER,
  MAIN_ELEMENT,
  FILM_LIST_ELEMENT,
  FILMS_LIST_CONTAINER,
  FOOTER_STATISTICS
} from './constants.js/constants.js';
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);

};

render(HEADER, profileTemplate(), 'beforeend');
render(MAIN_ELEMENT, filterTemplate(), 'afterbegin');
render(MAIN_ELEMENT, menuTemplate(), 'afterbegin');
render(MAIN_ELEMENT, filmDetailsTemplate(), 'beforeend');
render(FILMS_LIST_CONTAINER, filmCard(), 'beforeend');
render(FILMS_LIST_CONTAINER, filmCard(), 'beforeend');
render(FILMS_LIST_CONTAINER, filmCard(), 'beforeend');
render(FILMS_LIST_CONTAINER, filmCard(), 'beforeend');
render(FILMS_LIST_CONTAINER, filmCard(), 'beforeend');
render(FILMS_LIST_CONTAINER, showMoreButtonTemplate(), 'beforeend');
render(MAIN_ELEMENT, topRatingTemplate(), 'beforeend');
render(MAIN_ELEMENT, topCommentsFilms(), 'beforeend');
render(MAIN_ELEMENT, stats(), 'beforeend');
render(FOOTER_STATISTICS, footerStatistics(), 'afterend');
render(FILM_LIST_ELEMENT, loading(), 'afterbegin');
