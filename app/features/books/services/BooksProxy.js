"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*@ngInject*/
function BooksProxy($resource, ENV) {
    var baseUrl = ENV.lmsEndpoint + '/books/:id';
    var BookResource = $resource(baseUrl, { id: '@id' }, {
        query: { method: 'GET', params: { classId: '@classId' }, isArray: true },
        assign: { method: 'POST', params: { classId: '@classId' }, url: baseUrl + '/assign' },
        unassign: { method: 'POST', params: { classId: '@classId' }, url: baseUrl + '/unassign' },
        assignables: {
            method: 'GET',
            params: { subjectId: '@subjectId' },
            url: baseUrl + '/assignables',
            isArray: true
        }
    });
    BookResource.prototype.isSvg = function () {
        return this.type === 'svg';
    };
    return BookResource;
}
exports.BooksProxy = BooksProxy;
//# sourceMappingURL=BooksProxy.js.map