import {Store} from './../../common/services/Store';
import IQService = angular.IQService;
import LoDashStatic = _.LoDashStatic;

import * as lf from 'lf';
import IPromise = angular.IPromise;

export class UsersStore extends Store {
  /*@ngInject*/
  constructor(UsersProxy, $q : IQService, lodash : LoDashStatic) {
    super('users', UsersProxy, $q, lodash);
  }

  create() {
    return new this.Proxy();
  }

  query(apiQuery) : IPromise<Array<any>> {
    return super.query(apiQuery)
      .then((users) => {
        // this.updateUserClasses(apiQuery.classId, users);
        return users;
      })
      .catch(() => {
        console.warn('cannot fetch users data from server - offline mode');
        // return this.selectClassStudents(apiQuery.classId); //TODO
        return this.$q.reject();
      });
  }

  removeFromClass(user, classId : string) {
    return user.$removeFromClass({classId: classId})
      // .then(() => this.lovefield.db()
      //   .then((db) => {
      //     let table = db.getSchema().table('class_students');

      //     this.deleteClassStudents(db, table, classId, user.id)
      //       .exec()
      //       .catch((e) => console.error(`cannot update cache - remove user from class ${e.message}`));
      //   }));
  }


  // private deleteClassStudents(db, table, classId : string, studentId? : string) {
  //   let predicate;
  //   if (angular.isDefined(studentId)) {
  //     predicate = lf.op.and(table.studentId.eq(studentId), table.classId.eq(classId));
  //   } else {
  //     predicate = table.classId.eq(classId);
  //   }

  //   return db.delete()
  //     .from(table)
  //     .where(predicate);
  // }

  // private insertUserClasses(db, table, classId : string, students : string) {
  //   let rows = this.lodash.map(students,
  //     (student : any) => table.createRow({
  //       classId: classId,
  //       studentId: student.id
  //     })
  //   );

  //   return db
  //     .insert()
  //     .into(table)
  //     .values(rows);
  // }

  // private selectClassStudents(classId : string) {
  //   return this.lovefield.db().then((db) => {
  //     let classStudentsTable = db.getSchema().table('class_students');
  //     let usersTable = db.getSchema().table('users');

  //     return db
  //       .select()
  //       .from(classStudentsTable)
  //       .innerJoin(usersTable, usersTable.id.eq(classStudentsTable.studentId))
  //       .where(classStudentsTable.classId.eq(classId))
  //       .exec()
  //       // The query results structure is: [{users: // ... usersClasses: // ...}]
  //       // Change the select params doesn't chane the structure.
  //       .then((results) => this.lodash.map(results, (elem : any) => new this.Proxy(elem.users)));
  //   });
  // }

  // private updateUserClasses(classId : string, students) {
  //   return this.lovefield.db().then((db) => {
  //     let table = db.getSchema().table('class_students');
  //     let transaction = db.createTransaction();

  //     return transaction.exec([this.deleteClassStudents(db, table, classId), this.insertUserClasses(db, table, classId, students)])
  //       .catch((e) => {
  //         console.error('cannot update users-classes: ');
  //         console.error(e);
  //       });
  //   });
  // }
}
