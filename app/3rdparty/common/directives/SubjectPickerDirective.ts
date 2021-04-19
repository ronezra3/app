class SubjectPickerController {
  subjects;
  model = '1'; //Set the defualt of subject1 
  onChangeExternal;

  /*@ngInject*/
  constructor(private EventEmitter) {
  }

  $onChanges(changes) {
    if (changes.subjects) {
      this.subjects = angular.copy(this.subjects);
    }

    if (changes.model) {
      this.model = angular.copy(this.model);
    }
  }

  onChange() {
    this.onChangeExternal(this.EventEmitter({subject: this.model}));
  }
  
}

const template = `
<select  ng-init="$ctrl.onChange(20)" ng-model="$ctrl.model" ng-change="$ctrl.onChange()"
  ng-options="subject.id as subject.name | translate for subject in $ctrl.subjects | orderBy:'name'">
  <option value="" disabled>{{'subject' | translate}}>  </option>
</select>
<ng-include src="'3rdparty/common/images/arrow_down.png'"></ng-include>
`;

export class SubjectPicker {
  controller = SubjectPickerController;
  template = template;
  bindings : any = {
    model: '<',
    subjects: '<',
    onChangeExternal: '&onChange'
  };
}
