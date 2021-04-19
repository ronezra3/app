const template = `
<section>
  <ul class="panel-section">
    <li><teacher-together-button></teacher-together-button></li>
    <li><attention-button></attention-button></li>
    <li><missing-students-section append-class="panel-button"></missing-students-section></li>
    <li><attendance-button></attendance-button></li>
  </ul>
</section>
`;

export class MDMSection {
  template = template;
}
