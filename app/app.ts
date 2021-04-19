const MODULES = ['config', 'pascalprecht.translate', 'ngCordova', 'ngResource', 'angularMoment', 'ui.router',
  'ngTouch', 'angular-carousel', 'ngAnimate', 'Common', 'ngFileUpload', 'angularLoad', 'RC4', 'angular-loading-bar'];

const FEATURES_NAMES = ['activities', 'reader', 'login', 'session', 'assess', 'class',
  'manage', 'session-reports', 'together', 'assess-builder', 'classes', 'participant', 'snapshot', 'url',
  'attention', 'common', 'plan', 'panel', 'users', 'books', 'ideas', 'story', 'poll', 'teach', 'learn', 'attendance'];

import {Run} from './init/Run';
// import {IndexedDBConfig} from './init/IndexedDB';
import {ModalsConfig} from './init/Modals';
import {StatesConfig} from './init/States';
import {MiscConfig} from './init/MiscConfig';
import {WindowsConfig} from './init/WindowsConfig';

let getModule : (string) => any = feature => require(`./features/${feature}/index`).default;

angular.module('LearniApp', MODULES.concat(FEATURES_NAMES.map(getModule)))
  .run(Run)
  // .config(IndexedDBConfig)
  .config(ModalsConfig)
  .config(StatesConfig)
  .config(MiscConfig)
  .config(WindowsConfig);
