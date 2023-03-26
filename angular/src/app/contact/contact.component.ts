import { Component, OnInit, HostBinding, Optional } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../_services/contact.service';
import { NbGlobalLogicalPosition, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService, NbDialogService, NbDialogRef } from '@nebular/theme';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  @HostBinding('class')
  form: FormGroup;
  submitted = false;

  emailSent = false;

  physicalPositions = NbGlobalPhysicalPosition;
  logicalPositions = NbGlobalLogicalPosition;

  constructor(private contactService: ContactService, private formBuilder: FormBuilder, private toastrService: NbToastrService,
    private dialogService: NbDialogService, @Optional() private dialogRef: NbDialogRef<any>) { }

  

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
          this.showToast(this.logicalPositions.BOTTOM_END, 20000, "Kontaktujte administrátora telefonicky", 'Email sa neodoslal');
        }
      });
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  showToast(position: NbGlobalPosition, duration: number, message: string, title: string) {
    this.toastrService.warning(message, title, { position, duration });
  }
}


