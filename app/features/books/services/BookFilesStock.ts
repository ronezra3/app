import {BookFile} from './BookFile';
import IPromise = angular.IPromise;
export class BookFilesStock {
  private stock = {};

  /*@ngInject*/
  constructor(private BookFileFactory, private $q) {
  }

  get(book) : IPromise<BookFile> {
    if (this.stock[book.id]) {
      return this.$q.resolve(this.stock[book.id]);
    }

    this.stock[book.id] = this.BookFileFactory(book);
    return this.stock[book.id].init().then(() => {
      return this.stock[book.id];
    });
  }

  clear() {
    this.stock = {};
  }
}
