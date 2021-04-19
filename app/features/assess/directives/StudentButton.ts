const template = `
<button class="student-button" ng-show="$ctrl.student" ng-click="$ctrl.openStudentStats({student: $ctrl.student})">
  <img class="thumbnail" csp-src="{{$ctrl.student.getAvatarUrl()}}"/>
  <span class="name">{{$ctrl.student.getFullName()}}</span>
</button>
`;

export class AssessStudentButton {
  template = template;
  bindings : any = {
    student: '<',
    openStudentStats: '&'
  };
}
