import { AppOnTop } from './AppOnTop';
import { IDeviceUtilities } from '../../../3rdparty/common/services/DeviceUtilities';
import IIntervalService = angular.IIntervalService;
import IResourceService = angular.resource.IResourceService;
import IPromise = angular.IPromise;
import IQService = angular.IQService;

const OUT_OF_APP = 'out_of_app';
const OFFLINE = 'offline';
const ONLINE = 'online';

export class AppStatus {
  private StatusResource;
  private sendAppOnTopInterval = null;
  private sessionId: string = null;
  private isOffline = false;
  private isActive = false;
  private lastAppName: string = null;
  private lastUserStatus: string = null;
  private reportOfflineStatusBound;
  private reportOnlineStatusBound;
  private ourAppName: string = null;

  /*@ngInject*/
  constructor($resource: IResourceService, private $interval: IIntervalService, ENV, private CurrentUser,
    private $cordovaAppVersion, private WindowFocusEvents, private SocketIO, private $q: IQService,
    private DeviceUtilities: IDeviceUtilities, private AppOnTop: AppOnTop, private StatusUpdateTimeout) {
    this.StatusResource = $resource(ENV.apiEndpoint + '/userstatuses/:id', { id: '@id' });
  }

  public activate(sessionId) {
    if (!this.isActive) {
      this.lastAppName = null;
      this.lastUserStatus = null;
      this.isOffline = false;
      this.isActive = true;
      this.sessionId = sessionId;

      this.reportOfflineStatusBound = this.reportOfflineStatus.bind(this);
      this.reportOnlineStatusBound = this.reportOnlineStatus.bind(this);
      // document.addEventListener('pause', this.reportOfflineStatusBound);
      // document.addEventListener('resume', this.reportOnlineStatusBound);
      this.WindowFocusEvents.onBlur(this.reportOfflineStatusBound);
      this.WindowFocusEvents.onFocus(this.reportOnlineStatusBound);

      // document.addEventListener('visibilitychange', function () {
      //   if (document.hidden) {
      //    console.log('visibilitychange : hidden');
      //   } else {
      //     console.log('visibilitychange : shown');
      //   }
      // });

    }
  }

  public deActivate() {
    this.isActive = false;
    this.stopStatusReporting();

    // document.removeEventListener('pause', this.reportOfflineStatusBound);
    // document.removeEventListener('resume', this.reportOnlineStatusBound);
    this.WindowFocusEvents.detach();
  };

  public reportCurrentStatus() {
    this.reportUserStatus(this.lastUserStatus || ONLINE, this.lastAppName);
  };

  public reportStatus(status, appName) {
    this.reportUserStatus(status, appName);
  }

  private updateOfflineStatus(appName = OUT_OF_APP) {
    this.getOurAppName().then((ourAppName) => {
      if (ourAppName === null || appName !== ourAppName) {
        this.updateUserStatus(OFFLINE, appName);
      }
    });
  }

  private getOurAppName(): IPromise<string> {
    if (this.DeviceUtilities.isWindows()) {
      return this.$q.resolve(null);
    }

    if (this.ourAppName) {
      return this.$q.resolve(this.ourAppName);
    }

    return this.$cordovaAppVersion.getAppName()
      .then((ourAppName) => this.ourAppName = ourAppName);
  }

  private reportOfflineStatus() {
    
    this.isOffline = true;

    if (!this.DeviceUtilities.isAndroid()) {
      return this.updateUserStatus(OFFLINE, OUT_OF_APP);
    }

    this.sendAppOnTopInterval = this.$interval(() => {
      this.AppOnTop.get()
        .then(this.updateOfflineStatus.bind(this))
        .catch((e) => {
          console.error(`get app on top failed ${e}`);
          this.updateOfflineStatus();
        });
    }, this.StatusUpdateTimeout);
  }

  private stopStatusReporting() {
    if (this.sendAppOnTopInterval) {
      this.$interval.cancel(this.sendAppOnTopInterval);
    }
  }

  private reportOnlineStatus() {
    
    this.lastAppName = null;
    this.isOffline = false;
    this.stopStatusReporting();
    this.updateUserStatus(ONLINE, null);
  }

  private reportUserStatus(status, appName) {
    var statusResource = new this.StatusResource();
    statusResource.id = this.CurrentUser.get().id;
    statusResource.sessionId = this.sessionId;
    statusResource.appName = appName;
    statusResource.status = status;
    statusResource.$save();

    this.SocketIO.emit(this.sessionId, 'memberStatusChanged', statusResource);
  }

  private updateUserStatus(status, appName) {
    if (status !== this.lastUserStatus || appName !== this.lastAppName) {
      this.lastUserStatus = status;
      this.lastAppName = appName;

      this.reportUserStatus(status, appName);
    }
  }
}
