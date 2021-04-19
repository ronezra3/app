import LoDashStatic = _.LoDashStatic;
import {IDialogRouter} from '../../../3rdparty/common/layout/services/NgDialogRouter';
import {Localytics} from '../../common/services/Localytics';
import {IAssessResults} from '../services/AssessResults';

class AssessDashboardBottomController {
  results : IAssessResults;
  questions : any[];

  /*@ngInject*/
  constructor(private Localytics : Localytics, private ngDialogRouter : IDialogRouter, private lodash : LoDashStatic) {

  }

  openStudentStats(student) {
    let questions;
    let studentAssess = this.lodash.find(this.results.get(), {'studentId': student.id});
    if (studentAssess.questions) {
      questions = studentAssess.questions;
    } else {
      questions = this.lodash.map(this.questions, (question) => ({index: question.index, status: ''}));
    }

    this.ngDialogRouter.go('assess.student.stats', {
      selectedStudent: student,
      selectedStudentQuestions: questions
    });
  }

  openNeedHelpStudentStats(student) {
    this.Localytics.tagEvent('Need Help Student Opened');
    this.openStudentStats(student);
  }

  openQuestionStats(question) {
    this.ngDialogRouter.go('assess.questions.stats', {
      selectedQuestion: question
    });
  }
}

const template = `
<div class="smart-data">
  <div class="assess-dashboard-need-help-sub-header">{{'need-help' | translate}}</div>
  <div class="assess-dashboard-need-help-box">
    <button ng-repeat="student in $ctrl.needHelpStudents" class="assess-dashboard-need-help-item-button"
            ng-click="$ctrl.openNeedHelpStudentStats(student)">
      <div class="assess-dashboard-need-help-students-circle member-circle">
        <img class="member-image" csp-src="{{student.getAvatarUrl()}}"/>
        <div class="assess-dashboard-need-help-pressed-cover"></div>
      </div>
      <span class="assess-dashboard-need-help-students-name-label">{{student.getFullName()}}</span>
    </button>
    <div ng-if="$ctrl.needHelpStudents.length === 0" class="empty-mode">
      <h4>{{ "assess_need_help_empty_mode_title" | translate }}</h4>
    </div>
  </div>

  <div class="assess-dashboard-challenging-sub-header">{{'challenging-questions' | translate}}</div>
  <div class="assess-dashboard-challenging-box">
    <button ng-repeat="question in $ctrl.challengingContent" class="assess-dashboard-challenging-button"
            ng-click="$ctrl.openQuestionStats(question)">
      <div class="assess-dashboard-need-help-question">Q{{question.index}}</div>
    </button>
    <div ng-if="$ctrl.challengingContent.length === 0" class="empty-mode">
      <h4>{{ "assess_challenging_empty_mode_title" | translate }}</h4>
    </div>
  </div>
</div>

<assess-dashboard-students
  students-data="$ctrl.studentsData"
  class="assess-dashboard-students-container"
  open-student-stats="$ctrl.openStudentStats(student)"></assess-dashboard-students>
`;

export class AssessDashboardBottom {
  template = template;
  controller = AssessDashboardBottomController;
  bindings : any = {
    needHelpStudents: '<',
    challengingContent: '<',
    studentsData: '<',
    results: '<',
    questions: '<'
  };
}
