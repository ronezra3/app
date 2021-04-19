import {IStateParamsService} from 'angular-ui-router';
import {SessionProxy, ISession} from '../services/SessionProxy';
import {ClassesStore} from '../../class/services/ClassesStore';
import {UsersStore} from '../../users/services/UsersStore';
import {BooksStore} from '../../books/services/BooksStore';
import {Activities} from '../../activities/services/ActivitiesFactory';
import LoDashStatic = _.LoDashStatic;

export class SessionReportController {
  books;

  /*@ngInject*/
  constructor(private lodash, public activities, public session : ISession, public classInfo, books, public members) {
    this.books = lodash.filter(books, (book) => lodash.some(session.books, {id: book.id}));
  }

  getBookPages(book) {
    return this.lodash.find(this.session.books, {id: book.id}).pages;
  }
}

const template = `
<view class="session-report gray-view flex-view">
  <navigation-bar>
    <left-buttons>
      <back-button></back-button>
    </left-buttons>

    <nav-bar-title>
      <class-header-title class-info="$ctrl.classInfo" show-details="true"></class-header-title>
      <span class="session-report-title">{{'session-report' | translate}}</span>
      <span class="session-report-session-time">
        {{($ctrl.session.createdAt || Date.now()) | amDateFormat:'MM/DD/YY • h:m'}}- {{$ctrl.session.endedAt | amDateFormat:'h:m'}}
      </span>
    </nav-bar-title>

    <right-buttons>
      <button ng-click="" ui-sref="attendance({classId: $ctrl.classInfo.id, sessionId: $ctrl.session.id})">
        <ng-include src="'images/panel/icons/attending-online.png'"></ng-include>
        <span ng-if="$ctrl.members.length > 0">
          {{$ctrl.session.attended.length}}/{{$ctrl.members.length}} {{'attended' | translate}}
        </span>
      </button>
    </right-buttons>
  </navigation-bar>

  <content scrollable="true">

    <div class="session-report-books narrow">
      <session-report-book-location class="session-reports-book-location" ng-repeat="book in $ctrl.books"
                                    book="book" pages="$ctrl.getBookPages(book)">
      </session-report-book-location>
    </div>

    <session-report-section class="narrow" activities="$ctrl.activities.assess" class-id="$ctrl.classInfo.id"
                            type="assess"></session-report-section>

    <div class="narrow session-report-minor-activities-wrapper wrap-panel">
      <session-report-section activities="$ctrl.activities.snapshot"
                              type="snapshot"></session-report-section>
      <session-report-section activities="$ctrl.activities.ideas"
                              type="ideas"></session-report-section>
      <session-report-section activities="$ctrl.activities.poll"
                              type="poll"></session-report-section>
    </div>

  </content>
</view>
`;

export class SessionReportState {
  url = '/report/:sessionId';
  template = template;
  controller = SessionReportController;
  controllerAs = '$ctrl';
  resolve = {
    /*@ngInject*/
    session: ($stateParams : IStateParamsService, SessionProxy : SessionProxy) => SessionProxy.get($stateParams['sessionId']).$promise,
    /*@ngInject*/
    classInfo: (session : ISession, ClassesStore : ClassesStore) => ClassesStore.get(session.classId),
    /*@ngInject*/
    members: (session : ISession, UsersStore : UsersStore) => UsersStore.query({classId: session.classId}),
    /*@ngInject*/
    books: (session : ISession, BooksStore : BooksStore) => BooksStore.query({classId: session.classId}),
    /*@ngInject*/
    activities: (session : ISession, books, lodash : LoDashStatic, SessionReportValues, BookActivity, Activities : Activities) => {
      let sessionActivities = lodash.where(session.activities, (activity) =>
        lodash.contains(SessionReportValues.reportedActivitiesTypes, activity.type));

      if (!sessionActivities.length) {
        return true;
      }

      return BookActivity.query({activitiesIds: lodash.pluck(sessionActivities, 'id')}).$promise.then((bookActivities) => {
        let sessionActivitiesByType = lodash.groupBy(sessionActivities, 'type');

        let activitiesByType = {};

        lodash.forEach(sessionActivitiesByType, (value, type) => {
          let ids = lodash.pluck(value, 'id');

          Activities.query(type, ids).then((activities) => {
            lodash.each(activities, (activity : any) => {
              let bookActivity : any = lodash.find(bookActivities, {activityId: activity.id});
              if (bookActivity) {
                let book : any = lodash.find(books, {id: bookActivity.bookId});
                activity.bookInfo = {book: book};

                if (book.isSvg()) {
                  activity.bookInfo.pageNumber = bookActivity.pageUrl;
                }
              }
            });

            activitiesByType[type] = activities;
          });
        });

        return activitiesByType;
      });
    }
  };
}
