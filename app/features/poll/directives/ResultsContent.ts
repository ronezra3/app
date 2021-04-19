const template = `
  <activity-header type="poll" field="$ctrl.activity.question"></activity-header>
  <replied-number replied="$ctrl.activity.getVoters().length"
                    is-playing="$ctrl.isPlaying" activity="$ctrl.activity"></replied-number>
  <div class="narrow">
    <poll-answers-chart activity="$ctrl.activity" is-playing="$ctrl.isPlaying"></poll-answers-chart>
  </div>
`;

export class PollResultsContent {
  template = template;
  bindings : any = {
    activity: '<',
    isPlaying: '<'
  };
}
