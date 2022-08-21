import { ChatsModule } from './../chats/chats.module';
import { ChatItemComponent } from './../chats/chat-item/chat-item.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesListComponent } from './messages-list/messages-list.component';
import { MessageItemComponent } from './message-item/message-item.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MessagesListComponent,
    MessageItemComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports:[MessagesListComponent,MessageItemComponent],
  providers:[NgbActiveModal,NgbModal]
})
export class MessagesModule { }
