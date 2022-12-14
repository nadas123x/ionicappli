import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdaterecordPageRoutingModule } from './updaterecord-routing.module';

import { UpdaterecordPage } from './updaterecord.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdaterecordPageRoutingModule
  ],
  declarations: [UpdaterecordPage]
})
export class UpdaterecordPageModule {}
