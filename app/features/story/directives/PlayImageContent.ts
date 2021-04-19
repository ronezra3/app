import { Activities } from '../../activities/services/ActivitiesFactory';
import { Utilities } from '../../../3rdparty/common/services/Utilities';

class StoryImageContentController {
  activity;
  /*@ngInject*/
  constructor(private Activities: Activities, protected Utilities) {
  }

  $onInit() {
  }

  toggleFullScreen(event) {
    // @TODO: using 'childNoes[2]' can easily break with any html change. Better use a more robust identifier method.
    Utilities.toggleFullScreen(event.target.parentElement.childNodes[2]);   
  }
}

const template = `
  <div class='image-container-play' ng-if="$ctrl.activity.files">
    <img ng-if="$ctrl.activity.files[0].fileType.match('^image') != null" 
      ng-src="{{$ctrl.activity.getFilePath(['w_400'])}}" 
      ng-click="$ctrl.toggleFullScreen($event)"><br />
    <button class="view-full-img-btn"
        ng-if="$ctrl.activity.files[0].fileType.match('^image') != null"
        ng-click="$ctrl.toggleFullScreen($event)">לחץ להגדלת התמונה
    </button>

    <a ng-if="$ctrl.activity.files[0].fileType == 'application/pdf'" target="_blank" href="{{$ctrl.activity.getFilePath([], '.pdf')}}"><img ng-src="{{$ctrl.activity.getFilePath(['w_400'])}}"></a><br />
    <a class="view-full-img-btn"  target="_blank" 
        href="{{$ctrl.activity.getFilePath([], '.pdf')}}"
        ng-if="$ctrl.activity.files[0].fileType == 'application/pdf'">לחץ לפתיחת המסמך
    </a> 
  </div>
`;

export class StoryImageContent {
  controller = StoryImageContentController;
  template = template;
  bindings: any = {
    activity: '<',
    isPlaying: '<',
  };
}
