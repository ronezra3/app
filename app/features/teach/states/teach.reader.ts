const template = `
<ui-view></ui-view>
`;

export class TeachReaderState {
  url = '/reader/:bookId/:classCode';
  template = template;
  abstract = true;
}
