import IRootScopeService = angular.IRootScopeService;
import LoDashStatic = _.LoDashStatic;
import IQService = angular.IQService;
import {SessionProxy, ISession} from './SessionProxy';
import IPromise = angular.IPromise;
import {AttendanceManager} from '../../attendance/AttendanceManager';

export class CurrentSession {
  private info : ISession;
  private attendanceMgr : AttendanceManager;

  /*@ngInject*/
  constructor(private SessionProxy : SessionProxy, private $rootScope : IRootScopeService, private SocketIO,
              private lodash : LoDashStatic, private $q : IQService) {
      window.onbeforeunload = this.emergencyEnd
  }

  public getInfo() {
    return angular.isDefined(this.info) ? this.info : null;
  }

  public getAttendanceMgr() {
    return this.attendanceMgr;
  }

  public startAttendanceMgr(mgr) {
    mgr.start();
    this.attendanceMgr = mgr;
  }

  public start(classId : string) {
    return this.SessionProxy.start(classId)
      .then((session) => {
        this.setInfo(session);
        return session;
      });
  }

  public end() {
    return this.SessionProxy.end(this.info)
      .then(() => {
        this.SocketIO.emit(this.info.id, 'sessionEnded');
        this.$rootScope.$broadcast('sessionEnding');
      });
  }

  private emergencyEnd(){

    this.SessionProxy.end(this.info)
        this.SocketIO.emit(this.info.id, 'sessionEnded');
        this.$rootScope.$broadcast('sessionEnding');
  }

  public onEnd(callback) {
    this.SocketIO.on('sessionEnded', callback);
  }

  public onEnding(callback) {
    this.$rootScope.$on('sessionEnding', callback);
  }

  public isActive() : boolean {
    return angular.isDefined(this.info);
  }

  public leave() {
    this.info = undefined;
    this.attendanceMgr = undefined;
    this.SocketIO.removeAllListeners('sessionEnded');
  }

  public load(classId) : IPromise<ISession> {
    return this.SessionProxy.getCurrent(classId).then((session) => {
      this.setInfo(session);
      return session;
    });
  }

  public reportVisitedPage(book, page) {
    var session = this.getInfo();
    var sessionBook : any = this.lodash.find(session.books, {id: book.id});
    if (!sessionBook) {
      sessionBook = {id: book.id, pages: []};
      this.info.books.push(sessionBook);
    }

    if (page && !this.lodash.contains(sessionBook.pages, page)) {
      sessionBook.pages.push(page);
      return session.$save();
    }

    return this.$q.resolve(session);
  }

  private setInfo(session) {
    this.info = session;
  }
}
