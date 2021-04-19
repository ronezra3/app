export class ActivityTeachResultsController {
  isPlaying : boolean = this.$stateParams.isPlaying || false;
  disableSharing : boolean = this.$stateParams.disableSharing || false;

  /*@ngInject*/
  constructor(private $stateParams, public activity) {
  }

  postShareCallback() {
    this.isPlaying = false;
    this.disableSharing = true;
  }
}
