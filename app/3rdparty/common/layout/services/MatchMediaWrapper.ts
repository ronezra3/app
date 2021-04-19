export class MatchMediaWrapper {
  /*@ngInject*/
  constructor(private matchmedia, private LayoutValues) {
  }

  public isMiniTablet() {
    return this.matchmedia.is(this.queryBuilder(this.LayoutValues.miniTablet.width, this.LayoutValues.miniTablet.height));
  }

  public onMiniTablet(callback) {
    return this.matchmedia.on(this.queryBuilder(this.LayoutValues.miniTablet.width, this.LayoutValues.miniTablet.height), callback);
  }

  public isPhone() {
    return this.matchmedia.is(this.queryBuilder(this.LayoutValues.phone.width, this.LayoutValues.phone.height));
  }

  public onPhone(callback) {
    return this.matchmedia.on(this.queryBuilder(this.LayoutValues.phone.width, this.LayoutValues.phone.height), callback);
  }

  public isMiniTabletOrSmaller() {
    return this.isMiniTablet() || this.isPhone();
  }

  public isLandscape() {
    return this.matchmedia.isLandscape();
  }

  public onPortrait(callback) {
    this.matchmedia.onPortrait((orientation) => callback(orientation.matches));
  }

  public isPortrait() {
    return this.matchmedia.isPortrait();
  }

  private queryBuilder(width, height) {
    return `screen and (max-width : ${width}px) and (orientation: portrait),
      screen and (max-width : ${height}px) and (orientation: landscape)`;
  }
}
