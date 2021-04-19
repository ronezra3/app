const template = `
<div class="assess-session-report-title">{{assess.title || 'default-assess-title' | translate}}</div>
<div class="assess-session-average-grade">{{'average-grade' | translate}} {{getAverageGrade(assess) | percentage:0}}
</div>

<session-report-book-location class="assess-session-report-book-location" ng-if="assess.bookInfo"
                              book="assess.bookInfo.book" pages="[assess.bookInfo.pageNumber]">
</session-report-book-location>

<button class="assess-session-report-toggle-button"  ui-sref="assess-session-report({activityId: assess.id, classId: classId})" ng-click="">
  <span>{{'full-report' | translate}}</span>
</button>
`;

/*@ngInject*/
export function AssessSessionReport(StudentAssess) {
  return {
    link: link,
    restrict: 'E',
    scope: {
      assess: '=activity',
      classId: '='
    },
    template: template
  };

  function link(scope, element, attrs) {
    var studentsAssessments = null;

    if (scope.assess) {
      studentsAssessments = StudentAssess.query({ids: [scope.assess.id]});
    }

    scope.getAverageGrade = function (assess) {
      if (studentsAssessments !== null) {
        return assess.getAverageGrade(studentsAssessments);
      }
    };
  }
}
