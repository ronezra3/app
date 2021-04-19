"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ANIMATION_ITEMS = 25;
var ANIMATION_SPEED = 2 * 1000;
var SearchingStudentController = /** @class */ (function () {
    /*@ngInject*/
    function SearchingStudentController(lodash, $interval) {
        this.lodash = lodash;
        this.$interval = $interval;
    }
    SearchingStudentController.prototype.getAnimationItems = function () {
        return this.lodash.range(1, ANIMATION_ITEMS);
    };
    SearchingStudentController.prototype.$onInit = function () {
        var studentsOrigLength = this.studentsScriptIds.length;
        this.update();
        this.searchInterval = this.$interval(this.update.bind(this), ANIMATION_SPEED, studentsOrigLength);
    };
    SearchingStudentController.prototype.$onDestroy = function () {
        this.stop();
    };
    SearchingStudentController.prototype.stop = function () {
        this.$interval.cancel(this.searchInterval);
    };
    SearchingStudentController.prototype.update = function () {
        if (this.studentsScriptIds.length === 0) {
            this.stop();
            return this.onDone();
        }
        var studentId = this.studentsScriptIds.shift();
        return this.current = this.lodash.find(this.members, { id: studentId });
    };
    return SearchingStudentController;
}());
var template = "\n<section class=\"searching-student\">\n  <div class=\"participant-animation-items\">\n    <div class=\"participant-animation-item\" ng-repeat=\"n in $ctrl.getAnimationItems()\">\n      <ng-include src=\"'images/participant/participant' + n % 4 + '.svg'\"></ng-include>\n    </div>\n  </div>\n  <img class=\"current-student-image\" csp-src=\"{{$ctrl.current.getAvatarUrl()}}\"/>\n</section>\n<h1 class=\"current-student\">{{$ctrl.current.getFullName()}}</h1>\n";
var SearchingStudent = /** @class */ (function () {
    function SearchingStudent() {
        this.controller = SearchingStudentController;
        this.template = template;
        this.bindings = {
            studentsScriptIds: '<',
            members: '<',
            onDone: '&'
        };
    }
    return SearchingStudent;
}());
exports.SearchingStudent = SearchingStudent;
//# sourceMappingURL=SearchingStudent.js.map