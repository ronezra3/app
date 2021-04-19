class CorrectAnswerPickerController {
  question;
  answer;
  questionService;

  /*@ngInject*/
  constructor(Utilities) {
    this.questionService = Utilities.getFactoryByName(`${this.question.type}Question`);
    this.questionService.initialize(this.question);
  }

  select() {
    this.questionService.toggleAnswerStatus(this.question, this.answer);
  }
}

export class CorrectAnswerPicker {
  controller = CorrectAnswerPickerController;
  template = require('./../templates/correct-answer-picker.html');
  bindings : any = {
    question: '<',
    answer: '<',
    isDisabled: '<?'
  };
}
