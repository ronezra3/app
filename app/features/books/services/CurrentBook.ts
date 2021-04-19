export class CurrentBook {
  private _info : any;
  private _pageUrl : string;

  get pageUrl() {
    return this._pageUrl;
  }

  set pageUrl(pageUrl) {
    this._pageUrl = pageUrl;
  }

  set info(info) {
    this._info = info;
  }

  get info() {
    return this._info;
  }

  public clear() {
    this._info = null;
    this._pageUrl = null;
  }
}
