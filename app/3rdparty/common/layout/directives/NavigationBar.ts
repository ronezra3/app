const templae = `
<section class="left-buttons" ng-transclude="leftButtons"></section>
<section class="right-buttons" ng-transclude="rightButtons"></section>
<section class="nav-bar-title" ng-transclude="title"></section>
`;

export class NavigationBar {
  transclude : any = {
    leftButtons: '?leftButtons',
    title: '?navBarTitle',
    rightButtons: '?rightButtons',
    logo: '?logo'
  };
  template = templae;
}
