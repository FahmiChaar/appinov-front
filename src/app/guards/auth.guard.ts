import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { NavController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { PREFIXES } from '../Constants';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private navCtrl: NavController,
    private storage: StorageService
  ) { }

  async canActivate(): Promise<boolean> {
    const user = await this.storage.get(PREFIXES.user)
    if (user) {
      this.navCtrl.navigateRoot('/home')
    }
    return true
  }
}
