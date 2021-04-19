/*@ngInject*/
export function EnvWrapper(ENV) {
  return {
    getLmsEndpoint: function () {
      return ENV.lmsEndpoint;
    }
  };
}
