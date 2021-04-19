"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StateDecorator_1 = require("./StateDecorator");
/*@ngInject*/
function decorate($provide) {
    $provide.decorator('$state', StateDecorator_1.StateDecorator.decorate);
}
exports.decorate = decorate;
//# sourceMappingURL=stateDecoration.js.map