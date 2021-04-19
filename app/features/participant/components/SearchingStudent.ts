import LoDashStatic = _.LoDashStatic;
import IIntervalService = angular.IIntervalService;

const ANIMATION_ITEMS = 25;
const ANIMATION_SPEED = 2 * 1000;
const ANIMATION_END = 3; //loop 6 sec

class SearchingStudentController {
  studentsScriptIds: Array<string>;
  searchInterval;
  onDone: () => void;
  current;
  members: Array<any>;
  counter = 0;
  studentsScriptIdsTemp = [];

  /*@ngInject*/
  constructor(private lodash: LoDashStatic, private $interval: IIntervalService) {
  }

  getAnimationItems() {
    return this.lodash.range(1, ANIMATION_ITEMS);
  }

  $onInit() {
    this.studentsScriptIdsTemp = [...this.studentsScriptIds];
    this.update();
    this.searchInterval = this.$interval(this.update.bind(this), ANIMATION_SPEED);
  }

  $onDestroy() {
    this.stop();
  }

  private stop() {
    this.$interval.cancel(this.searchInterval);
  }

  private update() {
    if (this.studentsScriptIdsTemp.length === 0) {
      this.studentsScriptIdsTemp = [...this.studentsScriptIds]; // copy by value
    }

    if (this.counter === 3) {
      this.stop();
      return this.onDone();
    }
    let studentId = this.studentsScriptIdsTemp[Math.floor(Math.random() * this.studentsScriptIdsTemp.length)];
    let index = this.studentsScriptIdsTemp.indexOf(studentId);
    this.studentsScriptIdsTemp.splice(index, 1);
    this.counter++;
    return this.current = this.lodash.find(this.members, { id: studentId });
  }
}



const template = `
<section class="searching-student">
  <div class="participant-animation-items">
    <div class="participant-animation-item" ng-repeat="n in $ctrl.getAnimationItems()">
      <ng-include src="'images/participant/participant' + n % 4 + '.png'"></ng-include>
    </div>
  </div>
  <img class="current-student-image" csp-src="{{$ctrl.current.getAvatarUrl()}}"/>
</section>
<h1 class="current-student">{{$ctrl.current.getFullName()}}</h1>
`;

export class SearchingStudent {
  controller = SearchingStudentController;
  template = template;
  bindings: any = {
    studentsScriptIds: '<',
    members: '<',
    onDone: '&'
  };
}
