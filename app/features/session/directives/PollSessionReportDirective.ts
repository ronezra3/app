const template = `
<session-report-book-location ng-if="poll.bookInfo" book="poll.bookInfo.book"
                              pages="[poll.bookInfo.pageNumber]">
</session-report-book-location>

<section class="poll-session-report-title">{{poll.question || 'default-poll-title' | translate}}</section>

<replied-number class="poll-session-report-replied-number" replied="poll.getVoters().length"
                activity="poll"></replied-number>
<poll-answers-chart class="poll-session-report-answers" activity="poll" is-playing="false"></poll-answers-chart>
`;

export function PollSessionReport() {
  return {
    restrict: 'E',
    scope: {
      poll: '=activity'
    },
    template: template
  };
}
