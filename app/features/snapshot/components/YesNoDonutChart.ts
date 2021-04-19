import {Activities} from '../../activities/services/ActivitiesFactory';
export class YesNoDonutController {
  activity;
  isPlaying;

  /*@ngInject*/
  constructor(private CssUtilities, private CurrentSession, private Activities : Activities) {
  }

  $onInit() {
    if (this.isPlaying) {
      this.Activities.onSubmitted('snapshot', (vote) => this.activity[vote.vote].push(vote.userId));
    }
  }

  convertRem(value) {
    return this.CssUtilities.convertRem(value);
  }

  getTotalCount() {
    return this.isPlaying ? this.CurrentSession.getAttendanceMgr().getAttendingCount() : this.activity.attendedCount;
  }
}

const template = `
<aside class="snapshot-label-no">
  <ng-include class="snapshot-no-icon-small" src="'images/new/X.png'"></ng-include>
  <div class="yes-no-num">{{$ctrl.activity.no.length}}</div>
</aside>
<svg class="yes-no-chart" xmlns="http://www.w3.org/2000/svg">
  <circle class="chart-inner-circle" ng-attr-r="{{$ctrl.convertRem(6.063)}}"
    ng-attr-cy="{{$ctrl.convertRem(10.875)}}" ng-attr-cx="{{$ctrl.convertRem(10.875)}}" />
  <donut-chart-vote-progress class="yes-chart" total="$ctrl.getTotalCount()" votes-count="$ctrl.activity.yes.length" />
  <donut-chart-vote-progress class="no-chart" total="$ctrl.getTotalCount()"
    votes-count="$ctrl.activity.no.length" counter-clockwise="true" />
  <g class="donut-title-wrapper">
    <text ng-attr-y="{{$ctrl.convertRem(10.875)}}" ng-attr-x="{{$ctrl.convertRem(10.875)}}"
      text-anchor="middle" class="donut-title-counter">{{ $ctrl.activity.yes.length + $ctrl.activity.no.length }} / {{ $ctrl.getTotalCount() }}</text>
    <text ng-attr-y="{{$ctrl.convertRem(12.875)}}" ng-attr-x="{{$ctrl.convertRem(10.875)}}"
      text-anchor="middle" class="donut-title-replied">{{'replied' | translate}}</text>
  </g>
</svg>
<aside class="snapshot-label-yes">
  <ng-include class="snapshot-yes-icon-small" src="'images/new/V.png'"></ng-include>
  <div class="yes-no-num">{{$ctrl.activity.yes.length}}</div>
</aside>
`;

export class YesNoDonut {
  controller = YesNoDonutController;
  template = template;
  bindings : any = {
    activity: '<',
    isPlaying: '<'
  };
}
