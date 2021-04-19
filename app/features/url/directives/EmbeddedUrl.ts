export class UrlResultsContentController {
  preview;
  count = 0;

  next() {
    this.count++;
  }
  prev() {
    this.count--;
  }
  canNext() {
    return this.count < (this.preview.urls.length - 1);
  }
  canPrev() {
    return this.count > 0;
  }
}

const template = `
    <div ng-switch="$ctrl.preview.urls[$ctrl.count].preview.type" ng-if="$ctrl.preview.urls[$ctrl.count].preview">
      <embedded-browser ng-switch-default preview="$ctrl.preview.urls[$ctrl.count]"></embedded-browser>
      <embedded-video ng-switch-when="video" preview="$ctrl.preview.urls[$ctrl.count].preview"></embedded-video>
      <embedded-photo ng-switch-when="photo" preview="$ctrl.preview.urls[$ctrl.count].preview"></embedded-photo>
    </div>
    <button class="url-prev" ng-click="$ctrl.prev()" ng-class="{'hidden' : !$ctrl.canPrev()}" ng-disabled="!$ctrl.canPrev()"><</button>
    <span class="url-num" ng-repeat="url in $ctrl.preview.urls" ng-class="{'active' : $ctrl.count==$index}">{{$index+1}} </span>
    <button class="url-next" ng-click="$ctrl.next()" ng-class="{'hidden' : !$ctrl.canNext()}" ng-disabled="!$ctrl.canNext()">></button>
    <div ng-if="$ctrl.preview.urls[$ctrl.count].activity">
    {{$ctrl.preview.urls[$ctrl.count].activity.header}}
    </div>

`;

export class EmbeddedUrl {
  controller = UrlResultsContentController;
  template = template;
  bindings: any = {
    preview: '<'
  };
}




