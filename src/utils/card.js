import dayjs from 'dayjs';


const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

const sortDate = (cardA, cardB) => {
  const weight = getWeightForNullDate(cardA.dueDate, cardB.dueDate);

  if (weight !== null) {
    return weight;
  }
  return dayjs(cardB.movieInfo.release).diff(dayjs(cardA.movieInfo.release));
};

const sortRating = (cardA, cardB) => +cardB.movieInfo.rating - +cardA.movieInfo.rating;


const topSortFunction = (films) => [...films].sort((a, b) => b.movieInfo.rating - a.movieInfo.rating);
const commentedSortFunction = (films) => [...films].sort((a, b) => b.comments.length - a.comments.length);

export const getGenres = (films) => {
  const genresArray = films.map((film) => film.movieInfo.genre).flat();
  return [...new Set(genresArray)];

};

const getNumberFilmsGenre = (films) => {
  const genres = getGenres(films);
  const result = {};
  genres.forEach((genre) => {
    result[genre] = 0;
    films.forEach((film) => film.movieInfo.genre.forEach((item) => {
      if (genre === item) {
        result[genre] += 1;
      }
    }));
  });
  return result;
};

const getSortGenresFilms = (obj) => {
  const newObj = {};
  Object.keys(obj).sort((a, b) => obj[b] - obj[a]).forEach((i) => newObj[i] = obj[i]);
  return newObj;
};

const completedFimsInDateRange = (films, dateFrom, dateTo, format) => films.filter((film) =>
  dayjs(film.userDetails.watchingDate).isBetween(dateFrom, dateTo, format, '[]'));

export {
  sortDate,
  sortRating,
  topSortFunction,
  commentedSortFunction,
  getNumberFilmsGenre,
  getSortGenresFilms,
  completedFimsInDateRange

};
