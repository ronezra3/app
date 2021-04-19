import { DialogRouterConfig } from './modals';

import { ClickOnceButton } from './directives/ClickOnceButtonDirective';
import { CspSrc } from './directives/CspSrcDirective';
import { DropBox } from './directives/DropBox';
import { SearchBox } from './directives/SearchBoxDirective';
import { SubjectPicker } from './directives/SubjectPickerDirective';
import { SvgIcon } from './directives/SvgIconDirective';
import { DialogLink } from './directives/DialogLink';

import { PercentageFilter } from './filters/PercentageFilter';

import { AuthenticationToken } from './services/AuthenticationToken';
import { CssUtilities } from './services/CssUtilities';
import { CurrentUser } from './services/CurrentUser';
import { DeviceUtilitiesProvider } from './services/DeviceUtilities';
import { HardwareBackButton } from './services/HardwareBackButton';
import { SocketIO } from './services/SocketIOFactory';
import { TokenInterceptor } from './services/TokenInterceptor';
import { UtilitiesProvider } from './services/Utilities';
import { ValidationHandler } from './services/ValidationHandler';
import { Loader } from './loader/directives/Loader';
import { validateUserPassword } from './services/validateUserPassword';
import { EditProfileController } from './controllers/EditProfileController';
import { UserThumbnail } from './directives/UserThumbnail';
import { AvatarUploader } from './services/AvatarUploader';

import { NgClickDecorator } from './decorators/ngClickDecorator';
import { decorate } from './decorators/stateDecoration';
import { IStateServiceExtended } from './decorators/StateDecorator';
import { LogOut } from './services/LogOut';

let innerModules: any = ['layout', 'storage', 'version-interceptor', 'login', 'state-changed'].map(name => require(`./${name}/index`).default);

angular.module('Common', ['ngDialog', 'matchmedia-ng', 'ngLodash', 'mdo-angular-cryptography'].concat(innerModules))
  .value('EventEmitter', payload => ({ $event: payload }))
  .config(DialogRouterConfig)
  .config(NgClickDecorator)
  .config(decorate)
  .config(
    /*@ngInject*/
    function ($httpProvider) {
      $httpProvider.interceptors.push('TokenInterceptor');
    })
  .value('RegExpValidations', {
    'invalidCharacters': /[^\x00-\x7F]+/,
    'minLengthAndNoSpaces': /^\S{6,}$/,
    'oneLetter': /^(.*?[A-Za-z]){1}/,
    'englishOrNumbers': /^[A-Za-z][A-Za-z0-9]*$/
  })
  .value('StorageConfig', {
    'thumbnailFolder': 'thumbnails',
    'contentFolder': 'content',
    'avatarsFolder': 'avatars'
  })
  .controller('EditProfileController', EditProfileController)
  .directive('clickOnceButton', ClickOnceButton)
  .directive('cspSrc', CspSrc)
  .directive('dropBox', DropBox)
  .directive('searchBox', SearchBox)
  .component('subjectPicker', new SubjectPicker())
  .directive('svgIcon', SvgIcon)
  .directive('loader', Loader)
  .component('userThumbnail', new UserThumbnail())
  .component('dialogLink', new DialogLink())
  .filter('percentage', PercentageFilter)
  .provider('Utilities', UtilitiesProvider)
  .provider('DeviceUtilities', DeviceUtilitiesProvider)
  .factory('validateUserPassword', validateUserPassword)
  .factory("$exceptionHandler", function ($injector) {
    return function (exception, cause) {
      
      console.error(exception)
      if (true || process.env.isOffline) return;

      var $http = $injector.get("$http");
      $http.post(process.env.apiEndpoint+'/logs', {
        clientException: JSON.stringify(exception.stack)
      });
    };
  })
  .service('AvatarUploader', AvatarUploader)
  .factory('AuthenticationToken', AuthenticationToken)
  .factory('CssUtilities', CssUtilities)
  .service('CurrentUser', CurrentUser)
  .factory('HardwareBackButton', HardwareBackButton)
  .factory('SocketIO', SocketIO)
  .service('TokenInterceptor', TokenInterceptor)
  .service('ValidationHandler', ValidationHandler)
  .service('LogOut', LogOut)
  .run((LogOut: LogOut, CurrentUser: CurrentUser, $state: IStateServiceExtended, ValidationHandler: ValidationHandler) =>
    LogOut.onLoggedOut((event, error) => {
      $state.clearHistory();
      CurrentUser.remove();

      if (error) {
        ValidationHandler.handle(error);
      }
    })
  );
