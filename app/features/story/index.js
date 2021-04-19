"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StoryPlayController_1 = require("./controllers/StoryPlayController");
var MostPopularWords_1 = require("./directives/MostPopularWords");
var StoryFactory_1 = require("./services/StoryFactory");
var ResultsContent_1 = require("./directives/ResultsContent");
var SubmitButton_1 = require("./directives/SubmitButton");
var StoryWordCloud_1 = require("./directives/StoryWordCloud");
exports.default = angular.module('LearniApp.story', [])
    .value('StoryValues', {
    'maxChars': 80,
    'canvasSizeMultiplier': 25
})
    .controller('StoryPlayController', StoryPlayController_1.StoryPlayController)
    .component('storyWordCloud', new StoryWordCloud_1.StoryWordCloud())
    .component('mostPopularWords', new MostPopularWords_1.MostPopularWords())
    .component('storyResultsContent', new ResultsContent_1.StoryResultsContent())
    .component('storySubmitButton', new SubmitButton_1.StorySubmitButton())
    .factory('Story', StoryFactory_1.Story).name;
//# sourceMappingURL=index.js.map