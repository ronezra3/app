package com.learni.application.managers;

import android.app.ActivityManager;
import android.content.Context;

import java.util.List;

public class SDK21 {
    public static String getForegroundApp(Context context) {
        ActivityManager am = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);

        List<ActivityManager.RunningAppProcessInfo> tasks = am.getRunningAppProcesses();
        ActivityManager.RunningAppProcessInfo foregroundTaskInfo = tasks.get(0);
        return foregroundTaskInfo.processName;
    }
}
