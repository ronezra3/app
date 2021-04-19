import {ActivityTeachResultsFooterController} from '../../activities/directives/TeachResultsFooter';
const template = `
<nav class="activity-buttons-nav padded">
  <activity-reset-button class="secondary" activity="$ctrl.activity" type="{{$ctrl.type}}" should-end="$ctrl.isPlaying"></activity-reset-button>
  <activity-end-button class="primary" ng-show="$ctrl.isPlaying" type="{{$ctrl.type}}" activity="$ctrl.activity"
                     pre-end-callback="$ctrl.updateAttendance()"></activity-end-button>
</nav>
`;

export class UrlTeachResultsFooter {
  controller = ActivityTeachResultsFooterController;
  template = template;
  bindings : any = {
    type: '@',
    activity: '<',
    isPlaying: '<',
  };
}
