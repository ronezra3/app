import { AvatarUploader } from '../../services/AvatarUploader';
import IQService = angular.IQService;
import { Localytics } from '../../../../features/common/services/Localytics';
import { CurrentUser } from '../../services/CurrentUser';

export class Registrar {
  /*@ngInject*/
  constructor(private AvatarUploader: AvatarUploader, private $q: IQService, private Localytics: Localytics,
    private CurrentUser: CurrentUser, private AuthenticationToken) {
  }

  register(avatar, user) {
    if (avatar) {
      return this.uploadAvatar(avatar)
        .then(({ data: { public_id } }) => this.registerUser(user, public_id));
    }
    else {
      return this.registerUser(user, 3);
    }

  }

  update(modifiedUser, avatar?) {
    if (!avatar) {
      return this.updateUser(modifiedUser);
    }

    return this.uploadAvatar(avatar)
      .then(({ data: { public_id } }) => {
        modifiedUser.avatarId = public_id;
        return this.updateUser(modifiedUser);
      });
  }

  private uploadAvatar(avatar) {
    return this.AvatarUploader.upload(avatar)
      .then((uploadedAvatar: any) => {
        // TODO: check if user.$save returned an error and cache uploadedAvatar

        if (uploadedAvatar.status !== 200) {
          // TODO: handle this more gracefully (let users upload avatar later...)
          return this.$q.reject('cannot_upload_avatar');
        }

        return uploadedAvatar;
      });
  }

  private updateUser(modified) {
    return modified.$save()
      .then((user) => {
        let currentUser = JSON.parse(localStorage.getItem("currentUser"))//this.CurrentUser.get();
        angular.extend(currentUser, user);
        this.CurrentUser.set(currentUser);
      });
  }

  private registerUser(user, avatarPublicId) {
    user.userName = user.userName.toLowerCase();
    user.avatarId = avatarPublicId;

    return user.$save()
      .then((user) => {
        this.Localytics.tagEvent('User Registered');
        this.CurrentUser.set(user);
        this.AuthenticationToken.set(user.token);
      })
      .catch((exception: any) => {
        switch (exception.status) {
          case 406:
            return;
          case 409:
            return this.$q.reject('user_already_exists');
          default:
            return this.$q.reject('backand_generic_error');
        }
      });
  }
}
