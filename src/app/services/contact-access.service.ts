import { Injectable } from '@angular/core';
import { Compte } from '../Compte';
import { AngularFirestore } from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})
export class ContactAccessService {


  constructor( private firestore: AngularFirestore) { }

  compteRef:AngularFirestore;


  // Get Compte
  getCompte(id: string) {
    return this.firestore.doc('/Comptes/'+id).valueChanges();
  }

  getContact(id: string) {
    return this.firestore.doc('/Contacts/'+id).valueChanges();
  }

  getAllCompte() {
    return this.firestore.collection('/Comptes/').snapshotChanges();
  }

  getAllContact() {
    return this.firestore.collection('/Contacts/').snapshotChanges();
  }

  
}
