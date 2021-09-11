import AbstractView from './abstract.js';
import { SortType } from '../constants/constants.js';

const createSortTemplate = () => (
  `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active" data-sort-id="${SortType.DEFAULT}">Sort by default</a></li>
    <li><a href="#" class="sort__button" data-sort-id="${SortType.DATE}">Sort by date</a></li>
    <li><a href="#" class="sort__button" data-sort-id="${SortType.RATING}">Sort by rating</a></li>
  </ul>
`
);


export default class Sort extends AbstractView {
  constructor() {
    super();
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortTemplate();
  }

  _sortTypeChangeHandler(event) {
    if (event.target.tagName !== 'A') {

      return;
    }
    event.preventDefault();
    this._callback.sortTypeChange(event.target.dataset.sortId);
    this.getElement().classList.remove('sort__button--active');
    const active = this.getElement().querySelector('li>a.sort__button--active');
    active.classList.remove('sort__button--active');
    event.target.classList.add('sort__button--active');

  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener('click', this._sortTypeChangeHandler);
  }
}
