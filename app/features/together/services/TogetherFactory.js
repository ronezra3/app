"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*@ngInject*/
function Together(SocketIO, ENV, $resource, CurrentUser, lodash, CurrentSession, Localytics) {
    var basicApiUrl = ENV.apiEndpoint + '/together/:sessionId';
    var TogetherResource = $resource(basicApiUrl, { sessionId: '@sessionId' }, {
        request: { method: 'POST', url: basicApiUrl + '/request' },
        update: { method: 'POST', url: basicApiUrl + '/update' },
        give: { method: 'POST', url: basicApiUrl + '/give' },
        deactivate: { method: 'POST', url: basicApiUrl + '/deactivate' },
        cancelRequest: { method: 'POST', url: basicApiUrl + '/cancelRequest' }
    });
    function shouldUpdateTogether(bookId, page) {
        var together = CurrentSession.getInfo().together;
        return together.bookId !== bookId || together.pageUrl !== page
            || together.controllingUserId !== CurrentUser.get().id;
    }
    function onUpdated(callback) {
        SocketIO.on('togetherUpdated', callback);
    }
    function onDeActivated(callback) {
        SocketIO.on('togetherDeactivated', callback);
    }
    function setTogether(bookId, page, controllingUserId) {
        var together = CurrentSession.getInfo().together;
        if (!together) {
            together = {};
        }
        together.bookId = bookId;
        together.pageUrl = page;
        together.controllingUserId = controllingUserId;
    }
    function update(bookId, page) {
        if (!shouldUpdateTogether(bookId, page)) {
            return;
        }
        if (!isInTogether()) {
            Localytics.tagEvent('Together Activated');
        }
        setTogether(bookId, page, CurrentUser.get().id);
        var session = CurrentSession.getInfo();
        SocketIO.emit(session.id, 'togetherUpdated', session.together);
        var together = new TogetherResource({
            together: session.together
        });
        return together.$update({ sessionId: session.id });
    }
    function give() {
        var session = CurrentSession.getInfo();
        session.together.controllingUserId = session.together.requestingUserId;
        session.together.requestingUserId = null;
        SocketIO.emit(session.id, 'togetherGranted', session.together.controllingUserId);
        var together = new TogetherResource();
        return together.$give({ sessionId: session.id });
    }
    function deactivate() {
        var session = CurrentSession.getInfo();
        setTogether(null, null, null);
        var together = new TogetherResource();
        SocketIO.emit(session.id, 'togetherDeactivated');
        return together.$deactivate({ sessionId: session.id });
    }
    function request() {
        var session = CurrentSession.getInfo();
        if (!session.together) {
            session.together = {};
        }
        session.together.requestingUserId = CurrentUser.get().id;
        SocketIO.emit(session.id, 'togetherRequested', session.together.requestingUserId);
        var together = new TogetherResource({
            studentId: session.together.requestingUserId
        });
        return together.$request({ sessionId: session.id });
    }
    function onRequested(callback) {
        SocketIO.on('togetherRequested', callback);
    }
    function onGranted(callback) {
        SocketIO.on('togetherGranted', callback);
    }
    function cancelRequest() {
        var session = CurrentSession.getInfo();
        if (!session.together) {
            session.together = {};
        }
        session.together.requestingUserId = null;
        SocketIO.emit(session.id, 'togetherRequestCanceled');
        var together = new TogetherResource();
        return together.$cancelRequest({ sessionId: session.id });
    }
    function onRequestCanceled(callback) {
        SocketIO.on('togetherRequestCanceled', callback);
    }
    function getController(members) {
        var session = CurrentSession.getInfo();
        var controller = lodash.find(members, { id: session.together.controllingUserId });
        if (controller) {
            return controller;
        }
    }
    function isInTogether() {
        var session = CurrentSession.getInfo();
        return Boolean(session && session.together.controllingUserId).valueOf();
    }
    function inControl() {
        var user = CurrentUser.get();
        var session = CurrentSession.getInfo();
        return isInTogether() && user.id === session.together.controllingUserId;
    }
    function unSubscribe() {
        SocketIO.removeAllListeners('togetherUpdated');
        SocketIO.removeAllListeners('togetherRequestCanceled');
        SocketIO.removeAllListeners('togetherDeactivated');
        SocketIO.removeAllListeners('togetherRequested');
    }
    function isControlled() {
        return isInTogether() && !inControl();
    }
    return {
        update: update,
        give: give,
        deactivate: deactivate,
        onDeActivated: onDeActivated,
        onUpdated: onUpdated,
        onGranted: onGranted,
        request: request,
        onRequested: onRequested,
        cancelRequest: cancelRequest,
        onRequestCanceled: onRequestCanceled,
        unSubscribe: unSubscribe,
        isInTogether: isInTogether,
        inControl: inControl,
        isControlled: isControlled,
        getController: getController
    };
}
exports.Together = Together;
//# sourceMappingURL=TogetherFactory.js.map