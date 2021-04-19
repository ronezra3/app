/*@ngInject*/
export function Popup($document, $rootScope, lodash, $compile) {

  function Popup(config, params, overlay) {
    this._body = $document.find('body').eq(0);
    this._wrapper = null;
    this._config = config;
    this._params = params;
    this._overlay = overlay;
  }

  Popup.prototype.open = function () {
    if (!this._config.template) {
      console.warn("trying to open a popup without template");
      return;
    }

    this._scope = $rootScope.$new();
    var scope = lodash.assign(this._scope, this._params);
    var self = this;

    self._wrapper = angular.element('<div id="popupWrapper"></div>');

    if (self._overlay) {
      self._wrapper.addClass("popup-overlay");
      self._wrapper.bind('click', function (event) {
        self.close();
      });
    }

    self._body.append(self._wrapper);
    self._wrapper.append($compile(this._config.template)(scope));
  };

  Popup.prototype.close = function () {
    if (this._wrapper !== null) {
      this._scope.$destroy();
      this._wrapper.remove();
    }

    this._wrapper = null;
  };

  Popup.prototype.isOpen = function () {
    return this._wrapper !== null;
  };

  Popup.prototype.toggle = function () {
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  };

  return Popup;
}
