import {AssessResourceWrapper} from './ResourceWrapper';
/*@ngInject*/
export function Assess($resource, ENV, lodash) {
  return new AssessResourceWrapper($resource, ENV, lodash).get();
}
