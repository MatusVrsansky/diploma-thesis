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
  options: any;
  optionsTwo: any;
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

  allNotificationTypes = [
    {name: "Teplota (°C)", type: 'temperatureC'},
    {name: "Teplota (°F)", type: 'temperatureF'},
    {name: "Vľhkosť (%)", type: 'humidity'},
    {name: "Tlak", type: 'pressure'},
    {name: "Vietor km/h", type: 'windKMH'},
    {name: "Daždometer", type: 'willRain'},
    {name: "Smer Vetra", type: 'windDirection'},
  ];

  selectedItem = 'temperatureC';
  graphName = 'Teplota';


  // hide number graph and show wind Direction graph
  hideGraph = false;


  constructor(private historyService: HistoryService){

   

   

  }

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

      // call function to fill values
      this.setWindDirectionValues(this.openWeatherHistoryWindDirection);

     

       this.options = {
          color: ['#3398DB'],
          title: {
            text: this.graphName,
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
            name: this.graphName,
            type: 'bar',
            barWidth: '60%',
            data: this.openWeatherHistoryData
          }]
          
        
        };

        this.optionsTwo = {
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
              name: 'area',
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

      console.log('history uesgdf')
      console.log(this.openWeatherHistoryDate)
    }

    setWindDirectionValues(openWeatherHistoryWindDirection: any) {
      //let arr = undefined;

      let frequency = {};

      const arr = ['Západo-juhozápadný vietor', 'Západo-juhozápadný vietor', 'Západo-juhozápadný vietor', 'Juhozápadný vietor', 'Juhozápadný vietor', 'Juhozápadný vietor', 'Juhozápadný vietor', 'Juhozápadný vietor', 'Juhozápadný vietor', 'Juhozápadný vietor', 'Juhozápadný vietor', 'Juhozápadný vietor', 'Juhozápadný vietor', 'Juhozápadný vietor', 'Juhozápadný vietor', 'Juhozápadný vietor', 'Juhozápadný vietor', 'Juhozápadný vietor', 'Juhozápadný vietor', 'Juhozápadný vietor', 'Západo-juhozápadný vietor', 'Západo-juhozápadný vietor', 'Západo-juhozápadný vietor', 'Východný vietor']

      for (let num of arr) {
        frequency[num] = (frequency[num] || 0) + 1;
      }

      console.log('fsdfdsfsdfdsfds')
      
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
     
      
      //arr = openWeatherHistoryWindDirection;

      //const arr = ['Západo-juhozápadný vietor', 'Západo-juhozápadný vietor', 'Západo-juhozápadný vietor', 'Juhozápadný vietor', 'Juhozápadný vietor', 'Juhozápadný vietor', 'Juhozápadný vietor', 'Juhozápadný vietor', 'Juhozápadný vietor', 'Juhozápadný vietor', 'Juhozápadný vietor', 'Juhozápadný vietor', 'Juhozápadný vietor', 'Juhozápadný vietor', 'Juhozápadný vietor', 'Juhozápadný vietor', 'Juhozápadný vietor', 'Juhozápadný vietor', 'Juhozápadný vietor', 'Juhozápadný vietor', 'Západo-juhozápadný vietor', 'Západo-juhozápadný vietor', 'Západo-juhozápadný vietor', 'Východný vietor']

         
     
    /*  for(let i=0;i<arr.length;i++) {
        counts[arr[i]] = counts[arr[i]] ? (counts[arr[i]] + 1) : 1;
      }*/
    
    
      
      
      //const countsSorted = Object.entries(this.counts).sort(([_, a], [__, b]) => this.a - this.b);

      /*for(let i=0; i<countsSorted.length; i++) {
        this.openWeatherHistoryWindDirectionsTypes.push(countsSorted[i][0])

        const history = {
          value: countsSorted[i][1],
          name: countsSorted[i][0],
        
        }

        this.openWeatherHistoryWindDirectionsValues.push(history);
      }*/


    }

    cambiaTalla(event: any) {
      console.log(event);
      this.openWeatherHistoryData = [];
      this.hideGraph = false;

      for (var val of this.historyData.main) {
        switch(event) {
          case 'temperatureC' : this.graphName = 'Teplota (°C)'; this.openWeatherHistoryData.push(val.temp_c); break;
          case 'temperatureF' : this.graphName = 'Teplota (°F)'; this.openWeatherHistoryData.push(val.temp_f); break;
          case 'humidity' : this.graphName = 'Vľhkosť (%)'; this.openWeatherHistoryData.push(val.humidity); break;
          case 'pressure' : this.graphName = 'Tlak'; this.openWeatherHistoryData.push(val.pressure_in); break;
          case 'windKMH' : this.graphName = 'Vietor km/h'; this.openWeatherHistoryData.push(val.wind_kph); break;
          case 'willRain' : this.graphName = 'Daždometer'; this.openWeatherHistoryData.push(val.will_it_rain); break;
          default: this.hideGraph = true; break;
        }
        console.log('idem')
      }

      console.log(this.openWeatherHistoryData)

      // Modify graph
      const updateOptions = {
        title: {
          text: this.graphName
        },
        series: [{
          name: this.graphName,
          type: 'bar',
          barWidth: '60%',
          data: this.openWeatherHistoryData
        }]
      };
      this.options = { ...this.options, ...updateOptions }
    
    }

    setThingSpeakHistory(data: any) {
      this.historyDataThingSpeak.main = data;
      const dataToTable: object[] = [];

      for (var val of this.historyDataThingSpeak.main) {

        var historyYesterday = this.pipe.transform(val.created_at, 'dd.MM.yyyy HH:mm');
        
        const history = {
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

        dataToTable.push(history)
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
