const template = `
<ul class="panel-section">
  <li ng-repeat="(activity, stages) in $ctrl.activities">
    <activity-button type="{{activity}}" mode="{{$ctrl.mode}}"></activity-button>
  </li>
</ul>
`;

export class ActivitiesSection {
  template = template;
  bindings : any = {
    activities: '<',
    mode: '@'
  };
}
