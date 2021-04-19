export class AssessQuestionInput {
  template = require('./../templates/assess-question-input.html');
  bindings : any = {
    remove: '&',
    question: '<',
    getIndex: '&',
    immediateFeedback: '<'
  };
}
