import { createElement } from '../utils';

const creaetFooterStatTemplate = () => (
  '<p>130 291 movies inside</p>'
);

export default class FooterStatistics {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return creaetFooterStatTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }
}
