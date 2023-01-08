import { Injectable } from "@angular/core";
import { ChatDto } from "src/Dtos/ChatDto";
import { UserDto } from 'src/Dtos/UserDto';

@Injectable()
export class UserService{
    public selectedChat! : ChatDto;
    public currentUser! : UserDto;
    public chats!: ChatDto[];
    setSelectedPrivateChat(sender: UserDto) {
        for(let i = 0; i < this.chats.length; ++i){
            if(this.isPrivateChat(this.chats[i], sender)){
                this.selectedChat = this.chats[i];
                return true;
            }
        }

        return false;
    }

    private isPrivateChat(chat: ChatDto, sender: UserDto):boolean {
        if(chat.isGroup !== false){
            return false;
        }

        if(chat.members.find(x => x.id == sender.id)){
            return true;
        }

        return false;
    }
   
    setSelectedChat(chat : ChatDto){
        for (let i = 0; i < this.chats.length; i++) {
            const element = this.chats[i];
            if(element.id === chat.id){
                this.selectedChat = this.chats[i];
            }
        }
    }
}


