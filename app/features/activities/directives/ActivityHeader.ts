import IComponentOptions = angular.IComponentOptions;
const template = `
<header class="activity-header narrow">
  <h1 ng-transclude>{{$ctrl.field || ('default-' + $ctrl.type + '-title' | translate)}}</h1>
</header>
`;
//<ng-include class="icon" src="'images/panel/icons/' + $ctrl.type + '.svg'"></ng-include>

export class ActivityHeader {
  template = template;
  transclude = true;
  bindings : any = {
    type: '@',
    field: '<'
  };
}
