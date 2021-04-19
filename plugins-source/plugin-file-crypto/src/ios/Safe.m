#import "Safe.h"


#define byte_swap(a, b)  do { unsigned char __tmp = (a); (a) = (b); (b) = __tmp; } while (0)
#define BUFFER_SIZE (1024 *(500/sizeof(unichar))) // background thread stack limit is 512kb 


@implementation Safe

- (void) failWithError: (NSString*) error forCommand: (CDVInvokedUrlCommand*) command {  
  
  CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:error];
  [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];  
} 

- (void) sendResult: (NSString*) result forCommand: (CDVInvokedUrlCommand*) command {

  CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:result];
  [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(NSString*) rc4:(NSString*) str key:(NSString*) key
{   
    unichar buffer[BUFFER_SIZE]; 
    unsigned char s[256];
    NSString* result = @"";


    for (int i = 0; i < 256; i++) 
      s[i] = i;
    
    for (int i = 0, j = 0; i < 256; i++) 
    {
        j = (j + s[i] + [key characterAtIndex:(i % key.length)]) % 256;
        byte_swap(s[i], s[j]);
    }

    for (int y = 0, i = 0, j = 0, mod_y = 0; y < str.length; y++, mod_y = (y % BUFFER_SIZE)) 
    {
        i = (i + 1) % 256;
        j = (j + s[i]) % 256;
        byte_swap(s[i], s[j]);

        buffer[mod_y] = [str characterAtIndex:y] ^ s[ (s[i] + s[j]) % 256];

        if (mod_y == (BUFFER_SIZE - 1) || y+1 == str.length)
          result = [result stringByAppendingString:[NSString stringWithCharacters:buffer length:(mod_y+1)]];
    }

    return result;
}

- (void) load: (CDVInvokedUrlCommand *) command {

  NSURL* url = [NSURL URLWithString:[command.arguments objectAtIndex:0]];

  NSFileManager *fileManager = [NSFileManager defaultManager];
  BOOL fileExists = [fileManager fileExistsAtPath:url.path];


  NSString* password = [command.arguments objectAtIndex:1];
  

  if (!fileExists) {
    [self failWithError:[@"can't find file: " stringByAppendingString:url.path] forCommand:command];
    return; 
  }

 if (password == nil || [password length] == 0) {
    [self failWithError:@"no password was given" forCommand:command];
    return; 
  }

  [self.commandDelegate runInBackground:^{
    
    NSString* content = [NSString stringWithContentsOfFile:url.path encoding:NSUTF8StringEncoding error:nil];
    NSString* result = [self rc4:content key:password];
    [self sendResult:result forCommand:command];

  }];
}

@end
