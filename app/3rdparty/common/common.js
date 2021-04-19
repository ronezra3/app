"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var modals_1 = require("./modals");
var ClickOnceButtonDirective_1 = require("./directives/ClickOnceButtonDirective");
var CspSrcDirective_1 = require("./directives/CspSrcDirective");
var DropBox_1 = require("./directives/DropBox");
var SearchBoxDirective_1 = require("./directives/SearchBoxDirective");
var SubjectPickerDirective_1 = require("./directives/SubjectPickerDirective");
var SvgIconDirective_1 = require("./directives/SvgIconDirective");
var DialogLink_1 = require("./directives/DialogLink");
var PercentageFilter_1 = require("./filters/PercentageFilter");
var AuthenticationToken_1 = require("./services/AuthenticationToken");
var CssUtilities_1 = require("./services/CssUtilities");
var CurrentUser_1 = require("./services/CurrentUser");
var DeviceUtilities_1 = require("./services/DeviceUtilities");
var HardwareBackButton_1 = require("./services/HardwareBackButton");
var SocketIOFactory_1 = require("./services/SocketIOFactory");
var TokenInterceptor_1 = require("./services/TokenInterceptor");
var Utilities_1 = require("./services/Utilities");
var ValidationHandler_1 = require("./services/ValidationHandler");
var Loader_1 = require("./loader/directives/Loader");
var validateUserPassword_1 = require("./services/validateUserPassword");
var EditProfileController_1 = require("./controllers/EditProfileController");
var UserThumbnail_1 = require("./directives/UserThumbnail");
var AvatarUploader_1 = require("./services/AvatarUploader");
var ngClickDecorator_1 = require("./decorators/ngClickDecorator");
var stateDecoration_1 = require("./decorators/stateDecoration");
var LogOut_1 = require("./services/LogOut");
var innerModules = ['layout', 'storage', 'version-interceptor', 'login', 'state-changed'].map(function (name) { return require("./" + name + "/index").default; });
angular.module('Common', ['ngDialog', 'matchmedia-ng', 'ngLodash', 'mdo-angular-cryptography'].concat(innerModules))
    .value('EventEmitter', function (payload) { return ({ $event: payload }); })
    .config(modals_1.DialogRouterConfig)
    .config(ngClickDecorator_1.NgClickDecorator)
    .config(stateDecoration_1.decorate)
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
    .controller('EditProfileController', EditProfileController_1.EditProfileController)
    .directive('clickOnceButton', ClickOnceButtonDirective_1.ClickOnceButton)
    .directive('cspSrc', CspSrcDirective_1.CspSrc)
    .directive('dropBox', DropBox_1.DropBox)
    .directive('searchBox', SearchBoxDirective_1.SearchBox)
    .component('subjectPicker', new SubjectPickerDirective_1.SubjectPicker())
    .directive('svgIcon', SvgIconDirective_1.SvgIcon)
    .directive('loader', Loader_1.Loader)
    .component('userThumbnail', new UserThumbnail_1.UserThumbnail())
    .component('dialogLink', new DialogLink_1.DialogLink())
    .filter('percentage', PercentageFilter_1.PercentageFilter)
    .provider('Utilities', Utilities_1.UtilitiesProvider)
    .provider('DeviceUtilities', DeviceUtilities_1.DeviceUtilitiesProvider)
    .factory('validateUserPassword', validateUserPassword_1.validateUserPassword)
    .service('AvatarUploader', AvatarUploader_1.AvatarUploader)
    .factory('AuthenticationToken', AuthenticationToken_1.AuthenticationToken)
    .factory('CssUtilities', CssUtilities_1.CssUtilities)
    .service('CurrentUser', CurrentUser_1.CurrentUser)
    .factory('HardwareBackButton', HardwareBackButton_1.HardwareBackButton)
    .factory('SocketIO', SocketIOFactory_1.SocketIO)
    .service('TokenInterceptor', TokenInterceptor_1.TokenInterceptor)
    .service('ValidationHandler', ValidationHandler_1.ValidationHandler)
    .service('LogOut', LogOut_1.LogOut)
    .run(function (LogOut, CurrentUser, $state, ValidationHandler) {
    return LogOut.onLoggedOut(function (event, error) {
        $state.clearHistory();
        CurrentUser.remove();
        if (error) {
            ValidationHandler.handle(error);
        }
    });
});
//# sourceMappingURL=common.js.map