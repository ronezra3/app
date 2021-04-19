class HamburgerButtonController {

  /*@ngInject*/
  constructor(private $rootScope) {

  }

  toggleSideBar() {
    this.$rootScope.$broadcast('toggleRightSidebar');
  }
}

const template = `
<button ng-click="$ctrl.toggleSideBar()">
    <ng-include src="'images/menu_dark.png'"></ng-include>
</button>
`;

/*@ngInject*/
export class HamburgerButton {
  controller = HamburgerButtonController;
  template = template;
}
