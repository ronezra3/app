class AssessTimePickerController {
  public assess;
  private isNull = false;
  private duration;

  /*@ngInject*/
  constructor(private moment, AssessValues) {
    this.assessMinutes((this.assess.time / 60) || AssessValues.defaultDurationMin);
  }

  assessMinutes(minutes) {
    if (angular.isDefined(minutes)) {
      this.isNull = (minutes === null);
      this.duration = this.moment.duration({minutes: minutes});
      this.assess.time = this.duration.asSeconds();
    }

    return this.isNull ? null : this.duration.asMinutes();
  };


  onFocus($event) {
    $event.target.select();
  }
}

export class AssessTimePicker {
  controller = AssessTimePickerController;
  template = require('./../templates/assess-time-picker.html');
  bindings : any = {
    assess: '<'
  };
}
