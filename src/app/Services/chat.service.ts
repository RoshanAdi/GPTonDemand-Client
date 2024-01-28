import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {NgForm} from "@angular/forms";
import {User} from "../Models/user";
import {ChatMsg} from "../Models/chat-msg";
const AUTH_API = 'http://localhost:8080/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient ) { }


  getProfile(): Observable<any> {
    console.warn("calling for profile in service")
    return this.http.request(new HttpRequest('GET',AUTH_API + 'api2/profile',  {}));

  }
  saveApiKey(apiKey: string): Observable<any> {
    return this.http.post(AUTH_API + 'api2/saveApi', { apiKey });
  }
  textChat(msg: any): Observable<any> {
    console.warn("data = "+JSON.stringify(msg))
    return this.http.post(AUTH_API + 'api2/textChat', msg);
  }

}
