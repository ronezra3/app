import { Activities } from '../../activities/services/ActivitiesFactory';
import {CurrentSession} from '../../session/services/CurrentSession';
import { CurrentUser } from '../../../3rdparty/common/services/CurrentUser';


class IdeasResultsContentController {
  displayCloud;
  activity;

  attendedCount = 0;
  isTeacher;

  /*@ngInject*/
  constructor(MatchMediaWrapper, private Activities: Activities, private CurrentSession : CurrentSession, private CurrentUser: CurrentUser ) {
    // this.displayCloud = MatchMediaWrapper.isPhone();
    this.isTeacher = this.CurrentUser.get().isTeacher;
    if (this.isTeacher) {
      this.attendedCount = this.CurrentSession.getAttendanceMgr().getAttendingCount();
    }
  }
 

  $onInit() {
    
    if (!this.activity.associations) {
      this.activity.associations = [];
    }

    this.Activities.onSubmitted('ideas', (association) => {
      this.activity.associations.push(association);

      if (this.isTeacher) {
        this.attendedCount = this.CurrentSession.getAttendanceMgr().getAttendingCount();
      }
      
    });

  }

}

const template = `
  <activity-header type="ideas" field="$ctrl.activity.title"></activity-header>
  <div class="narow">
    <div class="results-counter" ng-if="$ctrl.isTeacher">
      <span>השיבו</span>
      <span>{{$ctrl.activity.associations.length}} מתוך {{$ctrl.attendedCount}}</span>
    </div>
    <div class="resultes-container"> 
      <label ng-repeat="item in $ctrl.activity.associations" ng-style="{position: showFullImg ? 'static' : 'relative'}">
      <span ng-if="!$ctrl.activity.isAnonymous" ng-class="{'with-img': item.file}">{{item.userName +  " - "}}</span> 
      <span ng-class="{'with-img': item.file}">{{item.association}}</span>
        <div style="float:left;" ng-if="item.file">
          <img ng-src="{{item.file}}" ng-click="showFullImg = !showFullImg" ng-init="showFullImg=false" />
          <div class="full-img-wrapper" ng-click="showFullImg = !showFullImg" ng-show="showFullImg"><img ng-src="{{item.file}}"/></div>
        </div>
        <div style="clear: both;"></div>
      </label>
    </div>
  </div>
`;

//  <ideas-word-cloud ng-if="!$ctrl.displayCloud" activity="$ctrl.activity" is-playing="$ctrl.isPlaying"></ideas-word-cloud>
//  <most-popular-words ng-if="$ctrl.displayCloud" activity="$ctrl.activity" is-playing="$ctrl.isPlaying"></most-popular-words>




export class IdeasResultsContent {
  controller = IdeasResultsContentController;
  template = template;
  bindings: any = {
    activity: '<',
    isPlaying: '<',
  };
}