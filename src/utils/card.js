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
  return dayjs(cardB.dueDate).diff(dayjs(cardA.dueDate));
};


const sortRating = (cardA, cardB) => {
  const weight = getWeightForNullDate(cardA.rating, cardB.rating);

  if (weight !== null) {
    return weight;
  }

  return dayjs(cardB.rating).diff(dayjs(cardA.rating));
};


export {
  sortDate,
  sortRating

};
