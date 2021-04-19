"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DialogLinkCtrl = /** @class */ (function () {
    /*@ngInject*/
    function DialogLinkCtrl(ngDialogRouter) {
        this.ngDialogRouter = ngDialogRouter;
    }
    DialogLinkCtrl.prototype.open = function () {
        this.ngDialogRouter.go(this.path, this.params);
    };
    return DialogLinkCtrl;
}());
var DialogLink = /** @class */ (function () {
    function DialogLink() {
        this.controller = DialogLinkCtrl;
        this.template = "<a href=\"\" ng-click=\"$ctrl.open()\" ng-transclude></a>";
        this.transclude = true;
        this.bindings = {
            path: '@',
            params: '<?'
        };
    }
    return DialogLink;
}());
exports.DialogLink = DialogLink;
//# sourceMappingURL=DialogLink.js.map