import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
const AUTH_API = 'http://localhost:8080/api/climatic-conditions/';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  @Injectable({
    providedIn: 'root'
  })
  
export class ClimaticConditionsService {
  constructor(private http: HttpClient) { }
 
  getClimaticConditions(): Observable<any> {
    
    return this.http.get(AUTH_API + 'getClimaticConditions', { 
      responseType: 'json' 
    });
  }
}