const template = `

`;


// <ng-include class="page-number-icon" src="'images/page_icon.svg'"></ng-include>
// <span class="page-number-label">{{'page' | translate}} {{$ctrl.current}}</span>

export class ContentLocation {
  template = template;
  bindings : any = {
    current: '@'
  };
}
