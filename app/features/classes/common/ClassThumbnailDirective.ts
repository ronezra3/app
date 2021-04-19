class ClassThumbnailController {
  classInfo;
  isTeacher;
  teacherInfo;
  nextState;

  $onInit() {
    this.isTeacher = this.classInfo.isTeacher();

    if (this.isTeacher) {
      this.nextState = 'class';
    } else {
      this.nextState = 'learn.books';
      this.classInfo.getTeacher().then((teacher) => {
        this.teacherInfo = teacher;
      });
    }
  }
}

const template = `
<button class="class-item" ng-click="" ui-sref="{{$ctrl.nextState}}({classId: $ctrl.classInfo.id})">
  <header>
    <div class="title" style="font-weight:600">
      {{$ctrl.classInfo.code}}
    </div>
    <div class="title">
    {{$ctrl.classInfo.subject.name | translate}}
  </div>
  </header>



  <footer></footer>
</button>
`;

// <img class="image" csp-src="{{$ctrl.classInfo.subject.imgUrl}}">

// <div class="image pressed-cover"></div>

export class ClassThumbnail {
  controller = ClassThumbnailController;
  template = template;
  bindings : any = {
    classInfo: '<'
  };
}
