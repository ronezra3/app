/**
 * copy-paste from:
 * http://stackoverflow.com/questions/19482000/angularjs-add-http-prefix-to-url-input-field
 */

export function httpPrefix() {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope, element, attrs, controller : any) {
      function ensureHttpPrefix(value) {
        // Need to add prefix if we don't have http:// prefix already AND we don't have part of it
        if (value && !/^(https?):\/\//i.test(value)
          && 'http://'.indexOf(value) !== 0 && 'https://'.indexOf(value) !== 0) {
          controller.$setViewValue('http://' + value);
          controller.$render();
          return 'http://' + value;
        } else
          return value;
      }

      controller.$formatters.push(ensureHttpPrefix);
      controller.$parsers.splice(0, 0, ensureHttpPrefix);
    }
  };
}
