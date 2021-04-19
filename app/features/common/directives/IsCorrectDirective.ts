export function IsCorrect() {
  return {
    restrict: 'E',
    scope: {
      isCorrect: '='
    },
    template: require('./../templates/yes-no.html')
  };
}
