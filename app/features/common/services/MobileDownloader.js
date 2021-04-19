"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MobileDownloader = /** @class */ (function () {
    /*@ngInject*/
    function MobileDownloader($q) {
        this.$q = $q;
    }
    MobileDownloader.prototype.download = function (url, dirPath) {
        var deferred = this.$q.defer();
        var fileTransfer = new FileTransfer();
        var downloadPath = dirPath + '.zip';
        fileTransfer.onprogress = function (progressEvent) {
            if (progressEvent.lengthComputable) {
                var progress = progressEvent.loaded / progressEvent.total;
                deferred.notify(progress / 2);
            }
        };
        fileTransfer.download(url, downloadPath, function (entry) {
            zip.unzip(downloadPath, dirPath, function (code) {
                code === -1 ? deferred.reject() : entry.remove(deferred.resolve, deferred.reject);
            }, function (progressEvent) {
                var progress = progressEvent.loaded / progressEvent.total;
                deferred.notify(0.5 + progress / 2);
            });
        }, deferred.reject);
        return deferred.promise;
    };
    return MobileDownloader;
}());
exports.MobileDownloader = MobileDownloader;
//# sourceMappingURL=MobileDownloader.js.map