import {IDialogRouter} from '../../../3rdparty/common/layout/services/NgDialogRouter';
import {IDeviceUtilities} from '../../../3rdparty/common/services/DeviceUtilities';
export class AttentionEventsRouter {

  /*@ngInject*/
  constructor(private Attention, private ngDialogRouter : IDialogRouter, private $cordovaVibration, private DeviceUtilities : IDeviceUtilities) {
  }

  activate() {
    if (this.DeviceUtilities.isCordovaSupported()) this.$cordovaVibration.vibrate(2000);
    this.ngDialogRouter.go('attention', {}, false);
  }

  deActivate() {
    this.ngDialogRouter.close('attention');
  }

  sync(inAttention) {
    var attentionChanged = (this.ngDialogRouter.is('attention') !== inAttention);
    if (attentionChanged) {
      return inAttention ? this.activate() : this.deActivate();
    }
  }

  subscribe() {
    this.Attention.onActivated(() => this.activate());
    this.Attention.onDeActivated(() => this.deActivate());
  }

  unsubscribe() {
    this.Attention.unSubscribe();
  }
}
