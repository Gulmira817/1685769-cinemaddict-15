import {
  HEADER,
  MAIN_ELEMENT
} from './constants/constants.js';

import { RenderPosition } from './utils.js';

import SiteMenuView from './view/menu.js';
import ProfileView from './view/profile.js';
import TopRatingView from './view/top-rating-films.js';
import TopCommentsView from './view/top-comments-films.js';
import SortView from './view/sort.js';
import MoreButtonView from './view/button.js';
import CardView from './view/card.js';
import FilmsListView from './view/films-list.js';
import FooterStatistics from './view/footer-statistic.js';
import FilmsDetailsView from './view/film-details';


import { generateData } from './mock/data.js';
import { generateFilter } from './mock/mock-filter.js';

import { renderElement } from './utils.js';

const BODY = document.querySelector('body');
const CARD_COUNT = 5;
const cards = new Array(CARD_COUNT).fill().map(generateData);
const data = generateData();
const filters = generateFilter(cards);
renderElement(HEADER, new ProfileView().getElement(), RenderPosition.BEFOREEND);
//===== filter========================================================

renderElement(MAIN_ELEMENT, new SiteMenuView(filters).getElement(), RenderPosition.AFTERBEGIN);

renderElement(MAIN_ELEMENT, new SortView().getElement(), RenderPosition.BEFOREEND);

renderElement(MAIN_ELEMENT, new FilmsListView().getElement(), RenderPosition.BEFOREEND);
const FILMS_LIST_CONTAINER = BODY.querySelector('.films-list__container');

const FILM_LIST_ELEMENT = BODY.querySelector('.films-list');
const showMoreButtonElement = new MoreButtonView().getElement();
renderElement(FILM_LIST_ELEMENT, showMoreButtonElement, RenderPosition.BEFOREEND);
for (let i = 0; i < CARD_COUNT; i++) {
  const card = new CardView(cards[i]).getElement();
  renderElement(FILMS_LIST_CONTAINER, card, RenderPosition.BEFOREEND);
  const filmDetails = new FilmsDetailsView(cards[i]).getElement();

  showMoreButtonElement.addEventListener('click', () => {
    const card2 = new CardView(cards[i]).getElement();
    renderElement(FILMS_LIST_CONTAINER, card2, RenderPosition.BEFOREEND);
    showMoreButtonElement.style.visibility = 'hidden';
    card2.addEventListener('click', () => {
      BODY.appendChild(filmDetails);
      BODY.classList.add('hide-overflow');
    });
  });
  card.addEventListener('click', () => {
    BODY.appendChild(filmDetails);
    BODY.classList.add('hide-overflow');
  });

  const comments = card.querySelector('.film-card__comments');
  comments.addEventListener('click', () => BODY.appendChild(filmDetails));
  const title = card.querySelector('.film-card__title');
  title.addEventListener('click', () => BODY.appendChild(filmDetails));
  const closeButton = filmDetails.querySelector('.film-details__close-btn');
  closeButton.addEventListener('click', () => BODY.removeChild(filmDetails));
}

const FILMS_ELEMENT = BODY.querySelector('.films');


renderElement(FILMS_ELEMENT, new TopRatingView(data).getElement(), RenderPosition.BEFOREEND);
renderElement(FILMS_ELEMENT, new TopCommentsView(data).getElement(), RenderPosition.BEFOREEND);
renderElement(FILMS_ELEMENT, new FooterStatistics().getElement(), RenderPosition.BEFOREEND);


