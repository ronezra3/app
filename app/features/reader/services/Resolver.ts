import {CurrentBook} from '../../books/services/CurrentBook';
import {CurrentBookActivities} from '../../books/services/CurrentBookActivities';
import {ValidationHandler} from '../../../3rdparty/common/services/ValidationHandler';
import {BookFilesStock} from '../../books/services/BookFilesStock';
import {CurrentSession} from '../../session/services/CurrentSession';
export class ReaderResolver {
  get() {
    return {
      bookInfo: this.bookInfo,
      bookActivities: this.bookActivities,
      isTeacher: this.isTeacher,
      pageUrl: this.pageUrl,
      bookFile: this.bookFile
    };
  }

  /*@ngInject*/
  bookInfo(CurrentBook : CurrentBook, $stateParams, $q, ValidationHandler : ValidationHandler, BooksStore) {
    CurrentBook.clear();
    return BooksStore.get($stateParams['bookId'])
      .then((bookInfo) => {
        CurrentBook.info = bookInfo;

        return bookInfo;
      }).catch((err) => {
        ValidationHandler.handle(`cannot_find_book_info`);
        return $q.reject(`cannot_find_book_info: ${err}`);
      });
  }

  /*@ngInject*/
  bookFile(bookInfo, BookFilesStock : BookFilesStock) {
    return BookFilesStock.get(bookInfo);
  }

  /*@ngInject*/
  pageUrl(bookInfo, Together, CurrentSession : CurrentSession, $stateParams, LastBookPage) {    
    if (Together.isInTogether() && !Together.inControl()) {
      return CurrentSession.getInfo().together.pageUrl;
    }

    let classId = $stateParams['classId'];
    return LastBookPage.get(bookInfo.id, classId).catch(() => null);
  }

  /*@ngInject*/
  bookActivities(CurrentBookActivities : CurrentBookActivities, $stateParams, ValidationHandler) {
    CurrentBookActivities.clear();
    return CurrentBookActivities.init($stateParams['bookId'], $stateParams['classId']).then(() => CurrentBookActivities.get())
      .catch(() => ValidationHandler.handle('error_loading_activities'));
  }

  /*@ngInject*/
  isTeacher(ClassesStore, $stateParams) {
    return ClassesStore.get($stateParams['classId']).then((classInfo) => classInfo.isTeacher());
  }
}
