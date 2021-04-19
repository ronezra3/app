// import { ActivityResourceWrapper } from '../../activities/services/ResourceWrapper';
import { SubmitableResourceWrapper } from '../../activities/services/SubmitableResourceWrapper';
export class UrlResourceWrapper extends SubmitableResourceWrapper {
  constructor($resource, ENV, CurrentUser) {
    super($resource, ENV, 'url', CurrentUser);
  }

  getExtraMethods() {
    let extraMethods = super.getExtraMethods();
    extraMethods.preview = {
      method: 'GET',
      params: { url: '@url' },
      url: `${this.baseApiEndpoint}/preview/:url`
    };
    return extraMethods; 
  }

}
