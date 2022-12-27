import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
const AUTH_API = 'http://localhost:8080/api/twilio/';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  @Injectable({
    providedIn: 'root'
  })
  
export class TwilioService {
  constructor(private http: HttpClient) { }
 
  getTwilioAccountBalance(): Observable<any> {

    console.log('getTwilioAccountBalance');
  
    return this.http.get(AUTH_API + 'getTwilioAccountBalance', { 
      responseType: 'json' 
    });
  }
}