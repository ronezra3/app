import {MultiQuestionFactory} from './services/MultiQuestion';
import {BooleanQuestionFactory} from './services/BooleanQuestion';
import {SingleQuestionFactory} from './services/SingleQuestion';

import {AddQuestionButton} from './directives/AssessAddQuestionButtonDirective';
import {CorrectAnswerPicker} from './directives/CorrectAnswerPicker';
import {AssessAnswer} from './directives/AssessAnswerOptionDirective';
import {AssessBooleanQuestion} from './directives/AssessBooleanQuestionDirective';
import {AssessClosedQuestion} from './directives/AssessClosedQuestionDirective';
import {AssessQuestionInput} from './directives/AssessQuestionInputDirective';
import {AssessSettingsCheckbox} from './directives/AssessSettingsCheckboxDirective';
import {AssessTimePicker} from './directives/AssessTimePickerDirective';


export default angular.module('LearniApp.assess-builder', [])
  .service('MultiQuestion', MultiQuestionFactory)
  .factory('BooleanQuestion', BooleanQuestionFactory)
  .factory('SingleQuestion', SingleQuestionFactory)

  .component('addQuestionButton', new AddQuestionButton())
  .component('correctAnswerPicker', new CorrectAnswerPicker())
  .component('assessAnswer', new AssessAnswer())
  .component('assessBooleanQuestion', new AssessBooleanQuestion())
  .component('assessClosedQuestion', new AssessClosedQuestion())
  .component('assessQuestionInput', new AssessQuestionInput())
  .component('assessSettingsCheckbox', new AssessSettingsCheckbox())
  .component('assessTimePicker', new AssessTimePicker()).name;
