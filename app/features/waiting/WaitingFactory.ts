import { CurrentSession } from "../session/services/CurrentSession";


export class Waiting {
    private static WAITING_ACTIVATED = 'waitingActivated';
    private static WAITING_DEACTIVATED = 'waitingDeActivated';

    /*@ngInject*/
    constructor(private SocketIO, private CurrentSession: CurrentSession) {

    }

    onActivated(callback) {
        this.SocketIO.on(Waiting.WAITING_ACTIVATED, callback);
    }

    onDeActivated(callback) {
        this.SocketIO.on(Waiting.WAITING_DEACTIVATED, callback);
    }

    open() {
        let session = this.CurrentSession.getInfo();
        this.SocketIO.emit(session.id, Waiting.WAITING_ACTIVATED);
    }

    close() {
        let session = this.CurrentSession.getInfo();
        this.SocketIO.emit(session.id, Waiting.WAITING_DEACTIVATED);
    }

    // toggle() {
    //     let session = this.CurrentSession.getInfo();
    //     session.inAttention = !session.inAttention;
    //     return session.$save().then(() => {
    //         let event = this.isInAttention() ? Waiting.WAITING_ACTIVATED : Waiting.WAITING_DEACTIVATED;
    //         this.SocketIO.emit(session.id, event);
    //     });
    // }

    unSubscribe() {
        this.SocketIO.removeAllListeners(Waiting.WAITING_ACTIVATED);
        this.SocketIO.removeAllListeners(Waiting.WAITING_DEACTIVATED);
    }

    //   isInAttention() {
    //     return this.CurrentSession.getInfo().inAttention;
    //   }
}
