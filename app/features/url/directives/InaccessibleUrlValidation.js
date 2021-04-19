"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function inaccessibleUrl() {
    var InaccessibleUrl = /** @class */ (function () {
        /*@ngInject*/
        function InaccessibleUrl(Url, $q) {
            this.Url = Url;
            this.$q = $q;
        }
        InaccessibleUrl.prototype.preview = function (url) {
            var _this = this;
            if (!url) {
                return this.$q.resolve();
            }
            return this.$q.resolve()
              .then((preview) => {
                this.onSuccess({data: {
                  url : url,
                  type: 'link'
                }});
              });
            // return this.Url.preview({ url: url }).$promise
            //     .then(function (preview) {
            //     _this.onSuccess({ data: preview });
            // })
            //     .catch(function () {
            //     _this.onError();
            //     return _this.$q.reject();
            // });
        };
        return InaccessibleUrl;
    }());
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
        link: function (scope, elem, attrs, ctrls) {
            var ngModelCtrl = ctrls[0];
            var ctrl = ctrls[1];
            ngModelCtrl.$asyncValidators.inaccessibleUrl = ctrl.preview.bind(ctrl);
        }
    };
}
exports.inaccessibleUrl = inaccessibleUrl;
//# sourceMappingURL=InaccessibleUrlValidation.js.map