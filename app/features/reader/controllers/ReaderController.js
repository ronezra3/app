"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ReaderController = /** @class */ (function () {
    /*@ngInject*/
    function ReaderController(Together, bookInfo, $state, CurrentBook, pageUrl, LastBookPage, isTeacher, CurrentSession, TogetherEventsRouter) {
        this.Together = Together;
        this.bookInfo = bookInfo;
        this.$state = $state;
        this.CurrentBook = CurrentBook;
        this.LastBookPage = LastBookPage;
        this.isTeacher = isTeacher;
        this.CurrentSession = CurrentSession;
        this.TogetherEventsRouter = TogetherEventsRouter;
        TogetherEventsRouter.onPageChanged(this.setPageUrl.bind(this));
        this.setPageUrl(pageUrl || this.getDefaultPageUrl());
        this.mode = $state.$current.parent.parent.name;
    }
    ReaderController.prototype.isControlled = function () {
        return this.Together.isControlled();
    };
    ReaderController.prototype.leave = function () {
        if (this.Together.inControl()) {
            this.Together.update();
        }
    };
    ReaderController.prototype.setPageUrl = function (pageUrl) {
        if (this.Together.inControl()) {
            this.Together.update(this.bookInfo.id, pageUrl);
        }
        this.pageUrl = pageUrl;
        this.CurrentBook.pageUrl = pageUrl;
        this.LastBookPage.set(this.bookInfo.id, this.$state.params['classId'], pageUrl);
        if (this.isTeacher && this.mode === 'teach') {
            this.CurrentSession.reportVisitedPage(this.bookInfo, pageUrl);
        }
    };
    return ReaderController;
}());
exports.ReaderController = ReaderController;
//# sourceMappingURL=ReaderController.js.map