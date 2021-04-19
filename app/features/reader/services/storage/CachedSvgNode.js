"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*@ngInject*/
var CachedSvgNode = /** @class */ (function () {
    function CachedSvgNode(lodash, FileSystemUtilities, $q, FileLoadTask, BookFilesStock, DeviceUtilities, _book, _index, _previous) {
        this.lodash = lodash;
        this.FileSystemUtilities = FileSystemUtilities;
        this.$q = $q;
        this.FileLoadTask = FileLoadTask;
        this.BookFilesStock = BookFilesStock;
        this.DeviceUtilities = DeviceUtilities;
        this._book = _book;
        this._index = _index;
        this._previous = _previous;
        this.DEBUG = false;
        this._loader = null;
        this._resolved = false;
        this._next = null;
        this._pageUrl = _book.id + "_" + _index + ".svg";
        this._key = this.getDecryptionKey(_book.id, this._index);
        this._progress = $q.defer();
        if (_previous) {
            _previous._next = this;
        }
    }
    CachedSvgNode.prototype.load = function () {
        if (this._resolved) {
            this.debug(this._pageUrl, 'load() is resolved [cache hit]');
        }
        else {
            this.debug(this._pageUrl, 'stating load()');
            this._setupFileLoader()
                .then(function (loader) { return loader.load(); })
                .then(this._convertAndResolve.bind(this));
        }
        return this._progress.promise;
    };
    CachedSvgNode.prototype.lowPriorityLoad = function () {
        if (this._resolved) {
            this.debug(this._pageUrl, 'lowPriorityLoad() is resolved [cache hit]');
            return this._progress.promise;
        }
        return this._setupFileLoader()
            .then(function (loader) { return loader.lowPriorityLoad(); })
            .then(this._convertAndResolve.bind(this));
    };
    CachedSvgNode.prototype.clear = function () {
        this._progress = this.$q.defer();
        this._loader = null;
        this._resolved = false;
    };
    CachedSvgNode.prototype.pause = function () {
        if (this._loader) {
            this._loader.pause();
        }
    };
    CachedSvgNode.prototype.next = function () {
        return this._next;
    };
    CachedSvgNode.prototype.previous = function () {
        return this._previous;
    };
    CachedSvgNode.prototype.index = function () {
        return this._index;
    };
    CachedSvgNode.prototype.debug = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!this.DEBUG) {
            return;
        }
        args = this.lodash.toArray(args);
        var now = Date.now();
        var last = (this.debug['_last'] || now);
        var ns = '[SvgCacheNode]';
        args = [ns].concat(args);
        args.push(' >> dt: ' + (now - last));
        console.log.apply(console, args);
        this.debug['_last'] = Date.now();
    };
    CachedSvgNode.prototype.getDecryptionKey = function (bookId, pageNumber) {
        var decryptionPrefix = new Date(2015, 8, 1).toDateString();
        return decryptionPrefix + bookId + pageNumber;
    };
    CachedSvgNode.prototype.fetchPageFileEntry = function (book, pageUrl) {
        return this.BookFilesStock.get(book)
            .then(function (info) { return info.localDirPath() + '/' + pageUrl; })
            .then(this.FileSystemUtilities.getFileEntry);
    };
    CachedSvgNode.prototype.toSvg = function (svgString) {
        var div = document.createElement('div');
        div.innerHTML = svgString;
        var svg = div.getElementsByTagName('svg')[0];
        if (this.DeviceUtilities.isWindows()) {
            svg.setAttribute('preserveAspectRatio', 'xMidYMin slice');
        }
        else {
            svg.setAttribute('preserveAspectRatio', 'xMaxYMax');
        }
        svg.style.height = 'auto';
        svg.setAttribute('height', '100%');
        svg.setAttribute('width', '100%');
        return svg;
    };
    CachedSvgNode.prototype._setupFileLoader = function () {
        var _this = this;
        if (this._loader) {
            return this.$q.resolve(this._loader);
        }
        return this.fetchPageFileEntry(this._book, this._pageUrl)
            .then(function (fileInfo) { return _this._loader = new _this.FileLoadTask(fileInfo, _this._key); });
    };
    CachedSvgNode.prototype._convertAndResolve = function (result) {
        if (this._resolved) {
            return this.debug(this._pageUrl, 'is already resolved');
        }
        var svg = this.toSvg(result);
        this._loader = null; // free tons of memory
        this._resolved = true;
        this.debug(this._pageUrl, 'converted & resolved');
        this._progress.resolve(svg);
    };
    return CachedSvgNode;
}());
exports.CachedSvgNode = CachedSvgNode;
/*@ngInject*/
function CachedSvgNodes(lodash, FileSystemUtilities, $q, FileLoadTask, BookFilesStock, DeviceUtilities) {
    return function (book) {
        var pages = parseInt(book.numberOfPages);
        var nodes = {};
        var last = null;
        lodash.times(pages, function (index) {
            var node = new CachedSvgNode(lodash, FileSystemUtilities, $q, FileLoadTask, BookFilesStock, DeviceUtilities, book, index + 1, last);
            nodes[index + 1] = node;
            last = node;
        });
        return nodes;
    };
}
exports.CachedSvgNodes = CachedSvgNodes;
//# sourceMappingURL=CachedSvgNode.js.map