import {ActivityResolver} from './services/Resolver';

class ActivityState {
  url;
  template;
  controller;
  controllerAs = '$ctrl';
  resolve;
  controllerProvider;

  constructor(type, stage, private UtilitiesProvider) {
    this.url = `/${type}/:activityId/${stage}?classId&{isPlaying:bool}&{disableSharing:bool}&{pageUrl}&{allowNewWindow:bool}`;
    this.template = require(`./../${type}/templates/${stage}.html`);
    this.resolve = this.getResolveObject(type, stage).getResolve();

    // this has to be an arrow function since there is no access to "this"
    // and no way to bind and use ngInject
    /*@ngInject*/
    this.controllerProvider = ($controller) => {
      let capitalType = UtilitiesProvider.capitalize(type);
      let capitalStage = UtilitiesProvider.capitalize(stage);
      let specificController = `${capitalType}${capitalStage}Controller`;
      try {
        $controller(specificController);
        return specificController;
      } catch (e) {
        return e instanceof TypeError ?
          `Activity${capitalStage}Controller` : specificController;
      }
    };
  }

  private getResolveWrapper(folder, type, prefix, stage) {
    let capitalPrefix = this.UtilitiesProvider.capitalize(prefix);
    let capitalStage = this.UtilitiesProvider.capitalize(stage);

    try {
      let specificResolverModule = require(`./../${folder}/services/${capitalStage}Resolver`);
      let specificResolverType = specificResolverModule[`${capitalPrefix}${capitalStage}Resolver`];
      return new specificResolverType(type);
    } catch (e) {
      return null;
    }
  }

  private getResolveObject(type, stage) {
    return this.getResolveWrapper(type, type, type, stage)
      || this.getResolveWrapper('activities', type, 'activity', stage)
      || new ActivityResolver(type);
  }
}

/*@ngInject*/
export function ActivityStates($stateProvider, UtilitiesProvider, ENV, lodash) {
  lodash.each(ENV.teacher.activities, register);

  function register(stages, type) {
    stages = stages || ['enrich-preview', 'teach-preview', 'play', 'student-results', 'teach-results', 'enrich-results'];
    lodash.each(stages, (stage) => $stateProvider.state(`${type}-${stage}`, new ActivityState(type, stage, UtilitiesProvider)));
  }
}
