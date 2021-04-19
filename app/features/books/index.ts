import {Books} from './directives/Books';
import {BookThumbnail} from './directives/BookThumbnail';
import {ThumbnailUrl} from './filters/ThumbnailUrl';

import {BookActivity} from './services/BookActivityFactory';
import {BookFileFactory} from './services/BookFile';
import {BookFilesStock} from './services/BookFilesStock';
import {BookDownloader} from './services/BookDownloader';
import {BooksProxy} from './services/BooksProxy';
import {BooksStore} from './services/BooksStore';
import {CurrentBook} from './services/CurrentBook';
import {LastBookPage} from './services/LastBookPage';
import {CurrentBookActivities} from './services/CurrentBookActivities';
import {LogOut} from '../../3rdparty/common/services/LogOut';

export default angular.module('LearniApp.books', [])
  .value('BooksValues', {
    'localPath': '.84638004-7b1b-4388-bbaa-06490efdea27/'
  })
  .component('books', new Books())
  .component('bookThumbnail', new BookThumbnail())
  .filter('thumbnailUrl', ThumbnailUrl)
  .service('BookFilesStock', BookFilesStock)
  .service('BookDownloader', BookDownloader)
  .service('CurrentBook', CurrentBook)
  .service('CurrentBookActivities', CurrentBookActivities)
  .factory('BookActivity', BookActivity)
  .factory('BookFileFactory', BookFileFactory)
  .factory('BooksProxy', BooksProxy)
  .service('BooksStore', BooksStore)
  .factory('LastBookPage', LastBookPage)
  .run((LogOut : LogOut, CurrentBookActivities : CurrentBookActivities, CurrentBook : CurrentBook, BookFilesStock : BookFilesStock) => {
    LogOut.onLoggingOut(() => {
      CurrentBook.clear();
      CurrentBookActivities.clear();
      BookFilesStock.clear();
    });
  })
  .name;
