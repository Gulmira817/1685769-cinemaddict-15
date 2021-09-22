import { Pages } from '../constants/constants.js';

const filmToFilterMap = {
  [Pages.ALL]: (films) => films,
  [Pages.WATCHLIST]: (films) => films.filter((film) => film.userDetails.isWhatchList),
  [Pages.HISTORY]: (films) => films.filter((film) => film.userDetails.isHistory),
  [Pages.FAVORITES]: (films) => films.filter((film) => film.userDetails.isFavorite),
};
export default filmToFilterMap;
