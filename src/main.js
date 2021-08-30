import {
  HEADER,
  MAIN_ELEMENT
} from './constants/constants.js';

import { RenderPosition } from './utils.js';

import SiteMenuView from './view/menu.js';
import ProfileView from './view/profile.js';
import TopRatingContainerView from './view/top-rated-container.js';
// import TopCommentsView from './view/top-comments-films.js';
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
const CARD_COUNT = 20;
const CARD_COUNT_PER_STEP = 5;

const cards = new Array(CARD_COUNT).fill().map(generateData);
const filters = generateFilter(cards);
renderElement(HEADER, new ProfileView().getElement(), RenderPosition.BEFOREEND);

//===== filter========================================================

renderElement(MAIN_ELEMENT, new SiteMenuView(filters).getElement(), RenderPosition.AFTERBEGIN);

renderElement(MAIN_ELEMENT, new SortView().getElement(), RenderPosition.BEFOREEND);

renderElement(MAIN_ELEMENT, new FilmsListView().getElement(), RenderPosition.BEFOREEND);

const showPopup = (popup) => {
  BODY.classList.add('hide-overflow');
  BODY.appendChild(popup);
};

const hidePopup = (popup) => {
  BODY.classList.remove('hide-overflow');
  BODY.removeChild(popup);
};

// const onEscKeyDown = (evt, popup) => {
//   if (evt.key === 'Escape' || evt.key === 'Esc' || evt.code === 'Escape') {
//     evt.preventDefault();
//     hidePopup(popup);
//     document.removeEventListener('keydown', onEscKeyDown);
//   }
// };

const setFilmCardClickHandler = (card, cardElement) => {
  const filmDetails = new FilmsDetailsView(card).getElement();

  cardElement.getElement().querySelector('.film-card__poster').addEventListener('click', () => showPopup(filmDetails));

  const comments = cardElement.getElement().querySelector('.film-card__comments');
  comments.addEventListener('click', () => showPopup(filmDetails));

  const title = cardElement.getElement().querySelector('.film-card__title');
  title.addEventListener('click', () => showPopup(filmDetails));

  const closeButton = filmDetails.querySelector('.film-details__close-btn');
  document.addEventListener('keydown', (event) => {
    if (event.code === 'Escape' || event.key === 'Esc' && (event.ctrlKey || event.metaKey)) {
      BODY.classList.remove('hide-overflow');
      BODY.removeChild(filmDetails);
    }
  });
  // document.addEventListener('keydown', () => onEscKeyDown(filmDetails));
  closeButton.addEventListener('click', () => hidePopup(filmDetails));

};

const FILMS_LIST_CONTAINER = BODY.querySelector('.films-list__container');

for (let i = 0; i < Math.min(CARD_COUNT, CARD_COUNT_PER_STEP); i++) {
  const cardElement = new CardView(cards[i]);
  renderElement(FILMS_LIST_CONTAINER, cardElement.getElement(), RenderPosition.BEFOREEND);
  setFilmCardClickHandler(cards[i], cardElement);
}


const FILM_LIST_ELEMENT = BODY.querySelector('.films-list');

const showMoreButtonElement = new MoreButtonView().getElement();

if (cards.length > CARD_COUNT_PER_STEP) {
  let renderedCardCount = CARD_COUNT_PER_STEP;
  renderElement(FILM_LIST_ELEMENT, showMoreButtonElement, RenderPosition.BEFOREEND);

  showMoreButtonElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    cards
      .slice(renderedCardCount, renderedCardCount + CARD_COUNT_PER_STEP)
      .forEach((card) => {
        const cardElement = new CardView(card);
        renderElement(FILMS_LIST_CONTAINER, cardElement.getElement(), RenderPosition.BEFOREEND);

        //=================Show details about film ==========================
        setFilmCardClickHandler(card, cardElement);
      });

    renderedCardCount += CARD_COUNT_PER_STEP;
    if (renderedCardCount >= cards.length) {
      showMoreButtonElement.remove();
    }
  },
  );
}
const FILMS_ELEMENT = BODY.querySelector('.films');

const topRatingCont = new TopRatingContainerView().getElement();
FILMS_ELEMENT.appendChild(topRatingCont);
const cont = topRatingCont.querySelector('.films-list__container');
cards.sort((a, b) => b.rating - a.rating);
for (let i = 0; i < 2; i++) {
  const cardElement = new CardView(cards[i]);
  renderElement(cont, cardElement.getElement(), RenderPosition.BEFOREEND);
  setFilmCardClickHandler(cards[i], cardElement);
}
// renderElement(FILMS_ELEMENT, new TopCommentsView(data).getElement(), RenderPosition.BEFOREEND);
renderElement(FILMS_ELEMENT, new FooterStatistics().getElement(), RenderPosition.BEFOREEND);


