import {CurrentSession} from '../../session/services/CurrentSession';
import {TogetherEventsRouter} from '../services/TogetherEventsRouter';
import {Localytics} from '../../common/services/Localytics';
import {CurrentUser} from '../../../3rdparty/common/services/CurrentUser';

class StudentTogetherController {
  members : Array<any>;
  popup;
  teacher;
  inControl : () => boolean = this.Together.inControl;
  togetherEnabled : () => boolean = this.Together.isInTogether;

  /*@ngInject*/
  constructor(private Together, private CurrentUser : CurrentUser, Popup, private CurrentSession : CurrentSession,
              private TogetherEventsRouter : TogetherEventsRouter, private Localytics : Localytics) {
    this.popup = new Popup({template: require('./../../together/templates/requested-popup.html')});
  }

  $onInit() {
    // this.TogetherEventsRouter.onRequestCanceled(this.popup.close.bind(this.popup));
    this.TogetherEventsRouter.onGranted(this.popup.close.bind(this.popup));
    this.CurrentSession.onEnding(this.popup.close.bind(this.popup));
  }

  $onDestroy() {
    this.popup.close();
  }

  getController() {
    if (!this.Together.isInTogether()) {
      return;
    }

    if (this.Together.inControl()) {
      return 'me';
    }

    var classMembers = this.members.concat([this.teacher]);
    var controller = this.Together.getController(classMembers);
    if (controller) {
      return controller.getFullName();
    }
  }

  togetherRequested() {
    let session = this.CurrentSession.getInfo();
    return session.together.requestingUserId === this.CurrentUser.get().id;
  }

  toggle() {
    if (this.togetherRequested()) {
      this.Localytics.tagEvent('Student Cancelled Together Request');
      this.popup.close();
      this.Together.cancelRequest();
    } else if (this.Together.inControl()) {
      this.Localytics.tagEvent('Student Deactivated Together');
      this.Together.deactivate();
    } else {
      this.Localytics.tagEvent('Student Requested Together');
      this.popup.open();
      this.Together.request();
    }
  }
}

const template = `
<button ng-disabled="true" ng-click="$ctrl.toggle()"
  class="panel-button {{$ctrl.togetherEnabled() ? 'selected' : ''}}">
  <ng-include src="'images/panel/icons/together.png'"></ng-include>
  <div class="text">{{ ($ctrl.togetherEnabled() ? $ctrl.getController() : 'together') | translate}}</div>
</button>
`;

export class StudentTogetherButton {
  template = template;
  controller = StudentTogetherController;
  bindings : any = {
    members: '<',
    teacher: '<'
  };
}
