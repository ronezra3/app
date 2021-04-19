import IRootScopeService = angular.IRootScopeService;
var LocalyticsSession = require('exports?LocalyticsSession!localytics');

export class Localytics {
  private session;

  /*@ngInject*/
  constructor(private ENV, private $rootScope : IRootScopeService) {
  }

  init() {
    let options = {
      appVersion: this.ENV.version,
      sessionTimeoutSeconds: 300
    };

    this.session = LocalyticsSession(this.ENV.localyticsAppKey, options);
    document.addEventListener('pause', () => {
      this.session.close();
      this.session.upload();
    });

    document.addEventListener('resume', () => {
      this.session.open();
      this.session.upload();
    });

    this.session.open();
    this.session.upload();

    this.$rootScope.$on('$stateChangeSuccess', (event, toState) => this.tagScreen(toState.name));
  }

  tagEvent(name, attributes?) {
    if (this.session) {
      this.session.tagEvent(name, attributes);
    }
  }

  tagScreen(name) {
    if (this.session) {
      this.session.tagScreen(name);
    }
  }
}
