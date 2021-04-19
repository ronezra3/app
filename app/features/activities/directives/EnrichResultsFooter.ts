const template = `
<nav class="activity-buttons-nav padded">
  <activity-remove-button class="secondary" activity="$ctrl.activity" type="{{$ctrl.type}}"></activity-remove-button>
  <activity-reset-button class="secondary" activity="$ctrl.activity" type="{{$ctrl.type}}"></activity-reset-button>
</nav>
`;

export class ActivityEnrichResultsFooter {
  template = template;
  bindings : any = {
    type: '@',
    activity: '<'
  };
}
