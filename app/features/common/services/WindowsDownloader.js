"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JSZip = require('exports?JSZip!jszip');
var STREAM_TYPE = 'arraybuffer';
var WindowsDownloader = /** @class */ (function () {
    function WindowsDownloader($q, Utilities, FileSystemWrapper) {
        this.$q = $q;
        this.Utilities = Utilities;
        this.FileSystemWrapper = FileSystemWrapper;
    }
    WindowsDownloader.prototype.download = function (url, basePath) {
        var _this = this;
        var deferred = this.$q.defer();
        this.Utilities.getBlob(url).then(function (blob) {
            JSZip.loadAsync(blob).then(function (zip) {
                _this.flush(basePath, _this.DictionaryToArray(zip))
                    .then(deferred.resolve, deferred.reject, function (progress) {
                    deferred.notify(0.5 + (progress / 2));
                });
            });
        }, deferred.reject, function (progress) {
            deferred.notify(progress / 2);
        });
        return deferred.promise;
    };
    WindowsDownloader.prototype.DictionaryToArray = function (dictionary) {
        var arr = [];
        dictionary.forEach(function (name, obj) {
            arr.push(obj);
        });
        return arr;
    };
    WindowsDownloader.prototype.flush = function (basePath, files, currentIndex, lastDir, defer) {
        var _this = this;
        if (currentIndex === void 0) { currentIndex = 0; }
        if (lastDir === void 0) { lastDir = undefined; }
        if (defer === void 0) { defer = undefined; }
        defer = defer || this.$q.defer();
        defer.notify(currentIndex / files.length);
        if (currentIndex === files.length) {
            defer.resolve();
        }
        var current = files[currentIndex];
        if (current.dir) {
            this.flush(basePath, files, ++currentIndex, lastDir, defer);
        }
        else {
            var fileName_1 = current.name.substring(current.name.lastIndexOf('/') + 1);
            var dir_1 = current.name.substring(0, current.name.lastIndexOf('/'));
            if (lastDir !== dir_1 && dir_1 !== '') {
                this.FileSystemWrapper.createDirectory(basePath + "/" + dir_1)
                    .then(function () {
                    _this.writeFile(basePath + "/" + dir_1 + "/", fileName_1, current).then(function () {
                        _this.flush(basePath, files, ++currentIndex, dir_1, defer);
                    })
                        .catch(defer.reject);
                })
                    .catch(defer.reject);
            }
            else {
                this.writeFile(basePath + "/" + dir_1 + "/", fileName_1, current).then(function () {
                    _this.flush(basePath, files, ++currentIndex, dir_1, defer);
                })
                    .catch(defer.reject);
            }
        }
        return defer.promise;
    };
    WindowsDownloader.prototype.writeFile = function (path, fileName, file) {
        return this.FileSystemWrapper.createFileWriter(path, fileName)
            .then(function (fileWriter) {
            // JSZipObject definition(typings) is not up to date with latest version
            return file['async'](STREAM_TYPE)
                .then(function (data) {
                fileWriter.write(new Blob([data]));
            });
        });
    };
    return WindowsDownloader;
}());
/*@ngInject*/
function WindowsDownloaderFactory($q, Utilities) {
    return function (FileSystemWrapper) {
        return new WindowsDownloader($q, Utilities, FileSystemWrapper);
    };
}
exports.WindowsDownloaderFactory = WindowsDownloaderFactory;
//# sourceMappingURL=WindowsDownloader.js.map