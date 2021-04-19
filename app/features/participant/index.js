"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ParticipantPlayController_1 = require("./controllers/ParticipantPlayController");
var ParticipantTeachPreviewController_1 = require("./controllers/ParticipantTeachPreviewController");
var ParticipantTeachResultsController_1 = require("./controllers/ParticipantTeachResultsController");
var ParticipantFactory_1 = require("./services/ParticipantFactory");
var PreviewContent_1 = require("./components/PreviewContent");
var ResultsContent_1 = require("./components/ResultsContent");
var SearchingStudent_1 = require("./components/SearchingStudent");
exports.default = angular.module('LearniApp.participant', [])
    .controller('ParticipantPlayController', ParticipantPlayController_1.ParticipantPlayController)
    .controller('ParticipantTeachPreviewController', ParticipantTeachPreviewController_1.ParticipantTeachPreviewController)
    .controller('ParticipantTeachResultsController', ParticipantTeachResultsController_1.ParticipantTeachResultsController)
    .component('participantPreviewContent', new PreviewContent_1.ParticipantPreviewContent())
    .component('participantResultsContent', new ResultsContent_1.ParticipantResultsContent())
    .component('searchingStudent', new SearchingStudent_1.SearchingStudent())
    .factory('Participant', ParticipantFactory_1.Participant).name;
//# sourceMappingURL=index.js.map