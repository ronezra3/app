import {CurrentBook} from '../../books/services/CurrentBook';
import {CurrentBookActivities} from '../../books/services/CurrentBookActivities';
import {IStateServiceExtended} from '../../../3rdparty/common/decorators/StateDecorator';
import {ActivitiesRouter} from '../../activities/services/ActivitiesRouter';

class ActivityButtonController {
  type : string;
  mode : string;

  /*@ngInject*/
  constructor(private $state : IStateServiceExtended, private CurrentBook : CurrentBook,
              private CurrentBookActivities : CurrentBookActivities, private ActivitiesRouter : ActivitiesRouter) {
  }

  click() {
    if (!this.isInReader()) {
      return this.ActivitiesRouter.open(this.type, this.mode);
    }

    return this.ActivitiesRouter.open(this.type, this.mode, this.CurrentBook.pageUrl);
  }

  indicationVisible() {
    if (!this.isInReader()) {
      return false;
    }

    let bookActivity = this.CurrentBookActivities.findOneByTypeAndPage(this.type, this.CurrentBook.pageUrl);

    console.log(bookActivity, this.CurrentBookActivities.TEMP_ActivityJustFinished);
    if (bookActivity && this.CurrentBookActivities.TEMP_ActivityJustFinished) {
      if (this.CurrentBookActivities.TEMP_ActivityJustFinished.indexOf(bookActivity.activityId) > -1) {
        return false;
      }
    }
    return bookActivity && !bookActivity.published;
  }

  private isInReader() {
    return this.$state.includes('*.reader.*');
  }
}

const template = `
<button class="panel-button" id="{{$ctrl.type}}" ng-click="$ctrl.click()">
  <span class="layer-indication" ng-show="$ctrl.indicationVisible()"></span>
  <ng-include class="activity-icon" src="'images/panel/icons/' + $ctrl.type + '.png'"></ng-include>
  <span class="text">{{$ctrl.type | translate}}</span>
</button>
`;

export class ActivityButton {
  controller = ActivityButtonController;
  template = template;
  bindings : any = {
    type: '@',
    mode: '@'
  };
}
