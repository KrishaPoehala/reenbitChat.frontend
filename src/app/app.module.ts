
import { ChatsModule } from './chats/chats.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ChatService } from 'src/Services/ChatService';
import { UserService } from 'src/Services/UserService';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ChatsModule,
    HttpClientModule,
  ],
  providers: [ChatService,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
