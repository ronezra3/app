import {CurrentBookActivities} from '../../books/services/CurrentBookActivities';

export class ReaderDrawerController {
  mode;
  comparePages;
  bookActivities = this.CurrentBookActivities.get();
  isShown;

  /*@ngInject*/
  constructor(private CurrentBookActivities : CurrentBookActivities, private Localytics) {
  }

  toggle() {
    if (!this.isShown) {
      this.Localytics.tagEvent('Drawer Opened', {
        mode: this.mode
      });
    }

    this.isShown = !this.isShown;
  }
}

const template = `
<ul class="collapsed" ng-class="{'collapsed': !$ctrl.isShown}">
  <li ng-if="$ctrl.bookActivities.length === 0" class="empty-mode">
    <h2>{{ "drawer_empty_mode_title" | translate }}</h2>
  </li>
  <li ng-repeat="bookActivity in $ctrl.bookActivities | orderBy:'pageUrl':false:$ctrl.comparePages">
    <panel-drawer-item book-activity="bookActivity" mode="{{$ctrl.mode}}"></panel-drawer-item>
    <div class="strip"></div>
  </li>
</ul>

<button ng-class="{'open': $ctrl.isShown}" ng-click="$ctrl.toggle()"
        on-drag-left="$ctrl.isShown = true"
        on-drag-right="$ctrl.isShown = false">
  <ng-include src="'images/panel/drawer/panel_drawer_toggle_icon.png'"></ng-include>
</button>
`;

export class ReaderDrawer {
  controller = ReaderDrawerController;
  template = template;
  bindings : any = {
    mode: '@',
    comparePages: '<'
  };
}
