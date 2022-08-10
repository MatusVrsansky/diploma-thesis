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
    temperature_notification: null,
    text_notification: null,
    temperature_operator_bigger: null,
    temperature_operator_smaller: null,
    temperature_operator : '<',
    phone_number : null,
    active_notification: true
  };

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';



  constructor(private authService: AuthService) { }
  ngOnInit(): void {
  }



  onSubmit(): void {
    const { username, email, password, temperature_notification, text_notification, temperature_operator, phone_number, active_notification } = this.form;
    console.log(temperature_operator)
    console.log(phone_number)
    console.log(active_notification)
    this.authService.register(username, email, password, temperature_notification, text_notification, temperature_operator, phone_number, active_notification).subscribe({
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
}