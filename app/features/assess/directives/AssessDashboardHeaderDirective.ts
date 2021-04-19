import IComponentOptions = angular.IComponentOptions;
import {Localytics} from '../../common/services/Localytics';

class AssessDashboardHeaderController {
  countdownIntervalPromise;
  onTimeChanged;
  public paused = false;
  public assess;
  public stillWorkingCount;

  /*@ngInject*/
  constructor(private Localytics : Localytics, private Attention, private CurrentSession, private $interval, private $state) {
    console.log(this.assess)
  }

  $onInit() {
    this.startTimer();
  }

  $onDestroy() {
    this.stopTimer();
  }

  resume() {
    this.Localytics.tagEvent('Assessment Resumed');
    this.Attention.toggle(this.CurrentSession.getInfo());
    this.startTimer();
    this.paused = false;
  }

  pause() {
    this.Localytics.tagEvent('Assessment Paused');
    this.Attention.toggle(this.CurrentSession.getInfo());
    this.stopTimer();
    this.paused = true;
  }

  openFormExternal() {
    this.$state.params.allowNewWindow = true;
    var url = this.$state.href("assess-form",{activityId: this.assess.id});
    window.open(url+"?allowNewWindow=true", 'popUpWindow','height=500,width=400,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=no,menubar=no,location=no,directories=no, status=no');
  }

  private startTimer() {
    this.countdownIntervalPromise = this.$interval(() => this.onTimeChanged(), 1000);
  }

  private stopTimer() {
    this.$interval.cancel(this.countdownIntervalPromise);
  }
}

const template = `
<navigation-bar>
  <right-buttons>
    <missing-students-section append-class="assess">
      <ng-include src="'images/assess/left_arrow_icon.png'"></ng-include>
    </missing-students-section>

    <button class="header-button" ng-show="$ctrl.paused" ng-click="$ctrl.resume()">
      <ng-include class="header-icon" src="'images/assess/resume_icon.png'"></ng-include>
      <span class="header-text">{{'resume' | translate}}</span>
    </button>
    <button class="header-button" ng-hide="$ctrl.paused" ng-click="$ctrl.pause()">
      <ng-include class="header-icon" src="'images/assess/pause_icon.png'"></ng-include>
      <span class="header-text">{{'pause' | translate}}</span>
    </button>
    <button class="header-button form-button" ng-click="$ctrl.openFormExternal()">
        <ng-include class="header-icon" src="'images/assess/assess_preview_icon.png'"></ng-include>
        <span class="header-text">{{'form' | translate}}</span>
    </button>

    <assess-end-button activity="$ctrl.assess" still-working-count="$ctrl.stillWorkingCount"></assess-end-button>
  </right-buttons>
</navigation-bar>
`;

export class AssessDashboardHeader implements IComponentOptions {
  public controller = AssessDashboardHeaderController;
  public template = template;
  public bindings : any = {
    assess: '<',
    stillWorkingCount: '<',
    onTimeChanged: '&'
  };
}
