import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../Contact';
import { ContactAccessService } from '../services/contact-access.service';

@Component({
  selector: 'app-update-contact',
  templateUrl: './update-contact.page.html',
  styleUrls: ['./update-contact.page.scss'],
})
export class UpdateContactPage implements OnInit {
  contact: Contact;

  email: string='';
  noteForm : FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private noteService: ContactAccessService) {
    this.noteForm = this.formBuilder.group({
      email: new FormControl('', Validators.required),
      tel: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      adresse: new FormControl('', Validators.required),
      service: new FormControl('', Validators.required),
      nom: new FormControl('', Validators.required),
      prenom: new FormControl('', Validators.required),





    });
  }
  ngOnInit() {
  
  }
  onSubmit() {
    const contact: Contact = Object.assign({}, this.noteForm.value);
    this.noteService.updateNote(this.email, contact)
    .then(()=>{
      this.router.navigate(['/folder']);
    });
  }
}