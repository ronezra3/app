import { ActivitySubmitButtonController } from '../../activities/directives/SubmitButton';
import { ActivitySubmitButton } from '../../activities/directives/SubmitButton';

class UrlSubmitButtonController extends ActivitySubmitButtonController {
  //   association : string;
  type;
  answer;
  index;
  association: string;
  isValid;
  file;

  constructor(Activities, $state) {
    super(Activities, $state);
    this.type = 'url';
  }

  submit() {
    var currentUser = localStorage.getItem("currentUser");
    const userName = JSON.parse(currentUser).userName;
    return super.submit({ association: this.association, userName: userName, file: this.file });
  }
}

export class UrlSubmitButton extends ActivitySubmitButton {
  controller = UrlSubmitButtonController;
  bindings: any = {
    activity: '<',
    index: '<',
    association: '@',
    answer: '<',
    file: '@',
    isValid: '<'
  };
}
