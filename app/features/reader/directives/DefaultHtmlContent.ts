import IScope = angular.IScope;
import ISCEService = angular.ISCEService;

export abstract class HtmlContentController {
  public pageUrl : string;
  public localUrlPrefix;
  public onPageChange;
  public bookInfo;

  /*@ngInject*/
  constructor(private $sce : ISCEService, protected $element, protected $scope : IScope) {
  }

  public getSceUrl() {
    return this.$sce.trustAsResourceUrl(this.localUrlPrefix + this.pageUrl);
  }

  public pageChange(url) {
    this.onPageChange({pageUrl: this.getRelativeUrl(url)});
  }

  private getRelativeUrl(absoluteUrl) {
    let searchString = `/.${this.bookInfo.id}/`;
    let idEndIndex = absoluteUrl.indexOf(searchString) + searchString.length;
    return absoluteUrl.substring(idEndIndex, absoluteUrl.length);
  }
}

export class DefaultHtmlContentController extends HtmlContentController {
  $onInit() {
    let iframe = this.$element.children();
    iframe.on('load', () =>
      iframe[0].contentWindow.onhashchange = (event) =>
        this.$scope.$apply(() =>
          this.pageChange(event.newURL)));
  }
}

export class DefaultHtmlContent {
  template = `<iframe ng-src={{$ctrl.getSceUrl()}}></iframe>`;
  controller = DefaultHtmlContentController;
  bindings : any = {
    localUrlPrefix: '@',
    bookInfo: '<',
    pageUrl: '@',
    onPageChange: '&'
  };
}
