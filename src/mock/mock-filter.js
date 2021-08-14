
const filmToFilterMap = {
  all: (films) => films.length,
  watched: (films) => films
    .filter((film) => film.isWhatch).length,
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
