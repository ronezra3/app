class AssessReportContentController {
  activity;
  members;

  allStudentAssessments = this.StudentAssess.query({ids: [this.activity.id]});

  /*@ngInject*/
  constructor(private StudentAssess, private lodash) {
  }

  getQuestionGrade(question) {
    return this.activity.calculateQuestionGrade(this.allStudentAssessments, question);
  }

  getStudentName(studentAssess) {
    if (this.members) {
      const memeber = this.lodash.find(this.members, {id: studentAssess.studentId})
      return memeber ? memeber.getFullName() : "משתמש אנונימי"
    }
  }

  getAverageGrade() {
    if (this.allStudentAssessments.$resolved && this.activity.$resolved) {
      return this.activity.getAverageGrade(this.allStudentAssessments);
    }
  }
}

const template = `
<table>
  <thead>
    <tr>
      <th>{{'name' | translate}}</th>
      <th>{{'sum' | translate}}</th>
      <th ng-repeat="question in $ctrl.activity.questions">{{'q' | translate}}{{question.index}}</th>
    </tr>
    <tr>
      <td>{{'class-grade' | translate}}</td>
      <td>{{$ctrl.getAverageGrade() | percentage:1}}</td>
      <td ng-repeat="question in $ctrl.activity.questions">{{$ctrl.getQuestionGrade(question) | percentage:1}}</td>
    </tr>
  </thead>
  <tbody>
    <tr ng-repeat="studentAssess in $ctrl.allStudentAssessments">
      <td>{{$ctrl.getStudentName(studentAssess)}}</td>
      <td>{{studentAssess.getAverage() | percentage:1}}</td>
      <td ng-repeat="question in $ctrl.activity.questions">
        <is-correct is-correct="studentAssess.isCorrectAnswer(question)"></is-correct>
      </td>
    </tr>
  </tbody>
</table>
`;

export class AssessReportContent {
  controller = AssessReportContentController;
  template = template;
  bindings : any = {
    activity: '<',
    members: '<'
  };
}
