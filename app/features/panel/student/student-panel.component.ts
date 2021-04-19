class StudentPanelCtrl {
  activities = this.ENV.student.activities;
  members;
  teacher;

  /*@ngInject*/
  constructor(private ENV) {
  }
}

const template = `
<panel>
  <panel-header>
    <student-session-button></student-session-button>
  </panel-header>
  
  <panel-content>
    <student-together-button members="$ctrl.members" teacher="$ctrl.teacher"></student-together-button>
    <!--<activities-section activities="$ctrl.activities"></activities-section>-->
  </panel-content>
</panel>
`;

export class StudentPanel {
  controller = StudentPanelCtrl;
  template = template;
  bindings : any = {
    members: '<',
    teacher: '<'
  };
}
