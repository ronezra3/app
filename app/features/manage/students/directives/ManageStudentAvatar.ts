export function ManageStudentAvatar() {
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
