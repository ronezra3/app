"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SvgBookStorage = /** @class */ (function () {
    function SvgBookStorage(lodash, CachedSvgNodes, $q, book) {
        this.lodash = lodash;
        this.CachedSvgNodes = CachedSvgNodes;
        this.$q = $q;
        this._queue = [];
        this._current = null;
        this._seq = 0;
        this.MAX_CACHED_PAGES = 2;
        this.DEBUG = false;
        this.pagesPreLoaded = [];
        this._nodes = CachedSvgNodes(book);
        this.bookUrls = JSON.parse(localStorage.getItem('bookUrl'));
        this.preloadImages(this.bookUrls);
    }
    SvgBookStorage.prototype.preloadImages = function (imagesUrls) {
        // if (!preloadImages.list) {
        //     preloadImages.list = [];
        // }
        // var list = preloadImages.list;
        for (var i = 0; i < imagesUrls.length; i++) {
            var img = new Image();
            img.onload = function () {
                // var index = list.indexOf(this);
                // if (index !== -1) {
                //     // remove image from the array once it's loaded
                //     // for memory consumption reasons
                //     list.splice(index, 1);
                // }
            };
            this.pagesPreLoaded.push(img);
            img.src = imagesUrls[i];
        }
    };
    SvgBookStorage.prototype.fetchPage = function (pageIndex) {
        return this.pagesPreLoaded[pageIndex] ? this.pagesPreLoaded[pageIndex] : this.bookUrls[pageIndex];
        // var node = this._nodes[pageUrl];
        // this.debug('fetching page:', pageUrl);
        // if (!node) {
        //   return this.$q.reject();
        // }
        // return node.load()
        //   .then((svg) => {
        //     this._loadAdjacentPages(node);
        //     return svg;
        //   });
    };
    SvgBookStorage.prototype.debug = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!this.DEBUG)
            return;
        args = this.lodash.toArray(args);
        var now = Date.now();
        var last = (this.debug['_last'] || now);
        var ns = '[SvgBookStorage]';
        args = [ns].concat(args);
        args.push(' >> dt: ' + (now - last));
        console.log.apply(console, args);
        this.debug['_last'] = Date.now();
    };
    SvgBookStorage.prototype._createCacheQueue = function (node) {
        var newQueue = [];
        var left = node.previous();
        var right = node.next();
        while ((left || right) && newQueue.length < this.MAX_CACHED_PAGES) {
            if (right) {
                newQueue.push(right);
                right = right.next();
            }
            if (left) {
                newQueue.push(left);
                left = left.previous();
            }
        }
        this._queue = newQueue;
    };
    ;
    SvgBookStorage.prototype._prune = function (node) {
        var center = node.index();
        var offset = parseInt((this.MAX_CACHED_PAGES / 2).toString());
        var unusedNodes = this.lodash.filter(this._nodes, function (node) { return Math.abs(node.index() - center) > offset; });
        this.lodash.invoke(unusedNodes, 'clear');
    };
    SvgBookStorage.prototype._dispatchNext = function (seq) {
        if (this._queue.length === 0 || this._seq !== seq)
            return;
        this.debug('dispatching next node... seq:', seq);
        this._current = this._queue.shift();
        this._current.lowPriorityLoad().then(this.lodash.partial(this._dispatchNext.bind(this), seq));
    };
    SvgBookStorage.prototype._processQueue = function () {
        if (this._current)
            this._current.pause();
        this._dispatchNext(++this._seq);
    };
    SvgBookStorage.prototype._loadAdjacentPages = function (currentNode) {
        this._createCacheQueue(currentNode);
        this._prune(currentNode);
        this._processQueue();
    };
    return SvgBookStorage;
}());
exports.SvgBookStorage = SvgBookStorage;
/*@ngInject*/
function SvgBookStorageFactory(lodash, CachedSvgNodes, $q) {
    return function (book) { return new SvgBookStorage(lodash, CachedSvgNodes, $q, book); };
}
exports.SvgBookStorageFactory = SvgBookStorageFactory;
//# sourceMappingURL=SvgBookStorage.js.map