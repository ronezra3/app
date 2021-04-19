import {MatchMediaWrapper} from '../../../3rdparty/common/layout/services/MatchMediaWrapper';
import * as Hammer from 'hammerjs';

class PinchToZoom {
  posX = 0;
  posY = 0;
  scale = 1;
  lastScale = 1;
  lastPosX = 0;
  lastPosY = 0;
  maxPosX = 0;
  maxPosY = 0;
  transform = '';

  constructor(private el, private MatchMediaWrapper : MatchMediaWrapper, private Hammer, private $window : IExtendedWindowService) {
  }

  public init() {
    let hammertime = new this.Hammer(this.el, {
      cssProps: {
        userSelect: true
      }
    });

    hammertime.get('pinch').set({
      enable: true
    });

    hammertime.on('doubletap pan pinch panend pinchend', this.onChange.bind(this));
    this.MatchMediaWrapper.onPortrait(this.onOrientationChange.bind(this));
  }

  private calcMaxPosY() {
    let rect = this.el.getBoundingClientRect();
    if (this.$window.innerHeight > rect.bottom) {
      return 0;
    }

    return (rect.bottom + Math.abs(this.posY)) - this.$window.innerHeight;
  }

  private generateTransform() {
    return `translate3d(${this.posX}px,${this.posY}px, 0) scale3d(${this.scale}, ${this.scale}, 1)`;
  }

  private onChange(ev : HammerInput) {
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
  }

  private onOrientationChange() {
    if (this.posY === 0) {
      return;
    }

    let old_max_pos_y = this.maxPosY;
    this.maxPosY = this.calcMaxPosY();
    let ratio = this.maxPosY / old_max_pos_y;
    this.posY = this.posY * ratio;
    this.transform = this.generateTransform();
    this.el.style.webkitTransform = this.transform;
  }

  private doubleTap() {
    this.transform = `translate3d(0, 0, 0) scale3d(2, 2, 1) `;
    this.scale = 2;
    this.lastScale = 2;

    try {
      if (window.getComputedStyle(this.el, null).getPropertyValue('-webkit-transform').toString() !== 'matrix(1, 0, 0, 1, 0, 0)') {
        this.transform = `translate3d(0, 0, 0) scale3d(1, 1, 1) `;
        this.scale = 1;
        this.lastScale = 1;
      }
    } catch (err) {
    }

    this.el.style.webkitTransform = this.transform;
    this.transform = '';
  }

  private pan(ev) {
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
  }

  private pinch(ev) {
    this.scale = Math.max(1, Math.min(this.lastScale * (ev.scale), 4));
  }

  private pinchEnd() {
    this.lastScale = this.scale;
  }

  private panEnd() {
    this.lastPosX = this.posX < this.maxPosX ? this.posX : this.maxPosX;
    this.lastPosY = this.posY < this.maxPosY ? this.posY : this.maxPosY;
  }
}

/*@ngInject*/
export function PinchToZoomFactory(MatchMediaWrapper : MatchMediaWrapper, $window : IExtendedWindowService) {
  return (elm : HTMLElement) => {
    let pinchToZoom = new PinchToZoom(elm, MatchMediaWrapper, Hammer, $window);
    pinchToZoom.init();
  };
}
