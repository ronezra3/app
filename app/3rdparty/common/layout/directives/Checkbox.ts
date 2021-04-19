class CheckboxCtrl {
  onChange : (value : any) => any;
  state = false;

  valueGetterSetter(value) {
    if (angular.isUndefined(value)) {
      return this.state;
    }

    this.onChange({value: value});
    this.state = value;
  }
}

const template = `
<input type="checkbox" ng-model="$ctrl.valueGetterSetter" ng-model-options="{ getterSetter: true }" name="{{$ctrl.name}}" id="{{$ctrl.name}}">
<label for="{{$ctrl.name}}">
  <span class="fake-checkbox"><ng-include src="'images/v_icon2.png'"></ng-include></span>
  <ng-transclude></ng-transclude>
</label>
`;

export class Checkbox {
  controller = CheckboxCtrl;
  template = template;
  transclude = true;
  bindings : any = {
    onChange: '&',
    name: '@'
  };
}
