export class BookFile {
  constructor(public book, private $q, private LocalStorageFactory, private $http, private BooksValues,
    private FileSystemUtilities, private ENV, private lodash, private CurrentUser) {
  }

  public isAvailable = false;
  private downloadPromise;
  private isInitiallized;

  getDownloadPromise() {
    return this.downloadPromise;
  }

  persistBookAuthorization(id) {
    return this.LocalStorageFactory.get(this.getBooksAuthStoredName()).then((authorizedBooks) => {
      return this.setAuthorizedBooks(authorizedBooks, id);
    }).catch(() => {
      return this.setAuthorizedBooks([], id);
    });
  }

  setAuthorizedBooks(authorizedBooks, id) {
    authorizedBooks.push(id);
    return this.LocalStorageFactory.set(this.getBooksAuthStoredName(), authorizedBooks);
  }

  getIsAuthorized(id) {
    return this.getDownloadUrl(id,10).then((url) => {
      return Boolean(url);
    });
  }

  isAuthorized(id) {
    return this.LocalStorageFactory.get(this.getBooksAuthStoredName()).then((authorizedBooks) => {
      if (authorizedBooks && this.lodash.contains(authorizedBooks, id)) {
        return true;
      }

      return this.getIsAuthorized(id);
    }).catch(() => {
      return this.getIsAuthorized(id);
    });
  }

  localDirPath() {
    return this.BooksValues.localPath + '.' + this.book.id;
  }

  getUrl(filePath) {
    return this.FileSystemUtilities.getUrl(this.localDirPath() + '/' + filePath);
  }

  download() {
    if (this.downloadPromise) {
      return this.downloadPromise;
    }

    return this.downloadPromise = this.getDownloadUrl(this.book.id,10).then((response) => {
      // console.log(response)
      this.FileSystemUtilities.extractOnlineZip(response.data, this.localDirPath()).then(() => {
        this.isAvailable = true;
        return this.$q.all([this.persistBookAuthorization(this.book.id),
        this.LocalStorageFactory.set('book-' + this.book.id, { downloadedVersion: this.book.version })]);
      })
    }).finally(() => this.downloadPromise = null);
  }

  init() {
    if (this.isInitiallized) {
      return this.$q.resolve();
    }

    this.isInitiallized = true;

    return this.getDownloadedVersion(this.book.id).then((downloadedVersion) => {
      var isUpToDate = downloadedVersion && downloadedVersion === this.book.version;
      if (!isUpToDate) {
        return this.$q.resolve();
      }

      return this.isAuthorized(this.book.id).then((isAuthorized) => {
        this.isAvailable = isAuthorized;
      }).catch(() => {
        return;
      });
    }).catch(() => {
      return;
    });
  }

  private getDownloadedVersion(id) {
    return this.LocalStorageFactory.get('book-' + id).then((book) => {
      return book.downloadedVersion;
    }).catch(() => {
      return null;
    });
  }

  public getDownloadUrl(id, numberOfPages) {
    return this.$http.get(this.ENV.lmsEndpoint + '/books/' + id + '/url/' + numberOfPages);
  }

  private getBooksAuthStoredName() {
    return 'user-' + this.CurrentUser.get().id + '-books';
  }
}

/*@ngInject*/
export function BookFileFactory($q, LocalStorageFactory, $http, BooksValues, FileSystemUtilities, ENV, lodash, CurrentUser) {
  return (book) => {
    return new BookFile(book, $q, LocalStorageFactory, $http, BooksValues, FileSystemUtilities, ENV, lodash, CurrentUser);
  };
}
