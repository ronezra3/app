import {ActivityPublishButton} from '../../activities/directives/PublishButton';
import {ActivityPublishButtonController} from '../../activities/directives/PublishButton';
import {AssessResourceWrapper} from '../services/ResourceWrapper';
class AssessPublishButtonController extends ActivityPublishButtonController {

  /*@ngInject*/
  constructor(private lodash, Utilities, ActivityEvents, Activities, $state, CurrentSession) {
    super($state, Activities, ActivityEvents, Utilities, CurrentSession);
  }

  validate() {
    return super.validate() || AssessResourceWrapper.validate(this.activity, this.Utilities, this.lodash);
  }
}

export class AssessPublishButton extends ActivityPublishButton {
  controller = AssessPublishButtonController;
}
