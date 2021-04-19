export class EmbeddedPhoto {
  template = '<article class="photo-preview"><img csp-src="{{$ctrl.preview.url}}"></article>';
  bindings : any = {
    preview: '<'
  };
}
