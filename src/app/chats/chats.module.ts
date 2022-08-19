import { ChatService } from './../Services/ChatService';
import { MessagesModule } from './../messages/messages.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatItemComponent } from './chat-item/chat-item.component';

@NgModule({
  declarations: [
    ChatListComponent,
    ChatItemComponent,
  ],
  imports: [
    CommonModule,
    MessagesModule,
  ],
  exports:[ChatListComponent]
})
export class ChatsModule { }
