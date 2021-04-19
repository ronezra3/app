import IComponentOptions = angular.IComponentOptions;

// require('./join-button.scss');

const template = `
<click-once-button on-click="$ctrl.join()">
  <img class="standby" src="images/join_session.png">
  <img class="pressed" src="images/join_session.png">
  <span class="full-text">{{'join-session-button-text' | translate}}</span>
  <span class="short-text">{{'join_session' | translate}}</span>
  <loader></loader>
</click-once-button>
`;

export class JoinButton implements IComponentOptions {
  public template : string = template;
  public bindings : any = {
    join: '&'
  };
}
