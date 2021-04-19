// import {ParticipantPlayResolver} from '../services/PlayResolver';

class ParticipantResultsContentController {
  activity;
  iAmTheChosenOne;
  chosenStudent;
  // chosenId;

  /*@ngInject*/
  constructor(lodash, CurrentUser, UsersStore, private Choosen) {
    this.initChosenUser(lodash, CurrentUser, UsersStore);

  }

  initChosenUser(lodash, CurrentUser, UsersStore) {
    const chosenId = this.Choosen.getChosenId();

    UsersStore.get(chosenId).then((user) => {
      this.chosenStudent = user;
    });

    this.iAmTheChosenOne = (CurrentUser.get().id === chosenId);
  }
}

const template = `
  <activity-header class="padded" type="participant" field="$ctrl.activity.instruction"></activity-header>
  <div class="selected-student">
    <div ng-hide="$ctrl.iAmTheChosenOne">
      <h1> {{$ctrl.chosenStudent.getFullName()}} {{'was_chosen' | translate}} </h1>
    </div>
    <div ng-show="$ctrl.iAmTheChosenOne">
      <h1>{{$ctrl.chosenStudent.getFullName()}}  {{'you_were_chosen' | translate}} </h1>  
    </div>
  </div>
  <img class="current-student-image" csp-src="{{$ctrl.chosenStudent.getAvatarUrl()}}"/>
`;

export class ParticipantResultsContent {
  controller = ParticipantResultsContentController;
  template = template;
  bindings: any = {
    activity: '<',
    // chosenId: '<'
  };
}
