import {ReaderResolver} from '../../reader/services/Resolver';
import {ReaderController} from '../controllers/ReaderController';

class SvgReaderController extends ReaderController {
  
  checkUrl() {
    var urlObj = super.getLocation();
    return urlObj.$$path.includes('enrich')

  }

  getclassCode() {
    var urlObj = super.getLocation();
    const startIndex = urlObj.$$path.indexOf('/2/');
    const lastIndex = urlObj.$$path.indexOf('/svg');
    if (startIndex !== -1 && lastIndex !== -1) {
      return urlObj.$$path.substring(startIndex + "/2/".length, lastIndex).toUpperCase();
    }
    else  {
      return "";
    }
  }

  canNext() {
    return this.pageUrl < this.bookInfo.numberOfPages && !this.isControlled();
  }

  next() {
    this.setPageUrl(this.pageUrl + 1);
  }

  canPrev() {
    return this.pageUrl > 1 && !this.isControlled();
  }

  prev() {
    this.setPageUrl(this.pageUrl - 1);
  }

  protected getDefaultPageUrl() {
    return 1;
  }

  public setPageUrl(pageUrl) {
    super.setPageUrl(parseInt(pageUrl));
  }

  comparePages(v1, v2) {
    return parseInt(v1.value) > parseInt(v2.value) ? 1 : -1;
  }
}

const template = `
<view class="reader svg flex-view" hardware-back-button-enabled="!$ctrl.isControlled()">
  <navigation-bar>
    <left-buttons>
    <back-button ng-show="$ctrl.checkUrl()"></back-button>   

    </left-buttons>

      <nav-bar-title>
      <div class="extended-title" style="margin-right: 0.438rem;margin-left:0" ng-show="$ctrl.isTeacher">
      <ng-include class="clock" src="'images/manage/lock_icon.png'"></ng-include>
      <span>{{ $ctrl.getclassCode()}}</span>
    </div>
      <div class="title">{{$ctrl.bookInfo.title | translate}}</div>
      <goto-page number-of-pages="$ctrl.bookInfo.numberOfPages" set-page="$ctrl.setPageUrl(page)"
                  page-number="$ctrl.pageUrl" is-disabled="$ctrl.isControlled()"></goto-page>
    </nav-bar-title>

    <right-buttons style="min-width:0px">
      <hamburger-button></hamburger-button>
    </right-buttons>
  </navigation-bar>

  <reader-drawer ng-show="$ctrl.isTeacher" mode="{{$ctrl.mode}}" compare-pages="$ctrl.comparePages"></reader-drawer>

  <content scrollable="true">
    <svg-object page-url="$ctrl.pageUrl" book-info="$ctrl.bookInfo"></svg-object>
  </content>

  <footer>
    <button class="prev" ng-click="$ctrl.prev()" ng-show="$ctrl.canPrev()">
      <ng-include src="'images/reader/flip_page_icon.png'"></ng-include>
    </button>
    <button class="next" ng-click="$ctrl.next()" ng-show="$ctrl.canNext()">
      <ng-include src="'images/reader/flip_page_icon.png'"></ng-include>
    </button>
  </footer>
</view>
`;

export class SvgReaderState {
  controller = SvgReaderController;
  controllerAs = '$ctrl';
  resolve = new ReaderResolver().get();
  url = '/svg';
  template = template;
}
