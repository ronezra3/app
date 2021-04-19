import {StoryResourceWrapper} from './ResourceWrapper';
/*@ngInject*/
export function Story($resource, ENV, CurrentUser, lodash) {
  return new StoryResourceWrapper($resource, ENV, CurrentUser, lodash).get();
}
