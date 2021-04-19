"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*@ngInject*/
function ModalsConfig(ngDialogRouterProvider) {
    ngDialogRouterProvider
        .state('termsOfUse', {
        template: require('./../features/login/templates/terms-of-use.html')
    })
        .state('assess.questions.stats', {
        template: require('./../features/assess/templates/AssessQuestionStats.html'),
        controllerAs: 'ctrl',
        controller: 'AssessQuestionStatsController',
        appendClassName: 'assess question-stats'
    })
        .state('assess.student.stats', {
        template: require('./../features/assess/templates/AssessStudentStats.html'),
        controllerAs: 'ctrl',
        appendClassName: 'assess student-stats'
    })
        .state('attention', {
        template: require('./../features/attention/templates/attention.html'),
        controller: 'AttentionController',
        className: 'attention',
        closeByEscape: false
    })
        .state('are-you-sure', {
        template: require('./../features/common/templates/are-you-sure-modal.html'),
        controller: 'AreYouSureController',
        controllerAs: 'ctrl',
        appendClassName: 'are-you-sure'
    });
}
exports.ModalsConfig = ModalsConfig;
//# sourceMappingURL=Modals.js.map