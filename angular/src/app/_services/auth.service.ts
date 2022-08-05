import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const AUTH_API = 'http://localhost:8080/api/auth/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username,
      password
    }, httpOptions);
  }
  register(username: string, email: string, password: string, temperature_notification: string, text_notification: string, temperature_operator: string, phone_number: string, active_notification: boolean): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username,
      email,
      password,
      temperature_notification,
      text_notification,
      temperature_operator,
      phone_number,
      active_notification
    }, httpOptions);
  }
  update(id: number, username: string, email: string, temperature_notification: string, text_notification: string, temperature_operator: string, phone_number: string, active_notification: boolean): Observable<any> {
    console.log(id);
    console.log(username);
    console.log(email);
    console.log(temperature_notification);
    console.log(text_notification);
    console.log(temperature_operator);
    console.log(phone_number);
    console.log(active_notification);
   
    return this.http.post(AUTH_API + 'update', {
      id,
      username,
      email,
      temperature_notification,
      text_notification,
      temperature_operator,
      phone_number,
      active_notification
    }, httpOptions);
  }
  
}