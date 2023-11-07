import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  private popupVisibility = new Subject<boolean>();
  popupVisibility$ = this.popupVisibility.asObservable();
  private messageContent = new Subject<string>();
  messageContent$ = this.messageContent.asObservable();

  showPopup(message: string) {
    this.popupVisibility.next(true);
    this.messageContent.next(message);
  }

  hidePopup() {
    this.popupVisibility.next(false);
  }
}
