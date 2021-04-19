"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CreateClassThumbnailController = /** @class */ (function () {
    /*@ngInject*/
    function CreateClassThumbnailController(ngDialogRouter) {
        this.ngDialogRouter = ngDialogRouter;
        this.title = 'צור מפגש חדש';
    }
    CreateClassThumbnailController.prototype.execute = function () {
        this.ngDialogRouter.go('classes.create.class', { subjects: this.subjects });
    };
    return CreateClassThumbnailController;
}());
var CreateClassThumbnail = /** @class */ (function () {
    function CreateClassThumbnail() {
        this.template = require('./../common/thumbnail.template.html');
        this.controller = CreateClassThumbnailController;
        this.bindings = {
            classInfo: '<',
            subjects: '<'
        };
    }
    return CreateClassThumbnail;
}());
exports.CreateClassThumbnail = CreateClassThumbnail;
//# sourceMappingURL=create-class-thumbnail.component.js.map