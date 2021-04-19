export class LocallyStoredParameter {
  private currentParameter = null;

  constructor(private LocalStorageFactory, private parameterName) {
  }

  protected convertParam(param) {
    return param;
  }

  set(parameter) {
    this.currentParameter = parameter;
    return this.LocalStorageFactory.set(this.parameterName, parameter);
  }

  load() {
    return this.LocalStorageFactory.get(this.parameterName).then(parameter => this.currentParameter = this.convertParam(parameter));
  }

  get() {
    return this.currentParameter;
  }

  remove() {
    this.currentParameter = null;
    return this.LocalStorageFactory.remove(this.parameterName);
  }
}

/*@ngInject*/
export function LocallyStoredParameterFactory(LocalStorageFactory) {
  return name => new LocallyStoredParameter(LocalStorageFactory, name);
}
