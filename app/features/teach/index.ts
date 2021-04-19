import {SessionStartedState} from './states/sessionStarted';
import {AttendanceStats} from './directives/AttendanceStats';
import {StartSessionButton} from './directives/StartSessionButton';
import {IStateProvider} from 'angular-ui-router';
import {TeachState} from './states/teach';
import {TeachBooksState} from './states/teach.books';
import {TeachReaderState} from './states/teach.reader';
import {SvgReaderState} from '../reader/states/reader.svg';
import {HtmlReaderState} from '../reader/states/reader.html';

export default angular.module('LearniApp.teach', [])
  .config(($stateProvider : IStateProvider) => {
    $stateProvider.state('teach', new TeachState())
      .state('teach.books', new TeachBooksState())
      .state('teach.reader', new TeachReaderState())
      .state('teach.reader.svg', new SvgReaderState())
      .state('teach.reader.html', new HtmlReaderState())
      .state('sessionStarted', new SessionStartedState());
  })
  .component('startSessionButton', new StartSessionButton())
  .component('attendanceStats', new AttendanceStats()).name;
