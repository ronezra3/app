class SideBarsController {
  isRightSideBarVisible;

  /*@ngInject*/
  constructor(private MatchMediaWrapper, private $rootScope) {
    this.isRightSideBarVisible = !MatchMediaWrapper.isMiniTabletOrSmaller() && MatchMediaWrapper.isLandscape();

    MatchMediaWrapper.onPortrait((isPortrait) => {
      if (!MatchMediaWrapper.isMiniTabletOrSmaller()) {
        this.isRightSideBarVisible = !isPortrait;
        this.$rootScope.$broadcast('rightSidebarStateChanged', this.isRightSideBarVisible);
      }
    });

    MatchMediaWrapper.onMiniTablet(() => this.close());
    $rootScope.$on('toggleRightSidebar', () => this.toggleRightSidebar());
  }

  toggleRightSidebar() {
    this.isRightSideBarVisible = !this.isRightSideBarVisible;
    this.$rootScope.$broadcast('rightSidebarStateChanged', this.isRightSideBarVisible);
  }

  close() {
    this.isRightSideBarVisible = false;
    this.$rootScope.$broadcast('rightSidebarStateChanged', this.isRightSideBarVisible);
  }
}

const template = `
<div class="side-bars">
  <div ng-show="$ctrl.isRightSideBarVisible" class="sidebars-backdrop fade-animation ng-hide" ng-click="$ctrl.close()"></div>
  <section class="side-bars-content" ng-transclude="content"></section>
  <section ng-class="{'closed': !$ctrl.isRightSideBarVisible}" class="side-bar-container side-bar-right closed"
           ng-swipe-right="$ctrl.toggleRightSidebar()" ng-transclude="rightSideBar"></section>
</div>
`;

export class SideBars {
  controller = SideBarsController;
  transclude : any = {
    content: 'sideBarsContent',
    rightSideBar: 'rightSideBar'
  };
  template = template;
}
