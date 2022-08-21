import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from './../../Services/UserService';
import { UserDto } from './../../../Dtos/UserDto';
import { ChatService } from './../../Services/ChatService';
import { Component, Input, OnInit, HostListener } from '@angular/core';
import { ChatDto } from 'src/Dtos/ChatDto';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {

  constructor(public userService : UserService, private fb:FormBuilder) {
   }

  ngOnInit(): void {
    
  }

  @Input() chats!: ChatDto[];
  filteredChats : ChatDto[] = [];
  chatSelectedHandler(eventData: ChatDto){ 
    this.userService.setSelectedChat(eventData);
       
  }

  searchForm = this.fb.group({
    searchedChat : ["",Validators.required],
  })

  onSearch(){
    const value = this.searchForm.controls.searchedChat.value;
    if(!value){
      this.filteredChats = this.chats;
      console.log(this.filteredChats);
      return;
    }

    this.filteredChats = this.chats.filter(x => x.name.includes(value));
  }
}
