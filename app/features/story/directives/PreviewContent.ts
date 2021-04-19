class StoryPreviewContentController {
    public isRequired;
    public activity;
    public form;

    public previewImageSrc : string;
    public maxFileSize;
    public allowedFormats;

    /*@ngInject*/
    constructor(private StoryValues, private Localytics, private Upload, private ENV) {
      this.maxFileSize = StoryValues.maxFileSize;
      this.allowedFormats = StoryValues.allowedFormats;
    }
  
    $onInit() {
      if (this.activity.files && this.activity.files.length > 0) {
        this.previewImageSrc = this.activity.getFilePath(["w_400"]);
      }
    }

    onFileAdded(file) {
      if (!file) return;
      this.previewFile(file)
      this.uploadFile(file)
    }

    previewFile(file) {
      if (file && file.type.match('^image/')) {
        var reader = new FileReader();
        reader.onload = (e : any) => {
          this.previewImageSrc = e.target.result;
        }
        reader.readAsDataURL(file);
      }
    }

    uploadFile(file) {
      this.Upload.upload({ url: this.ENV.lmsEndpoint+"/avatars", method: 'POST', file: file }).then(res => {
        this.activity.files = [{fileType: file.type, fileId: res.data.secure_url}];

        if (file.fileType == 'application/pdf') {
            this.previewImageSrc = this.activity.getFilePath(["w_400"]);
        }
      });
    }
  }
  
  export class StoryPreviewContent {
    controller = StoryPreviewContentController;
    template = require('./../templates/preview-content.html');
    bindings : any = {
      isRequired: '<',
      form: '<',
      activity: '<'
    };
  }
  