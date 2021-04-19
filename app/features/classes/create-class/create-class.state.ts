import { IDialogRouter } from '../../../3rdparty/common/layout/services/NgDialogRouter';
import IQService = angular.IQService;
import { IStateServiceExtended } from '../../../3rdparty/common/decorators/StateDecorator';
import { CurrentUser } from '../../../3rdparty/common/services/CurrentUser';

class CreateClassCtrl {
  classInfo: any = {};
  subjects: Array<any>;
  private user;
  isDuplicateClassRequest;
  srcClassCode: string;
  isOfflineMode = false;

  /*@ngInject*/
  constructor(private ClassesStore, CurrentUser: CurrentUser, private $state: IStateServiceExtended,
    private ngDialogRouter: IDialogRouter, private ClassesValues, private $q: IQService, $scope, private ENV) {
    this.user = CurrentUser.get();
    this.subjects = $scope['subjects'];

    this.isOfflineMode = ENV.isOffline || false;
  }

  descriptionValidate() {
    var isTooLong = (this.classInfo.desc && this.classInfo.desc.length > this.ClassesValues.descriptionMaxLength);
    if (isTooLong) {
      this.classInfo.desc = this.classInfo.desc.slice(0, this.ClassesValues.descriptionMaxLength);
    }
    return isTooLong;
  }

  codeValidate() {
        var isTooLong = (this.classInfo.code && this.classInfo.code.length > 10);
    if (isTooLong) {
      this.classInfo.code = this.classInfo.code.slice(0, 10);
    }
     return /^[a-z0-9\u0590-\u05fe]+$/i.test(this.classInfo.code);
  }

  validate(): string {
    var isValid = angular.isDefined(this.classInfo.subjectId) && angular.isDefined(this.classInfo.code);

    if (!isValid) {
      return 'create_class_illegal_params';
    }

    else if (!this.codeValidate()) {
      return 'bad_class_name_character';
    }

    return null;
  }

  duplicate() {
    return this.ClassesStore.duplicate(this.classInfo, this.user, this.srcClassCode)
    .then(({id}) => {
      this.close();
      this.$state.go('class', { classId: id })
    })
    .catch((err) => {
      if (err.status == 400 && err.data.error) {
        return this.$q.reject(err.data.error);
      }
      else {
        return this.$q.reject('generic_error');
      }
    });
  }

  create() {
    if (this.isDuplicateClassRequest && this.srcClassCode != "") {
      return this.duplicate();
    }

    return this.ClassesStore.create(this.classInfo, this.user)
      .then(({id}) => {
        this.close();
        this.$state.go('class', { classId: id })
          // .then(() => {});
      })
      .catch(() => this.$q.reject('class_name_exist_error'));
  }

  close() {
    this.ngDialogRouter.close('classes.create.class');
  }

  changeSubject({subject}) {
    this.classInfo.subjectId = subject;
  }
}

const template = `
<form class="add-class create">
  <img src="images/add_class.png"/>
  <header>{{'create_class' | translate}}</header>
  <subject-picker on-change="$ctrl.changeSubject($event)" subjects="$ctrl.subjects" ng-hide="$ctrl.isOfflineMode"></subject-picker>
    <input type="text" 
         placeholder="קוד מפגש" ng-model="$ctrl.classInfo.code"
         ng-change="$ctrl.codeValidate()">
  <input type="text" ng-model="$ctrl.classInfo.desc" ng-change="$ctrl.descriptionValidate()"
         placeholder="{{'create_class_desc' | translate}}">
         <span style="    text-align: right;
         direction: rtl;
         display: inherit;
         font-size: 14px;">קוד המפגש יכול להכיל עד 10 תווים ויכול להכיל רק אותיות באנגליות, בעברית וספרות</span>
  
  <label style="margin-top: 1em;
  font-size: 16px;  text-align: right;
  direction: rtl; display: inherit;">
  
    <input type="checkbox" 
      value="1"
      ng-model="$ctrl.isDuplicateClassRequest" 
      ng-init="$ctrl.showDuplicateClassInput=false" 
      ng-change="$ctrl.showDuplicateClassInput = !$ctrl.showDuplicateClassInput"
      style="width: auto;
      display: inline;
      height: auto;
      -webkit-appearance: checkbox !important;">{{'duplicate_class' | translate}}
      
  </label>
  <input type="text" ng-show="$ctrl.showDuplicateClassInput" ng-model="$ctrl.srcClassCode" placeholder="{{'duplicate_class_enter_code' | translate}}">
  <span ng-show="$ctrl.showDuplicateClassInput" style="text-align: right;
         direction: rtl;
         display: inherit;
         font-size: 14px;">{{'duplicate_class_code_instructions' | translate}}</span>

  <footer>
    <button class="secondary action-button" ng-click="$ctrl.close()" type="button">{{'close' | translate}}</button>
    <click-once-button class="primary action-button" is-valid="$ctrl.validate()" on-click="$ctrl.create()">
      <span>{{'create' | translate}}</span>
      <loader></loader>
    </click-once-button>
  </footer>
</form>
`;

export class CreateClassState {
  template = template;
  controller = CreateClassCtrl;
  controllerAs = '$ctrl';
}
