import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MenuController, NavController } from '@ionic/angular';
import { Contact } from '../Contact';
import {ReactiveFormsModule, Validators, FormBuilder, } from '@angular/forms';

import { ContactAccessService } from '../services/contact-access.service';
import { ContactAuthService } from '../services/contact-auth.service';
import { Compte } from '../Compte';

@Component({
  selector: 'app-ajouter-contact',
  templateUrl: './ajouter-contact.page.html',
  styleUrls: ['./ajouter-contact.page.scss'],
})
export class AjouterContactPage implements OnInit {

  ajouterContactForm: FormGroup;

  contacts: Contact[];
  constructor(
  private firestore: ContactAccessService, 
    private menuCtrl: MenuController,
    private navCtrl: NavController,
    private formBuilder: FormBuilder,

    private fireauth :ContactAuthService, 
    ) {
        this.menuCtrl.enable(true)
}

  ngOnInit() {
 
    this.ajouterContactForm = this.formBuilder.group({
      email: ['', Validators.required],  
      nom: ['', Validators.required],
      service:['', Validators.required],
      city:['', Validators.required],
      tel:['', Validators.required],
      adresse:['', Validators.required],
      prenom:['', Validators.required],
      src:['', Validators.required],
    }); 

  }

  nouveauContact(){
    this.fireauth.userDetails().subscribe(res => {
    console.log('res', res);
    if (res !== null) {
    this.firestore.newPersonalContact(res.email,this.ajouterContactForm.value)
    this.navCtrl.navigateForward('/liste-contacts');
    } else {
    this.navCtrl.navigateForward('/authentification');
    }
    }, err => {
    console.log('err', err);
    })
    }
}