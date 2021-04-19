

/*@ngInject*/
export function ImageOnLoad() {
  return {
    link: link,
    restrict: 'A'
  };

  function link(scope, element, attrs) {
                  element.bind('load', function() {
                alert('image is loaded');
            });
            element.bind('error', function(){
                alert('image could not be loaded');
            });
  }
}


// app.directive('imageonload', function() {
//     return {
//         restrict: 'A',
//         link: function(scope, element, attrs) {
//             element.bind('load', function() {
//                 alert('image is loaded');
//             });
//             element.bind('error', function(){
//                 alert('image could not be loaded');
//             });
//         }
//     };
// });