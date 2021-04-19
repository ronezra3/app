import {ActivityTeachPreviewController} from '../../activities/controllers/ActivityTeachPreviewController';
export class PollPreviewController extends ActivityTeachPreviewController {
  public getSpecificData() {
    return {optionsCount: this.activity.answers.length};
  }
}
