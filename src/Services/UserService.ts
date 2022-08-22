import { Injectable } from "@angular/core";
import { ChatDto } from "src/Dtos/ChatDto";
import { UserDto } from 'src/Dtos/UserDto';



@Injectable()
export class UserService{


    getCurrentUser(){

    }

    public selectedChat! : ChatDto;
    public currentUser! : UserDto;
    public chats!: ChatDto[];
    setSelectedChat(dto : ChatDto){
        this.selectedChat = dto;
    }
}