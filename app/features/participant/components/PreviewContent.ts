class ParticipantPreviewContentController {

  /*@ngInject*/
  constructor(private lodash) {
  }

  getItems() {
    var itemsNumber = 17;
    return this.lodash.range(1, itemsNumber);
  }
}

const template = `
<preview-header class="padded" type="participant" is-required="$ctrl.isRequired" field-name="instruction"
                activity="$ctrl.activity" form="$ctrl.form"></preview-header>

<section class="animation-preview">
  <ng-include class="participant-item" ng-class="{'participant-first-seria' : $first}"
              ng-repeat="n in $ctrl.getItems()"
              src="'images/participant/participant' + n % 4 + '.png'"></ng-include>
  <ng-include class="current-student-image question-mark" src="'images/new/Circle_Who.png'"></ng-include>
</section>
`;

export class ParticipantPreviewContent {
  controller = ParticipantPreviewContentController;
  template = template;
  bindings : any = {
    activity: '<',
    form: '<',
    isRequired: '<'
  };
}
