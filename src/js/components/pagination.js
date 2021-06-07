import paginateTpl from '../../template/pagination.hbs';

export default class NewPagination {
  constructor({ selector }) {
    this.page = 1;
    this.pageList = [];
    this.firstPage = 1;
    this.lastPage = 7;
    this.maxPage = 42;
    this.length = 9;
    this.pages = {};
    this.refs = this.getRefs(selector);
    this.createPaginationArrow();
  }

  getRefs(selector) {
    const refs = {};
    refs.paginateContainer = document.querySelector(selector);
    return refs;
  }

  updatePageList() {
    this.updateArrowBtn();
    this.clearPaginationContainer();
    this.pages = {};
    this.pageList = [];
    const mobileStart = this.length <= 5 && this.page < this.length - 2;
    const mobileMiddle = this.length <= 5 && this.page >= 3 && this.page <= this.maxPage - 2;
    const mobileEnd =
      (this.length <= 5 && this.page >= this.maxPage - this.length + 2) ||
      this.page == this.maxPage;
    const start = this.page <= this.length - 3;
    const end = this.page >= this.maxPage - this.length + 4 || this.page == this.maxPage;

    if (mobileStart) {
      for (let i = this.firstPage; i <= this.length; i += 1) {
        this.pageList.push(i);
      }
      this.pages = {
        pageList: this.pageList,
        maxPage: this.maxPage,
      };
    } else if (mobileMiddle) {
      for (
        let i = +this.page - Math.round((this.length - 1) / 2);
        i <= +this.page + Math.round((this.length - 1) / 2);
        i += 1
      ) {
        this.pageList.push(i);
      }
      this.pages = {
        pageList: this.pageList,
        maxPage: this.maxPage,
      };
    } else if (mobileEnd) {
      for (let i = this.maxPage - this.length + 1; i <= this.maxPage; i += 1) {
        this.pageList.push(i);
      }
      this.pages = {
        pageList: this.pageList,
        maxPage: this.maxPage,
      };
    } else if (start) {
      for (let i = this.firstPage; i <= this.length - 2; i += 1) {
        this.pageList.push(i);
      }
      this.pages = {
        start: true,
        end: false,
        middle: false,
        pageList: this.pageList,
        maxPage: this.maxPage,
      };
    } else if (end) {
      for (let i = this.maxPage - this.length + 3; i <= this.maxPage; i += 1) {
        this.pageList.push(i);
      }
      this.pages = {
        start: false,
        end: true,
        middle: false,
        pageList: this.pageList,
        maxPage: this.maxPage,
      };
    } else {
      for (
        let i = this.page - Math.round((this.length - 5) / 2);
        i <= +this.page + Math.round((this.length - 5) / 2);
        i += 1
      ) {
        this.pageList.push(i);
      }
      this.pages = {
        start: false,
        end: false,
        middle: true,
        pageList: this.pageList,
        maxPage: this.maxPage,
      };
    }
    this.appendPaginationMarkup();
  }

  createPaginationArrow() {
    const prevPageEl = document.createElement('div');
    prevPageEl.classList = 'pagination-arrow arrow_left';
    prevPageEl.dataset.action = 'prev-page';
    this.refs.paginateContainer.before(prevPageEl);
    const nextPageEl = document.createElement('div');
    nextPageEl.classList = 'pagination-arrow arrow_right';
    nextPageEl.dataset.action = 'next-page';
    this.refs.paginateContainer.after(nextPageEl);
    this.refs.prevPageBtn = prevPageEl;
    this.refs.nextPageBtn = nextPageEl;
  }

  appendPaginationMarkup() {
    this.refs.paginateContainer.insertAdjacentHTML('beforeend', paginateTpl(this.pages));
    const currentEl = document.querySelector(`[data-page="${this.page}"]`);
    currentEl.parentElement.classList.add('active');
  }

  clearPaginationContainer() {
    this.refs.paginateContainer.innerHTML = '';
  }

  resetPage() {
    this.page = 1;
  }

  incrementPage() {
    this.page = +this.page + 1;
    this.updatePageList();
  }

  decrementPage() {
    this.page = +this.page - 1;
    this.updatePageList();
  }

  show() {
    this.refs.paginateContainer.classList.remove('is-hidden');
  }

  hide() {
    this.refs.paginateContainer.classList.add('is-hidden');
  }

  updateArrowBtn() {
    this.refs.nextPageBtn.dataset.disabled = this.page == this.maxPage;
    this.refs.prevPageBtn.dataset.disabled = this.page == 1;
  }
}
