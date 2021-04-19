"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function InfiniteScroll() {
    function link(scope, element, attrs) {
        element.addClass('infinite-scroll');
        var raw = element[0];
        element.bind('scroll', function () {
            if (scope.isLoading) {
                return;
            }
            if (raw.scrollLeft + raw.offsetWidth + calcDistance(scope.distance, raw.scrollWidth) >= raw.scrollWidth) {
                scope.$apply(scope.loadMore);
            }
        });
    }
    function calcDistance(distance, width) {
        return width / distance;
    }
    return {
        restrict: 'E',
        scope: {
            loadMore: '&onInfinite',
            /** distance from the edge of the infinite-scroll element to call the "on-infinite" callback, in percentage **/
            distance: '=',
            isLoading: '='
        },
        link: link
    };
}
exports.InfiniteScroll = InfiniteScroll;
//# sourceMappingURL=InfiniteScrollDirective.js.map