import {IDialogRouter} from '../../../3rdparty/common/layout/services/NgDialogRouter';
class CreateClassThumbnailController {
  title = 'צור מפגש חדש';
  subjects;

  /*@ngInject*/
  constructor(private ngDialogRouter : IDialogRouter) {

  }

  execute() {
    this.ngDialogRouter.go('classes.create.class', {subjects: this.subjects});
  }
}

export class CreateClassThumbnail {
  template = require('./../common/thumbnail.template.html');
  controller = CreateClassThumbnailController;
  bindings : any = {
    classInfo: '<',
    subjects: '<'
  };
}
