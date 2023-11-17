import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {RegisterService} from "../Services/register.service";
import {LoaderService} from "../Services/loader.service";
import {PopupComponent} from "../popup/popup.component";
import {finalize} from "rxjs";
import {PopupService} from "../popup/popup.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  public RecivedResults: any;


  constructor(private registerService:RegisterService,private loader: LoaderService,private popupService: PopupService) {
  }

  status: boolean | undefined;
  VerifyPasswords() {
    // @ts-ignore
    if (document.getElementById('Password').value == document.getElementById('RepeatPw').value) {
      // @ts-ignore
      document.getElementById('message').style.color = 'green';
      // @ts-ignore
      document.getElementById('message').innerHTML = '  Matching';
      this.status = false
    } else {
      // @ts-ignore
      document.getElementById('message').style.color = 'red';
      // @ts-ignore
      document.getElementById('message').innerHTML = '  Not matching';
      this.status = true
    }
  }
  content:String="";

  showLoadingSpinner() {
    this.loader.showLoader();
    // You can also perform other tasks here if needed.
  }

  showPopup(message: string) {
    this.popupService.showPopup(message);

    // You can set the message or content in the popup service if needed.
  }

  Submit(RegData: NgForm) {
    this.showLoadingSpinner();
    this.registerService.register(RegData).pipe(
      finalize(() => {
        this.showPopup(this.RecivedResults?.body?.message)


      })
    ).subscribe(
      (response: any) => {
        this.RecivedResults = JSON.parse(JSON.stringify(response)); // Store the response data in a component property
      }
    );
  }

}
