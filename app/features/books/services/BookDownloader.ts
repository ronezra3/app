import {Localytics} from '../../common/services/Localytics';
import {ValidationHandler} from '../../../3rdparty/common/services/ValidationHandler';
import {BookFile} from './BookFile';

export class BookDownloader {

  /*@ngInject*/
  constructor(private ValidationHandler : ValidationHandler, private Localytics : Localytics) {
  }

  download(file: BookFile) {
    this.Localytics.tagEvent('Book Download Started');
    return file.download().then(() => this.Localytics.tagEvent('Book Download Ended'))
      .catch(() => this.ValidationHandler.handle('book_download_error'));
  }
}
