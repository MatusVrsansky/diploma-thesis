import { Component, OnInit,TemplateRef, ViewChild, HostBinding, OnDestroy, Optional } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { AuthService } from '../_services/auth.service';
import {NotificationService} from '../_services/notification.service';
import {ConfigService} from '../_services/config.service';
import {TwilioService} from '../_services/twilio.service';
import { UserService } from '../_services/user.service';

import {Subscription, timer} from 'rxjs';  
import { map, catchError } from 'rxjs/operators';





import { NbGlobalLogicalPosition, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService } from '@nebular/theme';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogService, NbDialogRef } from '@nebular/theme';
import { not } from '@angular/compiler/src/output/output_ast';
import { isNgTemplate } from '@angular/compiler';
import { TheadTitlesRowComponent } from 'ng2-smart-table/lib/components/thead/rows/thead-titles-row.component';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  currentUser = this.tokenStorage.getUser();
  @HostBinding('class')
  classes = 'example-items-rows';
  isAddMode = true;

  user: any = {
    username: this.currentUser.username,
    email: this.currentUser.email,
    phone_number: this.currentUser.phone_number,
    roles: this.currentUser.roles
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
  
  
  //userNotifications = this.currentUser.user_notifications;
  userNotifications: any;


  isVisible = 0;
  isSelected: boolean = true;


  // get current user Username
  userName = this.currentUser.username;

  physicalPositions = NbGlobalPhysicalPosition;
  logicalPositions = NbGlobalLogicalPosition;

  // new values
  notification: FormGroup;
  submitted = false;

  // find out state of sending notifications on phones
  sendPhoneNotifications = false;

  // find out twilio account balance
  accountBalance = 0;

  // timer
  timerSubscription: Subscription;

  // limit price to restrict sending sms
  limitPrice = 9;

  // disabled button on add new notification
  addNewNotification = true;



  constructor(private tokenStorage: TokenStorageService, private authService: AuthService, private toastrService: NbToastrService,
     private dialogService: NbDialogService, private userService: UserService, private notificationsService: NotificationService,
     private configService: ConfigService, private twilioService: TwilioService,
    @Optional() private dialogRef: NbDialogRef<any>, private formBuilder: FormBuilder) { }
  
  
  ngOnInit(): void {

    // timer(0, 10000) call the function immediately and every 10 seconds 
    this.timerSubscription = timer(0, 5000).pipe( 
      map(() => { 
        this.getTwilioAccountBalance(); // load data contains the http request 
        this.findAll();
       // this.getAppConfigurations();
      }) 
    ).subscribe(); 


   
    this.getAppConfigurations();
    



    console.log(this.user.roles)

    this.usedNotifications = {
      main : {},
    };

    this.usedNotificationsType = {
      main : {},
    };

   this.notificationTypes = {
      main: {}
    };


    // new values
    this.notification = this.formBuilder.group(
      {
        notificationType: [
        null,
        [
         
        ]
      ],
      descriptionNotification: [
        null,
          [
       
          ]
        ],
        temperatureNotification: [
          null,
          [
          
          ]
        ],
        windSpeedNotification: [
          null,
          [
          
          ]
        ],
        windDirectionNotification: [
          '1',
          [
          
          ]
        ],
        soilTemperatureNotification: [
          null,
          [
      
          ]
        ],
        soilMostureNotification: [
          null,
          [
           
          ]
        ],
        humidityNotification: [
          null,
          [
           
          ]
        ],
        rainGaugeNotification: [
          null,
          [
          
        ],
        ],
        pressureNotification: [
          null,
          [
         
          ]
        ],
        textNotification: [
          null,
          [
        
          ]
        ],
        activeNotification: [
          true,
          [
           
          ]
        ],
        notificationId: [
          '',
          [
          
          ]
        ],
        compareOperator: [
          '>',
          [
           
          ]
        ],
      }
    );


    this.getUnusedNotificationTypes();
  }

  //  unsubscribe when the Observable is not necessary anymore 
  ngOnDestroy() { 
    this.timerSubscription.unsubscribe(); 
  }
  
  getUnusedNotificationTypes() {

    console.log('++++++++++++++++++++')
    console.log(this.notificationTypes.main.length)
    console.log('++++++++++++++++++++')

   
    // array of used notifications

    const arrayUsedNotifications: any = [];
   
    const dataToTable: object[] = [];

  

    this.userNotifications?.forEach(function(item:any) {
    

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




    let allNotificationTypes = [
      {name: "Teplota", type: 'temperature'},
      {name: "Smer vetra", type: 'windDirection'},
      {name: "Rýchlosť vetra", type: 'windSpeed'},
      {name: "Teplota pôdy", type: 'soilTemperature'},
      {name: "Vlhkosť pôdy", type: 'soilMosture'},
      {name: "Vlhkosť", type: 'humidity'},
      {name: "Ďaždometer", type: 'rainGauge'},
      {name: "Tlak", type: 'pressure'},
    ];

   

  let result = allNotificationTypes.filter(({ type }) => !arrayUsedNotifications.includes(type));

  this.notificationTypes.main = result;

  this.notification.value.notificationType = this.notificationTypes.main;



  let myArray: any = [];


  this.notification.value.notificationType.forEach(function(item:any) {
    
    myArray.push(item)
  });

  this.notification.value.notificationType = myArray;
  this.notificationTypes.main = this.notification.value.notificationType;



  // set first radio button checked
  console.log('prva hodnota je tuuuuuuuuuuuuuuuuuuuuu');

  if(Object.keys(this.notificationTypes.main).length > 0) {
    this.notification.patchValue({'notificationType': this.notificationTypes.main[0].type});
  }
  }

    // new values
    get f(): { [key: string]: AbstractControl } {
      return this.notification.controls;
    }

  showToast(position: NbGlobalPosition, duration: number, message: string, title: string) {
    this.toastrService.success(message, title, { position, duration });
  }

  // api data for ThingSpeak
  getTwilioAccountBalance() {
      this.twilioService.getTwilioAccountBalance().subscribe({
        next: data => {
          console.log("getTwilioAccountBalance : " + data.balance);
          //this.accountBalance = Math.round((data.balance*0.94 + Number.EPSILON) * 100) / 100;
          this.accountBalance = data.balance;

          // set sending of notifications, when price is lower than 0,50e
          if(data.balance < this.limitPrice) {
            this.sendPhoneNotifications = false;
            this.configService.setSendPhoneNotificationsState(false).subscribe({
              next: data => {
                console.log("Zmenili sa data :" + data);
              },
              error: err => {
                console.log(err);
              }
            })

          }

          console.log(this.accountBalance);
        },
        error: err => {
          console.log(err)
        }
      })
    }

  onSubmit(): void {

  if(this.isAddMode) {
   

    this.submitted = true;

    this.setFieldsRequired();
  
      
    if (this.notification.invalid) {
      console.log('prejde vyssia podmienka');
      return;
    }

    else {
      

      this.notificationsService.addNewNotification(this.userId, Array(this.notification.value)).subscribe({
        next: data => {
          console.log(data.user_notifications);
          this.findAll();
          this.closeDialog();
          this.showToast(this.logicalPositions.BOTTOM_END, 10000, "Notifikácia bola pridaná!", "Pridanie notifikácie");
          this.getUnusedNotificationTypes();
        },
        error: err => {
          console.log(err.error.message)
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      });
    }
  }

  else {
    console.log('stlacil som Editacny mod');
    this.submitted = true;
    this.setFieldsRequired();
  
    if (this.notification.invalid) {
      console.log('prejde vyssia podmienka');
      return;
    }

    else {
      

      this.notificationsService.editNotification(this.userId, Array(this.notification.value)).subscribe({
        next: data => {
          this.findAll();
          this.closeDialog();
           this.showToast(this.logicalPositions.BOTTOM_END, 10000, "Notifikácia bola upravená!", "Úprava notifikácie");
        },
        error: err => {
          console.log(err.error.message)
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      });
    }

  }
   
  }

  findAll() {
    this.notificationsService.getAllNotifications(this.userId).subscribe({
      next: data => {
        console.log(data.user_notifications);
        this.userNotifications = data.user_notifications;

        if(this.userNotifications.length == 8) {
          console.log(this.userNotifications.length);
          this.addNewNotification = false;
        }

        else {
          this.addNewNotification = true;
        }
      },
      error: err => {
        console.log(err);
      }
    });
  }

  getAppConfigurations() {
    this.configService.getAppConfigurations().subscribe({
      next: data => {
        console.log(data);
        this.sendPhoneNotifications = data.config[0].value;
      },
      error: err => {
        console.log(err);
      }
    })
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


  setFieldsRequired() {
    if(this.notification.value.notificationType == 'temperature') {
      console.log('teploa je tu');
      this.notification.get('temperatureNotification')?.setValidators([Validators.required, Validators.min(-50),  Validators.max(50)]);
      this.notification.get('temperatureNotification')?.updateValueAndValidity();
    }

    else if(this.notification.value.notificationType == 'windSpeed') {
      this.notification.get('windSpeedNotification')?.setValidators([Validators.required, Validators.min(0),  Validators.max(20)]);
      this.notification.get('windSpeedNotification')?.updateValueAndValidity();
    }

    else if(this.notification.value.notificationType == 'soilTemperature') {
      this.notification.get('soilTemperatureNotification')?.setValidators([Validators.required, Validators.min(0),  Validators.max(4095)]);
      this.notification.get('soilTemperatureNotification')?.updateValueAndValidity();
    }

    else if(this.notification.value.notificationType == 'soilMosture') {
      this.notification.get('soilMostureNotification')?.setValidators([Validators.required, Validators.min(0),  Validators.max(1023)]);
      this.notification.get('soilMostureNotification')?.updateValueAndValidity();
    }

    else if(this.notification.value.notificationType == 'humidity') {
      this.notification.get('humidityNotification')?.setValidators([Validators.required, Validators.min(0),  Validators.max(100)]);
      this.notification.get('humidityNotification')?.updateValueAndValidity();
    }

    else if(this.notification.value.notificationType == 'rainGauge') {
      this.notification.get('rainGaugeNotification')?.setValidators([Validators.required, Validators.min(6),  Validators.max(1023)]);
      this.notification.get('rainGaugeNotification')?.updateValueAndValidity();
    }

    else if(this.notification.value.notificationType == 'pressure') {
      this.notification.get('pressureNotification')?.setValidators([Validators.required, Validators.min(0),  Validators.max(100)]);
      this.notification.get('pressureNotification')?.updateValueAndValidity();
    }

   
    this.notification.get('descriptionNotification')?.setValidators([Validators.required, Validators.minLength(6),  Validators.maxLength(150)]);
    this.notification.get('descriptionNotification')?.updateValueAndValidity();

    this.notification.get('textNotification')?.setValidators([Validators.required, Validators.minLength(6),  Validators.maxLength(150)]);
    this.notification.get('textNotification')?.updateValueAndValidity();
  }

  resetFieldsRequired() {
    this.notification.patchValue({'descriptionNotification': null});
    this.notification.patchValue({'textNotification': null});
    this.notification.patchValue({'temperatureNotification': null});
    this.notification.patchValue({'windSpeedNotification': null});
    this.notification.patchValue({'windDirectionNotification': '1'});
    this.notification.patchValue({'soilTemperatureNotification': null});
    this.notification.patchValue({'soilMostureNotification': null});
    this.notification.patchValue({'pressureNotification': null});
    this.notification.patchValue({'rainGaugeNotification': null});
    this.notification.patchValue({'humidityNotification': null});

    this.notification.get('temperatureNotification')?.clearValidators();
    this.notification.get('temperatureNotification')?.updateValueAndValidity();

    this.notification.get('humidityNotification')?.clearValidators();
    this.notification.get('humidityNotification')?.updateValueAndValidity();

    this.notification.get('pressureNotification')?.clearValidators();
    this.notification.get('pressureNotification')?.updateValueAndValidity();

    this.notification.get('rainGaugeNotification')?.clearValidators();
    this.notification.get('rainGaugeNotification')?.updateValueAndValidity();

    this.notification.get('soilMostureNotification')?.clearValidators();
    this.notification.get('soilMostureNotification')?.updateValueAndValidity();

    this.notification.get('windSpeedNotification')?.clearValidators();
    this.notification.get('windSpeedNotification')?.updateValueAndValidity();

    this.notification.get('soilTemperatureNotification')?.clearValidators();
    this.notification.get('soilTemperatureNotification')?.updateValueAndValidity();

    this.notification.get('pressureNotification')?.clearValidators();
    this.notification.get('pressureNotification')?.updateValueAndValidity();

    this.notification.get('humidityNotification')?.clearValidators();
    this.notification.get('humidityNotification')?.updateValueAndValidity();


   /* this.notification.get(['temperatureNotification', 'humidityNotification', 'pressureNotification', 'rainGaugeNotification',
    'soilMostureNotification', 'windSpeedNotification', 'soilTemperatureNotification'])?.clearValidators();

    this.notification.get(['temperatureNotification', 'humidityNotification', 'pressureNotification', 'rainGaugeNotification',
    'soilMostureNotification', 'windSpeedNotification', 'soilTemperatureNotification'])?.updateValueAndValidity();*/

    this.notification.get('descriptionNotification')?.clearValidators();
    this.notification.get('descriptionNotification')?.updateValueAndValidity();

    this.notification.get('textNotification')?.clearValidators();
    this.notification.get('textNotification')?.updateValueAndValidity();



  /* this.notification.get(['temperatureNotification', 'humidityNotification', 'pressureNotification', 'rainGaugeNotification',
   'soilMostureNotification', 'windSpeedNotification', 'soilTemperatureNotification', 'descriptionNotification', 'textNotification'])?.updateValueAndValidity();*/

 
 
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

  open(dialog: TemplateRef<any>) {
    this.dialogRef = this.dialogService.open(dialog, { context: 'Naozaj chcete vymazať notifikáciu?' });
    this.getUnusedNotificationTypes();
    this.resetFieldsRequired();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  removeNotification(id:any) {

    this.notificationsService.removeNotification(this.currentUser.id, id).subscribe({
      next: data => {
        this.findAll();
        this.closeDialog();
        this.showToast(this.logicalPositions.BOTTOM_END, 10000, "Notifikácia bola odstránená!", "Odstránenie notifikácie");
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

    this.isAddMode = false;

    console.log('editacia je tuu');

    this.notification.patchValue({'pressureNotification': notification.pressure_notification});
    this.notification.patchValue({'notificationType': notification.notification_type});
    this.notification.patchValue({'temperatureNotification': notification.temperature_notification});
    this.notification.patchValue({'descriptionNotification': notification.description_notification});
    this.notification.patchValue({'windSpeedNotification': notification.wind_speed_notification});
    this.notification.patchValue({'windDirectionNotification': notification.wind_direction_notification});
    this.notification.patchValue({'soilMostureNotification': notification.soil_mosture_notification});
    this.notification.patchValue({'soilTemperatureNotification': notification.soil_temperature_notification});
    this.notification.patchValue({'humidityNotification': notification.humidity_notification});
    this.notification.patchValue({'compareOperator': notification.compare_operator});
    this.notification.patchValue({'rainGaugeNotification': notification.rain_gauge_notification});
    this.notification.patchValue({'pressureNotification': notification.pressure_notification});
    this.notification.patchValue({'textNotification': notification.text_notification});
    this.notification.patchValue({'activeNotification': notification.active_notification});
    this.notification.patchValue({'notificationType': notification.notification_type});
    this.notification.patchValue({'notificationId': notification.id});
  }

 

  changeGender(e:any) {
    console.log(e);
    this.notification.value.notificationType = e;
    console.log(this.notification.value.notificationType);
    this.resetFieldsRequired();
  }

  getSendPhoneNotificationsState(state:any) {
    console.log("state is :"+state);

    this.configService.setSendPhoneNotificationsState(state).subscribe({
      next: data => {
        console.log("Respond :" + data);
      },
      error: err => {
        console.log(err);
      }
    })
  }

  // check if notifications is sent or not
  /*checkNotiticationSentState(notificationId: any) {
    this.notificationsService.checkNotiticationSentState(notificationId).subscribe({
      next: data => {
        console.log(data);

        if(data == 1) {
          return 'Ano';
        }

        else {
          return 'Nie'
        }
        
      },
      error: err => {
        console.log(err);
      }
    })

    
  }*/

  getWindDirectionThingSpeak(windDirection:any) {

    switch ( windDirection ) {
      case '1': 
        windDirection = 'Severný vietor'; break;
      case '2':
        windDirection = 'Východný vietor'; break;
      case '3':
        windDirection = 'Južný vietor'; break;
      case '4':
        windDirection = 'Západný vietor'; break;
      case '5':
        windDirection = 'Severovýchodný vietor'; break;
      case '6':
        windDirection = 'Severozápadný vietor'; break;
      case '7':
        windDirection = 'Juchovýchodný vietor'; break;
      case '8':
        windDirection = 'Juhozápadný vietor'; break;
      default: break;
   }

    return windDirection;
  }

  getNotificationName(notificationType: any) {

    switch(notificationType) {
      case 'temperature' : notificationType = 'Teplota'; break;
      case 'windDirection' : notificationType = 'Smer vetra'; break;
      case 'windSpeed' : notificationType = 'Rýchlosť vetra'; break;
      case 'soilTemperature' : notificationType = 'Teplota pôdy'; break;
      case 'soilMosture' : notificationType = 'Vlhkosť pôdy'; break;
      case 'humidity' : notificationType = 'Vlhkosť'; break;
      case 'rainGauge' : notificationType = 'Ďaždometer'; break;
      case 'pressure' : notificationType = 'Tlak'; break;
    }

    return notificationType;
  }


}
