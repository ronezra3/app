class AssessAnswerController {
  feedbackShown;
  question;
  answer;
  answerNumber;
  questionService;
  immediateFeedback;

  /*@ngInject*/
  constructor(private CurrentSession, Utilities) {
    this.questionService = Utilities.getFactoryByName(`${this.question.type}Question`);
    this.questionService.initialize(this.question);
  }

  closeFeedbackInput($event) {
    var enterKeyCode = 13;
    if ($event.keyCode !== enterKeyCode) {
      return;
    }

    this.feedbackShown = false;
    $event.preventDefault();
  }

  isInSession() {
    return this.CurrentSession.isActive();
  }
}

export class AssessAnswer {
  template = require('./../templates/assess-answer-option.html');
  controller = AssessAnswerController;
  bindings : any = {
    answer: '<',
    question: '<',
    answerNumber: '@',
    immediateFeedback: '<'
  };
}
