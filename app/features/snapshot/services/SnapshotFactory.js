"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResourceWrapper_1 = require("./ResourceWrapper");
/*@ngInject*/
function Snapshot($resource, ENV, lodash, CurrentUser) {
    return new ResourceWrapper_1.SnapshotResourceWrapper($resource, ENV, CurrentUser, lodash).get();
}
exports.Snapshot = Snapshot;
//# sourceMappingURL=SnapshotFactory.js.map