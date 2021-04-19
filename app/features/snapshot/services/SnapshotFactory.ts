import {SnapshotResourceWrapper} from './ResourceWrapper';

/*@ngInject*/
export function Snapshot($resource, ENV, lodash, CurrentUser) {
  return new SnapshotResourceWrapper($resource, ENV, CurrentUser, lodash).get();
}
