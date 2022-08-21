import { ChatDto } from './../../Dtos/ChatDto';
import { Injectable } from "@angular/core";
import { UserDto } from 'src/Dtos/UserDto';



@Injectable()
export class UserService{


    getCurrentUser(){

    }

    public selectedChat : ChatDto | null = null;
    public currentUser! : UserDto;
    setSelectedChat(dto : ChatDto){
        this.selectedChat = dto;
    }
}