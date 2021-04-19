export class BackButtonController {
  onBack;

  /*@ngInject*/
  constructor(private $state) {
  }

  back() {
    this.$state.back().then(this.onBack);
  }
}

const template = `
<button ng-click="$ctrl.back()">
  <ng-include src="'3rdparty/common/images/back_arrow.png'"></ng-include>
</button>
`;

export class BackButton {
  template = template;
  controller = BackButtonController;
  bindings : any = {
    onBack: '&'
  };
}
