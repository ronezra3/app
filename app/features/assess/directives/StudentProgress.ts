import IComponentOptions = angular.IComponentOptions;

const template = `
<ul class="assess-solve-progress-steps">
  <li ng-repeat="question in $ctrl.studentAssess.questions">
    <div ng-class="question.status ? 'assess-solve-progress-step-answered' : 'assess-solve-progress-step'">
      {{question.index}}
      <ng-include class="assess-solve-progress-step-answered-icon" ng-if="question.status" src="'images/v_icon.png'"></ng-include>
    </div>
    <div ng-class="question.status ? 'assess-solve-progress-step-line-answered' : 'assess-solve-progress-step-line'" ng-hide="$last"></div>
  </li>
</ul>
`;

export class StudentProgress implements IComponentOptions {
  template = template;
  bindings : any = {
    studentAssess: '<'
  };
}
