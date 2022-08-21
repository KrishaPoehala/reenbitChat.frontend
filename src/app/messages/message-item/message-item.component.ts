import { UserService } from './../../Services/UserService';
import { ChatService } from './../../Services/ChatService';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageDto } from './../../../Dtos/MessageDto';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
      this.chatService.editMessage(this.message.id, editedText ).subscribe();
      this.isEditingMode = !this.isEditingMode;
    }
  }

  editeForm :any;
  ngOnInit(): void {
    this.editeForm = this.fb.group({
      editedMessage : [this.message.text || '', Validators.required]
     })
  }

  openModal(content : any){
    this.modal.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  @Input() message!: MessageDto;

  editSelectedMessage(){
    const newText = this.editeForm.controls.editedMessage.value || "";
    this.chatService.editMessage(this.message.id, newText)
    .subscribe();
  }

  @Output() deleteForSenderEmmiter : EventEmitter<number> = new EventEmitter();
  onDelete(){
    
    this.modal.dismissAll();
    this.chatService.deleteMessage(this.message?.id || 0, this.deleteOnlyForCurrentUser)
    .subscribe();
    if(this.deleteOnlyForCurrentUser){
      this.deleteForSenderEmmiter.emit(this.message.id);
    }
  }

  deleteOnlyForCurrentUser = false;
  onChange(){
    this.deleteOnlyForCurrentUser = !this.deleteOnlyForCurrentUser;
  }

  redirectToSender = true;
  onRedirectionChange(){
    this.redirectToSender = !this.redirectToSender;
  }

  onRedirect(){
    if(this.redirectToSender){
     this.chatService.getPrivateChat(this.message.sender.id, this.userService.currentUser.id)
     .subscribe(r => {
      console.log(r)
      this.userService.setSelectedChat(r);
      this.forwardMessageEmmiter.emit(this.message);
      this.modal.dismissAll();
      return;
    });
    }

    this.forwardMessageEmmiter.emit(this.message);
    this.modal.dismissAll();
    
  }

  @Output() forwardMessageEmmiter : EventEmitter<MessageDto> = new EventEmitter();
  
}
