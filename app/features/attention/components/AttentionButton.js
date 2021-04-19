"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AttentionController = /** @class */ (function () {
    /*@ngInject*/
    function AttentionController(Attention) {
        this.Attention = Attention;
    }
    AttentionController.prototype.$onInit = function () {
        this.isInAttention = this.Attention.isInAttention();
    };
    AttentionController.prototype.toggle = function () {
        var _this = this;
        this.isInAttention = !this.isInAttention;
        return this.Attention.toggle().catch(function () { return _this.isInAttention = !_this.isInAttention; });
    };
    return AttentionController;
}());
var template = "\n<button class=\"panel-button\" ng-class=\"{selected: $ctrl.isInAttention}\" ng-click=\"$ctrl.toggle()\">\n  <loader></loader>\n  <ng-include src=\"'images/panel/icons/attention.svg'\"></ng-include>\n  <span class=\"text\">{{'attention' | translate}}</span>\n</button>\n";
var AttentionButton = /** @class */ (function () {
    function AttentionButton() {
        this.template = template;
        this.controller = AttentionController;
    }
    return AttentionButton;
}());
exports.AttentionButton = AttentionButton;
//# sourceMappingURL=AttentionButton.js.map