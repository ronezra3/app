"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ParticipantResultsContentController = /** @class */ (function () {
    /*@ngInject*/
    function ParticipantResultsContentController(lodash, CurrentUser, UsersStore) {
        this.initChosenUser(lodash, CurrentUser, UsersStore);
    }
    ParticipantResultsContentController.prototype.initChosenUser = function (lodash, CurrentUser, UsersStore) {
        var _this = this;
        var chosenId = lodash.last(this.activity.studentsScriptIds);
        UsersStore.get(chosenId).then(function (user) {
            _this.chosenStudent = user;
        });
        this.iAmTheChosenOne = (CurrentUser.get().id === chosenId);
    };
    return ParticipantResultsContentController;
}());
var template = "\n  <activity-header class=\"padded\" type=\"participant\" field=\"$ctrl.activity.instruction\"></activity-header>\n  <div class=\"selected-student\">\n    <div ng-hide=\"$ctrl.iAmTheChosenOne\">\n      <h1>{{'was_chosen' | translate}} </h1>\n      <h1>{{$ctrl.chosenStudent.getFullName()}}</h1>\n    </div>\n    <div ng-show=\"$ctrl.iAmTheChosenOne\">\n      <h1 translate=\"you_were_chosen\"></h1> \n      <h1>{{$ctrl.chosenStudent.getFullName()}}</h1>     \n    </div>\n  </div>\n  <img class=\"current-student-image\" csp-src=\"{{$ctrl.chosenStudent.getAvatarUrl()}}\"/>\n";
var ParticipantResultsContent = /** @class */ (function () {
    function ParticipantResultsContent() {
        this.controller = ParticipantResultsContentController;
        this.template = template;
        this.bindings = {
            activity: '<'
        };
    }
    return ParticipantResultsContent;
}());
exports.ParticipantResultsContent = ParticipantResultsContent;
//# sourceMappingURL=ResultsContent.js.map