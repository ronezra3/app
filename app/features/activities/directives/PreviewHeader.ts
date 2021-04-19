import {CurrentBook} from '../../books/services/CurrentBook';
import {IStateParamsService} from 'angular-ui-router';


class PreviewHeaderController {
  currentPage;

  /*@ngInject*/
  constructor(CurrentBook : CurrentBook, $stateParams : IStateParamsService) {
    
    if ($stateParams['pageUrl'] && CurrentBook.info.isSvg()) {
      this.currentPage = $stateParams['pageUrl'];
    }
    
  //  this.activity.anonymousValue = false;
  
  
  }

  
}

const template = `
<header class="activity-header narrow">
  <ng-include class="icon" src="'images/panel/icons/' + $ctrl.type + '.png'"></ng-include>




  <div class="input-wrapper" ng-transclude="input">
    <input class="activity-input-long" name="{{$ctrl.fieldName}}" type="text"
           autocomplete="off"
           style="direction: RTL"
           ng-model="$ctrl.activity[$ctrl.fieldName]"
           ng-required="$ctrl.isRequired"
           placeholder="{{($ctrl.isRequired ? $ctrl.type + '-placeholder' : 'default-' + $ctrl.type + '-title') | translate}}"/>
  </div>
  <div class="activity-additional-info">
    <span class="validation-message-error"
          ng-show="$ctrl.form[$ctrl.fieldName].$error.required &&
          $ctrl.form[$ctrl.fieldName].$touched">
      {{'required-field' | translate}}
    </span>
    <span ng-transclude="additionalValidators"></span>

    <content-location current="{{$ctrl.currentPage}}" class="preview-page-number" ng-if="$ctrl.currentPage"></content-location>
  </div>
</header>
`;

export class PreviewHeader {
  controller = PreviewHeaderController;
  template = template;
  transclude : any = {
    input: '?previewHeaderInput',
    additionalValidators: '?previewHeaderAdditionalValidators'
  };

  bindings : any = {
    type: '@',
    fieldName: '@',
    activity: '<',
    form: '<',
    isRequired: '<?'
  };
}
