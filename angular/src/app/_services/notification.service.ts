import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
const AUTH_API = 'http://localhost:8080/api/notification/';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  @Injectable({
    providedIn: 'root'
  })
  
export class NotificationService {
  constructor(private http: HttpClient) { }
 
  addNewNotification(userId: number, notification: Array<any>):  Observable<any> {

    return this.http.post(AUTH_API + 'addNewNotification', {
      currentLoggedUserId : userId,
      notificationType: [...notification].shift().notificationType,
      temperatureNotification: [...notification].shift().temperatureNotification,
      windDirectionNotification: [...notification].shift().windDirectionNotification,
      soilTemperatureNotification: [...notification].shift().soilTemperatureNotification,
      soilMostureNotification: [...notification].shift().soilMostureNotification,
      humidityNotification: [...notification].shift().humidityNotification,
      rainGaugeNotification: [...notification].shift().rainGaugeNotification,
      pressureNotification: [...notification].shift().pressureNotification,
      textNotification: [...notification].shift().textNotification,
      activeNotification: [...notification].shift().activeNotification,
      windSpeedNotification: [...notification].shift().windSpeedNotification,
      descriptionNotification:  [...notification].shift().descriptionNotification,
      compareOperator: [...notification].shift().compareOperator
    }, httpOptions);
  }

  editNotification(userId: number, notification: Array<any>):  Observable<any> {
    
    return this.http.post(AUTH_API + 'editNotification', {
      currentLoggedUserId: userId,
      notificationId: [...notification].shift().notificationId,
      temperatureNotification:  [...notification].shift().temperatureNotification,
      windDirectionNotification:  [...notification].shift().windDirectionNotification,
      soilTemperatureNotification:  [...notification].shift().soilTemperatureNotification,
      soilMostureNotification:  [...notification].shift().soilMostureNotification,
      humidityNotification:  [...notification].shift().humidityNotification,
      rainGaugeNotification:  [...notification].shift().rainGaugeNotification,
      pressureNotification:  [...notification].shift().pressureNotification,
      textNotification:  [...notification].shift().textNotification,
      activeNotification:  [...notification].shift().activeNotification,
      descriptionNotification:  [...notification].shift().descriptionNotification,
      windSpeedNotification:  [...notification].shift().windSpeedNotification,
      compareOperator:  [...notification].shift().compareOperator,
      notificationType:  [...notification].shift().notificationType
    }, httpOptions);
  }


  getAllNotifications(userId: number): Observable<any> {
   
    const params = new HttpParams()
    .set('userId', userId);

    return this.http.get(AUTH_API + 'getAllNotifications', { 
      params: params,
      responseType: 'json' 
    });
  }

  removeNotification(userId:number, notificationId: number): Observable<any> {

    return this.http.post(AUTH_API + 'removeNotification', {
      userId,
      notificationId
    }, httpOptions);
  }
}