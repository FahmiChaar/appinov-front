import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorMessagesComponent } from './error-messages/error-messages.component';

@NgModule({
	declarations: [
        ErrorMessagesComponent,
    ],
	imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
	exports: [
        ErrorMessagesComponent,
    ]
})
export class ComponentsModule {}
