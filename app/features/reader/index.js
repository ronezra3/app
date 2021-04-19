"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GotoPageDirective_1 = require("./directives/GotoPageDirective");
var DefaultHtmlContent_1 = require("./directives/DefaultHtmlContent");
var MsHtmlContent_1 = require("./directives/MsHtmlContent");
var PanelDrawerItemDirective_1 = require("./directives/PanelDrawerItemDirective");
var ReaderDrawer_1 = require("./directives/ReaderDrawer");
var ImageOnLoadDirective_1 = require("./directives/ImageOnLoadDirective");
var SvgObjectDirective_1 = require("./directives/SvgObjectDirective");
var FileLoadTask_1 = require("./services/storage/FileLoadTask");
var JavaScriptFileLoadTask_1 = require("./services/storage/JavaScriptFileLoadTask");
var NativeFileLoadTask_1 = require("./services/storage/NativeFileLoadTask");
var SvgBookStorage_1 = require("./services/storage/SvgBookStorage");
var CachedSvgNode_1 = require("./services/storage/CachedSvgNode");
exports.default = angular.module('LearniApp.reader', [])
    .component('gotoPage', new GotoPageDirective_1.GotoPage())
    .component('defaultHtmlContent', new DefaultHtmlContent_1.DefaultHtmlContent())
    .component('msHtmlContent', new MsHtmlContent_1.MsHtmlContent())
    .component('panelDrawerItem', new PanelDrawerItemDirective_1.PanelDrawerItem())
    .component('imageOnLoad', ImageOnLoadDirective_1.ImageOnLoad)
    .component('readerDrawer', new ReaderDrawer_1.ReaderDrawer())
    .component('svgObject', new SvgObjectDirective_1.SvgObject())
    .factory('CachedSvgNodes', CachedSvgNode_1.CachedSvgNodes)
    .factory('FileLoadTask', FileLoadTask_1.FileLoadTask)
    .factory('JavaScriptFileLoadTask', JavaScriptFileLoadTask_1.JavaScriptFileLoadTaskFactory)
    .factory('NativeFileLoadTask', NativeFileLoadTask_1.NativeFileLoadTask)
    .factory('SvgBookStorageFactory', SvgBookStorage_1.SvgBookStorageFactory).name;
//# sourceMappingURL=index.js.map