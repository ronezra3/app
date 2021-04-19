import {ActivityResourceWrapper} from './ResourceWrapper';
export class SubmitableResourceWrapper extends ActivityResourceWrapper {

  constructor($resource, ENV, type, private CurrentUser) {
    super($resource, ENV, type);
  }

  protected getExtraMethods() : any {
    let extraMethods : any = super.getExtraMethods();
    extraMethods.submit = {
      method: 'POST',
      params: this.getSubmitParams(),
      url: this.baseApiEndpoint + '/submit'
    };

    return extraMethods;
  }

  protected getSubmitParams() {
    return {userId: this.CurrentUser.get().id};
  }
}
