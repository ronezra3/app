<img src="icon.png" width="35px"> LiveRhino
=================================================================

## Installation:
 * install node.js and NPM latest versions 
 * `sudo npm i -g typescript typings cordova tslint karma jasmine`
 * install genymotion
 
##### WebStorm configurations:
 * enable tslint:
    - ctrl + alt + s (settings screen file --> Settings)
    - Languages & Frameworks
    - Press the arrow next to TypeScript
    - TSLint
    - press "Enable" and choose the default TSLint package
 * disable typescript compiler:
    - ctrl + alt + s (settings screen file --> Settings)
    - Languages & Frameworks
    - TypeScript
    - under the compiler section make sure that the "enable TypeScript Compiler" is **turned off**
 * fix TypesScript convention
    - ctrl + alt + s (settings screen file --> Settings)
    - Editor
    - CodeStyle --> TypeScript
    - Spaces tab
        - all the way to the end and activate:
            - `Before type reference colon ':'`
            - `After type reference colon ':'`
    - Other tab
        - Generated code
            - String literal type: change to `Single quote`
    
    
    
*if you have any other WebStorm Compiler (such as SASS) turn it off as well.
 
#####After clone repository:
 - navigate to local repo folder
 - `npm install`
 - `npm run build`
 - `cordova platform add ios` (only on OSX)
 - `cordova platform add android`
 - `cordova platform add windows` (only on windows 8+)
 
### Running unit-tests:
 * `npm run test`

### Running the app:
 * `npm run serve`
 * `npm run serve:integ`
 * `npm run build:android` (Android simulator, requires Genymotion)
 * `npm run build:ios` (IOS simulator, requires XCode 6.0+) 
 * `npm run build:windows`

### Build app:
 * `npm run build:integ` (web and chromeapps)
 * `npm run build:integ:android\ios\windows`
 * `npm run build:prod:anrdoid\ios\windows`
 
#### Android prerequisites:
* Download and install [Android Studio](http://developer.android.com/sdk/index.html#mac-bundle)
* Open Android studio and open Configure -> SDK Manager
* Install the sdks you need.
* Notice the path on the top of the sdk manager window. Copy it and add /platform-tools to it.
* Follow the [instructions](http://architectryan.com/2012/10/02/add-to-the-path-on-mac-os-x-mountain-lion/#.VKACusDB) and add the previous path.
* go to Home directory (cd ~)
* sudo nano .profile and add the following lines:
  * `export ANDROID_HOME=//Users/YOUR_USER_NAME/Library/Android/sdk`
  * `export PATH=${PATH}:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools`
* save and open new Terminal window
* `ionic browser add crosswalk@13.41.318.0`
* Now you can compile and deploy the apk to device using grunt:run:android or grunt:run:production:android

####Windows prerequisites:
* visual studio

####IOS prerequisites:
 * `brew update` (requires [HomeBrew](http://brew.sh/))
 * `brew install ant`
 * `sudo npm install ios-sim -g`
 * `sudo npm install ios-deploy -g`
