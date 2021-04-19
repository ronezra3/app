import { ActivitySubmitButtonController } from '../../activities/directives/SubmitButton';
class SnapshotSubmitButtonController extends ActivitySubmitButtonController {
  voteType;

  /*@ngInject*/
  constructor(Activities, $state) {
    super(Activities, $state);

    this.isValid = true;
    this.type = 'snapshot';
  }

  submit() {
    setTimeout(() => {
      return super.submit({ vote: this.voteType });
    }, 1000)
  }

  voteTypeFn() {
    return this.voteType == 'yes' ? 'V' : 'X'
  }
}

const template = `
<click-once-button on-click="$ctrl.submit()" class="container {{$ctrl.voteType}}">
  <ng-include src="'images/new/' + $ctrl.voteTypeFn() + '.png'"></ng-include>
  <circular-progress-bar class="white"></circular-progress-bar>
</click-once-button>
`;

export class SnapshotSubmitButton {
  controller = SnapshotSubmitButtonController;
  template = template;
  bindings: any = {
    activity: '<',
    voteType: '@type'
  };
}
