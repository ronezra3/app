"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BookThumbnailController = /** @class */ (function () {
    /*@ngInject*/
    function BookThumbnailController(BookFilesStock, BookDownloader, Together, TogetherEventsRouter, $state) {
        this.BookFilesStock = BookFilesStock;
        this.BookDownloader = BookDownloader;
        this.Together = Together;
        this.TogetherEventsRouter = TogetherEventsRouter;
        this.$state = $state;
    }
    BookThumbnailController.prototype.$onInit = function () {
        var _this = this;
        this.BookFilesStock.get(this.book).then(function (file) {
            _this.file = file;
            //this.downloadPromise = file.getDownloadPromise();
            // this.file.isAvailable = true;
            //   this.TogetherEventsRouter.onBookDownloadStarted(this.book.id, (promise) => this.downloadPromise = promise);
            _this.file.getDownloadUrl(_this.file.book.id, _this.file.book.numberOfPages).then(function (res) {
                console.log(res.data);
                localStorage.setItem('bookUrl', JSON.stringify(res.data));
                // this.$state.go(`^.reader.svg`, { bookId: this.file.book.id })
                //ui-sref="^.reader.svg({bookId: $ctrl.book.id})"
            });
        });
    };
    BookThumbnailController.prototype.canOpen = function () {
        return !this.Together.isControlled();
    };
    // fileDownloaded() {
    //   return this.file && this.file.isAvailable;
    // }
    BookThumbnailController.prototype.download = function (id) {
        this.$state.go("^.reader.svg", { bookId: id });
        // this.file.book.numberOfPages;
        // //$event.stopPropagation();
        // //return this.downloadPromise = this.BookDownloader.download(this.file);
        // this.file.getDownloadUrl(id, this.file.book.numberOfPages).then((res) => {
        //   console.log(res.data)
        //   localStorage.setItem('bookUrl', JSON.stringify(res.data));
        //   //ui-sref="^.reader.svg({bookId: $ctrl.book.id})"
        // })
    };
    return BookThumbnailController;
}());
var template = "\n<button ng-click=\"$ctrl.download($ctrl.book.id)\" ng-disabled=\"!$ctrl.canOpen()\">\n  <img class=\"thumbnail\" csp-src=\"{{$ctrl.book | thumbnailUrl}}\"/>\n</button>\n";
// <div class="overlay" ng-if="false">
//   <click-once-button ng-hide="$ctrl.fileDownloaded()" class="download"
//                     on-click="$ctrl.download($event)" clicked="$ctrl.downloadPromise">
//     <ng-include src="'images/arrow_download.svg'"></ng-include>
//     <circular-progress-bar color="#19C26B" ng-if="$ctrl.downloadPromise" download-promise="$ctrl.downloadPromise"></circular-progress-bar>
//   </click-once-button>
// </div>
var BookThumbnail = /** @class */ (function () {
    function BookThumbnail() {
        this.controller = BookThumbnailController;
        this.template = template;
        this.bindings = {
            book: '<'
        };
    }
    return BookThumbnail;
}());
exports.BookThumbnail = BookThumbnail;
//# sourceMappingURL=BookThumbnail.js.map