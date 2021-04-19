class MemberThumbnailController {
  public onRemove;
  public member;
  public isDisabled;

  /*@ngInject*/
  constructor(private ngDialogRouter) {
  }

  click() {
    this.ngDialogRouter.go('manage.student', {
      student: this.member,
      onStudentRemoved: this.onRemove
    });
  }
}

const template = `
<button ng-click="$ctrl.click()" ng-disabled="$ctrl.isDisabled">
  <div class="member-circle">
    <img class="member-image" csp-src="{{$ctrl.member.getAvatarUrl(100)}}"/>
  </div>
  <p class="name">{{$ctrl.member.getFullName()}}</p>
</button>
`;

export class MemberThumbnail {
  controller = MemberThumbnailController;
  template = template;
  bindings : any = {
    member: '<',
    onRemove: '&',
    isDisabled: '<?'
  };
}
