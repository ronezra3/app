"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JavaScriptFileLoadTask = /** @class */ (function () {
    function JavaScriptFileLoadTask(fileEntry, key, lodash, $q, lnCrypto) {
        this.lodash = lodash;
        this.$q = $q;
        this.lnCrypto = lnCrypto;
        this._progress = this.$q.defer();
        this._running = false;
        this._done = false;
        this._control = null;
        this._key = key;
        this._fileEntry = fileEntry;
    }
    JavaScriptFileLoadTask.prototype.load = function () {
        if (!this._done)
            this._getReadyToDecrypt().then(this._decryptAll.bind(this));
        return this._progress.promise;
    };
    JavaScriptFileLoadTask.prototype.lowPriorityLoad = function () {
        var _this = this;
        if (!this._done && !this._running)
            this._getReadyToDecrypt()
                .then(function () {
                _this._running = true;
                _this._decryptNextRound();
            });
        return this._progress.promise;
    };
    ;
    JavaScriptFileLoadTask.prototype.pause = function () {
        this._running = false;
    };
    ;
    JavaScriptFileLoadTask.prototype.fetchPageData = function (fileEntry) {
        var defer = this.$q.defer();
        fileEntry.file(function (file) {
            var reader = new FileReader();
            reader.onloadend = function (e) {
                try {
                    var result = decodeURIComponent(escape(e.target.result));
                    defer.resolve(result);
                }
                catch (e) {
                    console.error("cannot convert binary string to text for: " + file.name);
                    defer.reject(e);
                }
            };
            reader.onerror = function (e) {
                console.error("cannot read file: " + file.name + ", error-code: " + e.target.error.code);
                defer.reject(e.target.error);
            };
            reader.readAsBinaryString(file);
        }, defer.reject);
        return defer.promise;
    };
    JavaScriptFileLoadTask.prototype.resolvedPromise = function (data) {
        var q = this.$q.defer();
        q.resolve(data);
        return q.promise;
    };
    JavaScriptFileLoadTask.prototype._getReadyToDecrypt = function () {
        var _this = this;
        if (this._control)
            return this.resolvedPromise(this._control);
        return this.fetchPageData(this._fileEntry)
            .then((function (data) {
            return _this._control = _this.lnCrypto.progressiveDecrypt(data, _this._key);
        }).bind(this));
    };
    JavaScriptFileLoadTask.prototype._decryptNextRound = function () {
        this.lodash.defer(this._decryptRound.bind(this));
    };
    JavaScriptFileLoadTask.prototype._decryptRound = function () {
        if (!this._running)
            return;
        this._control.decryptNext();
        if (this._control.finished()) {
            this._resolve();
        }
        else {
            this._decryptNextRound();
        }
    };
    JavaScriptFileLoadTask.prototype._resolve = function () {
        var data = this._control.result();
        this._running = false;
        this._done = true;
        this._control = null;
        this._progress.resolve(data);
    };
    JavaScriptFileLoadTask.prototype._decryptAll = function () {
        while (!this._control.finished())
            this._control.decryptNext();
        this._resolve();
        return this._progress.promise;
    };
    return JavaScriptFileLoadTask;
}());
/*@ngInject*/
function JavaScriptFileLoadTaskFactory(lodash, $q, lnCrypto) {
    return function (fileEntry, key) { return new JavaScriptFileLoadTask(fileEntry, key, lodash, $q, lnCrypto); };
}
exports.JavaScriptFileLoadTaskFactory = JavaScriptFileLoadTaskFactory;
//# sourceMappingURL=JavaScriptFileLoadTask.js.map