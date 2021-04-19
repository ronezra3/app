"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function CssUtilities() {
    function getRootElementFontSize() {
        return parseFloat(getComputedStyle(document.documentElement).fontSize);
    }
    function convertRem(value) {
        return value * getRootElementFontSize();
    }
    return {
        convertRem: convertRem
    };
}
exports.CssUtilities = CssUtilities;
//# sourceMappingURL=CssUtilities.js.map