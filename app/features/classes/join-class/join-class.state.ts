import { CurrentUser } from '../../../3rdparty/common/services/CurrentUser';
import { IStateServiceExtended } from '../../../3rdparty/common/decorators/StateDecorator';
import IQService = angular.IQService;
import { IDialogRouter } from '../../../3rdparty/common/layout/services/NgDialogRouter';
import { SessionJoinPopupService } from '../../session/session-join-popup/session-join-popup.service';
import { SessionProxy } from '../../session/services/SessionProxy';
import { StudentSessionService } from '../../session/services/StudentSessionService';

class JoinClassCtrl {
  code: string;

  /*@ngInject*/
  constructor(private ClassesStore, private CurrentUser: CurrentUser, private ngDialogRouter: IDialogRouter,
    private SessionProxy: SessionProxy, private $state: IStateServiceExtended, private $q: IQService,
    private SessionJoinPopupService: SessionJoinPopupService, private StudentSessionService) {
  }

  join() {
    return this.ClassesStore.join(this.code, this.CurrentUser.get())
      .then(({ id }) => {
        this.close();
        // this.$state.go('learn.books', )
        this.$state.go(`learn.reader.svg`, { bookId: 2, classId: id })
          .then(() => this.StudentSessionService.join(id))
        // .then(() => this.joinSessionPopupHandler(id));
      })
      .catch(() => this.$q.reject('join_class_error'));
  }

  validate(): string {
    if (!this.code) {
      return 'join_class_empty_code';
    }

    return null;
  }

  close() {
    this.ngDialogRouter.close('classes.join.class');
  }

  private joinSessionPopupHandler(classId) {
    this.SessionProxy.getCurrent(classId).then(activeSession => this.SessionJoinPopupService.open(activeSession));
  }
}

const template = `
<form class="add-class join">
  <img src="images/add_class.png"/>
  <header>
    <div>{{'join_class' | translate}}</div>
    <div class="sub-header">{{'enter_digits' | translate}}</div>
  </header>
  <input type="text" ng-model="$ctrl.code" placeholder="• • • • •"/>
  <footer>
    <click-once-button class="primary action-button" on-click="$ctrl.join()" is-valid="$ctrl.validate()">
      <span>{{'join' | translate}}</span>
      <loader></loader>
    </click-once-button>
    <click-once-button class="secondary action-button" on-click="$ctrl.close()">
    <span>{{'close' | translate}}</span>
  </click-once-button>
  </footer>
</form>
`;
// <button class="secondary action-button" ng-click="$ctrl.close()" type="button">{{'close' | translate}}</button>

export class JoinClassState {
  template = template;
  controller = JoinClassCtrl;
  controllerAs = '$ctrl';
}
