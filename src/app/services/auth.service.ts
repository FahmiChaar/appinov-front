import { Injectable } from '@angular/core';
import { UiService } from './ui.service';
import { StorageService } from './storage.service';
import { AppConfigService } from './app-config.service';
import { HttpHelperService } from './http-helper.service';
import { PREFIXES } from '../Constants';
import { NavController } from '@ionic/angular';

export interface User {
  name?: string;
  email?: string;
  password?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: User = null;
  public isAuthenticated = false;
  public authToken: string;
  public API = this.appConfig.API;
  constructor(
    private httpHelper: HttpHelperService,
    private appConfig: AppConfigService,
    public ui: UiService,
    private storage: StorageService,
    private navCtrl: NavController
  ) {
    this.loadUserCredentials()
  }

  public loadUserCredentials() {
    return new Promise(async (resolve) => {
      const token = await this.storage.get(PREFIXES.token);
      const currentUser = await this.storage.get(PREFIXES.user);
      if (token && currentUser) {
        this.useCredentials(token, currentUser);
        resolve(currentUser)
      }
      resolve(null)
    })
  }

  storeUserCredentials(token, currentUser) {
    this.storage.set(PREFIXES.token, token);
    this.storage.set(PREFIXES.user, currentUser);
    this.useCredentials(token, currentUser);
  }

  storeUser(currentUser) {
    this.storage.set(PREFIXES.user, currentUser);
    this.user = currentUser;
  }

  async getUser() {
    if (this.user) {
      return this.user;
    } else {
      return await this.storage.get(PREFIXES.user);
    }
  }

  setUser(user) {
    this.user = user;
    this.storage.set(PREFIXES.user, user);
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
      this.storage.remove(PREFIXES.user);
      this.storage.remove(PREFIXES.token);
      this.user = {};
      resolve(true);
    });
  }

  login(user) {
    return new Promise(async (resolve, reject) => {
      await this.ui.loading();
      this.httpHelper.request('post', '/login', user).subscribe({
        next: resp => {
          this.ui.unLoading();
          console.log(resp)
          this.storeUserCredentials(resp.token, resp.user);
          this.ui.fireSuccess('Welcome.');
          resolve(resp);
        },
        error: err => {
          console.log(err)
          this.ui.fireError(err)
          reject(err)
        }
      })
    })
  }

  register(user) {
    return new Promise(async (resolve, reject) => {
      await this.ui.loading();
      this.httpHelper.request('post', '/register', user).subscribe({
        next: resp => {
          this.ui.unLoading();
          console.log(resp)
          this.storeUserCredentials(resp.token, resp.user);
          this.ui.fireSuccess('Welcome');
          resolve(resp);
        },
        error: err => {
          this.ui.fireError(err)
          reject(err)
        }
      })
    })
  }

  async logout() {
    await this.destroyUserCredentials();
    this.navCtrl.navigateRoot('login')
  }

}
