export function TimePickerContainer() {
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
