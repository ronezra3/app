import IAngularEvent = angular.IAngularEvent;
import { TogetherEventsRouter } from '../../together/services/TogetherEventsRouter';
import { BookDownloader } from '../services/BookDownloader';
import { BookFilesStock } from '../services/BookFilesStock';
import { BookFile } from '../services/BookFile';

class BookThumbnailController {
  book;
  file: BookFile;
  downloadPromise;

  /*@ngInject*/
  constructor(private BookFilesStock: BookFilesStock, private BookDownloader: BookDownloader, private Together,
    private TogetherEventsRouter: TogetherEventsRouter, private $state) {
  }

  $onInit() {
    this.BookFilesStock.get(this.book).then((file: BookFile) => {
      this.file = file;
      //this.downloadPromise = file.getDownloadPromise();
      // this.file.isAvailable = true;
      //   this.TogetherEventsRouter.onBookDownloadStarted(this.book.id, (promise) => this.downloadPromise = promise);
      this.file.getDownloadUrl(this.file.book.id, this.file.book.numberOfPages).then((res) => {
        console.log(res.data)
        localStorage.setItem('bookUrl', JSON.stringify(res.data));
        // this.$state.go(`^.reader.svg`, { bookId: this.file.book.id })
        //ui-sref="^.reader.svg({bookId: $ctrl.book.id})"
      })
    });
  }

  canOpen() {
    return !this.Together.isControlled();
  }

  // fileDownloaded() {
  //   return this.file && this.file.isAvailable;
  // }

  download(id) {
      this.$state.go(`^.reader.svg`, { bookId: id })
    
    // this.file.book.numberOfPages;
    // //$event.stopPropagation();
    // //return this.downloadPromise = this.BookDownloader.download(this.file);
    // this.file.getDownloadUrl(id, this.file.book.numberOfPages).then((res) => {
    //   console.log(res.data)
    //   localStorage.setItem('bookUrl', JSON.stringify(res.data));
    //   //ui-sref="^.reader.svg({bookId: $ctrl.book.id})"
    // })
  }
}

const template = `
<button ng-click="$ctrl.download($ctrl.book.id)" ng-disabled="!$ctrl.canOpen()">
  <img class="thumbnail" csp-src="{{$ctrl.book | thumbnailUrl}}"/>
</button>
`;


// <div class="overlay" ng-if="false">
//   <click-once-button ng-hide="$ctrl.fileDownloaded()" class="download"
//                     on-click="$ctrl.download($event)" clicked="$ctrl.downloadPromise">
//     <ng-include src="'images/arrow_download.svg'"></ng-include>
//     <circular-progress-bar color="#19C26B" ng-if="$ctrl.downloadPromise" download-promise="$ctrl.downloadPromise"></circular-progress-bar>
//   </click-once-button>
// </div>

export class BookThumbnail {
  controller = BookThumbnailController;
  template = template;
  bindings: any = {
    book: '<'
  };
}
