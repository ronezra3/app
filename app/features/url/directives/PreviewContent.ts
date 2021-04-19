export class UrlPreviewContentController {
  activity;

  setPreview(data) {
    this.activity.preview = data;
  }
}

const template = `
<preview-header type="url" field-name="url" activity="$ctrl.activity" form="$ctrl.form">
  <preview-header-input>
  
    <input name="url" class="activity-input-long direction-ltr" type="url" ng-model="$ctrl.activity.actualUrl" ng-required="$ctrl.isRequired"
      ng-class="{'url-input-square-bottom': $ctrl.activity.preview}" autocomplete="off" style="text-align:left;"
      placeholder="{{$ctrl.isRequired ? ('url-placeholder' | translate) : $ctrl.defaultUrl}}"
        http-prefix inaccessible-url inaccessible-url-on-success="$ctrl.setPreview(data)" inaccessible-url-on-error="$ctrl.setPreview(data)"/>
      <!-- <loader ng-show="$ctrl.form.url.$pending.inaccessibleUrl"></loader> -->
    <!-- <url-preview preview="$ctrl.activity.preview" ng-show="$ctrl.activity.preview"></url-preview> -->
  </preview-header-input>
  <preview-header-additional-validators>
    <span class="validation-message-error" ng-show="$ctrl.form.url.$error.url">{{'invalid_url' | translate}}</span>
    <span class="validation-message-error" ng-show="$ctrl.form.url.$error.inaccessibleUrl">{{'url_error_404' | translate}}</span>
  </preview-header-additional-validators>
</preview-header>
`;

export class UrlPreviewContent {
  controller = UrlPreviewContentController;
  template = template;
  bindings : any = {
    activity: '<',
    isRequired: '<',
    form: '<',
    defaultUrl: '<?'
  };
}
