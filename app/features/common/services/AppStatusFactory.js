"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OUT_OF_APP = 'out_of_app';
var OFFLINE = 'offline';
var ONLINE = 'online';
var AppStatus = /** @class */ (function () {
    /*@ngInject*/
    function AppStatus($resource, $interval, ENV, CurrentUser, $cordovaAppVersion, WindowFocusEvents, SocketIO, $q, DeviceUtilities, AppOnTop, StatusUpdateTimeout) {
        this.$interval = $interval;
        this.CurrentUser = CurrentUser;
        this.$cordovaAppVersion = $cordovaAppVersion;
        this.WindowFocusEvents = WindowFocusEvents;
        this.SocketIO = SocketIO;
        this.$q = $q;
        this.DeviceUtilities = DeviceUtilities;
        this.AppOnTop = AppOnTop;
        this.StatusUpdateTimeout = StatusUpdateTimeout;
        this.sendAppOnTopInterval = null;
        this.sessionId = null;
        this.isOffline = false;
        this.isActive = false;
        this.lastAppName = null;
        this.lastUserStatus = null;
        this.ourAppName = null;
        this.StatusResource = $resource(ENV.apiEndpoint + '/userstatuses/:id', { id: '@id' });
    }
    AppStatus.prototype.activate = function (sessionId) {
        if (!this.isActive) {
            this.lastAppName = null;
            this.lastUserStatus = null;
            this.isOffline = false;
            this.isActive = true;
            this.sessionId = sessionId;
            this.reportOfflineStatusBound = this.reportOfflineStatus.bind(this);
            this.reportOnlineStatusBound = this.reportOnlineStatus.bind(this);
            // document.addEventListener('pause', this.reportOfflineStatusBound);
            // document.addEventListener('resume', this.reportOnlineStatusBound);
            this.WindowFocusEvents.onBlur(this.reportOfflineStatusBound);
            this.WindowFocusEvents.onFocus(this.reportOnlineStatusBound);
            // document.addEventListener('visibilitychange', function () {
            //   if (document.hidden) {
            //    console.log('visibilitychange : hidden');
            //   } else {
            //     console.log('visibilitychange : shown');
            //   }
            // });
        }
    };
    AppStatus.prototype.deActivate = function () {
        this.isActive = false;
        this.stopStatusReporting();
        // document.removeEventListener('pause', this.reportOfflineStatusBound);
        // document.removeEventListener('resume', this.reportOnlineStatusBound);
        this.WindowFocusEvents.detach();
    };
    ;
    AppStatus.prototype.reportCurrentStatus = function () {
        this.reportUserStatus(this.lastUserStatus || ONLINE, this.lastAppName);
    };
    ;
    AppStatus.prototype.reportStatus = function (status, appName) {
        this.reportUserStatus(status, appName);
    };
    AppStatus.prototype.updateOfflineStatus = function (appName) {
        var _this = this;
        if (appName === void 0) { appName = OUT_OF_APP; }
        this.getOurAppName().then(function (ourAppName) {
            if (ourAppName === null || appName !== ourAppName) {
                _this.updateUserStatus(OFFLINE, appName);
            }
        });
    };
    AppStatus.prototype.getOurAppName = function () {
        var _this = this;
        if (this.DeviceUtilities.isWindows()) {
            return this.$q.resolve(null);
        }
        if (this.ourAppName) {
            return this.$q.resolve(this.ourAppName);
        }
        return this.$cordovaAppVersion.getAppName()
            .then(function (ourAppName) { return _this.ourAppName = ourAppName; });
    };
    AppStatus.prototype.reportOfflineStatus = function () {
        var _this = this;
        this.isOffline = true;
        if (!this.DeviceUtilities.isAndroid()) {
            return this.updateUserStatus(OFFLINE, OUT_OF_APP);
        }
        this.sendAppOnTopInterval = this.$interval(function () {
            _this.AppOnTop.get()
                .then(_this.updateOfflineStatus.bind(_this))
                .catch(function (e) {
                console.error("get app on top failed " + e);
                _this.updateOfflineStatus();
            });
        }, this.StatusUpdateTimeout);
    };
    AppStatus.prototype.stopStatusReporting = function () {
        if (this.sendAppOnTopInterval) {
            this.$interval.cancel(this.sendAppOnTopInterval);
        }
    };
    AppStatus.prototype.reportOnlineStatus = function () {
        this.lastAppName = null;
        this.isOffline = false;
        this.stopStatusReporting();
        this.updateUserStatus(ONLINE, null);
    };
    AppStatus.prototype.reportUserStatus = function (status, appName) {
        var statusResource = new this.StatusResource();
        statusResource.id = this.CurrentUser.get().id;
        statusResource.sessionId = this.sessionId;
        statusResource.appName = appName;
        statusResource.status = status;
        statusResource.$save();
        this.SocketIO.emit(this.sessionId, 'memberStatusChanged', statusResource);
    };
    AppStatus.prototype.updateUserStatus = function (status, appName) {
        if (status !== this.lastUserStatus || appName !== this.lastAppName) {
            this.lastUserStatus = status;
            this.lastAppName = appName;
            this.reportUserStatus(status, appName);
        }
    };
    return AppStatus;
}());
exports.AppStatus = AppStatus;
//# sourceMappingURL=AppStatusFactory.js.map