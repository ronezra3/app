"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JoinClassThumbnailController = /** @class */ (function () {
    /*@ngInject*/
    function JoinClassThumbnailController(ngDialogRouter) {
        this.ngDialogRouter = ngDialogRouter;
        this.title = 'הצטרף למפגש';
        this.isStudent = true;
        this.execute();
    }
    JoinClassThumbnailController.prototype.execute = function () {
        this.ngDialogRouter.go('classes.join.class');
    };
    return JoinClassThumbnailController;
}());
var JoinClassThumbnail = /** @class */ (function () {
    function JoinClassThumbnail() {
        this.template = require('./../common/thumbnail.template.html');
        this.controller = JoinClassThumbnailController;
        this.bindings = {
            classInfo: '<',
            classes: '<'
        };
    }
    return JoinClassThumbnail;
}());
exports.JoinClassThumbnail = JoinClassThumbnail;
//# sourceMappingURL=JoinClassThumbnailDirective.js.map