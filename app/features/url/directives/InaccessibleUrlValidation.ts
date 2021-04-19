import {IURLResource} from '../services/Url';
import LoDashStatic = _.LoDashStatic;
import IQService = angular.IQService;
import IPromise = angular.IPromise;

export function inaccessibleUrl() {
  class InaccessibleUrl {
    public onSuccess : (data) => void;
    public onError : () => void;

    /*@ngInject*/
    constructor(private Url : IURLResource, private $q : IQService) {
    }

    preview(url : string) : IPromise<any> {
      if (!url) {
        return this.$q.resolve();
      }
      // return this.$q.resolve()
      //   .then((preview) => {
      //     this.onSuccess({data: {
      //       url : url,
      //       type: 'link'
      //     }});
      //   });
      return this.Url.preview({url: url}).$promise
        .then((preview) => {
          this.onSuccess({data: preview});
        })
        .catch(() => {
          this.onError();
          return this.$q.reject();
        });

    }
  }

  return {
    restrict: 'A',
    require: ['ngModel', 'inaccessibleUrl'],
    scope: {},
    bindToController: {
      onSuccess: '&inaccessibleUrlOnSuccess',
      onError: '&inaccessibleUrlOnError'
    },
    controllerAs: 'ctrl',
    controller: InaccessibleUrl,
    link: (scope, elem, attrs, ctrls : Array<any>) => {
      let ngModelCtrl = ctrls[0];
      let ctrl = ctrls[1];

      ngModelCtrl.$asyncValidators.inaccessibleUrl = ctrl.preview.bind(ctrl);
    }
  };
}
