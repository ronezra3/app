import IWindowService = angular.IWindowService;

export class WindowFocusEvents {
  private onBlurCallback : () => void;
  private onFocusCallback : () => void;

  private innerOnBlurBound;
  private innerOnFocusBound;

  /*@ngInject*/
  constructor(private IFrameWrapper, private $window : IWindowService) {
  }
  

  public onBlur(callback) {
    this.onBlurCallback = callback;
    this.innerOnBlurBound = this.innerOnBlur.bind(this);
    this.$window.addEventListener('blur', this.innerOnBlurBound);
  }

  public onFocus(callback) {
    this.onFocusCallback = callback;
    this.innerOnFocusBound = this.innerOnFocus.bind(this);
    this.$window.addEventListener('focus', this.innerOnFocusBound);
  }

  public detach() {
    this.$window.removeEventListener('blur', this.innerOnBlurBound);
    this.$window.removeEventListener('focus', this.innerOnFocusBound);
  }

  private innerOnBlur() {
    var iframe = this.IFrameWrapper();

    if (!iframe.isActive()) {
      this.onBlurCallback();
    } else {
      iframe.onBlur(this.onBlurCallback);
    }
  }

  private innerOnFocus() {
    var iframe = this.IFrameWrapper();
    iframe.onFocus(this.onFocusCallback);
    this.onFocusCallback();
  }
}
