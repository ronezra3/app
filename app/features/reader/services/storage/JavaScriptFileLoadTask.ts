import IQService = angular.IQService;
import LoDashStatic = _.LoDashStatic;
declare var escape : any;

class JavaScriptFileLoadTask {
  private _progress = this.$q.defer();
  private _running = false;
  private _done = false;
  private _control = null;
  private _key;
  private _fileEntry;

  constructor(fileEntry, key, private lodash : LoDashStatic, private $q : IQService, private lnCrypto) {
    this._key = key;
    this._fileEntry = fileEntry;
  }

  load() {
    if (!this._done)
      this._getReadyToDecrypt().then(this._decryptAll.bind(this));

    return this._progress.promise;
  }

  lowPriorityLoad() {
    if (!this._done && !this._running)
      this._getReadyToDecrypt()
        .then(() => {
          this._running = true;
          this._decryptNextRound();
        });

    return this._progress.promise;
  };

  pause() {
    this._running = false;
  };

  private fetchPageData(fileEntry) {
    var defer = this.$q.defer();

    fileEntry.file((file) => {
      var reader = new FileReader();

      reader.onloadend = (e : any) => {
        try {
          let result = decodeURIComponent(escape(e.target.result));
          defer.resolve(result);
        } catch (e) {
          console.error(`cannot convert binary string to text for: ${file.name}`);
          defer.reject(e);
        }
      };

      reader.onerror = (e : any) => {
        console.error(`cannot read file: ${file.name}, error-code: ${e.target.error.code}`);
        defer.reject(e.target.error);
      };

      reader.readAsBinaryString(file);

    }, defer.reject);

    return defer.promise;
  }

  private resolvedPromise(data) {
    var q = this.$q.defer();

    q.resolve(data);
    return q.promise;
  }

  private _getReadyToDecrypt() {
    if (this._control)
      return this.resolvedPromise(this._control);

    return this.fetchPageData(this._fileEntry)
      .then(((data) => {
        return this._control = this.lnCrypto.progressiveDecrypt(data, this._key);
      }).bind(this));
  }

  private _decryptNextRound() {
    this.lodash.defer(this._decryptRound.bind(this));
  }

  private _decryptRound() {
    if (!this._running)
      return;

    this._control.decryptNext();

    if (this._control.finished()) {
      this._resolve();
    } else {
      this._decryptNextRound();
    }
  }

  private _resolve() {
    var data = this._control.result();

    this._running = false;
    this._done = true;
    this._control = null;
    this._progress.resolve(data);
  }

  private _decryptAll() {
    while (!this._control.finished())
      this._control.decryptNext();

    this._resolve();

    return this._progress.promise;
  }
}

/*@ngInject*/
export function JavaScriptFileLoadTaskFactory(lodash, $q, lnCrypto) {
  return (fileEntry, key) => new JavaScriptFileLoadTask(fileEntry, key, lodash, $q, lnCrypto);
}
