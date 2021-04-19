import {DonutChartVoteProgress} from './components/DonutChartVoteProgress';
import {SnapshotSubmitButton} from './components/SubmitButton';
import {YesNoDonut} from './components/YesNoDonutChart';
import {SnapshotPreviewContent} from './components/PreviewContent';
import {Snapshot} from './services/SnapshotFactory';
import {SnapshotResultsContent} from './components/ResultsContent';

export default angular.module('LearniApp.snapshot', [])
  .directive('donutChartVoteProgress', DonutChartVoteProgress)
  .component('snapshotSubmitButton', new SnapshotSubmitButton())
  .component('yesNoDonut', new YesNoDonut())
  .component('snapshotResultsContent', new SnapshotResultsContent())
  .component('snapshotPreviewContent', new SnapshotPreviewContent())
  .factory('Snapshot', Snapshot).name;
