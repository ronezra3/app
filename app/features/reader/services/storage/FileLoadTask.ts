/*@ngInject*/
export function FileLoadTask(DeviceUtilities, JavaScriptFileLoadTask, NativeFileLoadTask) {
  // Windows isn't implemented **yet** in the learni-file-crypto cordova plugin
  if (DeviceUtilities.isCordovaSupported() && !DeviceUtilities.isWindows()) {
    return NativeFileLoadTask;
  }

  return JavaScriptFileLoadTask;
}
