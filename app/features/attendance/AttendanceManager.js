"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MEMBER_STATUS_CHANGED = 'memberStatusChanged';
var MISSING_MEMBERS_CHANGED = 'missingMembersChanged';
var ATTENDING_MEMBERS_CHANGED = 'attendingMembersChanged';
var AttendanceManager = /** @class */ (function () {
    function AttendanceManager(SocketIO, lodash, $rootScope, attending) {
        this.SocketIO = SocketIO;
        this.lodash = lodash;
        this.$rootScope = $rootScope;
        this.attending = [];
        this.missing = [];
        lodash.each(attending, this.memberStatusChanged.bind(this));
    }
    AttendanceManager.prototype.updateAttending = function (id) {
        var index = this.attending.indexOf(id);
        this.attending.splice(index, 1);
    };
    AttendanceManager.prototype.getMissingCount = function () {
        return this.missing.length;
    };
    AttendanceManager.prototype.getAttendingCount = function () {
        return this.attending.length;
    };
    AttendanceManager.prototype.getMissing = function () {
        return this.missing;
    };
    AttendanceManager.prototype.getAttending = function () {
        return this.attending;
    };
    AttendanceManager.prototype.isAttending = function (id) {
        return this.lodash.contains(this.attending, id);
    };
    AttendanceManager.prototype.stop = function () {
        this.attending = [];
        this.missing = [];
        this.SocketIO.removeAllListeners(MEMBER_STATUS_CHANGED);
    };
    AttendanceManager.prototype.start = function () {
        this.SocketIO.on(MEMBER_STATUS_CHANGED, this.memberStatusChanged.bind(this));
    };
    AttendanceManager.prototype.onMissingMembersChanged = function (callback) {
        this.$rootScope.$on(MISSING_MEMBERS_CHANGED, callback);
    };
    AttendanceManager.prototype.onAttendingMembersChanged = function (callback) {
        this.$rootScope.$on(ATTENDING_MEMBERS_CHANGED, callback);
    };
    AttendanceManager.prototype.missingMembersChanged = function () {
        this.$rootScope.$broadcast(MISSING_MEMBERS_CHANGED);
    };
    AttendanceManager.prototype.updateOnline = function (missingStudent) {
        if (missingStudent) {
            this.lodash.remove(this.missing, { 'id': missingStudent.id });
            this.missingMembersChanged();
        }
    };
    AttendanceManager.prototype.updateOffline = function (status, missingStudent) {
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
    };
    AttendanceManager.prototype.memberStatusChanged = function (updatedMemberStatus) {
        if (!this.lodash.contains(this.attending, updatedMemberStatus.id)) {
            this.attending.push(updatedMemberStatus.id);
            this.$rootScope.$broadcast(ATTENDING_MEMBERS_CHANGED, this.attending.length);
        }
        var missingStudent = this.lodash.find(this.missing, { 'id': updatedMemberStatus.id });
        if (updatedMemberStatus.status === 'online') {
            this.updateOnline(missingStudent);
        }
        else {
            this.updateOffline(updatedMemberStatus, missingStudent);
        }
    };
    return AttendanceManager;
}());
exports.AttendanceManager = AttendanceManager;
/*@ngInject*/
function AttendanceManagerFactory(SocketIO, $rootScope, lodash) {
    return function (attending) {
        if (attending === void 0) { attending = []; }
        return new AttendanceManager(SocketIO, lodash, $rootScope, attending);
    };
}
exports.AttendanceManagerFactory = AttendanceManagerFactory;
//# sourceMappingURL=AttendanceManager.js.map