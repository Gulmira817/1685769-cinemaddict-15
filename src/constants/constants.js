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
const UserAction = {
  UPDATE_CARD: 'UPDATE_CARD',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const Pages = {
  ALL: 'all',
  WATCHLIST: 'isWhatchList',
  HISTORY: 'isHistory',
  FAVORITES: 'isFavorite',
  STATISTIC: 'statistics',
};

const FilterType = {
  ALL: 'all',
  WATCHLIST: 'isWhatchList',
  FAVORITES: 'isFavorite',
  HISTORY: 'isHistory',

};
const CurrentType = {
  ALL: 'allTime',
  TODAY: 'today',
  WEEK: 'week',
  MONTH: 'month',
  YEAR: 'year',
};

const NoFilmsTextType = {
  [Pages.All]: 'There are no movies in our database',
  [Pages.WATCHLIST]: 'There are no movies to watch now',
  [Pages.HISTORY]: 'There are no watched movies now',
  [Pages.FAVORITES]: 'There are no favorite movies now',
};
const Mode = {
  DEFAULT: 'DEFAULT',
  POPUP: 'POPUP',
};

const UserLevel = {
  NOVICE: 'Novice',
  FAN: 'Fan',
  MOVIE_BUFF: 'Movie buff',
};

export {
  Mode,
  HEADER,
  MAIN_ELEMENT,
  FOOTER_STATISTICS,
  SortType,
  UserAction,
  UpdateType,
  FilterType,
  Pages,
  NoFilmsTextType,
  CurrentType,
  UserLevel

};
