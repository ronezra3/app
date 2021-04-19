import {Activities} from '../../activities/services/ActivitiesFactory';
class PollAnswersChartController {
  activity;
  isPlaying;

  /*@ngInject*/
  constructor(private lodash, private Activities : Activities, private CurrentSession) {
  }

  $onInit() {
    if (this.isPlaying) {
      this.Activities.onSubmitted('poll', (vote) => {
        var answer = this.lodash.find(this.activity.answers, {id: vote.answerId});
        answer.voters.push(vote.userId);
      });
    }
  }

  getTotalCount() {
    return this.isPlaying ? this.CurrentSession.getAttendanceMgr().getAttendingCount() : this.activity.attendedCount;
  }
}

const template = `
<ul class="poll-answers-status">
  <li ng-repeat="answer in $ctrl.activity.answers">
    <poll-answer-status answer="answer" index="$index" total="$ctrl.getTotalCount()"></poll-answer-status>
  </li>
</ul>
`;

export class PollAnswersChart {
  controller = PollAnswersChartController;
  template = template;
  bindings : any = {
    activity: '<',
    isPlaying: '<'
  };
}
