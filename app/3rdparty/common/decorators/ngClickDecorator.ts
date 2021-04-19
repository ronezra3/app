export class NgClickDecorator {
  /*@ngInject*/
  constructor ($provide) {
    $provide.decorator('ngClickDirective',
      /*@ngInject*/
      function ($delegate) {
        var compile = $delegate[0].compile;
        var ACTIVE_CLASS_NAME = 'ng-click-active';
        $delegate[0].compile = function () {
          var link = compile.apply(this, arguments);
          return function (scope, element, attrs, transclude) {
            element.on('mousedown touchstart', function (event) {
              element.addClass(ACTIVE_CLASS_NAME);
            });

            element.on('mousemove mouseup touchcancel touchend', function () {
              element.removeClass(ACTIVE_CLASS_NAME);
            });
            return link.apply(this, arguments);
          };
        };
        return $delegate;
      });
  }
}
