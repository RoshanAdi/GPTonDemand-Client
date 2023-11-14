import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {Observable} from "rxjs";
import {LoaderService} from "./loader.service";
const AUTH_API = 'http://localhost:8080/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }


  register(RegisterData: any): Observable<any> {
  return this.http.request(new HttpRequest('POST',AUTH_API + 'api1/register', RegisterData, {}));
  }
}
