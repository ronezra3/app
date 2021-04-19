class GotoPageController {
  public isFocus = false;
  public setPage;
  public numberOfPages;
  public isDisabled;
  public pageNumber;
  private isNull = false;

  focusChange(boolValue, $event) {
    this.isFocus = boolValue;
    if (boolValue === true) {
      $event.target.select();
    }
  }

  navigateTo(page) {
    if (angular.isDefined(page)) {
      this.isNull = (page === null);
      if (!this.isNull) {
        this.setPage({page: page});
      }
    }

    if (!this.isNull || !this.isFocus) {
      return this.pageNumber;
    }
  }
}

const template = `
<label for="currentPage" ng-class="{active : $ctrl.isFocus, enabled: !$ctrl.isDisabled()}">
  <input id="currentPage" ng-disabled="$ctrl.isDisabled()" type="number" min="1"
         max="{{$ctrl.numberOfPages}}" ng-model="$ctrl.navigateTo" ng-model-options="{ getterSetter: true }"
         ng-class="{'input-active' : $ctrl.isFocus}" ng-focus="$ctrl.focusChange(true, $event)"
         ng-blur="$ctrl.focusChange(false, $event)"/>
  <span>{{$ctrl.numberOfPages}}</span>
</label>
`;

export class GotoPage {
  template = template;
  controller = GotoPageController;
  bindings : any = {
    pageNumber: '<',
    isDisabled: '&',
    numberOfPages: '<',
    setPage: '&'
  };
}
