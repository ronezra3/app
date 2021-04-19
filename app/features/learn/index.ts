import {IStateProvider} from 'angular-ui-router';
import {LearnState} from './states/learn';
import {LearnBooksState} from './states/learn.books';
import {LearnReaderState} from './states/learn.reader';
import {SvgReaderState} from '../reader/states/reader.svg';
import {HtmlReaderState} from '../reader/states/reader.html';
export default angular.module('LearniApp.learn', [])
  .config(($stateProvider : IStateProvider) => {
    $stateProvider.state('learn', new LearnState())
      .state('learn.books', new LearnBooksState())
      .state('learn.reader', new LearnReaderState())
      .state('learn.reader.svg', new SvgReaderState())
      .state('learn.reader.html', new HtmlReaderState());
  }).name;
