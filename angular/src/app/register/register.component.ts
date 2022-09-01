import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['./register.component.css'],

})
export class RegisterComponent implements OnInit {
  form: any = {
    username: null,
    email: null,
    password: null,
    //temperature_notification: null,
   // text_notification: null,
   // temperature_operator_bigger: null,
   // temperature_operator_smaller: null,
  //  temperature_operator : '<',
    phone_number : null,
  //  active_notification: true
  };

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  showPassword = false;



  constructor(private authService: AuthService) { }
  ngOnInit(): void {
  }



  onSubmit(): void {
    const { username, email, password, phone_number } = this.form;
    this.authService.register(username, email, password, phone_number).subscribe({
      next: data => {
        console.log(data);
        console.log('tu som');
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;

        console.log(err)
      }
    })
  }

  getInputType() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }

  toggleShowPassword(event: Event) {
    event.preventDefault();
    this.showPassword = !this.showPassword;
  }
}