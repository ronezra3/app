"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HistoryManager_1 = require("./HistoryManager");
exports.NO_HISTORY_STATES_ERROR = 'No history states';
var TRANSITION_SUPERSEDED_ERROR = 'transition superseded';
var StateDecorator = /** @class */ (function () {
    function StateDecorator($q, $state, historyManager) {
        this.$q = $q;
        this.$state = $state;
        this.historyManager = historyManager;
        this.baseGo = $state.go;
        $state.go = this.forward.bind(this);
        $state.back = this.back.bind(this);
        $state.pushToHistory = historyManager.push.bind(historyManager);
        $state.clearHistory = historyManager.clear.bind(historyManager);
    }
    /*@ngInject*/
    StateDecorator.decorate = function ($delegate, $q, lodash) {
        return new StateDecorator($q, $delegate, new HistoryManager_1.HistoryManager(lodash)).getDecoratedState();
    };
    StateDecorator.prototype.getDecoratedState = function () {
        return this.$state;
    };
    StateDecorator.prototype.back = function (force, amount) {
        var _this = this;
        if (force === void 0) { force = false; }
        if (amount === void 0) { amount = 1; }
        var previousState = this.historyManager.getPreviousState(amount);
        if (!previousState) {
            return this.$q.reject(exports.NO_HISTORY_STATES_ERROR);
        }
        return this.go(previousState.state, previousState.params, { force: force }).then(function () {
            _this.historyManager.back(amount);
        });
    };
    StateDecorator.prototype.forward = function (to, params, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        var previousStateName = this.$state.current.name;
        var previousStateParams = this.$state.params;
        return this.go(to, params, options).then(function () {
            if (!options.replace) {
                _this.historyManager.push(previousStateName, previousStateParams);
            }
        });
    };
    StateDecorator.prototype.go = function (to, params, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        var goPromise = this.baseGo(to, params, options);
        if (options.force) {
            return goPromise.catch(function (error) {
                if (error && error.message === TRANSITION_SUPERSEDED_ERROR) {
                    return _this.baseGo(to, params, options);
                }
                return _this.$q.reject(error);
            });
        }
        return goPromise;
    };
    return StateDecorator;
}());
exports.StateDecorator = StateDecorator;
//# sourceMappingURL=StateDecorator.js.map