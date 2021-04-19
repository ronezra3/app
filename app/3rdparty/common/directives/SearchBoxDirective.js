"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function SearchBox() {
    return {
        template: require('./../templates/search_box.html'),
        link: link,
        restrict: 'E',
        scope: {
            model: '='
        }
    };
    function link(scope, element, attrs) {
        scope.setIsSearching = function (isSearching) {
            scope.isSearching = isSearching;
        };
    }
}
exports.SearchBox = SearchBox;
//# sourceMappingURL=SearchBoxDirective.js.map