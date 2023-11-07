import {Component, Input} from '@angular/core';
import {PopupService} from "./popup.service";

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  isVisible = false;
  message = '';

  constructor(private popupService: PopupService) {}

  ngOnInit() {
    this.popupService.popupVisibility$.subscribe((visible) => {
      this.isVisible = visible;
    });

    this.popupService.messageContent$.subscribe((message) => {
      this.message = message;
    });
  }

  hidePopup() {
    this.popupService.hidePopup();
    location.reload();
  }
}
