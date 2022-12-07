import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateBookPageRoutingModule } from './create-book-routing.module';

import { CreateBookPage } from './create-book.page';
import { ComponentsModule } from '../../components/components.module';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ComponentsModule,
    DirectivesModule,
    CreateBookPageRoutingModule
  ],
  declarations: [CreateBookPage]
})
export class CreateBookPageModule {}
