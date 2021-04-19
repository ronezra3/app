import {StoryResourceWrapper} from '../services/ResourceWrapper';
import {ActivitySaveButton} from '../../activities/directives/SaveButton';
import {ActivitySaveButtonController} from '../../activities/directives/SaveButton';
class StorySaveButtonController extends ActivitySaveButtonController {

  /*@ngInject*/
  constructor($state, Activities, ActivityEvents, private Upload, private ENV) {    
    super($state, Activities, ActivityEvents);
  }

  validate() {
    this.isValid = (this.activity.files.length > 0) ? true : false;

    return super.validate();
  }
}

export class StorySaveButton extends ActivitySaveButton {
  controller = StorySaveButtonController;
}
