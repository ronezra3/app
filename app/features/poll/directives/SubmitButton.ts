import { ActivitySubmitButtonController } from '../../activities/directives/SubmitButton';
export class PollSubmitButtonController extends ActivitySubmitButtonController {
  answer;
  index;

  /*@ngInject*/
  constructor(Activities, $state) {
    super(Activities, $state);

    this.isValid = true;
    this.type = 'poll';
  }

  submit() {
    setTimeout(() => {
      super.submit({ answerId: this.answer.id });
    }, 1000)


  }
}

const template = `
<click-once-button on-click="$ctrl.submit()">
  <span>{{$ctrl.answer.title || ($ctrl.index + 1 | numberToLetter | translate)}}</span>
  <loader></loader>
</click-once-button>
`;

export class PollSubmitButton {
  controller = PollSubmitButtonController;
  template = template;
  bindings: any = {
    activity: '<',
    index: '<',
    answer: '<'
  };
}
