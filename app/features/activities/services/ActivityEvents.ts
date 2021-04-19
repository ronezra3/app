import {Localytics} from '../../common/services/Localytics';
export class ActivityEvents {

  /*@ngInject*/
  constructor(private Localytics : Localytics, private lodash) {

  }

  tagSave(type, isNew, isContextual, specificData) {
    this.tagEvent('Saved', type, isNew, isContextual, specificData);
  }

  tagPublish(type, isNew, isContextual, specificData) {
    this.tagEvent('Publish', type, isNew, isContextual, specificData);
  }

  private tagEvent(event, type, isNew, isContextual, specificData) {
    let baseEventData = {
      isContextual: isContextual,
      isNew: isNew
    };

    this.Localytics.tagEvent(`${type} ${event}`, this.lodash.merge(baseEventData, specificData));
  }
}
