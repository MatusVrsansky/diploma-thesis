import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import {HistoryService} from '../_services/history.service';
import { DatePipe } from '@angular/common';
import { ThemeOption } from 'ngx-echarts';

import { EChartsOption } from 'echarts';
import LinearGradient from 'zrender/lib/graphic/LinearGradient';





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
  
  openWeatherNumberGraph: any;
  openWeatherTextGraph: any;
  theme: string | ThemeOption;

  openWeatherHistoryDate =  new Array();
  openWeatherHistoryData = new Array();
  openWeatherHistoryWindDirection = new Array();

  openWeatherHistoryWindDirectionsTypes =  new Array();
  openWeatherHistoryWindDirectionsValues =  new Array();

  counts: any;
  a: any;
  b: any;


  // get current day - 1 day
  yesterday = new Date(new Date().setDate(new Date().getDate()-1));
  yesterdayFormatted = this.pipe.transform(this.yesterday, 'yyyy-MM-dd')
  yesterdaySlovakFormatff = this.pipe.transform(this.yesterday, 'dd.MM.yyyy')
  yesterdaySlovakFormat  = ''
  errorThingSpeakHistory = false;
  errorWeatherBitHistory = false;

  allNotificationTypesOpenWeather = [
    {name: "Teplota (°C)", type: 'temperatureC'},
    {name: "Teplota (°F)", type: 'temperatureF'},
    {name: "Vľhkosť (%)", type: 'humidity'},
    {name: "Tlak", type: 'pressure'},
    {name: "Vietor km/h", type: 'windKMH'},
    {name: "Daždometer", type: 'willRain'},
    {name: "Smer vetra", type: 'windDirection'},
  ];

  selectedItemOpenWeather = 'temperatureC';

  thingSpeakNumberGraph: any;
  thingSpeakTextGraph: any;

  thingSpeakHistoryDate = new Array();
  thingSpeakHistoryData = new Array();
  thingSpeakHistoryWindDirection = new Array();

  thingSpeakHistoryWindDirectionsTypes =  new Array();
  thingSpeakHistoryWindDirectionsValues =  new Array();

  allNotificationTypesThingSpeak = [
    {name: "Teplota (°C)", type: 'degreeC'},
    {name: "Rýchlosť vetra", type: 'windSpeed'},
    {name: "Daždometer", type: 'rainGauge'},
    {name: "Smer vetra", type: 'windDirection'},
    {name: "Vlhkosť", type: 'humidity'},
    {name: "Tlak", type: 'pressure'},
    {name: "Teplota pôdy", type: 'soilTemperature'},
    {name: "Vlhkosť pôdy", type: 'soilMosture'},
  ];

  selectedItemThingSpeak = 'degreeC';

  graphNameOpenWeather = 'Teplota';
  graphNameThingSpeak = 'Teplota';

  // hide number graph and show wind Direction graph
  hideGraphThingSpeak = false;
  hideGraphOpenWeather = false;

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
         if(this.pipe.transform(myData[i].created_at, 'yyyy-MM-dd') == this.yesterdayFormatted) {
             apiThingSpeakHistoryData.push(myData[i])
         }
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
      
        
        const history = {
          hour: historyYesterday,
          degreeC: val.temp_c,
          degreeF: val.temp_f,
          windDirection: this.getWindDirection(val.wind_dir),
          humidity: val.humidity,
          pressure_in: val.pressure_in,
          wind_kph: val.wind_kph,
          will_rain: val.will_it_rain
        }

        dataToTable.push(history)
        this.openWeatherHistoryDate.push(historyYesterday?.slice(10, 16))
        this.openWeatherHistoryData.push(val.temp_c)


        this.openWeatherHistoryWindDirection.push(history.windDirection);
       
       
      }

      console.log('++++++++++++++++++++++++')
      console.log(this.openWeatherHistoryWindDirection);
      console.log('++++++++++++++++++++++++')

      // call function to fill values of wind direction
      this.openWeatherHistorysetWindDirectionValues(this.openWeatherHistoryWindDirection);

     

       this.openWeatherNumberGraph = {
          color: ['#3398DB'],
          title: {
            text: this.graphNameOpenWeather,
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: this.openWeatherHistoryDate,
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [{
            type: 'value'
          }],
          series: [{
            name: this.graphNameOpenWeather,
            type: 'bar',
            barWidth: '60%',
            data: this.openWeatherHistoryData
          }]
          
        
        };

        this.openWeatherTextGraph = {
          title: {
            //left: '50%',
            text: 'Smer vetra',
            //subtext: 'Mocking Data',
           // textAlign: 'center',
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            align: 'auto',
            bottom: 10,
            //data: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6', 'rose7', 'rose8']
            data: this.openWeatherHistoryWindDirectionsTypes
          },
          calculable: true,
          series: [
            {
              name: 'Smer vetra',
              type: 'pie',
              radius: [30, 110],
              roseType: 'area',
              data: 
                
  
                this.openWeatherHistoryWindDirectionsValues
                
              
            }
          ]
        };

          
      this.arrayData.main = dataToTable;

      console.log(this.arrayData.main[0])
    }

    openWeatherHistorysetWindDirectionValues(openWeatherHistoryWindDirection: any) {
      let frequency = {};
      for (let num of openWeatherHistoryWindDirection) {
        frequency[num] = (frequency[num] || 0) + 1;
      }

      Object.entries(frequency).forEach(([key, value], index) => {
        // name Bobby Hadz 0
        // country Chile 1
        console.log(key, value);
        const history = {
          value: value,
          name: key
        }

        this.openWeatherHistoryWindDirectionsTypes.push(key);

        this.openWeatherHistoryWindDirectionsValues.push(history);

      });

      console.log(">")
      console.log(this.openWeatherHistoryWindDirectionsTypes)
      console.log(this.openWeatherHistoryWindDirectionsValues) 
    }

    thingSpeakHistorysetWindDirectionValues(thingSpeakHistoryWindDirection: any) {
      let frequency = {};
      for (let num of thingSpeakHistoryWindDirection) {
        frequency[num] = (frequency[num] || 0) + 1;
      }

      Object.entries(frequency).forEach(([key, value], index) => {
        console.log(key, value);
        const history = {
          value: value,
          name: key
        }

        this.thingSpeakHistoryWindDirectionsTypes.push(key);
        this.thingSpeakHistoryWindDirectionsValues.push(history);
      });

      console.log(">")
      console.log(this.openWeatherHistoryWindDirectionsTypes)
      console.log(this.openWeatherHistoryWindDirectionsValues) 
    }



    changeOpenWeatherHistoryGraphData(event: any) {
      this.openWeatherHistoryData = [];
      this.hideGraphOpenWeather = false;

      for (var val of this.historyData.main) {
        switch(event) {
          case 'temperatureC' : this.graphNameOpenWeather = 'Teplota (°C)'; this.openWeatherHistoryData.push(val.temp_c); break;
          case 'temperatureF' : this.graphNameOpenWeather = 'Teplota (°F)'; this.openWeatherHistoryData.push(val.temp_f); break;
          case 'humidity' : this.graphNameOpenWeather = 'Vľhkosť (%)'; this.openWeatherHistoryData.push(val.humidity); break;
          case 'pressure' : this.graphNameOpenWeather = 'Tlak'; this.openWeatherHistoryData.push(val.pressure_in); break;
          case 'windKMH' : this.graphNameOpenWeather = 'Vietor km/h'; this.openWeatherHistoryData.push(val.wind_kph); break;
          case 'willRain' : this.graphNameOpenWeather = 'Daždometer'; this.openWeatherHistoryData.push(val.will_it_rain); break;
          default: this.hideGraphOpenWeather = true; break;
        }
      }

      console.log(this.openWeatherHistoryData)

      // Modify graph
      const updateOptions = {
        title: {
          text: this.graphNameOpenWeather
        },
        series: [{
          name: this.graphNameOpenWeather,
          type: 'bar',
          barWidth: '60%',
          data: this.openWeatherHistoryData
        }]
      };
      this.openWeatherNumberGraph = { ...this.openWeatherNumberGraph, ...updateOptions }
    }

    changeThingSpeakHistoryGraphData(event: any) {
      this.thingSpeakHistoryData = [];
      this.hideGraphThingSpeak = false;

      for (var val of this.historyDataThingSpeak.main) {
        switch(event) {
          case 'degreeC' : this.graphNameThingSpeak = 'Teplota (°C)'; this.thingSpeakHistoryData.push(val.field1); break;
          case 'windSpeed' : this.graphNameThingSpeak = 'Rýchlosť vetra'; this.thingSpeakHistoryData.push(val.field2); break;
          case 'rainGauge' : this.graphNameThingSpeak = 'Daždometer'; this.thingSpeakHistoryData.push(val.field3); break;
          case 'humidity' : this.graphNameThingSpeak = 'Vlhkosť'; this.thingSpeakHistoryData.push(val.field5); break;
          case 'pressure' : this.graphNameThingSpeak = 'Tlak'; this.thingSpeakHistoryData.push(val.field6); break;
          case 'soilTemperature' : this.graphNameThingSpeak = 'Teplota pôdy'; this.thingSpeakHistoryData.push(val.field7); break;
          case 'soilMosture' : this.graphNameThingSpeak = 'Vlhkosť pôdy'; this.thingSpeakHistoryData.push(val.field8); break;
          default: this.hideGraphThingSpeak = true; break;
        }
        console.log('idem')
      }

      // Modify graph
      const updateOptions = {
        title: {
          text: this.graphNameThingSpeak
        },
        series: [{
          name: this.graphNameThingSpeak,
          type: 'bar',
          barWidth: '60%',
          data: this.thingSpeakHistoryData
        }]
      };
      this.thingSpeakNumberGraph = { ...this.thingSpeakNumberGraph, ...updateOptions }
    }

    setThingSpeakHistory(data: any) {
      this.historyDataThingSpeak.main = data;
      const dataToTable: object[] = [];

      for (var val of this.historyDataThingSpeak.main) {

        var historyYesterdayThingSpeak = this.pipe.transform(val.created_at, 'dd.MM.yyyy HH:mm');

        const history = {
          hour: historyYesterdayThingSpeak,
          degreeC: val.field1,
          windSpeed: val.field2,
          rainGauge: val.field3,
          windDirection: this.getWindDirectionThingSpeak(val.field4),
          humidity: val.field5,
          pressure: val.field6,
          soilTemperature: val.field7,
          soilMosture: val.field8
        }

        dataToTable.push(history)

        this.thingSpeakHistoryDate.push(history.hour?.slice(10, 16))
        this.thingSpeakHistoryData.push(val.field1)
        this.thingSpeakHistoryWindDirection.push(history.windDirection)
      }

      // call function to fill values of wind direction
      this.thingSpeakHistorysetWindDirectionValues(this.thingSpeakHistoryWindDirection);

    
      this.arrayDataThingSpeak.main = dataToTable;

      this.thingSpeakNumberGraph = {
        color: ['#3398DB'],
        title: {
          text: this.graphNameThingSpeak,
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.thingSpeakHistoryDate,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [{
          type: 'value'
        }],
        series: [{
          name: this.graphNameThingSpeak,
          type: 'bar',
          barWidth: '60%',
          data: this.thingSpeakHistoryData
        }]
      };

      this.thingSpeakTextGraph = {
        title: {
          //left: '50%',
          text: 'Smer vetra',
          //subtext: 'Mocking Data',
         // textAlign: 'center',
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          align: 'auto',
          bottom: 10,
          //data: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6', 'rose7', 'rose8']
          data: this.thingSpeakHistoryWindDirectionsTypes
        },
        calculable: true,
        series: [
          {
            name: 'Smer vetra',
            type: 'pie',
            radius: [30, 110],
            roseType: 'area',
            data: 
              

              this.thingSpeakHistoryWindDirectionsValues
              
            
          }
        ]
      };

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
        will_rain: {
          title: 'Daždometer',
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
