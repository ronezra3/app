import {BookDownloader} from '../../books/services/BookDownloader';
import {CurrentBook} from '../../books/services/CurrentBook';
import {CurrentSession} from '../../session/services/CurrentSession';
import {BookFilesStock} from '../../books/services/BookFilesStock';
import {BookFile} from '../../books/services/BookFile';

/*@ngInject*/
export class TogetherEventsRouter {
  private static REQUESTED_EVENT = 'together-request';
  private static REQUEST_CANCELLED_EVENT = 'together-request-canceled';
  private static GRANTED_EVENT = 'together-granted';
  private static BOOK_DOWNLOAD_STARTED = 'together-book-download-started';
  private static PAGE_CHANGED = 'together-page-changed';

  constructor(private Together, private $state, private BookDownloader : BookDownloader, private BooksStore, private BookFilesStock : BookFilesStock,
              private CurrentSession : CurrentSession, private CurrentBook : CurrentBook, private $rootScope) {
  }

  subscribe(isTeacher) {
    this.Together.onUpdated(this.update.bind(this));
    this.Together.onDeActivated(this.deActivate.bind(this));
    this.Together.onRequested(this.requested.bind(this));
    // this.Together.onRequestCanceled(this.requestCanceled.bind(this));

    if (!isTeacher) {
      this.Together.onGranted(this.granted.bind(this));
    }
  }

  unsubscribe() {
    this.Together.unSubscribe();
  }

  syncWith(currentSession, previousSession) {
    let togetherChanged = (currentSession.together.pageUrl !== previousSession.together.pageUrl)
      || (currentSession.together.bookId !== previousSession.together.bookId)
      || (currentSession.together.controllingUserId !== previousSession.together.controllingUserId);

    if (!togetherChanged) {
      return;
    }

    let inControl = this.Together.isInTogether() && this.Together.inControl();
    if (inControl) {
      return this.magnetizeCurrentView();
    }

    return this.sync(currentSession);
  }

  sync(currentSession) {
    if (!this.Together.isInTogether()) {
      return this.deActivate();
    }

    return this.syncTogetherView(currentSession.together);
  }

  onRequested(callback) {
    this.$rootScope.$on(TogetherEventsRouter.REQUESTED_EVENT, (event, data) => callback(data));
  }

  // onRequestCanceled(callback) {
  //   this.$rootScope.$on(TogetherEventsRouter.REQUEST_CANCELLED_EVENT, (event, data) => callback(data));
  // }

  onGranted(callback) {
    this.$rootScope.$on(TogetherEventsRouter.GRANTED_EVENT, (event, data) => callback(data));
  }

  onBookDownloadStarted(id, callback) {
    this.$rootScope.$on(`${TogetherEventsRouter.BOOK_DOWNLOAD_STARTED}-${id}`, (event, data) => callback(data));
  }

  onPageChanged(callback) {
    this.$rootScope.$on(TogetherEventsRouter.PAGE_CHANGED, (event, data) => callback(data));
  }

  private openBook(book : any) {
    let isInReader = this.isInReader();
    if(isInReader) return;
    return this.$state.go(`^.reader.${book.type}`,
      {bookId: book.id},
      // {force: true, replace: isInReader}
      );
  }

  private loadBook(id) {
    if(!id) return;
    return this.BooksStore.get(id).then((book) =>
      this.BookFilesStock.get(book).then((file : BookFile) => {
        // if (file.getDownloadPromise()) {
          // return;
        // }

        // if (file.isAvailable) {
          return this.openBook(book);
        // }

        // let promise = this.BookDownloader.download(file).then(() => {
        //   if (this.Together.isControlled() && this.CurrentSession.getInfo().together.bookId === book.id) {
        //     return this.openBook(book);
        //   }
        // });

        // this.$rootScope.$broadcast(`${TogetherEventsRouter.BOOK_DOWNLOAD_STARTED}-${id}`, promise);

        // return promise;
      }));
  }

  private closeBook() {
    this.$state.back(true);
  }

  private syncTogetherView(togetherInfo) {
    let inReader = this.isInReader();

    // if (!togetherInfo.bookId) {
    //   return inReader ? this.closeBook() : null;
    // }

    if (!inReader || togetherInfo.bookId && (this.$state.params.bookId !== togetherInfo.bookId)) {
      // return this.loadBook(togetherInfo.bookId);
    }

    if (togetherInfo.pageUrl) {
      this.$rootScope.$broadcast(TogetherEventsRouter.PAGE_CHANGED, togetherInfo.pageUrl);
    }
  }

  private isInReader() {
    return this.$state.includes('*.reader.*');
  }

  private update(togetherInfo) {
    let session = this.CurrentSession.getInfo();
    session.together = togetherInfo;

    this.syncTogetherView(togetherInfo);
  }

  private magnetizeCurrentView() {
    let inReader = this.isInReader();
    if (inReader) {
      return this.Together.update(this.$state.params.bookId, this.CurrentBook.pageUrl);
    }

    return this.Together.update();
  }

  private deActivate() {
    let session = this.CurrentSession.getInfo();
    session.together.bookId = null;
    session.together.pageUrl = null;
    session.together.controllingUserId = null;
  }

  private requested(studentId) {
    let session = this.CurrentSession.getInfo();
    session.together.requestingUserId = studentId;
    this.$rootScope.$broadcast(TogetherEventsRouter.REQUESTED_EVENT, studentId);
  }

  // private requestCanceled() {
  //   let session = this.CurrentSession.getInfo();
  //   session.together.requestingUserId = null;
  //   this.$rootScope.$broadcast(TogetherEventsRouter.REQUEST_CANCELLED_EVENT);
  // }

  private granted(userId) {
    let session = this.CurrentSession.getInfo();
    session.together.controllingUserId = userId;
    session.together.requestingUserId = null;

    if (this.Together.inControl()) {
      this.magnetizeCurrentView();
    }

    this.$rootScope.$broadcast(TogetherEventsRouter.GRANTED_EVENT);
  }
}
