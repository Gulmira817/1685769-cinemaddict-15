import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

//=========================================================================

const getRandomSomeText = (arr) => arr.sort(() => Math.random() - 0.5).slice(0, 5);
//=========================================================================

const generateNameOfPosters = () => {
  const names = [
    'made-for-each-other.png',
    'popeye-meets-sinbad.png',
    'sagebrush-trail.jpg',
    'santa-claus-conquers-the-martians.jpg',
    'the-dance-of-life.jpg',
    'the-great-flamarion.jpg',
    'the-man-with-the-golden-arm.jpg',
  ];

  const randomIndex = getRandomInteger(0, names.length - 1);

  return names[randomIndex];
};

//=========================================================================
const generateGenre = () => {
  const genres = [
    'Drama',
    'Mystery',
    'Western',
    'Film-noir',
  ];

  const randomIndex = getRandomInteger(0, genres.length - 1);

  return genres[randomIndex];
};

//=========================================================================

const generateTitleOfFilms = () => {
  const titles = [
    'Bonnie and Clyde',
    'Airplane!',
    'Pan\'s Labyrinth',
  ];

  const randomIndex = getRandomInteger(0, titles.length - 1);

  return titles[randomIndex];
};

//================================================================================

const generateDescription = () => {
  const descriptions = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    'Sed sed nisi sed augue convallis suscipit in sed felis.',
    'Aliquam erat volutpat.Nunc fermentum tortor ac porta dapibus.',
    'In rutrum ac purus sit amet tempus',
  ];
  const arr = getRandomSomeText(descriptions);

  return arr;
};


//=======================================================================================

const generateDate = () => {
  const isDate = Boolean(getRandomInteger(0, 1));

  if (!isDate) {
    return null;
  }

  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);

  return dayjs().add(daysGap, 'day').toDate();
};


//=======================================================================================

const getRandomColor = () => {
  const colors = ['black', 'yellow', 'blue', 'green', 'pink'];
  const randomIndex = getRandomInteger(0, colors.length - 1);

  return colors[randomIndex];
};

const generateComments = () => {
  const comments = [
    'The selection of foreign films is very cool!.',
    'So much positivity and good energy! Love how interactive!',
    'First, the shorts were great. Second, I love that you are giving these shorts more exposure.',
    'Great film selection, lots of scheduling options.',
    'Well presented and great atmosphere.',
    'Amazing quality of films, and Frantic48 gets better every year.',
    'Great package! Fun event',
    'Loved the chance for movement breaks, cute and funny choice of films.',
    'The films were great and really got the students talking.',
  ];
  const arr = getRandomSomeText(comments);

  return arr;
};

const getUrlImgName = () => {
  const names = [
    'angry',
    'puke',
    'sleeping',
    'smile',
  ];
  const randomIndex = getRandomInteger(0, names.length - 1);
  return names[randomIndex];
};

const getAuthorComments = () => {
  const names = [
    'Roger Ebert',
    'Arthur Hiller',
    'Bob Dishy',
    'Dyan Cannon',
    'Brian Tallerico',
    'Matt Zolle',
  ];
  const randomIndex = getRandomInteger(0, names.length - 1);
  return names[randomIndex];
};

function getRandomPositiveFloat(a, b, digits = 1) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return result.toFixed(digits);
}

//=========== render ========================

const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};
const renderElement = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }

};

const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  return newElement.firstChild;
};


const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export {
  generateNameOfPosters,
  generateDescription,
  generateTitleOfFilms,
  generateDate,
  getRandomColor,
  generateComments,
  getRandomInteger,
  getUrlImgName,
  getAuthorComments,
  generateGenre,
  getRandomPositiveFloat,
  renderElement,
  renderTemplate,
  createElement,
  RenderPosition

};
