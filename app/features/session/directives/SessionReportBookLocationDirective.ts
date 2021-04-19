import IComponentOptions = angular.IComponentOptions;
import LoDashStatic = _.LoDashStatic;

class SessionReportBookLocation {
  public minPage : number;
  public maxPage : number;
  public pages : Array<any>;
  public book : any;

  /*@ngInject*/
  constructor(private lodash : LoDashStatic) {
  }

  public $onInit() {
    if (this.book.type !== 'html' && this.pages.length) {
      this.minPage = this.lodash.min(this.pages);
      this.maxPage = this.lodash.max(this.pages);
    }
  }
}

export class SessionReportBookLocationComponent implements IComponentOptions {
  public bindings : any = {
    pages: '<',
    book: '<'
  };
  public controller : any = SessionReportBookLocation;
  public controllerAs : string = 'ctrl';
  public template : string = require('./../templates/sessionReportBookLocation.html');
}
