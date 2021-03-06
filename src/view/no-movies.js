import Abstract from './abstract.js';

const noMoviesTemplate = () => (
  `<section class="films">
      <section class="films-list">
        <h2 class="films-list__title">There are no movies in our database</h2>
      </section>
    </section>`
);

export default class NoMovies extends Abstract {
  getTemplate() {
    return noMoviesTemplate();
  }
}
