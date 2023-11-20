import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {RegistrationSuccessComponent} from "./sign-up/registration-success/registration-success.component";
import {RegistrationFailComponent} from "./sign-up/registration-fail/registration-fail.component";
import {MainHomeComponent} from "./main-home/main-home.component";
import {PasswordResetComponent} from "./login/password-reset/password-reset.component";




const routes: Routes=[{path:'login',component:LoginComponent},
  {path:'register',component:SignUpComponent},
  {path:'reg-success',component:RegistrationSuccessComponent},
  {path:'reg-fail',component:RegistrationFailComponent},
  {path:'reset-password',component:PasswordResetComponent},
  {path:'home',component:MainHomeComponent},



];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
