import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavPopDirective } from './nav-pop.directive';

@NgModule({
  declarations: [
    NavPopDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NavPopDirective,
  ]
})
export class DirectivesModule { }
