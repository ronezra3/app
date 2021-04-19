import {SubmitableResourceWrapper} from '../../activities/services/SubmitableResourceWrapper';
export class PollResourceWrapper extends SubmitableResourceWrapper {
  constructor($resource, ENV, CurrentUser, private lodash) {
    super($resource, ENV, 'polls', CurrentUser);
  }

  getSubmitParams() {
    let submitParams : any = super.getSubmitParams();
    submitParams.answerId = '@answerId';

    return submitParams;
  }

  get() {
    let resource = super.get();
    let lodash = this.lodash;

    resource.prototype.getVoters = function () {
      var voters = [];
      lodash.each(this.answers, (answer : any) => {
        if (angular.isDefined(answer.voters)) {
          voters = voters.concat(answer.voters);
        }
      });

      return voters;
    };

    resource.prototype.hasSubmitted = function (userId) {
      var userIds = this.getVoters();
      return lodash.some(userIds, (id) => {
        return id === userId;
      });
    };

    return resource;
  }
}
