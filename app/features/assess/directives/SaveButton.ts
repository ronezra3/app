import {AssessResourceWrapper} from '../services/ResourceWrapper';
import {ActivitySaveButton} from '../../activities/directives/SaveButton';
import {ActivitySaveButtonController} from '../../activities/directives/SaveButton';
class AssessSaveButtonController extends ActivitySaveButtonController {

  /*@ngInject*/
  constructor(private lodash, private Utilities, ActivityEvents, Activities, $state) {
    super($state, Activities, ActivityEvents);
  }

  validate() {
    return super.validate() || AssessResourceWrapper.validate(this.activity, this.Utilities, this.lodash);
  }
}

export class AssessSaveButton extends ActivitySaveButton {
  controller = AssessSaveButtonController;
}
