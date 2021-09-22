import AbstractView from './abstract.js';

const creaetFooterStatTemplate = (films) => (
  `<p>${films.length} movies inside</p>`
);

export default class FooterStatistics extends AbstractView {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return creaetFooterStatTemplate(this._films);
  }
}


