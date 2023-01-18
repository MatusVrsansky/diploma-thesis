import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
const AUTH_API = 'http://localhost:8080/api/history/';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  @Injectable({
    providedIn: 'root'
  })
  
export class HistoryService {
  constructor(private http: HttpClient) { }
 
  getThingSpeakHistory(): Observable<any> {
    
    return this.http.get(AUTH_API + 'getThingSpeakHistory', { 
      responseType: 'json' 
    });
  }

  getWeatherApiHistory(): Observable<any> {
    
    return this.http.get(AUTH_API + 'getWeatherApiHistory', { 
      responseType: 'json' 
    });
  }
}