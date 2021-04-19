import { IBrowser } from '../services/InAppBrowser';

class LinkPreviewController {
  public preview: any;
  public canClose: boolean;

  /*@ngInject*/
  constructor(private InAppBrowser: IBrowser) {
  }

  open() {
    // this.InAppBrowser.open(this.preview.url, this.canClose);
    if (this.preview.type === 'rich') {
      const startIndex = this.preview.html.indexOf('src="//') + 'src="//'.length;
      const lastIndex = this.preview.html.indexOf('schema=google') + 'schema=google'.length;
      const url = this.preview.html.substring(startIndex, lastIndex);
      window.open('http://' + url, '_blank');
    }
    else {
      window.open(this.preview.url, '_blank');
    }
  }
}

const template = `
<button ng-click="$ctrl.open()" style="overflow:hidden">
  <article>
    <header>
      <h2>{{$ctrl.preview.title}}</h2>
      <h3>{{$ctrl.preview.url}}</h3>
    </header>

    <p>{{$ctrl.preview.description}}</p>
  </article>
  <aside ng-if="$ctrl.preview.thumbnail_url">
    <img csp-src="{{$ctrl.preview.thumbnail_url}}"/>
  </aside>
</button>
`;

export class LinkPreview {
  controller = LinkPreviewController;
  template = template;
  bindings: any = {
    preview: '<',
    canClose: '<?'
  };
}
