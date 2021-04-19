"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*@ngInject*/
function StatesConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('class', {
        url: '/class/:classId',
        template: require('./../features/class/templates/class.html'),
        controller: 'ClassController',
        controllerAs: 'ctrl',
        resolve: {
            /*@ngInject*/
            classInfo: function (ClassesStore, $stateParams) { return ClassesStore.get($stateParams.classId); }
        }
    })
        .state('reports', {
        url: '/reports/:classId',
        template: require('./../features/session-reports/templates/session-reports.html'),
        controller: 'SessionReportsController'
    })
        .state('responseSubmitted', {
        url: '/:type/response_submitted',
        template: require('./../features/activities/templates/activityResponseSubmitted.html'),
        controller: 'ActivityResponseSubmittedController'
    })
        .state('missing', {
        url: '/:classId/missing',
        template: require('./../features/users/templates/missing-students.html'),
        controller: 'MissingStudentsController',
        controllerAs: '$ctrl',
        resolve: {
            /*@ngInject*/
            classInfo: function (ClassesStore, $stateParams) { return ClassesStore.get($stateParams.classId); }
        }
    });
    $urlRouterProvider.otherwise('/');
}
exports.StatesConfig = StatesConfig;
//# sourceMappingURL=States.js.map