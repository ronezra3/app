import { Activities } from '../../activities/services/ActivitiesFactory';

class UrlResultsContentController {
  displayCloud;
  activity;
  type;

  /*@ngInject*/
  constructor(MatchMediaWrapper, private Activities: Activities) {
    // this.displayCloud = MatchMediaWrapper.isPhone();    
  }

  $onInit() {
    if (!this.activity.sumarizeActivity.associations) {
      this.activity.sumarizeActivity.associations = [];
    }
    this.activity.sumarizeActivity.attendedCount = this.activity.attendedCount;

    this.Activities.onSubmitted('url', (association) => {
      this.activity.sumarizeActivity.associations.push(association);
    });
  }

  makeFullScreen($event) {
    var divObj = $event.currentTarget

    if (divObj.requestFullscreen) {
      divObj.requestFullscreen();
    }
    else if (divObj.msRequestFullscreen) {
      divObj.msRequestFullscreen();
    }
    else if (divObj.mozRequestFullScreen) {
      divObj.mozRequestFullScreen();
    }
    else if (divObj.webkitRequestFullscreen) {
      divObj.webkitRequestFullscreen();
    } else {
      throw "Fullscreen API is not supported";
    }

  }

}
//<span style="font-weight: 700;">{{$index + 1 +  '.' }} {{item.association}}</span>
const template = `
<activity-header type="ideas" field="$ctrl.activity.sumarizeActivity.title"></activity-header>
<div class="narow">
  <div class="resultes-container"> 
    <label ng-repeat="item in $ctrl.activity.sumarizeActivity.associations">
    <span ng-if="!$ctrl.activity.sumarizeActivity.isAnonymous" ng-class="{'with-img': item.file}">{{item.userName +  " - "}}</span>
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


// <activity-header type="url" field="$ctrl.activity.actualUrl">
// {{ 'url-results-title' | translate : {type: $ctrl.activity.preview.type} }}
// </activity-header>
// <embedded-url class="narrow" preview="$ctrl.activity"></embedded-url>

export class UrlResultsContent {

  template = template;
  controller = UrlResultsContentController;
  bindings: any = {
    activity: '<',
    isPlaying: '<',
  };
}