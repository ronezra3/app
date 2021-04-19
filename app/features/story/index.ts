import {StoryPreviewController} from './controllers/StoryController';
import {Story} from './services/StoryFactory';
import {StoryResultsContent} from './directives/ResultsContent';
import {StorySubmitButton} from './directives/SubmitButton';
import {StorySaveButton} from './directives/SaveButton';
import {StoryPublishButton} from './directives/PublishButton';
import {StoryPreviewContent} from './directives/PreviewContent';
import {StoryImageContent} from './directives/PlayImageContent';

 
export default angular.module('LearniApp.story', [])
  .value('StoryValues', {
    maxFileSize: "10MB",
    allowedFormats: "image/*,application/pdf"
  })
  .controller('StoryPreviewController', StoryPreviewController)
  .component('storyPreviewContent', new StoryPreviewContent())
  .component('storyResultsContent', new StoryResultsContent())
  .component('storyImageContent', new StoryImageContent())
  .component('storySubmitButton', new StorySubmitButton())
  .component('storySaveButton', new StorySaveButton())
  .component('storyPublishButton', new StoryPublishButton())
  .factory('Story', Story).name;
