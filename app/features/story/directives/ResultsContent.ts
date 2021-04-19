import { Activities } from '../../activities/services/ActivitiesFactory';

class StoryResultsContentController {
  activity;
  /*@ngInject*/
  constructor(MatchMediaWrapper, private Activities: Activities) {
  }

  $onInit() {
  }
}

const template = `
  <div class='image-container-view'>
    <img ng-if="$ctrl.activity.files[0].fileType.match('^image') != null" 
         ng-src="{{$ctrl.activity.getFilePath(['w_400'])}}" 
         ng-click="$ctrl.toggleFullScreen($event)">
    <a ng-if="$ctrl.activity.files[0].fileType == 'application/pdf'" target="_blank" href="{{$ctrl.activity.getFilePath([], '.pdf')}}">
      <img ng-src="{{$ctrl.activity.getFilePath(['w_400'])}}">
    </a>  
  </div>
`;

export class StoryResultsContent {
  controller = StoryResultsContentController;
  template = template;
  bindings: any = {
    activity: '<',
    isPlaying: '<',
  };
}
