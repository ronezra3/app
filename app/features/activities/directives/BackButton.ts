import {BackButtonController} from '../../../3rdparty/common/layout/directives/BackButton';

const template = `
<button ng-click="$ctrl.back()">
  <ng-include src="'3rdparty/common/images/back_arrow.png'"></ng-include>
</button>
`;

export class ActivityBackButton {
  template = template;
  controller = BackButtonController;
}
