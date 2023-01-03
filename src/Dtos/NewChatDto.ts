import { UserDto } from 'src/Dtos/UserDto';
export class NewChatDto{
    public name:string;
    public members:UserDto[];
    public isGroup:boolean | null;
    constructor(
        leftUser: UserDto,
        rightUser: UserDto,
    )
    {
        this.name = getGroupName(leftUser.id, rightUser.id);
        this.members = [];
        this.members.push(leftUser,rightUser);
        this.isGroup = false;
    }
}

function getGroupName(left: number, rigth: number): string {
    if(left < rigth){
        return 'group/' + left.toString() + '---' + rigth.toString();
    }

    return 'group/' + rigth.toString() + '---' + left.toString();
}
