import * as lf from 'lf';

export class LovefieldProvider {
  schemaBuilder : any;

  constructor() {
    if (angular.isDefined(lf)) {
      this.schemaBuilder = lf.schema.create('learni', 1);
    } else {
      console.warn('lovefield is not defined');
    }
  }

  /*@ngInject*/
  public $get($q, DeviceUtilities) {
    return new LovefieldWrapper(this.schemaBuilder, $q, DeviceUtilities);
  }
}

export class LovefieldWrapper {
  constructor(private schemaBuilder, private $q, private DeviceUtilities) {
  }

  private _dbPromise;
  private _db;

  db() {
    if (angular.isDefined(this._db)) {
      return this.$q.resolve(this._db);
    }

    var connParams;
    if (this.DeviceUtilities.isIOS()) {
      connParams = {storeType: lf.schema.DataStoreType.WEB_SQL};
    }

    if (!this._dbPromise) {
      this._dbPromise = this.schemaBuilder.connect(connParams)
        .then((connection) => {
          this._db = connection;
          return this._db;
        })
        .catch((err) => {
          console.error(err);
        });
    }

    return this._dbPromise;
  }

  public clear() {
    if (angular.isDefined(this._db)) {
      var tables = this._db.getSchema().tables();
      tables.forEach((table) => {
        this._db.delete().from(table).exec();
      });
    }
  }
}
