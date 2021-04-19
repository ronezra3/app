import IQService = angular.IQService;
import {SessionProxy} from '../session/services/SessionProxy';

/*@ngInject*/
export function AttendanceFactory(AttendanceManager, SessionProxy : SessionProxy) {
  return sessionId => SessionProxy.get(sessionId).$promise.then((session) => new AttendanceManager(session.attended));
}
