import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import { Contact } from '../Contact';
import { ContactAccessService } from '../services/contact-access.service';

@Component({
  selector: 'app-liste-contacts',
  templateUrl: './liste-contacts.page.html',
  styleUrls: ['./liste-contacts.page.scss'],
})
export class ListeContactsPage implements OnInit {
  contacts: Contact[];
  filterTerm: string;
  favList= [];
  emailContact:string;
  from:string;
  contact: Contact;

  constructor(private contactservice:ContactAccessService,
    private menuCtrl: MenuController,
    private navCtrl: NavController
    ) {
      this.contactservice.getAllContact();
      let fav = localStorage.getItem('FAVLIST');
      if (fav) {
        this.favList = JSON.parse(fav);
      
        this.menuCtrl.enable(true)  }
        
}
addFav(item){
  
  this.favList.push(item);
  localStorage.setItem('FAVLIST', JSON.stringify(this.favList));
}
removeFav(i){
  this.favList.splice(i,1);
  console.log(this.favList);
  
  localStorage.setItem('FAVLIST', JSON.stringify(this.favList));
}

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

  ajouterContact() {
    this.navCtrl.navigateRoot('/ajouter-contact');
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

    Modifier(){

    }
    
}
