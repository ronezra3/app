"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*@ngInject*/
function FileLoadTask(DeviceUtilities, JavaScriptFileLoadTask, NativeFileLoadTask) {
    // Windows isn't implemented **yet** in the learni-file-crypto cordova plugin
    if (DeviceUtilities.isCordovaSupported() && !DeviceUtilities.isWindows()) {
        return NativeFileLoadTask;
    }
    return JavaScriptFileLoadTask;
}
exports.FileLoadTask = FileLoadTask;
//# sourceMappingURL=FileLoadTask.js.map