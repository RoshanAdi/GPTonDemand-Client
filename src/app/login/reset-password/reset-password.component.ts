import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../JwtTokenSetup/_services/auth.service";
import {Router} from "@angular/router";
import {LoaderService} from "../../Services/loader.service";
import {TokenStorageService} from "../../JwtTokenSetup/_services/token-storage.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  isVerificationSent: boolean = false;
  isLoggedIn = false;
  isLoginFailed = false;
  constructor(private authService:AuthService, private  router:Router,private loader: LoaderService,private tokenStorage: TokenStorageService) {
  }

  reloadComponent() {
    this.router.navigate(['/reset-password']).then(() => {
      window.location.reload();
    });
  }

  errorMessage: string | undefined;
  isThereError:boolean=false;

  showLoadingSpinner() {
    this.loader.showLoader();
  }
  SubmitEmail(ResetData: NgForm) {
    this.showLoadingSpinner();
    this.startCountdown();
    this.authService.resetPassword(ResetData).subscribe(
      response => {
        console.log("response = " + response);
        this.isVerificationSent = true;
      },
      (error) => {
        this.isThereError = true;
        if (error.status === 399) {
          this.errorMessage = 'This email is not registered with us. Please Register.';
        } else {
          this.errorMessage = 'An unexpected error occurred';
        }
        console.error(error);
      }
    );
  }
  verifyEmail(ResetData: NgForm): void {
    this.authService.verifyEmail(ResetData).subscribe(
      (response: any) => {
        console.warn(response);
        const status = response.status;
        if (status === 'success') {
          this.router.navigate(['/new-password']);
        } else {
          this.router.navigate(['/reg-fail']);
        }
      },
      (error) => {
        console.error(error);
        this.router.navigate(['/error']);
      }
    );
  }

  timeLeft: number = 60; // 1 minute in seconds
  interval: any;
  startCountdown() {
    this.timeLeft = 60;
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.stopCountdown();
      }
    }, 1000);
  }
  stopCountdown() {
    clearInterval(this.interval);
    this.isVerificationSent=false
  }
}
