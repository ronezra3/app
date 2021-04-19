"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SingleQuestion_1 = require("./SingleQuestion");
var BooleanQuestion = /** @class */ (function (_super) {
    __extends(BooleanQuestion, _super);
    function BooleanQuestion($translate, lodash, AssessValues, Localytics) {
        var _this = _super.call(this, lodash, AssessValues, Localytics) || this;
        _this.$translate = $translate;
        _this.lodash = lodash;
        _this.AssessValues = AssessValues;
        _this.Localytics = Localytics;
        return _this;
    }
    BooleanQuestion.prototype.initialize = function (question) {
        _super.prototype.initialize.call(this, question);
        this.$translate('true').then(function (trueTranslation) {
            question.answers[0].content = trueTranslation;
        });
        this.$translate('false').then(function (falseTranslation) {
            question.answers[1].content = falseTranslation;
        });
    };
    ;
    return BooleanQuestion;
}(SingleQuestion_1.SingleQuestion));
/*@ngInject*/
function BooleanQuestionFactory($translate, lodash, AssessValues, Localytics) {
    return new BooleanQuestion($translate, lodash, AssessValues, Localytics);
}
exports.BooleanQuestionFactory = BooleanQuestionFactory;
//# sourceMappingURL=BooleanQuestion.js.map