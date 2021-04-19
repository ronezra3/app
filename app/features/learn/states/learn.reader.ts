const template = `
<ui-view></ui-view>
`;

export class LearnReaderState {
  url = '/reader/:bookId';
  template = template;
  abstract = true;
}
