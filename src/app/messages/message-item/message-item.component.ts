import { ChatDto } from './../../../Dtos/ChatDto';
import { UserService } from 'src/Services/UserService';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageDto } from './../../../Dtos/MessageDto';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChatService } from 'src/Services/ChatService';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {

  constructor(private fb : FormBuilder,
     private chatService: ChatService, public modal: NgbModal,
     public readonly userService: UserService)
   { }


   isEditingMode = false;
   onEdit(){
    const editedText = this.editeForm.controls.editedMessage.value?.trim();
    if(editedText){
      this.chatService.editMessage(this.message?.id || 0, editedText ).subscribe();
      this.isEditingMode = !this.isEditingMode;
    }
  }

  editeForm :any;
  ngOnInit(): void {
    this.editeForm = this.fb.group({
      editedMessage : [this.message?.text || '', Validators.required]
     })

     this.chatService.getPrivateChat(this.message.sender.id, this.userService.currentUser.id)
     .subscribe(r => this.privateChat = r, error => this.privateChat = null);
  }

  openModal(content : any){
    this.modal.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  @Input() message!: MessageDto;

  editSelectedMessage(){
    const newText = this.editeForm.controls.editedMessage.value || "";
    this.chatService.editMessage(this.message?.id || 0, newText)
    .subscribe();
  }

  @Output() deleteForSenderEmmiter : EventEmitter<number> = new EventEmitter();
  onDelete(){
    
    this.modal.dismissAll();
    this.chatService.deleteMessage(this.message.id || 0, this.deleteOnlyForCurrentUser)
    .subscribe();
    if(this.deleteOnlyForCurrentUser){
      this.deleteForSenderEmmiter.emit(this.message.id);
    }
  }

  deleteOnlyForCurrentUser = false;
  onChange(){
    this.deleteOnlyForCurrentUser = !this.deleteOnlyForCurrentUser;
  }

  isCurrentUsersMessage(){
    return this.message.sender.id === this.userService.currentUser.id
  }

  redirectToSender = true;
  onRedirectionChange(){
    this.redirectToSender = !this.redirectToSender;
  }

  privateChat: ChatDto | null = null;
  redirectToPrivateChat(privateChatId: number){
      for(let i = 0; i < this.userService.chats.length; ++i){
         if(this.userService.chats[i].id == privateChatId){
           this.userService.setSelectedChat(this.userService.chats[i]);
          
           return;
         }
      }

      this.chatService.createPrivateChat(this.userService.currentUser.id, this.message.sender.id)
      .subscribe(r => this.userService.setSelectedChat(r));
  }

  onMessageTextClicked(){
    if(this.userService.currentUser.id !== this.message.sender.id){
      this.redirectToPrivateChat(this.privateChat?.id || -1);
    }
  }

  onRedirect(){
    if(this.redirectToSender){
      this.redirectToPrivateChat(this.privateChat?.id || -1);

    }
    this.forwardMessageEmmiter.emit(this.message);
    this.modal.dismissAll(); 
  }

  @Output() forwardMessageEmmiter : EventEmitter<MessageDto> = new EventEmitter();
  
}
