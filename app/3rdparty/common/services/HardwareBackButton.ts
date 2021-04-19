/*@ngInject*/
export function HardwareBackButton(lodash) {
  var eventListenersStack = [];
  var isEnabled = true;

  function enable() {
    isEnabled = true;
  }

  function disable() {
    isEnabled = false;
  }

  function push(callback) {
    eventListenersStack.push(callback);
    return function () {
      lodash.pull(eventListenersStack, callback);
    };
  }

  document.addEventListener("backbutton", function () {
    if (isEnabled) {
      lodash.last(eventListenersStack)();
    }
  });

  return {
    push: push,
    enable: enable,
    disable: disable
  };
}
