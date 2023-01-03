import { UserDto } from './../../../Dtos/UserDto';
import { ChatDto } from './../../../Dtos/ChatDto';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpService } from 'src/Services/HttpService';
import { UserService } from 'src/Services/UserService';

@Component({
  selector: 'app-chat-item',
  templateUrl: './chat-item.component.html',
  styleUrls: ['./chat-item.component.css']
})
export class ChatItemComponent implements OnInit {

  constructor(private chatService: HttpService,
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
  onClick(){
    this.userService.setSelectedChat(this.chat);
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
    if(this.chat?.isGroup === false){
      const userOnTheOtherSide = this.getUserOnTheOtherSide();
      this.displayedGroupName = userOnTheOtherSide?.name || "";
      this.displayedImageUrl = userOnTheOtherSide?.profilePhotoUrl || "";
      return;
    }

    this.displayedGroupName = this.chat?.name || "";
    this.displayedImageUrl = this.chat?.imageUrl || "";
  }

}
