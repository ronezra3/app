import IComponentOptions = angular.IComponentOptions;
import {IDialogRouter} from '../layout/services/NgDialogRouter';

class DialogLinkCtrl {
  path : string;
  params : any;

  /*@ngInject*/
  constructor(private ngDialogRouter : IDialogRouter) {
  }

  open() {
    this.ngDialogRouter.go(this.path, this.params);
  }
}

export class DialogLink implements IComponentOptions {
  controller : any = DialogLinkCtrl;
  template : string = `<a href="" ng-click="$ctrl.open()" ng-transclude></a>`;
  transclude : boolean = true;
  bindings : any = {
    path: '@',
    params: '<?'
  };
}

