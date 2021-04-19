import IPromise = angular.IPromise;
import {ActivityEnrichPreviewController} from './ActivityEnrichPreviewController';
export class ActivityTeachPreviewController extends ActivityEnrichPreviewController {
  protected prePublish() : IPromise<any> {
    return null;
  }
}
