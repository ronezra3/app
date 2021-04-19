import {ReaderController} from '../controllers/ReaderController';
import {IDeviceUtilities} from '../../../3rdparty/common/services/DeviceUtilities';
import {HtmlResolver} from '../services/HtmlResolver';

class HtmlReaderController extends ReaderController {
  /*@ngInject*/
  // constructor(Together, bookInfo, $state, CurrentBook, pageUrl, LastBookPage, isTeacher, CurrentSession,
  //             TogetherEventsRouter, public localUrlPrefix, private DeviceUtilities : IDeviceUtilities) {
  //   super(Together, bookInfo, $state, CurrentBook, pageUrl, LastBookPage, isTeacher, CurrentSession, TogetherEventsRouter);
  // }

  // public isWindows() {
  //   return this.DeviceUtilities.isWindows();
  // }

  protected getDefaultPageUrl() {
    return this.bookInfo.relativeUrl;
  }
}

const template = `
<view class="reader html flex-view" hardware-back-button-enabled="!$ctrl.isControlled()">
  <navigation-bar>
    <left-buttons>
      <back-button ng-hide="$ctrl.isControlled()" on-back="$ctrl.leave()"></back-button>
    </left-buttons>

    <nav-bar-title>
      <div class="title">{{$ctrl.bookInfo.title}}</div>
    </nav-bar-title>

    <right-buttons>
      <hamburger-button></hamburger-button>
    </right-buttons>
  </navigation-bar>

  <reader-drawer ng-show="$ctrl.isTeacher" mode="{{$ctrl.mode}}"></reader-drawer>

  <content scrollable="true">
    <ms-html-content page-url="{{$ctrl.pageUrl}}" ng-if="$ctrl.isWindows()" local-url-prefix="{{$ctrl.localUrlPrefix}}"
      book-info="$ctrl.bookInfo" on-page-change="$ctrl.setPageUrl(pageUrl)"></ms-html-content>
    <default-html-content page-url="{{$ctrl.pageUrl}}" ng-if="!$ctrl.isWindows()" local-url-prefix="{{$ctrl.localUrlPrefix}}"
      book-info="$ctrl.bookInfo" on-page-change="$ctrl.setPageUrl(pageUrl)"></default-html-content>
  </content>
</view>
`;

export class HtmlReaderState {
  controller = HtmlReaderController;
  controllerAs = '$ctrl';
  resolve = new HtmlResolver().get();
  url = '/html';
  template = template;
}
