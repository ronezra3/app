import LoDashStatic = _.LoDashStatic;

export class CurrentBookActivities {
  private bookActivities : Array<any>;
  private bookId;

  public TEMP_ActivityJustFinished = [];

  /*@ngInject*/
  constructor(private BookActivity, private lodash : LoDashStatic) {
  }

  init(bookId : string, classId : string) {
    return this.BookActivity.query({bookId: bookId, classId: classId}).$promise
      .then((bookActivities) => {
        this.bookActivities = bookActivities;
        this.bookId = bookId;
      });
  }

  get() {
    return this.bookActivities;
  }

  getBookId() {
    return this.bookId;
  }

  add(activity) {
    this.bookActivities.push(activity);
  }

  remove(id : string) {
    this.lodash.remove(this.bookActivities, {activityId: id});
  }

  findOneByActivityId(id) {
    return this.lodash.find(this.bookActivities, {activityId: id});
  }

  findOneByTypeAndPage(type, pageUrl) {
    return this.lodash.find(this.bookActivities, {
      pageUrl: pageUrl.toString(),
      activityType: type
    });
  }

  clear() {
    this.bookActivities = undefined;
  }
}
