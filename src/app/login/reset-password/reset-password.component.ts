import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../JwtTokenSetup/_services/auth.service";
import {TokenStorageService} from "../../JwtTokenSetup/_services/token-storage.service";
import {Router} from "@angular/router";
import {LoaderService} from "../../Services/loader.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  constructor(private authService:AuthService, private  router:Router,private loader: LoaderService) {
  }
  errorMessage: string | undefined;
  isThereError:boolean=false;
  isSubmitted:boolean = false;
  showLoadingSpinner() {
    this.loader.showLoader();
  }
  hideLoadingSpinner(){
    this.loader.hideLoader();
    this.isSubmitted=true
  }
  SubmitEmail(ResetData:NgForm){
    this.showLoadingSpinner()
    this.authService.resetPassword(ResetData)
      .subscribe(
        response => {
          console.log("response = "+response)
this.hideLoadingSpinner()
        //  this.router.navigate(['/profile']);

        },
        (error) => {
          this.isThereError =true
       if (error.status === 399) {
            this.errorMessage = 'This email is not registered with us. Please Register.';
          } else {
            this.errorMessage = 'An unexpected error occurred';
          }
          console.error(error);
        }

      );

  }
}
