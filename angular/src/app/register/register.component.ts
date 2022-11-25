import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AbstractControl, FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';



@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['./register.component.scss'],

})
export class RegisterComponent implements OnInit {
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  showPassword = false;

  // new values
  form: FormGroup;
  submitted = false;
  

  constructor(private authService: AuthService, private formBuilder: FormBuilder) { }
  ngOnInit(): void {

        // new values
        this.form = this.formBuilder.group(
          {
            name: [
            '',
            [
              Validators.required,
              Validators.minLength(6),
              Validators.maxLength(20)
            ]
          ],
          email: ['', [Validators.required, Validators.email]],
            password: [
              '',
              [
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(20)
              ]
            ],
            confirmPassword: [
              '',
              [
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(20)
              ],
            ],
            phone_number: [
              '',
              [
                Validators.required,
                Validators.minLength(10),
                Validators.maxLength(20)
              ]
            ],
           
            //acceptTerms: [false, Validators.requiredTrue]
          },
          {
            validators: [Validation.match('password', 'confirmPassword')]
          }
        );
  }



  onSubmit(): void {
    
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    else {
      this.authService.register(Array(this.form.value)).subscribe({
       
        next: data => {
          console.log(data);
          console.log('tu som');
          
          this.isSuccessful = true;
          this.isSignUpFailed = false;
         // this.reloadPage();
        },
        error: err => {
          this.errorMessage = err.error.message;
          console.log(typeof(this.form.controls));
          this.isSignUpFailed = true;
  
          console.log(err)
        }
      })
    }



    }

  // new values
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  reloadPage(): void {
    window.location.replace('/');
  }
}


export default class Validation {
  static match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      if (checkControl?.errors && !(checkControl?.errors['matching'])) {
        return null;
      }
    
      if (control?.value !== checkControl?.value) {
        controls.get(checkControlName)?.setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }
}
