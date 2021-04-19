"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HistoryManager = /** @class */ (function () {
    function HistoryManager(lodash) {
        this.lodash = lodash;
        this.history = [];
    }
    HistoryManager.prototype.push = function (state, params) {
        this.history.push({ state: state, params: params });
    };
    HistoryManager.prototype.getPreviousState = function (amount) {
        if (amount === void 0) { amount = 1; }
        return this.history[this.getStepIndex(amount)];
    };
    HistoryManager.prototype.back = function (amount) {
        if (amount === void 0) { amount = 1; }
        this.history = this.lodash.take(this.history, this.getStepIndex(amount));
    };
    HistoryManager.prototype.clear = function () {
        this.history = [];
    };
    HistoryManager.prototype.getStepIndex = function (amount) {
        return this.history.length - Math.abs(amount);
    };
    return HistoryManager;
}());
exports.HistoryManager = HistoryManager;
//# sourceMappingURL=HistoryManager.js.map