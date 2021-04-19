"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AttentionController_1 = require("./controllers/AttentionController");
var AttentionEventsRouter_1 = require("./services/AttentionEventsRouter");
var AttentionFactory_1 = require("./services/AttentionFactory");
var AttentionButton_1 = require("./components/AttentionButton");
exports.default = angular.module('LearniApp.attention', [])
    .controller('AttentionController', AttentionController_1.AttentionController)
    .component('attentionButton', new AttentionButton_1.AttentionButton())
    .service('AttentionEventsRouter', AttentionEventsRouter_1.AttentionEventsRouter)
    .service('Attention', AttentionFactory_1.Attention).name;
//# sourceMappingURL=index.js.map