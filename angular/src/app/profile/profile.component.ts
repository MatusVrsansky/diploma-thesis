import { Component, OnInit,TemplateRef, ViewChild, HostBinding, OnDestroy, Optional } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { AuthService } from '../_services/auth.service';
import { NbGlobalLogicalPosition, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService } from '@nebular/theme';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogService, NbDialogRef } from '@nebular/theme';
import { not } from '@angular/compiler/src/output/output_ast';






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

  new: any = {
    notificationType: null,

    descriptionNotification: null,

    temperatureNotification: null,
    windSpeedNotification: null,
    windDirectionNotification: '1',
    soilTemperatureNotification: null,
    soilMostureNotification: null,
    humidityNotification: null,
    rainGaugeNotification: null,
    pressureNotification: null,
    textNotification: null,

    // default value set on true
    activeNotification: true,
    notificationId : null,


    // for notification type: temeprature, windspeed
    temperatureWindSpeedOperator : '>',
  };


  user: any = {
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




    // new values
    notification: FormGroup;
    submitted = false;



  constructor(private tokenStorage: TokenStorageService, private authService: AuthService, private toastrService: NbToastrService,
     private dialogService: NbDialogService, @Optional() private dialogRef: NbDialogRef<any>, private formBuilder: FormBuilder) { }
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


    // new values
    this.notification = this.formBuilder.group(
      {
        notificationType: [
        null,
        [
         // Validators.required,
        ]
      ],
      descriptionNotification: [
        null,
          [
           // Validators.required,
           // Validators.minLength(6),
           // Validators.maxLength(20)
          ]
        ],
        temperatureNotification: [
          null,
          [
            //Validators.minLength(6),
            //Validators.maxLength(20),
          ]
        ],
        windSpeedNotification: [
          null,
          [
            /* Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)*/
          ]
        ],
        windDirectionNotification: [
          '1',
          [
            /* Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)*/
          ]
        ],
        soilTemperatureNotification: [
          null,
          [
           /* Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)*/
          ]
        ],
        soilMostureNotification: [
          null,
          [
            /* Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)*/
          ]
        ],
        humidityNotification: [
          null,
          [
           /* Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)*/
          ]
        ],
        rainGaugeNotification: [
          null,
          [
            /* Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)*/
        ],
        ],
        pressureNotification: [
          null,
          [
            /* Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)*/
          ]
        ],
        textNotification: [
          null,
          [
           //  Validators.required,
           // Validators.minLength(6),
           // Validators.maxLength(20)
          ]
        ],
        activeNotification: [
          true,
          [
           // Validators.required,
          ]
        ],
        notificationId: [
          '',
          [
            //Validators.required,
          ]
        ],
        temperatureWindSpeedOperator: [
          '>',
          [
            //Validators.required,
          ]
        ],
      }
    );


    this.getUnusedNotificationTypes();
  }



  getUnusedNotificationTypes() {

    // array of used notifications
    const arrayUsedNotifications: any = [];
    const dataToTable: object[] = [];


    Array.from(this.currentUser.user_notifications).forEach(function(item:any) {
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
      {name: "teplota_pody"},
      {name: "vlhkost_pody"},
      {name: "vlhkost"},
      {name: "dazdometer"},
      {name: "tlak"},
    ];


    //let array = ["dazd", ''];

  let result = allNotificationTypes.filter(({ name }) => !arrayUsedNotifications.includes(name));

  this.notificationTypes.main = result;

 this.notification.value.notificationType = this.notificationTypes.main;



  let myArray: any = [];


  this.notification.value.notificationType.forEach(function(item:any) {
    //console.log(item.name)
    myArray.push(item.name)
  });

  this.notification.value.notificationType = myArray;

 



  this.notificationTypes.main = this.notification.value.notificationType;




  // set first radio button checked
  console.log('prva hodnota je tuuuuuuuuuuuuuuuuuuuuu');
  this.notification.patchValue({'notificationType': this.notificationTypes.main[0]});
  }

    // new values
    get f(): { [key: string]: AbstractControl } {
      return this.notification.controls;
    }

  showToast(position: NbGlobalPosition, duration: number, message: string, title: string) {
    this.toastrService.success(message, title, { position, duration });
  }

  onSubmit(): void {

   // const { username, email , phone_number } = this.user;

    console.log('stlacil som submit');

    this.submitted = true;

    this.setFieldsRequired();
    
      //this.notification.get('temperatureNotification')?.clearValidators();
      //.notification.get('temperatureNotification')?.updateValueAndValidity();
      
    if (this.notification.invalid) {
      console.log('prejde vyssia podmienka');
      return;
    }

    else {
      console.log('prisiel som sem');
      console.log(this.notification.value.notificationType);

      this.authService.addNewNotification(this.userId, Array(this.notification.value)).subscribe({
        next: data => {
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUser(data);
          this.roles = this.tokenStorage.getUser().roles;
          this.closeDialog();
  
           // get new token data again
           this.currentUser = this.tokenStorage.getUser();
           this.userNotifications = this.currentUser.user_notifications;
  
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
    if(this.notification.value.notificationType == 'teplota') {
      console.log('teploa je tu');
      this.notification.get('temperatureNotification')?.setValidators([Validators.required, Validators.minLength(6),  Validators.maxLength(20)]);
      this.notification.get('temperatureNotification')?.updateValueAndValidity();
    }

    else if(this.notification.value.notificationType == 'rychlost_vetra') {
      this.notification.get('windSpeedNotification')?.setValidators([Validators.required, Validators.minLength(6),  Validators.maxLength(20)]);
      this.notification.get('windSpeedNotification')?.updateValueAndValidity();
    }

    else if(this.notification.value.notificationType == 'teplota_pody') {
      this.notification.get('soilTemperatureNotification')?.setValidators([Validators.required, Validators.minLength(6),  Validators.maxLength(20)]);
      this.notification.get('soilTemperatureNotification')?.updateValueAndValidity();
    }

    else if(this.notification.value.notificationType == 'vlhkost_pody') {
      this.notification.get('soilMostureNotification')?.setValidators([Validators.required, Validators.minLength(6),  Validators.maxLength(20)]);
      this.notification.get('soilMostureNotification')?.updateValueAndValidity();
    }

    else if(this.notification.value.notificationType == 'vlhkost') {
      this.notification.get('humidityNotification')?.setValidators([Validators.required, Validators.minLength(6),  Validators.maxLength(20)]);
      this.notification.get('humidityNotification')?.updateValueAndValidity();
    }

    else if(this.notification.value.notificationType == 'dazdometer') {
      this.notification.get('rainGaugeNotification')?.setValidators([Validators.required, Validators.minLength(6),  Validators.maxLength(20)]);
      this.notification.get('rainGaugeNotification')?.updateValueAndValidity();
    }

    else if(this.notification.value.notificationType == 'tlak') {
      this.notification.get('pressureNotification')?.setValidators([Validators.required, Validators.minLength(6),  Validators.maxLength(20)]);
      this.notification.get('pressureNotification')?.updateValueAndValidity();
    }

   
    this.notification.get('descriptionNotification')?.setValidators([Validators.required, Validators.minLength(6),  Validators.maxLength(20)]);
    this.notification.get('descriptionNotification')?.updateValueAndValidity();

    this.notification.get('textNotification')?.setValidators([Validators.required, Validators.minLength(6),  Validators.maxLength(20)]);
    this.notification.get('textNotification')?.updateValueAndValidity();



    
     /* this.notification.get('temperatureNotification')?.clearValidators();
      this.notification.get('temperatureNotification')?.updateValueAndValidity(); */
    

  }

  resetFieldsRequired() {
    this.notification.patchValue({'descriptionNotification': null});
    this.notification.patchValue({'textNotification': null});

    this.notification.get(['temperatureNotification', 'humidityNotification', 'pressureNotification', 'rainGaugeNotification',
    'soilMostureNotification', 'windSpeedNotification', 'soilTemperatureNotification'])?.clearValidators();

    this.notification.get(['temperatureNotification', 'humidityNotification', 'pressureNotification', 'rainGaugeNotification',
    'soilMostureNotification', 'windSpeedNotification', 'soilTemperatureNotification'])?.updateValueAndValidity();

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


    console.log('FUNKCIA OPEEEN')

  
    
    this.getUnusedNotificationTypes();
    this.resetFieldsRequired();
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

 /* newNotification(): void {

    const { notificationType, temperatureNotification , textNotification, descriptionNotification,
       activeNotification, windSpeedNotification,
       windDirectionNotification, soilTemperatureNotification, soilMostureNotification, humidityNotification, 
       rainGaugeNotification, pressureNotification, temperatureWindSpeedOperator } = this.new;

     

    this.authService.addNewNotification(this.userId, notificationType, temperatureNotification, textNotification, activeNotification,
      descriptionNotification, windSpeedNotification, windDirectionNotification, soilTemperatureNotification, soilMostureNotification, humidityNotification, 
      rainGaugeNotification, pressureNotification, temperatureWindSpeedOperator).subscribe({
      next: data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.roles = this.tokenStorage.getUser().roles;
        this.closeDialog();


         // get new token data again
        this.currentUser = this.tokenStorage.getUser();
        this.userNotifications = this.currentUser.user_notifications;

       // window.location.reload()
        
        this.showToast(this.logicalPositions.BOTTOM_END, 10000, "Notifikácia bola pridaná!", "Pridanie notifikácie");
        this.getUnusedNotificationTypes();
      },
      error: err => {
        console.log(err.error.message)
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }*/

  editNotificationSetValues(notification:any) {

    this.isAddMode = false;

    console.log('editacia je tuu');
    console.log(notification);


    this.notification.patchValue({'pressureNotification': notification.pressure_notification});
    this.notification.patchValue({'notificationType': notification.notification_type});
    this.notification.patchValue({'temperatureNotification': notification.temperature_notification});
    this.notification.patchValue({'descriptionNotification': notification.description_notification});
    this.notification.patchValue({'windSpeedNotification': notification.wind_speed_notification});
    this.notification.patchValue({'windDirectionNotification': notification.wind_direction_notification});
    this.notification.patchValue({'soilMostureNotification': notification.soil_mosture_notification});
    this.notification.patchValue({'soilTemperatureNotification': notification.soil_temperature_notification});
    this.notification.patchValue({'humidityNotification': notification.humidity_notification});
    this.notification.patchValue({'rainGaugeNotification': notification.rain_gauge_notification});
    this.notification.patchValue({'pressureNotification': notification.pressure_notification});
    this.notification.patchValue({'textNotification': notification.text_notification});
    this.notification.patchValue({'activeNotification': notification.active_notification});
    this.notification.patchValue({'notificationType': notification.notification_type});
    this.notification.patchValue({'notificationId': notification.id});



    this.new.temperatureNotification = notification.temperature_notification;
    this.new.descriptionNotification = notification.description_notification;
    this.new.windSpeedNotification = notification.wind_speed_notification;
    this.new.windDirectionNotification = notification.wind_direction_notification;
    this.new.soilMostureNotification = notification.soil_mosture_notification;
    this.new.soilTemperatureNotification = notification.soil_temperature_notification;
    this.new.humidityNotification = notification.humidity_notification;
    this.new.rainGaugeNotification = notification.rain_gauge_notification;
    this.new.pressureNotification = notification.pressure_notification;    
    this.new.textNotification = notification.text_notification;
    this.new.activeNotification = notification.active_notification;
    this.new.notificationType = notification.notification_type;
    this.new.notificationId = notification.id;

  }

  editNotification() {
  

    const { notificationType, temperatureNotification , textNotification, descriptionNotification,
      activeNotification, windSpeedNotification,
      windDirectionNotification, soilTemperatureNotification, soilMostureNotification, humidityNotification, 
      rainGaugeNotification, pressureNotification, temperatureWindSpeedOperator, notificationId } = this.new;



    this.authService.editNotification(this.userId, notificationId, temperatureNotification, textNotification,
      activeNotification, descriptionNotification, windSpeedNotification,
      windDirectionNotification, soilTemperatureNotification, soilMostureNotification, humidityNotification, 
      rainGaugeNotification, pressureNotification, notificationType, temperatureWindSpeedOperator ).subscribe({
      next: data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.roles = this.tokenStorage.getUser().roles;
        this.closeDialog();


         // get new token data again
        this.currentUser = this.tokenStorage.getUser();
        this.userNotifications = this.currentUser.user_notifications;

       // window.location.reload()
        this.showToast(this.logicalPositions.BOTTOM_END, 10000, "Notifikácia bola upravená!", "Úprava notifikácie");

      },
      error: err => {
        console.log(err.error.message)
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }

  changeGender(e:any) {
    console.log(e);
    this.resetFieldsRequired();
  }

  getWindDirectionThingSpeak(windDirection:any) {

    switch ( windDirection ) {
      case '1': 
        windDirection = 'Severný vietor'
        break;
      case '2':
        windDirection = 'Východný vietor'
        break;
      case '3':
        windDirection = 'Južný vietor'
        break;
      case '4':
        windDirection = 'Západný vietor'
        break;
      case '5':
        windDirection = 'Severovýchodný vietor'
        break;
      case '6':
        windDirection = 'Severozápadný vietor'
        break;
      case '7':
        windDirection = 'Juchovýchodný vietor'
        break;
      case '8':
        windDirection = 'Juhozápadný vietor'
        break;
      default:
          //
          break;
   }

    return windDirection;
  }


}
