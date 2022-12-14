import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import { Contact } from '../Contact';
import { ContactAccessService } from '../services/contact-access.service';

@Component({
  selector: 'app-list-contacts-recommandes',
  templateUrl: './list-contacts-recommandes.page.html',
  styleUrls: ['./list-contacts-recommandes.page.scss'],
})
export class ListContactsRecommandesPage implements OnInit {
  contacts: Contact[];

  constructor(
    private contactservice:ContactAccessService,
    private menuCtrl: MenuController,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.contactservice.getAllContact().subscribe(data => {

      this.contacts = data.map(e => {
        return {
          nom: e.payload.doc.data()['nom'],
          prenom: e.payload.doc.data()['prenom'],
          tel: e.payload.doc.data()['tel'],
          service: e.payload.doc.data()['service'],
          adresse: e.payload.doc.data()['adresse'],
          city: e.payload.doc.data()['city'],
          email: e.payload.doc.data()['email'],
          src:e.payload.doc.data()['src'],
        };
      })
      console.log(this.contacts);
    });
  }


    detailsContact(email: any){
      let navigationExtras: NavigationExtras = {
      queryParams: {
      emailContact: email,
      from:"liste-contacts"
      }
      };
      this.navCtrl.navigateForward('/detail-contact', navigationExtras);
      }

}
