const template = `
    <link-preview class="ng-hide slide-down-animation" ng-show="$ctrl.preview.type !== 'photo'" preview="$ctrl.preview"></link-preview>
    <embedded-photo class="ng-hide slide-down-animation" ng-show="$ctrl.preview.type === 'photo'" preview="$ctrl.preview"></embedded-photo>
`;

export class UrlPreview {
  template = template;
  bindings : any = {
    preview: '<'
  };
}
