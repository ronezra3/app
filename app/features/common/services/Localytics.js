"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LocalyticsSession = require('exports?LocalyticsSession!localytics');
var Localytics = /** @class */ (function () {
    /*@ngInject*/
    function Localytics(ENV, $rootScope) {
        this.ENV = ENV;
        this.$rootScope = $rootScope;
    }
    Localytics.prototype.init = function () {
        var _this = this;
        var options = {
            appVersion: this.ENV.version,
            sessionTimeoutSeconds: 300
        };
        this.session = LocalyticsSession(this.ENV.localyticsAppKey, options);
        document.addEventListener('pause', function () {
            _this.session.close();
            _this.session.upload();
        });
        document.addEventListener('resume', function () {
            _this.session.open();
            _this.session.upload();
        });
        this.session.open();
        this.session.upload();
        this.$rootScope.$on('$stateChangeSuccess', function (event, toState) { return _this.tagScreen(toState.name); });
    };
    Localytics.prototype.tagEvent = function (name, attributes) {
        if (this.session) {
            this.session.tagEvent(name, attributes);
        }
    };
    Localytics.prototype.tagScreen = function (name) {
        if (this.session) {
            this.session.tagScreen(name);
        }
    };
    return Localytics;
}());
exports.Localytics = Localytics;
//# sourceMappingURL=Localytics.js.map