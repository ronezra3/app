"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MatchMediaWrapper = /** @class */ (function () {
    /*@ngInject*/
    function MatchMediaWrapper(matchmedia, LayoutValues) {
        this.matchmedia = matchmedia;
        this.LayoutValues = LayoutValues;
    }
    MatchMediaWrapper.prototype.isMiniTablet = function () {
        return this.matchmedia.is(this.queryBuilder(this.LayoutValues.miniTablet.width, this.LayoutValues.miniTablet.height));
    };
    MatchMediaWrapper.prototype.onMiniTablet = function (callback) {
        return this.matchmedia.on(this.queryBuilder(this.LayoutValues.miniTablet.width, this.LayoutValues.miniTablet.height), callback);
    };
    MatchMediaWrapper.prototype.isPhone = function () {
        return this.matchmedia.is(this.queryBuilder(this.LayoutValues.phone.width, this.LayoutValues.phone.height));
    };
    MatchMediaWrapper.prototype.onPhone = function (callback) {
        return this.matchmedia.on(this.queryBuilder(this.LayoutValues.phone.width, this.LayoutValues.phone.height), callback);
    };
    MatchMediaWrapper.prototype.isMiniTabletOrSmaller = function () {
        return this.isMiniTablet() || this.isPhone();
    };
    MatchMediaWrapper.prototype.isLandscape = function () {
        return this.matchmedia.isLandscape();
    };
    MatchMediaWrapper.prototype.onPortrait = function (callback) {
        this.matchmedia.onPortrait(function (orientation) { return callback(orientation.matches); });
    };
    MatchMediaWrapper.prototype.isPortrait = function () {
        return this.matchmedia.isPortrait();
    };
    MatchMediaWrapper.prototype.queryBuilder = function (width, height) {
        return "screen and (max-width : " + width + "px) and (orientation: portrait),\n      screen and (max-width : " + height + "px) and (orientation: landscape)";
    };
    return MatchMediaWrapper;
}());
exports.MatchMediaWrapper = MatchMediaWrapper;
//# sourceMappingURL=MatchMediaWrapper.js.map