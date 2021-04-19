"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChromeAppBrowser = require("./controllers/ChromeAppBrowser");
var Url_1 = require("./services/Url");
var InAppBrowser_1 = require("./services/InAppBrowser");
var EmbeddedPhoto_1 = require("./directives/EmbeddedPhoto");
var EmbeddedUrl_1 = require("./directives/EmbeddedUrl");
var EmbeddedVideo_1 = require("./directives/EmbeddedVideo");
var EmbeddedBrowser_1 = require("./directives/EmbeddedBrowser");
var SubmitButton_1 = require("./directives/SubmitButton");
var HttpPrefix_1 = require("./directives/HttpPrefix");
var LinkPreview_1 = require("./directives/LinkPreview");
var Preview_1 = require("./directives/Preview");
var InaccessibleUrlValidation_1 = require("./directives/InaccessibleUrlValidation");
var UrlPlayController_1 = require("./controllers/UrlPlayController");
var PreviewContent_1 = require("./directives/PreviewContent");
var preview_1 = require("./controllers/preview");
var ResultsContent_1 = require("./directives/ResultsContent");
var TeachResultsFooter_1 = require("./directives/TeachResultsFooter");
exports.default = angular.module('LearniApp.url', [])
    .config(function ($cordovaInAppBrowserProvider, ngDialogRouterProvider) {
    $cordovaInAppBrowserProvider.setDefaultOptions({
        location: 'no',
        hardwareback: 'no'
    });
    ngDialogRouterProvider.state(ChromeAppBrowser.ChromeAppBrowserPath, new ChromeAppBrowser.ChromeAppBrowserState());
})
    .controller('UrlTeachPreviewController', preview_1.UrlPreviewController)
    .controller('UrlEnrichPreviewController', preview_1.UrlPreviewController)
    .controller('UrlPlayController', UrlPlayController_1.UrlPlayController)
    .factory('Url', Url_1.Url)
    .service('InAppBrowser', InAppBrowser_1.InAppBrowser)
    .component('embeddedPhoto', new EmbeddedPhoto_1.EmbeddedPhoto())
    .component('urlTeachResultsFooter', new TeachResultsFooter_1.UrlTeachResultsFooter())
    .component('embeddedUrl', new EmbeddedUrl_1.EmbeddedUrl())
    .component('embeddedVideo', new EmbeddedVideo_1.EmbeddedVideoComponent())
    .component('linkPreview', new LinkPreview_1.LinkPreview())
    .component('submitButton', new SubmitButton_1.UrlSubmitButton())
    .component('embeddedBrowser', new EmbeddedBrowser_1.EmbeddedBrowser())
    .component('urlPreviewContent', new PreviewContent_1.UrlPreviewContent())
    .component('urlResultsContent', new ResultsContent_1.UrlResultsContent())
    .component('urlPreview', new Preview_1.UrlPreview())
    .directive('inaccessibleUrl', InaccessibleUrlValidation_1.inaccessibleUrl)
    .directive('httpPrefix', HttpPrefix_1.httpPrefix).name;
//# sourceMappingURL=index.js.map