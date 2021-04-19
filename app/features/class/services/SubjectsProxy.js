"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*@ngInject*/
function SubjectsProxy($resource, ENV) {
    var baseUrl = ENV.lmsEndpoint + '/subjects';
    return $resource(baseUrl, { id: '@id' });
}
exports.SubjectsProxy = SubjectsProxy;
//# sourceMappingURL=SubjectsProxy.js.map