import { NewMessageDto } from './../../Dtos/NewMessageDto';
import { MessageDto } from './../../Dtos/MessageDto';
import { environment } from './../../environments/environment';
import { ChatDto } from './../../Dtos/ChatDto';
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserDto } from 'src/Dtos/UserDto';

@Injectable()
export class ChatService{

    constructor(private http: HttpClient){}
    public getUserChats(id:number){
        return this.http.get<ChatDto[]>(environment.userChats + id);
    }

    public getRandomUser(){
        return this.http.get<UserDto>(environment.randomUser);
    }

    public getFirstMessages(chatId: number, userId:number){
        return this.http.get<MessageDto[]>(environment.firstMessages + `${chatId}/${userId}`);
    }

    public getChatMessages(chatId : number, userId : number,
         pageNumber: number, messagesToLoad: number){
        return this.http.get<MessageDto[]>(environment.firstMessages + `${chatId}/${userId}
        /${pageNumber}/${messagesToLoad}`);
    }

    public sendMessage(dto : NewMessageDto){
        return this.http.post(environment.sendMessage,dto);
    }

    public editMessage(messageId: number, newText: string){
        const param = {
            messageId : messageId,
            editedText: newText,
        }

        return this.http.put(environment.editMessage, param);
    }


    public deleteMessage(id : number, isDeleteOnlyForSender = false){
        return this.http.delete(environment.delete + id +'/'+ isDeleteOnlyForSender);
    }
}