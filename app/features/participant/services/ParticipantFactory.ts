import {ActivityResourceWrapper} from '../../activities/services/ResourceWrapper';
/*@ngInject*/
export function Participant($resource, ENV) {
  
  
  return new ActivityResourceWrapper($resource, ENV, 'participants').get();

}
