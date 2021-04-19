const template = `
<side-bars class="gray-view">
  <side-bars-content>
    <ui-view></ui-view>
  </side-bars-content>

  <right-side-bar>
    <teacher-panel></teacher-panel>
  </right-side-bar>
</side-bars>
`;

export class TeachState {
  abstract = true;
  url = '/teach/:classId';
  template = template;
}
