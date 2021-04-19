
import {ActivityTeachPreviewController} from '../../activities/controllers/ActivityTeachPreviewController';
export class StoryPreviewController extends ActivityTeachPreviewController {
  public getSpecificData() {
    return {}
  }

  /*@ngInject*/
  constructor(private Utilities, public activity, private StoryValues) {
    super(activity)
  }
}
