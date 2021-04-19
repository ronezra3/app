package com.learni.plugins.appontop;

import org.apache.cordova.*;
import org.json.JSONArray;
import org.json.JSONException;

import android.content.Context;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.os.Build;

import com.learni.application.managers.*;

public class Appontop extends CordovaPlugin {

    @Override
    public boolean execute(String action, JSONArray data, CallbackContext callbackContext) throws JSONException {
        callbackContext.success(getForegroundTask());
        return true;
    }

    private String getForegroundTask() {
        String packageName = "";

        Context context = cordova.getActivity().getApplicationContext();
        if (android.os.Build.VERSION.SDK_INT < Build.VERSION_CODES.LOLLIPOP) {
            packageName = Legacy.getForegroundApp(context);
        } else if (android.os.Build.VERSION.SDK_INT < Build.VERSION_CODES.LOLLIPOP_MR1) {
            packageName = SDK21.getForegroundApp(context);
            if (packageName.equals(context.getPackageName())) {
                packageName = SDK22.getForegroundApp();
            }
        } else if (android.os.Build.VERSION.SDK_INT < Build.VERSION_CODES.M) {
            packageName = SDK22.getForegroundApp();
        } else {
            packageName = SDK23.getForegroundApp(context);
        }

        return getApplicationLabel(packageName, context.getPackageManager());
    }


    private String getApplicationLabel(String packageName, PackageManager pm) {
        ApplicationInfo ai;

        try {
            ai = pm.getApplicationInfo(packageName, 0);
            return (String) pm.getApplicationLabel(ai);
        } catch (final PackageManager.NameNotFoundException e) {
            return "";
        }
    }
}
