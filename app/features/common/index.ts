import {AreYouSureController} from './controllers/AreYouSureController';

import {CircularProgressBar} from './directives/CircularProgressBarDirective';
import {FocusOn} from './directives/FocusDirective';
import {InfiniteScroll} from './directives/InfiniteScrollDirective';
import {IsCorrect} from './directives/IsCorrectDirective';
import {ContentLocation} from './directives/ContentLocation';
import {RepliedNumber} from './directives/RepliedNumberDirective';
import {PinchToZoom} from './directives/PinchToZoom';
import {DestroyWinWebview} from './directives/DestroyWinWebview';

import {PinchToZoomFactory} from './services/PinchToZoom';
import {AppOnTop} from './services/AppOnTop';
import {AppStatus} from './services/AppStatusFactory';
import {BrowserDownloader} from './services/BrowserDownloader';
import {FileSystemUtilitiesService} from './services/FileSystemUtilities';
import {DeviceSleepDeprivation} from './services/DeviceSleepDeprivation';
import {IFrameWrapperFactory} from './services/IFrameWrapper';
import {Localytics} from './services/Localytics';
import {LovefieldProvider, LovefieldWrapper} from './services/Lovefield';
import {MobileDownloader} from './services/MobileDownloader';
import {WindowsDownloaderFactory} from './services/WindowsDownloader';
import {EnvWrapper} from './services/EnvWrapper';
import {WindowFocusEvents} from './services/WindowFocusEvents';
import {LogOut} from '../../3rdparty/common/services/LogOut';

export default angular.module('LearniApp.common', [])
  .controller('AreYouSureController', AreYouSureController)
  .value('StatusUpdateTimeout', 2000)
  .component('circularProgressBar', new CircularProgressBar())
  .directive('focusOn', FocusOn)
  .directive('infiniteScroll', InfiniteScroll)
  .directive('isCorrect', IsCorrect)
  .component('contentLocation', new ContentLocation())
  .component('repliedNumber', new RepliedNumber())
  .directive('pinchToZoom', PinchToZoom)
  .directive('destroyWinWebview', DestroyWinWebview)
  .factory('IFrameWrapper', IFrameWrapperFactory)
  .service('AppOnTop', AppOnTop)
  .service('DeviceSleepDeprivation', DeviceSleepDeprivation)
  .factory('WindowsDownloader', WindowsDownloaderFactory)
  .service('AppStatus', AppStatus)
  .service('WindowFocusEvents', WindowFocusEvents)
  .factory('BrowserDownloader', BrowserDownloader)
  .factory('FileSystemUtilities', FileSystemUtilitiesService)
  .service('Localytics', Localytics)
  .service('MobileDownloader', MobileDownloader)
  .factory('PinchToZoom', PinchToZoomFactory)
  .factory('EnvWrapper', EnvWrapper)
  .provider('lovefield', LovefieldProvider)
  .run((LogOut : LogOut, lovefield : LovefieldWrapper) => LogOut.onLoggingOut(() => lovefield.clear()))
  .name;
