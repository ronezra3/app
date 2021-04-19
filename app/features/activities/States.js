"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Resolver_1 = require("./services/Resolver");
var ActivityState = /** @class */ (function () {
    function ActivityState(type, stage, UtilitiesProvider) {
        this.UtilitiesProvider = UtilitiesProvider;
        this.controllerAs = '$ctrl';
        this.url = "/" + type + "/:activityId/" + stage + "?classId&{isPlaying:bool}&{disableSharing:bool}&{pageUrl}";
        this.template = require("./../" + type + "/templates/" + stage + ".html");
        this.resolve = this.getResolveObject(type, stage).getResolve();
        // this has to be an arrow function since there is no access to "this"
        // and no way to bind and use ngInject
        /*@ngInject*/
        this.controllerProvider = function ($controller) {
            var capitalType = UtilitiesProvider.capitalize(type);
            var capitalStage = UtilitiesProvider.capitalize(stage);
            var specificController = "" + capitalType + capitalStage + "Controller";
            try {
                $controller(specificController);
                return specificController;
            }
            catch (e) {
                return e instanceof TypeError ?
                    "Activity" + capitalStage + "Controller" : specificController;
            }
        };
    }
    ActivityState.prototype.getResolveWrapper = function (folder, type, prefix, stage) {
        var capitalPrefix = this.UtilitiesProvider.capitalize(prefix);
        var capitalStage = this.UtilitiesProvider.capitalize(stage);
        try {
            var specificResolverModule = require("./../" + folder + "/services/" + capitalStage + "Resolver");
            var specificResolverType = specificResolverModule["" + capitalPrefix + capitalStage + "Resolver"];
            return new specificResolverType(type);
        }
        catch (e) {
            return null;
        }
    };
    ActivityState.prototype.getResolveObject = function (type, stage) {
        return this.getResolveWrapper(type, type, type, stage)
            || this.getResolveWrapper('activities', type, 'activity', stage)
            || new Resolver_1.ActivityResolver(type);
    };
    return ActivityState;
}());
/*@ngInject*/
function ActivityStates($stateProvider, UtilitiesProvider, ENV, lodash) {
    lodash.each(ENV.teacher.activities, register);
    function register(stages, type) {
        stages = stages || ['enrich-preview', 'teach-preview', 'play', 'student-results', 'teach-results', 'enrich-results'];
        lodash.each(stages, function (stage) { return $stateProvider.state(type + "-" + stage, new ActivityState(type, stage, UtilitiesProvider)); });
    }
}
exports.ActivityStates = ActivityStates;
//# sourceMappingURL=States.js.map