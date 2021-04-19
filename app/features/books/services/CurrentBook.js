"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CurrentBook = /** @class */ (function () {
    function CurrentBook() {
    }
    Object.defineProperty(CurrentBook.prototype, "pageUrl", {
        get: function () {
            return this._pageUrl;
        },
        set: function (pageUrl) {
            this._pageUrl = pageUrl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CurrentBook.prototype, "info", {
        get: function () {
            return this._info;
        },
        set: function (info) {
            this._info = info;
        },
        enumerable: true,
        configurable: true
    });
    CurrentBook.prototype.clear = function () {
        this._info = null;
        this._pageUrl = null;
    };
    return CurrentBook;
}());
exports.CurrentBook = CurrentBook;
//# sourceMappingURL=CurrentBook.js.map