import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {NgForm} from "@angular/forms";
import {TokenStorageService} from "./token-storage.service";
import jwt_decode from "jwt-decode";


const AUTH_API = 'http://localhost:8080/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: any;
  public Role:any;
  constructor(private http: HttpClient, private  tokenStorageService: TokenStorageService) { }

  login(LoginData: string | NgForm): Observable<any> {
    return this.http.post(AUTH_API + 'api1/login', LoginData, httpOptions);
  }

  resetPassword(ResetData: string | NgForm): Observable<any> {
    return this.http.post(AUTH_API + 'api1/reset-password', ResetData, httpOptions);
  }
  submitNewPW(ResetData: string | NgForm): Observable<any> {
    return this.http.post(AUTH_API + 'api1/submit=password', ResetData, httpOptions);
  }
  verifyEmail(ResetData: string | NgForm): Observable<any> {
    return this.http.post(AUTH_API + 'api1/verify-email', ResetData, httpOptions);
  }

  refreshToken(token: string) {
    return this.http.post(AUTH_API + 'refreshtoken', {
      refreshToken: token
    }, httpOptions);
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', { }, httpOptions);
  }

  isLoggedIn() {

    return this.tokenStorageService.getToken() == null;
  }
  isNotLoggedIn(){
    return this.tokenStorageService.getToken() != null;
  }
  getRole(){
    const user = window.sessionStorage.getItem('auth-user');
    this.currentUser = jwt_decode(String(user));
    this.Role = String(this.currentUser.roles)
      return this.Role.slice(5, )==="Student"
  }

}
