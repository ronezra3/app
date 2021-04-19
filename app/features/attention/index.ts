import {AttentionController} from './controllers/AttentionController';
import {AttentionEventsRouter} from './services/AttentionEventsRouter';
import {Attention} from './services/AttentionFactory';
import {AttentionButton} from './components/AttentionButton';

export default angular.module('LearniApp.attention', [])
  .controller('AttentionController', AttentionController)
  .component('attentionButton', new AttentionButton())
  .service('AttentionEventsRouter', AttentionEventsRouter)
  .service('Attention', Attention).name;
