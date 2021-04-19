"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MODULES = ['config', 'pascalprecht.translate', 'ngCordova', 'ngResource', 'angularMoment', 'ui.router',
    'ngTouch', 'angular-carousel', 'ngAnimate', 'Common', 'ngFileUpload', 'angularLoad', 'RC4', 'angular-loading-bar'];
var FEATURES_NAMES = ['activities', 'reader', 'login', 'session', 'assess', 'class',
    'manage', 'session-reports', 'together', 'assess-builder', 'classes', 'participant', 'snapshot', 'url',
    'attention', 'common', 'plan', 'panel', 'users', 'books', 'ideas', 'poll', 'teach', 'learn', 'attendance'];
var Run_1 = require("./init/Run");
// import {IndexedDBConfig} from './init/IndexedDB';
var Modals_1 = require("./init/Modals");
var States_1 = require("./init/States");
var MiscConfig_1 = require("./init/MiscConfig");
var WindowsConfig_1 = require("./init/WindowsConfig");
var getModule = function (feature) { return require("./features/" + feature + "/index").default; };
angular.module('LearniApp', MODULES.concat(FEATURES_NAMES.map(getModule)))
    .run(Run_1.Run)
    // .config(IndexedDBConfig)
    .config(Modals_1.ModalsConfig)
    .config(States_1.StatesConfig)
    .config(MiscConfig_1.MiscConfig)
    .config(WindowsConfig_1.WindowsConfig);
//# sourceMappingURL=app.js.map