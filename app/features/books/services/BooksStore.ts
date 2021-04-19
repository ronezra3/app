import { Store } from '../../common/services/Store';
import IQService = angular.IQService;
import LoDashStatic = _.LoDashStatic;
import IPromise = angular.IPromise;

declare var lf: any;

export class BooksStore extends Store {
  /*@ngInject*/
  constructor(BooksProxy, $q: IQService, lodash: LoDashStatic) {
    super('books', BooksProxy, $q, lodash);
  }

  assignables(schoolId: string, subjectId: string) {
    return this.Proxy.assignables({
      schoolId: schoolId,
      subjectId: subjectId
    }).$promise;
  }

  query(apiQuery): IPromise<Array<any>> {
    return super.query(apiQuery)
      .then((books) => {
        // this.updateClassesBooks(apiQuery.classId, books);
        return books;
      })
      .catch(() => {
        console.warn('cannot fetch books data from server - offline mode');
        return this.$q.reject();
        // return this.selectFromClassesBooks(apiQuery.classId);
      });
  }


  // private unassign(book, classId: string) {
  //   let bookId = book.id;

  //   return book.$unassign({ classId: classId }).then(() => {
  //     book.assigned = false;

  //     return this.lovefield.db().then((db) => {
  //       let table = db.getSchema().table('classes_books');
  //       return this.deleteFromClassesBooks(db, table, classId, bookId)
  //         .exec()
  //         .catch((e) => {
  //           console.error('cannot update cache - cannot unassign book from class!');
  //           console.error(e);
  //         });
  //     });
  //   });
  // }



  // private insertClassesBooks(db, table, classId: string, books: Array<any>) {
  //   let rows = this.lodash.map(books, (book) =>
  //     table.createRow({
  //       classId: classId,
  //       bookId: book.id
  //     })
  //   );

  //   return db
  //     .insert()
  //     .into(table)
  //     .values(rows);
  // }

  // private selectFromClassesBooks(classId: string) {
  //   return this.lovefield.db().then((db) => {
  //     let table = db.getSchema().table('classes_books');
  //     let booksTable = db.getSchema().table('books');

  //     return db
  //       .select()
  //       .from(table)
  //       .innerJoin(booksTable, booksTable.id.eq(table.bookId))
  //       .where(table.classId.eq(classId))
  //       .exec()
  //       // The query results structure is: [{books: // ... classesBooks: // ...}]
  //       // Change the select params doesn't change the structure.
  //       .then((results) => this.lodash.map(results, (elem: any) => new this.Proxy(elem.books)));
  //   });
  // }

  // private deleteFromClassesBooks(db, table, classId: string, bookId?: string) {
  //   let predicate;
  //   if (angular.isDefined(bookId)) {
  //     predicate = lf.op.and(table.bookId.eq(bookId), table.classId.eq(classId));
  //   } else {
  //     predicate = table.classId.eq(classId);
  //   }

  //   return db.delete()
  //     .from(table)
  //     .where(predicate);
  // }

  // private updateClassesBooks(classId: string, books: Array<any>) {
  //   return this.lovefield.db().then((db) => {
  //     let table = db.getSchema().table('classes_books');
  //     let transaction = db.createTransaction();

  //     return transaction.exec([this.deleteFromClassesBooks(db, table, classId),
  //     this.insertClassesBooks(db, table, classId, books)])
  //       .catch((e) => console.error(`cannot update classes-books: ${e.message}`));
  //   });
  // }
}
