import * as ProgressBar from 'progressbar';

class CircularProgressBarController {
  color;
  downloadPromise;
  isDownloading = false;
  private circle;
  private progressReported = false;

  /*@ngInject*/
  constructor(private $element, private Utilities) {
  }

  $onInit() {
    if (!this.downloadPromise) {
      return;
    }

    this.circle = new ProgressBar.Circle(this.$element[0], {
      color: this.color || 'white',
      strokeWidth: 7,
      trailWidth: 0,
      duration: 1500,
      text: {
        className: 'progressbar-text circular-text'
      },
      step: (state, bar) => {
        let value = bar.value();
        if (value) {
          bar.setText(this.Utilities.percentify(value) + '%');
        }
      }
    });

    this.downloadPromise.then(null, null, this.onProgress.bind(this));
  }


  onProgress(value) {
    if (!this.progressReported) {
      this.circle.set(value);
      this.progressReported = true;
    } else {
      this.circle.animate(value);
    }

    this.isDownloading = true;
  }
}

const template = `
<div class="outer-spin" ng-class="{downloading : $ctrl.isDownloading}">
  <div class="inner-spin"></div>
</div>
`;

export class CircularProgressBar {
  controller = CircularProgressBarController;
  template = template;
  bindings : any = {
    color: '@?',
    downloadPromise: '<?'
  };
}
