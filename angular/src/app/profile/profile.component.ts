import { Component, OnInit,TemplateRef, ViewChild, HostBinding, OnDestroy } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { AuthService } from '../_services/auth.service';
import { NbGlobalLogicalPosition, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService } from '@nebular/theme';
import { NbDialogService } from '@nebular/theme';



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
  usedNotifications: any;
  usedNotificationsType: any;
  notificationTypes: any;
  selectedItem = 'teplota';

  value = null

  
  isVisible = 0;
  isSelected: boolean = true;
  


  // get current user Username 
  userName = this.currentUser.username;

  physicalPositions = NbGlobalPhysicalPosition;
  logicalPositions = NbGlobalLogicalPosition;


  
  constructor(private tokenStorage: TokenStorageService, private authService: AuthService, private toastrService: NbToastrService, private dialogService: NbDialogService) { }
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

    const notificationTypes: string[] = [];

    /*this.notificationTypes.push('teplota');
    this.notificationTypes.push('smer_vetra');
    this.notificationTypes.push('rychlost_vetra');
    this.notificationTypes.push('uroven_svetla');
    this.notificationTypes.push('vlhost_pody');
    this.notificationTypes.push('vlhkost');
    this.notificationTypes.push('dazdometer');
    this.notificationTypes.push('tlak');*/

  

  
    const dataToTable: object[] = [];

    //const usedNotificationsTypeArr: object[] = [];


    // array of used notifications
    const arrayUsedNotifications: any = [];


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

    
    
    dataToTable.push(person)
  });

  // used in table of existing notifications
  this.usedNotifications.main = dataToTable;
  
  //this.usedNotificationsType.main = usedNotificationsTypeArr;

 /* notificationTypes.push('teplota');
  notificationTypes.push('smer_vetra');
  notificationTypes.push('rychlost_vetra');
  notificationTypes.push('uroven_svetla');
  notificationTypes.push('vlhost_pody');
  notificationTypes.push('vlhkost');
  notificationTypes.push('dazdometer');
  notificationTypes.push('tlak');*/

 

  let data = [
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
  console.log(this.usedNotifications.main)
  let result = data.filter(({ name }) => !arrayUsedNotifications.includes(name));
  
  console.log(result);
  this.notificationTypes.main = result;


  
 
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

  clickTest(event:Event, id:any) {
    event.preventDefault();
    console.log('klikol som')
    console.log(id)
    console.log(event)
  }

  open(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, { context: 'Naozaj chcete vymazať notifikáciu?' });
  }
}