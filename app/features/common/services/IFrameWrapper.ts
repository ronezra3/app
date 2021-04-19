class IFrameWrapper {
  iframe = this.$document.find('iframe')[0];

  constructor(private $document) {
  }

  onBlur(callback) {
    if (this.iframe) {
      this.iframe.contentWindow.onblur = () => {
        if (this.isActive()) {
          callback();
        }
      };
    }
  }

  onFocus(callback) {
    if (this.iframe) {
      this.iframe.contentWindow.onfocus = callback;
    }
  }

  isActive() {
    return this.iframe === document.activeElement;
  }
}

/*@ngInject*/
export function IFrameWrapperFactory($document) {
  return () => new IFrameWrapper($document);
}
