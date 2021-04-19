"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResourceWrapper_1 = require("./ResourceWrapper");
/*@ngInject*/
function Assess($resource, ENV, lodash) {
    return new ResourceWrapper_1.AssessResourceWrapper($resource, ENV, lodash).get();
}
exports.Assess = Assess;
//# sourceMappingURL=AssessFactory.js.map