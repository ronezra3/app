class PlanReaderController {
  activities = this.ENV.teacher.activities;

  /*@ngInject*/
  constructor(private ENV) {
  }
}

const template = `
<side-bars class="plan">
  <side-bars-content>
    <ui-view></ui-view>
  </side-bars-content>

  <right-side-bar>
    <panel>
      <panel-content>
        <activities-section activities="$ctrl.activities" mode="enrich"></activities-section>
      </panel-content>
    </panel>
  </right-side-bar>
</side-bars>
`;

export class PlanReaderState {
  controller = PlanReaderController;
  url = '/reader/:bookId';
  template = template;
  abstract = true;
  controllerAs = '$ctrl';
}
