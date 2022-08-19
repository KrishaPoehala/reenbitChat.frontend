import { UserDto } from "./UserDto";

export interface MessageDto{
    id:number,
    text:string,
    sender: UserDto,
    chatId: number,
    sentAt: Date,
    isDeletedOnlyForSender: boolean;
}