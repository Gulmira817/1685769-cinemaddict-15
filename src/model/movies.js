import AbstractObserver from '../utils/abstract-observer.js';

export default class Movies extends AbstractObserver {
  constructor() {
    super();
    this._cards = [];
  }

  setCards(updateType, cards) {
    this._cards = cards.slice();
    this._notify(updateType, cards);

  }

  getCards() {
    return this._cards.slice();
  }


  updateCard(updateType, update) {
    const index = this._cards.findIndex((card) => card.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    this._cards = [
      ...this._cards.slice(0, index),
      update,
      ...this._cards.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addCard(updateType, update) {
    this._cards = [
      update,
      ...this._cards,
    ];

    this._notify(updateType, update);
  }

  deleteCard(updateType, update) {
    const index = this._cards.findIndex((card) => card.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    this._tasks = [
      ...this._cards.slice(0, index),
      ...this._cards.slice(index + 1),
    ];

    this._notify(updateType);
  }


  static adaptToClient(film) {
    const adaptedFilm = Object.assign(
      {},
      film,
      {
        movieInfo: {
          title: film['film_info']['title'],
          alternativeTitle: film['film_info']['alternative_title'],
          rating: film['film_info']['total_rating'],
          poster: film['film_info']['poster'],
          ageRating: film['film_info']['age_rating'],
          director: film['film_info']['director'],
          writers: film['film_info']['writers'],
          actors: film['film_info']['actors'],
          runtime: film['film_info']['runtime'],
          genre: film['film_info']['genre'],
          description: film['film_info']['description'],
          release: {
            date: film['film_info']['release']['date'],
            releaseCountry: film['film_info']['release']['release_country'],
          },
        },
        userDetails: {
          isWhatchList: film['user_details']['watchlist'],
          isHistory: film['user_details']['already_watched'],
          isFavorite: film['user_details']['favorite'],
          watchingDate: film['user_details']['watching_date'],
        },
      });
    delete adaptedFilm['film_info'];
    delete adaptedFilm['user_details'];
    return adaptedFilm;
  }

  static adaptToServer(film) {
    const adaptedFilm = Object.assign(
      {},
      film,
      {
        'film_info': {
          'title': film.movieInfo.title,
          'alternative_title': film.movieInfo.alternativeTitle,
          'total_rating': film.movieInfo.rating,
          'poster': film.movieInfo.poster,
          'age_rating': film.movieInfo.ageRating,
          'director': film.movieInfo.director,
          'writers': film.movieInfo.writers,
          'actors': film.movieInfo.actors,
          'runtime': film.movieInfo.runtime,
          'genre': film.movieInfo.genre,
          'description': film.movieInfo.description,
          'release': {
            'date': film.movieInfo.release.date,
            'release_country': film.movieInfo.release.releaseCountry,
          },
        },
        'user_details': {
          'watchlist': film.userDetails.isWhatchList,
          'already_watched': film.userDetails.isHistory,
          'favorite': film.userDetails.isFavorite,
          'watching_date': film.userDetails.watchingDate,
        },
      },
    );
    delete adaptedFilm.filmInfo;
    delete adaptedFilm.userDetails;
    return adaptedFilm;
  }
}
