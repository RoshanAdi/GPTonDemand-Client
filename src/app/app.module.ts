import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {FormsModule} from "@angular/forms";

import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import { AppRoutingModule } from './app-routing.module';
import {AuthInterceptor} from "./JwtTokenSetup/_helpers/auth.interceptor";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SpinnerComponent } from './spinner/spinner.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {LoaderInterceptor} from "./spinner/interceptors/loader.interceptor";
import { PopupComponent } from './popup/popup.component';

const routes: Routes=[
  {path:'login',component:LoginComponent},
  {path:'register',component:SignUpComponent},
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    SpinnerComponent,
    PopupComponent
  ],
  imports: [RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,HttpClientModule, AppRoutingModule, BrowserAnimationsModule,MatProgressSpinnerModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: LoaderInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
