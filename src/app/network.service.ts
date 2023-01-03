import { Observable } from 'rxjs';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { UserService } from './../Services/UserService';
import { Inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ChatDto } from 'src/Dtos/ChatDto';
import { MessageDto } from 'src/Dtos/MessageDto';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  private readonly connection: HubConnection;
  constructor(public userService:UserService) {
     this.connection = new HubConnectionBuilder().withUrl(environment.signalR).build();
  }

  configureHub(){
    this.connection.start().then(() =>{
      this.userService.chats.forEach(element => {
        this.connection.invoke("JoinGroup", element.id.toString());
      });
    });

    this.messageSentSetUp();

    this.messageEditedSetUp();

    this.messageDeleted();
    this.chatCreatedSetUp();
  }

  private chatCreatedSetUp() {
    this.connection.on("ChatCreated", (createdChat: ChatDto) => {
      if(createdChat.members.find(x => x.id === this.userService.currentUser.id) === undefined){
        return;
      }

      this.userService.chats.unshift(createdChat);
      this.connection.invoke("JoinGroup", createdChat.id.toString());
    });
  }

  private messageDeleted() {
    this.connection.on("MessageDeleted", (deletedMessage: MessageDto) => {
      for (let i = 0; i < this.userService.chats.length; i++) {
        let index = 0;
        if (this.userService.chats[i].id === deletedMessage.chatId) {
          this.userService.chats[i].messages.forEach(element => {
            if (element.id === deletedMessage.id) {
              this.userService.chats[i].messages.splice(index, 1);
            }

            ++index;
          });
        }
      }
    });
  }

  private messageEditedSetUp() {
    this.connection.on("MessageEdited", (message: MessageDto) => {
      for (let i = 0; i < this.userService.chats.length; ++i) {
        if (this.userService.chats[i].id === message.chatId) {
          this.userService.chats[i].messages.forEach(element => {
            if (element.id === message.id) {
              element.text = message.text;
            }
          });
        }
      }
    });
  }

  private messageSentSetUp() {
    this.connection.on("MessageSent", (message: MessageDto) => {
      for (let i = 0; i < this.userService.chats.length; ++i) {
        if (this.userService.chats[i].id === message.chatId) {
          this.userService.chats[i].messages.push(message);
        }
      }
    });
  }
}
