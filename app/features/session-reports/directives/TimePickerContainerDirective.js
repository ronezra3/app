"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function TimePickerContainer() {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            rightButtonClick: '&',
            leftButtonClick: '&'
        },
        template: require('./../templates/time-picker-container.html')
    };
}
exports.TimePickerContainer = TimePickerContainer;
//# sourceMappingURL=TimePickerContainerDirective.js.map