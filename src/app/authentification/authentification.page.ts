import {ReactiveFormsModule, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';

import { ContactAuthService } from '../services/contact-auth.service';
@Component({

selector: 'app-athentification',
templateUrl: './authentification.page.html',
styleUrls: ['./authentification.page.scss'],
})
export class AuthentificationPage implements OnInit {
   authForm: FormGroup;

  
constructor(private fireauth :ContactAuthService, private formBuilder: FormBuilder, private navCtrl: NavController,
    private menuCtrl: MenuController
    ) {
        this.menuCtrl.enable(true)
}
ngOnInit() {
this.authForm = this.formBuilder.group({
  email: ['', Validators.required],  
  password: ['', Validators.required]  
});
}


singIn(){
this.fireauth.singIn(this.authForm.value)
.then(res => {
console.log(res);
this.navCtrl.navigateForward('/liste-contacts');
}, err => {
console.log(err);
})
}
singUp() {
this.navCtrl.navigateForward('/inscription');
}}
