class TeacherPanelCtrl {
  activities = this.ENV.teacher.activities;

  /*@ngInject*/
  constructor(private ENV) {
  }
}

const template = `
<panel>
  <panel-header>
   <teacher-session-button class-info="classInfo"></teacher-session-button>
  </panel-header>
  
  <panel-content>
    <mdm-section></mdm-section>
    <activities-section activities="$ctrl.activities" mode="teach"></activities-section>
  </panel-content>
</panel>
`;

export class TeacherPanel {
  controller = TeacherPanelCtrl;
  template = template;
}
