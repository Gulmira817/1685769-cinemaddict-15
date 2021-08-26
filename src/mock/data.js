
import dayjs from 'dayjs';
import {
  generateTitleOfFilms,
  generateDescription,
  generateDate,
  getRandomColor,
  getRandomInteger,
  generateComments,
  getUrlImgName,
  getAuthorComments,
  generateNameOfPosters,
  generateGenre,
  getRandomPositiveFloat
} from '../utils.js';

const arrEmoji = [
  './images/emoji/angry.png',
  './images/emoji/puke.png',
  './images/emoji/sleeping.png',
  './images/emoji/smile.png',
];

const generateComment = () => ({
  author: getAuthorComments(),
  emotion: `./images/emoji/${getUrlImgName()}.png`,
  date: generateDate(),
  text: generateComments(),
});

export const generateData = () => {
  const dueDate = dayjs(generateDate()).format('YYYY/MM/DD HH:m');
  return {
    title: generateTitleOfFilms(),
    description: generateDescription(),
    dueDate,
    comments: Array(getRandomInteger(1, 5)).fill('').map(() => generateComment())
    ,
    poster: generateNameOfPosters(),
    rating: getRandomPositiveFloat(1, 10),
    genre: generateGenre(),
    color: getRandomColor(),
    isWhatchList: Boolean(getRandomInteger(0, 1)),
    isHistory: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    emojiList: arrEmoji,
  };
};

