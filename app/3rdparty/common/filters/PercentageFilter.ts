/*@ngInject*/
export function PercentageFilter($filter) {
  return function (input, decimals) {
    return $filter('number')(input * 100, decimals) + '%';
  };
}
