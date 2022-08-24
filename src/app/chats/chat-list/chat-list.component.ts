import { FormBuilder, Validators } from '@angular/forms';
import { UserDto } from './../../../Dtos/UserDto';
import { Component, Input, OnInit, HostListener } from '@angular/core';
import { ChatDto } from 'src/Dtos/ChatDto';
import { UserService } from 'src/Services/UserService';

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
  searchForm = this.fb.group({
    searchedChat : ["",Validators.required],
  })

  onSearch(){
    const value = this.searchForm.controls.searchedChat.value;
    if(!value){
      this.filteredChats = this.chats;
      return;
    }

    this.filteredChats = this.chats.filter(x => this.selectSearchesValue(x).includes(value ));
  }

  selectSearchesValue(x : ChatDto) : string{
    if(x.name){
      return x.name;
    }

    var otherMemberName = x.members.filter(x => x.id !== this.userService.currentUser.id)[0];
    return otherMemberName.name;
  }
}
