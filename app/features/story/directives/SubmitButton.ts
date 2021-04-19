import {ActivitySubmitButtonController} from '../../activities/directives/SubmitButton';
import {ActivitySubmitButton} from '../../activities/directives/SubmitButton';

class StorySubmitButtonController extends ActivitySubmitButtonController {
  constructor(Activities, $state) {
    super(Activities, $state);

    this.isValid = true;
    this.type = 'story';
  }

  submit() {
    return super.submit({});
  }
}

export class StorySubmitButton extends ActivitySubmitButton {
  controller = StorySubmitButtonController;
  bindings : any = {
    activity: '<',
    isValid: '<'
  };
}
