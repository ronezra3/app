import {Attention} from '../services/AttentionFactory';

class AttentionController {
  isInAttention;

  /*@ngInject*/
  constructor(private Attention : Attention) {
  }

  $onInit() {
    this.isInAttention = this.Attention.isInAttention();
  }

  toggle() {
    this.isInAttention = !this.isInAttention;
    return this.Attention.toggle().catch(() => this.isInAttention = !this.isInAttention);
  }
}

const template = `
<button class="panel-button" ng-class="{selected: $ctrl.isInAttention}" ng-click="$ctrl.toggle()">
  <loader></loader>
  <ng-include src="'images/panel/icons/attention.png'"></ng-include>
  <span class="text">{{'attention' | translate}}</span>
</button>
`;

export class AttentionButton {
  template = template;
  controller = AttentionController;
}
