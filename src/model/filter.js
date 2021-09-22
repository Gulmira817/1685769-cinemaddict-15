import AbstractObserver from '../utils/abstract-observer.js';
import { Pages } from '../constants/constants.js';

export default class Filter extends AbstractObserver {
  constructor() {
    super();
    this._activePage = Pages.ALL;
  }

  setActivePage(updateType, page) {
    this._activePage = page;
    this._notify(updateType, this._activePage);
  }

  getActivePage() {
    return this._activePage;
  }
}
