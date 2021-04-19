import { CurrentSession } from '../../session/services/CurrentSession';
import { TogetherEventsRouter } from '../../together/services/TogetherEventsRouter';
import { CurrentBook } from '../../books/services/CurrentBook';
import { IStateService } from 'angular-ui-router';
import { IState } from 'angular-ui-router';

export abstract class ReaderController {
  public pageUrl;
  public mode;

  /*@ngInject*/
  constructor(protected Together, public bookInfo, private $state: IStateService, protected CurrentBook: CurrentBook, pageUrl,
    private LastBookPage, public isTeacher, protected CurrentSession: CurrentSession,
    private TogetherEventsRouter: TogetherEventsRouter, private $location) {
    TogetherEventsRouter.onPageChanged(this.setPageUrl.bind(this));
    this.setPageUrl(pageUrl || this.getDefaultPageUrl());
    this.mode = (<IState>(<IState>(<IState>$state.$current).parent).parent).name;
  }

  getLocation() {
    return this.$location;
  }
  isControlled() {
    return this.Together.isControlled();
  }

  leave() {
    if (this.Together.inControl()) {
      this.Together.update();
    }
  }

  protected abstract getDefaultPageUrl();

  public setPageUrl(pageUrl) {
    if (this.Together.inControl()) {
      this.Together.update(this.bookInfo.id, pageUrl);
    }

    this.pageUrl = pageUrl;
    this.CurrentBook.pageUrl = pageUrl;
    this.LastBookPage.set(this.bookInfo.id, this.$state.params['classId'], pageUrl);

    if (this.isTeacher && this.mode === 'teach') {
      this.CurrentSession.reportVisitedPage(this.bookInfo, pageUrl);
    }
  }
}
