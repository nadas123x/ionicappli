import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NavController, ToastController  } from '@ionic/angular';
import { Contact } from '../Contact';
import { ContactAccessService } from '../services/contact-access.service';
import { ContactAuthService } from '../services/contact-auth.service';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { SMS } from '@ionic-native/sms/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-detail-contact',
  templateUrl: './detail-contact.page.html',
  styleUrls: ['./detail-contact.page.scss'],
})
export class DetailContactPage implements OnInit {

  emailContact:string;
  from:string;
  contact: Contact;
   isButtonsVisible=false;
  constructor(private contactservice:ContactAccessService,
  private fireauth :ContactAuthService,
  private firestore: ContactAccessService,
  private navCtrl: NavController,
  private toastCtrl :ToastController,
  private route: ActivatedRoute,
  private callNumber: CallNumber,
  private emailComposer: EmailComposer,
  private geolocation: Geolocation,
  private sms: SMS,
  private socialSharing: SocialSharing,
  private router: Router) {
    

  this.route.queryParams.subscribe(params => {
  this.emailContact = params["emailContact"];
  this.from=params["from"];
  if (this.from==="liste-contacts-rec")
  this.isButtonsVisible = false;
  
  else
  
  this.isButtonsVisible = true;
  

  });
  }
  ngOnInit() {
    
  if (this.from==="liste-contacts-rec")
  this.recommande();
  else
  this.personel();
  }
  
  personel(){
    this.fireauth.userDetails().subscribe(res => {
    console.log('res', res);
    if (res !== null) {
    this.contactservice.getPersonalContact(res.email,this.emailContact).subscribe(res => {
    this.contact=<Contact>res ;
    console.log(res);
    })
    } else {
    this.navCtrl.navigateForward('/authentification');
    }
    }, err => {
    console.log('err', err);
    })
    }
    recommande(){
    this.fireauth.userDetails().subscribe(res => {
    console.log('res', res);
    if (res !== null) {
    this.contactservice.getContact(this.emailContact).subscribe
    (res => {
    this.contact=<Contact>res ;
    console.log(res);
    })
    } else {
    this.navCtrl.navigateForward('/authentification');
    }
    }, err => {
    console.log('err', err);
    })
    }
    
 
    Supprimer(){
      this.fireauth.userDetails().subscribe(res => {
      console.log('res', res);
      if (res !== null) {
      this.contactservice.delateContactPersonel(res.email,this.contact.email);
      this.navCtrl.navigateForward('/liste-contacts');
      } else {
      this.navCtrl.navigateForward('/authentification');
      }
      }, err => {
      console.log('err', err);
      })
      }
     

       
      
      Modifier(): void {
    const contact = {
      nom: this.contact.nom,
      prenom: this.contact.prenom,
      email: this.contact.email,
      city: this.contact.city,
      adresse: this.contact.adresse,
      tel: this.contact.tel,
      src: this.contact.src,
      service: this.contact.service,





    };

    if (this.contact.email) {
      this.contactservice.update(contact)
        .catch(err => console.log(err));
    }
  }
      
      
      
   
      
      Appel(){
        this.callNumber.callNumber(this.contact.tel, true)
        .then(res => console.log('Launched dialer!', res))
        .catch(err => console.log('Error launching dialer', err));
        }
        Email(){
          let email = {to: this.contact.email, subject: '[Rediger votre objet]’, isHtml: true'
        }
          this.emailComposer.open(email);
          }

      Partager(){
        this.fireauth.userDetails().subscribe(res => {
        console.log('res', res);
        if (res !== null) {
        this.firestore.newContact(this.contact)
        this.navCtrl.navigateForward('/rec');
        } else {
        this.navCtrl.navigateForward('/authentification');
        }
        }, err => {
        console.log('err', err);
        })
        }
        GPS(): string{
          this.geolocation.getCurrentPosition().then((resp) => {
          return "("+resp.coords.latitude+","+resp.coords.longitude+")"
          }).catch((error) => {
          console.log('Error getting location', error);
          return " ";
          });
          return "";
          }
          SMS(){
            this.sms.send(this.contact.tel, '[Votre message ici!!!]');
            }
            Sharing(){
              this.socialSharing.shareViaWhatsAppToPhone(this.contact.tel,
              this.GPS(),null).then(() => {
              // Success!
              }).catch(() => {
              // Error!
              });
            }

}