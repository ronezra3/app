import {Utilities} from '../../../3rdparty/common/services/Utilities';

class CorrectQuestionIndicatorController {
  /*@ngInject*/
  constructor(private Utilities : Utilities) {
  }

  isCorrect(question) {
    return this.Utilities.getFactoryByName(question.type + 'Question').isCorrect(question);
  }
}

const template = `
<div class="question-status ng-hide correct fade-animation" ng-show="$ctrl.isFullyAnswered && $ctrl.isCorrect($ctrl.question)">
  <ng-include src="'images/v_icon2.png'"></ng-include>
</div>
<div class="question-status ng-hide incorrect fade-animation" ng-show="$ctrl.isFullyAnswered && !$ctrl.isCorrect($ctrl.question)">
  <ng-include src="'images/x-icon.png'"></ng-include>
</div>
`;

export class CorrectQuestionIndicator {
  controller = CorrectQuestionIndicatorController;
  template = template;
  bindings : any = {
    question: '<',
    isFullyAnswered: '<'
  };
}
