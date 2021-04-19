const template = `
<nav class="activity-buttons-nav padded">
  <activity-remove-button ng-if="$ctrl.activity.id" type="{{$ctrl.type}}" activity="$ctrl.activity"></activity-remove-button>
  <activity-save-button class="primary" activity="$ctrl.activity" type="{{$ctrl.type}}"
    specific-data="$ctrl.getSpecificData()" is-valid="$ctrl.isValid"></activity-save-button>
</nav>
`;

export class ActivityEnrichPreviewFooter {
  template = template;
  bindings : any = {
    type: '@',
    activity: '<',
    getSpecificData: '&',
    isValid: '<'
  };
}
