"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ActivityResponseSubmittedController_1 = require("./controllers/ActivityResponseSubmittedController");
var RemoveButton_1 = require("./directives/RemoveButton");
var ResetButton_1 = require("./directives/ResetButton");
var SaveButton_1 = require("./directives/SaveButton");
var PublishButton_1 = require("./directives/PublishButton");
var ShareButton_1 = require("./directives/ShareButton");
var EndButton_1 = require("./directives/EndButton");
var BackButton_1 = require("./directives/BackButton");
var DuplicatedAnswerValidator_1 = require("./validators/DuplicatedAnswerValidator");
var PreviewHeader_1 = require("./directives/PreviewHeader");
var ActivityHeader_1 = require("./directives/ActivityHeader");
var ActivitiesFactory_1 = require("./services/ActivitiesFactory");
var ActivitiesRouter_1 = require("./services/ActivitiesRouter");
var ActivityEvents_1 = require("./services/ActivityEvents");
var ActivityResponsesFactory_1 = require("./services/ActivityResponsesFactory");
var States_1 = require("./States");
var NavBar_1 = require("./directives/NavBar");
var ActivityTeachPreviewController_1 = require("./controllers/ActivityTeachPreviewController");
var ActivityEnrichPreviewController_1 = require("./controllers/ActivityEnrichPreviewController");
var PlayController_1 = require("./controllers/PlayController");
var TeachResultsFooter_1 = require("./directives/TeachResultsFooter");
var EnrichResultsFooter_1 = require("./directives/EnrichResultsFooter");
var EnrichPreviewFooter_1 = require("./directives/EnrichPreviewFooter");
var ActivityTeachResultsController_1 = require("./controllers/ActivityTeachResultsController");
var ActivityEnrichResultsController_1 = require("./controllers/ActivityEnrichResultsController");
exports.default = angular.module('LearniApp.activities', [])
    .config(States_1.ActivityStates)
    .controller('ActivityResponseSubmittedController', ActivityResponseSubmittedController_1.ActivityResponseSubmittedController)
    .controller('ActivityPlayController', PlayController_1.ActivityPlayController)
    .controller('ActivityTeachResultsController', ActivityTeachResultsController_1.ActivityTeachResultsController)
    .controller('ActivityEnrichResultsController', ActivityEnrichResultsController_1.ActivityEnrichResultsController)
    .controller('ActivityStudentResultsController', ActivityEnrichResultsController_1.ActivityEnrichResultsController)
    .controller('ActivityTeachPreviewController', ActivityTeachPreviewController_1.ActivityTeachPreviewController)
    .controller('ActivityEnrichPreviewController', ActivityEnrichPreviewController_1.ActivityEnrichPreviewController)
    .component('activitySaveButton', new SaveButton_1.ActivitySaveButton())
    .component('activityPublishButton', new PublishButton_1.ActivityPublishButton())
    .component('activityShareButton', new ShareButton_1.ActivityShareButton())
    .component('activityEndButton', new EndButton_1.ActivityEndButton())
    .component('activityRemoveButton', new RemoveButton_1.ActivityRemoveButton())
    .component('activityResetButton', new ResetButton_1.ActivityResetButton())
    .component('previewHeader', new PreviewHeader_1.PreviewHeader())
    .component('activityHeader', new ActivityHeader_1.ActivityHeader())
    .component('activityTeachResultsFooter', new TeachResultsFooter_1.ActivityTeachResultsFooter())
    .component('activityEnrichResultsFooter', new EnrichResultsFooter_1.ActivityEnrichResultsFooter())
    .component('activityEnrichPreviewFooter', new EnrichPreviewFooter_1.ActivityEnrichPreviewFooter())
    .component('activityBackButton', new BackButton_1.ActivityBackButton())
    .component('activityNavBar', new NavBar_1.ActivityNavBar())
    .directive('duplicatedAnswerValidator', DuplicatedAnswerValidator_1.DuplicatedAnswerValidator)
    .service('Activities', ActivitiesFactory_1.Activities)
    .service('ActivityEvents', ActivityEvents_1.ActivityEvents)
    .service('ActivitiesRouter', ActivitiesRouter_1.ActivitiesRouter)
    .service('ActivityResponses', ActivityResponsesFactory_1.ActivityResponses).name;
//# sourceMappingURL=index.js.map