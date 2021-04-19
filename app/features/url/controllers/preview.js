"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ActivityTeachPreviewController_1 = require("../../activities/controllers/ActivityTeachPreviewController");
var UrlPreviewController = /** @class */ (function (_super) {
    __extends(UrlPreviewController, _super);
    /*@ngInject*/
    function UrlPreviewController(activity, Url, $location, $anchorScroll) {
        var _this = _super.call(this, activity) || this;
        _this.Url = Url;
        _this.$location = $location;
        _this.$anchorScroll = $anchorScroll;
        _this.defaultUrl = 'http://www.google.com';
        if (!activity.urls) {
            activity.urls = [{}];
        }
        if (!_this.activity.sumarizeActivity) {
            _this.activity.sumarizeActivity = {};
        }
        else if (_this.activity.sumarizeActivity) {
            _this.activity.sumarizeActivity.associations = [];
        }
        return _this;
    }
    UrlPreviewController.prototype.onDelete = function (index) {
        this.activity.urls.splice(index, 1);
    };
    UrlPreviewController.prototype.canDelete = function () {
        return !(this.activity.urls.length > 1);
    };
    UrlPreviewController.prototype.scrollBottom = function () {
        this.$location.hash('bottom');
        // call $anchorScroll()
        this.$anchorScroll();
    };
    // public addSumarizeActivity() {
    //   if (!this.activity.sumarizeActivity) {
    //     this.activity.sumarizeActivity = {}
    //   }
    //   this.scrollBottom();
    // }
    UrlPreviewController.prototype.addUrl = function () {
        this.activity.urls.push({});
        this.scrollBottom();
    };
    UrlPreviewController.prototype.getSpecificData = function () {
        return {
            linkType: this.activity.preview.type,
            providerName: this.activity.preview.provider_name
        };
    };
    UrlPreviewController.prototype.prePublish = function () {
        var _this = this;
        if (this.activity.actualUrl) {
            return;
        }
        this.activity.actualUrl = this.defaultUrl;
        return this.Url.preview({ url: this.defaultUrl }).$promise.then(function (preview) {
            _this.activity.preview = preview;
        });
    };
    return UrlPreviewController;
}(ActivityTeachPreviewController_1.ActivityTeachPreviewController));
exports.UrlPreviewController = UrlPreviewController;
//# sourceMappingURL=preview.js.map