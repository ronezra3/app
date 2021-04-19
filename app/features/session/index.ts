import {SessionReportController, SessionReportState} from './controllers/SessionReportController';
import {AssessSessionReport} from './directives/AssessSessionReportDirective';
import {IdeasSessionReport} from './directives/IdeasSessionReportDirective';
import {PollSessionReport} from './directives/PollSessionReportDirective';
import {SessionReportBookLocationComponent} from './directives/SessionReportBookLocationDirective';
import {SessionReportSection} from './directives/SessionReportSectionDirective';
import {SnapshotSessionReport} from './directives/SnapshotSessionReportDirective';
import {StudentSessionButtonComponent} from './directives/StudentSessionButton';
import {TeacherSessionButton} from './directives/TeacherSessionButtonDirective';
import {CurrentSession} from './services/CurrentSession';
import {SessionProxy} from './services/SessionProxy';
import {StudentSessionMediator} from './services/StudentSessionMediator';
import {TeacherSessionMediator} from './services/TeacherSessionMediator';
import {StudentSessionService} from './services/StudentSessionService';
import {IStateProvider} from 'angular-ui-router';

let dependencies : any = ['session-join-popup', 'join-button'].map(name => require(`./${name}/index`).default);

export default angular.module('LearniApp.session', dependencies)
  .value('SessionReportValues', {
    reportedActivitiesTypes: ['assess', 'ideas', 'poll', 'snapshot']
  })
  .config(($stateProvider : IStateProvider) => $stateProvider.state('report', new SessionReportState()))
  .controller('SessionReportController', SessionReportController)
  .directive('assessSessionReport', AssessSessionReport)
  .directive('ideasSessionReport', IdeasSessionReport)
  .directive('pollSessionReport', PollSessionReport)
  .component('sessionReportBookLocation', new SessionReportBookLocationComponent())
  .directive('sessionReportSection', SessionReportSection)
  .directive('snapshotSessionReport', SnapshotSessionReport)
  .component('studentSessionButton', new StudentSessionButtonComponent())
  .component('teacherSessionButton', new TeacherSessionButton())
  .service('CurrentSession', CurrentSession)
  .service('StudentSessionService', StudentSessionService)
  .service('SessionProxy', SessionProxy)
  .service('StudentSessionMediator', StudentSessionMediator)
  .service('TeacherSessionMediator', TeacherSessionMediator).name;
