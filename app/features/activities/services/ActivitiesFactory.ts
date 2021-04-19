import {CurrentBook} from '../../books/services/CurrentBook';
import LoDashStatic = _.LoDashStatic;
import {CurrentBookActivities} from '../../books/services/CurrentBookActivities';

export class Activities {
  /*@ngInject*/
  constructor(private Utilities, private SocketIO, private BookActivity, private lodash : LoDashStatic,
              private CurrentBook : CurrentBook, private CurrentBookActivities : CurrentBookActivities, private Attention,
              private Localytics, private ClassesStore, private $q, private CurrentSession, private CurrentUser) {

  }

  get(type, id) {
    return this.Utilities.getFactoryByName(type).get({id: id});
  }

  constructResource(type, data) {
    try {
      var Factory = this.Utilities.getFactoryByName(type);
      return new Factory(data);
    } catch (e) {
      return null;
    }
  }

  save(type, activity, classId, isContextual) {

    if (!isContextual || angular.isDefined(activity.id)) {
      activity.publishedCount = activity.publishedCount ? ++activity.publishedCount : 1;
      return activity.$save();
    }

    var bookId = this.CurrentBook.info.id;
    return this.ClassesStore.getByBookId(bookId).then((classes) => {
      var classIds = this.lodash.pluck(classes, 'id');

      return new this.BookActivity({
        bookId: bookId,
        pageUrl: this.CurrentBook.pageUrl,
        activity: activity,
        classIds: classIds,
        activityType: type
      }).$save({classId: classId})
        .then((bookActivity) => {
          this.CurrentBookActivities.add(bookActivity);
          activity.id = bookActivity.activityId;
          return activity;
        });
    });
  }

  publish(type, classId, activity, isContextual) {
    
    this.clearAttention();
    return this.save(type, activity, classId, isContextual).then(() => {
      let session = this.CurrentSession.getInfo();
      session.currentActivity = {
        id: activity.id,
        type: type,
        phase: 'play'
      };

      session.activities.push({id: activity.id, type: type});

      return session.$save().then(() => {
        let bookActivity : any = this.CurrentBookActivities.findOneByActivityId(activity.id);

        if (bookActivity) {
          bookActivity.published = true;
          return bookActivity.$save().then(() => {
            return this.emit(type, 'publish', activity);
          });
        }

        return this.emit(type, 'publish', activity);
      });
    });
  }

  share(type, activity) {
    let session = this.CurrentSession.getInfo();
    session.currentActivity = {
      id: activity.id,
      type: type,
      phase: 'results'
    };

    this.clearAttention();

    return this.$q.all([session.$save(), activity.$save()]).then(() => {
      this.emit(type, 'share', activity);

      this.Localytics.tagEvent('Activity Results Shared', {
        type: type
      });
    });
  }

  finish(type, activity) {
    let session = this.CurrentSession.getInfo();
    session.currentActivity = null;

    this.CurrentBookActivities.TEMP_ActivityJustFinished.push(activity.id);

    return this.$q.all([session.$save(), activity.$save()]).then(() => {
      this.emit(type, 'finish');
    });
  }

  submit(type, activity, response) {
    return activity.$submit(response).then(() => {
      response.userId = this.CurrentUser.get().id;
      this.emit(type, 'submit', response || activity);
    }).catch((err)=>{
        console.log(err);
    });
  }

  onPublished(type, callback) {
    return this.SocketIO.on(type + '.publish', (eventObj) => {
      callback(this.constructResource(type, eventObj));
    });
  }

  onShare(type, callback) {
    return this.SocketIO.on(type + '.share', (eventObj) => {
      callback(this.constructResource(type, eventObj));
    });
  }

  onSubmitted(type, callback) {
    return this.SocketIO.on(type + '.submit', callback);
  }

  onFinish(type, callback) {
    return this.SocketIO.on(type + '.finish', callback);
  }

  unSubscribe(type, event?) {
    if (event) {
      this.SocketIO.removeAllListeners(type + '.' + event);
    } else {
      this.SocketIO.removeAllListeners(type + '.publish');
      this.SocketIO.removeAllListeners(type + '.results.publish');
      this.SocketIO.removeAllListeners(type + '.submit');
      this.SocketIO.removeAllListeners(type + '.finish');
    }
  }

  query(type, ids) {
    var factory = this.Utilities.getFactoryByName(type);
    return factory.query({ids: ids}).$promise;
  }

  remove(activity) {
    let bookActivity = this.CurrentBookActivities.findOneByActivityId(activity.id);
    return bookActivity.$delete()
      .then(() => this.CurrentBookActivities.remove(activity.id));
  }

  reset(activity) {
    let bookActivity : any = this.CurrentBookActivities.findOneByActivityId(activity.id);
    let promises = [activity.$reset()];
    if (bookActivity) {
      bookActivity.published = false;
      promises.push(bookActivity.$save());
    }

    if (this.CurrentBookActivities.TEMP_ActivityJustFinished.indexOf(activity.id) > -1) {
      this.CurrentBookActivities.TEMP_ActivityJustFinished.splice(this.CurrentBookActivities.TEMP_ActivityJustFinished.indexOf(activity.id), 1);
    }

    return this.$q.all(promises);
  }

  private clearAttention() {
    let session = this.CurrentSession.getInfo();
    if (session.inAttention) {
      this.Attention.toggle(session);
    }
  }

  private emit(type, event, activity?) {
    console.log('emit')
    this.SocketIO.emit(this.CurrentSession.getInfo().id, `${type}.${event}`, activity);
    return activity;
  }
}
