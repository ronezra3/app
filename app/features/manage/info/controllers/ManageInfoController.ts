import IQService = angular.IQService;
import { IStateServiceExtended } from '../../../../3rdparty/common/decorators/StateDecorator';
import IRootScopeService = angular.IRootScopeService;
import LoDashStatic = _.LoDashStatic;
import { CurrentUser } from '../../../../3rdparty/common/services/CurrentUser';

class ManageInfoController {
  classInfo: any;

  /*@ngInject*/
  constructor(private ClassesStore, $state: IStateServiceExtended, private $q: IQService,
    private $rootScope: IRootScopeService, private lodash: LoDashStatic, private ClassesValues, public subjects) {
    ClassesStore.get($state.params['classId']).then((classInfo) => this.classInfo = classInfo);
  }

  descriptionValidate() {
    var isTooLong = (this.classInfo.desc.length > this.ClassesValues.descriptionMaxLength);
    if (isTooLong) {
      this.classInfo.desc = this.classInfo.desc.slice(0, this.ClassesValues.descriptionMaxLength);
    }
    return isTooLong;
  }

  saveChanges() {
    // return this.classInfo.validate()
    //   .then((error) => {
    //     if (error) {
    //       return this.$q.reject(error);
    //     }

    return this.ClassesStore.update(this.classInfo)
      .then(() => this.$rootScope.$broadcast('classInfoChanged', this.lodash.clone(this.classInfo)));
    // });
  }

  changeSubject({subject}) {
    this.classInfo.subjectId = subject;
  }
}

const template = `
<view class="beige-view">
  <content class="manage-info" scrollable="true">
    <div class="info-code">
      <ng-include src="'images/manage/lock_icon.png'"></ng-include>
      <span>{{$ctrl.classInfo.code}}</span>
    </div>
    <div class="info-share-code">{{'share_the_code' | translate}}</div>

    <fieldset class="info-class-details">
      <legend class="info-class-details-title">{{'class_details' | translate}}</legend>
      <subject-picker model="$ctrl.classInfo.subject.id" subjects="$ctrl.subjects" on-change="$ctrl.changeSubject($event)"></subject-picker>
      <input type="text" ng-model="$ctrl.classInfo.desc" ng-change="$ctrl.descriptionValidate()"
             placeholder="{{'manage-description-placeholder' | translate}}"/>
      <click-once-button class="primary action-button" on-click="$ctrl.saveChanges()" enable-on-success="true">
        <span>{{'save_changes' | translate}}</span>
        <loader></loader>
      </click-once-button>
    </fieldset>
  </content>
</view>
`;

export class ManageInfoState {
  url = '/info';
  public controller = ManageInfoController;
  controllerAs = '$ctrl';
  template = template;
  resolve = {
    /*@ngInject*/
    subjects: (SubjectsProxy, CurrentUser: CurrentUser) => SubjectsProxy.query({ id: CurrentUser.get().id }).$promise
  };
}

