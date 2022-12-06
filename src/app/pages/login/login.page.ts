import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup
  submitAttempt = false
  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private auth: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    })
  }

  ngOnInit() {
  }

  async login() {
    this.submitAttempt = true
    if (this.loginForm.valid) {
      await this.auth.login(this.loginForm.value);
      await this.navCtrl.navigateRoot('/home')
      this.navCtrl.navigateForward('/home')
    }
  }

}

