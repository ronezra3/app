import {PollResourceWrapper} from './ResourceWrapper';

/*@ngInject*/
export function Poll($resource, ENV, lodash, CurrentUser) {
  return new PollResourceWrapper($resource, ENV, CurrentUser, lodash).get();
}
