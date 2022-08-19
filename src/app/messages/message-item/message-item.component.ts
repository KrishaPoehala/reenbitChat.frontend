import { ChatService } from './../../Services/ChatService';
import { FormBuilder, Validators } from '@angular/forms';
import { UserDto } from './../../../Dtos/UserDto';
import { MessageDto } from './../../../Dtos/MessageDto';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {

  constructor(private fb : FormBuilder,
     private chatService: ChatService, public modal: NgbModal)
   { }


   editeForm :any;
   isEditingMode = false;
  onEdit(){
    const editedText = this.editeForm.controls.editedMessage.value?.trim() || "";
    this.chatService.editMessage(this.message.id, editedText ).subscribe();
    this.isEditingMode = !this.isEditingMode;
  }

  ngOnInit(): void {
    this.editeForm = this.fb.group({
      editedMessage : [this.message.text || '', Validators.required]
     })
  }

  openModal(content : any){
    console.log(this.message.isDeletedOnlyForSender)
    this.modal.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  @Input() message!: MessageDto;
  @Input() currentUser!:UserDto;



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
  
}
