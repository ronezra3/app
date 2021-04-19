import {CurrentUser} from '../services/CurrentUser';
import {IDialogRouter} from '../layout/services/NgDialogRouter';
import IQService = angular.IQService;
import {Registrar} from '../login/services/Registrar';

export class EditProfileController {
  user;
  selectedAvatar;

  /*@ngInject*/
  constructor(private CurrentUser : CurrentUser, private ngDialogRouter : IDialogRouter, UsersProxy,
              private Registrar : Registrar, private validateUserPassword, private $q : IQService) {
    this.user = new UsersProxy(CurrentUser.get());
  }

  onAvatarAdded(avatar) {
    this.selectedAvatar = avatar;
  }

  validate() {
    if (!(this.user.firstName && this.user.lastName)) {
      return 'missing_register_details';
    }

    var isChangingPassword = Boolean(this.user.oldPassword || this.user.newPassword || this.user.confirmedPassword);

    if (isChangingPassword) {

      var allPasswordFieldsPresent = this.user.oldPassword && this.user.newPassword && this.user.confirmedPassword;
      if (!allPasswordFieldsPresent) {
        return 'missing_register_details';
      }

      var passwordValidationError = this.validateUserPassword(this.user.newPassword, this.user.confirmedPassword);
      if (passwordValidationError) {
        return passwordValidationError;
      }
    }

    return null;
  }

  save() {
    if (!this.user.oldPassword) {
      return this.updateUser();
    }

    return this.user.$confirmPassword()
      .then((confirmation) => confirmation['isOldPasswordConfirmed'] ? this.updateUser() : this.$q.reject('not_old_password'));
  }

  close() {
    this.ngDialogRouter.close('editProfile');
  }

  private updateUser() {
    return this.Registrar.update(this.user, this.selectedAvatar)
      .then(() => this.close());
  }
}
