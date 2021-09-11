const BODY = document.querySelector('body');
const HEADER = document.querySelector('header');
const MAIN_ELEMENT = BODY.querySelector('.main');
const FOOTER_STATISTICS = BODY.querySelector('.footer__statistics');

const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
  SORTED: false,
};

export {
  HEADER,
  MAIN_ELEMENT,
  FOOTER_STATISTICS,
  SortType
};
