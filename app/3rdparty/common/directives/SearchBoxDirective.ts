export function SearchBox() {
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
