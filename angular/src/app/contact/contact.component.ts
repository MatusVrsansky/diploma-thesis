import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../_services/contact.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

 
  form: FormGroup;
  submitted = false;

  emailSent = false;

  constructor(private contactService: ContactService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group(
      {
        email: ['', 
        [
          Validators.required,
          Validators.email,
          Validators.minLength(6),
          Validators.maxLength(30)
        ]],
        name: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(30)
          ]
        ],
        message: [
          '',
          [
            Validators.required,
            Validators.minLength(20),
            Validators.maxLength(500)
          ]
        ]
      }
    );

  }

  onSubmit(): void {

    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    else {
      this.contactService.sendContactEmail(Array(this.form.value)).subscribe({
        next: data => {
          this.emailSent = true;
        },
        error: err => {
          console.log(err);
        }
      });
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
}
