const template = `
  <activity-header type="snapshot" field="$ctrl.activity.question"></activity-header>
  <yes-no-donut class="narrow" activity="$ctrl.activity" is-playing="$ctrl.isPlaying"></yes-no-donut>
`;

export class SnapshotResultsContent {
  template = template;
  bindings : any = {
    activity: '<',
    isPlaying: '<'
  };
}
