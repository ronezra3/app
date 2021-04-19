import {ActivityPublishButton} from '../../activities/directives/PublishButton';
import {ActivityPublishButtonController} from '../../activities/directives/PublishButton';
class StoryPublishButtonController extends ActivityPublishButtonController {

  /*@ngInject*/
  constructor($state, Activities, ActivityEvents, Utilities, CurrentSession) {    
    super($state, Activities, ActivityEvents, Utilities, CurrentSession);

  }

  validate() {
    this.isValid = (this.activity.files.length > 0) ? true : false;

    return super.validate();
  }
}

export class StoryPublishButton extends ActivityPublishButton {
  controller = StoryPublishButtonController;
}
