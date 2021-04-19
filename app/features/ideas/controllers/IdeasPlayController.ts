export class IdeasPlayController {
  charLimit;
  lastValidAssociation;
  association: string;
  file;
  isWaitingForFile;
  maxFileSize;
  allowedFormats;
  
  /*@ngInject*/
  constructor(private $timeout,private Utilities, public activity, private IdeasValues, private Upload, private ENV) {
    this.charLimit = 120;
    this.maxFileSize = IdeasValues.maxFileSize;
    this.allowedFormats = IdeasValues.allowedFormats;
  }

  addPic(pic) {
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

}
