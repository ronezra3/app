"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ManageStudentAvatar() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            avatar: '@',
            icon: '@'
        },
        template: require('./../templates/manage-student-avatar.html')
    };
}
exports.ManageStudentAvatar = ManageStudentAvatar;
//# sourceMappingURL=ManageStudentAvatar.js.map