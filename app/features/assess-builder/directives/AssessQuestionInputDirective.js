"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AssessQuestionInput = /** @class */ (function () {
    function AssessQuestionInput() {
        this.template = require('./../templates/assess-question-input.html');
        this.bindings = {
            remove: '&',
            question: '<',
            getIndex: '&',
            immediateFeedback: '<'
        };
    }
    return AssessQuestionInput;
}());
exports.AssessQuestionInput = AssessQuestionInput;
//# sourceMappingURL=AssessQuestionInputDirective.js.map