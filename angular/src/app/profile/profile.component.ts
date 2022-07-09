import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { AuthService } from '../_services/auth.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser = this.tokenStorage.getUser();

  form: any = {
    username: this.currentUser.username,
    email: this.currentUser.email,
    temperature_notification: this.currentUser.temperature_notification,
    text_notification: this.currentUser.text_notification
  };

  userId = this.currentUser.id;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  roles: string[] = [];
  
  constructor(private tokenStorage: TokenStorageService, private authService: AuthService) { }
  ngOnInit(): void {
  
  }


  
  onSubmit(): void { 
    
    const { username, email, temperature_notification, text_notification } = this.form;

    this.authService.update(this.userId, username, email, temperature_notification, text_notification).subscribe({
      next: data => {
        console.log(data);
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.roles = this.tokenStorage.getUser().roles;
      },
      error: err => {
        console.log(err.error.message)
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }
  reloadPage(): void {
    window.location.reload();
  }
}