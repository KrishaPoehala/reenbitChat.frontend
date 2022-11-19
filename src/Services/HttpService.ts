import { AuthRepsonseDto } from './../Dtos/AuthResponseDto';

import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserDto } from 'src/Dtos/UserDto';
import { ChatDto } from "src/Dtos/ChatDto";
import { environment } from "src/environments/environment";
import { MessageDto } from "src/Dtos/MessageDto";
import { NewMessageDto } from "src/Dtos/NewMessageDto";
import { first } from "rxjs";

@Injectable()
export class HttpService{

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

    public getPrivateChat(firstUserId: number, secondUserId: number){
        return this.http.get<ChatDto>(environment.privateChat + `${firstUserId}/${secondUserId}`)
    }

    public createPrivateChat(firstId: number, secondId: number){
        const dto = {
            firstUserId : firstId,
            secondUserId : secondId,
        }
        return this.http.post<ChatDto>(environment.createPrivateChat, dto);
    }

    public login(email:string, password: string){
        return this.http.post<AuthRepsonseDto>(environment.login, {email, password});
    }
}