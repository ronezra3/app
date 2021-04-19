export class Utilities {

  public static toggleFullScreen(elem) {
    var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null)

    if (!isInFullScreen) {

      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
      }


    } else {

      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) { /* Firefox */
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { /* IE/Edge */
        document.msExitFullscreen();
      }
      
    }
  }

  public static capitalize(string : String) : String {
    if (string.search('-') !== -1) {
      return Utilities.dashedToCamel(string);
    }

    return string.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  public static dashedToCamel(string) {
    var capitalized = [];
    string.split('-').forEach(function (subString) {
      capitalized.push(Utilities.capitalize(subString));
    });

    return capitalized.join('');
  }

  constructor(private _, private $injector, private $q) {
  }

  capitalize(string : String) {
    return Utilities.capitalize(string);
  }

  getFactoryByName(name) {
    var capitalized = this._.capitalize(name);
    return this.$injector.get(capitalized);
  }

  stringifyTime(time) {
    var totalRemainingSeconds = Math.floor(time / 1000);
    var totalRemainingMinutes = Math.floor(totalRemainingSeconds / 60);
    var totalRemainingHours = Math.floor(totalRemainingMinutes / 60);

    return `${this.getTimePieceDoubleDigit(totalRemainingHours)
      }:${this.stringifyTimePiece(totalRemainingMinutes)}:${this.stringifyTimePiece(totalRemainingSeconds)}`;
  }

  percentify(value) {
    return Math.round(value * 100);
  }

  isqPromise(promise) {
    return promise && promise.catch;
  }

  getBlob(url) {
    var deferred = this.$q.defer();

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'blob';
    xhr.onload = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        deferred.resolve(this.response);
      } else {
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
  }

  getSrcFromCspSrc(cspSrc) {
    return this.getBlob(cspSrc).then((blob) => {
      return URL.createObjectURL(blob);
    });
  }

  destroyResource(resource) {
    URL.revokeObjectURL(resource);
  }

  dataURLToBlob(dataURL) {
    var BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) == -1) {
      var parts = dataURL.split(',');
      var contentType = parts[0].split(':')[1];
      var raw = decodeURIComponent(parts[1]);

      return new Blob([raw], {type: contentType});
    }

    var parts = dataURL.split(BASE64_MARKER);
    var contentType = parts[0].split(':')[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;

    var uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], {type: contentType});
  }

  imgResize(file, max_width, max_height, imageEncoding) {

    var canvas = document.createElement('canvas'),
      image = new Image();

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
  }

  private stringifyTimePiece(totalTime) {
    return this.getTimePieceDoubleDigit(totalTime % 60);
  }

  private getTimePieceDoubleDigit(time) {
    return time >= 10 ? time : `0${time}`;
  }
}

export class UtilitiesProvider {
  capitalize(string : String) : String {
    return Utilities.capitalize(string);
  }

  /*@ngInject*/
  public $get(lodash, $injector, $q) {
    return new Utilities(lodash, $injector, $q);
  }
}
