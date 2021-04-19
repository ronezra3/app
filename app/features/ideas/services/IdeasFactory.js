"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResourceWrapper_1 = require("./ResourceWrapper");
/*@ngInject*/
function Ideas($resource, ENV, CurrentUser, lodash) {
    return new ResourceWrapper_1.IdeasResourceWrapper($resource, ENV, CurrentUser, lodash).get();
}
exports.Ideas = Ideas;
//# sourceMappingURL=IdeasFactory.js.map