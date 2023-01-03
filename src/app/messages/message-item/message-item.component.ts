import { DeleteMessageModalComponent } from './../../delete-message-modal/delete-message-modal.component';
import { EditMessageModalComponent } from './../../edit-message-modal/edit-message-modal.component';
import { NetworkService } from './../../network.service';
import { NewChatDto } from './../../../Dtos/NewChatDto';
import { ChatDto } from './../../../Dtos/ChatDto';
import { UserService } from 'src/Services/UserService';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageDto } from './../../../Dtos/MessageDto';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from 'src/Services/HttpService';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {

  constructor(private fb : FormBuilder,
     private http: HttpService, 
     public readonly userService: UserService, private modalService: NgbModal)
   { }


   isEditingMode = false;
   onEdit(){
    const editedText = this.editeForm.controls.editedMessage.value?.trim();
    if(editedText){
      this.http.editMessage(this.message?.id || 0, editedText ).subscribe();
      this.isEditingMode = !this.isEditingMode;
    }
  }

  editeForm :any;
  ngOnInit(): void {
    this.editeForm = this.fb.group({
      editedMessage : [this.message?.text || '', Validators.required]
     })
  }

  @Input() message!: MessageDto;

  editSelectedMessage(){
    const newText = this.editeForm.controls.editedMessage.value || "";
    this.http.editMessage(this.message?.id || 0, newText)
    .subscribe();
  }

  deleteOnlyForCurrentUser = false;
  @Output() deleteForSenderEmmiter : EventEmitter<number> = new EventEmitter();
  onDelete(){
    this.http.deleteMessage(this.message.id || 0, this.deleteOnlyForCurrentUser)
    .subscribe();
    if(this.deleteOnlyForCurrentUser){
      this.deleteForSenderEmmiter.emit(this.message.id);
    }
  }

  isCurrentUsersMessage(){
    return this.message.sender.id === this.userService.currentUser.id
  }

  privateChat: ChatDto | null = null;
  redirectToPrivateChat(){
    if(this.userService.setSelectedPrivateChat(this.message.sender) === false){
      const dto = new NewChatDto(this.message.sender, this.userService.currentUser);
      this.http.createPrivateChat(dto).subscribe(result => {
        this.userService.setSelectedChat(result);
      });
  }
  }

  forwardMessageModal(){
    const modalRef = this.modalService.open(EditMessageModalComponent);
    modalRef.result.then(r => {
      this.redirectToSender = r
      this.onRedirect();
    });
  }

  onMessageTextClicked(){
    if(this.userService.currentUser.id === this.message.sender.id){
      return;
    }

    if(this.userService.setSelectedPrivateChat(this.message.sender) === false){
        const dto = new NewChatDto(this.message.sender, this.userService.currentUser);
        this.http.createPrivateChat(dto).subscribe(result => {
          this.userService.setSelectedChat(result);
        });
    }
  }

  deleteMessageModal(){
    const modalRef = this.modalService.open(DeleteMessageModalComponent);
    modalRef.result.then(r => {
      this.deleteOnlyForCurrentUser = r;
      this.onDelete();
    })
  }

  redirectToSender: boolean = false;
  onRedirect(){
    if(this.redirectToSender){
      this.redirectToPrivateChat();
    }

    this.forwardMessageEmmiter.emit(this.message);
  }

  @Output() forwardMessageEmmiter : EventEmitter<MessageDto> = new EventEmitter();
  
}
