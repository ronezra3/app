import {IdeasResourceWrapper} from './ResourceWrapper';
/*@ngInject*/
export function Ideas($resource, ENV, CurrentUser, lodash) {
  return new IdeasResourceWrapper($resource, ENV, CurrentUser, lodash).get();
}
