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
Recivedresults:any
  Recivedresults2:any
  constructor(private http: HttpClient) { }

  //register(RegisterData: any){
   // console.log("username and pass = "+RegisterData)
   // this.http.post<any>(AUTH_API + 'api1/register', RegisterData, httpOptions).subscribe(
    //  response =>
   // this.Recivedresults = JSON.stringify(response));
//return this.Recivedresults2= JSON.parse(this.Recivedresults)
// }
  register(RegisterData: any): Observable<any> {
  return this.http.request(new HttpRequest('POST',AUTH_API + 'api1/register', RegisterData, {}));
  }
}
