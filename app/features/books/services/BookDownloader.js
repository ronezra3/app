"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BookDownloader = /** @class */ (function () {
    /*@ngInject*/
    function BookDownloader(ValidationHandler, Localytics) {
        this.ValidationHandler = ValidationHandler;
        this.Localytics = Localytics;
    }
    BookDownloader.prototype.download = function (file) {
        var _this = this;
        this.Localytics.tagEvent('Book Download Started');
        return file.download().then(function () { return _this.Localytics.tagEvent('Book Download Ended'); })
            .catch(function () { return _this.ValidationHandler.handle('book_download_error'); });
    };
    return BookDownloader;
}());
exports.BookDownloader = BookDownloader;
//# sourceMappingURL=BookDownloader.js.map