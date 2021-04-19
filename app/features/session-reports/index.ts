import {SessionReportsController} from './controllers/SessionReportsController';
import {SessionReportItem} from './directives/SessionReportItemDirective';
import {SessionReportsScroll} from './directives/SessionReportsScrollDirective';
import {TimePickerContainer} from './directives/TimePickerContainerDirective';

export default angular.module('LearniApp.session-reports', [])
  .value('SessionReportsValues', {
    reportsBulkSize: 10
  })
  .controller('SessionReportsController', SessionReportsController)
  .directive('sessionReportItem', SessionReportItem)
  .directive('sessionReportsScroll', SessionReportsScroll)
  .directive('timePickerContainer', TimePickerContainer).name;

