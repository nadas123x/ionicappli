import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Compte } from '../Compte';
import { ContactAccessService } from '../services/contact-access.service';
import { ContactAuthService } from '../services/contact-auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  image: String; 

  comptes: Compte[];
  email: string;
  constructor(private contactservice:ContactAccessService,
    private fireauth :ContactAuthService,
    private navCtrl :NavController) { 

}

  ngOnInit() {
    
    this.contactservice.getCompte().subscribe(data => {

      this.comptes = data.map(e => {
        return {
          nom: e.payload.doc.data()['nom'],
          prenom: e.payload.doc.data()['prenom'],
          tel: e.payload.doc.data()['tel'],
          password:e.payload.doc.data()['password'],
          email: e.payload.doc.data()['email'],
        };
      })
      console.log(this.comptes);
    });
  

  }}
