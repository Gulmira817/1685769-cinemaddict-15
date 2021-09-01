import AbstractView from './abstract.js';

const createEmptyFilmsListTemplate = () => (
  `<section class="films">
      <section class="films-list">
       <h2 class="films-list__title">There are no movies in our database</h2>
   </section>
   </section> `
);


export default class EmptyFilmsList extends AbstractView {

  getTemplate() {
    return createEmptyFilmsListTemplate();
  }

}
