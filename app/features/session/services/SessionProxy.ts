import IQService = angular.IQService;
import {ClassesStore} from '../../class/services/ClassesStore';
import {CurrentUser} from '../../../3rdparty/common/services/CurrentUser';
import LoDashStatic = _.LoDashStatic;
import IResource = angular.resource.IResource;

export interface ISession extends IResource<ISession> {
  id : string;
  classId : string;
  createdAt : string;
  together : any;
  endedAt : string;
  books: any[];
  inAttention: boolean;
  attended : string[];
  activities : any[];
}

export class SessionProxy {
  private SessionModel;

  private static transformResponse(data) {
    if (data) {
      var session = JSON.parse(data);
      if (!session.together) {
        session.together = {};
      }

      return session;
    }
  }

  /*@ngInject*/
  constructor(private $q : IQService, $resource, ENV, private lodash : LoDashStatic, private ClassesStore : ClassesStore,
              private CurrentUser : CurrentUser) {
    let baseUrl = `${ENV.apiEndpoint}/sessions/:id`;
    this.SessionModel = $resource(baseUrl, {id: '@id'}, {
      getCurrent: {
        method: 'GET',
        url: `${baseUrl}/current/:classId`,
        params: {classId: '@classId'},
        transformResponse: SessionProxy.transformResponse
      },
      getActive: {
        method: 'GET',
        url: `${baseUrl}/active`,
        transformResponse: SessionProxy.transformResponse,
        isArray: true
      },
      save: {
        method: 'POST',
        url: baseUrl,
        transformResponse: SessionProxy.transformResponse
      }
    });
  }

  start(classId) {
    return new this.SessionModel({classId: classId}).$save();
  }

  query(startDate, endDate, limit, classId) {
    return this.SessionModel.query({startDate: startDate, endDate: endDate, limit: limit, classId: classId}).$promise;
  }

  end(session) {
    session.endedAt = Date.now();
    return session.$save();
  }

  getCurrent(classId) {
    return this.SessionModel.getCurrent({classId: classId}).$promise.then(session =>
      session.id ? session : this.$q.reject());
  }

  public getActive() {
    return this.ClassesStore.query(this.ClassesStore.queryBuilder(this.CurrentUser.get()))
      .then(classes => this.SessionModel.getActive({classIds: classes.map(classObj => classObj.id)}).$promise)
      .then((activeSessions : ISession[]) =>
        activeSessions.length ?
          this.lodash.sortBy(activeSessions, session => new Date(session.createdAt))[activeSessions.length - 1] :
          this.$q.reject());
  }

  get(id) {
    return this.SessionModel.get({id: id});
  }
}
