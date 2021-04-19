import {IDeviceUtilities} from './../../../3rdparty/common/services/DeviceUtilities';
import IPromise = angular.IPromise;
import IQService = angular.IQService;

declare var resolveLocalFileSystemURL : any;

/*@ngInject*/
export function FileSystemUtilitiesService($q : IQService, MobileDownloader, BrowserDownloader,
                                           DeviceUtilities : IDeviceUtilities, WindowsDownloader) {

  function FileSystemUtilities() {
  }

  function createFolders(rootDirectoryEntry, folders, callback) {
    rootDirectoryEntry.getDirectory(folders[0], {create: true}, function (dirEntry) {
      if (folders.length > 1) {
        createFolders(dirEntry, folders.slice(1), callback);
      } else {
        callback(dirEntry);
      }
    });
  }

  FileSystemUtilities['createDirectory'] = function (path) {
    var deferred = $q.defer();

    FileSystemUtilities['getPersistentFileSystem']().then(function (fs) {
      createFolders(fs.root, path.split('/'), deferred.resolve);
    });

    return deferred.promise;
  };

  FileSystemUtilities['removeDirIfExists'] = function (path) {
    return FileSystemUtilities['directoryExists'](path).then(function (directoryExists) {
      if (directoryExists) {
        return FileSystemUtilities['removeDirectory'](path);
      }
      return $q.resolve();
    });
  };

  FileSystemUtilities['createOrTruncateDir'] = function (path) {
    return FileSystemUtilities['removeDirIfExists'](path).then(function () {
      return FileSystemUtilities['createDirectory'](path);
    });
  };

  FileSystemUtilities['getPersistentFileSystem'] = function () {
    var deferred = $q.defer();

    // if (DeviceUtilities.isChromeApp()) {
    //   var requestFileSystem = window['requestFileSystem'] || window['webkitRequestFileSystem'];
    //   requestFileSystem(window['PERSISTENT'], 0, deferred.resolve, deferred.reject);
    // } else {
    //   resolveLocalFileSystemURL(cordova.file.dataDirectory, function (dir) {
    //     deferred.resolve(dir.filesystem);
    //   }, deferred.reject);
    // }

    return deferred.promise;
  };

  FileSystemUtilities['extractOnlineZip'] = function (url, directoryName) {
    if (DeviceUtilities.isChromeApp()) {
      return FileSystemUtilities['createOrTruncateDir'](directoryName).then(function (directoryEntry) {
        return BrowserDownloader.download(url, directoryEntry);
      });
    }

    /*
     Cordova-plugin-zip doesn't support windows, that's why we use js.zip to unzip windows apps books
     using BrowserDownloader(zip.js) caused StackOverFlow
     open issue:
     https://github.com/MobileChromeApps/cordova-plugin-zip/issues/54#issuecomment-211902887
     */
    if (DeviceUtilities.isWindows()) {
      return FileSystemUtilities['createOrTruncateDir'](directoryName).then(function () {
        let winDownloader = WindowsDownloader(FileSystemUtilities);
        return winDownloader.download(url, directoryName);
      });
    }

    return FileSystemUtilities['getPersistentFileSystem']().then(function (fs) {
      return FileSystemUtilities['removeDirIfExists'](directoryName).then(function () {
        return MobileDownloader.download(url, fs.root['nativeURL'] + directoryName);
      });
    });
  };

  FileSystemUtilities['directoryExists'] = function (path) {
    var deferred = $q.defer();

    FileSystemUtilities['getPersistentFileSystem']().then(function (fs) {
      fs.root['getDirectory'](path, {create: false}, function () {
        deferred.resolve(true);
      }, function () {
        deferred.resolve(false);
      });
    });

    return deferred.promise;
  };

  FileSystemUtilities['getUrl'] = function (filePath) {
    if (DeviceUtilities.isChromeApp()) {
      return FileSystemUtilities['getFileEntry'](filePath).then(function (fileEntry) {
        return fileEntry['toURL']();
      });
    }
    return $q.resolve(`${cordova.file.dataDirectory}${filePath}`);
  };

  FileSystemUtilities['getFileEntry'] = function (filePath) {
    return FileSystemUtilities['getPersistentFileSystem']().then(function (fileSystem) {
      var deferred = $q.defer();
      fileSystem.root['getFile'](filePath, {create: false}, deferred.resolve, deferred.reject);
      return deferred.promise;
    });
  };

  FileSystemUtilities['removeDirectory'] = function (path) {
    var deferred = $q.defer();

    FileSystemUtilities['getPersistentFileSystem']().then(function (fileSystem) {
      fileSystem.root['getDirectory'](path, {create: false}, function (directoryEntry) {
        directoryEntry.removeRecursively(deferred.resolve, deferred.reject);
      });
    });

    return deferred.promise;
  };

  FileSystemUtilities['createFileWriter'] = (path : string, fileName : string) : IPromise<FileWriter> => {
    var defer = $q.defer();

    FileSystemUtilities['getPersistentFileSystem']().then((fs : FileSystem) => {
      fs.root.getFile(`${path}/${fileName}`, {create: true},
        (file : FileEntry) => {
          file.createWriter(defer.resolve, defer.reject);
        }, (e : FileError) => {
          console.error(`cannot write to file: ${fileName}, errorcode: ${e.code}`);
          defer.reject(e);
        });
    });

    return defer.promise;
  };

  return FileSystemUtilities;
}
