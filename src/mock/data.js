
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {
  generateTitleOfFilms,
  generateDescription,
  getRandomColor,
  generateDate,
  getRandomInteger,
  generateComments,
  getUrlImgName,
  getAuthorComments,
  generateNameOfPosters,
  generateGenre,
  getRandomPositiveFloat
} from '../utils/common.js';

const arrEmoji = [
  'angry',
  'puke',
  'sleeping',
  'smile',
];

dayjs.extend(duration);

const getDuration = (durInMin) => {
  const durHours = dayjs.duration(durInMin, 'minutes').hours();
  const durMin = dayjs.duration(durInMin, 'minutes').minutes();
  return `${durHours}h ${durMin}m`;

};

const generateComment = () => ({
  author: getAuthorComments(),
  emotion: `./images/emoji/${getUrlImgName()}.png`,
  date: dayjs().format('YYYY/MM/DD mm:ss'),
  text: generateComments(),
});


let id = 0;
export const generateData = () => {
  const day = dayjs(generateDate());
  const dueDate = day.format('D MMMM YYYY');
  const year = day.year();
  return {
    id: ++id,
    title: generateTitleOfFilms(),
    description: generateDescription(),
    year,
    dueDate,
    comments: Array(getRandomInteger(1, 5)).fill('').map(() => generateComment()),
    poster: generateNameOfPosters(),
    rating: getRandomPositiveFloat(1, 10),
    genre: generateGenre(),
    color: getRandomColor(),
    isWhatchList: Boolean(getRandomInteger(0, 1)),
    isHistory: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    emojiList: arrEmoji,
    duration: getDuration(getRandomInteger(50, 400)),
  };
};

