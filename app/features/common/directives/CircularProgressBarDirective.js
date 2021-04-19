"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ProgressBar = require("progressbar");
var CircularProgressBarController = /** @class */ (function () {
    /*@ngInject*/
    function CircularProgressBarController($element, Utilities) {
        this.$element = $element;
        this.Utilities = Utilities;
        this.isDownloading = false;
        this.progressReported = false;
    }
    CircularProgressBarController.prototype.$onInit = function () {
        var _this = this;
        if (!this.downloadPromise) {
            return;
        }
        this.circle = new ProgressBar.Circle(this.$element[0], {
            color: this.color || 'white',
            strokeWidth: 7,
            trailWidth: 0,
            duration: 1500,
            text: {
                className: 'progressbar-text circular-text'
            },
            step: function (state, bar) {
                var value = bar.value();
                if (value) {
                    bar.setText(_this.Utilities.percentify(value) + '%');
                }
            }
        });
        this.downloadPromise.then(null, null, this.onProgress.bind(this));
    };
    CircularProgressBarController.prototype.onProgress = function (value) {
        if (!this.progressReported) {
            this.circle.set(value);
            this.progressReported = true;
        }
        else {
            this.circle.animate(value);
        }
        this.isDownloading = true;
    };
    return CircularProgressBarController;
}());
var template = "\n<div class=\"outer-spin\" ng-class=\"{downloading : $ctrl.isDownloading}\">\n  <div class=\"inner-spin\"></div>\n</div>\n";
var CircularProgressBar = /** @class */ (function () {
    function CircularProgressBar() {
        this.controller = CircularProgressBarController;
        this.template = template;
        this.bindings = {
            color: '@?',
            downloadPromise: '<?'
        };
    }
    return CircularProgressBar;
}());
exports.CircularProgressBar = CircularProgressBar;
//# sourceMappingURL=CircularProgressBarDirective.js.map