export class AddQuestionButton {
  transclude = true;
  template = require('./../templates/assess-add-question-button.html');
  bindings : any = {
    onClick: '&'
  };
}
