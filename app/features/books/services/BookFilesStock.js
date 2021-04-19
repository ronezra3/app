"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BookFilesStock = /** @class */ (function () {
    /*@ngInject*/
    function BookFilesStock(BookFileFactory, $q) {
        this.BookFileFactory = BookFileFactory;
        this.$q = $q;
        this.stock = {};
    }
    BookFilesStock.prototype.get = function (book) {
        var _this = this;
        if (this.stock[book.id]) {
            return this.$q.resolve(this.stock[book.id]);
        }
        this.stock[book.id] = this.BookFileFactory(book);
        return this.stock[book.id].init().then(function () {
            return _this.stock[book.id];
        });
    };
    BookFilesStock.prototype.clear = function () {
        this.stock = {};
    };
    return BookFilesStock;
}());
exports.BookFilesStock = BookFilesStock;
//# sourceMappingURL=BookFilesStock.js.map