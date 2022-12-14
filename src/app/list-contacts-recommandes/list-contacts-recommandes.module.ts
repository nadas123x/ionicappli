import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListContactsRecommandesPageRoutingModule } from './list-contacts-recommandes-routing.module';

import { ListContactsRecommandesPage } from './list-contacts-recommandes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListContactsRecommandesPageRoutingModule
  ],
  declarations: [ListContactsRecommandesPage]
})
export class ListContactsRecommandesPageModule {}
