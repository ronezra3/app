export class ActivityResourceWrapper {
  protected baseApiEndpoint = `${this.ENV.apiEndpoint}/${this.type}/:id`;

  constructor(private $resource, private ENV, private type) {
  }

  get() {
    return this.$resource(this.baseApiEndpoint, {id: '@id'}, this.getExtraMethods());
  }

  protected getExtraMethods() : any {
    return {
      reset: {
        method: 'POST',
        url: `${this.baseApiEndpoint}/reset`
      }
    };
  }
}
