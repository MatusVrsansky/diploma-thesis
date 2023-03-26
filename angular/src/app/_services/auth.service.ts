import { Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
  
  login(form: Array<any>): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username: [...form].shift().name,
      password: [...form].shift().password
    }, httpOptions);
  }
  register(form: Array<any>): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username: [...form].shift().name,
      email: [...form].shift().email,
      password: [...form].shift().password,
      phone_number: [...form].shift().phone_number
    }, httpOptions);
  }
  update(id: number, username: string, email: string, phone_number: string): Observable<any> {   
    return this.http.post(AUTH_API + 'update', {
      id,
      username,
      email,
      phone_number
    }, httpOptions);
  }
}