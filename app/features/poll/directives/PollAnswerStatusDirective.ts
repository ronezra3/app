const template = `
<div class="poll-answer-status-wrapper">
  <progress class="poll-answer-status-progress" ng-value="$ctrl.answer.voters.length" max="{{$ctrl.total}}"></progress>
  <span class="poll-answer-status-title">{{$ctrl.answer.title  || ($ctrl.index + 1 | numberToLetter | translate)}}</span>
  <span class="poll-answer-status-number">
    {{$ctrl.answer.voters.length}}
    <ng-include class="poll-answer-voters-icon" src="'images/poll/voters.svg'"></ng-include>
  </span>
</div>
`;

export class PollAnswerStatus {
  template = template;
  bindings : any = {
    answer: '<',
    index: '<',
    total: '<'
  };
}
