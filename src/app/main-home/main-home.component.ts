import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild
} from '@angular/core';
import {ChatService} from "../Services/chat.service";
import {AuthService} from "../JwtTokenSetup/_services/auth.service";
import {NgForm} from "@angular/forms";
import {finalize, Observable} from "rxjs";
import {User} from "../Models/user";
import {ChatMsg} from "../Models/chat-msg";

@Component({
  selector: 'app-main-home',
  templateUrl: './main-home.component.html',
  styleUrls: ['./main-home.component.css']
})
export class MainHomeComponent {
  rightPanelWidth = 'calc(100vw - 25vw)';
  showLeftPanel = true;
  chatBoxWidth: string = '75%'
  @ViewChild('chatHistory', { static: true }) private chatHistory!: ElementRef;

  constructor(private cdr: ChangeDetectorRef, private chatService:ChatService, ) {
    this.profile()
  }



  scrollToBottom(): void {
    try {
      if (this.chatHistory) {
        setTimeout(() => {
          this.chatHistory.nativeElement.scrollTop = this.chatHistory.nativeElement.scrollHeight;
        }, 0);
      }
    } catch (err) {
      console.error(err);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.showLeftPanel = window.innerWidth > 0.7 * window.screen.width;
    if (!this.showLeftPanel){
      this.chatBoxWidth ='100%'
    }
    else {
      this.chatBoxWidth ='75%'
    }
  }

  @ViewChild('messageInput') messageInput: ElementRef<HTMLInputElement> | undefined;

  messages: string[] = [];
  currentMessage: string = '';


  sendMessage(): void {
    if (this.currentMessage.trim() !== '') {
      // Save the current message before clearing it
      const userMessage = this.currentMessage;

      this.currentMessage = ''; // Clear the current message

      // Add the user message to the messages array
      this.messages.push("User : "+userMessage);

      this.textChat(userMessage).subscribe(
        (response: any) => {
          // Handle successful response
          const assistantMessage = "Assistant : " + JSON.parse(JSON.stringify(response))?.content;
          this.messages.push(assistantMessage);
          this.scrollToBottom();
        },
        (error: any) => {
          // Handle error
          const errorMessage = "Error : " + (error.name || 'Unknown Error');
          this.messages.push(errorMessage);
        }
      );
    }
  }


  onKeyPress(event: Event): void {
    if ((event as KeyboardEvent).key === 'Enter') {
      this.sendMessage();
    }
  }


  onArrowClick(): void {
    this.sendMessage();
  }

  profileData:any
  newUser: User = new User('', '', '','');

  profile() {
    this.chatService.getProfile().pipe(
      finalize(() => {
      })
    ).subscribe(
      (response: any) => {

        this.newUser = JSON.parse(JSON.stringify(response.body));
        //this.messages.push(JSON.stringify(response.body));

      });}

  apiKey: string = '';

  saveApiKey() {
    this.chatService.saveApiKey(this.apiKey).subscribe(
        (response: any) => {
        console.log('API key saved successfully:', response);
      },
        (error: any) => {
        console.error('Error saving API key:', error);
      }
    );
    location.reload()
  }
  chatMsg:ChatMsg = new ChatMsg("","user");

  textChat(userMessage: string): Observable<any> {
    this.chatMsg.content = userMessage;
    return this.chatService.textChat(this.chatMsg);
  }
}
