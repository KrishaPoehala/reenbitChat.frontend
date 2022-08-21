import { UserService } from './Services/UserService';
import { MessageDto } from './../Dtos/MessageDto';
import { ChatService } from './Services/ChatService';
import { UserDto } from './../Dtos/UserDto';
import { ChatDto } from './../Dtos/ChatDto';
import { Component, HostListener, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { concat, concatMap, VirtualTimeScheduler, } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private chatService: ChatService, public readonly userService : UserService){}
  ngOnInit(): void {
    this.chatService.getRandomUser().pipe(
      concatMap((result : UserDto) =>{
        this.userService.currentUser = result;
        return this.chatService.getUserChats(result.id);
      }))
      .subscribe(result => {
        this.chats = result;
        this.configureHub();
      });

      
      

  }

  configureHub(){
    const connection = new HubConnectionBuilder().withUrl('https://localhost:7139/chat').build();
    connection.start().then(() =>{
      this.chats.forEach(element => {
        connection.invoke("JoinGroup",element.id.toString());
      });
    });

    connection.on("MessageSent", (message : MessageDto) => {
      for(let i =0;i < this.chats.length;++i){
        if(this.chats[i].id === message.chatId){
          this.chats[i].messages.push(message);
          console.log(this.chats[i].messages.length);
        }
      }
    });

    connection.on("MessageEdited", (message: MessageDto)=>{
      for(let i = 0; i < this.chats.length; ++i){
        if(this.chats[i].id === message.chatId){
          this.chats[i].messages.forEach(element => {
            if(element.id === message.id){
              element.text = message.text;
            }
          });
        }
      }
    });

    connection.on("MessageDeleted", (deletedMessage : MessageDto) => {
      for (let i = 0; i < this.chats.length; i++) {
        let index = 0;
        if(this.chats[i].id === deletedMessage.chatId){
          this.chats[i].messages.forEach(element => {
            if(element.id === deletedMessage.id){
              console.log(index);
              this.chats[i].messages.splice(index, 1);
            }
            ++index;
          });
        }
      }
    })
  }

  title="dfdff"
  public chats: ChatDto[] = [];
}
