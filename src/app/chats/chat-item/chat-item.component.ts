import { UserService } from './../../Services/UserService';
import { UserDto } from './../../../Dtos/UserDto';
import { ChatService } from './../../Services/ChatService';
import { ChatDto } from './../../../Dtos/ChatDto';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-chat-item',
  templateUrl: './chat-item.component.html',
  styleUrls: ['./chat-item.component.css']
})
export class ChatItemComponent implements OnInit {

  constructor(private chatService: ChatService,
    public readonly userService : UserService) { }

  ngOnInit(): void {
    this.chatService.getChatMessages(this.chat.id,this.userService.currentUser.id,0,20).subscribe(r => {
      r.forEach(element => {
        this.chat.messages.push(element);
        
      });
    });

    this.setDisplayedValues();
  }
 

  messagesToLoad = 20;
  @Input() chat!: ChatDto;
  @Output() chatSelectedEmitter: EventEmitter<ChatDto> = new EventEmitter();

  onClick(){
    this.chatSelectedEmitter.emit(this.chat);
  }

  displayedImageUrl!:string;
  displayedGroupName!:string;
  getUserOnTheOtherSide(){
    let userOnTheOtherSide :UserDto | null = null;
      for(let i = 0; i< this.chat.members.length;++i){
        if(this.chat.members[i].id !== this.userService.currentUser.id){
          userOnTheOtherSide = this.chat.members[i];
        }
      }

      return userOnTheOtherSide;
  }
  setDisplayedValues(){
    if(this.chat?.members.length === 2){
      const userOnTheOtherSide = this.getUserOnTheOtherSide();
      this.displayedGroupName = userOnTheOtherSide?.name || "";
      this.displayedImageUrl = userOnTheOtherSide?.profilePhotoUrl || "";
      return;
    }

    this.displayedGroupName = this.chat?.name || "";
    this.displayedImageUrl = this.chat?.imageUrl || "";
  }

}
