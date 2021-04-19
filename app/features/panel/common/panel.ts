const template = `
<side-bar>
  <header ng-transclude="header"></header>
  <article ng-transclude="content"></article>
</side-bar>
`;

export class Panel {
  template = template;
  transclude : any = {
    header: '?panelHeader',
    content: 'panelContent'
  };
}
