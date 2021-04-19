export class SvgBookStorage {
  private _queue = [];
  private _current = null;
  private _seq = 0;
  private MAX_CACHED_PAGES = 2;
  private DEBUG = false;
  private _nodes;
  private bookUrls;
  private pagesPreLoaded = [];

  constructor(private lodash, private CachedSvgNodes, private $q, book) {
    this._nodes = CachedSvgNodes(book);
    // this.bookUrls = JSON.parse(localStorage.getItem('bookUrl'));
    this.bookUrls = ["images/books/2/1.jpeg","images/books/2/2.jpeg","images/books/2/3.jpeg","images/books/2/4.jpeg",
    "images/books/2/5.jpeg","images/books/2/6.jpeg","images/books/2/7.jpeg","images/books/2/8.jpeg",
    "images/books/2/9.jpeg","images/books/2/10.jpeg","images/books/2/11.jpeg","images/books/2/12.jpeg","images/books/2/13.jpeg","images/books/2/14.jpeg","images/books/2/15.jpeg",]
    this.preloadImages(this.bookUrls);
  }

  preloadImages(imagesUrls) {
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
      }
      this.pagesPreLoaded.push(img);
      img.src = imagesUrls[i];
    }
  }

  fetchPage(pageIndex) {
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


  }

  private debug(...args) {
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
  }

  private _createCacheQueue(node) {
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

  private _prune(node) {
    let center = node.index();
    let offset = parseInt((this.MAX_CACHED_PAGES / 2).toString());
    let unusedNodes = this.lodash.filter(this._nodes, (node) => Math.abs(node.index() - center) > offset);

    this.lodash.invoke(unusedNodes, 'clear');
  }

  private _dispatchNext(seq) {
    if (this._queue.length === 0 || this._seq !== seq)
      return;

    this.debug('dispatching next node... seq:', seq);


    this._current = this._queue.shift();
    this._current.lowPriorityLoad().then(this.lodash.partial(this._dispatchNext.bind(this), seq));
  }

  private _processQueue() {
    if (this._current)
      this._current.pause();

    this._dispatchNext(++this._seq);
  }

  private _loadAdjacentPages(currentNode) {
    this._createCacheQueue(currentNode);
    this._prune(currentNode);
    this._processQueue();
  }
}

/*@ngInject*/
export function SvgBookStorageFactory(lodash, CachedSvgNodes, $q) {
  return (book) => new SvgBookStorage(lodash, CachedSvgNodes, $q, book);
}
