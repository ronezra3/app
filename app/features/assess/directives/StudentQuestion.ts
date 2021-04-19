import IComponentOptions = angular.IComponentOptions;
import { Utilities } from '../../../3rdparty/common/services/Utilities';

class StudentQuestionController {
  /*@ngInject*/
  constructor(private Utilities: Utilities, private $scope) {
  }

  isFullyAnswered(question) {
    return this.Utilities.getFactoryByName(question.type + 'Question').isFullyAnswered(question);
  }

  isShowFeedback(question, answer) {
    if (!this.isFullyAnswered(question)) {
      return false;
    }
    return Boolean(answer.selected);
  }
}

const template = `
<header>
  <correct-question-indicator question="$ctrl.question" is-fully-answered="$ctrl.isFullyAnswered($ctrl.question)" 
    ng-show="$ctrl.immediateFeedback"></correct-question-indicator>
  <assess-question-title question="$ctrl.question"></assess-question-title>
</header>
<assess-multi-question-explanation question="$ctrl.question" ng-if="$ctrl.question.type === 'multi'"></assess-multi-question-explanation>
<ol>
  <li ng-repeat="answer in $ctrl.question.answers">
    <assess-answer-button is-fully-answered="$ctrl.isFullyAnswered($ctrl.question)" answer="answer" question="$ctrl.question"
                          student-assess="$ctrl.studentAssess" immediate="$ctrl.immediateFeedback"></assess-answer-button>
    <div>
      <div class="answer-content">{{answer.content}}
      
        <span ng-show="$ctrl.isFullyAnswered($ctrl.question) && answer.selected"><b> - התשובה שלי</b></span>
      
      </div>
      <assess-answer-specific-feedback answer="answer" ng-show="$ctrl.isShowFeedback($ctrl.question, answer)" 
        ng-if="$ctrl.immediateFeedback"></assess-answer-specific-feedback>
    </div>
  </li>
</ol>
`;

export class StudentQuestion implements IComponentOptions {
  controller: any = StudentQuestionController;
  template = template;
  bindings: any = {
    question: '<',
    immediateFeedback: '<',
    studentAssess: '<'
  };
}
