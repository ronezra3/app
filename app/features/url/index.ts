import {NgDialogRouterProvider} from '../../3rdparty/common/layout/services/NgDialogRouter';

import * as ChromeAppBrowser from './controllers/ChromeAppBrowser';

import {Url} from './services/Url';
import {InAppBrowser} from './services/InAppBrowser';

import {EmbeddedPhoto} from './directives/EmbeddedPhoto';
import {EmbeddedUrl} from './directives/EmbeddedUrl';
import {EmbeddedVideoComponent} from './directives/EmbeddedVideo';
import {EmbeddedBrowser} from './directives/EmbeddedBrowser';
import {UrlSubmitButton} from './directives/SubmitButton';
import {httpPrefix} from './directives/HttpPrefix';
import {LinkPreview} from './directives/LinkPreview';
import {UrlPreview} from './directives/Preview';
import {inaccessibleUrl} from './directives/InaccessibleUrlValidation';
import {UrlPlayController} from './controllers/UrlPlayController';
import {UrlPlayIntro} from './controllers/PlayIntro';

import {UrlPreviewContent} from './directives/PreviewContent';
import {UrlPreviewController} from './controllers/preview';
import {UrlResultsContent} from './directives/ResultsContent';
import {UrlTeachResultsFooter} from './directives/TeachResultsFooter';
import {} from './directives/ResultsContent';

export default angular.module('LearniApp.url', [])
  .value('UrlValues', {
    maxFileSize: "5MB",
    allowedFormats: "image/*"
  })
  .config(($cordovaInAppBrowserProvider : any, ngDialogRouterProvider : NgDialogRouterProvider) => {
    $cordovaInAppBrowserProvider.setDefaultOptions({
      location: 'no',
      hardwareback: 'no'
    });

    ngDialogRouterProvider.state(ChromeAppBrowser.ChromeAppBrowserPath, new ChromeAppBrowser.ChromeAppBrowserState());
    ngDialogRouterProvider.state('url.play.intro', new UrlPlayIntro());
  })
  .controller('UrlTeachPreviewController', UrlPreviewController)
  .controller('UrlEnrichPreviewController', UrlPreviewController)
  .controller('UrlPlayController', UrlPlayController)
  .factory('Url', Url)
  .service('InAppBrowser', InAppBrowser)
  .component('embeddedPhoto', new EmbeddedPhoto())
  .component('urlTeachResultsFooter', new UrlTeachResultsFooter())
  .component('embeddedUrl', new EmbeddedUrl())
  .component('embeddedVideo', new EmbeddedVideoComponent())
  .component('linkPreview', new LinkPreview())
  .component('submitButton', new UrlSubmitButton())
  .component('embeddedBrowser', new EmbeddedBrowser())
  .component('urlPreviewContent', new UrlPreviewContent())
  .component('urlResultsContent', new UrlResultsContent())
  .component('urlPreview', new UrlPreview())
  .directive('inaccessibleUrl', inaccessibleUrl)
  .directive('httpPrefix', httpPrefix).name;





