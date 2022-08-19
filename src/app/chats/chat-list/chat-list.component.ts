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

  constructor(private chatService: ChatService) {
   }

  ngOnInit(): void {
    
  }

  @Input() chats!: ChatDto[]
  @Input() currentUser!:UserDto;
  selectedChat: ChatDto | null = null;
  chatSelectedHandler(eventData: ChatDto){    
    this.selectedChat = eventData;
  }
}
