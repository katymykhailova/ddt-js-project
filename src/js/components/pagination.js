import paginateTpl from '../../template/pagination.hbs';

export default class NewPagination {
  constructor({ selector }) {
    this.refs = this.getRefs(selector);
    this.currentPage = 1;
    this.pageList = [];
    this.firstPage = 1;
    this.lastPage = 7;
    this.maxPage = 42;
    this.length = 9;
    this.pages = {};
  }

  getRefs(selector) {
    const refs = {};
    refs.paginateContainer = document.querySelector(selector);
    return refs;
  }

  updatePageList() {
    this.clearPaginationContainer();
    this.pages = {};
    this.pageList = [];
    if (this.currentPage <= this.length - 3) {
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
    } else if (
      this.currentPage >= this.maxPage - this.length + 4 ||
      this.currentPage == this.maxPage
    ) {
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
        let i = this.currentPage - Math.round((this.length - 5) / 2);
        i <= +this.currentPage + Math.round((this.length - 5) / 2);
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

  appendPaginationMarkup() {
    this.refs.paginateContainer.insertAdjacentHTML('beforeend', paginateTpl(this.pages));
    const currentEl = document.querySelector(`[data-page="${this.currentPage}"]`);
    currentEl.parentElement.classList.add('active');
  }

  clearPaginationContainer() {
    this.refs.paginateContainer.innerHTML = '';
  }

  resetCurrentPage() {
    this.currentPage = 1;
  }

  incrementCurrentPage() {
    this.currentPage = +this.currentPage + 1;
    this.updatePageList();
  }

  decrementCurrentPage() {
    this.currentPage = +this.currentPage - 1;
    this.updatePageList();
  }

  show() {
    this.refs.paginateContainer.classList.remove('is-hidden');
  }

  hide() {
    this.refs.paginateContainer.classList.add('is-hidden');
  }
}
