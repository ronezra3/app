"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*@ngInject*/
function PercentageFilter($filter) {
    return function (input, decimals) {
        return $filter('number')(input * 100, decimals) + '%';
    };
}
exports.PercentageFilter = PercentageFilter;
//# sourceMappingURL=PercentageFilter.js.map