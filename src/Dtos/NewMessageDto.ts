import { UserDto } from "./UserDto"



export class NewMessageDto{
    constructor(
        public text:string,
        public sender: UserDto,
        public chatId: number,
        public sentAt: Date,
    ){}
}