import {ActivitySubmitButtonController} from '../../activities/directives/SubmitButton';

class AssessAnswerButtonController extends ActivitySubmitButtonController {
  question;
  answer;
  immediate;
  isFullyAnswered;
  studentAssess;

  /*@ngInject*/
  constructor(ActivityResponses, private Utilities, private lodash, $state) {
    super(ActivityResponses, $state);

    this.isValid = true;
    this.type = 'assess';
  }

  displayX() {
    return this.answer.selected && this.immediate && !this.answer.status && this.isFullyAnswered;
  }

  select() {
    var questionService = this.Utilities.getFactoryByName(this.question.type + 'Question');
    questionService.toggleAnswerSelected(this.question, this.answer);

    var updatedQuestion = this.lodash.find(this.studentAssess.questions, {index: this.question.index});
    updatedQuestion.status = questionService.isFullyAnswered(this.question) ?
      (questionService.isCorrect(this.question) ? 'correct' : 'incorrect') : '';
    updatedQuestion.answers = this.lodash.chain(this.question.answers).where({selected: true}).map('_id').value();
    return super.submit(this.studentAssess);
  }

  protected postSubmit() {
    // assess doesn't have a thank you screen
  }
}

const template = `
<button ng-click="$ctrl.select()" ng-disabled="$ctrl.isFullyAnswered && $ctrl.immediate" class="assess-solve-answer-button"
        ng-class="{'round' : $ctrl.question.type !== 'multi',
                    'selected': $ctrl.answer.selected, 'immediate': $ctrl.immediate,
                    'correct' : $ctrl.answer.status && $ctrl.isFullyAnswered && $ctrl.immediate,
                    'incorrect': !$ctrl.answer.status && $ctrl.isFullyAnswered && $ctrl.immediate}">
  <ng-include ng-if="!$ctrl.displayX()" src="'images/v_icon2.png'"></ng-include>
  <ng-include ng-if="$ctrl.displayX()" src="'images/x-icon.png'"></ng-include>
 
</button>
`;

export class AssessAnswerButton {
  template = template;
  controller = AssessAnswerButtonController;
  bindings : any = {
    immediate: '<',
    isFullyAnswered: '<',
    question: '<',
    answer: '<',
    studentAssess: '<'
  };
}
