import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { AuthService } from '../_services/auth.service';
import { NbGlobalLogicalPosition, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService } from '@nebular/theme';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';

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
   // temperature_notification: this.currentUser.temperature_notification,
    //text_notification: this.currentUser.text_notification,
    //temperature_operator: this.currentUser.temperature_operator,
    phone_number: this.currentUser.phone_number,
    //active_notification: this.currentUser.active_notification
  };

  userId = this.currentUser.id;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  roles: string[] = [];
  showPassword = false;
  historyData: any;
  usedNotifications: Array<any> = [];
  selectedItem = '2';


  // get current user Username 
  userName = this.currentUser.username;

  physicalPositions = NbGlobalPhysicalPosition;
  logicalPositions = NbGlobalLogicalPosition;


 
  
  constructor(private tokenStorage: TokenStorageService, private authService: AuthService, private toastrService: NbToastrService) { }
  ngOnInit(): void {

    this.historyData = {
      main : {},
    };


    console.log(typeof(this.currentUser.user_notifications))
    console.log(this.currentUser.user_notifications)

    const dataToTable: object[] = [];
   
    this.currentUser.user_notifications.forEach(function(item:any) {
      console.log(item.id);
      console.log(item.user_id);
      console.log(item.notification_type);

      const person = {
        id: item.id,
        user_id: item.user_id,
        notification_type: item.notification_type,
        temperature_notification: item.temperature_notification,
        text_notification: item.text_notification,
        active_notification: item.active_notification
    }

    //this.usedNotifications.push(item.notification_type)
    
    dataToTable.push(person)
  });

  this.historyData.main = dataToTable;
    //console.log(this.currentUser.user_notifications)
   
  }

  showToast(position: NbGlobalPosition, duration: number) {
    this.toastrService.success('Zmeny boli uložené', 'Aktualizácia profilu', { position, duration });
  }


  
  onSubmit(): void { 
    
    const { username, email , phone_number } = this.form;

    this.authService.update(this.userId, username, email, phone_number).subscribe({
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

  settings = {
    columns: {
      id: {
        title: 'id'
      },
      user_id: {
        title: 'Id Usera'
      },
      notification_type: {
        title: 'Typ notifikácie'
      },
      temperature_notification: {
        title: 'Podmienka notifikácie'
      },
      text_notification: {
        title: 'Text notifikácie do Emailu /SMSky',
      },
      active_notification: {
        title: 'Aktívna notfikácia'
      }
    },
    actions: false,
  };

 

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