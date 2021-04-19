
export class UrlPlayController {
  charLimit;
  lastValidAssociation;
  association : string;
  file;
  isWaitingForFile;
  maxFileSize;
  allowedFormats;

  /*@ngInject*/
  constructor(private Utilities, public activity, private UrlValues, private ngDialogRouter, private Upload,private $timeout, private ENV) {
    this.charLimit = 120;
    this.maxFileSize = UrlValues.maxFileSize;
    this.allowedFormats = UrlValues.allowedFormats;
    this.openInitPopup();
  }


  addPic(pic, invalidFiles) {
    
    if (pic) {
      this.isWaitingForFile = true;
      this.Upload.upload({ url: this.ENV.lmsEndpoint+"/avatars", method: 'POST', file: pic }).then(res => {
        this.$timeout(()=>{
        this.file = res.data.secure_url;
        this.isWaitingForFile = false;
        },0)

        
      });
    }
    // return this.file;
  }

  associationChanged() {
    if (this.association.length > this.charLimit) {
      return this.association = this.lastValidAssociation;
    }

    this.lastValidAssociation = this.association;
  }

  private openInitPopup() {
    //todo: this needs to be closed onDestroy
    this.ngDialogRouter.go('url.play.intro');
  }

  $onDestroy() {
    // this.ngDialogRouter.closeAll();
  }
}
