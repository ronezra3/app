"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Question_1 = require("./Question");
var SingleQuestion = /** @class */ (function (_super) {
    __extends(SingleQuestion, _super);
    function SingleQuestion() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SingleQuestion.prototype.toggleAnswerStatus = function (question, answer) {
        this.toggle(question.answers, answer, 'status');
        _super.prototype.toggleAnswerStatus.call(this, question, answer);
    };
    ;
    SingleQuestion.prototype.toggleAnswerSelected = function (question, answer) {
        this.toggle(question.answers, answer, 'selected');
        _super.prototype.toggleAnswerSelected.call(this, question, answer);
    };
    ;
    SingleQuestion.prototype.toggle = function (answers, answer, property) {
        if (!answer[property]) {
            this.lodash.each(answers, function (currentAnswer) {
                currentAnswer[property] = false;
            });
        }
    };
    return SingleQuestion;
}(Question_1.Question));
exports.SingleQuestion = SingleQuestion;
/*@ngInject*/
function SingleQuestionFactory(lodash, AssessValues, Localytics) {
    return new SingleQuestion(lodash, AssessValues, Localytics);
}
exports.SingleQuestionFactory = SingleQuestionFactory;
//# sourceMappingURL=SingleQuestion.js.map