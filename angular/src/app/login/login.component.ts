import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  showPassword = false;

  form: FormGroup;
  submitted = false;

  roles: string[] = [];
  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private formBuilder: FormBuilder) { }
  ngOnInit(): void {

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }

    this.form = this.formBuilder.group(
      {
        name: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30)
        ]
      ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(30)
          ]
        ]
        //acceptTerms: [false, Validators.requiredTrue]
      }
    );
  }

  toggleEditable(event:Event) {
  }

  onSubmit(): void {

    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    else {
      this.authService.login(Array(this.form.value)).subscribe({
        next: data => {
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUser(data);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.tokenStorage.getUser().roles;
          this.reloadPage();
        },
        error: err => {
          switch(err.status) {
            case 401:
            case 404:  this.errorMessage = err.error.message; break;
            default: this.errorMessage = 'kontaktujte administrátora prostredníctvom formulára.'; break;
          }

          this.isLoginFailed = true;
        },
        complete: () => console.log('done'),
      });
  }
}

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