import {IDeviceUtilities} from '../../services/DeviceUtilities';
class AvatarPickerController {
  isCordova;

  /*@ngInject*/
  constructor(DeviceUtilities : IDeviceUtilities) {
    this.isCordova = DeviceUtilities.isCordovaSupported();
  }
}

const template = `
  <browser-avatar-picker ng-if="!$ctrl.isCordova" on-avatar-added="$ctrl.onAvatarAdded({avatar: avatar})"
  avatar-url="$ctrl.avatarUrl"></browser-avatar-picker>
  <cordova-avatar-picker ng-if="$ctrl.isCordova" on-avatar-added="$ctrl.onAvatarAdded({avatar: avatar})"
  avatar-url="$ctrl.avatarUrl"></cordova-avatar-picker>
`;

export class AvatarPicker {
  controller = AvatarPickerController;
  template = template;
  bindings : any = {
    onAvatarAdded: '&',
    avatarUrl: '<'
  };
}
