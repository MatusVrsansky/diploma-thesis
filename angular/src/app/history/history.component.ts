import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { TokenStorageService } from '../_services/token-storage.service';
import { AuthService } from '../_services/auth.service';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})


export class HistoryComponent implements OnInit {


  historyData: any;
  historyDataThingSpeak: any;
  arrayData: any;
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  todayWithPipe = null;

  // get current day - 1 day
  yesterday = new Date(new Date().setDate(new Date().getDate()-1));
  yesterdayFormatted = this.pipe.transform(this.yesterday, 'yyyy-MM-dd')
  yesterdaySlovakFormatff = this.pipe.transform(this.yesterday, 'dd.MM.yyyy')



  yesterdaySlovakFormat  = ''
  
 
  
  
  constructor(){}



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

    this.yesterdaySlovakFormat = this.yesterdaySlovakFormatff as string;

  
    this.getWeatherData();
    //console.log(this.historyData);

    this.getThingSpeakHistory();


  }

  // api data for ThingSpeak
  getThingSpeakHistory() {
    const historyThingSpeak = 'https://api.thingspeak.com/channels/1825300/feeds.json?api_key=ERX6U69VZ9F5MSFM';

    const apiThingSpeakHistoryData: object[] = [];

    fetch(historyThingSpeak)
    .then(response=>response.json())
    .then(data=>{
      
      var historyYesterday = this.pipe.transform(data.feeds[14].created_at, 'yyyy-MM-dd');
      
      
      for (var product of data.feeds) {
        if(this.pipe.transform(product.created_at, 'yyyy-MM-dd') == this.yesterdayFormatted) {
          apiThingSpeakHistoryData.push(product)
        }
    }
    
      this.historyDataThingSpeak.main = apiThingSpeakHistoryData;
    })
  }
  
  
  getWeatherData(){
    var combinedString = 'https://api.weatherapi.com/v1/history.json?key=0419f763b19f42fba7b181204223006&q=Ostratice&dt='
    var combinedStringTwo = this.yesterdayFormatted;

   // console.log(this.yesterdaySlovakFormat)


    fetch(combinedString + combinedStringTwo)
    .then(response=>response.json())
    .then(data=>{
      this.setWeatherData(data);
    })
    }

    // let data = JSON.parse('{"coord":{"lon":72.85,"lat":19.01},"weather":[{"id":721,"main":"Haze","description":"haze","icon":"50n"}],"base":"stations","main":{"temp":297.15,"feels_like":297.4,"temp_min":297.15,"temp_max":297.15,"pressure":1013,"humidity":69},"visibility":3500,"wind":{"speed":3.6,"deg":300},"clouds":{"all":20},"dt":1580141589,"sys":{"type":1,"id":9052,"country":"IN","sunrise":1580089441,"sunset":1580129884},"timezone":19800,"id":1275339,"name":"Mumbai","cod":200}');
    // this.setWeatherData(data);
  
    setWeatherData(data:any){
      console.log('her i am')
      this.historyData.main = data.forecast.forecastday[0].hour;

      const dataToTable: object[] = [];


      console.log(this.historyData.main)


      for (var val of this.historyData.main) {
        
        var historyYesterday = this.pipe.transform(val.time, 'dd.MM.yyyy HH:mm');
       const person = {
          hour: historyYesterday,
          degreeC: val.temp_c,
          degreeF: val.temp_f,
          windDirection: this.getWindDirection(val.wind_dir)
      }

      dataToTable.push(person)

      }

      this.arrayData.main = dataToTable;

    }

    getWindDirection(wind_direction:any) {

      switch ( wind_direction ) {
        case 'NE':
            wind_direction = 'Severovýchodný vietor'
            break;
        case 'NNE':
          wind_direction = 'Severo-severovýchodný vietor'
          break;
        case 'E':
          wind_direction = 'Východný vietor'
          break;
        case 'S':
          wind_direction = 'Južný vietor'
          break;
        case 'ENE':
            wind_direction = 'Východo-severovýchodný vietor'
            break;
        case 'ESE':
            wind_direction = 'Východo-juhovýchodný vietor'
            break;
        case 'SSE':
            wind_direction = 'Juho-juhovýchodný vietor'
            break;
        case 'SSW':
            wind_direction = 'Juho-juhozápadný vietor'
            break;
        case 'SW':
            wind_direction = 'Juhozápadný vietor'
            break;
        case 'W':
            wind_direction = 'Západný vietor'
            break;
        case 'WNW':
            wind_direction = 'Západo-serverozápadný vietor'
            break;
        case 'WSW':
          wind_direction = 'Západo-juhozápadný vietor'
          break;
        case 'NW':
          wind_direction = 'Severozápadný vietor'
          break;
        case 'NNW':
          wind_direction = 'Severo-severozápadný vietor'
          break;  
        case 'N':
          wind_direction = 'Severný vietor'
          break;
        case 'SE':
          wind_direction = 'Juchovýchodný vietor'
          break;    
        default: 
            // 
            break;
     }

      return wind_direction;
    }

    settings = {
      columns: {
        hour: {
          title: 'Hodina'
        },
        degreeC: {
          title: 'Teplota °C'
        },
        degreeF: {
          title: 'Teplota ° F'
        },
        windDirection: {
          title: 'Smer vetra'
        }
      },
      actions: false,
    //  pager: { display: false }

  };


    
      
  
}