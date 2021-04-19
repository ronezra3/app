import {ActivitiesRouter} from '../../activities/services/ActivitiesRouter';

class PanelDrawerItemController {
  bookActivity;
  mode;

  /*@ngInject*/
  constructor(private ActivitiesRouter : ActivitiesRouter) {
  }

  open() {
    return this.ActivitiesRouter.open(this.bookActivity.activityType, this.mode, this.bookActivity.pageUrl);
  }
}

const template = `
<button ng-class="$ctrl.bookActivity.activityType" ng-click="$ctrl.open()">
  <span>
    <span class="published" ng-show="$ctrl.bookActivity.published">
      <ng-include src="'images/v_icon2.png'"></ng-include>
    </span>
    <ng-include class="icon" src="'images/panel/icons/' + $ctrl.bookActivity.activityType + '.png'"></ng-include>
    <span class="title" ng-if="$ctrl.bookActivity">{{'page' | translate}} {{$ctrl.bookActivity.pageUrl}}</span>
  </span>
</button>
`;

export class PanelDrawerItem {
  controller = PanelDrawerItemController;
  template = template;
  bindings : any = {
    bookActivity: '<',
    mode: '@'
  };
}
