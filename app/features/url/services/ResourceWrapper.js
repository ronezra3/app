"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { ActivityResourceWrapper } from '../../activities/services/ResourceWrapper';
var SubmitableResourceWrapper_1 = require("../../activities/services/SubmitableResourceWrapper");
var UrlResourceWrapper = /** @class */ (function (_super) {
    __extends(UrlResourceWrapper, _super);
    function UrlResourceWrapper($resource, ENV, CurrentUser) {
        return _super.call(this, $resource, ENV, 'url', CurrentUser) || this;
    }
    UrlResourceWrapper.prototype.getExtraMethods = function () {
        var extraMethods = _super.prototype.getExtraMethods.call(this);
        extraMethods.preview = {
            method: 'GET',
            params: { url: '@url' },
            url: this.baseApiEndpoint + "/preview/:url"
        };
        return extraMethods;
    };
    return UrlResourceWrapper;
}(SubmitableResourceWrapper_1.SubmitableResourceWrapper));
exports.UrlResourceWrapper = UrlResourceWrapper;
//# sourceMappingURL=ResourceWrapper.js.map