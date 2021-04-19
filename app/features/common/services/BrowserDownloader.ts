declare var zip : any;

/*@ngInject*/
export function BrowserDownloader(Utilities, $q) {

  function unzip(blob, dirEntry) {
    var deferred = $q.defer();
    var zipFs = new zip.fs.FS();

    zipFs.root.importBlob(blob, function () {
      var previousProgress = 0; // this is a patch for - https://github.com/gildas-lormeau/zip.js/issues/41

      zipFs.root.getFileEntry(dirEntry, deferred.resolve, function (current, total) {
        var currentProgress = (current / total);
        if (previousProgress < currentProgress && currentProgress <= 1) {
          deferred.notify(currentProgress);
        }
        previousProgress = currentProgress;
      });
    });

    return deferred.promise;
  }

  return {
    download: function (url, dirEntry) {
      var deferred = $q.defer();

      Utilities.getBlob(url).then(function (blob) {
        unzip(blob, dirEntry).then(deferred.resolve, deferred.reject, function (progress) {
          deferred.notify(0.5 + progress / 2);
        });
      }, deferred.reject, function (progress) {
        deferred.notify(progress / 2);
      });

      return deferred.promise;
    }
  };
}
