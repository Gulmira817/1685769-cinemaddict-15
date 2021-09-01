import {
  HEADER,
  MAIN_ELEMENT
} from './constants/constants.js';

import SiteMenuView from './view/menu.js';
import ProfileView from './view/profile.js';
import TopRatingContainerView from './view/top-rated-container.js';
// import TopCommentsView from './view/top-comments-films.js';
import SortView from './view/sort.js';
import MoreButtonView from './view/button.js';
import CardView from './view/card.js';
import FilmsListView from './view/films-list.js';
import FooterStatistics from './view/footer-statistic.js';
import FilmsDetailsView from './view/film-details.js';
import EmptyFilmsListView from './view/empty-films-list.js';


import { generateData } from './mock/data.js';
import { generateFilter } from './mock/mock-filter.js';

import { render, RenderPosition, remove, removeFromDom } from './utils/render.js';

const BODY = document.querySelector('body');
const CARD_COUNT = 10;
const CARD_COUNT_PER_STEP = 5;

const cards = new Array(CARD_COUNT).fill().map(generateData);
const filters = generateFilter(cards);
render(HEADER, new ProfileView(), RenderPosition.AFTERBEGIN);

//===== empty films list ========================================================

if (cards.length === 0) {
  render(MAIN_ELEMENT, new SiteMenuView(filters), RenderPosition.AFTERBEGIN);
  render(MAIN_ELEMENT, new SortView(), RenderPosition.BEFOREEND);
  render(MAIN_ELEMENT, new EmptyFilmsListView, RenderPosition.BEFOREEND);
}
else {

  //===== filter========================================================

  render(MAIN_ELEMENT, new SiteMenuView(filters), RenderPosition.AFTERBEGIN);

  render(MAIN_ELEMENT, new SortView(), RenderPosition.BEFOREEND);

  render(MAIN_ELEMENT, new FilmsListView(), RenderPosition.BEFOREEND);

  const setFilmCardClickHandler = (card, cardElement) => {
    const filmDetails = new FilmsDetailsView(card);

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        removeFromDom(filmDetails);
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    const showPopup = (popup) => {
      BODY.classList.add('hide-overflow');
      BODY.appendChild(popup.getElement());
      document.addEventListener('keydown', onEscKeyDown);
    };

    cardElement.setPosterClickHandler(() => { showPopup(filmDetails); });

    cardElement.setCommentsClickHandler(() => {
      showPopup(filmDetails);
    });

    cardElement.setTitleClickHandler(() => showPopup(filmDetails));


    filmDetails.setCloseClickHandler(() => {
      removeFromDom(filmDetails);
      document.removeEventListener('keydown', onEscKeyDown);
    });

  };

  const FILMS_LIST_CONTAINER = BODY.querySelector('.films-list__container');

  for (let i = 0; i < Math.min(CARD_COUNT, CARD_COUNT_PER_STEP); i++) {
    const cardElement = new CardView(cards[i]);
    render(FILMS_LIST_CONTAINER, cardElement, RenderPosition.BEFOREEND);
    setFilmCardClickHandler(cards[i], cardElement);
  }


  const FILM_LIST_ELEMENT = BODY.querySelector('.films-list');

  const showMoreButtonElement = new MoreButtonView();

  if (cards.length > CARD_COUNT_PER_STEP) {
    let renderedCardCount = CARD_COUNT_PER_STEP;
    render(FILM_LIST_ELEMENT, showMoreButtonElement, RenderPosition.BEFOREEND);

    showMoreButtonElement.setClickHandler(() => {
      cards
        .slice(renderedCardCount, renderedCardCount + CARD_COUNT_PER_STEP)
        .forEach((card) => {
          const cardElement = new CardView(card);
          render(FILMS_LIST_CONTAINER, cardElement, RenderPosition.BEFOREEND);

          //=================Show details about film ==========================
          setFilmCardClickHandler(card, cardElement);
        });

      renderedCardCount += CARD_COUNT_PER_STEP;
      if (renderedCardCount >= cards.length) {
        remove(showMoreButtonElement);
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
    render(cont, RenderPosition.BEFOREEND);
    setFilmCardClickHandler(cards[i], cardElement);
  }
  // render(FILMS_ELEMENT, new TopCommentsView(data), RenderPosition.BEFOREEND);
  render(FILMS_ELEMENT, new FooterStatistics, RenderPosition.BEFOREEND);
}

