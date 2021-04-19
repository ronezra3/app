/*@ngInject*/
export class CachedSvgNode {
  private DEBUG = false;
  private _pageUrl;
  private _key;
  private _loader = null;
  private _progress;
  private _resolved = false;
  private _next = null;

  constructor(private lodash, private FileSystemUtilities, private $q, private FileLoadTask, private BookFilesStock,
              private DeviceUtilities, private _book, private _index, private _previous) {

    this._pageUrl = `${_book.id}_${_index}.svg`;
    this._key = this.getDecryptionKey(_book.id, this._index);
    this._progress = $q.defer();

    if (_previous) {
      _previous._next = this;
    }
  }

  load() {
    if (this._resolved) {
      this.debug(this._pageUrl, 'load() is resolved [cache hit]');
    } else {
      this.debug(this._pageUrl, 'stating load()');

      this._setupFileLoader()
        .then((loader) => loader.load())
        .then(this._convertAndResolve.bind(this));
    }

    return this._progress.promise;
  }

  lowPriorityLoad() {
    if (this._resolved) {
      this.debug(this._pageUrl, 'lowPriorityLoad() is resolved [cache hit]');
      return this._progress.promise;
    }

    return this._setupFileLoader()
      .then((loader) => loader.lowPriorityLoad())
      .then(this._convertAndResolve.bind(this));
  }

  clear() {
    this._progress = this.$q.defer();
    this._loader = null;
    this._resolved = false;
  }

  pause() {
    if (this._loader) {
      this._loader.pause();
    }
  }

  next() {
    return this._next;
  }

  previous() {
    return this._previous;
  }

  index() {
    return this._index;
  }

  private debug(...args) {
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
  }


  private getDecryptionKey(bookId, pageNumber) {
    let decryptionPrefix = new Date(2015, 8, 1).toDateString();
    return decryptionPrefix + bookId + pageNumber;
  }

  private fetchPageFileEntry(book, pageUrl) {
    return this.BookFilesStock.get(book)
      .then((info) => info.localDirPath() + '/' + pageUrl)
      .then(this.FileSystemUtilities.getFileEntry);
  }

  private toSvg(svgString) {
    var div = document.createElement('div');
    div.innerHTML = svgString;

    var svg : any = div.getElementsByTagName('svg')[0];
    if (this.DeviceUtilities.isWindows()) {
      svg.setAttribute('preserveAspectRatio', 'xMidYMin slice');
    } else {
      svg.setAttribute('preserveAspectRatio', 'xMaxYMax');
    }

    svg.style.height = 'auto';
    svg.setAttribute('height', '100%');
    svg.setAttribute('width', '100%');

    return svg;
  }

  private _setupFileLoader() {
    if (this._loader) {
      return this.$q.resolve(this._loader);
    }

    return this.fetchPageFileEntry(this._book, this._pageUrl)
      .then((fileInfo) => this._loader = new this.FileLoadTask(fileInfo, this._key));
  }

  private _convertAndResolve(result) {
    if (this._resolved) {
      return this.debug(this._pageUrl, 'is already resolved');
    }

    var svg = this.toSvg(result);

    this._loader = null; // free tons of memory
    this._resolved = true;

    this.debug(this._pageUrl, 'converted & resolved');
    this._progress.resolve(svg);
  }
}

/*@ngInject*/
export function CachedSvgNodes(lodash, FileSystemUtilities, $q, FileLoadTask, BookFilesStock, DeviceUtilities) {
  return (book) => {
    var pages = parseInt(book.numberOfPages);
    var nodes = {};
    var last = null;

    lodash.times(pages, function (index) {
      var node = new CachedSvgNode(lodash, FileSystemUtilities, $q, FileLoadTask, BookFilesStock,
        DeviceUtilities, book, index + 1, last);

      nodes[index + 1] = node;
      last = node;
    });

    return nodes;
  };
}
