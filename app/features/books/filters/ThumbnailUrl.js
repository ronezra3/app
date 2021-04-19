"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*@ngInject*/
function ThumbnailUrl(ENV, StorageConfig) {
    return function (book) {
        if (book.id == 1 || book.id == 2) {
            return "images/books/" + book.id + "/thumbnail.png";
        }
        else {
            return ENV.storageBaseUrl + "/" + StorageConfig.thumbnailFolder + "/" + book.id + "." + book.thumbnailType;
        }
    };
}
exports.ThumbnailUrl = ThumbnailUrl;
//# sourceMappingURL=ThumbnailUrl.js.map