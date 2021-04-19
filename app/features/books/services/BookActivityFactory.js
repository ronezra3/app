"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*@ngInject*/
function BookActivity($resource, ENV) {
    var baseUrl = ENV.apiEndpoint + '/bookActivities/:id';
    return $resource(baseUrl, { id: '@id' });
}
exports.BookActivity = BookActivity;
//# sourceMappingURL=BookActivityFactory.js.map