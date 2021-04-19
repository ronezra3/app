import IQService = angular.IQService;
import {HistoryManager} from './HistoryManager';
import IStateParamsService = ng.ui.IStateParamsService;
import LoDashStatic = _.LoDashStatic;
import {IStateOptions} from 'angular-ui-router';
import {IStateService} from 'angular-ui-router';

export const NO_HISTORY_STATES_ERROR = 'No history states';
const TRANSITION_SUPERSEDED_ERROR = 'transition superseded';

export interface IStateOptionsExtended extends IStateOptions {
  force?: boolean;
  replace?: boolean;
}

export interface IStateServiceExtended extends IStateService {
  go(to : string, params? : IStateParamsService, options? : IStateOptionsExtended);
  back(force? : boolean, amount? : Number);
  pushToHistory(state : string, params : IStateParamsService);
  clearHistory();
}

export class StateDecorator {
  private baseGo : Function;

  /*@ngInject*/
  public static decorate($delegate : IStateServiceExtended, $q : IQService, lodash : LoDashStatic) {
    return new StateDecorator($q, $delegate, new HistoryManager(lodash)).getDecoratedState();
  }

  constructor(private $q : IQService, private $state : IStateServiceExtended, private historyManager : HistoryManager) {
    this.baseGo = $state.go;
    $state.go = this.forward.bind(this);
    $state.back = this.back.bind(this);
    $state.pushToHistory = historyManager.push.bind(historyManager);
    $state.clearHistory = historyManager.clear.bind(historyManager);
  }

  public getDecoratedState() {
    return this.$state;
  }

  private back(force : boolean = false, amount : Number = 1) {
    let previousState = this.historyManager.getPreviousState(amount);
    if (!previousState) {
      return this.$q.reject(NO_HISTORY_STATES_ERROR);
    }

    return this.go(previousState.state, previousState.params, {force: force}).then(() => {
      this.historyManager.back(amount);
    });
  }

  private forward(to : string, params : IStateParamsService, options : IStateOptionsExtended = {}) {
    let previousStateName = this.$state.current.name;
    let previousStateParams = this.$state.params;
    return this.go(to, params, options).then(() => {
      if (!options.replace) {
        this.historyManager.push(previousStateName, previousStateParams);
      }
    });
  }

  private go(to : string, params : IStateParamsService, options : IStateOptionsExtended = {}) {
    var goPromise = this.baseGo(to, params, options);
    if (options.force) {
      return goPromise.catch((error) => {
        if (error && error.message === TRANSITION_SUPERSEDED_ERROR) {
          return this.baseGo(to, params, options);
        }

        return this.$q.reject(error);
      });
    }

    return goPromise;
  }
}
