import {SubmitableResourceWrapper} from '../../activities/services/SubmitableResourceWrapper';
export class SnapshotResourceWrapper extends SubmitableResourceWrapper {
  constructor($resource, ENV, CurrentUser, private lodash) {
    super($resource, ENV, 'snapshots', CurrentUser);
  }

  getSubmitParams () {
    let submitParams : any = super.getSubmitParams();
    submitParams.vote = '@vote';

    return submitParams;
  }

  get() {
    let resource = super.get();
    let lodash = this.lodash;
    resource.prototype.hasSubmitted = function (userId) {
      var userIds = this.getVoters();
      return lodash.some(userIds, function (id) {
        return id === userId;
      });
    };

    resource.prototype.getVoters = function () {
      return lodash.union(this.yes, this.no);
    };

    return resource;
  }
}
