export class SessionEvents {
  private endpoint;

  /*@ngInject*/
  constructor(private SocketIO, ENV) {
    this.endpoint = ENV.realtimeEndpoint;
  }

  join(sessionId, userId, isTeacher, onDisconnect, onReconnect) {
    this.SocketIO.connect(this.endpoint).then(() => {
      this.SocketIO.on('reconnect', () => {
        this.joinSession(sessionId, userId, isTeacher);
        onReconnect();
      });

      this.SocketIO.on('disconnect', onDisconnect);
      this.joinSession(sessionId, userId, isTeacher);
    });
  }

  leave(sessionId, userId) {
    this.SocketIO.removeAllListeners('disconnect');
    this.SocketIO.removeAllListeners('reconnect');
    this.SocketIO.emit(sessionId, 'leaveSession', userId);
    this.SocketIO.disconnect();
  }

  private joinSession(sessionId, userId, isTeacher) {
    this.SocketIO.emit(sessionId, 'joinSession', {
      userId: userId,
      isTeacher: isTeacher
    });
  }
}
