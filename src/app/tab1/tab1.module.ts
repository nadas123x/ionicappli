import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';

import { Tab1PageRoutingModule } from './tab1-routing.module';

//IMPORT THE COMPONENT.

import { UpdaterecordPage } from '../updaterecord/updaterecord.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule
  ],
  //ADD THE ENTRY COMPONENT AND THE DECLARATION
  entryComponents:[UpdaterecordPage],
  declarations: [Tab1Page, UpdaterecordPage]
})
export class Tab1PageModule {}