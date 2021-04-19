import IProvideService = angular.auto.IProvideService;
import {StateDecorator} from './StateDecorator';

/*@ngInject*/
export function decorate($provide : IProvideService) {
  $provide.decorator('$state', StateDecorator.decorate);
}
