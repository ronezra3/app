package net.learni;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaResourceApi;


import org.json.JSONArray;
import org.json.JSONException;
import java.io.BufferedReader;

import android.net.Uri;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.File;
import java.io.FileInputStream;





public class Safe extends CordovaPlugin {


    public static String rc4(BufferedReader reader, String key) throws Exception
    {
      StringBuilder builder = new StringBuilder();
      String line = null;

      int[] S = new int[256];
      byte[] keyBytes = key.getBytes();
      int tmp;
      int nextChar = 0;


      for (int i = 0; i < 256; i++)
        S[i] = i;

      for (int i = 0, j = 0; i < 256; i++)
      {
        j = (j + S[i] + keyBytes[i % keyBytes.length]) % 256;
          
        // swap
        tmp = S[i];
        S[i] = S[j];
        S[j] = tmp;
      }

      for (int i = 0, y = 0, j = 0; (nextChar = reader.read()) != -1 ; y++) 
      {
        i = (i + 1) % 256;
        j = (j + S[i]) % 256;
        
        // swap
        tmp = S[i];
        S[i] = S[j];
        S[j] = tmp;

        builder.appendCodePoint(nextChar ^ S[(S[i] + S[j]) % 256]);
      }
    
      return builder.toString();
    }


    public static String loadSVG (String filePath, String password) throws Exception
    { 
    
      File file = new File(filePath);
      FileInputStream stream = new FileInputStream(file);
      BufferedReader reader = new BufferedReader(new InputStreamReader(stream));  
      String result = Safe.rc4(reader, password);

      // otherwise we can crash :(
      stream.close();
      reader.close();

      return result;
    }

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException
    {

      String path = args.getString(0).replace("file://", "");
      String password = args.getString(1);

      try { callbackContext.success(Safe.loadSVG(path, password)); }
      catch(Exception e) { callbackContext.error(e.getMessage());}

      return true;
    }

}
