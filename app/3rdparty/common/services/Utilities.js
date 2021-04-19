"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utilities = /** @class */ (function () {
    function Utilities(_, $injector, $q) {
        this._ = _;
        this.$injector = $injector;
        this.$q = $q;
    }
    Utilities.capitalize = function (string) {
        if (string.search('-') !== -1) {
            return Utilities.dashedToCamel(string);
        }
        return string.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    };
    Utilities.dashedToCamel = function (string) {
        var capitalized = [];
        string.split('-').forEach(function (subString) {
            capitalized.push(Utilities.capitalize(subString));
        });
        return capitalized.join('');
    };
    Utilities.prototype.capitalize = function (string) {
        return Utilities.capitalize(string);
    };
    Utilities.prototype.getFactoryByName = function (name) {
        var capitalized = this._.capitalize(name);
        return this.$injector.get(capitalized);
    };
    Utilities.prototype.stringifyTime = function (time) {
        var totalRemainingSeconds = Math.floor(time / 1000);
        var totalRemainingMinutes = Math.floor(totalRemainingSeconds / 60);
        var totalRemainingHours = Math.floor(totalRemainingMinutes / 60);
        return this.getTimePieceDoubleDigit(totalRemainingHours) + ":" + this.stringifyTimePiece(totalRemainingMinutes) + ":" + this.stringifyTimePiece(totalRemainingSeconds);
    };
    Utilities.prototype.percentify = function (value) {
        return Math.round(value * 100);
    };
    Utilities.prototype.isqPromise = function (promise) {
        return promise && promise.catch;
    };
    Utilities.prototype.getBlob = function (url) {
        var deferred = this.$q.defer();
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'blob';
        xhr.onload = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                deferred.resolve(this.response);
            }
            else {
                deferred.reject(xhr.status);
            }
        };
        xhr.onprogress = function (event) {
            if (event.lengthComputable) {
                var percentComplete = event.loaded / event.total;
                deferred.notify(percentComplete);
            }
        };
        xhr.send();
        return deferred.promise;
    };
    Utilities.prototype.getSrcFromCspSrc = function (cspSrc) {
        return this.getBlob(cspSrc).then(function (blob) {
            return URL.createObjectURL(blob);
        });
    };
    Utilities.prototype.destroyResource = function (resource) {
        URL.revokeObjectURL(resource);
    };
    Utilities.prototype.dataURLToBlob = function (dataURL) {
        var BASE64_MARKER = ';base64,';
        if (dataURL.indexOf(BASE64_MARKER) == -1) {
            var parts = dataURL.split(',');
            var contentType = parts[0].split(':')[1];
            var raw = decodeURIComponent(parts[1]);
            return new Blob([raw], { type: contentType });
        }
        var parts = dataURL.split(BASE64_MARKER);
        var contentType = parts[0].split(':')[1];
        var raw = window.atob(parts[1]);
        var rawLength = raw.length;
        var uInt8Array = new Uint8Array(rawLength);
        for (var i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i);
        }
        return new Blob([uInt8Array], { type: contentType });
    };
    Utilities.prototype.imgResize = function (file, max_width, max_height, imageEncoding) {
        var canvas = document.createElement('canvas'), image = new Image();
        canvas.id = 'hiddenCanvas';
        canvas.width = max_width;
        canvas.height = max_height;
        canvas.style.visibility = 'hidden';
        document.body.appendChild(canvas);
        var context = canvas.getContext('2d');
        image.src = file;
        context.clearRect(0, 0, max_width, max_height);
        context.drawImage(image, 0, 0, image.width, image.height, 0, 0, max_width, max_height);
        var blob = this.dataURLToBlob(canvas.toDataURL(imageEncoding));
        document.body.removeChild(canvas);
        return blob;
    };
    Utilities.prototype.stringifyTimePiece = function (totalTime) {
        return this.getTimePieceDoubleDigit(totalTime % 60);
    };
    Utilities.prototype.getTimePieceDoubleDigit = function (time) {
        return time >= 10 ? time : "0" + time;
    };
    return Utilities;
}());
exports.Utilities = Utilities;
var UtilitiesProvider = /** @class */ (function () {
    function UtilitiesProvider() {
    }
    UtilitiesProvider.prototype.capitalize = function (string) {
        return Utilities.capitalize(string);
    };
    /*@ngInject*/
    UtilitiesProvider.prototype.$get = function (lodash, $injector, $q) {
        return new Utilities(lodash, $injector, $q);
    };
    return UtilitiesProvider;
}());
exports.UtilitiesProvider = UtilitiesProvider;
//# sourceMappingURL=Utilities.js.map