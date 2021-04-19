/*@ngInject*/
export function SubjectsProxy($resource, ENV) {
  var baseUrl = ENV.lmsEndpoint + '/subjects';

  return $resource(baseUrl, {id: '@id'});
}
