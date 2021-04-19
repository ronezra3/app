"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*@ngInject*/
function DialogRouterConfig(ngDialogProvider, ngDialogRouterProvider) {
    ngDialogProvider.setDefaults({
        showClose: false,
        closeByDocument: false,
        closeByEscape: true,
        className: 'ngdialog-theme-default live-rhino'
    });
    ngDialogRouterProvider.state('validationMassage', {
        template: require('./templates/validation-modal.html'),
    })
        .state('editProfile', {
        template: require('./templates/edit-profile.html'),
        controller: 'EditProfileController',
        controllerAs: '$ctrl',
        appendClassName: 'edit-profile'
    });
}
exports.DialogRouterConfig = DialogRouterConfig;
//# sourceMappingURL=modals.js.map