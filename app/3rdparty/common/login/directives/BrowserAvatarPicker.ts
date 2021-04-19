/*@ngInject*/
class BrowserAvatarPickerController {
  onAvatarAdded;
  avatarUrl;
  avatar;

  constructor(private ValidationHandler) {

  }

  avatarGetterSetter(avatar) {
    if (avatar) {
      if (avatar.type !== 'image/jpeg') {
        return this.ValidationHandler.handle('bad_image_type');
      }

      this.avatar = avatar;
      this.onAvatarAdded({ avatar: avatar });
    }

    return avatar;
  }
}

const template = `
<drop-box ng-model="$ctrl.avatarGetterSetter" ng-model-options="{getterSetter: true}" ngf-accept="'image/jpeg'" ngf-pattern="'image/jpeg'">
  <div class="login-avatar" ng-click="">
    <div class="image-container">
      <svg-icon class="image" src="$ctrl.avatar" ng-if="$ctrl.avatar"></<svg-icon>
      <img class="image" csp-src="{{$ctrl.avatarUrl}}" ng-if="!$ctrl.avatar">
    </div>
  </div>
</drop-box>
`;

export class BrowserAvatarPicker {
  controller = BrowserAvatarPickerController;
  template = template;
  bindings: any = {
    onAvatarAdded: '&',
    avatarUrl: '<'
  };
}
