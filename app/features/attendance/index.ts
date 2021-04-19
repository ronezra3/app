import {AttendanceButton} from './AttendanceButton';
import {AttendanceFactory} from './AttendanceFactory';
import {AttendanceManagerFactory} from './AttendanceManager';
import {IStateProvider} from 'angular-ui-router';
import {AttendanceState} from './AttendanceState';

export default angular.module('LearniApp.attendance', [])
  .component('attendanceButton', new AttendanceButton())
  .factory('AttendanceFactory', AttendanceFactory)
  .factory('AttendanceManager', AttendanceManagerFactory)
  .config(($stateProvider : IStateProvider) => $stateProvider.state('attendance', new AttendanceState())).name;
