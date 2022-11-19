import { HttpService } from 'src/Services/HttpService';
import { MessagesModule } from './../messages/messages.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatItemComponent } from './chat-item/chat-item.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ChatListComponent,
    ChatItemComponent,
  ],
  imports: [
    CommonModule,
    MessagesModule,
    ReactiveFormsModule,
  ] ,
  exports:[ChatListComponent,ChatItemComponent]
})
export class ChatsModule { }
