const template = `
<session-report-book-location ng-if="idea.bookInfo" book="idea.bookInfo.book"
                              pages="[idea.bookInfo.pageNumber]">
</session-report-book-location>

<section class="ideas-session-report-title">{{idea.title || 'default-ideas-title' | translate}}</section>

<replied-number class="ideas-session-report-replied-number" replied="idea.associations.length"
                activity="idea"></replied-number>

<most-popular-words class="ideas-most-popular-words-background" activity="idea"
                    is-playing="false"></most-popular-words>

<div style="overflow-y: scroll; height: 150px; direction: rtl;">
  <div ng-repeat="item in idea.associations">
    <p>
      <b>{{item.userName}}: </b> {{item.association}}
    </p>
  </div>
</div>

`;

export function IdeasSessionReport() {
  return {
    restrict: 'E',
    scope: {
      idea: '=activity'
    },
    template: template
  };
}
