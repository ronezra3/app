#import <Foundation/Foundation.h>
#import <Security/SecRandom.h>
#import <Cordova/CDV.h>



@interface Safe : CDVPlugin {
}

- (void) load:(CDVInvokedUrlCommand*)command;

@end
