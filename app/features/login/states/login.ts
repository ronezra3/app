const template = `
<view class="login">
  <content scrollable="true">
    <ui-view></ui-view>
  </content>
</view>
`;
//
export class LoginState {
  url = '/login';
  abstract = true;
  template = template;
}
