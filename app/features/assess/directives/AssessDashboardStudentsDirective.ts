export function AssessDashboardStudents() {
  return {
    restrict: 'E',
    template: require('./../templates/AssessDashboardStudents.html'),
    controller: controller,
    controllerAs: 'ctrl',
    scope: {},
    bindToController: {
      studentsData: '=',
      openStudentStats: '&'
    }
  };

  function controller() {
    var ctrl = this;
    ctrl.setStudentsFilter = function (newStudentsFilter) {
      ctrl.studentsFilter = newStudentsFilter;
    };

    ctrl.getVisibleStudents = function () {
      var result;
      switch (ctrl.studentsFilter) {
        case 'working':
          result = ctrl.studentsData.working;
          break;
        case 'almost':
          result = ctrl.studentsData.almost;
          break;
        case 'finished':
          result = ctrl.studentsData.finished;
          break;
      }

      return result;
    };

    ctrl.setStudentsFilter('working');
  }
}
