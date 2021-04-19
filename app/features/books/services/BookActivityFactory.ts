/*@ngInject*/
export function BookActivity($resource, ENV) {
  var baseUrl = ENV.apiEndpoint + '/bookActivities/:id';
  return $resource(baseUrl, {id: '@id'});
}
