"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EmbeddedPhoto = /** @class */ (function () {
    function EmbeddedPhoto() {
        this.template = '<article class="photo-preview"><img csp-src="{{$ctrl.preview.url}}"></article>';
        this.bindings = {
            preview: '<'
        };
    }
    return EmbeddedPhoto;
}());
exports.EmbeddedPhoto = EmbeddedPhoto;
//# sourceMappingURL=EmbeddedPhoto.js.map