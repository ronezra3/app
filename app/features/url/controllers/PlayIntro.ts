import IIntervalService = angular.IIntervalService;
import IScope = angular.IScope;

const SECONDS_TO_AUTO_CLOSE_INTRO = 15;

class UrlPlayIntroController {
    public heyTranslationData: any;
    public seconds: number;
    public immediateFeedback;

    /*@ngInject*/
    constructor($scope: IScope, $interval: IIntervalService) {
        this.heyTranslationData = {
            name: $scope['name'],
            minutes: $scope['minutes']
        };

        this.immediateFeedback = $scope['immediateFeedback'];

        this.seconds = SECONDS_TO_AUTO_CLOSE_INTRO;

        let countdownIntervalPromise = $interval(() => {
            this.seconds--;

            if (this.seconds === 0) {
                // $scope['closeThisDialog']();
            }
        }, 1000);

        $scope.$on('$destroy', () => $interval.cancel(countdownIntervalPromise));
    }
}

const template = `
<header class="assess-dialog-header">
  <h1> {{'cafeteria_time' | translate}} </h1>
  <button class="primary action-button" ng-click="closeThisDialog()">
    <span>{{'start' | translate}}</span>
  </button>
</header>
<footer>
  <embed class="icon" style="width:50vw;max-width:200px;margin:auto;" src="images/new/ic2.png" />
</footer>

`;
// <ng-include class="icon" src="'images/panel/icons/assess.svg'"></ng-include>
// <p>{{'assess-play-intro-hey' | translate:$ctrl.heyTranslationData}}</p>

export class UrlPlayIntro {
    template = template;
    controllerAs = '$ctrl';
    controller = UrlPlayIntroController;
    appendClassName = 'assess play-intro';
}
