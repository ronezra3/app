"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ParticipantPreviewContentController = /** @class */ (function () {
    /*@ngInject*/
    function ParticipantPreviewContentController(lodash) {
        this.lodash = lodash;
    }
    ParticipantPreviewContentController.prototype.getItems = function () {
        var itemsNumber = 17;
        return this.lodash.range(1, itemsNumber);
    };
    return ParticipantPreviewContentController;
}());
var template = "\n<preview-header class=\"padded\" type=\"participant\" is-required=\"$ctrl.isRequired\" field-name=\"instruction\"\n                activity=\"$ctrl.activity\" form=\"$ctrl.form\"></preview-header>\n\n<section class=\"animation-preview\">\n  <ng-include class=\"participant-item\" ng-class=\"{'participant-first-seria' : $first}\"\n              ng-repeat=\"n in $ctrl.getItems()\"\n              src=\"'images/participant/participant' + n % 4 + '.svg'\"></ng-include>\n  <ng-include class=\"current-student-image question-mark\" src=\"'images/new/Circle_Who.svg'\"></ng-include>\n</section>\n";
var ParticipantPreviewContent = /** @class */ (function () {
    function ParticipantPreviewContent() {
        this.controller = ParticipantPreviewContentController;
        this.template = template;
        this.bindings = {
            activity: '<',
            form: '<',
            isRequired: '<'
        };
    }
    return ParticipantPreviewContent;
}());
exports.ParticipantPreviewContent = ParticipantPreviewContent;
//# sourceMappingURL=PreviewContent.js.map