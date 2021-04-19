import { IUrl } from './../services/Url';
import { ActivityTeachPreviewController } from '../../activities/controllers/ActivityTeachPreviewController';

export class UrlPreviewController extends ActivityTeachPreviewController {
  public defaultUrl = 'http://www.google.com';
  /*@ngInject*/
  constructor(activity: IUrl, private Url, private $location, private $anchorScroll) {
    super(activity);
    if (!activity.urls) {
      activity.urls = [{}]
    }
    if (!this.activity.sumarizeActivity) {
      this.activity.sumarizeActivity = {}
    }
    else if (this.activity.sumarizeActivity) {
      this.activity.sumarizeActivity.associations = [];
    }
  }

  onDelete(index) {
    this.activity.urls.splice(index, 1);
  }

  canDelete() {
    return !(this.activity.urls.length > 1);
  }

  private scrollBottom() {
    this.$location.hash('bottom');

    // call $anchorScroll()
    this.$anchorScroll();
  }

  // public addSumarizeActivity() {
  //   if (!this.activity.sumarizeActivity) {
  //     this.activity.sumarizeActivity = {}
  //   }
  //   this.scrollBottom();
  // }

  public addUrl() {
    this.activity.urls.push({});
    this.scrollBottom();
  }

  public getSpecificData() {
    return {
      linkType: this.activity.preview.type,
      providerName: this.activity.preview.provider_name
    };
  }

  prePublish() {
    if (this.activity.actualUrl) {
      return;
    }

    this.activity.actualUrl = this.defaultUrl;
    return this.Url.preview({ url: this.defaultUrl }).$promise.then((preview) => {
      this.activity.preview = preview;
    });
  }
}
