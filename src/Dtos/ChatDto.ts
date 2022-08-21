import { MessageDto } from "./MessageDto";
import { UserDto } from "./UserDto";

export interface ChatDto{
    id:number,
    name:string,
    messages: MessageDto[],
    members: UserDto[],
    imageUrl: string,
    isGroup : boolean | null,
}