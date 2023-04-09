import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import {ClimaticConditionsService} from '../_services/climatic-conditions.service';

@Component({
  selector: 'app-climatic-conditions',
  templateUrl: './climatic-conditions.component.html',
  styleUrls: ['./climatic-conditions.component.scss']
})
export class ClimaticConditionsComponent implements OnInit {

  currentUser = this.tokenStorage.getUser();

  climaticConditionsDataThingSpeak: any;

  error = false;

  constructor(private tokenStorage: TokenStorageService, private climaticConditionsService: ClimaticConditionsService) { }

  ngOnInit(): void {

    this.climaticConditionsDataThingSpeak = {
    }

    this.getLastClimaticConditions();
  }

  getLastClimaticConditions() {
    this.climaticConditionsService.getClimaticConditions().subscribe({
      next: data => {
        this.climaticConditionsDataThingSpeak.dateTime = data.climaticConditions[0].created_at;
        this.climaticConditionsDataThingSpeak.temperature = data.climaticConditions[0].field1;
        this.climaticConditionsDataThingSpeak.windSpeed = data.climaticConditions[0].field2;
        this.climaticConditionsDataThingSpeak.rainGauge = data.climaticConditions[0].field3;
        this.climaticConditionsDataThingSpeak.windDirection = this.getWindDirection(data.climaticConditions[0].field4);
        this.climaticConditionsDataThingSpeak.humidity = data.climaticConditions[0].field5;
        this.climaticConditionsDataThingSpeak.pressure = data.climaticConditions[0].field6;
        this.climaticConditionsDataThingSpeak.soilTemperature = data.climaticConditions[0].field7;
        this.climaticConditionsDataThingSpeak.soilMosture = data.climaticConditions[0].field8;
      },
      error: err => {
        this.error = true;
      }
    })
  }

  getWindDirection(wind_direction:any) {

    switch(wind_direction) {
      case '1':
        wind_direction = 'Severný vietor'
        break;
      case '2':
        wind_direction = 'Východný vietor'
        break;
      case '3':
        wind_direction = 'Južný vietor'
        break;
      case '4':
        wind_direction = 'Západný vietor'
        break;
      case '5':
        wind_direction = 'Severovýchodný vietor'
        break;
      case '6':
        wind_direction = 'Severozápadný vietor'
        break;
      case '7':
        wind_direction = 'Juchovýchodný vietor'
        break;
      case '8':
        wind_direction = 'Juhozápadný vietor'
        break;
      default:
          break;
   }

    return wind_direction;
  }

}
