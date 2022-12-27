import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
const AUTH_API = 'http://localhost:8080/api/config/';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  @Injectable({
    providedIn: 'root'
  })
  
export class ConfigService {
  constructor(private http: HttpClient) { }
 
  setSendPhoneNotificationsState(value: boolean):  Observable<any> {
    
    return this.http.post(AUTH_API + 'setSendPhoneNotificationsState', {
      sendPhoneNotifications: value
    }, httpOptions);
  }

  getAppConfigurations(): Observable<any> {

    console.log('getAppConfigurations');
  
    return this.http.get(AUTH_API + 'getAppConfigurations', { 
      responseType: 'json' 
    });
  }
}