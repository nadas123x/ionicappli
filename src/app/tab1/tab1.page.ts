//ADD OnInit
import { Component, OnInit } from '@angular/core';

//Import AngularFirestore to make Queries.
import { AngularFirestore } from '@angular/fire/firestore';

//Import Component for the update function and the Modal controller to handle the component.

import { UpdaterecordPage } from '../updaterecord/updaterecord.page';
import { MenuController, ModalController, NavController } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  doc: any;
  records: { id: string; description: string; amount: number; type: string; }[];
  addrecord: {type: string ; description: string; amount: number};  

  constructor(
    private firestore: AngularFirestore,
    private menuCtrl: MenuController,
    private modalController: ModalController,
  ) {
    this.menuCtrl.enable(true)

  }

  ngOnInit(){
    this.addrecord = {type :'', description :'', amount: null}    
    this.firestore.collection('/Records/').snapshotChanges().subscribe(res=>{
      if(res){
        this.records = res.map(e=>{
          return{
            id: e.payload.doc.id,
            description: e.payload.doc.data()['description'],
            amount: e.payload.doc.data()['amount'],
            type: e.payload.doc.data()['type']
          }
        })   
      }  
    })
  }

  AddRecord(type, description, amount){
    let addrecord = {}
    addrecord['type'] = type
    addrecord['description'] = description
    addrecord['amount'] = amount
    console.log(addrecord)
    this.firestore.collection('/Records/').add(addrecord).then(()=>{
      this.addrecord = {type :'', description :'', amount: null} 
    })
  }
  async UpdateRecord(id, type, description, amount) {
    const modal = await this.modalController.create({
      component:  UpdaterecordPage,
      cssClass: 'my-custom-class',
      componentProps: {          
          'id': id,
          'type': type,
          'description': description,
          'amount': amount,
      }
    });
    return await modal.present();
  }
  DeleteRecord(id){
    this.firestore.doc('/Records/'+id).delete()
  }

}