import {AvatarPicker} from './directives/AvatarPicker';
import {BrowserAvatarPicker} from './directives/BrowserAvatarPicker';
import {CordovaAvatarPicker} from './directives/CordovaAvatarPicker';
import {Registrar} from './services/Registrar';

export default angular.module('Common.login', [])
  .directive('cordovaAvatarPicker', CordovaAvatarPicker)
  .component('avatarPicker', new AvatarPicker())
  .component('browserAvatarPicker', new BrowserAvatarPicker())
  .service('Registrar', Registrar).name;
