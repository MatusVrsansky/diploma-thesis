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
  //  console.log(temperature_notification);
   // console.log(text_notification);
  //  console.log(temperature_operator);
    console.log(phone_number);
  //  console.log(active_notification);
   
    return this.http.post(AUTH_API + 'update', {
      id,
      username,
      email,
     // temperature_notification,
     // text_notification,
     // temperature_operator,
      phone_number
    //  active_notification
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
  
}