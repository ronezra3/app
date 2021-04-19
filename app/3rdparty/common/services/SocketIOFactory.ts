import * as io from 'socket.io-client';
import { LogOut } from './LogOut';

/*@ngInject*/
export function SocketIO($rootScope, lodash, AuthenticationToken, LogOut: LogOut, $q) {
  var socket;

  function connect(url, query) {
    var deferred = $q.defer();

    var params = {
      'forceNew': true,
      'sync disconnect on unload': false,
      'transports': ['websocket']
    };

    if (angular.isDefined(query)) {
      params["query"] = query;
    }

    socket = io.connect(url, params);
    

    socket.on('connect', function () {
    
      socket.on('authenticated', deferred.resolve);
      socket.on('unauthorized', function () {
        deferred.reject();
        LogOut.logOut();
      });

      socket.emit('authentication', { token: AuthenticationToken.get() });
    });

    return deferred.promise;
  }

  function disconnect() {
    socket.disconnect();
    socket = null;
  }

  function on(eventName, callback) {


    

    socket.on(eventName, function () {
    
      var args = arguments;
      if (callback) {
        lodash.defer(function () {
          $rootScope.$apply(function () {
            callback.apply(socket, args);
          });
        });
      }
    });
  }

  function emit(roomId, eventName, data, callback) {

    var roomData = {
      roomId: roomId,
      data: data
    };

    

    socket.emit(eventName, roomData, function () {
      var args = arguments;
    
      if (callback) {
        lodash.defer(function () {
          $rootScope.$apply(function () {
            callback.apply(socket, args);
          });
        });
      }
    });
  }


  function removeAllListeners(eventName) {
    socket.removeAllListeners(eventName);
  }

  return {
    connect: connect,
    disconnect: disconnect,
    on: on,
    emit: emit,
    removeAllListeners: removeAllListeners
  };
}
