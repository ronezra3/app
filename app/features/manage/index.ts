import IStateProvider = ng.ui.IStateProvider;
import {NgDialogRouterProvider} from '../../3rdparty/common/layout/services/NgDialogRouter';

import {ManageBooksState} from './books/controllers/ManageBooksController';
import {ManageState} from './controllers/ManageController';
import {ManageInfoState} from './info/controllers/ManageInfoController';
import {ManageTabButton} from './directives/ManageTabButton';

import {ManageNewPasswordState} from './students/controllers/ManageNewPassword';
import {ManagePasswordResetState} from './students/controllers/ManagePasswordReset';
import {ManageRemoveStudentState} from './students/controllers/ManageRemoveStudent';
import {ManageStudentModalState} from './students/controllers/ManageStudentModal';
import {ManageStudentsState} from './students/controllers/ManageStudents';
import {ClassStudent} from './students/directives/ClassStudentDirective';
import {ManageStudentAvatar} from './students/directives/ManageStudentAvatar';

export default angular.module('LearniApp.manage', [])
  .config(($stateProvider : IStateProvider, ngDialogRouterProvider : NgDialogRouterProvider) => {
    $stateProvider
      .state('manage', new ManageState())
      .state('manage.info', new ManageInfoState())
      .state('manage.books', new ManageBooksState())
      .state('manage.students', new ManageStudentsState());

    ngDialogRouterProvider
      .state('manage.student', new ManageStudentModalState())
      .state('manage.student.remove', new ManageRemoveStudentState())
      .state('manage.password.reset', new ManagePasswordResetState())
      .state('manage.password.new', new ManageNewPasswordState());
  })
  .directive('manageTabButton', ManageTabButton)
  .component('classStudent', new ClassStudent())
  .directive('manageStudentAvatar', ManageStudentAvatar).name;
