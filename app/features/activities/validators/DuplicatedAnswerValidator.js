"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DuplicatedAnswerValidatorController = /** @class */ (function () {
    /*@ngInject*/
    function DuplicatedAnswerValidatorController(lodash) {
        this.lodash = lodash;
    }
    DuplicatedAnswerValidatorController.prototype.validate = function (viewAnswer) {
        return !this.lodash.any(this.answers, function (answer) {
            return answer.title && answer.title === viewAnswer;
        });
    };
    return DuplicatedAnswerValidatorController;
}());
function DuplicatedAnswerValidator() {
    return {
        restrict: 'A',
        require: ['ngModel', 'duplicatedAnswerValidator'],
        bindToController: {
            answers: '<duplicatedAnswerValidatorAnswers'
        },
        controllerAs: 'duplicatedAnswerValidatorCtrl',
        controller: DuplicatedAnswerValidatorController,
        link: function (scope, elem, attrs, ctrls) {
            var ngModelCtrl = ctrls[0];
            var ctrl = ctrls[1];
            ngModelCtrl.$validators.duplicatedAnswer = ctrl.validate.bind(ctrl);
        }
    };
}
exports.DuplicatedAnswerValidator = DuplicatedAnswerValidator;
//# sourceMappingURL=DuplicatedAnswerValidator.js.map