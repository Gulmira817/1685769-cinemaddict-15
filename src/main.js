import {
  createMenu,
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

import { generateData } from './mock/data.js';
import { generateFilter } from './mock/mock-filter.js';
import { createSort } from './view/sort.js';

const BODY = document.querySelector('body');
const CARD_COUNT = 5;
const cards = new Array(CARD_COUNT).fill().map(generateData);
const data = generateData();
const filters = generateFilter(cards);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);

};

render(HEADER, createProfile(), 'beforeend');

//===== filter========================================================
render(MAIN_ELEMENT, createMenu(filters), 'afterbegin');

render(MAIN_ELEMENT, createSort(), 'beforeend');

render(MAIN_ELEMENT, createFilmsList(), 'beforeend');
const FILMS_LIST_CONTAINER = BODY.querySelector('.films-list__container');
for (let i = 0; i < CARD_COUNT; i++) {
  render(FILMS_LIST_CONTAINER, createCard(cards[i]), 'beforeend');
}
const FILMS_ELEMENT = BODY.querySelector('.films');
const FILM_LIST_ELEMENT = BODY.querySelector('.films-list');
render(FILM_LIST_ELEMENT, showMoreButton(), 'beforeend');

const showMoreButtonElement = BODY.querySelector('.films-list__show-more');
showMoreButtonElement.addEventListener('click', () => {
  for (let i = 0; i < CARD_COUNT; i++) {
    render(FILMS_LIST_CONTAINER, createCard(cards[i]), 'beforeend');
  }
  showMoreButtonElement.style.visibility = 'hidden';
});

render(FILMS_ELEMENT, createTopRating(data), 'beforeend');


render(FILMS_ELEMENT, createTopCommentsFilms(data), 'beforeend');
render(FOOTER_STATISTICS, creaetFooterStatistics(), 'beforeend');
render(BODY, createFilmDetails(data), 'beforeend');

const closePopupButton = BODY.querySelector('.film-details__close-btn');
const popupSection = BODY.querySelector('.film-details');

closePopupButton.addEventListener('click', () => popupSection.style.visibility = 'hidden');

