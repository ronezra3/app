const MEMBER_STATUS_CHANGED = 'memberStatusChanged';
const MISSING_MEMBERS_CHANGED = 'missingMembersChanged';
const ATTENDING_MEMBERS_CHANGED = 'attendingMembersChanged';

export class AttendanceManager {
  private attending: number[] = [];
  private missing = [];

  constructor(private SocketIO, private lodash, private $rootScope, attending) {
    lodash.each(attending, this.memberStatusChanged.bind(this));
  }

  private updateAttending(id) {
    const index = this.attending.indexOf(id);
    this.attending.splice(index, 1);
  }

  getMissingCount() {
    return this.missing.length;
  }

  getAttendingCount() {
    return this.attending.length;
  }

  getMissing() {
    return this.missing;
  }

  getAttending() {
    return this.attending;
  }

  isAttending(id) {
    return this.lodash.contains(this.attending, id);
  }

  stop() {
    this.attending = [];
    this.missing = [];
    this.SocketIO.removeAllListeners(MEMBER_STATUS_CHANGED);
  }

  start() {
    this.SocketIO.on(MEMBER_STATUS_CHANGED, this.memberStatusChanged.bind(this));
  }

  onMissingMembersChanged(callback) {
    this.$rootScope.$on(MISSING_MEMBERS_CHANGED, callback);
  }

  onAttendingMembersChanged(callback) {
    this.$rootScope.$on(ATTENDING_MEMBERS_CHANGED, callback);
  }

  private missingMembersChanged() {
    this.$rootScope.$broadcast(MISSING_MEMBERS_CHANGED);
  }

  private updateOnline(missingStudent) {
    if (missingStudent) {
      this.lodash.remove(this.missing, { 'id': missingStudent.id });
      this.missingMembersChanged();
    }
  }

  private updateOffline(status, missingStudent) {
    if (status.appName == "left_session") {
      this.updateAttending(status.id);
      return this.missingMembersChanged();
    }

    if (angular.isUndefined(missingStudent)) {
      this.missing.unshift(status);
      return this.missingMembersChanged();
    }

    if (missingStudent.appName !== status.appName) {
      missingStudent.appName = status.appName;
      return this.missingMembersChanged();
    }
  }

  private memberStatusChanged(updatedMemberStatus) {
    if (!this.lodash.contains(this.attending, updatedMemberStatus.id)) {
      this.attending.push(updatedMemberStatus.id);
      this.$rootScope.$broadcast(ATTENDING_MEMBERS_CHANGED, this.attending.length);
    }

    var missingStudent = this.lodash.find(this.missing, { 'id': updatedMemberStatus.id });
    if (updatedMemberStatus.status === 'online') {
      this.updateOnline(missingStudent);
    } else {
      this.updateOffline(updatedMemberStatus, missingStudent);
    }
  }
}

/*@ngInject*/
export function AttendanceManagerFactory(SocketIO, $rootScope, lodash) {
  return (attending = []) => new AttendanceManager(SocketIO, lodash, $rootScope, attending);
}
