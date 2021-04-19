class AssessAnswerSpecificFeedbackController {
  answer;

  show() {
    return this.answer.specificFeedback && (this.answer.selected || this.answer.status);
  }
}

export class AssessAnswerSpecificFeedback {
  controller = AssessAnswerSpecificFeedbackController;
  template = `<div class="assess-solve-answer-feedback" ng-show="$ctrl.show()">{{$ctrl.answer.specificFeedback}}</div>`;
  bindings : any = {
    answer: '<'
  };
}
