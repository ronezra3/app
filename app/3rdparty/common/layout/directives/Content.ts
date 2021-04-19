const template = `<article ng-transclude class="content" ng-class="{'scrollable': scrollable === true}"></article>`;

export function Content() {
  return {
    restrict: 'E',
    transclude: true,
    replace: true,
    scope: {
      scrollable: '='
    },
    template: template
  };
}
