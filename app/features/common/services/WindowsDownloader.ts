import IQService = angular.IQService;
import IPromise = angular.IPromise;
import IDeferred = angular.IDeferred;

var JSZip = require('exports?JSZip!jszip');
const STREAM_TYPE = 'arraybuffer';

class WindowsDownloader {
  constructor(private $q : IQService, private Utilities, private FileSystemWrapper) {
  }

  public download(url : string, basePath : string) : IPromise<any> {
    var deferred = this.$q.defer();

    this.Utilities.getBlob(url).then(
      (blob) => {
        JSZip.loadAsync(blob).then((zip) => {
          this.flush(basePath, this.DictionaryToArray<JSZipObject>(zip))
            .then(deferred.resolve, deferred.reject, (progress) => {
              deferred.notify(0.5 + (progress / 2));
            });
        });
      },
      deferred.reject,
      (progress) => {
        deferred.notify(progress / 2);
      }
    );

    return deferred.promise;
  }

  private DictionaryToArray<T>(dictionary) : Array<T> {
    var arr = [];
    dictionary.forEach((name : string, obj : T) => {
      arr.push(obj);
    });

    return arr;
  }

  private flush(basePath : string, files : Array<JSZipObject>, currentIndex : number = 0,
                lastDir : string = undefined, defer : IDeferred<any> = undefined) : IPromise<any> {
    defer = defer || this.$q.defer();
    defer.notify(currentIndex / files.length);

    if (currentIndex === files.length) {
      defer.resolve();
    }

    let current = files[currentIndex];

    if (current.dir) {
      this.flush(basePath, files, ++currentIndex, lastDir, defer);
    } else {
      let fileName = current.name.substring(current.name.lastIndexOf('/') + 1);
      let dir = current.name.substring(0, current.name.lastIndexOf('/'));

      if (lastDir !== dir && dir !== '') {
        this.FileSystemWrapper.createDirectory(`${basePath}/${dir}`)
          .then(() => {
            this.writeFile(`${basePath}/${dir}/`, fileName, current).then(() => {
                this.flush(basePath, files, ++currentIndex, dir, defer);
              })
              .catch(defer.reject);
          })
          .catch(defer.reject);
      } else {
        this.writeFile(`${basePath}/${dir}/`, fileName, current).then(() => {
            this.flush(basePath, files, ++currentIndex, dir, defer);
          })
          .catch(defer.reject);
      }
    }

    return defer.promise;
  }

  private writeFile(path : string, fileName : string, file : JSZipObject) : IPromise<any> {
    return this.FileSystemWrapper.createFileWriter(path, fileName)
      .then((fileWriter : FileWriter) => {
        // JSZipObject definition(typings) is not up to date with latest version
        return file['async'](STREAM_TYPE)
          .then((data : ArrayBuffer) => {
            fileWriter.write(new Blob([data]));
          });
      });
  }
}

/*@ngInject*/
export function WindowsDownloaderFactory($q : IQService, Utilities) {
  return function (FileSystemWrapper) {
    return new WindowsDownloader($q, Utilities, FileSystemWrapper);
  };
}
