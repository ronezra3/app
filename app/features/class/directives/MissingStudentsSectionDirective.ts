import {CurrentSession} from '../../session/services/CurrentSession';
import {Localytics} from '../../common/services/Localytics';
const MAX_POPUP_CAPACITY = 9;

class MissingStudentsSectionController {
  arrowUp;
  appendClass;
  missingStudentsChanged;
  private popup;
  private missingCount;
  private attendanceManager;

  /*@ngInject*/
  constructor($rootScope, private $state, Popup, private MatchMediaWrapper, CurrentSession : CurrentSession,
              private Localytics : Localytics) {
    this.attendanceManager = CurrentSession.getAttendanceMgr();

    this.popup = new Popup(
      {template: require('./../templates/MissingStudentsPopover.html')},
      {appendClass: this.appendClass}
    );

    this.attendanceManager.onMissingMembersChanged(() => this.missingMembersChanged());

    $rootScope.$on('rightSidebarStateChanged', (event, isOpen) => {
      if (isOpen === false) {
        this.popup.close();
      }
    });

    CurrentSession.onEnding(() => {
      this.missingStudentsChanged = false;
      this.popup.close();
    });
  }

  $onInit() {
    this.updateMissingCount();
  }

  isOpen() {
    return this.popup.isOpen();
  }

  onClick() {
    this.missingStudentsChanged = false;

    if (this.shouldOpenInFullScreen()) {
      this.reportLeftSessionOpened();
      this.$state.go('missing', {
        classId: this.$state.params['classId']
      });
    } else {
      if (!this.popup.isOpen()) {
        this.Localytics.tagScreen('missing');
        this.reportLeftSessionOpened();
      }

      this.popup.toggle();
    }
  };

  $onDestroy() {
    this.popup.close();
  }

  private updateMissingCount() {
    this.missingCount = this.attendanceManager.getMissingCount();
  }

  private shouldOpenInFullScreen() {
    return this.missingCount > MAX_POPUP_CAPACITY
      || this.MatchMediaWrapper.isMiniTabletOrSmaller() || this.MatchMediaWrapper.isPortrait();
  }

  private missingMembersChanged() {
    this.missingStudentsChanged = true;
    this.updateMissingCount();

    if (this.isOpen()) {
      if (this.shouldOpenInFullScreen()) {
        this.popup.close();
        this.$state.go('missing', {
          classId: this.$state.params['classId']
        });
      } else if (this.missingCount === 0) {
        this.popup.close();
      }
    }
  }

  private reportLeftSessionOpened() {
    this.Localytics.tagEvent('Left Session Opened', {missingCount: this.missingCount});
  }
}

const template = `
<button ng-disabled="!$ctrl.missingCount"
    class="{{$ctrl.appendClass}}"
    ng-class="{selected: $ctrl.isOpen(), notification: $ctrl.missingStudentsChanged && ($ctrl.missingCount > 0)}"
    ng-click="$ctrl.onClick()">
  <ng-transclude></ng-transclude>
  <span class="number-icon">{{$ctrl.missingCount || 0}}</span>
  <span class="text">{{'left_session' | translate}}</span>
</button>
`;

export class MissingStudentsSection {
  template = template;
  controller = MissingStudentsSectionController;
  transclude = true;
  bindings : any = {
    appendClass: '@'
  };
}
