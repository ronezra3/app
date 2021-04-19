const GENERIC_ERROR = 'generic_error';

/*@ngInject*/
export class ValidationHandler {
  constructor(private ngDialogRouter) {
  }

  handle(errorMassage) {
    if (errorMassage && typeof errorMassage !== 'string') {
      console.log('Error message must be a string');
      errorMassage = GENERIC_ERROR;
    }

    this.ngDialogRouter.go('validationMassage', {
      errorMassage: errorMassage || GENERIC_ERROR
    });
  }
}
