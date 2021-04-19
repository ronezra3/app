class PollOptionController {
  public answers;
  public index;
  public answer;
  public otherAnswers;

  $onInit() {
    this.answer = this.answers[this.index];
    this.otherAnswers = this.answers.filter((answer) => {
      return answer !== this.answer;
    });
  }
}

const template = `
<input class="activity-input" type="text" ng-model="$ctrl.answer.title"
       ng-required="$ctrl.isRequired"
       duplicated-answer-validator
       duplicated-answer-validator-answers="$ctrl.otherAnswers"
       name="option-{{$ctrl.index + 1}}"
       focus-on="{{$ctrl.answer.shouldFocus}}"
       placeholder="{{($ctrl.isRequired ? 'poll-option-placeholder' : ($ctrl.index + 1 | numberToLetter)) | translate}}"/>
<button class="poll-option-delete" ng-click="$ctrl.onDelete({title: $ctrl.answer.title})"
        ng-disabled="$ctrl.canDelete()">
  <ng-include class="delete-icon" src="'images/x-icon.png'"></ng-include>
</button>
`;

export class PollOption {
  controller = PollOptionController;
  template = template;
  bindings : any = {
    isRequired: '<',
    answers: '<',
    index: '<',
    onDelete: '&',
    canDelete: '&'
  };
}
