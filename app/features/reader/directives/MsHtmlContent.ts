import {HtmlContentController, DefaultHtmlContent} from './DefaultHtmlContent';
export class MsHtmlContentController extends HtmlContentController {
  $onInit() {
    let webview = this.$element.children()[0];
    let lastSrc = null;
    webview.addEventListener('MSWebViewContentLoading', (e) => {
      if (lastSrc !== null && e.uri !== '') {
        this.$scope.$applyAsync(() =>
          this.pageChange(e.uri));
      }

      lastSrc = e.uri;
    });
  }
}

export class MsHtmlContent extends DefaultHtmlContent {
  template = `<x-ms-webview destroy-win-webview ng-src={{$ctrl.getSceUrl()}}></x-ms-webview>`;
  controller = MsHtmlContentController;
}
