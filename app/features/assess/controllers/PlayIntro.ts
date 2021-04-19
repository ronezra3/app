import IIntervalService = angular.IIntervalService;
import IScope = angular.IScope;

const SECONDS_TO_AUTO_CLOSE_INTRO = 15;

class AssessPlayIntroController {
  public heyTranslationData : any;
  public seconds : number;
  public immediateFeedback;

  /*@ngInject*/
  constructor($scope : IScope, $interval : IIntervalService) {
    this.heyTranslationData = {
      name: $scope['name'],
      minutes: $scope['minutes']
    };

    this.immediateFeedback = $scope['immediateFeedback'];

    // this.seconds = SECONDS_TO_AUTO_CLOSE_INTRO;

    // let countdownIntervalPromise = $interval(() => {
    //   this.seconds--;

    //   if (this.seconds === 0) {
    //     // $scope['closeThisDialog']();
    //   }
    // }, 1000);

    // $scope.$on('$destroy', () => $interval.cancel(countdownIntervalPromise));
  }
}

const template = `
<header class="assess-dialog-header">
  <h1>כעת נצא לסדרת שאלות חשיבה</h1>
</header>
<p>אולי נטעה, אבל בטוח נזכור.
<br>בהצלחה ובהנאה</p>
<p ng-if="$ctrl.immediateFeedback">{{'assess-play-intro-immediate' | translate}}</p>
<p ng-if="!$ctrl.immediateFeedback" style="direction: rtl;">{{'assess-play-intro-none-immediate' | translate}}</p>
<embed class="icon" style="height:130px;display:inline" src="images/new/ic5.png" />
<footer>
  <button class="primary action-button" ng-click="closeThisDialog()">
    <span>{{'start' | translate}}</span> 
  </button>
</footer>
`;
// <ng-include class="icon" src="'images/panel/icons/assess.svg'"></ng-include>
// <p>{{'assess-play-intro-hey' | translate:$ctrl.heyTranslationData}}</p>

export class AssessPlayIntro {
  template = template;
  controllerAs = '$ctrl';
  controller = AssessPlayIntroController;
  appendClassName = 'assess play-intro';
}
