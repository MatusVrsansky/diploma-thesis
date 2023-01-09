import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-climatic-conditions',
  templateUrl: './climatic-conditions.component.html',
  styleUrls: ['./climatic-conditions.component.scss']
})
export class ClimaticConditionsComponent implements OnInit {

  climaticConditionsDataThingSpeak: any;

  error = false;

  constructor() { }

  ngOnInit(): void {

    this.climaticConditionsDataThingSpeak = {
    }

    this.getLastClimaticConditions();
  }

  getLastClimaticConditions() {
    const historyThingSpeak = 'https://api.thingspeak.com/channels/1825300/feeds.json?api_key=ERX6U69VZ9F5MSFM&timezone=Europe/Budapest&results=1';

    const apiThingSpeakHistoryData: object[] = [];

    fetch(historyThingSpeak)
    .then(response=>response.json())
    .then(data=>{
      console.log(data)
      
      this.climaticConditionsDataThingSpeak.dateTime = data.feeds[0].created_at;
      this.climaticConditionsDataThingSpeak.temperature = data.feeds[0].field1;
      this.climaticConditionsDataThingSpeak.windSpeed = data.feeds[0].field2;
      this.climaticConditionsDataThingSpeak.rainGauge = data.feeds[0].field3;
      this.climaticConditionsDataThingSpeak.windDirection = this.getWindDirection(data.feeds[0].field4);
      this.climaticConditionsDataThingSpeak.humidity = data.feeds[0].field5;
      this.climaticConditionsDataThingSpeak.pressure = data.feeds[0].field6;
      this.climaticConditionsDataThingSpeak.soilTemperature = data.feeds[0].field7;
      this.climaticConditionsDataThingSpeak.soilMosture = data.feeds[0].field8;
    })
    .catch(error => {
      console.log(error);
      this.error = true;
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
