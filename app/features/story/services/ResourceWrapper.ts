import {SubmitableResourceWrapper} from '../../activities/services/SubmitableResourceWrapper';
export class StoryResourceWrapper extends SubmitableResourceWrapper {
  env

  constructor($resource, ENV, CurrentUser, private lodash) {
    super($resource, ENV, 'story', CurrentUser);
    this.env = ENV;
  }

  get() {
    let resource = super.get();
    let ENV = this.env;

    resource.prototype.getFilePath = function(filters = [], extension = ".jpg") {
      if (!this.files || this.files.length == 0) return "";

      let file = this.files[0]; // Currently only a single file is supported
      
      if (ENV.isOffline) {
        if (file.fileType == 'application/pdf' && filters.length > 0) {
          return 'images/pdf_icon.png';
        }
        return file.fileId;
      }

      let basePath = `${ENV.cloudinaryApi}${ENV.cloudinaryCloudName}/image/upload/`;
      let filtersPath = filters.length > 0 ? filters.join(",") + "/" : "";

      return basePath + filtersPath + file.fileId + extension;
    }

    return resource;
  }
}
