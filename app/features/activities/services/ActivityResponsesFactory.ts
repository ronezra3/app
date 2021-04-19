export class ActivityResponses {
  /*@ngInject*/
  constructor(private SocketIO, private CurrentSession) {
  }

  submit(type, activity, response) {
    return response.$submit().then(() => {
      this.SocketIO.emit(this.CurrentSession.getInfo().id, `${type}.submit`, response);
    });
  }
}
