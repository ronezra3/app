import { UrlResourceWrapper } from './ResourceWrapper';
export interface IUrl extends ng.resource.IResource<IUrl> {
  id: string;
  urls: [{
    // actualUrl: string;
    //  preview: any;
  }];
}

export interface IURLResource extends ng.resource.IResourceClass<IUrl> {
  preview({url: string});
}

/*@ngInject*/
export function Url($resource: ng.resource.IResourceService, ENV: any, CurrentUser): IURLResource {
  return new UrlResourceWrapper($resource, ENV, CurrentUser).get();
}
