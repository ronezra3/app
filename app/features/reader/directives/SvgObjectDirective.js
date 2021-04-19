"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SvgObjectController = /** @class */ (function () {
    /*@ngInject*/
    function SvgObjectController($element, SvgBookStorageFactory) {
        this.$element = $element;
        this.SvgBookStorageFactory = SvgBookStorageFactory;
        this.pageContainer = this.$element.children()[1];
        this.bookUrls = [];
        this.bookStorage = this.SvgBookStorageFactory(this.bookInfo);
    }
    // $onInit() {
    // }
    SvgObjectController.prototype.$onChanges = function (changes) {
        if (changes.pageUrl) {
            this.loadCurrentPage();
        }
    };
    // private loadCurrentPage2() {
    //   this.lastRequestedPageUrl = this.pageUrl;
    //   if (!this.isLoading) {
    //     this.isLoading = true;
    //     this.loadLastRequestedPage();
    //   }
    //   var img = new Image();
    //   img.onload = () => {
    //     this.pageContainer.innerHTML = '';
    //     this.pageContainer.appendChild(img);
    //   }
    //   img.src = this.bookUrls[this.pageUrl];
    // }
    SvgObjectController.prototype.loadCurrentPage = function () {
        this.lastRequestedPageUrl = this.pageUrl - 1;
        if (!this.isLoading) {
            this.isLoading = true;
            this.loadLastRequestedPage();
        }
    };
    SvgObjectController.prototype.loadLastRequestedPage = function () {
        var lastRequestedPageUrlWas = this.lastRequestedPageUrl;
        var content;
        content = this.bookStorage.fetchPage(lastRequestedPageUrlWas);
        if (this.lastRequestedPageUrl !== lastRequestedPageUrlWas) {
            return this.loadLastRequestedPage();
        }
        content.className = "content scrollable";
        this.pageContainer.innerHTML = '';
        this.pageContainer.appendChild(content);
        this.isLoading = false;
    };
    return SvgObjectController;
}());
var SvgObject = /** @class */ (function () {
    function SvgObject() {
        this.template = "<loader class=\"page-loader\" ng-show=\"$ctrl.isLoading\"></loader>\n              <div pinch-to-zoom></div>";
        this.controller = SvgObjectController;
        this.bindings = {
            pageUrl: '<',
            bookInfo: '<'
        };
    }
    return SvgObject;
}());
exports.SvgObject = SvgObject;
//# sourceMappingURL=SvgObjectDirective.js.map