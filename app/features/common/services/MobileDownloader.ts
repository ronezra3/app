declare var zip : any;
declare var FileTransfer : any;

export class MobileDownloader {
  /*@ngInject*/
  constructor(private $q : any) {
  }

  public download(url, dirPath) {
    var deferred = this.$q.defer();
    var fileTransfer = new FileTransfer();
    var downloadPath = dirPath + '.zip';

    fileTransfer.onprogress = function (progressEvent) {
      if (progressEvent.lengthComputable) {
        var progress = progressEvent.loaded / progressEvent.total;
        deferred.notify(progress / 2);
      }
    };

    fileTransfer.download(url, downloadPath,
      (entry) => {
        zip.unzip(downloadPath, dirPath,
          (code) => {
            code === -1 ? deferred.reject() : entry.remove(deferred.resolve, deferred.reject);
          },
          (progressEvent) => {
            var progress = progressEvent.loaded / progressEvent.total;
            deferred.notify(0.5 + progress / 2);
          });
      },
      deferred.reject);

    return deferred.promise;
  }
}
