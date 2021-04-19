import {ActivitySubmitButtonController} from '../../activities/directives/SubmitButton';
import {ActivitySubmitButton} from '../../activities/directives/SubmitButton';

export class AssessSubmitButtonController extends ActivitySubmitButtonController {
  studentAssess;

  /*@ngInject*/
  constructor(ActivityResponses, private lodash, private ngDialogRouter, $state, private $q) {
    super(ActivityResponses, $state);

    this.isValid = true;
    this.type = 'assess';
  }

  submit() {
    var missingQuestionsStr = this.lodash.chain(this.studentAssess.questions)
      .where({status: ''})
      .map((missingQuestion) => {
        return 'Q' + missingQuestion.index.toString();
      })
      .join(', ').value();

    if (missingQuestionsStr.length === 0) {
      return this.submitForm();
    }

    let deferred = this.$q.defer();

    this.ngDialogRouter.go('are-you-sure', {
      message: 'confirm-submit-sure',
      secondMessage: 'confirm-submit-questions',
      yes: () => this.submitForm().then(deferred.resolve),
      no: deferred.reject,
      translationData: {questionCount: missingQuestionsStr}
    });

    return deferred.promise;
  }

  protected postSubmit() {
    return this.$state.go('responseSubmitted', {type: this.type}, {replace: true});
  }

  private submitForm() {
    this.studentAssess.submitted = true;
    return super.submit(this.studentAssess).then(this.postSubmit.bind(this));
  }
}

export class AssessSubmitButton extends ActivitySubmitButton {
  controller = AssessSubmitButtonController;
  bindings : any = {
    studentAssess: '<'
  };
}
