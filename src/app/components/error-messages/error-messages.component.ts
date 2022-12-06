import { Component, OnInit, Input } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'error-messages',
  templateUrl: './error-messages.component.html',
  styleUrls: ['./error-messages.component.scss'],
  animations: [
    trigger('errorEnterLeaveAnimation', [
      transition(':enter', [
        style({ height: 0, opacity: 0 }),
        animate('.2s', style({ height: '*', opacity: 1 })),
      ]),
      transition(':leave', [
        animate('.2s', style({ height: 0, opacity: 0 }))
      ])
    ])
  ]
})
export class ErrorMessagesComponent implements OnInit {
  @Input() form: FormGroup
  @Input() controlName: string
  @Input() message: string
  @Input() submitAttempt: boolean = false
  @Input() showError: boolean = false
  errors: any = []
  constructor() {}

  ngOnInit() {
    if (this.form && this.form.controls[this.controlName].errors) {
      for (let error in this.form.controls[this.controlName].errors) {
        if (error) {
          this.errors.push([
            error, `errors.${this.controlName}.${error}`
          ])
          return false;
        }
      }
    }
  }
}
