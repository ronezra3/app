const template = `
<view class="gray-view">
  <ui-view></ui-view>
</view>
`;

export class PlanState {
  abstract = true;
  url = '/enrich/:classId';
  template = template;
}
