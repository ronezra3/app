/*@ngInject*/
class ClassStudentController {
  public onStudentRemoved;
  public student;

  constructor(private ngDialogRouter) {
  }

  click() {
    this.ngDialogRouter.go('manage.student', {
      student: this.student,
      onStudentRemoved: this.onStudentRemoved
    });
  }
}

const template = `
<button ng-click="$ctrl.click()">
  <span class="circle">
    <img class="avatar" csp-src="{{$ctrl.student.getAvatarUrl()}}">
  </span>
  <span class="name">{{$ctrl.student.getFullName()}}</span>
</button>
`;

export class ClassStudent {
  controller = ClassStudentController;
  template = template;
  bindings : any = {
    student: '<',
    onStudentRemoved: '&'
  };
}
