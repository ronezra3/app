"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AreYouSureController_1 = require("./controllers/AreYouSureController");
var CircularProgressBarDirective_1 = require("./directives/CircularProgressBarDirective");
var FocusDirective_1 = require("./directives/FocusDirective");
var InfiniteScrollDirective_1 = require("./directives/InfiniteScrollDirective");
var IsCorrectDirective_1 = require("./directives/IsCorrectDirective");
var ContentLocation_1 = require("./directives/ContentLocation");
var RepliedNumberDirective_1 = require("./directives/RepliedNumberDirective");
var PinchToZoom_1 = require("./directives/PinchToZoom");
var DestroyWinWebview_1 = require("./directives/DestroyWinWebview");
var PinchToZoom_2 = require("./services/PinchToZoom");
var AppOnTop_1 = require("./services/AppOnTop");
var AppStatusFactory_1 = require("./services/AppStatusFactory");
var BrowserDownloader_1 = require("./services/BrowserDownloader");
var FileSystemUtilities_1 = require("./services/FileSystemUtilities");
var DeviceSleepDeprivation_1 = require("./services/DeviceSleepDeprivation");
var IFrameWrapper_1 = require("./services/IFrameWrapper");
var Localytics_1 = require("./services/Localytics");
var Lovefield_1 = require("./services/Lovefield");
var MobileDownloader_1 = require("./services/MobileDownloader");
var WindowsDownloader_1 = require("./services/WindowsDownloader");
var EnvWrapper_1 = require("./services/EnvWrapper");
var WindowFocusEvents_1 = require("./services/WindowFocusEvents");
exports.default = angular.module('LearniApp.common', [])
    .controller('AreYouSureController', AreYouSureController_1.AreYouSureController)
    .value('StatusUpdateTimeout', 2000)
    .component('circularProgressBar', new CircularProgressBarDirective_1.CircularProgressBar())
    .directive('focusOn', FocusDirective_1.FocusOn)
    .directive('infiniteScroll', InfiniteScrollDirective_1.InfiniteScroll)
    .directive('isCorrect', IsCorrectDirective_1.IsCorrect)
    .component('contentLocation', new ContentLocation_1.ContentLocation())
    .component('repliedNumber', new RepliedNumberDirective_1.RepliedNumber())
    .directive('pinchToZoom', PinchToZoom_1.PinchToZoom)
    .directive('destroyWinWebview', DestroyWinWebview_1.DestroyWinWebview)
    .factory('IFrameWrapper', IFrameWrapper_1.IFrameWrapperFactory)
    .service('AppOnTop', AppOnTop_1.AppOnTop)
    .service('DeviceSleepDeprivation', DeviceSleepDeprivation_1.DeviceSleepDeprivation)
    .factory('WindowsDownloader', WindowsDownloader_1.WindowsDownloaderFactory)
    .service('AppStatus', AppStatusFactory_1.AppStatus)
    .service('WindowFocusEvents', WindowFocusEvents_1.WindowFocusEvents)
    .factory('BrowserDownloader', BrowserDownloader_1.BrowserDownloader)
    .factory('FileSystemUtilities', FileSystemUtilities_1.FileSystemUtilitiesService)
    .service('Localytics', Localytics_1.Localytics)
    .service('MobileDownloader', MobileDownloader_1.MobileDownloader)
    .factory('PinchToZoom', PinchToZoom_2.PinchToZoomFactory)
    .factory('EnvWrapper', EnvWrapper_1.EnvWrapper)
    .provider('lovefield', Lovefield_1.LovefieldProvider)
    .run(function (LogOut, lovefield) { return LogOut.onLoggingOut(function () { return lovefield.clear(); }); })
    .name;
//# sourceMappingURL=index.js.map