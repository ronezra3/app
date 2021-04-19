import {Utilities} from '../services/Utilities';
import {IDeviceUtilities} from '../services/DeviceUtilities';

/*@ngInject*/
export function CspSrc(Utilities : Utilities, DeviceUtilities : IDeviceUtilities) {
  return {
    link: link,
    restrict: 'A',
    priority: 99
  };

  function link(scope, element, attrs) {
    attrs.$observe('cspSrc', function (origSrc) {
      if (DeviceUtilities.isChromeApp() || DeviceUtilities.isWindows()) {
        Utilities.getSrcFromCspSrc(origSrc)
          .then((src) => attrs.$set('src', src))
          .catch(() => attrs.$set('src', origSrc));
      } else {
        attrs.$set('src', origSrc);
      }

      scope.$on('$destroy', function () {
        Utilities.destroyResource(attrs.src);
      });
    });
  }
}
