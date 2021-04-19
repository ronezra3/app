"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IdeasPlayController_1 = require("./controllers/IdeasPlayController");
var MostPopularWords_1 = require("./directives/MostPopularWords");
var IdeasFactory_1 = require("./services/IdeasFactory");
var ResultsContent_1 = require("./directives/ResultsContent");
var SubmitButton_1 = require("./directives/SubmitButton");
var IdeasWordCloud_1 = require("./directives/IdeasWordCloud");
exports.default = angular.module('LearniApp.ideas', [])
    .value('IdeasValues', {
    'maxChars': 80,
    'canvasSizeMultiplier': 25
})
    .controller('IdeasPlayController', IdeasPlayController_1.IdeasPlayController)
    .component('ideasWordCloud', new IdeasWordCloud_1.IdeasWordCloud())
    .component('mostPopularWords', new MostPopularWords_1.MostPopularWords())
    .component('ideasResultsContent', new ResultsContent_1.IdeasResultsContent())
    .component('ideasSubmitButton', new SubmitButton_1.IdeasSubmitButton())
    .factory('Ideas', IdeasFactory_1.Ideas).name;
//# sourceMappingURL=index.js.map