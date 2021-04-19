"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MemberThumbnailController = /** @class */ (function () {
    /*@ngInject*/
    function MemberThumbnailController(ngDialogRouter) {
        this.ngDialogRouter = ngDialogRouter;
    }
    MemberThumbnailController.prototype.click = function () {
        this.ngDialogRouter.go('manage.student', {
            student: this.member,
            onStudentRemoved: this.onRemove
        });
    };
    return MemberThumbnailController;
}());
var template = "\n<button ng-click=\"$ctrl.click()\" ng-disabled=\"$ctrl.isDisabled\">\n  <div class=\"member-circle\">\n    <img class=\"member-image\" csp-src=\"{{$ctrl.member.getAvatarUrl(100)}}\"/>\n  </div>\n  <p class=\"name\">{{$ctrl.member.getFullName()}}</p>\n</button>\n";
var MemberThumbnail = /** @class */ (function () {
    function MemberThumbnail() {
        this.controller = MemberThumbnailController;
        this.template = template;
        this.bindings = {
            member: '<',
            onRemove: '&',
            isDisabled: '<?'
        };
    }
    return MemberThumbnail;
}());
exports.MemberThumbnail = MemberThumbnail;
//# sourceMappingURL=MemberThumbnail.js.map