"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Hammer = require("hammerjs");
var PinchToZoom = /** @class */ (function () {
    function PinchToZoom(el, MatchMediaWrapper, Hammer, $window) {
        this.el = el;
        this.MatchMediaWrapper = MatchMediaWrapper;
        this.Hammer = Hammer;
        this.$window = $window;
        this.posX = 0;
        this.posY = 0;
        this.scale = 1;
        this.lastScale = 1;
        this.lastPosX = 0;
        this.lastPosY = 0;
        this.maxPosX = 0;
        this.maxPosY = 0;
        this.transform = '';
    }
    PinchToZoom.prototype.init = function () {
        var hammertime = new this.Hammer(this.el, {
            cssProps: {
                userSelect: true
            }
        });
        hammertime.get('pinch').set({
            enable: true
        });
        hammertime.on('doubletap pan pinch panend pinchend', this.onChange.bind(this));
        this.MatchMediaWrapper.onPortrait(this.onOrientationChange.bind(this));
    };
    PinchToZoom.prototype.calcMaxPosY = function () {
        var rect = this.el.getBoundingClientRect();
        if (this.$window.innerHeight > rect.bottom) {
            return 0;
        }
        return (rect.bottom + Math.abs(this.posY)) - this.$window.innerHeight;
    };
    PinchToZoom.prototype.generateTransform = function () {
        return "translate3d(" + this.posX + "px," + this.posY + "px, 0) scale3d(" + this.scale + ", " + this.scale + ", 1)";
    };
    PinchToZoom.prototype.onChange = function (ev) {
        switch (ev.type) {
            case 'doubletap':
                this.doubleTap();
                break;
            case 'pan':
                this.pan(ev);
                break;
            case 'pinch':
                this.pinch(ev);
                break;
            case 'pinchend':
                this.pinchEnd();
                break;
            case 'panend':
                this.panEnd();
                break;
        }
        if (this.scale !== 1) {
            this.transform = this.generateTransform();
        }
        if (this.transform) {
            this.el.style.webkitTransform = this.transform;
        }
    };
    PinchToZoom.prototype.onOrientationChange = function () {
        if (this.posY === 0) {
            return;
        }
        var old_max_pos_y = this.maxPosY;
        this.maxPosY = this.calcMaxPosY();
        var ratio = this.maxPosY / old_max_pos_y;
        this.posY = this.posY * ratio;
        this.transform = this.generateTransform();
        this.el.style.webkitTransform = this.transform;
    };
    PinchToZoom.prototype.doubleTap = function () {
        this.transform = "translate3d(0, 0, 0) scale3d(2, 2, 1) ";
        this.scale = 2;
        this.lastScale = 2;
        try {
            if (window.getComputedStyle(this.el, null).getPropertyValue('-webkit-transform').toString() !== 'matrix(1, 0, 0, 1, 0, 0)') {
                this.transform = "translate3d(0, 0, 0) scale3d(1, 1, 1) ";
                this.scale = 1;
                this.lastScale = 1;
            }
        }
        catch (err) {
        }
        this.el.style.webkitTransform = this.transform;
        this.transform = '';
    };
    PinchToZoom.prototype.pan = function (ev) {
        // pan (while not in scale)
        if (this.scale === 1) {
            this.maxPosY = this.calcMaxPosY();
            this.posY = this.lastPosY + ev.deltaY;
            this.maxPosX = 0;
            this.posX = 0;
            if (this.posY > 0) {
                this.posY = 0;
            }
            if (this.posY < -this.maxPosY) {
                this.posY = -this.maxPosY;
            }
            this.transform = this.generateTransform();
        }
        // any other pan
        if (this.scale !== 1) {
            this.posX = this.lastPosX + ev.deltaX;
            this.posY = this.lastPosY + ev.deltaY;
            this.maxPosX = Math.ceil((this.scale - 1) * this.el.clientWidth / 2);
            this.maxPosY = Math.ceil((this.scale - 1) * this.el.clientHeight / 2);
            if (this.posX > this.maxPosX) {
                this.posX = this.maxPosX;
            }
            if (this.posX < -this.maxPosX) {
                this.posX = -this.maxPosX;
            }
            if (this.posY > this.maxPosY) {
                this.posY = this.maxPosY;
            }
            if (this.posY < -this.maxPosY) {
                this.posY = -this.maxPosY;
            }
        }
    };
    PinchToZoom.prototype.pinch = function (ev) {
        this.scale = Math.max(1, Math.min(this.lastScale * (ev.scale), 4));
    };
    PinchToZoom.prototype.pinchEnd = function () {
        this.lastScale = this.scale;
    };
    PinchToZoom.prototype.panEnd = function () {
        this.lastPosX = this.posX < this.maxPosX ? this.posX : this.maxPosX;
        this.lastPosY = this.posY < this.maxPosY ? this.posY : this.maxPosY;
    };
    return PinchToZoom;
}());
/*@ngInject*/
function PinchToZoomFactory(MatchMediaWrapper, $window) {
    return function (elm) {
        var pinchToZoom = new PinchToZoom(elm, MatchMediaWrapper, Hammer, $window);
        pinchToZoom.init();
    };
}
exports.PinchToZoomFactory = PinchToZoomFactory;
//# sourceMappingURL=PinchToZoom.js.map