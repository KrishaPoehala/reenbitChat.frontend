import { UserService } from 'src/Services/UserService';
import { NewMessageDto } from './../../../Dtos/NewMessageDto';
import { HttpService } from 'src/Services/HttpService';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageDto } from 'src/Dtos/MessageDto';

@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.css'], 
  changeDetection: ChangeDetectionStrategy.Default
})
export class MessagesListComponent implements OnInit, AfterViewInit {

  constructor(private fb:FormBuilder, private chatService: HttpService,
    public readonly userService: UserService) { }
  
  ngOnInit(): void {
  }
   
  messageForm = this.fb.group({
    message: ['',Validators.required],
});

  forwardedMessage:MessageDto | null = null;
  forwardMessageHandler(eventData: MessageDto){
    this.forwardedMessage = eventData;
  }

  deleteForSenderHandler(event : number){
    const length = this.userService.selectedChat?.messages?.length || 0;
    for(let i =0; i< length; ++i){
      if(this.userService.selectedChat?.messages[i].id === event){
        this.userService.selectedChat.messages.splice(i , 1);
        return;
      }
    }
  }

  send(){
    if(!this.userService.selectedChat){
      return;
    }
    if(this.messageForm.invalid){
      return;
    }

    const text = this.messageForm.controls.message.value?.trim() || "";
    if(text){
      if(this.forwardedMessage){
        const newForwardedMessage = this.toNewMessage(this.forwardedMessage);
        this.chatService.sendMessage(newForwardedMessage).subscribe();
        this.forwardedMessage = null;
      }

      let newMessage = new NewMessageDto(text,this.userService.currentUser,
        this.userService.selectedChat?.id, new Date());
      this.chatService.sendMessage(newMessage).subscribe();
      this.messageForm.controls.message.setValue('');
      this.scrollToBottom();
    }
  }

  toNewMessage(message: MessageDto){
    return new NewMessageDto(message.text, message.sender,
       this.userService.selectedChat?.id || 0, new Date());
  }

  messagesToLoad=20;
  private callsCount = 0;
  isWorking = false;
  onScroll(event :any){
    ++this.callsCount;
    if(!this.userService.selectedChat || this.callsCount === 1){
      return;
    }

    const top = this.scrollFrame.nativeElement.scrollTop;
    if(top === 0 && this.isWorking === false){
      this.isWorking = true;
      this.scrollFrame.nativeElement.scrollTop = 100;
      const page = Math.floor(this.userService.selectedChat.messages.length / this.messagesToLoad) + 1;
      this.chatService.getChatMessages(this.userService.selectedChat.id, this.userService.currentUser.id, page, this.messagesToLoad)
      .subscribe(r =>{
        if(r.length === 0){
          return;
        }
          r.forEach(element => {
          this.userService.selectedChat?.messages.unshift(element);
          })});

      setTimeout(() => this.isWorking = false, 600);//forbid to call this method too many times
    }
  }

  private scrollContainer: any;
  ngAfterViewInit(): void {
    this.scrollContainer = this.scrollFrame.nativeElement;  
    this.itemElements.changes.subscribe(_ => this.onItemElementsChanged()); 
  }

  private onItemElementsChanged(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    this.scrollContainer.scroll({
      top: this.scrollContainer.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
  }

  @ViewChild('scrollframe', {static: false}) scrollFrame!: ElementRef;
  @ViewChildren('item') itemElements!: QueryList<any>;
}
