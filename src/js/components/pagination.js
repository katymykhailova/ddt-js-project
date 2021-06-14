import paginateTpl from '../../template/pagination.hbs';

export default class NewPagination {
  constructor({ selector }) {
    this.metod = '';
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
    if (this.maxPage <= 1) {
      this.clearPagination();
      return;
    }
    this.updateArrowBtn();
    this.clearPaginationContainer();
    this.pages = {
      start: false,
      end: false,
      middle: false,
      pageList: [],
      maxPage: this.maxPage,
    };
    this.pageList = [];
    const mobileStart = this.length <= 5 && this.page < this.length - 2;
    const mobileMiddle = this.length <= 5 && this.page >= 3 && this.page <= this.maxPage - 2;
    const mobileEnd =
      this.length <= 5 &&
      (this.page >= this.maxPage - this.length + 2 || this.page == this.maxPage);
    const start = this.page <= this.length - 3;
    const end = this.page >= this.maxPage - this.length + 4 || this.page == this.maxPage;

    if (this.maxPage <= this.length) {
      for (let i = this.firstPage; i <= this.maxPage; i += 1) {
        this.pageList.push(i);
      }
      this.pages.pageList = this.pageList;
    } else if (mobileStart) {
      for (let i = this.firstPage; i <= this.length; i += 1) {
        this.pageList.push(i);
      }
      this.pages.pageList = this.pageList;
    } else if (mobileMiddle) {
      for (
        let i = +this.page - Math.round((this.length - 1) / 2);
        i <= +this.page + Math.round((this.length - 1) / 2);
        i += 1
      ) {
        this.pageList.push(i);
      }
      this.pages.pageList = this.pageList;
    } else if (mobileEnd) {
      for (let i = this.maxPage - this.length + 1; i <= this.maxPage; i += 1) {
        this.pageList.push(i);
      }
      this.pages.pageList = this.pageList;
    } else if (start) {
      for (let i = this.firstPage; i <= this.length - 2; i += 1) {
        this.pageList.push(i);
      }
      this.pages.start = true;
      this.pages.pageList = this.pageList;
    } else if (end) {
      for (let i = this.maxPage - this.length + 3; i <= this.maxPage; i += 1) {
        this.pageList.push(i);
      }
      this.pages.end = true;
      this.pages.pageList = this.pageList;
    } else {
      for (
        let i = this.page - Math.round((this.length - 5) / 2);
        i <= +this.page + Math.round((this.length - 5) / 2);
        i += 1
      ) {
        this.pageList.push(i);
      }
      this.pages.middle = true;
      this.pages.pageList = this.pageList;
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
    const currentEl = document.querySelector(`[data-pagepagination="${this.page}"]`);
    currentEl.parentElement.classList.add('active');
  }

  clearPaginationContainer() {
    this.refs.paginateContainer.innerHTML = '';
  }

  clearPagination() {
    this.refs.paginateContainer.innerHTML = '';
    this.refs.nextPageBtn.dataset.disabled = true;
    this.refs.prevPageBtn.dataset.disabled = true;
  }

  resetPage() {
    this.page = 1;
  }

  incrementPage() {
    this.page += 1;
    this.updatePageList();
  }

  decrementPage() {
    this.page -= 1;
    this.updatePageList();
  }

  show() {
    this.refs.paginateContainer.parentElement.classList.remove('is-hidden');
  }

  hide() {
    this.refs.paginateContainer.parentElement.classList.add('is-hidden');
  }

  updateArrowBtn() {
    this.refs.nextPageBtn.dataset.disabled =
      this.page == this.maxPage || this.maxPage <= this.length;
    this.refs.prevPageBtn.dataset.disabled = this.page == 1 || this.maxPage <= this.length;
  }
}
