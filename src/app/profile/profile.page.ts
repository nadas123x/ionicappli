import { Component, OnInit } from '@angular/core';
import { Compte } from '../Compte';
import { ContactAccessService } from '../services/contact-access.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  image: String; 

  compte: any={};

  constructor(private contactservice:ContactAccessService) { 

}

  ngOnInit() {
    console.log(  this.contactservice.getCompte('poUERqO8hWu6cHrMY0N9').subscribe(res => {
      this.compte=<Compte>res ;
      console.log(res);
      }))
  }

}
