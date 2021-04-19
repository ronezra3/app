import {BackButton} from './directives/BackButton';
import {Content} from './directives/Content';
import {HamburgerButton} from './directives/HamburgerButton';
import {NavigationBar} from './directives/NavigationBar';
import {SideBar} from './directives/SideBar';
import {SideBars} from './directives/SideBars';
import {View} from './directives/View';
import {Checkbox} from './directives/Checkbox';
import {MatchMediaWrapper} from './services/MatchMediaWrapper';
import {NgDialogRouterProvider, IDialogRouter} from './services/NgDialogRouter';
import {Popup} from './services/Popup';
import {LogOut} from '../services/LogOut';

export default angular.module('Common.layout', [])
  .value('LayoutValues', {
    // iPad resolution - 1
    'miniTablet': {
      width: 747,
      height: 1003
    },
    // iPhone6Plus resolution + 1
    'phone': {
      width: 415,
      height: 737
    }
  })
  .component('backButton', new BackButton())
  .directive('content', Content)
  .component('hamburgerButton', new HamburgerButton())
  .component('navigationBar', new NavigationBar())
  .component('checkbox', new Checkbox())
  .directive('sideBar', SideBar)
  .component('sideBars', new SideBars())
  .directive('view', View)
  .provider('ngDialogRouter', NgDialogRouterProvider)
  .service('MatchMediaWrapper', MatchMediaWrapper)
  .factory('Popup', Popup)
  .run((LogOut : LogOut, ngDialogRouter : IDialogRouter) => LogOut.onLoggingOut(() => ngDialogRouter.closeAll()))
  .name;
