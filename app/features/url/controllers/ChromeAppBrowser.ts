import ISCEService = angular.ISCEService;
import IScope = angular.IScope;
import {IStateParamsService} from 'angular-ui-router';

export const ChromeAppBrowserPath = 'chromeAppBrowser';

export class ChromeAppBrowserController {
  public url : any;
  public trustedUrl : string;
  public canClose : boolean;

  /*@ngInject*/
  constructor($sce : ISCEService, $scope : IScope, private ngDialogRouter) {
    this.trustedUrl = $sce.trustAsResourceUrl($scope['url']);
    this.canClose = $scope['canClose'];
  }

  close() {
    this.ngDialogRouter.close(ChromeAppBrowserPath);
  }
}

const template = `
<button ng-if="$ctrl.canClose" class="close" ng-click="$ctrl.close()">
  <ng-include src="'images/x-icon.png'"></ng-include>
</button>
<webview ng-src="{{$ctrl.trustedUrl}}"></webview>
`;

export class ChromeAppBrowserState {
  appendClassName = 'chrome-browser';
  controllerAs = '$ctrl';
  controller = ChromeAppBrowserController;
  closeByDocument = true;
  closeByEscape = true;
  template = template;
}

