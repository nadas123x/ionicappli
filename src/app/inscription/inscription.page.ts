import { Component, OnInit } from '@angular/core';
import {ContactAuthService} from '../services/contact-auth.service'
import { ContactAccessService } from '../services/contact-access.service';
import {ReactiveFormsModule, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Compte } from '../Compte';

@Component({
selector: 'app-inscription',
templateUrl: './inscription.page.html',
styleUrls: ['./inscription.page.scss'],
})

export class InscriptionPage implements OnInit {
 inscriptionForm : FormGroup;
private compte: Compte;

constructor(private fireauth :ContactAuthService, 
  private firestore: ContactAccessService, 
  private formBuilder: FormBuilder,
private navCtrl: NavController) {
this.inscriptionForm = this.formBuilder.group({
email: ['',Validators.required],
password: ['',Validators.required],
tel: ['',Validators.required],
nom: ['',Validators.required],
prenom: ['',Validators.required],
});
}
ngOnInit() {}

singUp() {
  this.fireauth.singUp(this.inscriptionForm.value)
  .then(res => {
console.log(res);
this.firestore.newCompte((this.inscriptionForm.value)) 
this.navCtrl.navigateForward('/authentification');
}, err => {
console.log(err);
})
}
}
