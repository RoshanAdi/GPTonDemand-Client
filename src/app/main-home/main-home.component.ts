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
import {HighlightAutoResult, HighlightJS, HighlightLoader, HighlightModule} from "ngx-highlightjs";

@Component({

  selector: 'app-main-home',
  templateUrl: './main-home.component.html',
  styleUrls: ['./main-home.component.css']
})
export class MainHomeComponent {

  response!: HighlightAutoResult;

  code = ''




  rightPanelWidth = 'calc(100vw - 25vw)';
  showLeftPanel = true;
  chatBoxWidth: string = '75%'
  @ViewChild('chatHistory', { static: true }) private chatHistory!: ElementRef;

  constructor(private cdr: ChangeDetectorRef, private chatService:ChatService, ) {
    this.profile()
  }


  onHighlight(e: HighlightAutoResult) {
    this.response = {
      language: e.language,
      relevance: e.relevance,
      secondBest: '{...}',
      value: '{...}',
    };

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
  currentMessage: string = '';
  messages: { content: { subContent: string, type: string }, role: string }[] = [];

  sendMessage(): void {

    if (this.currentMessage.trim() !== '') {
      const userMessage = this.currentMessage;
      this.currentMessage = '';
      this.messages.push({ content: {subContent:userMessage,type:'User'}, role: 'User' });
      this.textChat(userMessage).subscribe(

        (response: any) => {
          this.reArrange("Assistant : "+JSON.parse(JSON.stringify(response))?.content)
          for (let i = 0; i < this.responseMessage2.length; i++) {
            this.messages.push({ content: this.responseMessage2[i], role: 'Assistant' });
          }
          this.responseMessage2.splice(0, this.responseMessage2.length);
          this.scrollToBottom();
        },
        (error: any) => {
          const errorMessage = {
            content: {subContent:(error.name || 'Unknown Error'),type: 'Error'},
            role: 'Error'
          };
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

  newUser: User = new User('', '', '','');

  profile() {
    this.chatService.getProfile().pipe(
      finalize(() => {
      })
    ).subscribe(
      (response: any) => {

        this.newUser = JSON.parse(JSON.stringify(response.body));

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

  responseMessage2: { subContent: string, type: string }[] = [];

  private reArrange(text: string) {
    let isSkipping = false;
    let content:string =''

    for (let i = 0; i < text.length; ++i) {
      if (text[i] === '`' && text[i + 1] === '`' && text[i + 2] === '`') {
        if (!isSkipping) {
          this.responseMessage2.push({subContent:content,type:'text'});
          content='';
          i=i+2;
          isSkipping = true;
        } else {
          i=i+2;
          this.responseMessage2.push({subContent:content,type:'code'});
          content='';
          isSkipping = false;
        }
      }
      else {content=content+text[i]}
    }
    if(content!=''){
      this.responseMessage2.push({subContent:content,type:'text'})}
    return this.responseMessage2;
  }



}
