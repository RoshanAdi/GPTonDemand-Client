import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../JwtTokenSetup/_services/auth.service";
import {TokenStorageService} from "../JwtTokenSetup/_services/token-storage.service";
import {AppRoutingModule} from "../app-routing.module";
import {Router} from "@angular/router";
import {LoaderService} from "../Services/loader.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService:AuthService,private tokenStorage: TokenStorageService, private  router:Router,private loader: LoaderService ) {
  }
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage: string | undefined;
  showLoadingSpinner() {
    this.loader.showLoader();
  }
  SubmitLogin(LoginData:NgForm){
    this.showLoadingSpinner()
    this.authService.login(LoginData)
      .subscribe(
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
          // Handle error
          if (error.status === 401) {
            this.errorMessage = 'Invalid username or password';
          } else if (error.status === 399) {
            this.errorMessage = 'User is not enabled. Please verify your email.';
          } else {
            this.errorMessage = 'An unexpected error occurred';
          }
          console.error(error);
        }

      );

  }
  onResetClick() {
    this.router.navigate(['/reset-password']);
  }
}
