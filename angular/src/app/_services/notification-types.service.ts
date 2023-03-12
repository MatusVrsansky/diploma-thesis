import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
const AUTH_API = 'http://localhost:8080/api/notification-types/';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  @Injectable({
    providedIn: 'root'
  })
  
export class NotificationTypesService {
  constructor(private http: HttpClient) { }

  getAllNotificationTypes(): Observable<any> {

    return this.http.get(AUTH_API + 'getAllNotificationTypes', { 
      responseType: 'json' 
    });
  }
}