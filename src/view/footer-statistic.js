import AbstractView from './abstract.js';

const creaetFooterStatTemplate = () => (
  '<p>130 291 movies inside</p>'
);

export default class FooterStatistics extends AbstractView {
  getTemplate() {
    return creaetFooterStatTemplate();
  }

}
