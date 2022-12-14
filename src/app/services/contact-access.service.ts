import { Injectable } from '@angular/core';
import { Compte } from '../Compte';
import { AngularFirestore } from '@angular/fire/firestore'
import { Contact } from '../Contact';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ContactAccessService {


  constructor( private firestore: AngularFirestore) { }

  compteRef:AngularFirestore;
  collectionName = 'Contacts';



  // Get Compte
  getCompte() {
    return this.firestore.collection('/Comptes/').snapshotChanges();
  }

  getContact(id: string) {
    return this.firestore.doc('/Contacts/'+id).valueChanges();
  }
  delateContactPersonel(id1: string, id2: string ){
    return this.firestore.collection('/Contacts').doc(id2).delete();
    }

   
      updateContactPersonel(recordID, record) {
        this.firestore.doc(this.collectionName + '/' + recordID).update(record);
      }

  
  
  getAllCompte() {
    return this.firestore.collection('/Comptes/').snapshotChanges();
  }
  getAllPersonalContact(id: any) {
    return this.firestore.doc('/Comptes/'+id).collection('/Contacts')
    }
  newCompte(compte: Compte)
  {
    return this.firestore.collection('/Comptes/').doc(compte.email).set(compte);
  }

  update(contact: Contact ): Promise<void> {
    return this.firestore.collection('/Contacts/').doc(contact.email).update(contact);
  }


  getNote(contact: Contact): Observable<Contact>
  {
    return this.firestore.collection('/Contacts').doc(contact.email).snapshotChanges()
    .pipe(
      map(a => {
        const email = a.payload.id;
        const data = a.payload.data();
        return { email, ...contact };
      })
    );
  }
  updateNote(email: string, contact: Contact): Promise<void> {
    return this.firestore.collection('/Contacts').doc(contact.email).update(contact);
   }
   getNotes(): Observable<Contact[]> {
    return this.firestore.collection<Contact>('/Contacts').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const email = a.payload.doc.id;
          const data = a.payload.doc.data();
          return { email, ...data };
        });
      })
    );
  }
  newContact(contact)
  {
    return this.firestore.collection('/Contacts/').doc(contact.tel).set(contact);
  }
  
  getAllContact() {
    return this.firestore.collection('/Contacts/').snapshotChanges();
  }
  newPersonalContact(id : any, contact) {
    return this.firestore.collection('/Contacts/').doc(contact.email).set(contact);
    }
  getPersonalContact(id1: string, id2: string ) {
      return this.firestore.collection('/Contacts').doc(id2).valueChanges();
      }

  
}
