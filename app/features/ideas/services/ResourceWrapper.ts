import {SubmitableResourceWrapper} from '../../activities/services/SubmitableResourceWrapper';
export class IdeasResourceWrapper extends SubmitableResourceWrapper {
  constructor($resource, ENV, CurrentUser, private lodash) {
    super($resource, ENV, 'ideas', CurrentUser);
  }

  get() {
    let resource = super.get();
    let lodash = this.lodash;

    resource.prototype.hasSubmitted = function (userId) {
      return lodash.some(this.associations, {userId: userId});
    };

    return resource;
  }
}
