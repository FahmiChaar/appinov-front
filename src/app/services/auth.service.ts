import { Injectable } from '@angular/core';
import { UiService } from './ui.service';
import { StorageService } from './storage.service';
import { AppConfigService } from './app-config.service';
import { HttpHelperService } from './http-helper.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: any = null;
  public isAuthenticated = false;
  public authToken: string;
  public API = this.appConfig.API;
  deviceId: string
  currentUserPrefix = 'currentUser'
  tokenPrefix = 'token'
  constructor(
    private httpHelper: HttpHelperService,
    private appConfig: AppConfigService,
    public ui: UiService,
    private storage: StorageService
  ) {
    this.loadUserCredentials()
  }

  public loadUserCredentials() {
    return new Promise(async (resolve) => {
      const token = await this.storage.get(this.tokenPrefix);
      const currentUser = await this.storage.get(this.currentUserPrefix);
      if (token && currentUser) {
        this.useCredentials(token, currentUser);
        resolve(currentUser)
      }
      resolve(null)
    })
  }

  storeUserCredentials(token, currentUser) {
    this.storage.set(this.tokenPrefix, token);
    this.storage.set(this.currentUserPrefix, currentUser);
    this.useCredentials(token, currentUser);
  }

  storeUser(currentUser) {
    this.storage.set(this.currentUserPrefix, currentUser);
    this.user = currentUser;
  }

  async getUser() {
    if (this.user) {
      return this.user;
    } else {
      return await this.storage.get(this.currentUserPrefix);
    }
  }

  setUser(user) {
    this.user = user;
    this.storage.set(this.currentUserPrefix, user);
  }

  useCredentials(token, currentUser) {
    console.log('i use the creadentials');
    this.isAuthenticated = true;
    this.authToken = token;
    this.user = currentUser;
    console.log(this.user);
  }

  destroyUserCredentials() {
    return new Promise((resolve) => {
      this.authToken = undefined;
      this.isAuthenticated = false;
      this.storage.remove(this.currentUserPrefix);
      this.storage.remove(this.tokenPrefix);
      this.user = {};
      resolve(true);
    });
  }

  login(user) {
    return new Promise(async (resolve, reject) => {
      await this.ui.loading();
      this.httpHelper.request('post', '/auth/login', user).subscribe(resp => {
        this.ui.unLoading();
        console.log(resp)
        // this.storeUserCredentials(resp.token, resp.user);
        this.ui.fireSuccess('Welcome');
        resolve(resp);
      }, err => {
        this.ui.fireError(err)
        reject(err)
      })
    })
  }

  logout() {
    return this.destroyUserCredentials();
  }

}
