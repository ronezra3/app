const template = `
<session-report-book-location ng-if="snapshot.bookInfo" book="snapshot.bookInfo.book"
                              pages="[snapshot.bookInfo.pageNumber]">
</session-report-book-location>

<section class="snapshot-session-report-title">{{snapshot.question || 'default-snapshot-title' | translate}}</section>

<replied-number class="snapshot-session-report-replied-number" replied="snapshot.getVoters().length"
                activity="snapshot"></replied-number>

<div class="session-report-snapshot-vote">
  <span class="snapshot-session-report-no">{{snapshot.no.length}}</span>
  <svg-icon class="snapshot-session-report-icon no" src="images/snapshot/one_hand_no.png"></svg-icon>
  <svg-icon class="snapshot-session-report-icon yes" src="images/snapshot/one_hand_yes.png"></svg-icon>
  <span class="snapshot-session-report-yes">{{snapshot.yes.length}}</span>
</div>
`;

export function SnapshotSessionReport() {
  return {
    restrict: 'E',
    scope: {
      snapshot: '=activity'
    },
    template: template
  };
}
