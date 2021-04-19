import {ReaderResolver} from './Resolver';
export class HtmlResolver extends ReaderResolver {
  get() {
    let resolve : any = super.get();
    resolve.localUrlPrefix = this.localUrlPrefix;

    return resolve;
  }

  /*@ngInject*/
  localUrlPrefix(bookInfo, bookFile) {
    return bookFile.getUrl(bookInfo.relativeUrl).then((url) => {
      return url.replace(bookInfo.relativeUrl, '');
    });
  }
}
