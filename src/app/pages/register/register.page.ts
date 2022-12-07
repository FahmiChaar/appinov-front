import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup
  submitAttempt = false
  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private auth: AuthService
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    })
  }

  ngOnInit() {
  }

  async register() {
    this.submitAttempt = true
    if (this.registerForm.valid) {
      await this.auth.register(this.registerForm.value);
      this.navCtrl.navigateRoot('/home')
    }
  }

}
