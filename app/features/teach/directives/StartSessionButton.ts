const template = `
<button ng-click="$ctrl.next()">
  <span>{{'start-session' | translate}}</span>
</button>
`;
// <ng-include class="pressed" src="'images/start-session-pressed.svg'"></ng-include>
// <ng-include class="standby" src="'images/start-session.svg'"></ng-include>
export class StartSessionButton {
  template = template;
  bindings : any = {
    next: '&'
  };
}
