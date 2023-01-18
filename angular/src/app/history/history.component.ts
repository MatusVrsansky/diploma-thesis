import { Component, OnInit } from '@angular/core';
import {HistoryService} from '../_services/history.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})


export class HistoryComponent implements OnInit {


  historyData: any;
  historyDataThingSpeak: any;
  arrayData: any;
  arrayDataThingSpeak: any;
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  todayWithPipe = null;

  // get current day - 1 day
  yesterday = new Date(new Date().setDate(new Date().getDate()-1));
  yesterdayFormatted = this.pipe.transform(this.yesterday, 'yyyy-MM-dd')
  yesterdaySlovakFormatff = this.pipe.transform(this.yesterday, 'dd.MM.yyyy')
  yesterdaySlovakFormat  = ''
  errorThingSpeakHistory = false;
  errorWeatherBitHistory = false;

  constructor(private historyService: HistoryService){}

  ngOnInit() {

    this.historyData = {
      main : {},
    };

    this.historyDataThingSpeak = {
      main: {},
    }

    this.arrayData = {
      main: {},
    }

    this.arrayDataThingSpeak = {
      main: {},
    }

    this.yesterdaySlovakFormat = this.yesterdaySlovakFormatff as string;

    this.getWeatherBitHistory();
    this.getThingSpeakHistory();
  }

  // api data for ThingSpeak
  getThingSpeakHistory() {
    this.historyService.getThingSpeakHistory().subscribe({
      next: data => {
        const apiThingSpeakHistoryData: object[] = [];
        const myData = JSON.parse(JSON.stringify(data.historyThingSpeak));

        for (var i=0;i<myData.length;i++) {

          //if(this.pipe.transform(product.created_at, 'yyyy-MM-dd') == this.yesterdayFormatted) {
             apiThingSpeakHistoryData.push(myData[i])
           // }
          }

          this.setThingSpeakHistory(apiThingSpeakHistoryData);
       
      },
      error: err => {
        console.log(err);
        this.errorThingSpeakHistory = true;
      }
    })
  }


  getWeatherBitHistory() {
    this.historyService.getWeatherApiHistory().subscribe({
      next: data => {
        console.log(data);
        console.log(JSON.parse(JSON.stringify(data.weatherApiHistory)))
        const myData = JSON.parse(JSON.stringify(data.weatherApiHistory));
        this.setWeatherData(myData);
       
      },
      error: err => {
        console.log(err);
        console.log('nespracuje mi data');
        this.errorWeatherBitHistory = true;
      }
    })
    }

    setWeatherData(data:any){
      this.historyData.main = data.forecast.forecastday[0].hour;
      const dataToTable: object[] = [];

      for (var val of this.historyData.main) {

        var historyYesterday = this.pipe.transform(val.time, 'dd.MM.yyyy HH:mm');
        
        const person = {
          hour: historyYesterday,
          degreeC: val.temp_c,
          degreeF: val.temp_f,
          windDirection: this.getWindDirection(val.wind_dir),
          humidity: val.humidity,
          pressure_in: val.pressure_in,
          wind_kph: val.wind_kph,
          heatindex_c: val.heatindex_c
        }

        dataToTable.push(person)
      }

      this.arrayData.main = dataToTable;
    }

    setThingSpeakHistory(data: any) {
      this.historyDataThingSpeak.main = data;
      const dataToTable: object[] = [];

      for (var val of this.historyDataThingSpeak.main) {

        var historyYesterday = this.pipe.transform(val.created_at, 'dd.MM.yyyy HH:mm');
        
        const person = {
          hour: historyYesterday,
          degreeC: val.field1,
          windSpeed: val.field2,
          rainGauge: val.field3,
          windDirection: this.getWindDirectionThingSpeak(val.field4),
          humidity: val.field5,
          pressure: val.field6,
          soilTemperature: val.field7,
          soilMosture: val.field8
        }

        dataToTable.push(person)
      }

      this.arrayDataThingSpeak.main = dataToTable;
    }



    getWindDirection(windDirection:any) {

      switch ( windDirection ) {
        case 'NE':
          windDirection = 'Severovýchodný vietor'
            break;
        case 'NNE':
          windDirection = 'Severo-severovýchodný vietor'
          break;
        case 'E':
          windDirection = 'Východný vietor'
          break;
        case 'S':
          windDirection = 'Južný vietor'
          break;
        case 'ENE':
          windDirection = 'Východo-severovýchodný vietor'
            break;
        case 'ESE':
          windDirection = 'Východo-juhovýchodný vietor'
            break;
        case 'SSE':
          windDirection = 'Juho-juhovýchodný vietor'
            break;
        case 'SSW':
          windDirection = 'Juho-juhozápadný vietor'
            break;
        case 'SW':
          windDirection = 'Juhozápadný vietor'
            break;
        case 'W':
          windDirection = 'Západný vietor'
            break;
        case 'WNW':
          windDirection = 'Západo-serverozápadný vietor'
            break;
        case 'WSW':
          windDirection = 'Západo-juhozápadný vietor'
          break;
        case 'NW':
          windDirection = 'Severozápadný vietor'
          break;
        case 'NNW':
          windDirection = 'Severo-severozápadný vietor'
          break;
        case 'N':
          windDirection = 'Severný vietor'
          break;
        case 'SE':
          windDirection = 'Juchovýchodný vietor'
          break;
        default:
            //
            break;
     }

      return windDirection;
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

    

    historyWeatherApi = {
      columns: {
        hour: {
          title: 'Hodina'
        },
        degreeC: {
          title: 'Teplota (°C)'
        },
        degreeF: {
          title: 'Teplota (°F)',
          "show": false
        },
        windDirection: {
          title: 'Smer vetra',
          editable: true
        },
        humidity: {
          title: 'Vľhkosť (%)',
          editable: true
        },
        pressure_in: {
          title: 'Tlak',
          editable: true
        },
        wind_kph: {
          title: 'Vietor km/h',
          editable: true
        },
        heatindex_c: {
          title: 'Tepelný index °C',
          editable: true
        },

      },
    
      actions: false,
      noDataMessage: 'Žiadne dáta na zobrazenie',
      attr: {
        class: 'test-table'
      },
      pager : {
        perPage: 4
        }
    //  pager: { display: false }

    };

    historyThingSpeak = {
      columns: {
        hour: {
          title: 'Hodina'
        },
        degreeC: {
          title: 'Teplota (°C)'
        },
        windSpeed: {
          title: 'Rýchlosť vetra (MPH)',
          "show": false
        },
        rainGauge: {
          title: 'Dažďometer (palce dažďa)',
          editable: true
        },
        windDirection: {
          title: 'Smer vetra',
          "show": false
        },
        humidity: {
          title: 'Vľhkosť (%)',
          editable: true
        },
        pressure: {
          title: 'Tlak (hPa)',
          editable: true
        },
        soilTemperature: {
          title: 'Teplota vody (°C)',
          editable: true
        },
        soilMosture: {
          title: 'Vlhkosť pôdy ()',
          editable: true
        },

      },
    
      actions: false,
      noDataMessage: 'Žiadne dáta na zobrazenie',
      attr: {
        class: 'test-table'
      },
      pager : {
        perPage: 4
        }
    //  pager: { display: false }

    };



  



  





}
