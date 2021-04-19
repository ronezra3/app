import 'ng-dialog';
import IRootScopeService = angular.IRootScopeService;
import LoDashStatic = _.LoDashStatic;
import {Localytics} from '../../../../features/common/services/Localytics';

export class NgDialogRouterProvider {
  dialogsConfig = {};

  state(path, config) {
    if (angular.isUndefined(config.template)) {
      throw new Error('Cannot create dialog state without template!');
    }

    this.dialogsConfig[path] = config;
    return this;
  }

  /*@ngInject*/
  $get(ngDialog, $rootScope, lodash, HardwareBackButton, Localytics : Localytics) {
    return new NgDialogRouter(ngDialog, this.dialogsConfig, $rootScope, lodash, HardwareBackButton, Localytics);
  }
}

export interface IDialogRouter {
  go(path, params?, closeByBackButton?, dynamicConfig?) : void;
  closeAll() : void;
  close(path) : void;
  is(path) : boolean;
}

class NgDialogRouter implements IDialogRouter {
  lastPath;
  storage;

  constructor(private ngDialog, private dialogsConfig, private $rootScope : IRootScopeService,
              private lodash : LoDashStatic, private HardwareBackButton, private Localytics : Localytics) {
    this.storage = {};
  }

  go(path, params?, closeByBackButton = true, dynamicConfig?) : void {
    this.lastPath = path;

    if (angular.isDefined(this.storage[path])) {
      throw new Error('Cannot open the same dialog twice');
    }

    let config = this.lodash.clone(this.dialogsConfig[path]);
    if (dynamicConfig) {
      if (dynamicConfig.appendClassName && config.appendClassName) {
        config.appendClassName += ` ${dynamicConfig.appendClassName}`;
        delete dynamicConfig.appendClassName;
      }

      this.lodash.assign(config, dynamicConfig);
    }

    config.scope = this.lodash.assign(this.$rootScope.$new(), params);
    config.plain = true;

    var deregister = this.HardwareBackButton.push((() => {
      if (closeByBackButton) {
        this.close(path);
      }
    }).bind(this));

    config.preCloseCallback = () => {
      delete this.storage[path];
      deregister();
    };

    this.storage[path] = this.ngDialog.open(config);
    this.Localytics.tagScreen(path);
  }

  closeAll() : void {
    this.lastPath = null;
    this.storage = {};
    this.ngDialog.closeAll();
  }

  close(path) : void {
    var id = this.storage[path].id;
    delete this.storage[path];

    this.ngDialog.close(id);
  }

  is(path) : boolean {
    return this.lastPath === path;
  }
}
