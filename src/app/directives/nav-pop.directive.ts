import { Directive, HostListener, Input } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';

@Directive({
  selector: '[navPop]'
})
export class NavPopDirective {
  @Input() isModal = false
  @HostListener('click') onClick() {
    if (this.isModal) {
      this.modalCtrl.dismiss()
    }else {
      this.navCtrl.pop()
    }
  }
  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController
  ) { }

}
