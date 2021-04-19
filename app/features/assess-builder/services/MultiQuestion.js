"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Question_1 = require("./Question");
var MultiQuestion = /** @class */ (function (_super) {
    __extends(MultiQuestion, _super);
    function MultiQuestion() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MultiQuestion.prototype.correctCount = function (question) {
        return this.lodash.chain(question.answers).where({ status: true }).size().value();
    };
    ;
    MultiQuestion.prototype.selectedCount = function (question) {
        return this.lodash.chain(question.answers).where({ selected: true }).size().value();
    };
    ;
    MultiQuestion.prototype.isFullyAnswered = function (question) {
        return this.correctCount(question) <= this.selectedCount(question);
    };
    ;
    return MultiQuestion;
}(Question_1.Question));
/*@ngInject*/
function MultiQuestionFactory(lodash, AssessValues, Localytics) {
    return new MultiQuestion(lodash, AssessValues, Localytics);
}
exports.MultiQuestionFactory = MultiQuestionFactory;
//# sourceMappingURL=MultiQuestion.js.map