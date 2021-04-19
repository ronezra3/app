"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var template = "\n<div class=\"login-avatar\" ng-click=\"createAvatar()\">\n  <div class=\"image-container\">\n    <img class=\"image\" ng-src=\"{{avatarPath || avatarUrl}}\">\n    <img class=\"pen\" csp-src=\"3rdparty/common/images/avatar_pen.svg\"/>\n  </div>\n</div>\n";
/*@ngInject*/
function CordovaAvatarPicker(lodash, Popup, $q) {
    return {
        restrict: 'E',
        template: template,
        scope: { onAvatarAdded: '&', avatarUrl: '=' },
        link: function (scope, element, attrs) {
            function getOptions() {
                return {
                    quality: 40,
                    destinationType: Camera.DestinationType.DATA_URL,
                    encodingType: navigator.camera.EncodingType.JPEG,
                    saveToPhotoAlbum: false,
                    allowEdit: true
                };
            }
            function getPicture(options) {
                var deferred = $q.defer();
                options = lodash.extend(getOptions(), options);
                navigator.camera.getPicture(lodash.partial(onSuccess, deferred), lodash.partial(onFailure, deferred), options);
                return deferred.promise;
            }
            var fromCamera = function () {
                var options = {
                    sourceType: navigator.camera.PictureSourceType.CAMERA,
                    cameraDirection: navigator.camera.Direction.FRONT
                };
                return getPicture(options);
            };
            var fromGallery = function () {
                var options = {
                    sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
                };
                return getPicture(options);
            };
            var popup = new Popup({ template: require('./../templates/avatar_source_picker.html') }, {
                fromCamera: fromCamera,
                fromGallery: fromGallery
            }, true);
            scope.createAvatar = function () {
                popup.toggle();
            };
            function onSuccess(deferred, filePath) {
                popup.close();
                scope.avatarPath = 'data:image/jpeg;base64,' + filePath;
                scope.onAvatarAdded({ avatar: filePath });
                scope.$apply();
                deferred.resolve();
            }
            function onFailure(deferred, error) {
                if (error !== 'Selection cancelled.' && error !== 'Camera cancelled.' && error !== 'no image selected') {
                    deferred.reject('camera_error');
                }
                else {
                    deferred.reject();
                }
            }
            scope.$on('$destroy', function () {
                popup.close();
            });
        }
    };
}
exports.CordovaAvatarPicker = CordovaAvatarPicker;
//# sourceMappingURL=CordovaAvatarPicker.js.map