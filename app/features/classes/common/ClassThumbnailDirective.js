"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClassThumbnailController = /** @class */ (function () {
    function ClassThumbnailController() {
    }
    ClassThumbnailController.prototype.$onInit = function () {
        var _this = this;
        this.isTeacher = this.classInfo.isTeacher();
        if (this.isTeacher) {
            this.nextState = 'class';
        }
        else {
            this.nextState = 'learn.books';
            this.classInfo.getTeacher().then(function (teacher) {
                _this.teacherInfo = teacher;
            });
        }
    };
    return ClassThumbnailController;
}());
var template = "\n<button class=\"class-item\" ng-click=\"\" ui-sref=\"{{$ctrl.nextState}}({classId: $ctrl.classInfo.id})\">\n  <header>\n    <div class=\"title\" style=\"font-weight:600\">\n      {{$ctrl.classInfo.code}}\n    </div>\n    <div class=\"title\">\n    {{$ctrl.classInfo.subject.name}}\n  </div>\n  </header>\n\n\n\n  <footer></footer>\n</button>\n";
// <img class="image" csp-src="{{$ctrl.classInfo.subject.imgUrl}}">
// <div class="image pressed-cover"></div>
var ClassThumbnail = /** @class */ (function () {
    function ClassThumbnail() {
        this.controller = ClassThumbnailController;
        this.template = template;
        this.bindings = {
            classInfo: '<'
        };
    }
    return ClassThumbnail;
}());
exports.ClassThumbnail = ClassThumbnail;
//# sourceMappingURL=ClassThumbnailDirective.js.map