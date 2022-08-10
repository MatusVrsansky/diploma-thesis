import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { AuthService } from '../_services/auth.service';
import { NbGlobalLogicalPosition, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser = this.tokenStorage.getUser();
  @HostBinding('class')
  classes = 'example-items-rows';

  form: any = {
    username: this.currentUser.username,
    email: this.currentUser.email,
    temperature_notification: this.currentUser.temperature_notification,
    text_notification: this.currentUser.text_notification,
    temperature_operator: this.currentUser.temperature_operator,
    phone_number: this.currentUser.phone_number,
    active_notification: this.currentUser.active_notification
  };

  userId = this.currentUser.id;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  roles: string[] = [];

  physicalPositions = NbGlobalPhysicalPosition;
  logicalPositions = NbGlobalLogicalPosition;

 
  
  constructor(private tokenStorage: TokenStorageService, private authService: AuthService, private toastrService: NbToastrService) { }
  ngOnInit(): void {
  
  }

  showToast(position: NbGlobalPosition, duration: number) {
    this.toastrService.success('Zmeny boli uložené', 'Aktualizácia profilu', { position, duration });
  }


  
  onSubmit(): void { 
    
    const { username, email, temperature_notification, text_notification, temperature_operator, phone_number, active_notification } = this.form;

    this.authService.update(this.userId, username, email, temperature_notification, text_notification, temperature_operator, phone_number, active_notification).subscribe({
      next: data => { 
        //console.log(data);
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.roles = this.tokenStorage.getUser().roles;
        this.showToast(this.logicalPositions.BOTTOM_END, 10000)
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