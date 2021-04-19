import {GotoPage} from './directives/GotoPageDirective';
import {DefaultHtmlContent} from './directives/DefaultHtmlContent';
import {MsHtmlContent} from './directives/MsHtmlContent';
import {PanelDrawerItem} from './directives/PanelDrawerItemDirective';
import {ReaderDrawer} from './directives/ReaderDrawer';
import {ImageOnLoad} from './directives/ImageOnLoadDirective';
import {SvgObject} from './directives/SvgObjectDirective';
import {FileLoadTask} from './services/storage/FileLoadTask';
import {JavaScriptFileLoadTaskFactory} from './services/storage/JavaScriptFileLoadTask';
import {NativeFileLoadTask} from './services/storage/NativeFileLoadTask';
import {SvgBookStorageFactory} from './services/storage/SvgBookStorage';
import {CachedSvgNodes} from './services/storage/CachedSvgNode';

export default angular.module('LearniApp.reader', [])
  .component('gotoPage', new GotoPage())
  .component('defaultHtmlContent', new DefaultHtmlContent())
  .component('msHtmlContent', new MsHtmlContent())
  .component('panelDrawerItem', new PanelDrawerItem())
  .component('imageOnLoad', ImageOnLoad)
  .component('readerDrawer', new ReaderDrawer())
  .component('svgObject', new SvgObject())
  .factory('CachedSvgNodes', CachedSvgNodes)
  .factory('FileLoadTask', FileLoadTask)
  .factory('JavaScriptFileLoadTask', JavaScriptFileLoadTaskFactory)
  .factory('NativeFileLoadTask', NativeFileLoadTask)
  .factory('SvgBookStorageFactory', SvgBookStorageFactory).name;
