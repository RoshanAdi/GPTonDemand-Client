import {Component, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../JwtTokenSetup/_services/auth.service";
import {Router} from "@angular/router";
import {LoaderService} from "../../Services/loader.service";
import {TokenStorageService} from "../../JwtTokenSetup/_services/token-storage.service";

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent {
  @ViewChild('ResetData') resetForm!: NgForm;
  constructor(private authService:AuthService, private  router:Router,private loader: LoaderService,private tokenStorage: TokenStorageService) {
  }
  errorMessage: string | undefined;
  isThereError:boolean=false;
  isVerificationSent: boolean = false;
  userEmail:String=""
  emailNgForm:any
  isLoggedIn = false;
  isLoginFailed = false;
  verificationCode:any
  showLoadingSpinner() {
    this.loader.showLoader();
  }
  SubmitEmail(ResetData: NgForm) {
    this.emailNgForm=ResetData
    this.showLoadingSpinner();
    this.stopCountdown()
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
    this.showLoadingSpinner();
    this.stopCountdown()
    this.authService.verifyEmail(ResetData).subscribe(
      token => {
        console.log("token received from login = "+token.token)
        this.tokenStorage.saveToken(token.token);
        this.tokenStorage.saveRefreshToken(token.token);
        this.tokenStorage.saveUser(token);
        console.log("token received from login = "+token.token)
        this.isLoginFailed = false;
        this.isLoggedIn = true;

        this.router.navigate(['/home']);

      },
      (error) => {
        if (error.status === 401) {
          this.errorMessage = 'Invalid verification code';
        } else if (error.status === 399) {
          this.errorMessage = 'unknown error.';
        } else {
          this.errorMessage = 'An unexpected error occurred';
        }
        console.error(error);
      }

    );

  }
  timeLeft: number = 60;
  interval: any;
  startCountdown() {
this.isCountDownFinish=false
    this.timeLeft = 60;
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.stopCountdown();
      }
    }, 1000);
  }
  isCountDownFinish:boolean=true
  stopCountdown() {
    clearInterval(this.interval);
    this.isCountDownFinish=true
  }
  reloadComponent() {
    this.router.navigate(['/reset-password']).then(() => {
      window.location.reload();
    });
  }
  sendAgain(){
    this.SubmitEmail(this.emailNgForm)
  }
  showNewFields:boolean=false
  showNewPWFields(){
    this.showNewFields=true
  }
}
