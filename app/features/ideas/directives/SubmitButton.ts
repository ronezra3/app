import { ActivitySubmitButtonController } from '../../activities/directives/SubmitButton';
import { ActivitySubmitButton } from '../../activities/directives/SubmitButton';
import { Activities } from '../../activities/services/ActivitiesFactory';

class IdeasSubmitButtonController extends ActivitySubmitButtonController {


  association: string;
  file;
  type = 'ideas';

  submit() {

    var currentUser = localStorage.getItem("currentUser");
    const userName = JSON.parse(currentUser).userName;
    
    return super.submit({ association: this.association, userName: userName, file: this.file });
  }
}

export class IdeasSubmitButton extends ActivitySubmitButton {
  controller = IdeasSubmitButtonController;
  bindings: any = {
    activity: '<',
    association: '@',
    file: '@',
    isValid: '<'
  };
}
