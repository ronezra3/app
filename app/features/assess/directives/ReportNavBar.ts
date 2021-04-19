const template = `
<navigation-bar>
    <left-buttons>
      <back-button></back-button>
    </left-buttons>

    <nav-bar-title>
      <div>{{$ctrl.activity.title || ('default-assess-title' | translate)}}</div>
    </nav-bar-title>

    <right-buttons>
      <button class="header-button form-button" ui-sref="assess-form({activityId: $ctrl.activity.id})" ng-click="">
        <ng-include class="header-icon" src="'images/assess/assess_preview_icon.png'"></ng-include>
        <span class="header-text">{{'form' | translate}}</span>
      </button>
    </right-buttons>
  </navigation-bar>
  `;

export class AssessReportNavBar {
  template = template;
  bindings : any = {
    activity: '<'
  };
}
