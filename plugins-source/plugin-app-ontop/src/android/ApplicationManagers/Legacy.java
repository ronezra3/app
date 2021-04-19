package com.learni.application.managers;

import android.app.ActivityManager;
import android.content.Context;

import java.util.List;

/**
 * Supports versions of android older then SDK 21 (android Lollipop)
 */
public class Legacy {
    public static String getForegroundApp(Context context) {
        ActivityManager am = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
        List<ActivityManager.RunningTaskInfo> taskInfo = am.getRunningTasks(1);
        return taskInfo.get(0).baseActivity.getPackageName();
    }
}
