import { Injectable } from '@angular/core';
import { AlertController, ModalController, LoadingController, ToastController } from '@ionic/angular';
import { ToastOptions, ModalOptions, AlertOptions, ToastButton } from '@ionic/core';

interface loadingOptions {
  message?: string;
  duration?: number;
  hideLoader?: boolean | any;
}

@Injectable({
  providedIn: 'root'
})
export class UiService {
  currentLoading: HTMLIonLoadingElement
  toastInst: any
  constructor(
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
  ) { }

  alert(options: AlertOptions) {
    return new Promise(async (resolve, reject) => {
      const message = options.message.toString()
        const alert = await this.alertCtrl.create({
          ...options,
          header:options.header,
          message:message,
          buttons: [
            {
              text: 'Oui',
              handler: () => {
                resolve(true);
              }
            }
          ]
        });
        alert.present();
      })
  }

  confirmation(options: AlertOptions, agreeBtn = 'popups.yes', disagreeBtn = 'popups.no') {
    return new Promise(async (resolve, reject) => {
      const message = options.message.toString()
        const confirm = await this.alertCtrl.create({
          header: options.header,
          message: message,
          buttons: [
            {
              text: agreeBtn,
              handler: () => {
                resolve(true)
              }
            },
            {
              text: disagreeBtn,
              handler: () => {
                reject(false)
              }
            }
          ],
          cssClass: `custom-confirmation-alert ${options.cssClass}`
        });
        confirm.present();
      })
  }

  async loading(options: loadingOptions = {}) {
    // Dismiss previously created loading
    if (this.currentLoading != null) {
      this.unLoading();
    }
    if (options.hideLoader) { return false }

    this.currentLoading = await this.loadingCtrl.create({
      duration: options.duration,
      message: options.message
    });

    return await this.currentLoading.present();
  }

  async unLoading() {
    if (this.currentLoading != null) {
      await this.currentLoading.dismiss();
      // this.currentLoading = null;
    }
    return;
  }

  async toast(options: ToastOptions) {
    // let duration = options.duration >= 0 ? options.duration : 2000;
      if (this.toastInst) {
        this.toastInst.dismiss();
      }
      const buttons: ToastButton[] = !options.duration ? [
        {
          icon: 'close',
          role: 'cancel'
        }
      ] : null
      this.toastInst = await this.toastCtrl.create({
        ...options,
        cssClass: options.cssClass || '',
        position: options.position || 'bottom',
        buttons
      });
      this.toastInst.present();
  }

  dismissToast() {
    if (this.toastInst) {
      return this.toastInst.dismiss();
    }
  }

  modal(options?: ModalOptions): Promise<any> {
    return new Promise(async (resolve) => {
      const modalInst = await this.modalCtrl.create(options);
      modalInst.onDidDismiss().then(data => resolve(data))
      await modalInst.present();
    })
  }

  dismissModal(data?) {
    return this.modalCtrl.dismiss(data)
  }

  fireError(err, duration = 2500) {
    this.unLoading();
    try {
      let messages = '';
      if (err.message) {
        messages = err.message
      } else {
        messages = 'Internal server error'
      }
      this.toast({ message: messages, cssClass: 'toast-error', color: 'danger', duration });
    } catch (e) {
      const message = 'Internal server error'
      this.toast({ message, cssClass: 'toast-error', color: 'danger', duration });
    }
  }

  fireSuccess(message: string, duration = 2500) {
    this.toast({ message, cssClass: 'toast-success', color: 'success', duration });
  }
}
