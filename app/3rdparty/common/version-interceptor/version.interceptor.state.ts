const template = `
<view>
  <content class="insufficient-version">
    <ng-include class="validation-icon" src="'3rdparty/common/images/alert.png'"></ng-include>
    <p class="validation-error-message">{{'insufficient_client_version' | translate}}</p>
  </content>
</view>
`;

export class VersionInterceptorState {
  url = '/insufficient-version';
  template = template;
}
