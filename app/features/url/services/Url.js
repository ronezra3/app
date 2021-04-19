"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResourceWrapper_1 = require("./ResourceWrapper");
/*@ngInject*/
function Url($resource, ENV, CurrentUser) {
    return new ResourceWrapper_1.UrlResourceWrapper($resource, ENV, CurrentUser).get();
}
exports.Url = Url;
//# sourceMappingURL=Url.js.map