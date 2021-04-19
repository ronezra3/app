import {IDialogRouter} from '../../../3rdparty/common/layout/services/NgDialogRouter';

class JoinClassThumbnailController {
  title = 'הצטרף למפגש';
  isStudent = true;
  /*@ngInject*/
  constructor(private ngDialogRouter : IDialogRouter) {
    this.execute();
  }

  execute() {
    this.ngDialogRouter.go('classes.join.class');
  }
}

export class JoinClassThumbnail {
  template = require('./../common/thumbnail.template.html');
  controller = JoinClassThumbnailController;
  bindings : any = {
    classInfo: '<',
    classes: '<'
  };
}
