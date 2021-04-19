import {CurrentSession} from '../../session/services/CurrentSession';
import {Localytics} from '../../common/services/Localytics';

export class Attention {
  private static ATTENTION_ACTIVATED = 'attentionActivated';
  private static ATTENTION_DEACTIVATED = 'attentionDeActivated';

  /*@ngInject*/
  constructor(private SocketIO, private CurrentSession : CurrentSession, private Localytics : Localytics) {

  }

  onActivated(callback) {
    this.SocketIO.on(Attention.ATTENTION_ACTIVATED, callback);
  }

  onDeActivated(callback) {
    this.SocketIO.on(Attention.ATTENTION_DEACTIVATED, callback);
  }

  toggle() {
    let session = this.CurrentSession.getInfo();
    session.inAttention = !session.inAttention;
    return session.$save().then(() => {
      let event = this.isInAttention() ? Attention.ATTENTION_ACTIVATED : Attention.ATTENTION_DEACTIVATED;
      this.Localytics.tagEvent(event);
      this.SocketIO.emit(session.id, event);
    });
  }

  unSubscribe() {
    this.SocketIO.removeAllListeners(Attention.ATTENTION_ACTIVATED);
    this.SocketIO.removeAllListeners(Attention.ATTENTION_DEACTIVATED);
  }

  isInAttention() {
    return this.CurrentSession.getInfo().inAttention;
  }
}
