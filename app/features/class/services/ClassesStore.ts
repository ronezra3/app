import { Store } from '../../common/services/Store';
import LoDashStatic = _.LoDashStatic;
import IQService = angular.IQService;

import * as lf from 'lf';
import IPromise = angular.IPromise;

export class ClassesStore extends Store {
  /*@ngInject*/
  constructor(ClassesProxy, $q: IQService, lodash: LoDashStatic, private CurrentUser) {
    super('classes', ClassesProxy, $q, lodash);
  }

  getByBookId(bookId: string) {
    return this.Proxy.query({ bookId: bookId, userId: this.CurrentUser.get().id }).$promise;
  }

  queryBuilder(user: any) {
    return {
      userId: user.id,
      type: user.isTeacher ? this.Proxy.classTypes.teaching : this.Proxy.classTypes.studying
    };
  }

  query(query): IPromise<Array<any>> {
    return super.query(query)
      .then((classes) => {
        // this.updateUserClasses(query.userId, classes);
        return classes;
      })
      .catch(() => {
        console.warn('cannot fetch classes data from server - offline mode');
        // return this.selectUserClasses(query.userId);
        return this.$q.reject();
      });
  }

  join(code: string, user) {
    var deferred = this.$q.defer();

    this.Proxy.join({ code: code.toLowerCase(), userId: user.id }).$promise
      .then((classInfo) => {
        deferred.resolve(new this.Proxy(classInfo));
        // this.upsertCache([classInfo])
        //   .then(() => this.lovefield.db()
        //     .then(db => this.insertUserClasses(db, db.getSchema().table('user_classes'), user.id, classInfo.id)));
      })
      .catch(deferred.reject);

    return deferred.promise;
  }

  create(classInfo, user) {
    return this.Proxy.create({ classInfo: classInfo, userId: user.id }).$promise
      .then((classInfo) => {
        // this.upsertCache([classInfo])
        //   .then(() => this.lovefield.db()
        //     .then((db) => this.insertUserClasses(db, db.getSchema().table('user_classes'), user.id, classInfo.id)));

        return new this.Proxy(classInfo);
      });
  }

  duplicate(classInfo, user, srcClassCode) {
    return this.Proxy.duplicate({ classInfo: classInfo, userId: user.id, srcClassCode: srcClassCode }).$promise
      .then((classInfo) => {
        return new this.Proxy(classInfo);
      });
  }

  update(classInfo) {
    return classInfo.$save()
      .then(() => {
        // this.upsertCache([classInfo]);
      });
  }

  public delete(classInfo, classId) {
    if (classInfo) {
      return classInfo.$delete()
    }
    else {
     return this.get(classId)
        .then(
          classInfo => {
            return classInfo.$delete()
          }
        );
    }
  }

  // private deleteUserClasses(db, table, userId : string, classId? : string) {
  //   let predicate;
  //   if (angular.isDefined(classId)) {
  //     predicate = lf.op.and(table.userId.eq(userId), table.classId.eq(classId));
  //   } else {
  //     predicate = table.userId.eq(userId);
  //   }

  //   return db.delete()
  //     .from(table)
  //     .where(predicate);
  // }

  // private insertUserClasses(db, table, userId : string, classes : Array<any>) {
  //   let rows = this.lodash.map(classes, (classInfo) => table.createRow({
  //     userId: userId,
  //     classId: classInfo.id
  //   }));

  //   return db
  //     .insert()
  //     .into(table)
  //     .values(rows);
  // }

  // private selectUserClasses(userId : string) {
  //   return this.lovefield.db().then((db) => {
  //     let userClassesTable = db.getSchema().table('user_classes');
  //     let classesTable = db.getSchema().table('classes');

  //     return db
  //       .select()
  //       .from(userClassesTable)
  //       .innerJoin(classesTable, classesTable.id.eq(userClassesTable.classId))
  //       .where(userClassesTable.userId.eq(userId))
  //       .exec()
  //       // The query results structure is: [{users: // ... usersClasses: // ...}]
  //       // Change the select params doesn't chane the structure.
  //       .then((results) => this.lodash.map(results, (elem : any) => new this.Proxy(elem.classes)));
  //   });
  // }

  // private updateUserClasses(userId : string, classes : Array<any>) {
  //   return this.lovefield.db().then((db) => {
  //     let userClassesTable = db.getSchema().table('user_classes');
  //     let transaction = db.createTransaction();

  //     return transaction.exec([this.deleteUserClasses(db, userClassesTable, userId), this.insertUserClasses(db, userClassesTable, userId, classes)])
  //       .catch((e) => {
  //         console.error('cannot update users-classes: ');
  //         console.error(e);
  //       });
  //   });
  // }
}
