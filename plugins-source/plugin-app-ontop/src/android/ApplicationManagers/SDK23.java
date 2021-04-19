package com.learni.application.managers;

import android.app.usage.UsageStats;
import android.app.usage.UsageStatsManager;
import android.content.Context;

import java.util.List;
import java.util.SortedMap;
import java.util.TreeMap;

public class SDK23 {
    private static String lastPackageName;

    public static String getForegroundApp(Context context) {
        UsageStatsManager mUsageStatsManager = (UsageStatsManager) context.getSystemService(Context.USAGE_STATS_SERVICE);
        long time = System.currentTimeMillis();
        // We get usage stats for the last 10 seconds
        List<UsageStats> stats = mUsageStatsManager.queryUsageStats(UsageStatsManager.INTERVAL_DAILY, time - 1000 * 10, time);
        // Sort the stats by the last time used
        if (stats == null) {
            return null;
        }

        long lastUsedAppTime = 0;
        for (UsageStats usageStats : stats) {
            if (usageStats.getLastTimeUsed() > lastUsedAppTime) {
                lastPackageName = usageStats.getPackageName();
                lastUsedAppTime = usageStats.getLastTimeUsed();
            }
        }

        return lastPackageName;
    }
}
