import {IStateProvider} from 'angular-ui-router';
import {PlanState} from './states/plan';
import {PlanBooksState} from './states/plan.books';
import {PlanReaderState} from './states/plan.reader';
import {SvgReaderState} from '../reader/states/reader.svg';
import {HtmlReaderState} from '../reader/states/reader.html';

export default angular.module('LearniApp.plan', [])
  .config(($stateProvider : IStateProvider) => {
    $stateProvider.state('enrich', new PlanState())
      .state('enrich.books', new PlanBooksState())
      .state('enrich.reader', new PlanReaderState())
      .state('enrich.reader.svg', new SvgReaderState())
      .state('enrich.reader.html', new HtmlReaderState());
  }).name;
