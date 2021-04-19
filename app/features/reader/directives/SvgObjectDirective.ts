import { SvgBookStorage } from '../services/storage/SvgBookStorage';

class SvgObjectController {
  public isLoading;
  public pageUrl;
  public bookInfo;
  private lastRequestedPageUrl;
  private pageContainer = this.$element.children()[1];
  private bookStorage: SvgBookStorage;
  bookUrls = [];
  /*@ngInject*/
  constructor(private $element, private SvgBookStorageFactory) {
    this.bookStorage = this.SvgBookStorageFactory(this.bookInfo);
  }

  // $onInit() {

  // }

  $onChanges(changes) {
    if (changes.pageUrl) {
      this.loadCurrentPage();
    }
  }

  // private loadCurrentPage2() {
  //   this.lastRequestedPageUrl = this.pageUrl;

  //   if (!this.isLoading) {
  //     this.isLoading = true;
  //     this.loadLastRequestedPage();
  //   }

  //   var img = new Image();
  //   img.onload = () => {

  //     this.pageContainer.innerHTML = '';
  //     this.pageContainer.appendChild(img);
  //   }
  //   img.src = this.bookUrls[this.pageUrl];

  // }


  private loadCurrentPage() {
    this.lastRequestedPageUrl = this.pageUrl - 1;
    if (!this.isLoading) {
      this.isLoading = true;
      this.loadLastRequestedPage();
    }
  }

  private loadLastRequestedPage() {
    let lastRequestedPageUrlWas = this.lastRequestedPageUrl;
    var content;
      content = this.bookStorage.fetchPage(lastRequestedPageUrlWas);

      if (this.lastRequestedPageUrl !== lastRequestedPageUrlWas) {
      return this.loadLastRequestedPage();
    }
    content.className = "content scrollable";
    this.pageContainer.innerHTML = '';
    this.pageContainer.appendChild(content);
    this.isLoading = false
  }
}

export class SvgObject {
  template = `<loader class="page-loader" ng-show="$ctrl.isLoading"></loader>
              <div pinch-to-zoom></div>`;
  controller = SvgObjectController;
  bindings: any = {
    pageUrl: '<',
    bookInfo: '<'
  };
}
