import {Utilities} from './Utilities';
import IQService = angular.IQService;
import IPromise = angular.IPromise;

/*@ngInject*/
export class AvatarUploader {
  constructor(private EnvWrapper, private Upload, private Utilities : Utilities, private $q : IQService) {
  }

  upload(avatar) : IPromise<any> {
    return this.fromFile(avatar);
    
    // if (this.isString(avatar)) {
    //   let resizedAvatar = avatar;// this.Utilities.imgResize(`data:image/jpeg;base64,${avatar}`, 512, 512, 'image/jpeg');
    //   return this.fromFile(resizedAvatar);
    // }

    // let deferred = this.$q.defer();
    // let reader = new FileReader();
    // reader.readAsDataURL(avatar);
    // reader.addEventListener('load', () => {
    //   let resizedAvatar = this.Utilities.imgResize(reader.result, 512, 512, 'image/jpeg');
    //   this.fromFile(resizedAvatar).then(deferred.resolve).catch(deferred.reject);
    // });

    // return deferred.promise;
  }

  private fromFile(file) {
    return this.Upload.upload({url: `${this.EnvWrapper.getLmsEndpoint()}/avatars`, method: 'POST', file: file});
  }

  private isString(avatar) {
    return typeof avatar === 'string' || avatar instanceof String;
  }
}
