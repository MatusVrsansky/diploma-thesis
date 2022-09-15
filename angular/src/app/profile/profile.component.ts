import { Component, OnInit,TemplateRef, ViewChild, HostBinding, OnDestroy, Optional } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { AuthService } from '../_services/auth.service';
import { NbGlobalLogicalPosition, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService } from '@nebular/theme';
import { NbDialogService, NbDialogRef } from '@nebular/theme';
import { ThisReceiver } from '@angular/compiler';




@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {



  currentUser = this.tokenStorage.getUser();
  @HostBinding('class')
  classes = 'example-items-rows';

  new: any = {
    notificationType: null,
    temperatureNotification: null,
    textNotification: null,

    // default value set on true
    activeNotification: true,
    notificationId : null,
  };


  form: any = {
    username: this.currentUser.username,
    email: this.currentUser.email,
    phone_number: this.currentUser.phone_number,
  };

  userId = this.currentUser.id;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  roles: string[] = [];
  showPassword = false;
  usedNotifications: any;
  usedNotificationsType: any;
  notificationTypes: any;
  userNotifications = this.currentUser.user_notifications;

  
  isVisible = 0;
  isSelected: boolean = true;
  


  // get current user Username 
  userName = this.currentUser.username;

  physicalPositions = NbGlobalPhysicalPosition;
  logicalPositions = NbGlobalLogicalPosition;
  

  
  constructor(private tokenStorage: TokenStorageService, private authService: AuthService, private toastrService: NbToastrService,
     private dialogService: NbDialogService, @Optional() private dialogRef: NbDialogRef<any>) { }
  ngOnInit(): void {

    this.usedNotifications = {
      main : {},
    };

    this.usedNotificationsType = {
      main : {},
    };

   this.notificationTypes = {
      main: {}
    };

  
    this.getUnusedNotificationTypes();
  }

  getUnusedNotificationTypes() {
    
    // array of used notifications
    const arrayUsedNotifications: any = [];
    const dataToTable: object[] = [];


    this.currentUser.user_notifications.forEach(function(item:any) {
      //usedNotificationsType.puh
  

      const person = {
        id: item.id,
        user_id: item.user_id,
        notification_type: item.notification_type,
        temperature_notification: item.temperature_notification,
        text_notification: item.text_notification,
        active_notification: item.active_notification
    }

    arrayUsedNotifications.push(item.notification_type);
    dataToTable.push(person);
  });

    // used in table of existing notifications
    this.usedNotifications.main = dataToTable;



    let allNotificationTypes = [
      {name: "teplota"},
      {name: "smer_vetra"},
      {name: "rychlost_vetra"},
      {name: "uroven_svetla"},
      {name: "vlhost_pody"},
      {name: "vlhkost"},
      {name: "dazdometer"},
      {name: "tlak"},
    ];


    //let array = ["dazd", ''];

  let result = allNotificationTypes.filter(({ name }) => !arrayUsedNotifications.includes(name));

  this.notificationTypes.main = result;

 this.new.notificationTypes = this.notificationTypes.main;
  


  let myArray: any = [];

  
  this.new.notificationTypes.forEach(function(item:any) {
    //console.log(item.name)
    myArray.push(item.name)
  });

  this.new.notificationTypes = myArray;


  this.notificationTypes.main = this.new.notificationTypes;
  //console.log('nepouziteeeeeeeeeeeeeeeeeeeeeeeeeeee')
  //console.log(this.notificationTypes.main)
 // console.log('nepouziteeeeeeeeeeeeeeeeeeeeeeeeeeee')
 

  // set first radio button checked 
  this.new.notificationType = this.notificationTypes.main[0];

  // reset input values
  this.new.temperatureNotification = null;
  this.new.textNotification = null;


  }

  showToast(position: NbGlobalPosition, duration: number) {
    this.toastrService.success('Zmeny boli uložené!', 'Aktualizácia profilu', { position, duration });
  }

  showToastNotificationRemoved(position: NbGlobalPosition, duration: number) {
    this.toastrService.success('Notifikácia bola odstránená!', 'Odstránenie notifikácie', { position, duration });
  }

  showToastNotificationAdded(position: NbGlobalPosition, duration: number) {
    this.toastrService.success('Notifikácia bola pridaná!', 'Pridanie notifikácie', { position, duration });
  }

  showToastNotificationUpdated(position: NbGlobalPosition, duration: number) {
    this.toastrService.success('Notifikácia bola upravená!', 'Úprava notifikácie', { position, duration });
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

  open(dialog: TemplateRef<any>) {
    this.dialogRef = this.dialogService.open(dialog, { context: 'Naozaj chcete vymazať notifikáciu?' });

    this.new.temperatureNotification = null;
    this.new.textNotification = null;
    this.new.activeNotification = false;
    this.getUnusedNotificationTypes();
   // this.new.notificationType = notification.notification_type;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  removeNotification(id:any) { 
    this.authService.removeNotification(this.currentUser.id, id).subscribe({
      next: data => { 
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.roles = this.tokenStorage.getUser().roles;
        this.closeDialog();

      

        // get new token data again
        this.currentUser = this.tokenStorage.getUser();
        this.userNotifications = this.currentUser.user_notifications;

       // window.location.reload()
        this.showToastNotificationRemoved(this.logicalPositions.BOTTOM_END, 10000) 
        this.getUnusedNotificationTypes();
      },
      error: err => {
        console.log(err.error.message)
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }

  newNotification(): void { 

    const { notificationType, temperatureNotification , textNotification, activeNotification } = this.new;

  
    this.authService.addNewNotification(this.userId, notificationType, temperatureNotification, textNotification, activeNotification).subscribe({
      next: data => { 
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.roles = this.tokenStorage.getUser().roles;
        this.closeDialog();


         // get new token data again
        this.currentUser = this.tokenStorage.getUser();
        this.userNotifications = this.currentUser.user_notifications;

       // window.location.reload()
        this.showToastNotificationAdded(this.logicalPositions.BOTTOM_END, 10000) 
        this.getUnusedNotificationTypes();
      },
      error: err => {
        console.log(err.error.message)
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }

  editNotificationSetValues(notification:any) {
    console.log(notification)
    this.new.temperatureNotification = notification.temperature_notification;
    this.new.textNotification = notification.text_notification;
    this.new.activeNotification = notification.active_notification;
    this.new.notificationType = notification.notification_type;
    this.new.notificationId = notification.id;
  }

  editNotification() {
    console.log('//////////////////')

    console.log('//////////////////')

    const { notificationType, temperatureNotification , textNotification, activeNotification, notificationId } = this.new;

    console.log(notificationType)
    console.log(temperatureNotification)
    console.log(textNotification)
    console.log(activeNotification)
    console.log(notificationId)

    this.authService.editNotification(this.userId, notificationId, temperatureNotification, textNotification, activeNotification).subscribe({
      next: data => { 
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.roles = this.tokenStorage.getUser().roles;
        this.closeDialog();


         // get new token data again
        this.currentUser = this.tokenStorage.getUser();
        this.userNotifications = this.currentUser.user_notifications;

       // window.location.reload()
        this.showToastNotificationUpdated(this.logicalPositions.BOTTOM_END, 10000) 
     
      },
      error: err => {
        console.log(err.error.message)
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }






  
}