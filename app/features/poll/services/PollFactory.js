"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResourceWrapper_1 = require("./ResourceWrapper");
/*@ngInject*/
function Poll($resource, ENV, lodash, CurrentUser) {
    return new ResourceWrapper_1.PollResourceWrapper($resource, ENV, CurrentUser, lodash).get();
}
exports.Poll = Poll;
//# sourceMappingURL=PollFactory.js.map