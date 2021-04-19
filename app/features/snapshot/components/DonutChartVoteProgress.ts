class DonutChartVoteProgressController {
  radiusInRem;
  middleInRem;
  circumference;
  votesCount;
  total;
  counterClockwise;

  /*@ngInject*/
  constructor(private CssUtilities) {
    this.radiusInRem = 10.25;
    this.middleInRem = 10.875;
    this.circumference = 2 * Math.PI * this.radiusInRem;
  }

  convertRem(value) {
    return this.CssUtilities.convertRem(value);
  }

  transform(middle) {
    return this.counterClockwise ? `rotate(-90 ${middle} ${middle}) scale(1,-1) translate(0,-${middle * 2})` : `rotate(-90 ${middle} ${middle})`;
  }

  getOffset() {
    var votesPercentage = (this.votesCount / this.total) || 0;
    var votesStroke = this.circumference * votesPercentage;
    return this.circumference - votesStroke;
  }
}

const template = `
<circle class="circle-animation"
        ng-attr-r="{{$ctrl.convertRem($ctrl.radiusInRem)}}" ng-attr-cy="{{$ctrl.convertRem($ctrl.middleInRem)}}"
        ng-attr-cx="{{$ctrl.convertRem($ctrl.middleInRem)}}" stroke-dashoffset="{{$ctrl.convertRem($ctrl.getOffset())}}"
        ng-attr-transform="{{$ctrl.transform($ctrl.convertRem($ctrl.middleInRem))}}"
        stroke-dasharray="{{$ctrl.convertRem($ctrl.circumference)}}" stroke-width="{{$ctrl.convertRem(1.125)}}"/>
`;

export function DonutChartVoteProgress() {
  return {
    replace: true,
    scope: {},
    controllerAs: '$ctrl',
    templateNamespace: 'svg',
    bindToController: {
      votesCount: '<',
      total: '<',
      counterClockwise: '<'
    },
    template: template,
    controller: DonutChartVoteProgressController
  };
}
