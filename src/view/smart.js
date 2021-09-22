import Abstract from './abstract';

export default class Smart extends Abstract {
  constructor() {
    super();
    this._data = {};
    this._newComment = {};
  }

  updateData(update, justDataUpdating) {
    if (!update) {
      return;
    }

    this._data = Object.assign(
      {},
      this._data,
      update,
    );

    if (justDataUpdating) {
      return;
    }

    this.updateElement();
  }

  updateElement() {
    const prevElement = this.getElement();
    const scroll = prevElement.scrollTop;
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);
    newElement.scrollTop = scroll;
    this.restoreHandlers();
  }

  updateNewComment(update, justDataUpdating) {
    if (!update) {
      return;
    }

    this._newComment = Object.assign(
      {},
      this._newComment,
      update,
    );

    if (justDataUpdating) {
      return;
    }

    this.updateElement();
  }

  restoreHandlers() {
    throw new Error('Abstract method not implemented: resetHandlers');
  }
}
