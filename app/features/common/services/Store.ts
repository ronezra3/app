import IQService = angular.IQService;
import LoDashStatic = _.LoDashStatic;
import IPromise = angular.IPromise;

export class Store {
  constructor(protected name: string, protected Proxy, protected $q: IQService, protected lodash: LoDashStatic) {
  }

  query(query): IPromise<Array<any>> {
    return this.Proxy.query(query).$promise
      .then((elements) => {
        // this.upsertCache(elements);
        return elements;
      });
  }

  get(id: string) {
    return this.$q.resolve().then(() => this.getFromFromProxy(id))

    // return this.lovefield.db().then((db) => {
    //   let table = db.getSchema().table(this.name);

    //   return db.select().from(table).where(table.id.eq(id)).exec()
    //     .then((rows) => this.getFromFromProxy(id));
    // });
  }

  private getFromFromProxy(id) {
    return this.Proxy.get({ id: id }).$promise
      .then((elem) => {
        // this.upsertCache([elem]);
        return elem;
      });
  }

  // protected upsertCache(objsFromProxy) {
  //   return this.lovefield.db().then((db) => {
  //     let table = db.getSchema().table(this.name);

  //     return this.selectByIds(db, table, objsFromProxy)
  //       .then((objsFromCache) => {
  //         let idsFromProxy = this.lodash.pluck(objsFromProxy, 'id');
  //         let idsFromCache = this.lodash.pluck(objsFromCache, 'id');

  //         let idsToUpdate = this.lodash.intersection(idsFromProxy, idsFromCache);
  //         let idsToInsert = this.lodash.difference(idsFromProxy, idsFromCache);

  //         if (idsToInsert.length === 0 && idsToUpdate.length === 0) {
  //           return;
  //         }

  //         let queries = [];
  //         if (idsToUpdate.length > 0) {
  //           queries = queries.concat(this.buildUpdateQueries(db, table, idsToUpdate, objsFromProxy));
  //         }

  //         if (idsToInsert.length > 0) {
  //           queries.push(this.buildInsertQuery(db, table, idsToInsert, objsFromProxy));
  //         }

  //         let transaction = db.createTransaction();

  //         return transaction.exec(queries)
  //           .catch((e) => {
  //             console.error(`cannot update cache - ${this.name}`);
  //             console.error(e);
  //           });
  //       });
  //   });
  // }

  // private selectByIds(db, table, objs) {
  //   let ids = this.lodash.map(objs, 'id');
  //   return db.select().from(table).where(table.id.in(ids)).exec();
  // }

  // private buildInsertQuery(db, table, idsToInsert, objsFromProxy) {
  //   let rowsToInsert = this.lodash.map(idsToInsert, (id) => {
  //     let objToUpdate: any = this.lodash.findWhere(objsFromProxy, { id: id });
  //     return table.createRow(objToUpdate.toJSON());
  //   });

  //   return db.insert().into(table).values(rowsToInsert);
  // }

  // private buildUpdateQueries(db, table, idsToUpdate, objs) {
  //   return this.lodash.map(idsToUpdate, (id) => {
  //     let obj = this.lodash.findWhere(objs, { id: id });
  //     let query = db.update(table);
  //     table.getColumns().forEach((col: any) => query.set(col, obj[col.getName()]));
  //     query.where(table.id.eq(id));
  //     return query;
  //   });
  // }
}
