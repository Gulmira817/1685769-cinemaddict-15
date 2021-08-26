
const filmToFilterMap = {
  all: (films) => films.length,
  watcheList: (films) => films
    .filter((film) => film.isWhatchList).length,
  favorites: (films) => films
    .filter((film) => film.isFavorite).length,
  history: (films) => films
    .filter((film) => film.isHistory).length,
};

export const generateFilter = (films) => Object.entries(filmToFilterMap).map(
  ([filterName, countFilms]) => ({
    name: filterName,
    count: countFilms(films),
  }),
);
