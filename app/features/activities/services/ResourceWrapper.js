"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ActivityResourceWrapper = /** @class */ (function () {
    function ActivityResourceWrapper($resource, ENV, type) {
        this.$resource = $resource;
        this.ENV = ENV;
        this.type = type;
        this.baseApiEndpoint = this.ENV.apiEndpoint + "/" + this.type + "/:id";
    }
    ActivityResourceWrapper.prototype.get = function () {
        return this.$resource(this.baseApiEndpoint, { id: '@id' }, this.getExtraMethods());
    };
    ActivityResourceWrapper.prototype.getExtraMethods = function () {
        return {
            reset: {
                method: 'POST',
                url: this.baseApiEndpoint + "/reset"
            }
        };
    };
    return ActivityResourceWrapper;
}());
exports.ActivityResourceWrapper = ActivityResourceWrapper;
//# sourceMappingURL=ResourceWrapper.js.map