"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*@ngInject*/
function LastBookPage(LocalStorageFactory) {
    function getStorageId(bookId, classId) {
        return bookId + '-' + classId + '-lastPage';
    }
    function get(bookId, classId) {
        return LocalStorageFactory.get(getStorageId(bookId, classId));
    }
    function set(bookId, classId, page) {
        return LocalStorageFactory.set(getStorageId(bookId, classId), page);
    }
    return {
        get: get,
        set: set
    };
}
exports.LastBookPage = LastBookPage;
//# sourceMappingURL=LastBookPage.js.map