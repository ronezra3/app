import {IdeasPlayController} from './controllers/IdeasPlayController';
import {Ideas} from './services/IdeasFactory';
import {IdeasResultsContent} from './directives/ResultsContent';
import {IdeasSubmitButton} from './directives/SubmitButton';

export default angular.module('LearniApp.ideas', [])
  .value('IdeasValues', {
    'maxChars': 80,
    'canvasSizeMultiplier': 25,
    'maxFileSize' : "5MB",
    'allowedFormats' : "image/*"
  })
  .controller('IdeasPlayController', IdeasPlayController)
  .component('ideasResultsContent', new IdeasResultsContent())
  .component('ideasSubmitButton', new IdeasSubmitButton())
  .factory('Ideas', Ideas).name;
