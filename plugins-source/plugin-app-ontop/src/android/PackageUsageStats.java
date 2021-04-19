package com.learni.plugins.appontop;

import android.app.AppOpsManager;
import android.content.Context;
import android.content.Intent;
import android.provider.Settings;

import org.apache.cordova.*;
import org.json.JSONArray;
import org.json.JSONException;

public class PackageUsageStats extends CordovaPlugin {
    private static final int MY_PERMISSIONS_REQUEST_PACKAGE_USAGE_STATS = 100;

    private CallbackContext _requestPermissionCallbackContext;

    @Override
    public boolean execute(String action, JSONArray data, CallbackContext callbackContext) throws JSONException {

        if (action.equals("requestPermission")) {
            _requestPermissionCallbackContext = callbackContext;
            requestPermission();
        } else if (action.equals("hasPermission")) {
            callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, hasPermission()));
        } else {
            return false;
        }

        return true;
    }

    private void requestPermission() {
        PluginResult r = new PluginResult(PluginResult.Status.NO_RESULT);
        r.setKeepCallback(true);
        _requestPermissionCallbackContext.sendPluginResult(r);

        cordova.startActivityForResult(this, new Intent(Settings.ACTION_USAGE_ACCESS_SETTINGS), MY_PERMISSIONS_REQUEST_PACKAGE_USAGE_STATS);
    }

    public void onActivityResult(int requestCode, int resultCode, Intent intent) {
        switch (requestCode) {
            case MY_PERMISSIONS_REQUEST_PACKAGE_USAGE_STATS:
                if (hasPermission()) {
                    _requestPermissionCallbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK));
                } else {
                    _requestPermissionCallbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR));
                }
                break;
        }

        super.onActivityResult(requestCode, resultCode, intent);
    }

    private boolean hasPermission() {
        Context context = cordova.getActivity().getApplicationContext();
        AppOpsManager appOps = (AppOpsManager)
                context.getSystemService(Context.APP_OPS_SERVICE);
        int mode = appOps.checkOpNoThrow(AppOpsManager.OPSTR_GET_USAGE_STATS,
                android.os.Process.myUid(), context.getPackageName());
        return mode == AppOpsManager.MODE_ALLOWED;
    }
}
