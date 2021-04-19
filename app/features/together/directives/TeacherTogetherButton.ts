import { CurrentSession } from '../../session/services/CurrentSession';
import IRootScopeService = angular.IRootScopeService;
import { CurrentBook } from '../../books/services/CurrentBook';
import { IStateServiceExtended } from '../../../3rdparty/common/decorators/StateDecorator';
import { TogetherEventsRouter } from '../services/TogetherEventsRouter';

class TeacherTogetherController {
  popup: any;
  togetherEnabled: () => boolean = this.Together.isInTogether;
  private members: Array<any>;

  /*@ngInject*/
  constructor(private CurrentSession: CurrentSession, private UsersStore, private Localytics, private Together,
    private TogetherEventsRouter: TogetherEventsRouter, private Popup, private $rootScope: IRootScopeService,
    private CurrentBook: CurrentBook, private $state: IStateServiceExtended) {
    UsersStore.query({ classId: $state.params['classId'] }).then((members) => this.members = members);
  }

  $onInit() {
    this.Together.update();
    let requestingUserId = this.getRequestingUserId();
    if (requestingUserId) {
      this.openPopup(requestingUserId);
    }

    this.$rootScope.$on('sessionEnding', this.close.bind(this));
    this.TogetherEventsRouter.onGranted(this.close.bind(this));
    // this.TogetherEventsRouter.onRequestCanceled(this.close.bind(this));
    this.$rootScope.$on('rightSidebarStateChanged', (event, isOpen) => {
      if (isOpen === true) {
        let requestingUserId = this.getRequestingUserId();
        if (requestingUserId) {
          this.openPopup(requestingUserId);
        }
      } else {
        this.close();
      }
    });

    this.TogetherEventsRouter.onRequested((requestingUserId) => {
      if (this.popup) {
        this.popup.close();
      }
      this.openPopup(requestingUserId);
    });
  }

  $onDestroy() {
    if (this.popup) {
      this.popup.close();
    }
  }

  toggle() {
    // return;
    if (this.Together.isInTogether()) {
      this.Localytics.tagEvent('Together Deactivated');
      this.Together.deactivate();
    } else {
      this.Localytics.tagEvent('Together Activated');
      if (this.$state.includes('teach.reader')) {
        this.Together.update(this.$state.params['bookId'], this.CurrentBook.pageUrl);
      } else {
        this.Together.update();
      }
    }
  }

  getController() {
    if (!this.Together.isInTogether()) {
      return;
    }

    if (this.Together.inControl()) {
      return 'with_me';
    }

    let controller = this.Together.getController(this.members);
    if (controller) {
      return controller.getFullName();
    }
  };

  private getRequestingUserId() {
    let currentSession = this.CurrentSession.getInfo();
    return (currentSession && currentSession.together.requestingUserId) ? currentSession.together.requestingUserId : null;
  }

  private openPopup(requestingUserId) {
    this.UsersStore.get(requestingUserId).then((user) => {
      this.popup = new this.Popup({
        template: require('./../templates/together-request-popup.html')
      }, {
          askingStudent: user,
          onAccept: this.accept.bind(this),
          onDecline: this.decline.bind(this)
        });

      this.popup.open();
    });
  }

  private accept() {
    this.Localytics.tagEvent('Together Request Approved');
    this.Together.give();
    if (this.popup) {
      this.popup.close();
    }
  }

  private decline() {
    this.Localytics.tagEvent('Together Request Denied');

    this.Together.cancelRequest();
    if (this.popup) {
      this.popup.close();
    }
  }

  private close() {
    if (this.popup) {
      this.popup.close();
    }
  }
}

const template = `
<button ng-click="$ctrl.toggle()" class="panel-button {{$ctrl.togetherEnabled() ? 'selected' : ''}}" ng-disabled="true">
  <ng-include src="'images/panel/icons/together.png'"></ng-include>
  <span class="text">{{ ($ctrl.togetherEnabled() ? $ctrl.getController() : 'together') | translate}}</span>
</button>
`;

export class TeacherTogetherButton {
  template = template;
  controller = TeacherTogetherController;
}
