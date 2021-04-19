"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CorrectAnswerPickerController = /** @class */ (function () {
    /*@ngInject*/
    function CorrectAnswerPickerController(Utilities) {
        this.questionService = Utilities.getFactoryByName(this.question.type + "Question");
        this.questionService.initialize(this.question);
    }
    CorrectAnswerPickerController.prototype.select = function () {
        this.questionService.toggleAnswerStatus(this.question, this.answer);
    };
    return CorrectAnswerPickerController;
}());
var CorrectAnswerPicker = /** @class */ (function () {
    function CorrectAnswerPicker() {
        this.controller = CorrectAnswerPickerController;
        this.template = require('./../templates/correct-answer-picker.html');
        this.bindings = {
            question: '<',
            answer: '<',
            isDisabled: '<?'
        };
    }
    return CorrectAnswerPicker;
}());
exports.CorrectAnswerPicker = CorrectAnswerPicker;
//# sourceMappingURL=CorrectAnswerPicker.js.map