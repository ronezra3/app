/*@ngInject*/
export function AuthenticationToken(LocallyStoredParameter) {
  return new LocallyStoredParameter('authToken');
}
