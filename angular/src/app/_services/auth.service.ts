import { Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NumberSymbol } from '@angular/common';
const AUTH_API = 'http://localhost:8080/api/auth/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  signOut(): void {
    window.sessionStorage.clear();
  }
  
  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username,
      password
    }, httpOptions);
  }
  register(username: string, email: string, password: string, phone_number: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username,
      email,
      password,
      phone_number,
    }, httpOptions);
  }
  update(id: number, username: string, email: string, phone_number: string): Observable<any> {
    console.log(id);
    console.log(username);
    console.log(email);
    console.log(phone_number);
   
    return this.http.post(AUTH_API + 'update', {
      id,
      username,
      email,
      phone_number
    }, httpOptions);
  }

  removeNotification(userId:number, notificationId: number): Observable<any> {

    console.log(userId);
    console.log(notificationId)
   
    return this.http.post(AUTH_API + 'removeNotification', {
      userId,
      notificationId
    }, httpOptions);
  }

  addNewNotification(currentLoggedUserId: number, notificationType: string, temperatureNotification: string, textNotification: string, activeNotification: boolean,
    descriptionNotification: string, windSpeedNotification: number, windDirectionNotification: string, soilTemperatureNotification: null,
    soilMostureNotification: number, humidityNotification: number, rainGaugeNotification: number, pressureNotification: number,
    temperatureWindSpeedOperator:string):  Observable<any> {
 

    // when notification type is : Temperature, WindSpeed



    return this.http.post(AUTH_API + 'addNewNotification', {
      currentLoggedUserId,
      notificationType,
      temperatureNotification,
      windDirectionNotification,
      soilTemperatureNotification, 
      soilMostureNotification,
      humidityNotification, 
      rainGaugeNotification, 
      pressureNotification,
      textNotification,
      activeNotification,
      windSpeedNotification, 
      descriptionNotification, 
      temperatureWindSpeedOperator
    }, httpOptions);
  }

  editNotification(currentLoggedUserId: number, notificationId: number, temperatureNotification: string, textNotification: string, activeNotification: boolean,
    descriptionNotification: string, windSpeedNotification: number,
    windDirectionNotification: string, soilTemperatureNotification: null,
    soilMostureNotification: number, humidityNotification: number, rainGaugeNotification: number, pressureNotification: number,
    notificationType: string, temperatureWindSpeedOperator:string):  Observable<any> {
    console.log(notificationId)
    console.log(temperatureNotification)
    console.log(textNotification)
    console.log(activeNotification)

    return this.http.post(AUTH_API + 'editNotification', {
      currentLoggedUserId,
      notificationId,
      temperatureNotification,
      windDirectionNotification,
      soilTemperatureNotification,
      soilMostureNotification,
      humidityNotification, 
      rainGaugeNotification, 
      pressureNotification,
      textNotification,
      activeNotification,
      descriptionNotification,
      windSpeedNotification,
      temperatureWindSpeedOperator,
      notificationType
    }, httpOptions);
  }
  
}