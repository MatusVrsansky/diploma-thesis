import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
const AUTH_API = 'http://localhost:8080/api/contact/';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  @Injectable({
    providedIn: 'root'
  })
  
export class ContactService {
  constructor(private http: HttpClient) { }
 
  sendContactEmail(form: Array<any>):  Observable<any> {
    
    return this.http.post(AUTH_API + 'sendContactEmail', {
      name: [...form].shift().name,
      email: [...form].shift().email,
      message: [...form].shift().message,
    }, httpOptions);
  }
}