const template = `
<div class="assess-dashboard-title">
  <div class="timer" ng-class="{'timed-out': timedOut}">
    <ng-include class="assess-dashboard-timer-icon" src="'images/timer_icon.png'"></ng-include>
    <span>{{timeLeft}}</span>
  </div>
  <h1>{{assess.title || ('default-assess-title' | translate)}}</h1>
</div>

<div class="assess-dashboard-grade-and-progress-container">
  <div class="assess-dashboard-grade-container">
    <div class="assess-dashboard-sub-header">{{'average-grade' | translate}}</div>
    <div class="assess-dashboard-grade-box">
      <div class="assess-dashboard-grade-text">{{averageGrade}}%</div>
    </div>
  </div>

  <div class="assess-dashboard-progress-container">
    <div class="assess-dashboard-sub-header">{{'average-completion' | translate}}</div>
    <div class="assess-dashboard-progress-box">
      <div class="assess-dashboard-progress-percentage">{{averageProgress}}%</div>
      <progress-bar class="assess-dashboard-progress" progress="averageProgress"></progress-bar>
    </div>
  </div>
</div>
`;

export function AssessDashboardMiddle() {
  return {
    restrict: 'E',
    template: template,
    scope: {
      assess: '=',
      timeLeft: '=',
      averageGrade: '=',
      averageProgress: '=',
      timedOut: '='
    }
  };
}
