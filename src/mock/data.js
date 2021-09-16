
import dayjs from 'dayjs';
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


const generateComment = () => ({
  author: getAuthorComments(),
  emotion: `./images/emoji/${getUrlImgName()}.png`,
  date: generateDate(),
  text: generateComments(),
});


let id = 0;
export const generateData = () => {
  const dueDate = dayjs(generateDate()).format('YYYY/MM/DD HH:m');
  return {
    id: ++id,
    title: generateTitleOfFilms(),
    description: generateDescription(),
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
  };
};

