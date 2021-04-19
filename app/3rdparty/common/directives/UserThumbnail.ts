import IComponentOptions = angular.IComponentOptions;
import { LogOut } from '../services/LogOut';
import { CurrentUser } from '../services/CurrentUser'; 
import { UsersProxy } from '../../../features/users/services/UsersProxy';
import { UsersStore } from '../../../features/users/services/UsersStore';

class UserThumbnailController {
  public user: any;
  private popup: any;
  private userProxy: any;
  private userStore: any;
  
  /*@ngInject*/
  constructor(private Popup, private ngDialogRouter, private LogOut: LogOut, private CurrentUser: CurrentUser, private UsersProxy, private ENV, private UsersStore, private $state, private AuthenticationToken) {
    this.user = CurrentUser.get();
    this.userProxy = new UsersProxy(CurrentUser.get());

    this.userStore = UsersStore.create();
  }


  $onInit() {
    let menuAttr = {
      user: this.user
    };

    if (this.ENV.ssoLoginEnabled) {
      if (this.user.isTeacher) {
        menuAttr["loginAsStudent"] = this.loginSSO.bind(this, "student_login");
      }
      else {
        menuAttr["loginAsTeacher"] = this.loginSSO.bind(this, "teacher_login");
      }
    }
    else {
      menuAttr["openEditProfile"] = this.openEditProfile.bind(this);
      menuAttr["logout"] = this.logout.bind(this);
    }

    this.popup = new this.Popup({ template: require('./../templates/user-menu.html') }, menuAttr, true);
  }

  public toggleUserPopup() {
    this.popup.toggle();
  }

  private openEditProfile() {
    this.ngDialogRouter.go('editProfile', {});
    this.popup.close();
  }

  private loginSSO(isTeacher) {
    this.popup.close();

    this.userStore.$loginSSO({isTeacher: isTeacher}).then((userResult)=>{
      this.CurrentUser.set(userResult);
      this.AuthenticationToken.set(userResult.token);
      
      this.$state.reload();
      //return this.$state.go('classes', null, { replace: true });
    })
  }

  private logout() {
    this.popup.close();
    this.userProxy.$logout().finally((res)=>{
      this.LogOut.logOut();
    })
    
  }
  getAvater() {
    return this.userProxy.getAvatarUrl(100);
  }
}

export class UserThumbnail implements IComponentOptions {
  public controller: any = UserThumbnailController;
  public template: string = `<button ng-click="$ctrl.toggleUserPopup()">
                                  <span>{{$ctrl.user.firstName}}</span>
                                  <img csp-src="{{$ctrl.getAvater()}}"/>
                              </button>`;
}

