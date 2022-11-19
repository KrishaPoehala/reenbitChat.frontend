import { Injectable } from "@angular/core";
import { Routes } from "@angular/router";
import { LoginGuard } from "src/app/login.guard";
import { ChatDto } from "src/Dtos/ChatDto";
import { UserDto } from 'src/Dtos/UserDto';



@Injectable()
export class UserService{
   

    getCurrentUser(){

    }

    public selectedChat! : ChatDto;
    public currentUser! : UserDto;
    public chats!: ChatDto[];
    setSelectedChat(chat : ChatDto){
        for (let i = 0; i < this.chats.length; i++) {
            const element = this.chats[i];
            if(element.id === chat.id){
                this.selectedChat = this.chats[i];
            }
            
        }
    }

    
}