import {IStateParamsService} from 'angular-ui-router';

export class HistoryManager {
  private history : Array<any> = [];

  constructor(private lodash : any) {
  }

  public push(state : string, params : IStateParamsService) {
    this.history.push({state: state, params: params});
  }

  public getPreviousState(amount : Number = 1) {
    return this.history[this.getStepIndex(amount)];
  }

  public back(amount : Number = 1) {
    this.history = this.lodash.take(this.history, this.getStepIndex(amount));
  }

  public clear() {
    this.history = [];
  }

  private getStepIndex(amount) {
    return this.history.length - Math.abs(amount);
  }
}
